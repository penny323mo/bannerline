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
  if (n <= 16) return n;
  return Math.min(30, 16 + Math.round((n - 16) / 3));
}

function soldierGeometry() {
  // Chunky pawn: box torso, round head, nose on local −z so the crowd faces travel.
  const body = new THREE.BoxGeometry(0.28, 0.34, 0.18);
  body.translate(0, 0.2, 0);
  const head = new THREE.SphereGeometry(0.11, 7, 6);
  head.translate(0, 0.44, 0);
  const nose = new THREE.BoxGeometry(0.07, 0.05, 0.08);
  nose.translate(0, 0.44, -0.12);
  const geo = mergeGeometries([body, head, nose]);
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
    new THREE.MeshLambertMaterial({ color: PALETTE.player.main }),
    MAX,
  );
  const red = new THREE.InstancedMesh(
    geo,
    new THREE.MeshLambertMaterial({ color: PALETTE.enemy.main }),
    MAX,
  );
  green.castShadow = false;
  red.castShadow = false;
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
    const cols = n > 18 ? 6 : 5;
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
      push(owner, anchorX + _slot.x, 0.06, anchorZ + _slot.z, yaw, 1.05 * bob, track && i === 0);
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
        const anchorX = p.x + _slot.x * 1.25;
        const anchorZ = p.z + _slot.z * 1.25;
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
