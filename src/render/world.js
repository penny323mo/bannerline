import * as THREE from 'three';
import { GRAPH, NODES, ROAD, ZONES } from '../sim/mapdata.js';
import { frontierSegments } from '../sim/territory.js';
import { yawForFacing } from '../sim/facing.js';
import { PALETTE, ownerPaint } from './palette.js';

const UP = new THREE.Vector3(0, 1, 0);
const LOCAL_Z = new THREE.Vector3(0, 0, 1);
const _dir = new THREE.Vector3();
const _mid = new THREE.Vector3();

function mat(color, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: extra.roughness ?? 0.78,
    metalness: 0.02,
    ...extra,
  });
}

function exitDir(nodeId, out) {
  const next = GRAPH[nodeId][0];
  const a = NODES[nodeId];
  const b = NODES[next];
  out.x = b.x - a.x;
  out.z = b.z - a.z;
  return out;
}

function alignLength(mesh, x0, z0, x1, z1, y) {
  const dx = x1 - x0;
  const dz = z1 - z0;
  const len = Math.hypot(dx, dz) || 0.001;
  mesh.scale.set(1, 1, len);
  mesh.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  _dir.set(dx / len, 0, dz / len);
  mesh.quaternion.setFromUnitVectors(LOCAL_Z, _dir);
  return len;
}

function pennant(color) {
  const material = mat(color, { roughness: 0.5, side: THREE.DoubleSide });
  const group = new THREE.Group();
  const a = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.24), material);
  const b = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.24), material);
  b.rotation.y = Math.PI / 2;
  a.userData.slot = 'flag';
  b.userData.slot = 'flag';
  group.add(a, b);
  group.userData.flutter = true;
  return group;
}

function makeHq(paint) {
  const g = new THREE.Group();
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.92, 0.16, 8), mat(PALETTE.sand, { roughness: 0.9 }));
  plinth.position.y = 0.08;
  plinth.castShadow = true;
  plinth.receiveShadow = true;

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.64, 0.86, 8), mat(paint.main));
  body.position.y = 0.58;
  body.userData.slot = 'body';
  body.castShadow = true;

  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 8), mat(PALETTE.foam));
  band.position.y = 1.06;
  band.castShadow = true;

  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.76, 0.5, 8), mat(paint.deep));
  roof.position.y = 1.34;
  roof.userData.slot = 'roof';
  roof.castShadow = true;

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.1), mat(PALETTE.ink));
  door.position.set(0, 0.34, -0.62);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.58, 6), mat(PALETTE.foam));
  pole.position.y = 1.78;
  pole.castShadow = true;

  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(paint.flag));
  ball.position.y = 2.1;
  ball.userData.slot = 'flag';

  const flag = pennant(paint.flag);
  flag.position.set(0.18, 1.92, 0);

  g.add(plinth, body, band, roof, door, pole, ball, flag);
  return g;
}

function makeBarracks(paint) {
  const g = new THREE.Group();
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.58, 0.14, 8), mat(PALETTE.sand, { roughness: 0.9 }));
  plinth.scale.set(1.72, 1, 1.05);
  plinth.position.y = 0.07;
  plinth.castShadow = true;
  plinth.receiveShadow = true;

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.44, 0.56, 8), mat(paint.main));
  body.scale.set(1.75, 1, 1.05);
  body.position.y = 0.42;
  body.userData.slot = 'body';
  body.castShadow = true;

  const roof = new THREE.Mesh(
    new THREE.SphereGeometry(0.46, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
    mat(paint.deep),
  );
  roof.scale.set(1.62, 0.72, 1.08);
  roof.position.y = 0.7;
  roof.userData.slot = 'roof';
  roof.castShadow = true;

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 0.16), mat(PALETTE.foam));
  chimney.position.set(0.42, 0.98, 0.05);
  chimney.castShadow = true;

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.1), mat(PALETTE.ink));
  door.position.set(0, 0.28, -0.46);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.42, 5), mat(PALETTE.foam));
  pole.position.set(-0.35, 1.12, 0);

  const flag = pennant(paint.flag);
  flag.scale.setScalar(0.72);
  flag.position.set(-0.16, 1.22, 0);

  g.add(plinth, body, roof, chimney, door, pole, flag);
  return g;
}

function paintGroup(group, owner) {
  const paint = ownerPaint(owner);
  group.traverse((obj) => {
    if (!obj.material || !obj.userData.slot) return;
    const slot = obj.userData.slot;
    if (slot === 'body') obj.material.color.setHex(paint.main);
    else if (slot === 'roof') obj.material.color.setHex(paint.deep);
    else if (slot === 'flag') obj.material.color.setHex(paint.flag);
  });
}

function glowGeometry() {
  // Plane starts in XY. +Y becomes world −Z after rotateX(-π/2), which is the enemy side.
  const height = 0.7;
  const geo = new THREE.PlaneGeometry(1, height, 1, 14);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const mint = [0.48, 1, 0.7];
  const hot = [1, 0.97, 0.55];
  const coral = [1, 0.38, 0.3];
  for (let i = 0; i < pos.count; i++) {
    const t = pos.getY(i) / (height / 2);
    const edge = t > 0 ? coral : mint;
    const u = Math.min(1, Math.abs(t));
    colors[i * 3] = hot[0] + (edge[0] - hot[0]) * u;
    colors[i * 3 + 1] = hot[1] + (edge[1] - hot[1]) * u;
    colors[i * 3 + 2] = hot[2] + (edge[2] - hot[2]) * u;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function makeGlow(geo, material) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.visible = false;
  mesh.renderOrder = 3;
  return mesh;
}

function tree(x, z, scale, color) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.055 * scale, 0.08 * scale, 0.26 * scale, 5), mat(PALETTE.trunk));
  trunk.position.y = 0.13 * scale;
  trunk.castShadow = true;
  const crown = new THREE.Mesh(new THREE.ConeGeometry(0.36 * scale, 0.78 * scale, 6), mat(color));
  crown.position.y = 0.26 * scale + 0.32 * scale;
  crown.castShadow = true;
  g.add(trunk, crown);
  g.position.set(x, 0.06, z);
  return g;
}

const TREE_SPOTS = [
  [-3.05, 6.15, 1.08, PALETTE.leaf],
  [-3.25, 4.15, 0.82, PALETTE.leafMint],
  [3.15, 5.55, 1.12, PALETTE.leaf],
  [3.3, 3.35, 0.74, PALETTE.leaf],
  [-3.15, 1.05, 0.9, PALETTE.leafMint],
  [3.05, 0.7, 0.78, PALETTE.leaf],
  [-3.2, -1.45, 1.0, PALETTE.leaf],
  [3.2, -1.7, 0.88, PALETTE.leafMint],
  [2.95, -4.55, 0.8, PALETTE.leaf],
  [-3.15, -5.15, 1.05, PALETTE.leaf],
  [2.45, -6.85, 0.7, PALETTE.leafMint],
  [-2.15, 7.05, 0.76, PALETTE.leaf],
  [1.55, 7.15, 0.64, PALETTE.leaf],
  [-1.35, -7.15, 0.7, PALETTE.leaf],
];

export function createWorld(scene) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const water = new THREE.Mesh(
    new THREE.CircleGeometry(16, 28),
    mat(PALETTE.water, { roughness: 0.35, metalness: 0.04 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.62;
  scene.add(water);

  const beach = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.08, 0.5, 10), mat(PALETTE.sand, { roughness: 0.92 }));
  beach.scale.set(5.45, 1, 8.85);
  beach.position.y = -0.28;
  beach.receiveShadow = true;
  beach.castShadow = true;
  scene.add(beach);

  const zoneMeshes = new Map();
  for (let i = 0; i < ZONES.length; i++) {
    const z = ZONES[i];
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.05, 0.32, 6), mat(PALETTE.meadow));
    mesh.scale.set(z.rx, 1, z.rz);
    mesh.position.set(z.x, -0.1, z.z);
    mesh.rotation.y = i * 0.18;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);
    zoneMeshes.set(z.buildingId, mesh);
  }

  const meadow = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.04, 0.3, 7), mat(PALETTE.meadow));
  meadow.scale.set(3.15, 1, 1.05);
  meadow.position.set(0, -0.08, 0);
  meadow.receiveShadow = true;
  scene.add(meadow);

  const stream = new THREE.Mesh(new THREE.BoxGeometry(7.1, 0.08, 1.15), mat(PALETTE.stream, { roughness: 0.28 }));
  stream.position.set(0, 0.08, 0);
  stream.receiveShadow = true;
  scene.add(stream);

  const plankGeo = new THREE.BoxGeometry(0.92, 0.08, 1.35);
  const railGeo = new THREE.BoxGeometry(0.08, 0.22, 1.35);
  const bridgeMat = mat(PALETTE.bridge);
  const plank = new THREE.Mesh(plankGeo, bridgeMat);
  plank.position.set(0, 0.16, 0);
  plank.castShadow = true;
  plank.receiveShadow = true;
  scene.add(plank);
  for (const side of [-0.42, 0.42]) {
    const rail = new THREE.Mesh(railGeo, bridgeMat);
    rail.position.set(side, 0.28, 0);
    rail.castShadow = true;
    scene.add(rail);
  }

  const roadGeo = new THREE.BoxGeometry(0.72, 0.07, 1);
  const roadMat = mat(PALETTE.road, { roughness: 0.88 });
  for (let i = 0; i < ROAD.length - 1; i++) {
    const a = ROAD[i];
    const b = ROAD[i + 1];
    if (Math.abs(a.z) < 0.2 && Math.abs(b.z) < 0.2) continue;
    const mesh = new THREE.Mesh(roadGeo, roadMat);
    alignLength(mesh, a.x, a.z, b.x, b.z, 0.12);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);
  }

  const driveMat = mat(PALETTE.roadEdge, { roughness: 0.9 });
  for (const id of ['player-bar', 'enemy-bar']) {
    const a = NODES[id];
    const b = NODES[id === 'player-bar' ? 'player-road' : 'enemy-road'];
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 1), driveMat);
    alignLength(mesh, a.x, a.z, b.x, b.z, 0.12);
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  for (let i = 0; i < TREE_SPOTS.length; i++) {
    const [x, z, s, color] = TREE_SPOTS[i];
    scene.add(tree(x, z, s, color));
  }

  const rockGeo = new THREE.DodecahedronGeometry(0.22, 0);
  const rockMat = mat(PALETTE.rock, { roughness: 0.7 });
  const rocks = [
    [2.55, 6.4, 0.7],
    [-2.7, -6.5, 0.55],
    [3.4, -0.2, 0.4],
    [-3.45, 2.4, 0.48],
  ];
  for (let i = 0; i < rocks.length; i++) {
    const [x, z, s] = rocks[i];
    const mesh = new THREE.Mesh(rockGeo, rockMat);
    mesh.position.set(x, 0.1, z);
    mesh.scale.set(s, s * 0.65, s);
    mesh.castShadow = true;
    scene.add(mesh);
  }

  const flowerGeo = new THREE.SphereGeometry(0.08, 6, 5);
  const flowerColors = [0xffb7c8, 0xffe08a, 0xfff6ea];
  const flowerSpots = [
    [-0.8, 6.9],
    [0.7, 6.85],
    [2.3, 4.5],
    [-2.35, -4.4],
    [0.85, -6.9],
  ];
  for (let i = 0; i < flowerSpots.length; i++) {
    const mesh = new THREE.Mesh(flowerGeo, mat(flowerColors[i % flowerColors.length], { roughness: 0.45 }));
    mesh.position.set(flowerSpots[i][0], 0.14, flowerSpots[i][1]);
    scene.add(mesh);
  }

  const buildings = new Map();
  const flags = [];
  const dir = { x: 0, z: 0 };
  const specs = [
    ['player-hq', 'hq'],
    ['player-bar', 'barracks'],
    ['enemy-bar', 'barracks'],
    ['enemy-hq', 'hq'],
  ];
  for (let i = 0; i < specs.length; i++) {
    const [id, kind] = specs[i];
    const owner = id.startsWith('player') ? 'player' : 'enemy';
    const group = kind === 'hq' ? makeHq(ownerPaint(owner)) : makeBarracks(ownerPaint(owner));
    const p = NODES[id];
    exitDir(id, dir);
    group.position.set(p.x, 0.06, p.z);
    group.rotation.y = yawForFacing(dir.x, dir.z);
    group.traverse((obj) => {
      if (obj.userData && obj.userData.flutter) flags.push(obj);
    });
    scene.add(group);
    buildings.set(id, group);
  }

  const glowMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const glows = [makeGlow(glowGeometry(), glowMat), makeGlow(glowGeometry(), glowMat), makeGlow(glowGeometry(), glowMat)];
  for (let i = 0; i < glows.length; i++) scene.add(glows[i]);
  const frontierBuf = [];

  const ringGeo = new THREE.TorusGeometry(1.05, 0.05, 8, 32);
  ringGeo.rotateX(Math.PI / 2);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xfff3b0 }));
  ring.position.y = 0.2;
  ring.visible = false;
  scene.add(ring);

  const hoverGeo = new THREE.TorusGeometry(0.95, 0.035, 6, 28);
  hoverGeo.rotateX(Math.PI / 2);
  const hover = new THREE.Mesh(hoverGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  hover.position.y = 0.18;
  hover.visible = false;
  scene.add(hover);

  const ribbon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1, 6),
    new THREE.MeshBasicMaterial({ color: 0x8dffc0, transparent: true, opacity: 0.9 }),
  );
  ribbon.visible = false;
  ribbon.frustumCulled = false;
  scene.add(ribbon);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xfff6c2 }),
  );
  dot.visible = false;
  scene.add(dot);

  const ownerScratch = {};

  function placeMarker(mesh, id) {
    if (!id || !NODES[id]) {
      mesh.visible = false;
      return;
    }
    const p = NODES[id];
    mesh.visible = true;
    mesh.position.x = p.x;
    mesh.position.z = p.z;
  }

  return {
    resetDrag() {
      ribbon.visible = false;
      dot.visible = false;
      hover.visible = false;
    },
    setDrag(fromId, world, hoverId) {
      if (!fromId || !world || !NODES[fromId]) {
        ribbon.visible = false;
        dot.visible = false;
        return;
      }
      const p = NODES[fromId];
      const dx = world.x - p.x;
      const dz = world.z - p.z;
      const len = Math.hypot(dx, dz);
      if (len < 0.08) {
        ribbon.visible = false;
      } else {
        ribbon.visible = true;
        ribbon.scale.set(1, len, 1);
        ribbon.position.set((p.x + world.x) / 2, 0.45, (p.z + world.z) / 2);
        _dir.set(dx / len, 0, dz / len);
        ribbon.quaternion.setFromUnitVectors(UP, _dir);
      }
      dot.visible = true;
      dot.position.set(world.x, 0.28, world.z);
      if (hoverId && hoverId !== fromId) {
        hover.visible = true;
        const h = NODES[hoverId];
        hover.position.x = h.x;
        hover.position.z = h.z;
      } else {
        hover.visible = false;
      }
    },
    update(time, state, selectedId) {
      for (let i = 0; i < state.buildings.length; i++) {
        const b = state.buildings[i];
        ownerScratch[b.id] = b.owner;
        const group = buildings.get(b.id);
        if (group && group.userData.owner !== b.owner) {
          group.userData.owner = b.owner;
          paintGroup(group, b.owner);
        }
        const zone = zoneMeshes.get(b.id);
        if (zone && zone.userData.owner !== b.owner) {
          zone.userData.owner = b.owner;
          zone.material.color.setHex(ownerPaint(b.owner).slab);
        }
      }

      const segs = frontierSegments(ownerScratch, frontierBuf);
      const pulse = reduceMotion ? 0.9 : 0.72 + 0.28 * Math.sin(time * 3.1);
      for (let i = 0; i < glows.length; i++) {
        const seg = segs[i];
        const glow = glows[i];
        if (!seg) {
          glow.visible = false;
          continue;
        }
        glow.visible = true;
        const width = Math.max(0.6, seg.x1 - seg.x0);
        glow.position.set((seg.x0 + seg.x1) / 2, 0.2, seg.z);
        glow.scale.set(width, 1, 1);
        glow.rotation.y = seg.plusOwner === 'player' ? 0 : Math.PI;
        glowMat.opacity = reduceMotion ? 0.85 : 0.72 + pulse * 0.2;
      }

      placeMarker(ring, selectedId);
      if (!reduceMotion && ring.visible) ring.rotation.y = time * 0.8;

      for (let i = 0; i < flags.length; i++) {
        const flag = flags[i];
        flag.rotation.y = reduceMotion ? 0 : Math.sin(time * 2.2 + i) * 0.4;
      }
    },
  };
}
