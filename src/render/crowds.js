import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GRAPH, NODES } from '../sim/mapdata.js';
import { rotateXZ, yawForFacing } from '../sim/facing.js';
import { PALETTE } from './palette.js';

const MAX = 480;
/** Rank size paired with the play camera so a helmet stays readable beside the pad. */
export const SOLDIER_SCALE = 1.18;
export const RANK_SPACING = 0.52;
/** Olive and deep red helmets. Pastel helmets read as salmon and mint from above. */
export const HELMET_PLAYER = 0x3e6b32;
export const HELMET_ENEMY = 0x7c2a22;
const _slot = { x: 0, z: 0 };
const _nose = new THREE.Vector3();
const _vel = new THREE.Vector3();

export function visualCount(count) {
  const n = Math.max(0, Math.floor(count));
  if (n <= 4) return n;
  // One figure stands for several troops. The count badge keeps the real number.
  return Math.min(9, 3 + Math.round(Math.sqrt(n) * 0.7));
}

/** Short loose ranks. A few larger figures read as a squad, not a dot grid. */
export function colsFor(n) {
  if (n > 8) return 4;
  if (n > 4) return 3;
  return Math.max(1, n);
}

const _garrison = { x: 0, z: 0 };

/**
 * Front rank beside the pad, off the mesh and off the next count pill.
 * Formation local +z grows back toward the building. A headquarters stays
 * on its own pad, on the far side of that pad's barracks. A pad on the
 * stream bank stands on the home side. Other ranks stop about 0.72 from
 * the bank. The sideways step uses the soldier's right from rotateXZ.
 * Player yaw 0 faces −z. Enemy yaw π mirrors it.
 */
export function garrisonAnchor(owner, kind, x, z, count) {
  const n = Math.max(1, visualCount(count));
  const cols = colsFor(n);
  const rows = Math.ceil(n / cols);
  const depth = (rows - 1) * RANK_SPACING;
  const room = Math.abs(z) - 0.72;
  let forward = Math.max(0.28, Math.min(depth + 0.5, Math.max(0.28, room)));
  let flank = kind === 'hq' ? 2.7 : 1.8;
  const yaw = owner === 'player' ? yawForFacing(0, -1) : yawForFacing(0, 1);
  let side = 0;
  if (x > 0.4) side = 1;
  else if (x < -0.4) side = -1;
  else side = owner === 'player' ? 1 : -1;
  if (kind === 'hq') {
    forward = Math.min(forward, 0.15);
    if (Math.abs(x) <= 0.4) side = -side;
  } else if (Math.abs(z) < 2.4) {
    forward = -0.45;
    flank = Math.abs(x) > 0.4 ? 2.35 : 2.05;
  }
  rotateXZ(1, 0, yaw, _garrison);
  const localSide = _garrison.x * side >= 0 ? flank : -flank;
  rotateXZ(localSide, -forward, yaw, _garrison);
  return { x: x + _garrison.x, z: z + _garrison.z, yaw };
}

/**
 * Helmet, torso, and a rifle. The rifle box is translated on local −z.
 * yawForFacing aims that axis along travel; the instance quaternion's −z
 * is the same axis the crowd's facing probe reads.
 */
function shade(geo, value) {
  const n = geo.getAttribute('position').count;
  const colors = new Float32Array(n * 3);
  colors.fill(value);
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function limb(radiusTop, radiusBottom, height, sides) {
  return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, sides);
}

export function soldierGeometry() {
  // Helmeted infantry. Local −z is the rifle, which yawForFacing aims along travel.
  // A 3- or 4-side cylinder is a prism. At the play camera those prisms read as stacked cubes,
  // so limbs stay at 6+ sides and the helmet is a sphere, not a box.
  const legL = shade(limb(0.042, 0.05, 0.28, 6), 0.22);
  legL.translate(-0.07, 0.14, 0.05);
  const legR = shade(limb(0.042, 0.05, 0.28, 6), 0.16);
  legR.translate(0.07, 0.14, 0.05);
  const torso = shade(limb(0.13, 0.15, 0.32, 8), 0.42);
  torso.translate(0, 0.4, 0);
  const shoulders = shade(new THREE.CylinderGeometry(0.16, 0.15, 0.06, 8), 0.38);
  shoulders.translate(0, 0.54, 0);
  const armL = shade(limb(0.03, 0.034, 0.2, 6), 0.9);
  armL.translate(-0.15, 0.4, -0.06);
  const armR = shade(limb(0.03, 0.032, 0.18, 6), 0.26);
  armR.translate(0.15, 0.4, -0.08);
  const head = shade(limb(0.05, 0.055, 0.09, 8), 0.55);
  head.translate(0, 0.58, 0);
  const helmet = shade(new THREE.SphereGeometry(0.092, 10, 8), 1);
  helmet.translate(0, 0.66, -0.012);
  const band = shade(new THREE.TorusGeometry(0.078, 0.016, 6, 10), 0.88);
  band.rotateX(Math.PI / 2);
  band.translate(0, 0.64, -0.012);
  const brim = shade(new THREE.BoxGeometry(0.2, 0.026, 0.14), 0.78);
  brim.translate(0, 0.6, -0.05);
  // Thick barrel on local −z. Length stays short so a rank cannot stripe the road.
  const rifle = shade(new THREE.BoxGeometry(0.06, 0.052, 0.28), 0.08);
  rifle.translate(0.16, 0.4, -0.2);
  const stock = shade(new THREE.BoxGeometry(0.07, 0.08, 0.1), 0.12);
  stock.translate(0.15, 0.32, -0.06);
  const pack = shade(new THREE.BoxGeometry(0.09, 0.11, 0.06), 0.2);
  pack.translate(0, 0.34, 0.09);
  const geo = mergeGeometries([legL, legR, torso, shoulders, armL, armR, head, helmet, band, brim, rifle, stock, pack]);
  geo.computeVertexNormals();
  return geo;
}

/** Grey shade on soldierGeometry becomes khaki cloth, a team armband, helmet, skin, and rifle. */
function troopGeometry(uniformHex, helmetHex, accentHex) {
  const geo = soldierGeometry();
  const src = geo.getAttribute('color');
  const colors = new Float32Array(src.count * 3);
  const uniform = new THREE.Color(uniformHex);
  const deep = uniform.clone().multiplyScalar(0.62);
  const helmet = new THREE.Color(helmetHex);
  const brim = helmet.clone().multiplyScalar(0.62);
  const accent = new THREE.Color(accentHex);
  const skin = new THREE.Color(0xc4a882);
  const rifle = new THREE.Color(0x2c332e);
  const cloth = new THREE.Color();
  for (let i = 0; i < src.count; i++) {
    const v = src.getX(i);
    let tone = uniform;
    if (v >= 0.95) tone = helmet;
    else if (v >= 0.85) tone = accent;
    else if (v >= 0.7) tone = brim;
    else if (v >= 0.5) tone = skin;
    else if (v <= 0.14) tone = rifle;
    else {
      cloth.copy(deep).lerp(uniform, Math.min(1, (v - 0.14) / 0.36));
      tone = cloth;
    }
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function exitReach(nodeId) {
  const nexts = activeGraph[nodeId] || [];
  const next = nexts[0];
  const a = activeNodes[nodeId];
  const b = next && activeNodes[next];
  if (!a || !b) return 1.8;
  return Math.hypot(b.x - a.x, b.z - a.z);
}

let activeNodes = NODES;
let activeGraph = GRAPH;

function exitYaw(nodeId) {
  const nexts = activeGraph[nodeId] || [];
  const next = nexts[0];
  const a = activeNodes[nodeId];
  const b = next && activeNodes[next];
  if (!a || !b) return 0;
  return yawForFacing(b.x - a.x, b.z - a.z);
}

export function createCrowds(scene) {
  const troopMat = () => new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.74,
    metalness: 0.04,
  });
  const green = new THREE.InstancedMesh(
    troopGeometry(0x5a6048, HELMET_PLAYER, PALETTE.player.main),
    troopMat(),
    MAX,
  );
  const red = new THREE.InstancedMesh(
    troopGeometry(0x645e4c, HELMET_ENEMY, PALETTE.enemy.main),
    troopMat(),
    MAX,
  );
  // Soldiers do not cast. A few hundred casters blow the 1024 shadow map.
  green.castShadow = false;
  red.castShadow = false;
  green.receiveShadow = false;
  red.receiveShadow = false;
  green.frustumCulled = false;
  red.frustumCulled = false;
  green.count = 0;
  red.count = 0;
  const padGeo = new THREE.CircleGeometry(0.22, 8);
  padGeo.rotateX(-Math.PI / 2);
  const pads = new THREE.InstancedMesh(
    padGeo,
    new THREE.MeshBasicMaterial({
      color: 0x1a2016,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    }),
    MAX,
  );
  pads.castShadow = false;
  pads.receiveShadow = false;
  pads.frustumCulled = false;
  pads.count = 0;
  scene.add(green, red, pads);

  const dummy = new THREE.Object3D();
  let pi = 0;
  const yawCache = new Map();
  const prevPos = new Map();
  let gi = 0;
  let ri = 0;
  let lastDot = null;
  let noseMesh = null;
  let noseIndex = -1;

  function rememberYaw(id, dirX, dirZ) {
    if (Math.hypot(dirX, dirZ) < 0.05) return yawCache.get(id) || 0;
    const yaw = yawForFacing(dirX, dirZ);
    yawCache.set(id, yaw);
    return yaw;
  }

  function push(owner, x, y, z, yaw, scale, trackNose) {
    const mesh = owner === 'player' ? green : red;
    const index = owner === 'player' ? gi : ri;
    if (index >= MAX) return;
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, yaw, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    if (pi < MAX) {
      dummy.position.y = 0.03;
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(scale * 0.72, 1, scale * 0.46);
      dummy.updateMatrix();
      pads.setMatrixAt(pi, dummy.matrix);
      pi += 1;
      dummy.rotation.set(0, yaw, 0);
    }
    if (owner === 'player') gi += 1;
    else ri += 1;
    if (trackNose) {
      noseMesh = mesh;
      noseIndex = index;
      _nose.set(0, 0, -1).applyQuaternion(dummy.quaternion);
    }
  }

  function formation(owner, anchorX, anchorZ, yaw, count, track) {
    const n = visualCount(count);
    if (n <= 0) return;
    const cols = colsFor(n);
    const spacing = RANK_SPACING;
    for (let i = 0; i < n; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const rows = Math.ceil(n / cols);
      const rowCount = r === rows - 1 ? n - r * cols : cols;
      const lx = (c - (rowCount - 1) / 2) * spacing + (r % 2) * spacing * 0.28;
      const lz = r * spacing * 0.86 + ((i * 5) % 3 - 1) * spacing * 0.08;
      rotateXZ(lx, lz, yaw, _slot);
      const bob = 1 + ((i * 17) % 5) * 0.015;
      push(owner, anchorX + _slot.x, 0.02, anchorZ + _slot.z, yaw, SOLDIER_SCALE * bob, track && i === 0);
    }
  }

  return {
    facingDot() {
      return lastDot;
    },
    setMap(map) {
      activeNodes = map.nodes || NODES;
      activeGraph = map.graph || GRAPH;
      yawCache.clear();
      prevPos.clear();
    },
    update(state) {
      gi = 0;
      ri = 0;
      pi = 0;
      noseMesh = null;
      noseIndex = -1;
      let tracked = false;
      const nodes = (state && state.nodes) || activeNodes;

      for (let i = 0; i < state.buildings.length; i++) {
        const b = state.buildings[i];
        if (b.count <= 0) continue;
        const p = nodes[b.node];
        if (!p) continue;
        // Face the enemy, and stand beside the mesh so the rank does not cover the badge.
        const spot = garrisonAnchor(b.owner, b.kind, p.x, p.z, b.count);
        formation(b.owner, spot.x, spot.z, spot.yaw, b.count, false);
      }

      for (let i = 0; i < state.squads.length; i++) {
        const s = state.squads[i];
        if (s.count <= 0) continue;
        let dx = 0;
        let dz = 0;
        if (s.mode === 'march' && s.seg < s.path.length - 1) {
          const next = nodes[s.path[s.seg + 1]];
          if (next) {
            dx = next.x - s.x;
            dz = next.z - s.z;
          }
        } else if (s.path.length > 1) {
          const prev = nodes[s.path[Math.max(0, s.seg - 1)]];
          if (prev) {
            dx = s.x - prev.x;
            dz = s.z - prev.z;
          }
        }
        const yaw = rememberYaw(s.id, dx, dz);
        const wantTrack = !tracked && s.mode === 'march';
        formation(s.owner, s.x, s.z, yaw, s.count, wantTrack);
        if (wantTrack) {
          tracked = true;
          const prev = prevPos.get(s.id);
          if (prev && noseMesh) {
            const vx = s.x - prev.x;
            const vz = s.z - prev.z;
            const vlen = Math.hypot(vx, vz);
            if (vlen > 0.004) {
              _vel.set(vx / vlen, 0, vz / vlen);
              lastDot = _nose.dot(_vel);
            }
          }
          let slot = prevPos.get(s.id);
          if (!slot) {
            slot = { x: s.x, z: s.z };
            prevPos.set(s.id, slot);
          } else {
            slot.x = s.x;
            slot.z = s.z;
          }
        }
      }

      green.count = gi;
      red.count = ri;
      pads.count = pi;
      green.instanceMatrix.needsUpdate = true;
      red.instanceMatrix.needsUpdate = true;
      pads.instanceMatrix.needsUpdate = true;
    },
  };
}
