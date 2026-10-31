import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { createMatch, playerHold, sendSquad, stepMatch, buildingById } from '../src/sim/match.js';
import { DIFFICULTIES } from '../src/sim/maps.js';
import { upgradeAffordance } from '../src/sim/upgrades.js';
import { frontierBandGeometry } from '../src/render/world.js';

const MAPS = ['crossing', 'long-road', 'two-lanes'];
const DIFFS = ['easy', 'normal', 'hard'];

function enemyAttack(state) {
  for (let i = 0; i < state.squads.length; i++) {
    const squad = state.squads[i];
    if (squad.owner === 'enemy' && squad.count > 0) return squad;
  }
  return null;
}

test('every difficulty issues an attack within 40s', () => {
  for (let m = 0; m < MAPS.length; m++) {
    for (let d = 0; d < DIFFS.length; d++) {
      const state = createMatch({ mapId: MAPS[m], difficulty: DIFFS[d] });
      let hit = null;
      while (state.status === 'playing' && state.t < 40 && !hit) {
        stepMatch(state, 0.5);
        hit = enemyAttack(state);
      }
      assert.ok(hit, `${MAPS[m]} ${DIFFS[d]} attacked by t=${state.t.toFixed(1)}`);
      if (DIFFS[d] === 'easy') assert.ok(hit.count <= DIFFICULTIES.easy.marchCap);
    }
  }
});

test('opening grace keeps enemy marches off the player headquarters', () => {
  assert.equal(DIFFICULTIES.normal.hqGrace, 20);
  assert.equal(DIFFICULTIES.hard.hqGrace, 12);
  assert.ok(DIFFICULTIES.easy.hqGrace > DIFFICULTIES.normal.hqGrace);

  function watch(difficulty, until) {
    const state = createMatch({ mapId: 'two-lanes', difficulty });
    let saw = false;
    while (state.status === 'playing' && state.t < until) {
      stepMatch(state, 0.25);
      for (let i = 0; i < state.squads.length; i++) {
        const squad = state.squads[i];
        if (squad.owner !== 'enemy' || squad.count <= 0) continue;
        saw = true;
        assert.notEqual(squad.targetId, 'player-hq', `${difficulty} aimed at HQ at t=${state.t}`);
      }
    }
    assert.ok(saw, `${difficulty} attacked during the grace window`);
  }

  watch('easy', 30);
  watch('normal', 19.5);
  watch('hard', 11.5);
});

test('a double send on 雙橋 as the opening wave comes due still wins on 中', () => {
  const state = createMatch({ mapId: 'two-lanes', difficulty: 'normal' });
  stepMatch(state, 16);
  for (const id of ['player-west', 'player-east']) {
    const bar = buildingById(state, id);
    assert.equal(sendSquad(state, id, 'enemy-hq', playerHold(bar)).ok, true);
  }
  stepMatch(state, 30);
  assert.equal(state.status, 'win');
});

test('upgrade affordance is only a player building that can pay', () => {
  const player = {
    id: 'player-bar',
    kind: 'barracks',
    owner: 'player',
    count: 30,
    cap: 54,
    regen: 2.25,
    baseRegen: 2.25,
    upgrades: { haste: 0, bulwark: 0 },
  };
  assert.equal(upgradeAffordance(player), true);
  assert.equal(upgradeAffordance({ ...player, id: 'player-hq', kind: 'hq', count: 12 }), true);
  assert.equal(upgradeAffordance({ ...player, owner: 'enemy', id: 'enemy-bar' }), false);
  assert.equal(upgradeAffordance({ ...player, count: 1 }), false);
  assert.equal(upgradeAffordance({ ...player, kind: 'post' }), false);
  assert.equal(upgradeAffordance({
    ...player,
    count: 40,
    upgrades: { haste: 2, bulwark: 2 },
  }), false);
});

test('the frontier band is mint on the player side and coral on the enemy side', () => {
  const geo = frontierBandGeometry();
  const pos = geo.attributes.position;
  const col = geo.attributes.color;
  const vertex = new THREE.Vector3();
  let mint = 0;
  let coral = 0;
  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    const r = col.getX(i);
    const g = col.getY(i);
    const b = col.getZ(i);
    assert.ok(!(r > 0.7 && g > 0.6), `gold vertex ${r},${g},${b}`);
    if (vertex.z > 0.01) {
      assert.ok(g > 0.6 && r < 0.2, `player side ${r},${g},${b} at z=${vertex.z}`);
      mint += 1;
    } else if (vertex.z < -0.01) {
      assert.ok(r > 0.8 && g < 0.25, `enemy side ${r},${g},${b} at z=${vertex.z}`);
      coral += 1;
    }
  }
  assert.ok(mint >= 2 && coral >= 2);
  geo.dispose();
});
