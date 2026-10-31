import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { MAP_LIST } from '../src/sim/maps.js';
import { streamCrossings, treesFor } from '../src/render/scenery.js';

function byId(id) {
  for (let i = 0; i < MAP_LIST.length; i++) {
    if (MAP_LIST[i].id === id) return MAP_LIST[i];
  }
  return null;
}

function keyOf(list) {
  return list.map((p) => `${p.x.toFixed(2)},${p.z.toFixed(2)}`).join('|');
}

test('each map card is that battlefield’s pads, water, and trees', () => {
  const crossing = byId('crossing');
  const longRoad = byId('long-road');
  const twoLanes = byId('two-lanes');
  const crossX = streamCrossings(crossing);
  const longX = streamCrossings(longRoad);
  const laneX = streamCrossings(twoLanes);
  assert.equal(crossX.length, 1);
  assert.equal(longX.length, 1);
  assert.equal(laneX.length, 2);
  assert.ok(Math.abs(crossX[0].x) < 0.05);
  assert.ok(laneX[0].x < -1 && laneX[1].x > 1);

  const crossTrees = treesFor(crossing);
  const longTrees = treesFor(longRoad);
  const laneTrees = treesFor(twoLanes);
  assert.equal(crossTrees.length, 14);
  assert.equal(longTrees.length, longRoad.zones.length * 2);
  assert.equal(laneTrees.length, twoLanes.zones.length * 2);
  assert.notEqual(keyOf(crossTrees), keyOf(longTrees));
  assert.notEqual(keyOf(longTrees), keyOf(laneTrees));
  assert.notEqual(crossing.zones.length, longRoad.zones.length);
  assert.notEqual(crossing.buildings.length, twoLanes.buildings.length);

  const src = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(src, /treesFor\(map\)/);
  assert.match(src, /streamCrossings\(map\)/);
  assert.match(src, /streamBand\(map\)/);
  assert.match(src, /map\.zones/);
  assert.doesNotMatch(src, /for \(let i = 0; i < 8; i\+\+\)/);
  assert.match(src, /hintEl\.hidden = true/);
  const home = readFileSync(new URL('../index.source.html', import.meta.url), 'utf8');
  assert.match(home, /id="hint" hidden/);
  assert.doesNotMatch(home, /揀地圖，再出戰/);
});
