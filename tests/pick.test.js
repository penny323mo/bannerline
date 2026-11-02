import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { NODES } from '../src/sim/mapdata.js';
import { rotateXZ } from '../src/sim/facing.js';
import { RANK_SPACING, SOLDIER_SCALE, colsFor, garrisonAnchor, visualCount } from '../src/render/crowds.js';
import { createMatch } from '../src/sim/match.js';
import {
  BADGE_LIFT,
  FLAG_Y,
  PICK_RADIUS,
  PILL_GAP_PX,
  PILL_SHIFT_PX,
  ROOF_Y,
  SCREEN_HIT_PX,
  SQUAD_LIFT,
  layoutPills,
  pickBuilding,
  projectToCss,
  squadMarkX,
} from '../src/render/pointer-math.js';
import { frameDioramaCamera } from '../src/render/stage.js';

const WIDTH = 390;
const HEIGHT = 844;

const specs = [
  ['player-hq', 'hq'],
  ['player-bar', 'barracks'],
  ['enemy-bar', 'barracks'],
  ['enemy-hq', 'hq'],
];

function buildings() {
  return specs.map(([id, kind]) => ({
    id,
    kind,
    owner: id.startsWith('player') ? 'player' : 'enemy',
    x: NODES[id].x,
    z: NODES[id].z,
  }));
}

function cameraAtPhone() {
  const camera = new THREE.PerspectiveCamera(52, WIDTH / HEIGHT, 0.1, 90);
  frameDioramaCamera(camera, WIDTH / HEIGHT);
  return camera;
}

function project(camera, x, y, z) {
  const out = { x: 0, y: 0 };
  assert.equal(projectToCss(x, y, z, camera, WIDTH, HEIGHT, out), true);
  return out;
}

function layoutOf(camera, list) {
  const points = list.map((b) => ({
    x: b.x,
    y: b.kind === 'squad' ? SQUAD_LIFT : (BADGE_LIFT[b.kind] || BADGE_LIFT.barracks),
    z: b.z,
    squad: b.kind === 'squad' ? 1 : 0,
  }));
  const out = points.map(() => ({ px: 0, py: 0, ok: 0 }));
  layoutPills(points, points.length, camera, WIDTH, HEIGHT, out);
  return out;
}

test('count pills, roofs, and flags hit within 44px at 390×844', () => {
  const camera = cameraAtPhone();
  const list = buildings();
  const far = { x: 40, z: 40 };
  for (let i = 0; i < list.length; i++) {
    const b = list[i];
    const kind = b.kind;
    const badge = project(camera, b.x, BADGE_LIFT[kind], b.z);
    const roof = project(camera, b.x, ROOF_Y[kind], b.z);
    const flag = project(camera, b.x, FLAG_Y[kind], b.z);
    const samples = [
      [badge.x, badge.y, 'badge'],
      [badge.x, badge.y - PILL_SHIFT_PX, 'pill'],
      [badge.x, badge.y - (PILL_SHIFT_PX + 20), 'pill top'],
      [roof.x, roof.y, 'roof'],
      [flag.x, flag.y, 'flag'],
    ];
    for (let s = 0; s < samples.length; s++) {
      const [px, py, label] = samples[s];
      const hit = pickBuilding(list, camera, WIDTH, HEIGHT, px, py, far);
      assert.ok(hit, `${b.id} ${label} missed`);
      assert.equal(hit.id, b.id, `${b.id} ${label} picked ${hit && hit.id}`);
    }
  }
  assert.equal(SCREEN_HIT_PX, 44);
  assert.equal(PICK_RADIUS, 1.42);
});

test('the enemy headquarters pill is outside the ground disc and still picks', () => {
  const camera = cameraAtPhone();
  const list = buildings();
  const hq = list.find((b) => b.id === 'enemy-hq');
  const badge = project(camera, hq.x, BADGE_LIFT.hq, hq.z);
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const ndc = new THREE.Vector2((badge.x / WIDTH) * 2 - 1, -(((badge.y - PILL_SHIFT_PX) / HEIGHT) * 2 - 1));
  raycaster.setFromCamera(ndc, camera);
  const hit = new THREE.Vector3();
  assert.ok(raycaster.ray.intersectPlane(plane, hit));
  const groundD = Math.hypot(hit.x - hq.x, hit.z - hq.z);
  assert.ok(groundD > PICK_RADIUS, `pill ground distance ${groundD} should miss the old disc`);
  const picked = pickBuilding(list, camera, WIDTH, HEIGHT, badge.x, badge.y - PILL_SHIFT_PX, { x: hit.x, z: hit.z });
  assert.equal(picked.id, 'enemy-hq');
});

test('the player headquarters pill sits clear of the barracks crowd', () => {
  const camera = cameraAtPhone();
  const hq = NODES['player-hq'];
  const bar = NODES['player-bar'];
  const anchor = project(camera, hq.x, BADGE_LIFT.hq, hq.z);
  const pillH = 36;
  const top = anchor.y - pillH * 1.39;
  const center = top + pillH / 2;
  assert.ok(Math.abs(anchor.y - center - 32) < 1.5, `pill center shift ${anchor.y - center}`);
  const spot = garrisonAnchor('player', 'barracks', bar.x, bar.z, 30);
  const n = visualCount(30);
  const cols = colsFor(n);
  const slot = { x: 0, z: 0 };
  let crowdBottom = 0;
  let crowdTop = Infinity;
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const rows = Math.ceil(n / cols);
    const rowCount = r === rows - 1 ? n - r * cols : cols;
    const lx = (c - (rowCount - 1) / 2) * RANK_SPACING;
    const lz = r * RANK_SPACING;
    rotateXZ(lx, lz, spot.yaw, slot);
    const p = project(camera, spot.x + slot.x, 0.4, spot.z + slot.z);
    if (p.y > crowdBottom) crowdBottom = p.y;
    if (p.y < crowdTop) crowdTop = p.y;
  }
  assert.ok(top > crowdBottom, `badge top ${top} overlaps the crowd at ${crowdBottom}`);
  const building = project(camera, bar.x, 0.4, bar.z);
  assert.ok(crowdTop > building.y + 8 || Math.abs(spot.x - bar.x) > 1.2, 'crowd stands off the barracks mesh');
  const ehq = NODES['enemy-hq'];
  const eAnchor = project(camera, ehq.x, BADGE_LIFT.hq, ehq.z);
  const eTop = eAnchor.y - pillH * 1.39;
  const eBot = eTop + pillH;
  const eBar = project(camera, NODES['enemy-bar'].x, 0.2, NODES['enemy-bar'].z);
  assert.ok(eTop > 64, `enemy pill top ${eTop} sits under the top bar`);
  assert.ok(eBot < eBar.y, `enemy pill bottom ${eBot} meets the barracks at ${eBar.y}`);
});

test('the ground disc still picks a building the pointer is not hovering as a pill', () => {
  const camera = cameraAtPhone();
  const list = buildings();
  const onMesh = pickBuilding(list, camera, WIDTH, HEIGHT, 8, 820, { x: 0, z: -6.55 });
  assert.equal(onMesh.id, 'enemy-hq');
  const outside = pickBuilding(list, camera, WIDTH, HEIGHT, 8, 820, { x: 0, z: -6.55 - 1.5 });
  assert.equal(outside, null);
});

test('a squad on a building keeps its pill and leaves the roof, flag, and foot', () => {
  const camera = cameraAtPhone();
  const hq = NODES['player-hq'];
  const list = [
    { id: 'player-hq', kind: 'hq', owner: 'player', x: hq.x, z: hq.z },
    { id: 'sq-parked', kind: 'squad', owner: 'player', x: hq.x, z: hq.z },
  ];
  const building = project(camera, hq.x, BADGE_LIFT.hq, hq.z);
  const laid = layoutOf(camera, list);
  assert.ok(Math.hypot(laid[0].px - building.x, laid[0].py - (building.y - PILL_SHIFT_PX)) < 0.6);
  assert.ok(Math.hypot(laid[0].px - laid[1].px, laid[0].py - laid[1].py) >= PILL_GAP_PX - 0.6);
  const onSquad = pickBuilding(
    list,
    camera,
    WIDTH,
    HEIGHT,
    laid[1].px,
    laid[1].py,
    { x: hq.x, z: hq.z },
  );
  assert.equal(onSquad && onSquad.id, 'sq-parked');
  const onBuilding = pickBuilding(
    list,
    camera,
    WIDTH,
    HEIGHT,
    laid[0].px,
    laid[0].py,
    { x: hq.x, z: hq.z },
  );
  assert.equal(onBuilding && onBuilding.id, 'player-hq');
  const roof = project(camera, hq.x, ROOF_Y.hq, hq.z);
  const onRoof = pickBuilding(list, camera, WIDTH, HEIGHT, roof.x, roof.y, { x: hq.x, z: hq.z });
  assert.equal(onRoof && onRoof.id, 'player-hq');
  const flag = project(camera, hq.x, FLAG_Y.hq, hq.z);
  const onFlag = pickBuilding(list, camera, WIDTH, HEIGHT, flag.x, flag.y, { x: hq.x, z: hq.z });
  assert.equal(onFlag && onFlag.id, 'player-hq');
  const onFoot = pickBuilding(list, camera, WIDTH, HEIGHT, building.x, flag.y + 37, { x: hq.x, z: hq.z });
  assert.equal(onFoot && onFoot.id, 'player-hq');
});

function soldierBoxes(owner, kind, x, z, count, camera) {
  const spot = garrisonAnchor(owner, kind, x, z, count);
  const n = visualCount(count);
  const cols = colsFor(n);
  const slot = { x: 0, z: 0 };
  const boxes = [];
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const rows = Math.ceil(n / cols);
    const rowCount = r === rows - 1 ? n - r * cols : cols;
    rotateXZ((c - (rowCount - 1) / 2) * RANK_SPACING, r * RANK_SPACING, spot.yaw, slot);
    const wx = spot.x + slot.x;
    const wz = spot.z + slot.z;
    const o = { x: 0, y: 0 };
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const samples = [
      [wx, 0.02, wz],
      [wx, 0.02 + 0.72 * SOLDIER_SCALE, wz],
      [wx + 0.16 * SOLDIER_SCALE, 0.4 * SOLDIER_SCALE, wz],
      [wx - 0.16 * SOLDIER_SCALE, 0.4 * SOLDIER_SCALE, wz],
    ];
    for (let s = 0; s < samples.length; s++) {
      if (!projectToCss(samples[s][0], samples[s][1], samples[s][2], camera, WIDTH, HEIGHT, o)) continue;
      minX = Math.min(minX, o.x);
      maxX = Math.max(maxX, o.x);
      minY = Math.min(minY, o.y);
      maxY = Math.max(maxY, o.y);
    }
    boxes.push({ minX, maxX, minY, maxY });
  }
  return boxes;
}

function pillHits(pill, boxes) {
  let hit = 0;
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    if (box.minX < pill.maxX && box.maxX > pill.minX && box.minY < pill.maxY && box.maxY > pill.minY) hit += 1;
  }
  return hit;
}

test('a headquarters rank stays off the barracks pill at 390px', () => {
  const camera = cameraAtPhone();
  const maps = ['crossing', 'long-road', 'two-lanes'];
  for (let m = 0; m < maps.length; m++) {
    const state = createMatch({ mapId: maps[m], difficulty: 'normal' });
    const nodes = state.nodes;
    const points = state.buildings.map((b) => ({
      x: nodes[b.node].x,
      y: BADGE_LIFT[b.kind] || BADGE_LIFT.barracks,
      z: nodes[b.node].z,
      squad: 0,
    }));
    const laid = points.map(() => ({ px: 0, py: 0, ok: 0 }));
    layoutPills(points, points.length, camera, WIDTH, HEIGHT, laid);
    const pills = {};
    const boxes = {};
    for (let i = 0; i < state.buildings.length; i++) {
      const b = state.buildings[i];
      const node = nodes[b.node];
      pills[b.id] = {
        minX: laid[i].px - 42,
        maxX: laid[i].px + 42,
        minY: laid[i].py - 18,
        maxY: laid[i].py + 18,
      };
      boxes[b.id] = soldierBoxes(b.owner, b.kind, node.x, node.z, b.count, camera);
    }
    if (maps[m] !== 'two-lanes') {
      const hit = pillHits(pills['enemy-bar'], boxes['enemy-hq']);
      assert.equal(hit, 0, `${maps[m]} barracks pill hits ${hit} headquarters soldiers`);
    } else {
      const west = pillHits(pills['player-west'], boxes['enemy-west']);
      const east = pillHits(pills['player-east'], boxes['enemy-east']);
      assert.equal(west, 0, `雙橋 west pill hits ${west} soldiers across the stream`);
      assert.equal(east, 0, `雙橋 east pill hits ${east} soldiers across the stream`);
    }
    const hq = nodes['enemy-hq'];
    const spot = garrisonAnchor('enemy', 'hq', hq.x, hq.z, state.buildings.find((b) => b.id === 'enemy-hq').count);
    assert.ok(spot.x > 1.5, `${maps[m]} headquarters rank stays on the far side (${spot.x})`);
    assert.ok(spot.z < hq.z + 0.4, `${maps[m]} headquarters rank stays on its pad (${spot.z})`);
  }
});

test('a squad sieging the enemy headquarters does not take its roof or flag', () => {
  const camera = cameraAtPhone();
  const hq = NODES['enemy-hq'];
  const sx = squadMarkX(hq.x, 'player', 'siege');
  const list = [
    { id: 'enemy-hq', kind: 'hq', owner: 'enemy', x: hq.x, z: hq.z },
    { id: 'sq-siege', kind: 'squad', owner: 'player', x: sx, z: hq.z },
  ];
  const building = project(camera, hq.x, BADGE_LIFT.hq, hq.z);
  const laid = layoutOf(camera, list);
  const roof = project(camera, hq.x, ROOF_Y.hq, hq.z);
  const flag = project(camera, hq.x, FLAG_Y.hq, hq.z);
  assert.ok(Math.hypot(laid[0].px - building.x, laid[0].py - (building.y - PILL_SHIFT_PX)) < 0.6);
  assert.ok(Math.hypot(laid[0].px - laid[1].px, laid[0].py - laid[1].py) >= PILL_GAP_PX - 0.6);
  assert.equal(
    pickBuilding(list, camera, WIDTH, HEIGHT, laid[0].px, laid[0].py, null).id,
    'enemy-hq',
  );
  assert.equal(pickBuilding(list, camera, WIDTH, HEIGHT, roof.x, roof.y, null).id, 'enemy-hq');
  assert.equal(pickBuilding(list, camera, WIDTH, HEIGHT, flag.x, flag.y, null).id, 'enemy-hq');
  assert.equal(pickBuilding(list, camera, WIDTH, HEIGHT, flag.x, flag.y + 37, null).id, 'enemy-hq');
  assert.equal(
    pickBuilding(list, camera, WIDTH, HEIGHT, laid[1].px, laid[1].py, null).id,
    'sq-siege',
  );
});
