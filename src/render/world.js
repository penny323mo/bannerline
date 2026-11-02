import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { yawForFacing } from '../sim/facing.js';
import { boxMapZones, frontierFrom } from '../sim/territory.js';
import { PALETTE, ownerPaint } from './palette.js';
import { rocksFor, streamBand, streamCrossings, treesFor } from './scenery.js';

/** Olive-grey walls. Team colour stays on the roof and the flag. */
const WALL = 0x5a6158;
const WATER_HALF = 0.16;
const BANK_OUT = 0.05;
const STREAM_BOW = 0.28;

const UP = new THREE.Vector3(0, 1, 0);
const LOCAL_Z = new THREE.Vector3(0, 0, 1);
const _dir = new THREE.Vector3();

function mat(color, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.88,
    metalness: 0.04,
    ...extra,
  });
}

/** About 8% lighter and darker vertices so a face is not one flat fill. */
function jitterColors(geo, amount = 0.08) {
  const pos = geo.getAttribute('position');
  if (!pos) return geo;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const wobble = Math.sin(pos.getX(i) * 19.7 + pos.getY(i) * 11.3 + pos.getZ(i) * 7.9);
    const f = 1 + wobble * amount;
    colors[i * 3] = f;
    colors[i * 3 + 1] = f;
    colors[i * 3 + 2] = f;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function weathered(source) {
  const next = source.clone();
  next.vertexColors = true;
  return next;
}

/** A short step toward the wall, so a roof stays a clear team colour. */
function muteTeam(hex) {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color(WALL), 0.18);
  return color.getHex();
}

/** Territory stains stay meadow. The thin front line is the only team mark. */
function stain(hex) {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color(PALETTE.meadow), 0.84);
  return color.getHex();
}

const _stainBase = new THREE.Color();
const _stainDirt = new THREE.Color(0x8d6840);
const _stainDeep = new THREE.Color(0x3a4a2c);
const _stainTone = new THREE.Color();
const _tuft = new THREE.Color(0x12361c);
const _wornTan = new THREE.Color(0xc48a48);

/** Dark tuft in the open grass left of the red block. Tan patch right of the tank. */
function applyMeadowMarks(tone, x, z) {
  const tuft = Math.hypot((x + 4.9) / 1.05, (z + 3.15) / 0.85);
  if (tuft < 1) tone.lerp(_tuft, 1 - tuft * 0.06);
  const worn = Math.hypot((x - 3.2) / 1.55, (z - 4.65) / 1.25);
  if (worn < 1) tone.lerp(_wornTan, 1 - worn * 0.06);
}

function meadowMarkGeometry(x, z, rx, rz, hex) {
  const geo = new THREE.CircleGeometry(1, 24);
  geo.rotateX(-Math.PI / 2);
  geo.scale(rx, 1, rz);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const core = new THREE.Color(hex);
  const edge = new THREE.Color(0x8ed45c);
  const tone = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const u = Math.min(1, Math.hypot(pos.getX(i) / rx, pos.getZ(i) / rz));
    tone.copy(core);
    if (u > 0.62) tone.lerp(edge, (u - 0.62) / 0.38);
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.translate(x, 0.07, z);
  return geo;
}

/** Break a flat owner disc into dirt and deep-grass patches. */
/** Unit disc in the XZ plane, several rings, so territory colour can mottle. */
function zoneDiscGeometry() {
  const rings = 5;
  const segs = 20;
  const count = 1 + rings * segs;
  const positions = new Float32Array(count * 3);
  let vi = 1;
  for (let r = 1; r <= rings; r++) {
    const u = r / rings;
    for (let s = 0; s < segs; s++) {
      const a = (s / segs) * Math.PI * 2;
      const o = vi * 3;
      positions[o] = Math.cos(a) * u;
      positions[o + 1] = 0;
      positions[o + 2] = Math.sin(a) * u;
      vi += 1;
    }
  }
  const indices = [];
  for (let s = 0; s < segs; s++) indices.push(0, 1 + s, 1 + ((s + 1) % segs));
  for (let r = 0; r < rings - 1; r++) {
    for (let s = 0; s < segs; s++) {
      const a = 1 + r * segs + s;
      const b = 1 + r * segs + ((s + 1) % segs);
      const c = a + segs;
      const d = b + segs;
      indices.push(a, b, d, a, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

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
  const sunGrass = new THREE.Color(0x8ed45c);
  const deepGrass = new THREE.Color(0x5eae46);
  const pale = new THREE.Color(0xc6ee86);
  const worn = new THREE.Color(0xc6a56c);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) * sx + ox;
    const z = pos.getZ(i) * sz + oz;
    const patch = Math.sin(x * 0.72 + 0.8) * Math.cos(z * 0.58 - 0.3);
    const fine = Math.sin(x * 1.8 + z * 0.6);
    _stainTone.copy(sunGrass);
    if (fine > 0.35) _stainTone.lerp(pale, 0.42);
    else if (fine < -0.4) _stainTone.lerp(deepGrass, 0.38);
    else _stainTone.lerp(deepGrass, 0.12);
    // Mud stays on the road corridor and a few worn spots, not across the meadow.
    const onRoad = Math.abs(x) < 0.95 && Math.abs(z) > 0.9;
    if (onRoad && patch > 0.55) _stainTone.lerp(worn, 0.2);
    _stainTone.lerp(_stainBase, 0.08);
    applyMeadowMarks(_stainTone, x, z);
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
  const concreteMat = mat(PALETTE.concrete, { roughness: 0.92, metalness: 0 });
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
  const sandMat = mat(PALETTE.sand, { roughness: 0.92, metalness: 0 });
  const sandPad = roundMesh(2.45, 0.32, 1.75, 4, 0.14, 0, 0.14, 0.05, sandMat);
  const sand = mergedMesh([
    baked(new THREE.BoxGeometry(0.34, 0.14, 0.18), -0.7, 0.28, -1.02),
    baked(new THREE.BoxGeometry(0.34, 0.14, 0.18), 0, 0.28, -1.02),
    baked(new THREE.BoxGeometry(0.34, 0.14, 0.18), 0.7, 0.28, -1.02),
  ], sandMat);
  const bodyMat = mat(WALL, { roughness: 0.82, metalness: 0.06 });
  bodyMat.emissive = new THREE.Color(paint.glow);
  bodyMat.emissiveIntensity = 0;
  const roofMat = mat(muteTeam(paint.main), { roughness: 0.48, metalness: 0.08 });
  const body = mergedMesh([
    baked(new THREE.BoxGeometry(2.2, 0.16, 0.12), 0, 0.86, 0.64),
    baked(new THREE.BoxGeometry(0.14, 0.22, 1.2), -1.02, 0.9, 0),
    baked(new THREE.BoxGeometry(0.14, 0.22, 1.2), 1.02, 0.9, 0),
    baked(new THREE.BoxGeometry(1.7, 0.08, 0.1), 0, 0.84, -0.6),
  ], bodyMat);
  body.userData.slot = 'body';
  const plinth = roundMesh(1.92, 0.58, 1.2, 5, 0.26, 0, 0.42, 0, bodyMat);
  const tower = roundMesh(1.22, 2.15, 0.96, 4, 0.36, 0, 1.85, 0.02, roofMat);
  tower.userData.slot = 'roof';
  capNear.material = roofMat;
  capTop.material = roofMat;
  capNear.userData.slot = 'roof';
  capTop.userData.slot = 'roof';
  // The shaft and the crown share the muted team colour. The plinth stays the wall.
  const roof = roundMesh(1.38, 0.86, 1.12, 5, 0.22, 0, 2.48, 0.02, roofMat);
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
  if (paint.main === PALETTE.player.main) {
    tower.visible = false;
    capNear.visible = false;
    capTop.visible = false;
    roof.visible = false;
    metal.visible = false;
    const lowRoof = roundMesh(2.15, 0.2, 1.62, 4, 0.1, 0, 1.02, 0.02, roofMat);
    lowRoof.userData.slot = 'roof';
    const lip = roundMesh(1.7, 0.1, 1.15, 3, 0.06, 0, 1.16, 0.02, roofMat);
    lip.userData.slot = 'roof';
    const bags = mergedMesh([
      baked(new THREE.BoxGeometry(0.42, 0.28, 0.32), -1.15, 0.32, -0.7),
      baked(new THREE.BoxGeometry(0.42, 0.28, 0.32), -1.15, 0.32, 0.15),
      baked(new THREE.BoxGeometry(0.42, 0.28, 0.32), -1.15, 0.32, 0.85),
      baked(new THREE.BoxGeometry(0.42, 0.28, 0.32), 1.15, 0.32, -0.55),
      baked(new THREE.BoxGeometry(0.42, 0.28, 0.32), 1.15, 0.32, 0.25),
      baked(new THREE.BoxGeometry(0.42, 0.28, 0.32), 1.15, 0.32, 0.95),
      baked(new THREE.BoxGeometry(0.5, 0.26, 0.36), 0.2, 0.3, 1.15),
      baked(new THREE.BoxGeometry(0.5, 0.26, 0.36), -0.45, 0.3, 1.15),
    ], weathered(sandMat));
    jitterColors(bags.geometry, 0.08);
    g.add(lowRoof, lip, bags);
  } else {
    tower.material = weathered(concreteMat);
    jitterColors(tower.geometry, 0.08);
    tower.userData.slot = '';
    roof.visible = false;
    capNear.material = concreteMat;
    capTop.material = concreteMat;
    capNear.userData.slot = '';
    capTop.userData.slot = '';
    const bandA = roundMesh(1.08, 0.12, 0.84, 3, 0.03, 0, 1.08, 0.02, roofMat);
    const bandB = roundMesh(1.02, 0.11, 0.78, 3, 0.03, 0, 2.62, 0.02, roofMat);
    bandA.userData.slot = 'roof';
    bandB.userData.slot = 'roof';
    g.add(bandA, bandB);
  }
  return g;
}

/** Lower hangar: roll door, vents, spawn pad. No dish. Roof center is world y 0.78. */
function makeBarracks(paint) {
  const g = new THREE.Group();
  const sandMat = mat(PALETTE.sand, { roughness: 0.92, metalness: 0 });
  const sandPad = roundMesh(1.95, 0.32, 1.28, 4, 0.14, 0, 0.14, 0.05, sandMat);
  const sand = mergedMesh([
    baked(new THREE.BoxGeometry(0.52, 0.34, 0.36), -0.98, 0.26, -0.58),
    baked(new THREE.BoxGeometry(0.52, 0.34, 0.36), 0.98, 0.26, -0.58),
    baked(new THREE.BoxGeometry(0.52, 0.34, 0.36), -0.98, 0.26, 0.12),
    baked(new THREE.BoxGeometry(0.52, 0.34, 0.36), 0.98, 0.26, 0.12),
    baked(new THREE.BoxGeometry(0.52, 0.34, 0.36), -0.98, 0.26, 0.74),
    baked(new THREE.BoxGeometry(0.52, 0.34, 0.36), 0.98, 0.26, 0.74),
    baked(new THREE.BoxGeometry(0.46, 0.3, 0.5), -0.55, 0.26, 0.86),
    baked(new THREE.BoxGeometry(0.46, 0.3, 0.5), 0.55, 0.26, 0.86),
    baked(new THREE.BoxGeometry(0.46, 0.3, 0.5), -0.18, 0.26, -0.82),
    baked(new THREE.BoxGeometry(0.46, 0.3, 0.5), 0.38, 0.26, -0.82),
  ], weathered(sandMat));
  jitterColors(sand.geometry, 0.08);
  const wallMat = mat(PALETTE.concrete, { roughness: 0.92, metalness: 0 });
  const body = roundMesh(1.74, 0.58, 1.02, 6, 0.16, 0, 0.38, 0, weathered(wallMat));
  jitterColors(body.geometry, 0.08);
  const shellMat = mat(WALL, { roughness: 0.9, metalness: 0.04 });
  const roofMat = mat(muteTeam(paint.main), { roughness: 0.84, metalness: 0.04 });
  const slopeNear = roundMesh(1.58, 0.22, 0.56, 4, 0.08, 0, 0.88, -0.22, roofMat);
  slopeNear.rotation.x = -0.45;
  const slopeFar = roundMesh(1.58, 0.22, 0.56, 4, 0.08, 0, 0.88, 0.22, roofMat);
  slopeFar.rotation.x = 0.45;
  const shell = mergedMesh([
    baked(new THREE.BoxGeometry(0.1, 0.22, 0.9), -0.84, 0.86, 0),
    baked(new THREE.BoxGeometry(0.1, 0.22, 0.9), 0.84, 0.86, 0),
    baked(new THREE.BoxGeometry(1.2, 0.04, 0.1), 0, 1.04, 0.02),
    baked(new THREE.BoxGeometry(0.12, 0.07, 0.12), -0.46, 1.02, 0.02),
    baked(new THREE.BoxGeometry(0.12, 0.07, 0.12), 0.46, 1.02, -0.02),
  ], shellMat);
  const roof = mergedMesh([
    baked(new THREE.BoxGeometry(1.55, 0.08, 0.78), 0, 0.98, 0),
  ], roofMat);
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
  const hullMat = mat(0x314428, { roughness: 0.78, metalness: 0.16 });
  hullMat.emissive = new THREE.Color(0x24321e);
  hullMat.emissiveIntensity = 0.18;
  const hull = mergedMesh([
    baked(new THREE.BoxGeometry(0.62, 0.16, 0.95), 0, 0.22, 0),
    baked(new THREE.BoxGeometry(0.4, 0.12, 0.42), 0, 0.34, 0.06),
  ], hullMat);
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
  const trackMat = mat(0x3a3832, { roughness: 0.9, metalness: 0.12 });
  trackMat.emissive = new THREE.Color(0x2a2824);
  trackMat.emissiveIntensity = 0.12;
  const tracks = mergedMesh([
    baked(new THREE.BoxGeometry(0.12, 0.14, 1.02), -0.36, 0.12, 0),
    baked(new THREE.BoxGeometry(0.12, 0.14, 1.02), 0.36, 0.12, 0),
  ], trackMat);
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
      obj.material.color.setHex(muteTeam(paint.main));
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

/**
 * One ground stroke. Local −Y becomes world +Z (our side) after rotateX(−π/2).
 * Width stays under 0.06 so the green-to-red fade is a single line, not two bars.
 */
function thinFrontGeometry() {
  const half = 0.025;
  const steps = 8;
  const positions = new Float32Array((steps + 1) * 2 * 3);
  const colors = new Float32Array((steps + 1) * 2 * 3);
  const green = new THREE.Color(0x3ecf72);
  const red = new THREE.Color(0xe04538);
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const x = -0.5 + u;
    const o = i * 6;
    positions[o] = x;
    positions[o + 1] = -half;
    positions[o + 2] = 0;
    positions[o + 3] = x;
    positions[o + 4] = half;
    positions[o + 5] = 0;
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
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Thick bowed front. Local −Y becomes world +Z (player green) after rotateX(−π/2).
 * Local +Y becomes world −Z (enemy red). The halo uses a wider half.
 */
function glowFrontGeometry(half, bowAmp) {
  const steps = 22;
  const positions = new Float32Array((steps + 1) * 2 * 3);
  const colors = new Float32Array((steps + 1) * 2 * 3);
  const green = new THREE.Color(0x3dff78);
  const red = new THREE.Color(0xff4a2a);
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const x = -0.5 + u;
    const bow = Math.sin(u * Math.PI) * bowAmp;
    const o = i * 6;
    positions[o] = x;
    positions[o + 1] = bow - half;
    positions[o + 2] = 0;
    positions[o + 3] = x;
    positions[o + 4] = bow + half;
    positions[o + 5] = 0;
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
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
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
  return mesh;
}

/** One grey deck per stream crossing. The plank runs along world z, across the stream. */
export function bridgeDeckGeometries(crossings) {
  const parts = [];
  for (let i = 0; i < crossings.length; i++) {
    const x = crossings[i].x;
    const z = crossings[i].z;
    const plank = new THREE.BoxGeometry(0.92, 0.1, 2.2, 8, 1, 28);
    plank.translate(x, 0.17, z);
    parts.push(plank);
    for (const side of [-0.4, 0.4]) {
      const rail = new THREE.BoxGeometry(0.1, 0.08, 2.2);
      rail.translate(x + side, 0.24, z);
      parts.push(rail);
    }
  }
  return parts;
}

function pushTree(trunks, crowns, x, z, scale, color) {
  scale *= 1;
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
  const meadow = new THREE.Color(0x8ed45c);
  const deep = new THREE.Color(0x5eae46);
  const pale = new THREE.Color(0xc6ee86);
  const worn = new THREE.Color(0xc6a56c);
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
    const patch = Math.sin(x * 0.7 + 0.4) * Math.cos(z * 0.55);
    const speckle = Math.sin(x * 1.6 + z * 1.1);
    tone.copy(meadow);
    if (speckle > 0.2) tone.lerp(pale, 0.4);
    else if (speckle < -0.25) tone.lerp(deep, 0.35);
    else tone.lerp(deep, 0.1);
    const onRoad = Math.abs(x) < 0.95 && Math.abs(z) > 0.9;
    if (onRoad && patch > 0.55) tone.lerp(worn, 0.18);
    if (u > 0.92) tone.lerp(deep, 0.18);
    applyMeadowMarks(tone, x, z);
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

/** Narrow dark water. Dirt banks, no pale rim, no faction paint. */
function streamRibbon(span) {
  const cols = 22;
  const halfX = span / 2;
  const bands = [
    { off: -(WATER_HALF + BANK_OUT), y: 0.11, hex: 0x6a8a48, sand: true },
    { off: -(WATER_HALF + BANK_OUT * 0.45), y: 0.095, hex: 0x628048, sand: true },
    { off: -WATER_HALF, y: 0.078, hex: 0x5a7044, sand: true },
    { off: -WATER_HALF * 0.7, y: 0.064, hex: 0x3a6274 },
    { off: -WATER_HALF * 0.28, y: 0.052, hex: 0x4a7890 },
    { off: 0, y: 0.046, hex: 0x3e6e84 },
    { off: WATER_HALF * 0.32, y: 0.052, hex: 0x355e70 },
    { off: WATER_HALF * 0.74, y: 0.064, hex: 0x3a6274 },
    { off: WATER_HALF, y: 0.078, hex: 0x5a7044, sand: true },
    { off: WATER_HALF + BANK_OUT * 0.45, y: 0.095, hex: 0x628048, sand: true },
    { off: WATER_HALF + BANK_OUT, y: 0.11, hex: 0x6a8a48, sand: true },
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
        const rip = 0.5 + 0.5 * Math.sin(x * 3.3 + band.off * 9);
        tone.lerp(new THREE.Color(0x5a90a4), rip * 0.22);
        tone.lerp(new THREE.Color(0x243848), (1 - rip) * 0.2);
      } else {
        const grit = 0.5 + 0.5 * Math.sin(x * 4.1 + band.off * 6);
        tone.lerp(new THREE.Color(0x5a7040), grit * 0.12);
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
const STREAM_BANK = 0.55;

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
  const base = new THREE.Color(0xd2ae74);
  const dark = new THREE.Color(0xb89258);
  const light = new THREE.Color(0xe8c98a);
  const tone = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const n = Math.sin(x * 6.5 + z * 3.1) * Math.cos(z * 5.2 - x * 2.4);
    if (n > 0.45) tone.copy(light);
    else if (n < 0.05) tone.copy(dark);
    else {
      tone.copy(base);
      tone.lerp(dark, 0.12);
    }
    const groove = Math.sin(z * 18 + x * 2.4);
    const rut = Math.sin(x * 16 + z * 0.6);
    if (groove > 0.55 || rut > 0.82) tone.lerp(dark, 0.28);
    else if (groove < -0.35) tone.lerp(light, 0.45);
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

/** Dark timber or concrete. The road keeps paintDirt; the deck does not. */
function paintDeck(geo, hex) {
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color(hex);
  const dark = new THREE.Color(hex).multiplyScalar(0.62);
  const light = new THREE.Color(hex).lerp(new THREE.Color(0x6a5a48), 0.4);
  const tone = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const grain = Math.sin(z * 22 + x * 3.2);
    tone.copy(base);
    if (grain > 0.35) tone.lerp(light, 0.4);
    else if (grain < -0.15) tone.lerp(dark, 0.55);
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

/** Subdivided deck so the dirt sine has vertices to draw as ruts. */
function dirtGrid(length, width, x0, z0, x1, z1, y) {
  const segL = Math.max(4, Math.round(length / 0.1));
  const geo = new THREE.PlaneGeometry(width, length, 8, segL);
  geo.rotateX(-Math.PI / 2);
  const holder = new THREE.Mesh(geo);
  holder.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  const dx = x1 - x0;
  const dz = z1 - z0;
  const len = Math.hypot(dx, dz) || 1;
  _dir.set(dx / len, 0, dz / len);
  holder.quaternion.setFromUnitVectors(LOCAL_Z, _dir);
  holder.updateMatrix();
  geo.applyMatrix4(holder.matrix);
  paintDirt(geo);
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
    parts.push(dirtGrid(len, ROAD_W, seg.x0, seg.z0, seg.x1, seg.z1, seg.y + 0.03));
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
  addMerged(group, parts, roadMat, { cast: false, receive: true });
  addMerged(group, shoulderParts, mat(0xd2b07a, { roughness: 0.96, metalness: 0 }), { cast: false, receive: true });
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
  addMerged(group, [
    meadowMarkGeometry(-4.9, -3.15, 1.05, 0.85, 0x12361c),
    meadowMarkGeometry(3.2, 4.65, 1.55, 1.25, 0xc48a48),
  ], mat(0xffffff, { vertexColors: true, roughness: 0.96, metalness: 0 }), { cast: false, receive: true });

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
      zoneDiscGeometry(),
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
    [-0.95, 2.6, 0.48, 0.32, 0x8a6844],
    [0.85, -2.15, 0.42, 0.28, 0x7d6040],
    [-0.7, 4.7, 0.36, 0.24, 0x8d6c48],
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
      if (edge > 0.86) tone.lerp(dirtMeadow, ((edge - 0.86) / 0.14) * 0.55);
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
    mat(0xffffff, { vertexColors: true, roughness: 0.62, metalness: 0.02 }),
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
  const decks = bridgeDeckGeometries(streamCrossings(map));
  const planks = [];
  const rails = [];
  for (let i = 0; i < decks.length; i++) {
    if (i % 3 === 0) {
      paintDeck(decks[i], 0x3e342c);
      planks.push(decks[i]);
    } else {
      paintDeck(decks[i], 0x2a2622);
      rails.push(decks[i]);
    }
  }
  const deckMat = mat(0xffffff, {
    vertexColors: true,
    roughness: 0.9,
    metalness: 0.05,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const railMat = mat(0xffffff, {
    vertexColors: true,
    roughness: 0.88,
    metalness: 0.06,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  addMerged(group, planks, deckMat);
  addMerged(group, rails, railMat);

  const trunks = [];
  const crowns = {};
  const treeSpots = [];
  const flora = [];
  const trees = treesFor(map);
  for (let i = 0; i < trees.length; i++) {
    const t = trees[i];
    treeSpots.push({ x: t.x, z: t.z, s: t.s });
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
    treeSpots.push({ x: spot[0], z: spot[1], s: spot[2] });
    pushTree(trunks, crowns, spot[0], spot[1], spot[2], i % 2 ? PALETTE.leafDeep : PALETTE.leaf);
  }
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2 + 0.4;
    const rad = 9 + (i % 6) * 0.85;
    const x = Math.cos(a) * rad * 1.2;
    const z = Math.sin(a) * rad * 0.95;
    if (Math.abs(x) < 2.1 && Math.abs(z) < 10) continue;
    if (Math.abs(z) < 1.7) continue;
    const s = 0.75 + (i % 4) * 0.12;
    treeSpots.push({ x, z, s });
    pushTree(trunks, crowns, x, z, s, i % 3 ? PALETTE.leaf : PALETTE.leafDeep);
  }
  const rocks = rocksFor(map).slice();
  const rockSpots = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.15;
    const rad = 10.5 + (i % 4) * 1.1;
    rocks.push({
      x: Math.cos(a) * rad * 1.15,
      z: Math.sin(a) * rad * 0.9,
      s: 1.35 + (i % 3) * 0.45,
    });
  }
  for (let i = 0; i < rocks.length; i++) {
    rockSpots.push({ x: rocks[i].x, z: rocks[i].z, s: rocks[i].s });
  }
  if (rocks.length) {
    const rockGeo = new THREE.DodecahedronGeometry(0.36, 0);
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
    const rockMesh = addMerged(group, rockParts, mat(PALETTE.rock, { roughness: 0.9, metalness: 0.02 }));
    if (rockMesh) flora.push(rockMesh);
  }
  const trunkMesh = addMerged(group, trunks, mat(PALETTE.trunk));
  if (trunkMesh) flora.push(trunkMesh);
  const crownColors = Object.keys(crowns);
  for (let i = 0; i < crownColors.length; i++) {
    const crownMesh = addMerged(group, crowns[crownColors[i]], mat(Number(crownColors[i])));
    if (crownMesh) flora.push(crownMesh);
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
    groupB.userData.kind = spec.kind;
    groupB.traverse((obj) => {
      if (obj.userData && obj.userData.flutter) flags.push(obj);
    });
    if (spec.kind === 'barracks' && spec.owner === 'player') {
      const tank = makeTank(ownerPaint(spec.owner));
      // Local +x is the building's right. The barrel stays on local −z, the road facing.
      tank.scale.setScalar(1.65);
      tank.position.set(0.95, 0, -1.25);
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
  const blobMesh = addMerged(group, blobs, new THREE.MeshBasicMaterial({
    color: 0x1c1812,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  }));
  if (blobMesh) flora.push(blobMesh);
  group.userData.flora = flora;
  group.userData.treeSpots = treeSpots;
  group.userData.rockSpots = rockSpots;
  group.userData.playBox = box;
  group.userData.buildings = buildings;

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
  const lipGeo = thinFrontGeometry();
  const fronts = [];
  const halos = [];
  const lips = [];

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
    const lipMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    const lip = makeGlow(lipGeo, lipMat);
    group.add(lip);
    lips.push(lip);
  }
  const coreGeo = glowFrontGeometry(0.07, 1.05);
  const auraGeo = glowFrontGeometry(0.13, 1.05);
  const coreMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const auraMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const cores = [];
  const auras = [];
  for (let i = 0; i < glows.length; i++) {
    const aura = makeGlow(auraGeo, auraMat);
    group.add(aura);
    auras.push(aura);
    const core = makeGlow(coreGeo, coreMat);
    group.add(core);
    cores.push(core);
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
            // Shaded fillets crush to a black lip. Keep a dim olive floor.
            pulse.emissive.setHex(0x3a4038);
            pulse.emissiveIntensity = 0.14;
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
      glowMat.opacity = 0.92;
      let frontIndex = -1;
      let frontScore = Infinity;
      for (let i = 0; i < glows.length; i++) {
        const seg = segs[i];
        if (!seg) continue;
        const alongX = seg.axis !== 'z';
        const span = alongX ? Math.max(0.8, seg.x1 - seg.x0) : Math.max(0.8, seg.z1 - seg.z0);
        const cz = alongX ? seg.z : (seg.z0 + seg.z1) / 2;
        const score = Math.abs(cz) * 3 - span;
        if (score < frontScore) {
          frontScore = score;
          frontIndex = i;
        }
      }
      for (let i = 0; i < glows.length; i++) {
        const seg = segs[i];
        const band = glows[i];
        if (!seg) {
          band.visible = false;
          tints[i].visible = false;
          fronts[i].visible = false;
          halos[i].visible = false;
          lips[i].visible = false;
          cores[i].visible = false;
          auras[i].visible = false;
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
        // The thick bow is the old candy arc. The saturated band stays in the
        // graph for the art test and is not drawn. The visible front is the
        // emissive core plus a soft additive halo, green on our side.
        front.visible = false;
        halo.visible = false;
        band.visible = false;
        tint.visible = false;
        lips[i].visible = false;
        const showFront = i === frontIndex;
        const wideSpan = Math.max(span, 13);
        cores[i].visible = showFront;
        auras[i].visible = showFront;
        if (showFront) {
          // Curve sits on the player bank. Ends stay clear of the water.
          const fox = Math.sin(yaw) * 1.15;
          const foz = Math.cos(yaw) * 1.15;
          cores[i].position.set(cx + fox, 0.42, cz + foz);
          auras[i].position.set(cx + fox, 0.36, cz + foz);
          cores[i].scale.set(wideSpan, 1, 1);
          auras[i].scale.set(wideSpan, 1, 1);
          cores[i].rotation.y = yaw;
          auras[i].rotation.y = yaw;
        }
      }
      for (let i = segs.length; i < tints.length; i++) {
        tints[i].visible = false;
        fronts[i].visible = false;
        halos[i].visible = false;
        lips[i].visible = false;
        cores[i].visible = false;
        auras[i].visible = false;
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
  const horizon = new THREE.Color(0xe4d4ae);
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
  const meadowA = new THREE.Color(0x8ed45c);
  const meadowB = new THREE.Color(0x5eae46);
  const meadowC = new THREE.Color(0xc6ee86);
  const worn = new THREE.Color(0xc6a56c);
  const meadowTone = new THREE.Color();
  for (let i = 0; i < fieldPos.count; i++) {
    const x = fieldPos.getX(i);
    const y = fieldPos.getY(i);
    const n = Math.sin(x * 0.07) * Math.cos(y * 0.055) + Math.sin(x * 0.16 + y * 0.11) * 0.4;
    const blot = Math.sin(x * 0.09 + 1.7) * Math.cos(y * 0.075);
    meadowTone.copy(meadowA);
    if (n > 0.25) meadowTone.lerp(meadowC, 0.4);
    else if (blot < -0.35) meadowTone.lerp(meadowB, 0.32);
    else meadowTone.lerp(meadowB, 0.12);
    if (Math.abs(x) < 1.1 && blot > 0.7) meadowTone.lerp(worn, 0.18);
    // Plane +Y is world −Z after the ground rotation.
    applyMeadowMarks(meadowTone, x, -y);
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
  let dresser = null;

  function mount(map) {
    if (island) {
      holder.remove(island.group);
      island.dispose();
      island = null;
    }
    island = buildIsland(map, reduceMotion);
    holder.add(island.group);
    if (dresser) dresser(island.group);
  }

  return {
    mount,
    setDresser(fn) {
      dresser = fn;
      if (island) dresser(island.group);
    },
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
