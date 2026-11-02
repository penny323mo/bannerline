import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GRAPH, NODES } from '../sim/mapdata.js';
import { rotateXZ, yawForFacing } from '../sim/facing.js';
import { PALETTE } from './palette.js';

const MAX = 480;
/** Rank size paired with the play camera so a helmet stays readable beside the pad. */
export const SOLDIER_SCALE = 1.28;
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
 * on its own pad, on the far side of that pad's barracks. The player pad
 * is closer to the camera, so its step is shorter than the enemy step.
 * Both stay inside the 390px frame. The enemy step stays past 1.5.
 * A barracks rank stands on the lane side of the pad: the outer side of
 * this camera runs off the screen, and the rank still stays clear of the
 * mesh. A pad on the stream bank stands on the home side, toward the lane.
 * Other ranks stop about 0.72 from the bank. The sideways step uses the
 * soldier's right from rotateXZ. Player yaw 0 faces −z. Enemy yaw π mirrors it.
 * Headquarters forward stays capped at 0.15.
 */
export function garrisonAnchor(owner, kind, x, z, count) {
  const n = Math.max(1, visualCount(count));
  const cols = colsFor(n);
  const rows = Math.ceil(n / cols);
  const depth = (rows - 1) * RANK_SPACING;
  const room = Math.abs(z) - 0.72;
  let forward = Math.max(0.28, Math.min(depth + 0.5, Math.max(0.28, room)));
  // Lane-side barracks step is negative so the rank leaves the outer edge.
  let flank = kind === 'hq' ? (owner === 'player' ? 1.28 : 1.55) : -1.9;
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
    flank = -1.5;
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

function around(geo, x, y, z, rx, ry) {
  geo.translate(-x, -y, -z);
  if (rx) geo.rotateX(rx);
  if (ry) geo.rotateY(ry);
  geo.translate(x, y, z);
  return geo;
}

export function soldierGeometry(variant = 0) {
  // Longer cloth under a helmet that stays about a sixth of the height.
  // Variant 0 is the standing mesh the size tests measure. 1 and 2 stride.
  const legL = shade(limb(0.04, 0.05, 0.46, 6), 0.22);
  legL.translate(-0.07, 0.23, 0.02);
  const legR = shade(limb(0.04, 0.05, 0.46, 6), 0.16);
  legR.translate(0.07, 0.23, -0.02);
  // Jacket chest, then a short yoke only a little wider across than the cloth.
  const torso = shade(limb(0.19, 0.155, 0.48, 8), 0.42);
  torso.translate(0, 0.48, 0);
  const shoulders = shade(new THREE.CylinderGeometry(0.23, 0.20, 0.09, 8), 0.38);
  shoulders.scale(1.12, 1, 0.78);
  shoulders.translate(0, 0.70, 0);
  const armL = shade(limb(0.034, 0.04, 0.3, 6), 0.9);
  armL.translate(-0.25, 0.58, -0.04);
  const armR = shade(limb(0.03, 0.034, 0.28, 6), 0.26);
  armR.translate(0.25, 0.56, -0.05);
  const head = shade(limb(0.04, 0.044, 0.07, 8), 0.55);
  head.translate(0, 0.8, 0);
  // Cap about a sixth of the figure, narrower than the shoulder. Brim only just past it.
  const helmet = shade(new THREE.SphereGeometry(0.15, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), 1);
  helmet.scale(1, 0.95, 1);
  helmet.translate(0, 0.78, -0.01);
  const band = shade(new THREE.TorusGeometry(0.14, 0.016, 5, 10), 0.88);
  band.rotateX(Math.PI / 2);
  band.translate(0, 0.8, -0.01);
  const brim = shade(new THREE.CylinderGeometry(0.17, 0.17, 0.012, 12), 0.72);
  brim.translate(0, 0.772, -0.02);
  // Rifle on local −z, just outside the shoulder.
  const rifle = shade(new THREE.BoxGeometry(0.04, 0.03, 0.5), 0.08);
  rifle.translate(0.34, 0.5, -0.36);
  const stock = shade(new THREE.BoxGeometry(0.048, 0.05, 0.09), 0.12);
  stock.translate(0.33, 0.46, -0.08);
  const pack = shade(new THREE.BoxGeometry(0.12, 0.14, 0.07), 0.2);
  pack.translate(0, 0.52, 0.12);
  if (variant === 1) {
    // A long stride and a rifle swung out so both clear the body from above.
    around(legL, -0.07, 0.46, 0.02, 1.25, 0.1);
    around(legR, 0.07, 0.46, -0.02, -1.05, 0);
    around(armL, -0.25, 0.68, -0.04, -0.85, 0.25);
    around(armR, 0.25, 0.66, -0.05, 0.45, -0.35);
    around(rifle, 0.34, 0.5, -0.14, 0.12, -1.05);
    around(torso, 0, 0.48, 0, 0.18, 0.28);
  } else if (variant === 2) {
    around(legL, -0.07, 0.46, 0.02, -1.0, 0);
    around(legR, 0.07, 0.46, -0.02, 1.2, -0.12);
    around(armL, -0.25, 0.68, -0.04, 0.9, -0.2);
    around(armR, 0.25, 0.66, -0.05, -0.35, 0.4);
    around(rifle, 0.34, 0.5, -0.14, -0.12, 1.0);
    around(torso, 0, 0.48, 0, 0.22, -0.42);
  }
  const geo = mergeGeometries([legL, legR, torso, shoulders, armL, armR, head, helmet, band, brim, rifle, stock, pack]);
  geo.computeVertexNormals();
  return geo;
}

/** Grey shade becomes khaki cloth, an olive dome, and a team band plus one arm. */
function troopGeometry(uniformHex, bandHex, variant) {
  const geo = soldierGeometry(variant || 0);
  const src = geo.getAttribute('color');
  const colors = new Float32Array(src.count * 3);
  const uniform = new THREE.Color(uniformHex);
  const deep = uniform.clone().multiplyScalar(0.62);
  const dome = new THREE.Color(0x4c5342);
  const band = new THREE.Color(bandHex);
  const brim = new THREE.Color(0x343a30);
  const skin = new THREE.Color(0xc4a882);
  const rifle = new THREE.Color(0x2c332e);
  const cloth = new THREE.Color();
  for (let i = 0; i < src.count; i++) {
    const v = src.getX(i);
    let tone = uniform;
    if (v >= 0.95) tone = dome;
    else if (v >= 0.85) tone = band;
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

const POSES = 3;

export function createCrowds(scene) {
  const troopMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.74,
    metalness: 0.04,
  });
  const green = [];
  const red = [];
  for (let v = 0; v < POSES; v++) {
    const gMesh = new THREE.InstancedMesh(troopGeometry(0x5a6048, HELMET_PLAYER, v), troopMat, MAX);
    const rMesh = new THREE.InstancedMesh(troopGeometry(0x645e4c, HELMET_ENEMY, v), troopMat, MAX);
    // Soldiers do not cast. A few hundred casters blow the 1024 shadow map.
    gMesh.castShadow = false;
    rMesh.castShadow = false;
    gMesh.receiveShadow = false;
    rMesh.receiveShadow = false;
    gMesh.frustumCulled = false;
    rMesh.frustumCulled = false;
    gMesh.count = 0;
    rMesh.count = 0;
    green.push(gMesh);
    red.push(rMesh);
  }
  const padGeo = new THREE.CircleGeometry(0.3, 12);
  padGeo.rotateX(-Math.PI / 2);
  const pads = new THREE.InstancedMesh(
    padGeo,
    new THREE.MeshBasicMaterial({
      color: 0x1a2016,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    }),
    MAX,
  );
  pads.castShadow = false;
  pads.receiveShadow = false;
  pads.frustumCulled = false;
  pads.count = 0;
  scene.add(...green, ...red, pads);

  const dummy = new THREE.Object3D();
  let pi = 0;
  const yawCache = new Map();
  const prevPos = new Map();
  const gCount = [0, 0, 0];
  const rCount = [0, 0, 0];
  let lastDot = null;
  let noseMesh = null;
  let noseIndex = -1;

  function rememberYaw(id, dirX, dirZ) {
    if (Math.hypot(dirX, dirZ) < 0.05) return yawCache.get(id) || 0;
    const yaw = yawForFacing(dirX, dirZ);
    yawCache.set(id, yaw);
    return yaw;
  }

  function push(owner, x, y, z, yaw, scale, trackNose, lean, pose) {
    const meshes = owner === 'player' ? green : red;
    const counts = owner === 'player' ? gCount : rCount;
    const slot = pose || 0;
    const mesh = meshes[slot];
    const index = counts[slot];
    if (index >= MAX) return;
    const tip = lean || 0;
    dummy.position.set(x, y, z);
    dummy.rotation.set(tip * 0.4, yaw, tip * 0.25);
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
    counts[slot] += 1;
    if (trackNose) {
      noseMesh = mesh;
      noseIndex = index;
      _nose.set(0, 0, -1).applyQuaternion(dummy.quaternion);
    }
  }

  function formation(owner, anchorX, anchorZ, yaw, count, track) {
    const n = visualCount(count);
    if (n <= 0) return;
    const placed = [];
    for (let i = 0; i < n; i++) {
      const lead = track && i === 0;
      // Each figure keeps its own offset. A column index rebuilds the rows.
      let lx = 0;
      let lz = 0;
      if (!lead) {
        for (let attempt = 0; attempt < 8; attempt++) {
          const ang = i * 2.399963 + attempt * 0.85 + Math.sin(i * 3.7) * 0.4;
          const rad = 0.95 + (i % 4) * 0.36 + attempt * 0.24;
          lx = Math.cos(ang) * rad;
          lz = Math.sin(ang) * rad * 0.72;
          let clear = true;
          for (let k = 0; k < placed.length; k++) {
            const dx = lx - placed[k].x;
            const dz = lz - placed[k].z;
            if (dx * dx + dz * dz < 0.88 * 0.88) {
              clear = false;
              break;
            }
          }
          if (clear) break;
        }
      }
      placed.push({ x: lx, z: lz });
      rotateXZ(lx, lz, yaw, _slot);
      const bob = lead ? 1 : 0.74 + Math.abs(Math.sin(i * 2.4)) * 0.42;
      const yawJ = lead ? yaw : yaw + Math.sin(i * 1.9) * 0.9;
      const lean = lead ? 0 : Math.sin(i * 2.6) * 0.22;
      const pose = lead ? 0 : (i % 2) + 1;
      push(owner, anchorX + _slot.x, 0.02, anchorZ + _slot.z, yawJ, SOLDIER_SCALE * bob, lead, lean, pose);
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
      for (let v = 0; v < POSES; v++) {
        gCount[v] = 0;
        rCount[v] = 0;
      }
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

      for (let v = 0; v < POSES; v++) {
        green[v].count = gCount[v];
        red[v].count = rCount[v];
        green[v].instanceMatrix.needsUpdate = true;
        red[v].instanceMatrix.needsUpdate = true;
      }
      pads.count = pi;
      pads.instanceMatrix.needsUpdate = true;
    },
  };
}
