import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { createMatch, playerHold, sendSquad, stepMatch, buildingById } from '../src/sim/match.js';
import { DIFFICULTIES } from '../src/sim/maps.js';
import { upgradeAffordance } from '../src/sim/upgrades.js';
import { frontierBandGeometry } from '../src/render/world.js';
import { PALETTE } from '../src/render/palette.js';
import { soldierGeometry } from '../src/render/crowds.js';

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

test('the frontier band is green on the player side and red on the enemy side', () => {
  const geo = frontierBandGeometry();
  const pos = geo.attributes.position;
  const col = geo.attributes.color;
  const vertex = new THREE.Vector3();
  const green = new THREE.Color(PALETTE.player.glow);
  const red = new THREE.Color(PALETTE.enemy.glow);
  let playerSide = 0;
  let enemySide = 0;
  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    const r = col.getX(i);
    const g = col.getY(i);
    const b = col.getZ(i);
    assert.ok(!(r > 0.7 && g > 0.6), `gold vertex ${r},${g},${b}`);
    if (vertex.z > 0.01) {
      assert.ok(Math.abs(r - green.r) < 0.02 && Math.abs(g - green.g) < 0.02, `player side ${r},${g},${b}`);
      assert.ok(g > r, 'player side is green');
      playerSide += 1;
    } else if (vertex.z < -0.01) {
      assert.ok(Math.abs(r - red.r) < 0.02 && Math.abs(g - red.g) < 0.02, `enemy side ${r},${g},${b}`);
      assert.ok(r > g && r > 0.7, 'enemy side is operational red');
      enemySide += 1;
    }
  }
  assert.ok(playerSide >= 2 && enemySide >= 2);
  geo.dispose();
});

test('palette and soldiers match the military art brief', () => {
  assert.equal(PALETTE.sky, 0x7fa8c4);
  assert.equal(PALETTE.water, 0x3e6f8f);
  assert.equal(PALETTE.meadow, 0x6b7a4e);
  assert.equal(PALETTE.leaf, 0x3f5a3a);
  assert.equal(PALETTE.leafDeep, 0x2f4530);
  assert.equal(PALETTE.player.main, 0x2f9e5b);
  assert.equal(PALETTE.enemy.main, 0xc43c32);
  assert.ok(PALETTE.bridge < 0x999999, 'bridge stays a neutral grey');
  const geo = soldierGeometry();
  geo.computeBoundingBox();
  const box = geo.boundingBox;
  assert.ok(box.min.z < -0.3, `rifle extends on local −z (${box.min.z})`);
  assert.ok(-box.min.z > box.max.z + 0.15, 'the rifle is longer than the pack');
  assert.ok(box.max.y > 0.4, 'helmet rises above the torso');
  geo.dispose();
});
