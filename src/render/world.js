import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { yawForFacing } from '../sim/facing.js';
import { boxMapZones, frontierFrom } from '../sim/territory.js';
import { PALETTE, ownerPaint } from './palette.js';

const UP = new THREE.Vector3(0, 1, 0);
const LOCAL_Z = new THREE.Vector3(0, 0, 1);
const _dir = new THREE.Vector3();

function mat(color, extra = {}) {
  const { roughness, metalness, ...rest } = extra;
  return new THREE.MeshLambertMaterial({ color, ...rest });
}

function exitDir(map, nodeId, out) {
  const nexts = map.graph[nodeId] || [];
  const next = nexts[0];
  const a = map.nodes[nodeId];
  const b = next && map.nodes[next];
  if (!a || !b) {
    out.x = 0;
    out.z = -1;
    return out;
  }
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

function makePip(radius) {
  const pip = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.045, 6, 24),
    new THREE.MeshBasicMaterial({ color: 0xffe08a }),
  );
  pip.rotation.x = Math.PI / 2;
  pip.position.y = 0.1;
  pip.visible = false;
  pip.name = 'pip';
  return pip;
}

/** Tall keep: box shaft and a spire, so it does not read as another hut. */
function makeHq(paint) {
  const g = new THREE.Group();
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.02, 0.16, 8), mat(PALETTE.sand, { roughness: 0.9 }));
  plinth.position.y = 0.08;
  plinth.castShadow = true;
  plinth.receiveShadow = true;

  const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.82, 1.42, 0.82), mat(paint.main));
  shaft.position.y = 0.88;
  shaft.userData.slot = 'body';
  shaft.castShadow = true;

  const band = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.14, 1.02), mat(PALETTE.foam));
  band.position.y = 1.64;
  band.castShadow = true;

  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.66, 0.78, 8), mat(paint.deep));
  roof.position.y = 2.05;
  roof.userData.slot = 'roof';
  roof.castShadow = true;

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.4, 0.08), mat(PALETTE.ink));
  door.position.set(0, 0.36, -0.44);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.7, 6), mat(PALETTE.foam));
  pole.position.y = 2.28;
  pole.castShadow = true;

  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), mat(paint.flag));
  ball.position.y = 2.66;
  ball.userData.slot = 'flag';

  const flag = pennant(paint.flag);
  flag.position.set(0.2, 2.48, 0);

  const pip = makePip(1.15);
  g.userData.pip = pip;
  g.add(plinth, shaft, band, roof, door, pole, ball, flag, pip);
  return g;
}

/** Long low hall. The footprint is a bar, not a tower. */
function makeBarracks(paint) {
  const g = new THREE.Group();
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 0.92), mat(PALETTE.sand, { roughness: 0.9 }));
  plinth.position.y = 0.06;
  plinth.castShadow = true;
  plinth.receiveShadow = true;

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.46, 0.78), mat(paint.main));
  body.position.y = 0.34;
  body.userData.slot = 'body';
  body.castShadow = true;

  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.22, 0.96), mat(paint.deep));
  roof.position.y = 0.66;
  roof.userData.slot = 'roof';
  roof.castShadow = true;

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.18), mat(PALETTE.foam));
  chimney.position.set(0.62, 0.92, 0.12);
  chimney.castShadow = true;

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.08), mat(PALETTE.ink));
  door.position.set(-0.2, 0.26, -0.42);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.46, 5), mat(PALETTE.foam));
  pole.position.set(-0.7, 1.05, 0);

  const flag = pennant(paint.flag);
  flag.scale.setScalar(0.7);
  flag.position.set(-0.5, 1.16, 0);

  const pip = makePip(1.2);
  g.userData.pip = pip;
  g.add(plinth, body, roof, chimney, door, pole, flag, pip);
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

/**
 * Ground band. PlaneGeometry starts in XY; rotateX(-π/2) sends local +Y to world −Z
 * (enemy / top of the portrait). +Y is coral, −Y is mint, so the player side stays green.
 * Normal blending keeps the two colours from blowing out to white on the sand.
 */
function glowGeometry() {
  const depth = 0.92;
  const geo = new THREE.PlaneGeometry(1, depth, 1, 10);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const mint = [0.05, 0.78, 0.28];
  const hot = [1, 0.82, 0.2];
  const coral = [0.92, 0.1, 0.08];
  for (let i = 0; i < pos.count; i++) {
    const t = pos.getY(i) / (depth / 2);
    const edge = t > 0 ? coral : mint;
    const u = Math.min(1, Math.abs(t) / 0.55);
    colors[i * 3] = hot[0] + (edge[0] - hot[0]) * u;
    colors[i * 3 + 1] = hot[1] + (edge[1] - hot[1]) * u;
    colors[i * 3 + 2] = hot[2] + (edge[2] - hot[2]) * u;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function wallGeometry() {
  const height = 0.36;
  const geo = new THREE.PlaneGeometry(1, height, 1, 4);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const y = (pos.getY(i) + height / 2) / height;
    const hotness = (1 - y) * 0.55;
    colors[i * 3] = hotness;
    colors[i * 3 + 1] = 0.55 * hotness;
    colors[i * 3 + 2] = 0.12 * hotness;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.translate(0, height / 2, 0);
  return geo;
}

function makeGlow(geo, material) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.visible = false;
  mesh.renderOrder = 6;
  mesh.frustumCulled = false;
  return mesh;
}

function addMerged(group, parts, material) {
  if (!parts.length) return;
  const geo = mergeGeometries(parts);
  for (let i = 0; i < parts.length; i++) parts[i].dispose();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
}

function pushTree(trunks, crowns, x, z, scale, color) {
  const trunk = new THREE.CylinderGeometry(0.055 * scale, 0.08 * scale, 0.26 * scale, 5);
  trunk.translate(x, 0.06 + 0.13 * scale, z);
  trunks.push(trunk);
  const list = crowns[color] || (crowns[color] = []);
  const crown = new THREE.ConeGeometry(0.36 * scale, 0.78 * scale, 6);
  crown.translate(x, 0.06 + 0.58 * scale, z);
  list.push(crown);
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

function boundsOf(map) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  const zones = map.zones;
  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    minX = Math.min(minX, z.x - z.rx);
    maxX = Math.max(maxX, z.x + z.rx);
    minZ = Math.min(minZ, z.z - z.rz);
    maxZ = Math.max(maxZ, z.z + z.rz);
  }
  return { minX, maxX, minZ, maxZ };
}

function addEdges(group, map, roadGeo, roadMat) {
  const seen = new Set();
  const parts = [];
  const keys = Object.keys(map.graph);
  for (let i = 0; i < keys.length; i++) {
    const aId = keys[i];
    const nexts = map.graph[aId];
    for (let j = 0; j < nexts.length; j++) {
      const bId = nexts[j];
      const key = aId < bId ? `${aId}|${bId}` : `${bId}|${aId}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const a = map.nodes[aId];
      const b = map.nodes[bId];
      const piece = new THREE.Mesh(roadGeo);
      alignLength(piece, a.x, a.z, b.x, b.z, 0.12);
      piece.updateMatrix();
      const baked = roadGeo.clone();
      baked.applyMatrix4(piece.matrix);
      parts.push(baked);
    }
  }
  addMerged(group, parts, roadMat);
  roadGeo.dispose();
}

function buildIsland(map, reduceMotion) {
  const group = new THREE.Group();
  const box = boundsOf(map);
  const beach = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.08, 0.5, 10), mat(PALETTE.sand, { roughness: 0.92 }));
  const spanX = Math.max(5.2, (box.maxX - box.minX) * 0.72);
  const spanZ = Math.max(8.2, (box.maxZ - box.minZ) * 0.62);
  beach.scale.set(spanX, 1, spanZ);
  beach.position.y = -0.28;
  beach.receiveShadow = true;
  beach.castShadow = true;
  group.add(beach);

  const zoneMeshes = new Map();
  for (let i = 0; i < map.zones.length; i++) {
    const z = map.zones[i];
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.05, 0.32, 6), mat(PALETTE.meadow));
    mesh.scale.set(z.rx, 1, z.rz);
    mesh.position.set(z.x, -0.1, z.z);
    mesh.rotation.y = i * 0.18;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);
    zoneMeshes.set(z.buildingId, mesh);
  }

  const stream = new THREE.Mesh(
    new THREE.BoxGeometry(Math.max(6.4, box.maxX - box.minX + 0.8), 0.08, 1.15),
    mat(PALETTE.stream, { roughness: 0.28 }),
  );
  stream.position.set(0, 0.08, 0);
  stream.receiveShadow = true;
  group.add(stream);

  const bridgeMat = mat(PALETTE.bridge);
  const bridgeParts = [];
  const plank = new THREE.BoxGeometry(0.92, 0.08, 1.35);
  plank.translate(0, 0.16, 0);
  bridgeParts.push(plank);
  for (const side of [-0.42, 0.42]) {
    const rail = new THREE.BoxGeometry(0.08, 0.22, 1.35);
    rail.translate(side, 0.28, 0);
    bridgeParts.push(rail);
  }
  addMerged(group, bridgeParts, bridgeMat);

  const roadGeo = new THREE.BoxGeometry(0.72, 0.07, 1);
  const roadMat = mat(PALETTE.road, { roughness: 0.88 });
  addEdges(group, map, roadGeo, roadMat);

  const trunks = [];
  const crowns = {};
  if (map.id === 'crossing') {
    for (let i = 0; i < TREE_SPOTS.length; i++) {
      const [x, z, s, color] = TREE_SPOTS[i];
      pushTree(trunks, crowns, x, z, s, color);
    }
    const flowerGeo = new THREE.SphereGeometry(0.08, 6, 5);
    const flowerColors = [0xffb7c8, 0xffe08a, 0xfff6ea];
    const flowerSpots = [[-0.8, 6.9], [0.7, 6.85], [2.3, 4.5], [-2.35, -4.4], [0.85, -6.9]];
    const flowers = {};
    for (let i = 0; i < flowerSpots.length; i++) {
      const color = flowerColors[i % flowerColors.length];
      const list = flowers[color] || (flowers[color] = []);
      const geo = flowerGeo.clone();
      geo.translate(flowerSpots[i][0], 0.14, flowerSpots[i][1]);
      list.push(geo);
    }
    flowerGeo.dispose();
    const flowerIds = Object.keys(flowers);
    for (let i = 0; i < flowerIds.length; i++) {
      addMerged(group, flowers[flowerIds[i]], mat(Number(flowerIds[i])));
    }
    const rockGeo = new THREE.DodecahedronGeometry(0.22, 0);
    const rockParts = [];
    const rocks = [[2.55, 6.4, 0.7], [-2.7, -6.5, 0.55], [3.4, -0.2, 0.4], [-3.45, 2.4, 0.48]];
    for (let i = 0; i < rocks.length; i++) {
      const [x, z, s] = rocks[i];
      const geo = rockGeo.clone();
      geo.scale(s, s * 0.65, s);
      geo.translate(x, 0.1, z);
      rockParts.push(geo);
    }
    rockGeo.dispose();
    addMerged(group, rockParts, mat(PALETTE.rock));
  } else {
    for (let i = 0; i < map.zones.length; i++) {
      const z = map.zones[i];
      pushTree(trunks, crowns, z.x - z.rx + 0.45, z.z + z.rz * 0.35, 0.85, i % 2 ? PALETTE.leafMint : PALETTE.leaf);
      pushTree(trunks, crowns, z.x + z.rx - 0.4, z.z - z.rz * 0.2, 0.7, PALETTE.leaf);
    }
  }
  addMerged(group, trunks, mat(PALETTE.trunk));
  const crownColors = Object.keys(crowns);
  for (let i = 0; i < crownColors.length; i++) {
    addMerged(group, crowns[crownColors[i]], mat(Number(crownColors[i])));
  }

  const buildings = new Map();
  const flags = [];
  const dir = { x: 0, z: 0 };
  for (let i = 0; i < map.buildings.length; i++) {
    const spec = map.buildings[i];
    const groupB = spec.kind === 'hq' ? makeHq(ownerPaint(spec.owner)) : makeBarracks(ownerPaint(spec.owner));
    const p = map.nodes[spec.node];
    exitDir(map, spec.node, dir);
    groupB.position.set(p.x, 0.06, p.z);
    groupB.rotation.y = yawForFacing(dir.x, dir.z);
    groupB.userData.owner = spec.owner;
    groupB.traverse((obj) => {
      if (obj.userData && obj.userData.flutter) flags.push(obj);
    });
    group.add(groupB);
    buildings.set(spec.id, groupB);
  }

  const glowMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.94,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const wallMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const bandGeo = glowGeometry();
  const wallGeo = wallGeometry();
  const glows = [];
  const walls = [];
  for (let i = 0; i < 8; i++) {
    const band = makeGlow(bandGeo, glowMat);
    const wall = makeGlow(wallGeo, wallMat);
    group.add(band, wall);
    glows.push(band);
    walls.push(wall);
  }

  const boxed = boxMapZones(map.zones);
  const frontierBuf = [];
  const ownerScratch = {};

  const ringGeo = new THREE.TorusGeometry(1.05, 0.05, 8, 32);
  ringGeo.rotateX(Math.PI / 2);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xfff3b0 }));
  ring.position.y = 0.2;
  ring.visible = false;
  group.add(ring);

  const hoverGeo = new THREE.TorusGeometry(0.95, 0.035, 6, 28);
  hoverGeo.rotateX(Math.PI / 2);
  const hover = new THREE.Mesh(hoverGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  hover.position.y = 0.18;
  hover.visible = false;
  group.add(hover);

  const ribbon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1, 6),
    new THREE.MeshBasicMaterial({ color: 0x8dffc0, transparent: true, opacity: 0.9 }),
  );
  ribbon.visible = false;
  ribbon.frustumCulled = false;
  group.add(ribbon);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xfff6c2 }),
  );
  dot.visible = false;
  group.add(dot);

  function placeMarker(mesh, id, state) {
    let x;
    let z;
    const nodes = (state && state.nodes) || map.nodes;
    const node = id && nodes[id];
    if (node) {
      x = node.x;
      z = node.z;
    } else if (state && id) {
      const squads = state.squads;
      for (let i = 0; i < squads.length; i++) {
        if (squads[i].id === id) {
          x = squads[i].x;
          z = squads[i].z;
          break;
        }
      }
    }
    if (x === undefined) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;
    mesh.position.x = x;
    mesh.position.z = z;
  }

  function sieged(state, id, owner) {
    const squads = state.squads;
    for (let i = 0; i < squads.length; i++) {
      const s = squads[i];
      if (s.mode === 'siege' && s.targetId === id && s.owner !== owner && s.count > 0) return true;
    }
    return false;
  }

  return {
    group,
    resetDrag() {
      ribbon.visible = false;
      dot.visible = false;
      hover.visible = false;
    },
    setDrag(fromId, world, hoverId, fromPos) {
      const nodes = map.nodes;
      const p = fromPos || (fromId && nodes[fromId]);
      if (!fromId || !world || !p) {
        ribbon.visible = false;
        dot.visible = false;
        return;
      }
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
      if (hoverId && hoverId !== fromId && nodes[hoverId]) {
        hover.visible = true;
        const h = nodes[hoverId];
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
        const mesh = buildings.get(b.id);
        if (!mesh) continue;
        if (mesh.userData.owner !== b.owner) {
          mesh.userData.owner = b.owner;
          paintGroup(mesh, b.owner);
        }
        const zone = zoneMeshes.get(b.id);
        if (zone && zone.userData.owner !== b.owner) {
          zone.userData.owner = b.owner;
          zone.material.color.setHex(ownerPaint(b.owner).slab);
        }
        const ranks = b.upgrades;
        if (mesh.userData.pip) {
          mesh.userData.pip.visible = !!(ranks && (ranks.haste > 0 || ranks.bulwark > 0));
        }
        const danger = b.kind === 'hq' && (b.count <= 0 || sieged(state, b.id, b.owner));
        if (danger && !reduceMotion) {
          const s = 1 + 0.07 * Math.sin(time * 9);
          mesh.scale.set(s, s, s);
        } else {
          mesh.scale.set(1, 1, 1);
        }
      }

      const segs = frontierFrom(boxed, ownerScratch, frontierBuf);
      const pulse = reduceMotion ? 0.9 : 0.72 + 0.28 * Math.sin(time * 3.1);
      glowMat.opacity = reduceMotion ? 0.9 : 0.82 + pulse * 0.18;
      wallMat.opacity = reduceMotion ? 0.8 : 0.7 + pulse * 0.3;
      for (let i = 0; i < glows.length; i++) {
        const seg = segs[i];
        const band = glows[i];
        const wall = walls[i];
        if (!seg) {
          band.visible = false;
          wall.visible = false;
          continue;
        }
        const alongX = seg.axis !== 'z';
        const span = alongX ? Math.max(0.8, seg.x1 - seg.x0) : Math.max(0.8, seg.z1 - seg.z0);
        const cx = alongX ? (seg.x0 + seg.x1) / 2 : seg.x;
        const cz = alongX ? seg.z : (seg.z0 + seg.z1) / 2;
        const flip = seg.plusOwner === 'player' ? 0 : Math.PI;
        band.visible = true;
        wall.visible = true;
        band.position.set(cx, 0.36, cz);
        wall.position.set(cx, 0.36, cz);
        band.scale.set(span, 1, 1);
        wall.scale.set(span, 1 + pulse * 0.08, 1);
        band.rotation.y = alongX ? flip : Math.PI / 2 + flip;
        wall.rotation.y = alongX ? 0 : Math.PI / 2;
      }

      placeMarker(ring, selectedId, state);
      if (!reduceMotion && ring.visible) ring.rotation.y = time * 0.8;

      for (let i = 0; i < flags.length; i++) {
        const flag = flags[i];
        flag.rotation.y = reduceMotion ? 0 : Math.sin(time * 2.2 + i) * 0.4;
      }
    },
    dispose() {
      const geos = new Set();
      const mats = new Set();
      group.traverse((child) => {
        if (child.geometry) geos.add(child.geometry);
        if (child.material) mats.add(child.material);
      });
      for (const geo of geos) geo.dispose();
      for (const material of mats) material.dispose();
    },
  };
}

export function createWorld(scene) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(18, 28),
    mat(PALETTE.water, { roughness: 0.35, metalness: 0.04 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.62;
  scene.add(water);

  const holder = new THREE.Group();
  scene.add(holder);
  let island = null;

  function mount(map) {
    if (island) {
      holder.remove(island.group);
      island.dispose();
      island = null;
    }
    island = buildIsland(map, reduceMotion);
    holder.add(island.group);
  }

  return {
    mount,
    resetDrag() {
      if (island) island.resetDrag();
    },
    setDrag(fromId, world, hoverId, fromPos) {
      if (island) island.setDrag(fromId, world, hoverId, fromPos);
    },
    update(time, state, selectedId) {
      if (island) island.update(time, state, selectedId);
    },
  };
}
