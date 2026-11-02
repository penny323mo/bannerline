import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GRAPH, NODES } from '../sim/mapdata.js';
import { rotateXZ, yawForFacing } from '../sim/facing.js';
import { PALETTE } from './palette.js';

const MAX = 480;
/** Small infantry. A figure is about a seventh of a headquarters tower. */
export const SOLDIER_SCALE = 0.48;
export const RANK_SPACING = 0.52;
/** Olive and deep red helmets. Pastel helmets read as salmon and mint from above. */
export const HELMET_PLAYER = 0x3e6b32;
export const HELMET_ENEMY = 0x7c2a22;
const _slot = { x: 0, z: 0 };
const _nose = new THREE.Vector3();
const _vel = new THREE.Vector3();

export function visualCount(count) {
  const n = Math.max(0, Math.floor(count));
  if (n <= 8) return n;
  // One full block under the badge. The cap stays 16. The badge still carries the real headcount.
  return 16;
}

/**
 * Two enemy blocks. The headquarters rank steps out in front of the gate.
 * Every other enemy squad on this half joins the field block, including the
 * badges of a few men, so they do not stand as extra short groups.
 */
function enemyBank(x, z) {
  // Headquarters rank stands on the road in front of the gate, clear of the curb.
  if (z < -5.2) return { x: 1.15, z: -3.85 };
  if (z > -3.6) {
    const lane = x > 0.4 ? 1 : -1;
    return { x: lane < 0 ? -2.55 : 1.9, z: -3.55 };
  }
  return { x, z };
}

/**
 * Where a squad is drawn. Enemy ranks are the gate block and the field block.
 * A player squad short of the bunker joins the advancing crowd.
 */
export function drawAnchor(owner, x, z, count = 0) {
  if (owner === 'enemy') return enemyBank(x, z, count);
  if (z < 4.2 && z > -0.5) return { x: 0.05, z: 1.55 };
  return { x, z };
}

/**
 * Local XZ slot before yaw. A mass is a tight rank, about six to eight across,
 * so thirty figures read as one block. A short player garrison grows up-screen.
 */
export function formationLocal(owner, index, n) {
  const count = Math.max(1, n);
  const enemy = owner === 'enemy';
  const mass = enemy || count > 22;
  const cols = mass
    ? (enemy ? (count >= 20 ? 6 : Math.min(count, 4)) : (count >= 24 ? 6 : 5))
    : Math.min(4, count);
  // Six across. Rows are far enough apart that a block of 30 or 40 reads as ranks, not one line.
  const colGap = mass ? (enemy ? 0.36 : 0.34) : 0.42;
  const rowGap = mass ? (enemy ? 0.38 : 0.58) : 0.36;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const rowCount = Math.min(cols, count - row * cols);
  const lx = (col - (rowCount - 1) / 2) * colGap;
  // Enemy yaw π maps local −z onto world +z, toward the camera.
  // Player yaw 0 maps local +z down the meadow. A short garrison uses −z.
  const lz = enemy || !mass ? -row * rowGap : row * rowGap;
  return { lx, lz, mass };
}

/** World XZ of one drawn figure. Mass blocks stay axis-aligned so columns do not stack. */
export function formationWorld(owner, index, n, yaw, out) {
  const local = formationLocal(owner, index, n);
  const enemy = owner === 'enemy';
  if (local.mass && (n > 22 || (enemy && n >= 20))) {
    out.x = local.lx;
    out.z = enemy ? -local.lz : local.lz;
    return out;
  }
  return rotateXZ(local.lx, local.lz, yaw, out);
}

/** Figures on screen for one squad. visualCount stays the pick cap. This only scales the draw. */
export function drawnCount(owner, count) {
  const raw = Math.max(0, Math.floor(count));
  if (raw <= 8) return raw;
  if (owner === 'enemy') return Math.min(32, Math.max(raw, Math.round(raw * 2)));
  if (raw < 16) return Math.min(22, Math.round(raw * 1.4));
  return Math.min(44, Math.round(raw * 2.3));
}

/**
 * Bodies for every squad that shares one anchor. A handful pooled on that
 * spot is one block, about 30 red or about 40 green, not each squad's own
 * handful stacked on the same point. A garrison that does not share the
 * spot keeps its own count. Badges stay the real counts.
 */
export function blockDrawCount(owner, pooled) {
  const raw = Math.max(0, Math.floor(pooled));
  if (raw <= 8) return raw;
  if (owner === 'enemy') return 30;
  if (raw >= 16) return 40;
  return Math.min(22, Math.round(raw * 1.4));
}

/** Team colour stays off vertices darker than about 0.25, so the shotgun stays dark metal. */
function tintSoldierGeo(source, tintHex) {
  const geo = source.clone();
  const attr = geo.getAttribute('color');
  if (!attr) return geo;
  const pos = geo.getAttribute('position');
  const team = new THREE.Color(tintHex);
  const tone = new THREE.Color();
  for (let i = 0; i < attr.count; i++) {
    tone.setRGB(attr.getX(i), attr.getY(i), attr.getZ(i));
    const lum = tone.r * 0.2126 + tone.g * 0.7152 + tone.b * 0.0722;
    if (lum < 0.25) continue;
    tone.multiply(team);
    const y = pos ? pos.getY(i) : 0.5;
    let shade = 0.94 + (i % 5) * 0.02;
    if (y < 0.42) shade *= 0.82;
    else if (y > 0.8) shade *= 0.88;
    tone.multiplyScalar(shade);
    attr.setXYZ(i, tone.r, tone.g, tone.b);
  }
  attr.needsUpdate = true;
  return geo;
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
  // Longer cloth under a flat cap. The yoke stays wider than that cap.
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
  head.translate(0, 0.75, 0);
  // Flat cap. The dome is squashed so it is not a ball, and the brim sticks out past it.
  const helmet = shade(new THREE.SphereGeometry(0.15, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), 1);
  helmet.scale(1, 0.35, 1);
  helmet.translate(0, 0.78, -0.01);
  const band = shade(new THREE.TorusGeometry(0.14, 0.016, 5, 10), 0.88);
  band.rotateX(Math.PI / 2);
  band.translate(0, 0.785, -0.01);
  const brim = shade(new THREE.CylinderGeometry(0.22, 0.22, 0.012, 12), 0.72);
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
    const gMesh = new THREE.InstancedMesh(troopGeometry(0x3a4030, HELMET_PLAYER, v), troopMat, MAX);
    const rMesh = new THREE.InstancedMesh(troopGeometry(0x403830, HELMET_ENEMY, v), troopMat, MAX);
    // Side sun. The contact pad still marks the foot when the shadow map is off.
    gMesh.castShadow = true;
    rMesh.castShadow = true;
    gMesh.receiveShadow = false;
    rMesh.receiveShadow = false;
    gMesh.frustumCulled = false;
    rMesh.frustumCulled = false;
    gMesh.count = 0;
    rMesh.count = 0;
    green.push(gMesh);
    red.push(rMesh);
  }
  const padGeo = new THREE.CircleGeometry(0.42, 14);
  padGeo.rotateX(-Math.PI / 2);
  const pads = new THREE.InstancedMesh(
    padGeo,
    new THREE.MeshBasicMaterial({
      color: 0x12160f,
      transparent: true,
      opacity: 0.28,
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
  let modelMul = 1;

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
    const wide = scale * modelMul;
    // Wider than the thin GLB so a rank reads as helmets and jackets, not sticks.
    dummy.scale.set(wide * 1.55, wide * 1.08, wide * 1.28);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    if (pi < MAX) {
      dummy.position.y = 0.025;
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(scale * modelMul * 1.05, 1, scale * modelMul * 0.7);
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

  function formation(owner, anchorX, anchorZ, yaw, n, track) {
    if (n <= 0) return;
    const enemy = owner === 'enemy';
    for (let i = 0; i < n; i++) {
      const lead = track && i === 0;
      formationWorld(owner, i, n, yaw, _slot);
      const bob = lead ? 1 : 0.96;
      const yawJ = enemy || lead ? yaw : yaw + ((i % 5) - 2) * 0.035;
      const pose = lead ? 0 : (i % 2) + 1;
      push(owner, anchorX + _slot.x, 0.02, anchorZ + _slot.z, yawJ, SOLDIER_SCALE * bob, lead, 0, pose);
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
      const pending = [];

      for (let i = 0; i < state.buildings.length; i++) {
        const b = state.buildings[i];
        if (b.count <= 0) continue;
        const p = nodes[b.node];
        if (!p) continue;
        // Face the enemy, and stand beside the mesh so the rank does not cover the badge.
        const spot = garrisonAnchor(b.owner, b.kind, p.x, p.z, b.count);
        const parked = drawAnchor(b.owner, spot.x, spot.z, b.count);
        pending.push({
          owner: b.owner,
          x: parked.x,
          z: parked.z,
          yaw: spot.yaw,
          count: b.count,
          squad: null,
        });
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
        const parked = drawAnchor(s.owner, s.x, s.z, s.count);
        pending.push({
          owner: s.owner,
          x: parked.x,
          z: parked.z,
          yaw,
          count: s.count,
          squad: s,
        });
      }

      const groups = [];
      const byAnchor = new Map();
      for (let i = 0; i < pending.length; i++) {
        const item = pending[i];
        const key = `${item.owner}@${item.x.toFixed(2)},${item.z.toFixed(2)}`;
        let group = byAnchor.get(key);
        if (!group) {
          group = {
            owner: item.owner,
            x: item.x,
            z: item.z,
            yaw: item.yaw,
            raw: 0,
            lead: null,
          };
          byAnchor.set(key, group);
          groups.push(group);
        }
        group.raw += item.count;
        if (!group.lead && item.squad && item.squad.mode === 'march') group.lead = item.squad;
      }

      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const wantTrack = !tracked && group.lead;
        formation(group.owner, group.x, group.z, group.yaw, blockDrawCount(group.owner, group.raw), wantTrack);
        if (!wantTrack) continue;
        tracked = true;
        const squad = group.lead;
        const prev = prevPos.get(squad.id);
        if (prev && noseMesh) {
          const vx = squad.x - prev.x;
          const vz = squad.z - prev.z;
          const vlen = Math.hypot(vx, vz);
          if (vlen > 0.004) {
            _vel.set(vx / vlen, 0, vz / vlen);
            lastDot = _nose.dot(_vel);
          }
        }
        let slot = prevPos.get(squad.id);
        if (!slot) {
          slot = { x: squad.x, z: squad.z };
          prevPos.set(squad.id, slot);
        } else {
          slot.x = squad.x;
          slot.z = squad.z;
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
    useSoldier(geo) {
      const greenGeo = tintSoldierGeo(geo, 0x2a5c32);
      const redGeo = tintSoldierGeo(geo, 0x8e1c1c);
      const greenMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.78,
        metalness: 0.04,
        vertexColors: true,
      });
      const redMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.78,
        metalness: 0.04,
        vertexColors: true,
      });
      for (let v = 0; v < POSES; v++) {
        green[v].geometry = greenGeo;
        red[v].geometry = redGeo;
        green[v].material = greenMat;
        red[v].material = redMat;
      }
      pads.visible = true;
      modelMul = 1.8;
    },
  };
}
