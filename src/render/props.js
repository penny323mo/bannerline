import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
const MODEL = 'assets/models/';

const FILES = {
  soldier: `${MODEL}soldier.glb`,
  rifle: `${MODEL}rifle.glb`,
  tank: `${MODEL}tank.glb`,
  pineA: `${MODEL}pine-a.glb`,
  pineB: `${MODEL}pine-b.glb`,
  rockA: `${MODEL}rock-a.glb`,
  rockB: `${MODEL}rock-b.glb`,
  bags: `${MODEL}sandbags.glb`,
  fence: `${MODEL}fence.glb`,
  fort: `${MODEL}fence-fort.glb`,
  tower: `${MODEL}hq-tower.glb`,
  bunker: `${MODEL}bunker.glb`,
  roof: `${MODEL}bunker-roof.glb`,
  wall: `${MODEL}bunker-wall.glb`,
  radar: `${MODEL}radar.glb`,
};

const _box = new THREE.Box3();
const _size = new THREE.Vector3();
const _v = new THREE.Vector3();
const _bind = new THREE.Vector4();
const _acc = new THREE.Vector4();
const _bone = new THREE.Matrix4();

function loader() {
  return new GLTFLoader();
}

function loadOne(file) {
  return loader().loadAsync(file);
}

/** Arms-down bake. The rig's rest pose is a T. rotateX(-1.65) drops both hands to the hip. */
function poseSoldier(root) {
  root.traverse((obj) => {
    if (obj.name === 'UpperArmL' || obj.name === 'UpperArmR') obj.rotateX(-1.65);
  });
  root.updateMatrixWorld(true);
}

function findNamed(root, name) {
  let found = null;
  root.traverse((obj) => {
    if (obj.name === name) found = obj;
  });
  return found;
}

function bakeSkinned(mesh) {
  const src = mesh.geometry;
  const pos = src.getAttribute('position');
  const skinIndex = src.getAttribute('skinIndex');
  const skinWeight = src.getAttribute('skinWeight');
  mesh.skeleton.update();
  const bones = mesh.skeleton.boneMatrices;
  const out = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    _bind.set(pos.getX(i), pos.getY(i), pos.getZ(i), 1).applyMatrix4(mesh.bindMatrix);
    _acc.set(0, 0, 0, 0);
    for (let k = 0; k < 4; k++) {
      const w = skinWeight.getComponent(i, k);
      if (!w) continue;
      const bone = Math.round(skinIndex.getComponent(i, k));
      _bone.fromArray(bones, bone * 16);
      const p = _bind.clone().applyMatrix4(_bone);
      _acc.addScaledVector(p, w);
    }
    _acc.applyMatrix4(mesh.bindMatrixInverse);
    _acc.applyMatrix4(mesh.matrixWorld);
    out[i * 3] = _acc.x;
    out[i * 3 + 1] = _acc.y;
    out[i * 3 + 2] = _acc.z;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(out, 3));
  if (src.getIndex()) geo.setIndex(src.getIndex().clone());
  return geo;
}

function colorize(geo, hex) {
  const pos = geo.getAttribute('position');
  const colors = new Float32Array(pos.count * 3);
  const tone = new THREE.Color(hex);
  for (let i = 0; i < pos.count; i++) {
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

/** mergeGeometries rejects mixed normals, uvs, and index layouts. Keep position and color only. */
function posColor(geo, hex) {
  const src = geo.getIndex() ? geo.toNonIndexed() : geo;
  const next = new THREE.BufferGeometry();
  next.setAttribute('position', src.getAttribute('position').clone());
  return colorize(next, hex);
}

function staticParts(root) {
  const parts = [];
  root.updateMatrixWorld(true);
  root.traverse((obj) => {
    if (!obj.isMesh || obj.isSkinnedMesh) return;
    const geo = obj.geometry.clone();
    geo.applyMatrix4(obj.matrixWorld);
    parts.push(geo);
  });
  return parts;
}

/**
 * Swat body faces +Z in the glTF (Blender −Y through the armature's −90° X).
 * The crowd yaw aims local −Z, so the baked figure turns 180° after the rifle is attached.
 * Rifle long axis on the source file is +X; rotateY(−π/2) lays it along +Z, out of the hand.
 */
function buildSoldier(soldierRoot, rifleRoot) {
  poseSoldier(soldierRoot);
  const parts = [];
  soldierRoot.traverse((obj) => {
    if (!obj.isSkinnedMesh) return;
    const geo = bakeSkinned(obj);
    const name = obj.name || (obj.parent && obj.parent.name) || '';
    const tone = name.includes('Head') ? 0.78 : 1;
    parts.push(posColor(geo, new THREE.Color(tone, tone, tone).getHex()));
  });
  const rifleParts = staticParts(rifleRoot).map((geo) => posColor(geo, 0xffffff));
  const rifle = mergeGeometries(rifleParts);
  rifle.computeBoundingBox();
  rifle.rotateY(-Math.PI / 2);
  rifle.computeBoundingBox();
  const rifleSize = rifle.boundingBox.getSize(_size);
  const rifleScale = 0.72 / Math.max(rifleSize.z, 0.001);
  rifle.scale(rifleScale * 2.2, rifleScale * 1.7, rifleScale * 1.35);
  // Angle the barrel out of the chest. A later shove puts it in front of the torso.
  rifle.rotateY(0.85);
  rifle.computeBoundingBox();
  const hand = findNamed(soldierRoot, 'HandR');
  hand.getWorldPosition(_v);
  rifle.translate(
    _v.x + 0.22 - (rifle.boundingBox.min.x + rifle.boundingBox.max.x) * 0.5,
    _v.y - (rifle.boundingBox.min.y + rifle.boundingBox.max.y) * 0.5,
    _v.z - rifle.boundingBox.min.z,
  );
  parts.push(colorize(rifle, 0x1a1c18));
  const merged = mergeGeometries(parts);
  merged.rotateY(Math.PI);
  merged.computeBoundingBox();
  const box = merged.boundingBox;
  const height = Math.max(0.001, box.max.y - box.min.y);
  const fit = 1 / height;
  merged.scale(fit, fit, fit);
  merged.computeBoundingBox();
  const fitted = merged.boundingBox;
  const cx = (fitted.min.x + fitted.max.x) * 0.5;
  const cz = (fitted.min.z + fitted.max.z) * 0.5;
  merged.translate(-cx, -fitted.min.y, -cz);
  // Local −Z is the facing axis. The dark gun has to clear the chest on the front rank.
  const gunPos = merged.getAttribute('position');
  const gunCol = merged.getAttribute('color');
  for (let i = 0; i < gunPos.count; i++) {
    const lum = gunCol.getX(i) * 0.2126 + gunCol.getY(i) * 0.7152 + gunCol.getZ(i) * 0.0722;
    if (lum < 0.2) gunPos.setZ(i, gunPos.getZ(i) - 0.4);
  }
  merged.computeVertexNormals();
  return merged;
}

function preparedGeometry(root, tint, strength = 0.45, gain = 1) {
  root.updateMatrixWorld(true);
  const parts = [];
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    const geo = obj.geometry.clone();
    geo.applyMatrix4(obj.matrixWorld);
    const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    const color = mat && mat.color ? mat.color.clone() : new THREE.Color(0xffffff);
    const lum = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
    if (tint && lum >= 0.25) color.lerp(new THREE.Color(tint), strength);
    // Pines pass a gain under 1. The sun at 3.5 lifts a 0x142016 lerp back to cartoon green.
    if (gain !== 1) color.multiplyScalar(gain);
    parts.push(posColor(geo, color.getHex()));
  });
  const geo = mergeGeometries(parts);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  const box = geo.boundingBox;
  const h = Math.max(0.001, box.max.y - box.min.y);
  geo.scale(1 / h, 1 / h, 1 / h);
  geo.computeBoundingBox();
  const fitted = geo.boundingBox;
  geo.translate(
    -(fitted.min.x + fitted.max.x) * 0.5,
    -fitted.min.y,
    -(fitted.min.z + fitted.max.z) * 0.5,
  );
  return geo;
}

/** Brown trunk, rich green crown, lighter tips. The raw gain of 0.35 read as burnt wood. */
function paintPine(geo) {
  const pos = geo.attributes.position;
  const col = geo.attributes.color;
  if (!pos || !col) return geo;
  const trunk = new THREE.Color(0x6b4630);
  const leaf = new THREE.Color(0x1f6b38);
  const sun = new THREE.Color(0xa4d46e);
  const tone = new THREE.Color();
  let maxY = 0.001;
  for (let i = 0; i < pos.count; i++) maxY = Math.max(maxY, pos.getY(i));
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / maxY;
    if (y < 0.16) tone.copy(trunk);
    else {
      tone.copy(leaf);
      tone.lerp(sun, Math.max(0, (y - 0.58) / 0.42) * 0.75);
    }
    col.setXYZ(i, tone.r, tone.g, tone.b);
  }
  col.needsUpdate = true;
  return geo;
}

function concreteMaterial(hex) {
  return new THREE.MeshStandardMaterial({ color: hex, roughness: 0.9, metalness: 0.02 });
}

function repaint(root, material, cast = false) {
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.material = material;
    obj.castShadow = cast;
    obj.receiveShadow = true;
  });
}

/** Downward faces go darker so a single olive does not read as flat plastic. */
function shadeMesh(geo, hex) {
  const pos = geo.attributes.position;
  const norm = geo.attributes.normal;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color(hex);
  const tone = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const ny = norm ? norm.getY(i) : 0.5;
    const shade = 0.55 + 0.45 * Math.max(0, Math.min(1, ny * 0.5 + 0.5));
    tone.copy(base).multiplyScalar(shade);
    colors[i * 3] = tone.r;
    colors[i * 3 + 1] = tone.g;
    colors[i * 3 + 2] = tone.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function ownMaterials(root) {
  root.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const list = Array.isArray(obj.material) ? obj.material : [obj.material];
    const next = list.map((mat) => {
      const copy = mat.clone();
      copy.roughness = Math.max(copy.roughness || 0, 0.72);
      copy.metalness = Math.min(copy.metalness || 0, 0.12);
      return copy;
    });
    obj.material = Array.isArray(obj.material) ? next : next[0];
    obj.castShadow = false;
    obj.receiveShadow = true;
  });
}

function detach(root) {
  root.traverse((obj) => {
    if (obj.geometry) obj.geometry = obj.geometry.clone();
    if (!obj.material) return;
    obj.material = Array.isArray(obj.material) ? obj.material.map((mat) => mat.clone()) : obj.material.clone();
  });
}

function fitHeight(object, parent, worldHeight, maxSpan) {
  parent.add(object);
  object.position.set(0, 0, 0);
  object.rotation.set(0, 0, 0);
  object.scale.set(1, 1, 1);
  parent.updateWorldMatrix(true, true);
  _box.setFromObject(object);
  const h = Math.max(0.001, _box.max.y - _box.min.y);
  const span = Math.max(0.001, _box.max.x - _box.min.x, _box.max.z - _box.min.z);
  let next = worldHeight / h;
  if (maxSpan && span * next > maxSpan) next = maxSpan / span;
  object.scale.setScalar(next);
  parent.updateWorldMatrix(true, true);
  _box.setFromObject(object);
  const parentY = parent.getWorldPosition(_v).y;
  const parentScale = parent.getWorldScale(new THREE.Vector3()).y || 1;
  object.position.y += (parentY - _box.min.y) / parentScale;
}

function keepMesh(obj) {
  let node = obj;
  while (node) {
    if (node.userData && node.userData.flutter) return true;
    node = node.parent;
  }
  return false;
}

function hidePrimitives(group) {
  const pip = group.userData.pip;
  const ring = group.userData.dangerRing;
  group.traverse((obj) => {
    if (!obj.isMesh || keepMesh(obj)) return;
    if (obj === pip || obj === ring) return;
    obj.visible = false;
  });
}

function scatter(parent, geometry, spots, material, yaw, cast = false) {
  if (!geometry || !spots.length) return;
  const geo = geometry.clone();
  const matCopy = material.clone();
  const mesh = new THREE.InstancedMesh(geo, matCopy, spots.length);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  const dummy = new THREE.Object3D();
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];
    dummy.position.set(spot.x, 0, spot.z);
    dummy.rotation.set(0, yaw ? yaw(i, spot) : 0, 0);
    dummy.scale.setScalar(spot.s);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
  parent.add(mesh);
}

function frameOf(obj) {
  obj.updateWorldMatrix(true, true);
  const origin = new THREE.Vector3();
  const scale = new THREE.Vector3();
  obj.getWorldPosition(origin);
  obj.getWorldScale(scale);
  return { origin, scale };
}

/** Move the mesh so its lowest world point sits at worldY. */
function setFeetWorldY(object, parent, worldY) {
  parent.updateWorldMatrix(true, true);
  _box.setFromObject(object);
  const frame = frameOf(parent);
  const sy = frame.scale.y || 1;
  object.position.y += (worldY - _box.min.y) / sy;
}

function reseatFeet(object, parent) {
  parent.updateWorldMatrix(true, true);
  _box.setFromObject(object);
  const frame = frameOf(parent);
  const sy = frame.scale.y || 1;
  object.position.y += (frame.origin.y - _box.min.y) / sy;
}

function seatFlag(group, worldY) {
  const frame = frameOf(group);
  const sy = frame.scale.y || 1;
  group.traverse((obj) => {
    if (!obj.userData || !obj.userData.flutter) return;
    obj.position.y = (worldY - frame.origin.y) / sy + 0.12 / sy;
  });
}

/**
 * Quaternius tanks leave Blender facing +Z after the armature's −90° X.
 * Measure the gun against the hull and yaw until that axis is the parent's −Z,
 * the same forward the building and the crowd use.
 */
function bakeProp(root) {
  root.updateMatrixWorld(true);
  const parts = [];
  root.traverse((obj) => {
    if (obj.isSkinnedMesh) {
      obj.skeleton.update();
      parts.push(bakeSkinned(obj));
    } else if (obj.isMesh) {
      const geo = obj.geometry.clone();
      geo.applyMatrix4(obj.matrixWorld);
      parts.push(geo);
    }
  });
  const cleaned = [];
  for (let i = 0; i < parts.length; i++) {
    const src = parts[i].getIndex() ? parts[i].toNonIndexed() : parts[i];
    const next = new THREE.BufferGeometry();
    next.setAttribute('position', src.getAttribute('position').clone());
    cleaned.push(next);
  }
  const merged = mergeGeometries(cleaned);
  if (!merged) return null;
  merged.computeBoundingBox();
  const size = merged.boundingBox.getSize(new THREE.Vector3());
  if (size.x > size.z) merged.rotateY(Math.PI / 2);
  merged.computeVertexNormals();
  return merged;
}

function aimTankForward(tank) {
  let gun = null;
  let body = null;
  tank.traverse((obj) => {
    if (!obj.isMesh) return;
    if (obj.name === 'Tank_Gun') gun = obj;
    if (obj.name === 'Tank_body') body = obj;
  });
  if (!gun || !body || !tank.parent) return;
  tank.updateWorldMatrix(true, true);
  const dir = new THREE.Box3().setFromObject(gun).getCenter(new THREE.Vector3());
  dir.sub(new THREE.Box3().setFromObject(body).getCenter(new THREE.Vector3()));
  const inv = tank.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
  dir.applyQuaternion(inv);
  dir.y = 0;
  if (dir.lengthSq() < 1e-8) return;
  const current = Math.atan2(dir.x, dir.z);
  const want = Math.atan2(0, -1);
  tank.rotation.y += want - current;
}

function ringBags(parent, template, radius, count) {
  for (let i = 0; i < count; i++) {
    const bag = template.clone(true);
    detach(bag);
    const a = (i / count) * Math.PI * 2;
    fitHeight(bag, parent, 0.32, 0.52);
    bag.traverse((obj) => {
      if (!obj.isMesh || !obj.material || !obj.material.color) return;
      obj.material.color.set(0xc4a36a);
      obj.material.roughness = 0.92;
      obj.material.metalness = 0;
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
    bag.position.x += Math.cos(a) * radius;
    bag.position.z += Math.sin(a) * radius;
    bag.rotation.y = a;
  }
}

function dressBuilding(group, kit) {
  hidePrimitives(group);
  const enemy = group.userData.owner === 'enemy';
  const hq = group.userData.kind === 'hq';
  const sx0 = frameOf(group).scale.x || 1;
  function dropBox(w, h, d, mat, x, z, footY) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w / sx0, h / sx0, d / sx0), mat);
    mesh.position.set(x / sx0, 0, z / sx0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    setFeetWorldY(mesh, group, footY);
    return mesh;
  }
  if (hq && enemy) {
    const concrete = concreteMaterial(0xb7b2a8);
    const red = new THREE.MeshStandardMaterial({
      color: 0xc42822,
      emissive: 0x9a1c16,
      emissiveIntensity: 0.28,
      roughness: 0.55,
      metalness: 0.02,
    });
    const gateMat = new THREE.MeshStandardMaterial({
      color: 0x8e1c1c,
      emissive: 0x6a1010,
      emissiveIntensity: 0.22,
      roughness: 0.62,
    });
    // Two-storey concrete block. Red is a roofline band, not a house roof.
    // Local −Z faces the road.
    dropBox(2.55, 0.12, 2.15, concreteMaterial(0xc4bfb6), 0, 0, 0.02);
    dropBox(2.05, 0.72, 1.7, concrete, 0, 0, 0.12);
    dropBox(2.12, 0.08, 1.78, red, 0, 0, 0.82);
    dropBox(1.62, 0.5, 1.28, concreteMaterial(0xc9c4bb), 0, 0, 0.88);
    dropBox(1.72, 0.08, 1.38, red, 0, 0, 1.36);
    dropBox(1.35, 0.14, 1.02, concreteMaterial(0xd4cfc6), 0, 0, 1.42);
    dropBox(0.52, 0.58, 0.1, gateMat, 0, -0.9, 0.16);
    const sx = sx0;
    if (kit.radar) {
      const dish = kit.radar.clone(true);
      detach(dish);
      ownMaterials(dish);
      fitHeight(dish, group, 0.55, 0.95);
      setFeetWorldY(dish, group, 1.52);
    }
    const wallSrc = kit.wall || kit.fort;
    if (wallSrc) {
      // Parent local −Z is the building forward (yawForFacing). The gap faces the road.
      // Short bricks, not long fins. A 0.7 slab's long axis points up the screen
      // on the sides of the ring and reads as a spiked fan. Overlapping bricks
      // keep a low curb. The missing arc is the road gate.
      const wallCount = 36;
      const radius = 1.62 / sx;
      const gate = 1.28;
      const wallMat = concreteMaterial(0xb7b3aa);
      const trimMat = new THREE.MeshStandardMaterial({
        color: 0xd01818,
        emissive: 0xff241c,
        emissiveIntensity: 0.08,
        roughness: 0.5,
        metalness: 0.02,
      });
      const wallH = 0.22 / sx;
      const trimH = 0.02 / sx;
      const brick = 0.3 / sx;
      const lip = 0.04 / sx;
      for (let i = 0; i < wallCount; i++) {
        const a = -Math.PI / 2 + (i / wallCount) * Math.PI * 2;
        const gap = Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2)));
        if (gap < gate) continue;
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(brick, wallH, 0.16 / sx),
          wallMat,
        );
        wall.position.set(Math.cos(a) * radius, wallH * 0.5, Math.sin(a) * radius);
        wall.rotation.y = a + Math.PI / 2;
        wall.castShadow = true;
        wall.receiveShadow = true;
        group.add(wall);
        const trim = new THREE.Mesh(
          new THREE.BoxGeometry(brick, trimH, lip),
          trimMat,
        );
        trim.position.set(
          Math.cos(a) * (radius + 0.06 / sx),
          wallH + trimH * 0.5,
          Math.sin(a) * (radius + 0.06 / sx),
        );
        trim.rotation.y = wall.rotation.y;
        trim.castShadow = true;
        trim.receiveShadow = true;
        group.add(trim);
      }
      for (const side of [-1, 1]) {
        const a = -Math.PI / 2 + side * gate;
        const post = new THREE.Mesh(
          new THREE.BoxGeometry(0.1 / sx, 0.22 / sx, 0.1 / sx),
          wallMat,
        );
        post.position.set(Math.cos(a) * radius, 0.11 / sx, Math.sin(a) * radius);
        post.castShadow = true;
        post.receiveShadow = true;
        group.add(post);
      }
      // Flag stands on the left jamb so the road opening stays empty.
      const flagA = -Math.PI / 2 - gate;
      const flagX = Math.cos(flagA) * radius;
      const flagZ = Math.sin(flagA) * radius;
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025 / sx, 0.025 / sx, 0.95 / sx, 6),
        concreteMaterial(0x3e3a34),
      );
      pole.position.set(flagX, 0.48 / sx, flagZ);
      pole.castShadow = true;
      group.add(pole);
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.72 / sx, 0.42 / sx),
        new THREE.MeshStandardMaterial({
          color: 0x8e1c1c,
          emissive: 0x4a1010,
          emissiveIntensity: 0.18,
          side: THREE.DoubleSide,
          roughness: 0.7,
        }),
      );
      cloth.position.set(flagX + 0.38 / sx, 0.68 / sx, flagZ);
      cloth.rotation.y = Math.PI - 0.4;
      cloth.castShadow = true;
      group.add(cloth);
    }
    if (kit.bags) ringBags(group, kit.bags, 1.2 / sx, 11);
    seatFlag(group, 1.62);
    return;
  }
  if (hq && !enemy) {
    // Pull the pad up-screen so the roof clears the bottom bar.
    group.position.z -= 0.95;
    const bodyMat = concreteMaterial(0x8e9684);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x2f8a48,
      emissive: 0x143c22,
      emissiveIntensity: 0.14,
      roughness: 0.76,
      metalness: 0,
    });
    dropBox(2.05, 0.1, 1.45, concreteMaterial(0xd7d2c8), 0, 0, 0.02);
    dropBox(1.4, 0.4, 0.98, bodyMat, 0, 0.02, 0.1);
    dropBox(1.58, 0.2, 1.12, roofMat, 0, 0, 0.48);
    if (kit.bags) ringBags(group, kit.bags, 0.98 / sx0, 10);
    if (kit.tank) {
      if (!kit.tankGeo) kit.tankGeo = bakeProp(kit.tank);
      if (kit.tankGeo) {
        const tank = new THREE.Mesh(shadeMesh(kit.tankGeo.clone(), 0x4e5a34), new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.82,
          metalness: 0.08,
          vertexColors: true,
        }));
        tank.castShadow = true;
        tank.receiveShadow = true;
        tank.frustumCulled = false;
        fitHeight(tank, group, 0.72, 1.9);
        group.updateWorldMatrix(true, true);
        const want = new THREE.Vector3(1.7, 0, 4.35);
        group.worldToLocal(want);
        tank.position.x = want.x;
        tank.position.z = want.z;
        reseatFeet(tank, group);
      }
    }
    seatFlag(group, 0.82);
    return;
  }
  if (!kit.bunker || !kit.roof) return;
  const body = kit.bunker.clone(true);
  detach(body);
  repaint(body, concreteMaterial(enemy ? 0x8a847c : 0x7f8a72), true);
  fitHeight(body, group, hq ? 0.85 : 0.68, hq ? 1.7 : 1.35);
  group.updateWorldMatrix(true, true);
  _box.setFromObject(body);
  const bodyTop = _box.max.y;
  const bodySpan = Math.max(_box.max.x - _box.min.x, _box.max.z - _box.min.z);
  const roof = kit.roof.clone(true);
  detach(roof);
  repaint(roof, concreteMaterial(enemy ? 0x8e2c26 : 0x2f8a48));
  fitHeight(roof, group, 0.42, bodySpan * 1.05);
  setFeetWorldY(roof, group, bodyTop - 0.04);
  const bagRadius = (bodySpan * 0.55 + 0.28) / (frameOf(group).scale.x || 1);
  if (kit.bags) ringBags(group, kit.bags, bagRadius, hq ? 9 : 7);
  let flagY = bodyTop + 0.16;
  if (!enemy && hq && kit.tank) {
    if (!kit.tankGeo) kit.tankGeo = bakeProp(kit.tank);
    if (kit.tankGeo) {
      const tank = new THREE.Mesh(shadeMesh(kit.tankGeo.clone(), 0x4e5a34), new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.82,
        metalness: 0.08,
        vertexColors: true,
      }));
      tank.castShadow = true;
      tank.receiveShadow = true;
      tank.frustumCulled = false;
      fitHeight(tank, group, 0.72, 1.9);
      group.updateWorldMatrix(true, true);
      const want = new THREE.Vector3(1.7, 0, 4.35);
      group.worldToLocal(want);
      tank.position.x = want.x;
      tank.position.z = want.z;
      reseatFeet(tank, group);
    }
  }
  seatFlag(group, flagY);
}

/** Pines and rocks along the left, right, and far edges. Not the meadow. */
function forestSpots(box) {
  const spots = [];
  const topZ = box.minZ - 0.95;
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const x = box.minX + 0.15 + t * (box.maxX - box.minX) * 0.62;
    spots.push({ x, z: topZ - (i % 2) * 0.45, s: 1.5 + (i % 3) * 0.14 });
  }
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const z = box.minZ + 0.15 + t * (box.maxZ - box.minZ) * 0.86;
    const x = box.minX - 1.25 + t * 2.15;
    if (Math.abs(z) < 0.55) continue;
    if (Math.hypot(x, z - 6.5) < 1.7) continue;
    if (Math.hypot(x + 4.9, z + 3.15) < 1.85) continue;
    spots.push({ x, z, s: 1.28 + (i % 3) * 0.12 });
  }
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const z = box.minZ + 0.4 + t * (box.maxZ - box.minZ) * 0.72;
    const x = box.minX - 0.55 + t * 1.7;
    if (Math.abs(z) < 0.55) continue;
    if (Math.abs(x) < 1.6) continue;
    if (Math.hypot(x + 4.9, z + 3.15) < 1.85) continue;
    spots.push({ x, z: z + 0.35, s: 1.12 + (i % 2) * 0.1 });
  }
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const z = box.minZ + 1.1 + t * (box.maxZ - box.minZ) * 0.48;
    const x = box.maxX - 1.15 - t * 0.4;
    if (Math.abs(z) < 0.55) continue;
    spots.push({ x, z, s: 1.32 + (i % 3) * 0.1 });
  }
  // Second ring, just outside the first, so each edge is a dark green band.
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const z = box.minZ + 0.35 + t * (box.maxZ - box.minZ) * 0.9;
    if (Math.abs(z) < 0.7) continue;
    const x = box.minX - 2.05 - (i % 2) * 0.55;
    if (Math.hypot(x, z - 6.5) < 1.9) continue;
    if (Math.hypot(x + 4.9, z + 3.15) < 1.85) continue;
    spots.push({ x, z: z + (i % 2) * 0.28, s: 1.52 + (i % 3) * 0.14 });
  }
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const z = box.minZ + 0.55 + t * (box.maxZ - box.minZ) * 0.86;
    if (Math.abs(z) < 0.7) continue;
    const x = box.maxX - 0.05 + (i % 2) * 0.45;
    if (Math.hypot(x, z - 6.5) < 1.9) continue;
    // Keep the open tan patch on the lower right free of trunks.
    if (Math.hypot(x + 4.9, z + 3.15) < 1.85) continue;
    if (Math.hypot(x - 3.2, z - 4.65) < 1.7) continue;
    spots.push({ x, z: z - (i % 2) * 0.32, s: 1.46 + (i % 3) * 0.16 });
  }
  return spots;
}

function dressIsland(group, kit) {
  if (group.userData.assetDress) return;
  group.userData.assetDress = true;
  const flora = group.userData.flora || [];
  for (let i = 0; i < flora.length; i++) flora[i].visible = false;
  const box = group.userData.playBox || { minX: -3.4, maxX: 3.4, minZ: -7.7, maxZ: 7.7 };
  const trees = forestSpots(box);
  const pineMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.86, metalness: 0 });
  const fenceMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.84, metalness: 0 });
  scatter(group, kit.pineA, trees.filter((_, i) => i % 2 === 0), pineMat, (i) => i * 0.7, true);
  scatter(group, kit.pineB, trees.filter((_, i) => i % 2 === 1), pineMat, (i) => i * 0.9, true);
  // Grey blob rocks between the pines read as ghosts. The edge trees stand alone.
  const fences = [
    { x: -7.2, z: 2.4, s: 1.15, y: 0.4 },
    { x: -7.4, z: -2.2, s: 1.15, y: 0.2 },
    { x: 7.3, z: 2.6, s: 1.15, y: Math.PI },
    { x: 7.1, z: -1.8, s: 1.15, y: Math.PI },
    { x: -3.6, z: 8.4, s: 1.05, y: Math.PI / 2 },
    { x: 3.4, z: -8.2, s: 1.05, y: Math.PI / 2 },
  ];
  scatter(group, kit.fence, fences.map((spot) => ({ x: spot.x, z: spot.z, s: spot.s, y: spot.y })), fenceMat, (i, spot) => spot.y || 0);
  const buildings = group.userData.buildings;
  if (!buildings) return;
  buildings.forEach((building) => dressBuilding(building, kit));
}

export function loadBattlefield(world, crowds) {
  const pending = (async () => {
    const entries = await Promise.all(Object.entries(FILES).map(async ([key, url]) => {
      try {
        const gltf = await loadOne(url);
        return [key, gltf];
      } catch (err) {
        console.warn('model failed', url, err);
        return [key, null];
      }
    }));
    const gltf = Object.fromEntries(entries);
    const required = ['soldier', 'rifle', 'tank', 'pineA', 'pineB', 'rockA', 'rockB', 'bags', 'fence', 'fort', 'tower', 'bunker', 'roof', 'wall'];
    for (let i = 0; i < required.length; i++) {
      if (!gltf[required[i]]) throw new Error(`model missing ${required[i]}`);
    }
    const soldier = buildSoldier(gltf.soldier.scene, gltf.rifle.scene);
    crowds.useSoldier(soldier);
    const kit = {
      tower: gltf.tower.scene,
      bunker: gltf.bunker.scene,
      roof: gltf.roof.scene,
      wall: gltf.wall.scene,
      fort: gltf.fort.scene,
      bags: gltf.bags.scene,
      tank: gltf.tank.scene,
      radar: gltf.radar ? gltf.radar.scene : null,
      pineA: paintPine(preparedGeometry(gltf.pineA.scene, 0x2a6a38, 0.4, 1)),
      pineB: paintPine(preparedGeometry(gltf.pineB.scene, 0x245e32, 0.4, 1)),
      rockA: preparedGeometry(gltf.rockA.scene, 0x6a6560),
      rockB: preparedGeometry(gltf.rockB.scene, 0x746e68),
      fence: preparedGeometry(gltf.fence.scene, 0x6a5340),
    };
    world.setDresser((group) => dressIsland(group, kit));
    return true;
  })();
  return pending;
}
