import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GRAPH, NODES } from '../sim/mapdata.js';
import { rotateXZ, yawForFacing } from '../sim/facing.js';
import { PALETTE } from './palette.js';

const MAX = 480;
const _slot = { x: 0, z: 0 };
const _nose = new THREE.Vector3();
const _vel = new THREE.Vector3();

export function visualCount(count) {
  const n = Math.max(0, Math.floor(count));
  if (n <= 12) return n;
  // Dense ranks. A full board plus marching squads can pass 200 bodies under the 480 cap.
  return Math.min(56, 12 + Math.round((n - 12) * 0.8));
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

export function soldierGeometry() {
  // Adult block-out: legs, torso, arms, helmet with brim, pack on +z, rifle on local −z.
  // The rifle's −z extent is the facing cue yawForFacing aims along travel.
  const legL = shade(new THREE.BoxGeometry(0.055, 0.16, 0.07), 0.26);
  legL.translate(-0.045, 0.08, 0.01);
  const legR = shade(new THREE.BoxGeometry(0.055, 0.16, 0.07), 0.2);
  legR.translate(0.045, 0.08, 0.01);
  const torso = shade(new THREE.BoxGeometry(0.15, 0.22, 0.1), 0.42);
  torso.translate(0, 0.25, 0);
  const armL = shade(new THREE.BoxGeometry(0.045, 0.15, 0.05), 0.3);
  armL.translate(-0.105, 0.25, -0.02);
  const armR = shade(new THREE.BoxGeometry(0.045, 0.13, 0.05), 0.28);
  armR.translate(0.1, 0.26, -0.05);
  const helmet = shade(new THREE.BoxGeometry(0.17, 0.1, 0.16), 1);
  helmet.translate(0, 0.43, -0.01);
  const brim = shade(new THREE.BoxGeometry(0.2, 0.028, 0.18), 0.72);
  brim.translate(0, 0.375, -0.02);
  const rifle = shade(new THREE.BoxGeometry(0.035, 0.03, 0.52), 0.08);
  rifle.translate(0.1, 0.23, -0.28);
  const stock = shade(new THREE.BoxGeometry(0.04, 0.055, 0.08), 0.14);
  stock.translate(0.1, 0.21, -0.02);
  const pack = shade(new THREE.BoxGeometry(0.09, 0.11, 0.055), 0.22);
  pack.translate(0, 0.26, 0.08);
  const geo = mergeGeometries([legL, legR, torso, armL, armR, helmet, brim, rifle, stock, pack]);
  geo.computeVertexNormals();
  return geo;
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
  const geo = soldierGeometry();
  const green = new THREE.InstancedMesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: PALETTE.player.main,
      vertexColors: true,
      roughness: 0.62,
      metalness: 0.08,
    }),
    MAX,
  );
  const red = new THREE.InstancedMesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: PALETTE.enemy.main,
      vertexColors: true,
      roughness: 0.62,
      metalness: 0.08,
    }),
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
  scene.add(green, red);

  const dummy = new THREE.Object3D();
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
    const cols = n > 24 ? 8 : 6;
    const spacing = 0.3;
    for (let i = 0; i < n; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const rows = Math.ceil(n / cols);
      const rowCount = r === rows - 1 ? n - r * cols : cols;
      const lx = (c - (rowCount - 1) / 2) * spacing;
      const lz = r * spacing;
      rotateXZ(lx, lz, yaw, _slot);
      const bob = 1 + ((i * 17) % 5) * 0.015;
      push(owner, anchorX + _slot.x, 0.02, anchorZ + _slot.z, yaw, 1.75 * bob, track && i === 0);
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
      noseMesh = null;
      noseIndex = -1;
      let tracked = false;
      const nodes = (state && state.nodes) || activeNodes;

      for (let i = 0; i < state.buildings.length; i++) {
        const b = state.buildings[i];
        if (b.count <= 0) continue;
        const p = nodes[b.node];
        if (!p) continue;
        const yaw = exitYaw(b.node);
        // Crowd stands in front of the door. Local −z is that facing; ranks extend +z, behind it.
        rotateXZ(0, -1, yaw, _slot);
        const anchorX = p.x + _slot.x * 1.45;
        const anchorZ = p.z + _slot.z * 1.45;
        formation(b.owner, anchorX, anchorZ, yaw, b.count, false);
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
      green.instanceMatrix.needsUpdate = true;
      red.instanceMatrix.needsUpdate = true;
    },
  };
}
