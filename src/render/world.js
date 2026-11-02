import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { yawForFacing } from '../sim/facing.js';
import { boxMapZones, frontierFrom } from '../sim/territory.js';
import { PALETTE, ownerPaint } from './palette.js';
import { rocksFor, streamBand, streamCrossings, treesFor } from './scenery.js';

/** Olive-grey walls. Team colour stays on the roof and the flag. */
const WALL = 0x5a6158;
const WATER_HALF = 0.64;
const BANK_OUT = 0.98;
const STREAM_BOW = 0.28;

const UP = new THREE.Vector3(0, 1, 0);
const LOCAL_Z = new THREE.Vector3(0, 0, 1);
const _dir = new THREE.Vector3();

function mat(color, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.05,
    ...extra,
  });
}

/** Most of the way toward the wall, so a trim stays a dull team edge. */
function muteTeam(hex) {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color(WALL), 0.74);
  return color.getHex();
}

/** Territory stains sit under the emissive front, so they stay close to meadow. */
function stain(hex) {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color(PALETTE.meadow), 0.58);
  return color.getHex();
}

const _stainBase = new THREE.Color();
const _stainDirt = new THREE.Color(0x8d6840);
const _stainDeep = new THREE.Color(0x3a4a2c);
const _stainTone = new THREE.Color();

/** Break a flat owner disc into dirt and deep-grass patches. */
function tintZone(mesh, hex) {
  const geo = mesh.geometry;
  const pos = geo.attributes.position;
  let colors = geo.attributes.color;
  if (!colors) {
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3));
    colors = geo.attributes.color;
  }
  _stainBase.setHex(hex);
  const ox = mesh.position.x;
  const oz = mesh.position.z;
  const sx = mesh.scale.x || 1;
  const sz = mesh.scale.z || 1;
  const flankDirt = new THREE.Color(0x3a2c1c);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) * sx + ox;
    const z = pos.getZ(i) * sz + oz;
    const n = Math.sin(x * 1.55) + Math.cos(z * 1.25);
    const beside = Math.abs(x) > 0.85 && Math.abs(x) < 3.2 && Math.abs(z) > 0.85;
    _stainTone.copy(_stainBase);
    if (beside && Math.sin(x * 2.1 + z * 1.6) > -0.05) _stainTone.lerp(flankDirt, 0.9);
    else if (n > 0.1) _stainTone.lerp(_stainDirt, 0.9);
    else if (n < -0.25) _stainTone.lerp(_stainDeep, 0.82);
    colors.setXYZ(i, _stainTone.r, _stainTone.g, _stainTone.b);
  }
  colors.needsUpdate = true;
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
    new THREE.TorusGeometry(radius, 0.04, 6, 24),
    new THREE.MeshBasicMaterial({ color: PALETTE.metal }),
  );
  pip.rotation.x = Math.PI / 2;
  pip.position.y = 0.1;
  pip.visible = false;
  pip.name = 'pip';
  return pip;
}

const _bakePos = new THREE.Vector3();
const _bakeQuat = new THREE.Quaternion();
const _bakeScale = new THREE.Vector3(1, 1, 1);
const _bakeEuler = new THREE.Euler();
const _bakeMatrix = new THREE.Matrix4();

function baked(geo, x, y, z, rx = 0, ry = 0, rz = 0) {
  _bakeEuler.set(rx, ry, rz);
  _bakeQuat.setFromEuler(_bakeEuler);
  _bakePos.set(x, y, z);
  geo.applyMatrix4(_bakeMatrix.compose(_bakePos, _bakeQuat, _bakeScale));
  return geo;
}

function mergedMesh(parts, material) {
  const geo = mergeGeometries(parts);
  for (let i = 0; i < parts.length; i++) parts[i].dispose();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Standalone bevel. RoundedBox is non-indexed, so it stays off the indexed merges. */
function roundMesh(w, h, d, segs, radius, x, y, z, material) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, segs, radius), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Fortified bunker. Local −z faces the road (the same yaw as the squad exit).
 * The dish sits at local y 1.99 so the roof pick (world y 2.05, group at 0.06) lands on it.
 * The flag sits at local y 2.49, world y 2.55.
 * Static concrete, sand, and metal are one mesh each so the extra silhouette stays one draw.
 */
function makeHq(paint) {
  const g = new THREE.Group();
  const concreteMat = mat(PALETTE.concrete, { roughness: 0.88, metalness: 0.02 });
  const apron = roundMesh(2.85, 0.4, 2.15, 4, 0.18, 0, 0.16, 0.05, concreteMat);
  const wingL = roundMesh(0.36, 0.66, 1.12, 3, 0.14, -1.28, 0.48, -0.02, concreteMat);
  const wingR = roundMesh(0.36, 0.66, 1.12, 3, 0.14, 1.28, 0.48, -0.02, concreteMat);
  const capNear = roundMesh(1.02, 0.18, 0.78, 4, 0.12, 0, 2.98, 0.02, concreteMat);
  const capTop = roundMesh(0.86, 0.16, 0.64, 3, 0.1, 0, 3.32, 0.02, concreteMat);
  const concrete = mergedMesh([
    baked(new THREE.BoxGeometry(2.2, 0.2, 0.4), 0, 0.2, -0.98),
    // Positive rotation.x takes local +y toward +z, so −0.42 lowers the −z edge.
    baked(new THREE.BoxGeometry(2.15, 0.1, 0.78), 0, 0.38, -0.78, -0.42, 0, 0),
    baked(new THREE.BoxGeometry(2.2, 0.14, 0.16), 0, 0.2, 1.08),
    baked(new THREE.BoxGeometry(0.7, 0.36, 0.16), 0, 0.42, 1.12),
    baked(new THREE.BoxGeometry(0.16, 0.55, 0.16), -0.7, 0.5, 1.05),
    baked(new THREE.BoxGeometry(0.16, 0.55, 0.16), 0.7, 0.5, 1.05),
    baked(new THREE.BoxGeometry(0.36, 0.14, 0.22), -1.05, 0.2, 0.9),
    baked(new THREE.BoxGeometry(0.36, 0.14, 0.22), 1.05, 0.2, 0.9),
    baked(new THREE.BoxGeometry(0.28, 0.12, 0.16), -0.9, 0.3, -1.18),
    baked(new THREE.BoxGeometry(0.28, 0.12, 0.16), -0.48, 0.32, -1.22),
    baked(new THREE.BoxGeometry(0.28, 0.12, 0.16), 0.02, 0.3, -1.18),
    baked(new THREE.BoxGeometry(0.28, 0.12, 0.16), 0.5, 0.32, -1.22),
    baked(new THREE.BoxGeometry(0.28, 0.12, 0.16), 0.96, 0.3, -1.16),
    baked(new THREE.BoxGeometry(1.7, 0.1, 1.05), 0, 0.72, 0),
    baked(new THREE.BoxGeometry(0.14, 0.16, 0.14), -0.42, 3.48, -0.28),
    baked(new THREE.BoxGeometry(0.14, 0.16, 0.14), 0.42, 3.48, -0.28),
    baked(new THREE.BoxGeometry(0.14, 0.16, 0.14), -0.42, 3.48, 0.32),
    baked(new THREE.BoxGeometry(0.14, 0.16, 0.14), 0.42, 3.48, 0.32),
  ], concreteMat);
  const sandMat = mat(PALETTE.sand, { roughness: 0.94, metalness: 0 });
  const sandPad = roundMesh(2.45, 0.32, 1.75, 4, 0.14, 0, 0.14, 0.05, sandMat);
  const sand = mergedMesh([
    baked(new THREE.BoxGeometry(0.34, 0.14, 0.18), -0.7, 0.28, -1.02),
    baked(new THREE.BoxGeometry(0.34, 0.14, 0.18), 0, 0.28, -1.02),
    baked(new THREE.BoxGeometry(0.34, 0.14, 0.18), 0.7, 0.28, -1.02),
  ], sandMat);
  const bodyMat = mat(WALL, { roughness: 0.82, metalness: 0.06 });
  bodyMat.emissive = new THREE.Color(paint.glow);
  bodyMat.emissiveIntensity = 0;
  const body = mergedMesh([
    baked(new THREE.BoxGeometry(2.2, 0.16, 0.12), 0, 0.86, 0.64),
    baked(new THREE.BoxGeometry(0.14, 0.22, 1.2), -1.02, 0.9, 0),
    baked(new THREE.BoxGeometry(0.14, 0.22, 1.2), 1.02, 0.9, 0),
    baked(new THREE.BoxGeometry(1.7, 0.08, 0.1), 0, 0.84, -0.6),
  ], bodyMat);
  body.userData.slot = 'body';
  const plinth = roundMesh(1.92, 0.58, 1.2, 5, 0.26, 0, 0.42, 0, bodyMat);
  const tower = roundMesh(1.22, 2.15, 0.96, 6, 0.36, 0, 1.85, 0.02, bodyMat);
  const roof = mergedMesh([
    baked(new THREE.BoxGeometry(0.9, 0.026, 0.038), 0, 2.5, 0.46),
  ], mat(muteTeam(paint.main), { roughness: 0.55, metalness: 0.08 }));
  roof.userData.slot = 'roof';
  const door = mergedMesh([
    baked(new THREE.BoxGeometry(0.46, 0.32, 0.06), 0, 0.3, -0.68),
    baked(new THREE.BoxGeometry(0.08, 0.14, 0.05), -0.62, 0.52, -0.66),
    baked(new THREE.BoxGeometry(0.08, 0.14, 0.05), 0.62, 0.52, -0.66),
    baked(new THREE.BoxGeometry(0.5, 0.04, 0.05), 0, 0.2, -0.7),
    baked(new THREE.BoxGeometry(0.5, 0.04, 0.05), 0, 0.3, -0.7),
  ], mat(PALETTE.ink, { roughness: 0.8, metalness: 0.12 }));
  const metal = mergedMesh([
    baked(new THREE.CylinderGeometry(0.028, 0.034, 0.46, 6), 0.16, 3.58, 0.02),
    baked(new THREE.CylinderGeometry(0.18, 0.18, 0.032, 16), 0.16, 3.84, 0.1, 1.05, 0.15, 0.2),
    baked(new THREE.TorusGeometry(0.15, 0.008, 6, 14), 0.16, 3.86, 0.12, 1.05, 0.15, 0.1),
    baked(new THREE.CylinderGeometry(0.018, 0.022, 0.7, 5), 0.72, 3.7, 0.05),
    baked(new THREE.BoxGeometry(0.16, 0.02, 0.02), 0.72, 4.02, 0.05),
  ], mat(PALETTE.metal, { roughness: 0.38, metalness: 0.55 }));
  const flag = pennant(paint.flag);
  flag.position.set(0.72, 3.95, 0.05);
  const pip = makePip(1.42);
  const danger = new THREE.Mesh(
    new THREE.TorusGeometry(1.38, 0.045, 6, 28),
    new THREE.MeshBasicMaterial({
      color: paint.glow,
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
    }),
  );
  danger.rotation.x = Math.PI / 2;
  danger.position.y = 0.14;
  danger.visible = false;
  g.userData.pip = pip;
  g.userData.pulse = bodyMat;
  g.userData.dangerRing = danger;
  g.add(apron, wingL, wingR, capNear, capTop, concrete, sandPad, sand, plinth, body, tower, roof, door, metal, flag, pip, danger);
  return g;
}

/** Lower hangar: roll door, vents, spawn pad. No dish. Roof center is world y 0.78. */
function makeBarracks(paint) {
  const g = new THREE.Group();
  const sandMat = mat(PALETTE.sand, { roughness: 0.94, metalness: 0 });
  const sandPad = roundMesh(1.95, 0.32, 1.28, 4, 0.14, 0, 0.14, 0.05, sandMat);
  const sand = mergedMesh([
    baked(new THREE.BoxGeometry(0.34, 0.16, 0.22), -0.95, 0.16, -0.55),
    baked(new THREE.BoxGeometry(0.34, 0.16, 0.22), 0.95, 0.16, -0.55),
    baked(new THREE.BoxGeometry(0.34, 0.16, 0.22), -0.95, 0.16, 0.15),
    baked(new THREE.BoxGeometry(0.34, 0.16, 0.22), 0.95, 0.16, 0.15),
    baked(new THREE.BoxGeometry(0.34, 0.16, 0.22), -0.95, 0.16, 0.7),
    baked(new THREE.BoxGeometry(0.34, 0.16, 0.22), 0.95, 0.16, 0.7),
    baked(new THREE.BoxGeometry(0.28, 0.14, 0.36), -0.55, 0.18, 0.78),
    baked(new THREE.BoxGeometry(0.28, 0.14, 0.36), 0.55, 0.18, 0.78),
    baked(new THREE.BoxGeometry(0.28, 0.14, 0.36), -0.2, 0.18, -0.72),
    baked(new THREE.BoxGeometry(0.28, 0.14, 0.36), 0.35, 0.18, -0.72),
  ], sandMat);
  const wallMat = mat(WALL, { roughness: 0.84, metalness: 0.05 });
  const body = roundMesh(1.74, 0.58, 1.02, 6, 0.24, 0, 0.38, 0, wallMat);
  body.userData.slot = 'body';
  const shellMat = mat(WALL, { roughness: 0.8, metalness: 0.06 });
  const slopeNear = roundMesh(1.58, 0.22, 0.56, 4, 0.08, 0, 0.88, -0.22, shellMat);
  slopeNear.rotation.x = -0.45;
  const slopeFar = roundMesh(1.58, 0.22, 0.56, 4, 0.08, 0, 0.88, 0.22, shellMat);
  slopeFar.rotation.x = 0.45;
  const shell = mergedMesh([
    baked(new THREE.BoxGeometry(0.1, 0.22, 0.9), -0.84, 0.86, 0),
    baked(new THREE.BoxGeometry(0.1, 0.22, 0.9), 0.84, 0.86, 0),
    baked(new THREE.BoxGeometry(1.2, 0.04, 0.1), 0, 1.04, 0.02),
    baked(new THREE.BoxGeometry(0.12, 0.07, 0.12), -0.46, 1.02, 0.02),
    baked(new THREE.BoxGeometry(0.12, 0.07, 0.12), 0.46, 1.02, -0.02),
  ], shellMat);
  const roof = mergedMesh([
    baked(new THREE.BoxGeometry(0.72, 0.022, 0.034), 0, 1.02, 0.02),
  ], mat(muteTeam(paint.main), { roughness: 0.55, metalness: 0.1 }));
  roof.userData.slot = 'roof';
  const ink = mergedMesh([
    baked(new THREE.BoxGeometry(0.7, 0.045, 0.04), 0, 0.18, -0.48),
    baked(new THREE.BoxGeometry(0.7, 0.045, 0.04), 0, 0.26, -0.48),
    baked(new THREE.BoxGeometry(0.7, 0.045, 0.04), 0, 0.34, -0.48),
    baked(new THREE.BoxGeometry(0.22, 0.06, 0.04), -0.52, 0.48, -0.46),
    baked(new THREE.BoxGeometry(0.22, 0.06, 0.04), 0.52, 0.48, -0.46),
  ], mat(PALETTE.ink, { roughness: 0.78, metalness: 0.16 }));
  const spawn = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.04, 0.38),
    mat(PALETTE.concrete, { roughness: 0.84 }),
  );
  spawn.position.set(0, 0.1, -0.86);
  spawn.receiveShadow = true;
  const pole = mergedMesh([
    baked(new THREE.CylinderGeometry(0.02, 0.024, 0.48, 5), -0.72, 1.02, 0),
    baked(new THREE.BoxGeometry(0.08, 0.42, 0.08), -0.78, 0.32, -0.4),
    baked(new THREE.BoxGeometry(0.08, 0.42, 0.08), 0.78, 0.32, -0.4),
    baked(new THREE.BoxGeometry(0.08, 0.42, 0.08), -0.78, 0.32, 0.38),
    baked(new THREE.BoxGeometry(0.08, 0.42, 0.08), 0.78, 0.32, 0.38),
  ], mat(PALETTE.metal, { roughness: 0.42, metalness: 0.4 }));
  const flag = pennant(paint.flag);
  flag.scale.setScalar(0.65);
  flag.position.set(-0.72, 1.22, 0);
  const pip = makePip(1.12);
  const captureRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.04, 6, 24),
    new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0.9, toneMapped: false }),
  );
  captureRing.rotation.x = Math.PI / 2;
  captureRing.position.y = 0.12;
  captureRing.visible = false;
  g.userData.pip = pip;
  g.userData.pulse = body.material;
  g.userData.dangerRing = captureRing;
  g.add(sandPad, sand, body, slopeNear, slopeFar, shell, roof, ink, spawn, pole, flag, pip, captureRing);
  return g;
}

/** Light tank. Local −z is the barrel, so the parent yaw (same helper as the building) aims it down the road. */
function makeTank(paint) {
  const g = new THREE.Group();
  const hull = mergedMesh([
    baked(new THREE.BoxGeometry(0.62, 0.16, 0.95), 0, 0.22, 0),
    baked(new THREE.BoxGeometry(0.4, 0.12, 0.42), 0, 0.34, 0.06),
  ], mat(0x4a5248, { roughness: 0.55, metalness: 0.28 }));
  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.04, 0.28),
    mat(muteTeam(paint.main), { roughness: 0.5, metalness: 0.16 }),
  );
  stripe.position.set(0, 0.42, 0.06);
  stripe.userData.slot = 'roof';
  const barrel = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.05, 0.55),
    mat(PALETTE.metal, { roughness: 0.35, metalness: 0.6 }),
  );
  barrel.position.set(0, 0.36, -0.55);
  const tracks = mergedMesh([
    baked(new THREE.BoxGeometry(0.12, 0.14, 1.02), -0.36, 0.12, 0),
    baked(new THREE.BoxGeometry(0.12, 0.14, 1.02), 0.36, 0.12, 0),
  ], mat(PALETTE.ink, { roughness: 0.8, metalness: 0.2 }));
  g.add(hull, tracks, barrel, stripe);
  g.scale.setScalar(1);
  return g;
}

function paintGroup(group, owner) {
  const paint = ownerPaint(owner);
  group.traverse((obj) => {
    if (!obj.material || !obj.userData.slot) return;
    const slot = obj.userData.slot;
    if (slot === 'body') {
      obj.material.color.setHex(WALL);
      if (obj.material.emissive) obj.material.emissive.setHex(paint.glow);
    } else if (slot === 'roof') obj.material.color.setHex(muteTeam(paint.main));
    else if (slot === 'flag') obj.material.color.setHex(paint.flag);
  });
}

const _rgb = new THREE.Color();

function writeRgb(hex, target, offset) {
  // setHex converts the art hex into linear so the stripe displays as that hex.
  _rgb.setHex(hex);
  target[offset] = _rgb.r;
  target[offset + 1] = _rgb.g;
  target[offset + 2] = _rgb.b;
}

/**
 * Ownership edge. Two solid halves, no blended gold middle.
 * The quad starts in XY. rotateX(-π/2) maps (x, y, 0) → (x, 0, -y),
 * so local −Y becomes world +Z (player green) and local +Y becomes world −Z
 * (enemy red). The halves do not share vertices, so the GPU cannot mix them.
 * The stripe is a thin hard split in the faction mains, not a second pastel core.
 */
export function frontierBandGeometry() {
  const half = 0.14;
  const positions = new Float32Array([
    -0.5, -half, 0, 0.5, -half, 0, 0.5, 0, 0, -0.5, 0, 0,
    -0.5, 0, 0, 0.5, 0, 0, 0.5, half, 0, -0.5, half, 0,
  ]);
  const colors = new Float32Array(8 * 3);
  for (let i = 0; i < 4; i++) writeRgb(PALETTE.player.main, colors, i * 3);
  for (let i = 4; i < 8; i++) writeRgb(PALETTE.enemy.main, colors, i * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/** Bowed emissive ribbon. Local +z is the player half, matching the hard band. */
function frontLineGeometry() {
  const steps = 18;
  const positions = new Float32Array((steps + 1) * 2 * 3);
  const colors = new Float32Array((steps + 1) * 2 * 3);
  const green = new THREE.Color(PALETTE.player.main);
  const red = new THREE.Color(PALETTE.enemy.main);
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const x = -0.5 + u;
    // Positive bow lifts the middle toward the player field, clear of the stream.
    const bow = Math.sin(u * Math.PI) * 0.72;
    const o = i * 6;
    positions[o] = x;
    positions[o + 1] = 0.1;
    positions[o + 2] = bow + 0.28;
    positions[o + 3] = x;
    positions[o + 4] = 0.1;
    positions[o + 5] = bow - 0.24;
    colors[o] = green.r;
    colors[o + 1] = green.g;
    colors[o + 2] = green.b;
    colors[o + 3] = red.r;
    colors[o + 4] = red.g;
    colors[o + 5] = red.b;
  }
  const indices = [];
  for (let i = 0; i < steps; i++) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex(indices);
  return geo;
}

function makeGlow(geo, material) {
  const mesh = new THREE.Mesh(geo, material);
  mesh.visible = false;
  mesh.renderOrder = 6;
  mesh.frustumCulled = false;
  return mesh;
}

function addMerged(group, parts, material, shadow) {
  if (!parts.length) return;
  const geo = mergeGeometries(parts);
  for (let i = 0; i < parts.length; i++) parts[i].dispose();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = !shadow || shadow.cast !== false;
  mesh.receiveShadow = !shadow || shadow.receive !== false;
  group.add(mesh);
}

/** One grey deck per stream crossing. The plank runs along world z, across the stream. */
export function bridgeDeckGeometries(crossings) {
  const parts = [];
  for (let i = 0; i < crossings.length; i++) {
    const x = crossings[i].x;
    const z = crossings[i].z;
    const plank = new THREE.BoxGeometry(0.92, 0.08, 2.2);
    plank.translate(x, 0.16, z);
    parts.push(plank);
    for (const side of [-0.42, 0.42]) {
      const rail = new THREE.BoxGeometry(0.08, 0.22, 2.2);
      rail.translate(x + side, 0.28, z);
      parts.push(rail);
    }
  }
  return parts;
}

function pushTree(trunks, crowns, x, z, scale, color) {
  const wave = Math.sin(x * 12.7 + z * 4.3);
  const tall = 0.48 + Math.abs(Math.sin(z * 2.15 + x * 0.37)) * 1.35;
  const fat = 0.4 + Math.abs(Math.cos(x * 1.85 - z * 0.62)) * 0.95;
  const lean = wave * 0.32;
  const trunk = new THREE.CylinderGeometry(0.04 * fat * scale, 0.08 * fat * scale, 0.4 * tall * scale, 5);
  trunk.translate(x + lean, 0.05 + 0.18 * tall * scale, z);
  trunks.push(trunk);
  const pick = Math.abs(Math.sin(x * 5.1 + z * 3.7));
  const varied = pick > 0.72 ? 0x6c8646 : pick > 0.48 ? 0x243628 : pick > 0.24 ? 0x4a6238 : color;
  const list = crowns[varied] || (crowns[varied] = []);
  const y0 = 0.05;
  const lower = new THREE.ConeGeometry(0.48 * fat * scale, 0.82 * tall * scale, 7);
  lower.translate(x + lean * 0.45, y0 + 0.46 * tall * scale, z);
  const upper = new THREE.ConeGeometry(0.3 * fat * scale, 0.62 * tall * scale, 7);
  upper.translate(x - lean * 0.25, y0 + 0.98 * tall * scale, z);
  const tip = new THREE.ConeGeometry(0.13 * fat * scale, 0.36 * tall * scale, 5);
  tip.translate(x + lean * 0.08, y0 + 1.4 * tall * scale, z);
  list.push(lower, upper, tip);
}

function faceUp(geo) {
  geo.computeVertexNormals();
  const normals = geo.attributes.normal;
  let ny = 0;
  for (let i = 0; i < normals.count; i++) ny += normals.getY(i);
  if (ny >= 0) return geo;
  const index = geo.getIndex();
  const src = index.array;
  for (let i = 0; i < src.length; i += 3) {
    const tmp = src[i + 1];
    src[i + 1] = src[i + 2];
    src[i + 2] = tmp;
  }
  index.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/** Olive disc with dirt along the road and a darker ring at the tree line. */
function islandCapGeometry(spanX, spanZ) {
  const rings = 16;
  const segs = 48;
  const count = 1 + rings * segs;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const meadow = new THREE.Color(PALETTE.meadow);
  const deep = new THREE.Color(PALETTE.meadowDeep);
  const khaki = new THREE.Color(0x6a6244);
  const sand = new THREE.Color(PALETTE.sand);
  const dirt = new THREE.Color(0x6e5c42);
  const deepEdge = new THREE.Color(PALETTE.meadowDeep);
  const tone = new THREE.Color();
  let vi = 1;
  for (let r = 1; r <= rings; r++) {
    const u = r / rings;
    for (let s = 0; s < segs; s++) {
      const a = (s / segs) * Math.PI * 2;
      const o = vi * 3;
      positions[o] = Math.cos(a) * u * spanX * 0.5;
      positions[o + 1] = 0;
      positions[o + 2] = Math.sin(a) * u * spanZ * 0.5;
      vi += 1;
    }
  }
  for (let i = 0; i < count; i++) {
    const x = positions[i * 3];
    const z = positions[i * 3 + 2];
    const u = Math.hypot(x / (spanX * 0.5 || 1), z / (spanZ * 0.5 || 1));
    const n = Math.sin(x * 0.42 + z * 0.28) + Math.sin(x * 1.15 - z * 0.7) * 0.7;
    tone.copy(meadow);
    if (n > 0.45) tone.lerp(khaki, 0.78);
    else if (n < -0.35) tone.lerp(deep, 0.88);
    else tone.lerp(deep, 0.22);
    if (Math.abs(x) < 2.6 && Math.abs(z) > 1.15) tone.lerp(dirt, 0.48 * (1 - Math.min(1, Math.abs(x) / 2.6)));
    if (Math.sin(x * 0.9 + 0.4) * Math.sin(z * 0.55) > 0.2) tone.lerp(sand, 0.62);
    if (u > 0.82) tone.lerp(deepEdge, 0.4);
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  const indices = [];
  for (let s = 0; s < segs; s++) {
    indices.push(0, 1 + ((s + 1) % segs), 1 + s);
  }
  for (let r = 0; r < rings - 1; r++) {
    for (let s = 0; s < segs; s++) {
      const a = 1 + r * segs + s;
      const b = 1 + r * segs + ((s + 1) % segs);
      const c = a + segs;
      const d = b + segs;
      indices.push(a, d, b, a, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex(indices);
  return faceUp(geo);
}

/** Wider blue ribbon with sand banks and one gentle bow. No faction paint. */
function streamRibbon(span) {
  const cols = 22;
  const halfX = span / 2;
  const bands = [
    { off: -(WATER_HALF + BANK_OUT), y: 0.14, hex: 0xe7d7a8, sand: true },
    { off: -(WATER_HALF + BANK_OUT * 0.42), y: 0.125, hex: 0xf3e6c0, sand: true },
    { off: -WATER_HALF, y: 0.108, hex: 0xd9c49a, sand: true },
    { off: -WATER_HALF + 0.16, y: 0.086, hex: 0x245878 },
    { off: -0.34, y: 0.072, hex: 0x4e93b4 },
    { off: -0.16, y: 0.058, hex: 0x9fd8ee },
    { off: -0.04, y: 0.05, hex: 0x6eb4d4 },
    { off: 0.08, y: 0.05, hex: 0xd7f1fb },
    { off: 0.22, y: 0.06, hex: 0x7ec4e2 },
    { off: WATER_HALF - 0.16, y: 0.086, hex: PALETTE.stream },
    { off: WATER_HALF, y: 0.108, hex: 0xd9c49a, sand: true },
    { off: WATER_HALF + BANK_OUT * 0.42, y: 0.125, hex: 0xf3e6c0, sand: true },
    { off: WATER_HALF + BANK_OUT, y: 0.14, hex: 0xe7d7a8, sand: true },
  ];
  const positions = new Float32Array((cols + 1) * bands.length * 3);
  const colors = new Float32Array((cols + 1) * bands.length * 3);
  const tone = new THREE.Color();
  let p = 0;
  for (let i = 0; i <= cols; i++) {
    const x = -halfX + (span * i) / cols;
    const bow = Math.sin((x / halfX) * Math.PI) * STREAM_BOW;
    for (let b = 0; b < bands.length; b++) {
      const band = bands[b];
      positions[p] = x;
      positions[p + 1] = band.y;
      positions[p + 2] = bow + band.off;
      tone.setHex(band.hex);
      if (!band.sand) {
        const across = Math.max(0, 1 - Math.abs(band.off) / 0.4);
        const wave = 0.5 + 0.5 * Math.sin(x * 1.15 + 0.6);
        const rip = 0.5 + 0.5 * Math.sin(x * 3.3 + band.off * 7);
        tone.lerp(new THREE.Color(0xf5fcff), across * (0.42 + 0.48 * wave));
        tone.lerp(new THREE.Color(0x163f58), (1 - across) * 0.45 + (1 - rip) * across * 0.18);
      }
      colors[p] = tone.r;
      colors[p + 1] = tone.g;
      colors[p + 2] = tone.b;
      p += 3;
    }
  }
  const indices = [];
  const row = bands.length;
  for (let i = 0; i < cols; i++) {
    for (let b = 0; b < row - 1; b++) {
      const a = i * row + b;
      indices.push(a, a + 1, a + row, a + 1, a + row + 1, a + row);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex(indices);
  return faceUp(geo);
}

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

const ROAD_W = 0.72;
const ROAD_H = 0.05;
const ROAD_Y = 0.155;
/** The dirt stops on the outer shore so the deck is the surface across the water. */
const STREAM_BANK = 1.0;

function undirectedEdges(map) {
  const seen = new Set();
  const edges = [];
  const graph = map.graph || {};
  const nodes = map.nodes || {};
  const keys = Object.keys(graph);
  for (let i = 0; i < keys.length; i++) {
    const aId = keys[i];
    const nexts = graph[aId] || [];
    const a = nodes[aId];
    for (let j = 0; j < nexts.length; j++) {
      const bId = nexts[j];
      const key = aId < bId ? `${aId}|${bId}` : `${bId}|${aId}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const b = nodes[bId];
      if (!a || !b) continue;
      edges.push([{ x: a.x, z: a.z }, { x: b.x, z: b.z }]);
    }
  }
  return edges;
}

function collinearJoin(a, b) {
  for (let ia = 0; ia < 2; ia++) {
    for (let ib = 0; ib < 2; ib++) {
      const joint = a[ia];
      const other = b[ib];
      if (Math.hypot(joint.x - other.x, joint.z - other.z) > 0.04) continue;
      const aFar = a[1 - ia];
      const bFar = b[1 - ib];
      const dax = joint.x - aFar.x;
      const daz = joint.z - aFar.z;
      const dbx = bFar.x - other.x;
      const dbz = bFar.z - other.z;
      const la = Math.hypot(dax, daz) || 1;
      const lb = Math.hypot(dbx, dbz) || 1;
      const cross = (dax / la) * (dbz / lb) - (daz / la) * (dbx / lb);
      const dot = (dax / la) * (dbx / lb) + (daz / la) * (dbz / lb);
      if (Math.abs(cross) < 0.08 && dot > 0.92) return [aFar, bFar];
    }
  }
  return null;
}

function mergeRuns(edges) {
  const runs = edges.map((edge) => [edge[0], edge[1]]);
  let guard = 0;
  while (guard < 32) {
    guard += 1;
    let merged = false;
    for (let i = 0; i < runs.length && !merged; i++) {
      for (let j = i + 1; j < runs.length; j++) {
        const joined = collinearJoin(runs[i], runs[j]);
        if (!joined) continue;
        runs[i] = joined;
        runs.splice(j, 1);
        merged = true;
        break;
      }
    }
    if (!merged) break;
  }
  return runs.map((run) => ({ x0: run[0].x, z0: run[0].z, x1: run[1].x, z1: run[1].z, y: ROAD_Y }));
}

function clipBank(seg, bank) {
  const { x0, z0, x1, z1 } = seg;
  const dz = z1 - z0;
  if (Math.abs(dz) < 1e-4) return [seg];
  const cuts = [0, 1];
  const marks = [bank, -bank];
  for (let k = 0; k < marks.length; k++) {
    const t = (marks[k] - z0) / dz;
    if (t > 0.002 && t < 0.998) cuts.push(t);
  }
  cuts.sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const t0 = cuts[i];
    const t1 = cuts[i + 1];
    if (t1 - t0 < 0.002) continue;
    const zm = z0 + dz * ((t0 + t1) / 2);
    if (Math.abs(zm) < bank - 1e-3) continue;
    out.push({
      x0: x0 + (x1 - x0) * t0,
      z0: z0 + dz * t0,
      x1: x0 + (x1 - x0) * t1,
      z1: z0 + dz * t1,
      y: seg.y,
    });
  }
  return out;
}

function onInterior(x, z, seg) {
  const dx = seg.x1 - seg.x0;
  const dz = seg.z1 - seg.z0;
  const len2 = dx * dx + dz * dz;
  if (len2 < 1e-6) return false;
  const t = ((x - seg.x0) * dx + (z - seg.z0) * dz) / len2;
  if (t <= 0.03 || t >= 0.97) return false;
  const px = seg.x0 + dx * t;
  const pz = seg.z0 + dz * t;
  return Math.hypot(px - x, pz - z) < 0.06;
}

function tuckJunctions(segs) {
  const back = ROAD_W / 2 - 0.06;
  for (let i = 0; i < segs.length; i++) {
    for (let j = 0; j < segs.length; j++) {
      if (i === j) continue;
      const branch = segs[i];
      const spine = segs[j];
      for (let end = 0; end < 2; end++) {
        const x = end === 0 ? branch.x0 : branch.x1;
        const z = end === 0 ? branch.z0 : branch.z1;
        if (!onInterior(x, z, spine)) continue;
        const dx = branch.x1 - branch.x0;
        const dz = branch.z1 - branch.z0;
        const len = Math.hypot(dx, dz) || 1;
        const ux = dx / len;
        const uz = dz / len;
        if (end === 0) {
          branch.x0 = x + ux * back;
          branch.z0 = z + uz * back;
        } else {
          branch.x1 = x - ux * back;
          branch.z1 = z - uz * back;
        }
        branch.y = ROAD_Y - 0.02;
      }
    }
  }
}

/** Straight dirt runs. Collinear graph edges are one box, and the stream gap is left for the bridge. */
export function planRoadSegments(map) {
  const runs = mergeRuns(undirectedEdges(map));
  const clipped = [];
  for (let i = 0; i < runs.length; i++) {
    const parts = clipBank(runs[i], STREAM_BANK);
    for (let j = 0; j < parts.length; j++) clipped.push(parts[j]);
  }
  tuckJunctions(clipped);
  return clipped;
}

function paintDirt(geo) {
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color(PALETTE.road);
  const dark = new THREE.Color(0x6e5e4a);
  const light = new THREE.Color(0xb09878);
  const tone = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const n = Math.sin(x * 6.5 + z * 3.1) * Math.cos(z * 5.2 - x * 2.4);
    if (n > 0.35) tone.copy(light);
    else if (n < -0.25) tone.copy(dark);
    else tone.copy(base);
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

/** Flat strip with round ends. Length runs along local Z so alignLength can place it. */
function roundedStrip(length, width, radius, height) {
  const r = Math.min(radius, width * 0.46, Math.max(0.04, length * 0.46));
  const hw = width / 2;
  const hl = length / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-hw + r, -hl);
  shape.lineTo(hw - r, -hl);
  shape.absarc(hw - r, -hl + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hl - r);
  shape.absarc(hw - r, hl - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-hw + r, hl);
  shape.absarc(-hw + r, hl - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hl + r);
  shape.absarc(-hw + r, -hl + r, r, Math.PI, Math.PI * 1.5, false);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
    curveSegments: 5,
  });
  geo.translate(0, 0, -height / 2);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function bakeStrip(length, width, radius, height, x0, z0, x1, z1, y) {
  const geo = roundedStrip(length, width, radius, height);
  const holder = new THREE.Mesh(geo);
  holder.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  const dx = x1 - x0;
  const dz = z1 - z0;
  const len = Math.hypot(dx, dz) || 1;
  _dir.set(dx / len, 0, dz / len);
  holder.quaternion.setFromUnitVectors(LOCAL_Z, _dir);
  holder.updateMatrix();
  geo.applyMatrix4(holder.matrix);
  return geo;
}

function addEdges(group, map, roadMat) {
  const segs = planRoadSegments(map);
  const parts = [];
  const shoulderParts = [];
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    const len = Math.hypot(seg.x1 - seg.x0, seg.z1 - seg.z0);
    if (len < 0.15) continue;
    const road = bakeStrip(len, ROAD_W, 0.3, ROAD_H, seg.x0, seg.z0, seg.x1, seg.z1, seg.y);
    paintDirt(road);
    parts.push(road);
    shoulderParts.push(bakeStrip(
      len,
      ROAD_W + 0.7,
      0.42,
      ROAD_H * 0.55,
      seg.x0,
      seg.z0,
      seg.x1,
      seg.z1,
      seg.y - 0.03,
    ));
  }
  addMerged(group, parts, roadMat, { cast: false, receive: false });
  addMerged(group, shoulderParts, mat(0xe6d3a8, { roughness: 0.96, metalness: 0 }), { cast: false, receive: false });
}

function buildIsland(map, reduceMotion) {
  const group = new THREE.Group();
  const box = boundsOf(map);
  const spanX = Math.max(48, (box.maxX - box.minX) * 4.2);
  const spanZ = Math.max(64, (box.maxZ - box.minZ) * 3.6);
  const cap = new THREE.Mesh(
    islandCapGeometry(spanX * 0.98, spanZ * 0.98),
    mat(0xffffff, { vertexColors: true, roughness: 0.94, metalness: 0 }),
  );
  cap.position.y = -0.02;
  cap.receiveShadow = true;
  cap.castShadow = false;
  group.add(cap);

  const ownerById = {};
  for (let i = 0; i < map.buildings.length; i++) {
    ownerById[map.buildings[i].id] = map.buildings[i].owner;
  }
  const zoneMeshes = new Map();
  for (let i = 0; i < map.zones.length; i++) {
    const z = map.zones[i];
    const owner = ownerById[z.buildingId];
    const slab = owner ? stain(ownerPaint(owner).slab) : PALETTE.meadow;
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1.02, 0.045, 24),
      mat(0xffffff, { vertexColors: true, roughness: 0.96, metalness: 0 }),
    );
    if (owner) mesh.userData.owner = owner;
    mesh.scale.set(z.rx, 1, z.rz);
    mesh.position.set(z.x, 0.02 + i * 0.006, z.z);
    mesh.rotation.y = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    tintZone(mesh, slab);
    group.add(mesh);
    zoneMeshes.set(z.buildingId, mesh);
  }

  // Dark worn patches sit in the open meadow beside the tan road.
  const dirtSpots = [
    [-1.65, 4.4, 0.9, 1.35, 0x2a2218],
    [1.75, 5.05, 0.75, 1.05, 0x3c2e20],
    [-1.9, 1.65, 1.0, 1.2, 0x241c14],
    [1.6, 1.4, 0.85, 1.0, 0x32261c],
    [-1.75, -1.9, 0.95, 1.25, 0x261e16],
    [1.8, -1.5, 0.8, 1.05, 0x3a2c1e],
    [1.85, -4.55, 0.75, 1.15, 0x2e2418],
    [-1.5, -4.4, 0.9, 1.3, 0x34281c],
    [2.35, 2.55, 0.7, 0.85, 0x4a3824],
    [-2.45, -2.65, 0.7, 0.9, 0x3e3020],
  ];
  const dirtParts = [];
  const dirtTone = new THREE.Color();
  const dirtMeadow = new THREE.Color(PALETTE.meadow);
  for (let i = 0; i < dirtSpots.length; i++) {
    const spot = dirtSpots[i];
    const geo = new THREE.CircleGeometry(1, 18);
    geo.rotateX(-Math.PI / 2);
    geo.scale(spot[2], 1, spot[3]);
    geo.translate(spot[0], 0.1, spot[1]);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    dirtTone.setHex(spot[4]);
    for (let v = 0; v < pos.count; v++) {
      const edge = Math.min(1, Math.hypot((pos.getX(v) - spot[0]) / spot[2], (pos.getZ(v) - spot[1]) / spot[3]));
      const tone = dirtTone.clone();
      if (edge > 0.78) tone.lerp(dirtMeadow, (edge - 0.78) / 0.22);
      colors[v * 3] = tone.r;
      colors[v * 3 + 1] = tone.g;
      colors[v * 3 + 2] = tone.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    dirtParts.push(geo);
  }
  addMerged(group, dirtParts, mat(0xffffff, { vertexColors: true, roughness: 0.96, metalness: 0 }), { cast: false, receive: true });

  const waterSpan = streamBand(map);
  const stream = new THREE.Mesh(
    streamRibbon(waterSpan.halfWidth * 2),
    mat(0xffffff, { vertexColors: true, roughness: 0.42, metalness: 0.04 }),
  );
  stream.receiveShadow = true;
  stream.castShadow = false;
  group.add(stream);

  const roadMat = mat(0xffffff, {
    vertexColors: true,
    roughness: 0.9,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  addEdges(group, map, roadMat);

  // Decks sit on the crossings, after the road, so the plank is the surface you see.
  const bridgeMat = mat(PALETTE.bridge, { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  addMerged(group, bridgeDeckGeometries(streamCrossings(map)), bridgeMat);

  const trunks = [];
  const crowns = {};
  const trees = treesFor(map);
  for (let i = 0; i < trees.length; i++) {
    const t = trees[i];
    pushTree(trunks, crowns, t.x, t.z, t.s, t.color);
  }
  const edgeSpots = [
    [box.minX + 0.15, box.minZ + 1.1, 1.05],
    [box.minX + 0.35, (box.minZ + box.maxZ) * 0.15, 0.9],
    [box.minX + 0.2, box.maxZ - 1.3, 1.12],
    [box.maxX - 0.2, box.minZ + 1.5, 0.95],
    [box.maxX - 0.3, (box.minZ + box.maxZ) * 0.2, 1.08],
    [box.maxX - 0.15, box.maxZ - 1.05, 0.86],
    [box.minX + 1.15, box.maxZ - 0.2, 0.78],
    [box.maxX - 1.2, box.minZ + 0.35, 0.8],
  ];
  for (let i = 0; i < edgeSpots.length; i++) {
    const spot = edgeSpots[i];
    pushTree(trunks, crowns, spot[0], spot[1], spot[2], i % 2 ? PALETTE.leafDeep : PALETTE.leaf);
  }
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2 + 0.4;
    const rad = 9 + (i % 6) * 0.85;
    const x = Math.cos(a) * rad * 1.2;
    const z = Math.sin(a) * rad * 0.95;
    if (Math.abs(x) < 2.1 && Math.abs(z) < 10) continue;
    if (Math.abs(z) < 1.7) continue;
    pushTree(trunks, crowns, x, z, 0.75 + (i % 4) * 0.12, i % 3 ? PALETTE.leaf : PALETTE.leafDeep);
  }
  const rocks = rocksFor(map).slice();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.15;
    const rad = 10.5 + (i % 4) * 1.1;
    rocks.push({
      x: Math.cos(a) * rad * 1.15,
      z: Math.sin(a) * rad * 0.9,
      s: 0.7 + (i % 3) * 0.28,
    });
  }
  if (rocks.length) {
    const rockGeo = new THREE.DodecahedronGeometry(0.22, 0);
    const rockParts = [];
    for (let i = 0; i < rocks.length; i++) {
      const rock = rocks[i];
      const geo = rockGeo.clone();
      geo.scale(rock.s, rock.s * 0.62, rock.s * 0.85);
      geo.translate(rock.x, 0.08, rock.z);
      rockParts.push(geo);
      const chip = rockGeo.clone();
      chip.scale(rock.s * 0.45, rock.s * 0.35, rock.s * 0.4);
      chip.translate(rock.x + 0.28 * rock.s, 0.06, rock.z + 0.22 * rock.s);
      rockParts.push(chip);
    }
    rockGeo.dispose();
    addMerged(group, rockParts, mat(PALETTE.rock, { roughness: 0.9, metalness: 0.02 }));
  }
  addMerged(group, trunks, mat(PALETTE.trunk));
  const crownColors = Object.keys(crowns);
  for (let i = 0; i < crownColors.length; i++) {
    addMerged(group, crowns[crownColors[i]], mat(Number(crownColors[i])));
  }

  const buildings = new Map();
  const flags = [];
  const blobs = [];
  const dir = { x: 0, z: 0 };
  for (let i = 0; i < map.buildings.length; i++) {
    const spec = map.buildings[i];
    const groupB = spec.kind === 'hq' ? makeHq(ownerPaint(spec.owner)) : makeBarracks(ownerPaint(spec.owner));
    const p = map.nodes[spec.node];
    exitDir(map, spec.node, dir);
    groupB.position.set(p.x, 0.06, p.z);
    groupB.rotation.y = yawForFacing(dir.x, dir.z);
    // Barracks are 1.5× the previous 0.98 fit so the roof reads about 90px.
    // Headquarters stays 0.92 so the towers keep their height.
    const fit = spec.kind === 'hq' ? 0.92 : 1.47;
    groupB.userData.baseScale = fit;
    groupB.scale.setScalar(fit);
    groupB.userData.owner = spec.owner;
    groupB.traverse((obj) => {
      if (obj.userData && obj.userData.flutter) flags.push(obj);
    });
    if (spec.kind === 'barracks') {
      const tank = makeTank(ownerPaint(spec.owner));
      // Local +x is the building's right. The barrel stays on local −z, the road facing.
      tank.position.set(1.15, 0, -0.35);
      groupB.add(tank);
    }
    group.add(groupB);
    buildings.set(spec.id, groupB);
    if (spec.kind === 'hq') {
      const blob = new THREE.CircleGeometry(2.6, 20);
      blob.rotateX(-Math.PI / 2);
      blob.scale(1.2, 1, 0.82);
      // The near side of the tower, toward the camera, so the contact reads in the shot.
      blob.translate(p.x + 1.05, 0.08, p.z + 0.85);
      blobs.push(blob);
    } else {
      const blob = new THREE.CircleGeometry(1.85, 14);
      blob.rotateX(-Math.PI / 2);
      blob.translate(p.x + 0.45, 0.06, p.z + 0.15);
      blobs.push(blob);
    }
  }
  addMerged(group, blobs, new THREE.MeshBasicMaterial({
    color: 0x10140e,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  }));

  const frontMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const haloMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  const frontGeo = frontLineGeometry();
  const fronts = [];
  const halos = [];

  const glowMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const tintMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.07,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const bandGeo = frontierBandGeometry();
  const glows = [];
  const tints = [];
  for (let i = 0; i < 8; i++) {
    const band = makeGlow(bandGeo, glowMat);
    group.add(band);
    glows.push(band);
    const tint = makeGlow(bandGeo, tintMat);
    group.add(tint);
    tints.push(tint);
  }
  for (let i = 0; i < glows.length; i++) {
    const halo = makeGlow(frontGeo, haloMat);
    group.add(halo);
    halos.push(halo);
    const front = makeGlow(frontGeo, frontMat);
    group.add(front);
    fronts.push(front);
  }

  const boxed = boxMapZones(map.zones);
  const frontierBuf = [];
  const ownerScratch = {};

  const ringGeo = new THREE.TorusGeometry(1.05, 0.05, 8, 32);
  ringGeo.rotateX(Math.PI / 2);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x3dce7a }));
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
    new THREE.CylinderGeometry(0.12, 0.12, 1, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff4c8, transparent: true, opacity: 0.95 }),
  );
  ribbon.visible = false;
  ribbon.frustumCulled = false;
  group.add(ribbon);
  const arrow = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.58, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff4c8 }),
  );
  arrow.visible = false;
  arrow.frustumCulled = false;
  group.add(arrow);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xf4f7f4 }),
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
      arrow.visible = false;
      dot.visible = false;
      hover.visible = false;
    },
    setDrag(fromId, world, hoverId, fromPos) {
      const nodes = map.nodes;
      const p = fromPos || (fromId && nodes[fromId]);
      if (!fromId || !world || !p) {
        ribbon.visible = false;
        arrow.visible = false;
        dot.visible = false;
        return;
      }
      const dx = world.x - p.x;
      const dz = world.z - p.z;
      const len = Math.hypot(dx, dz);
      if (len < 0.08) {
        ribbon.visible = false;
        arrow.visible = false;
      } else {
        ribbon.visible = true;
        arrow.visible = true;
        ribbon.scale.set(1.4, len, 1.4);
        ribbon.position.set((p.x + world.x) / 2, 0.55, (p.z + world.z) / 2);
        _dir.set(dx / len, 0, dz / len);
        ribbon.quaternion.setFromUnitVectors(UP, _dir);
        arrow.quaternion.copy(ribbon.quaternion);
        arrow.position.set(world.x, 0.55, world.z);
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
          tintZone(zone, stain(ownerPaint(b.owner).slab));
        }
        const ranks = b.upgrades;
        if (mesh.userData.pip) {
          mesh.userData.pip.visible = !!(ranks && (ranks.haste > 0 || ranks.bulwark > 0));
        }
        const capturing = b.capture > 0.04;
        const danger = (b.kind === 'hq' && (b.count <= 0 || sieged(state, b.id, b.owner))) || capturing;
        const fit = mesh.userData.baseScale || 1;
        if (danger && !reduceMotion) {
          const s = fit * (1 + 0.045 * Math.sin(time * 9));
          mesh.scale.setScalar(s);
        } else {
          mesh.scale.setScalar(fit);
        }
        const pulse = mesh.userData.pulse;
        if (pulse) {
          if (danger) {
            pulse.emissive = pulse.emissive || new THREE.Color();
            pulse.emissive.setHex(capturing ? 0xff7a32 : ownerPaint(b.owner).glow);
            pulse.emissiveIntensity = 0.35 + (reduceMotion ? 0 : 0.4 * Math.sin(time * 9));
          } else {
            pulse.emissiveIntensity = 0;
          }
        }
        const dangerRing = mesh.userData.dangerRing;
        if (dangerRing) {
          dangerRing.visible = !!danger;
          if (danger) {
            const spread = 1 + (reduceMotion ? 0 : 0.18 * (0.5 + 0.5 * Math.sin(time * 6)));
            dangerRing.scale.set(spread, spread, spread);
            dangerRing.material.color.setHex(capturing ? 0xffe08a : ownerPaint(b.owner).glow);
          }
        }
      }

      const segs = frontierFrom(boxed, ownerScratch, frontierBuf);
      glowMat.opacity = 0.12;
      for (let i = 0; i < glows.length; i++) {
        const seg = segs[i];
        const band = glows[i];
        if (!seg) {
          band.visible = false;
          tints[i].visible = false;
          fronts[i].visible = false;
          halos[i].visible = false;
          continue;
        }
        const alongX = seg.axis !== 'z';
        const span = alongX ? Math.max(0.8, seg.x1 - seg.x0) : Math.max(0.8, seg.z1 - seg.z0);
        const cx = alongX ? (seg.x0 + seg.x1) / 2 : seg.x;
        const cz = alongX ? seg.z : (seg.z0 + seg.z1) / 2;
        const flip = seg.plusOwner === 'player' ? 0 : Math.PI;
        const yaw = alongX ? flip : Math.PI / 2 + flip;
        band.visible = true;
        // Local +z is the player half. Shift the lip onto the bank, off the water.
        const lip = 1.22;
        const ox = Math.sin(yaw) * lip;
        const oz = Math.cos(yaw) * lip;
        band.position.set(cx + ox, 0.22, cz + oz);
        // Z is the lip across the frontier. A wide scale paints a stripe over the stream.
        band.scale.set(span, 1, 1.2);
        band.rotation.y = yaw;
        const tint = tints[i];
        tint.visible = true;
        tint.position.set(cx + ox, 0.1, cz + oz);
        tint.scale.set(span, 1, 1.75);
        tint.rotation.y = yaw;
        const front = fronts[i];
        const halo = halos[i];
        front.visible = true;
        halo.visible = true;
        // A short width keeps the sine bow visible across the 390 frame.
        // The shift lands the curve on the grass, past the sand bank.
        const wide = 9.2;
        const gx = cx + ox * 1.15;
        const gz = cz + oz * 2.15;
        front.position.set(gx, 0.68, gz);
        halo.position.set(gx, 0.6, gz);
        front.scale.set(wide, 1, 1.5);
        halo.scale.set(wide * 1.04, 1, 2.05);
        front.rotation.y = yaw;
        halo.rotation.y = yaw;
      }
      for (let i = segs.length; i < tints.length; i++) {
        tints[i].visible = false;
        fronts[i].visible = false;
        halos[i].visible = false;
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

function skyDome() {
  const geo = new THREE.SphereGeometry(46, 20, 12);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const top = new THREE.Color(0xe4eef6);
  const mid = new THREE.Color(PALETTE.sky);
  const horizon = new THREE.Color(0x66725a);
  const tone = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 46;
    const t = THREE.MathUtils.clamp((y + 0.15) / 1.15, 0, 1);
    if (t < 0.42) tone.copy(horizon).lerp(mid, t / 0.42);
    else tone.copy(mid).lerp(top, (t - 0.42) / 0.58);
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    toneMapped: false,
  }));
  mesh.frustumCulled = false;
  mesh.renderOrder = -2;
  return mesh;
}

export function createWorld(scene) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  scene.add(skyDome());
  const fieldGeo = new THREE.PlaneGeometry(180, 220, 36, 40);
  const fieldPos = fieldGeo.attributes.position;
  const fieldColors = new Float32Array(fieldPos.count * 3);
  const meadowA = new THREE.Color(PALETTE.meadow);
  const meadowB = new THREE.Color(PALETTE.meadowDeep);
  const meadowC = new THREE.Color(0x4a5538);
  const meadowTone = new THREE.Color();
  for (let i = 0; i < fieldPos.count; i++) {
    const x = fieldPos.getX(i);
    const y = fieldPos.getY(i);
    const n = Math.sin(x * 0.18) * Math.cos(y * 0.14) + Math.sin(x * 0.55 + y * 0.4) * 0.65;
    meadowTone.copy(meadowA);
    if (n > 0.35) meadowTone.lerp(meadowC, 0.72);
    else if (n < -0.25) meadowTone.lerp(meadowB, 0.55);
    else meadowTone.lerp(meadowB, 0.18);
    fieldColors[i * 3] = meadowTone.r;
    fieldColors[i * 3 + 1] = meadowTone.g;
    fieldColors[i * 3 + 2] = meadowTone.b;
  }
  fieldGeo.setAttribute('color', new THREE.BufferAttribute(fieldColors, 3));
  const field = new THREE.Mesh(
    fieldGeo,
    mat(0xffffff, { vertexColors: true, roughness: 0.96, metalness: 0 }),
  );
  field.rotation.x = -Math.PI / 2;
  field.position.y = -0.05;
  field.receiveShadow = true;
  scene.add(field);

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
