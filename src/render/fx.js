import * as THREE from 'three';
import { PALETTE } from './palette.js';

const POOL = 640;

/**
 * Pooled point sprites. March dust, clash smoke, and a short muzzle flash.
 * One Points draw. Unused slots sit under the ground. Budget stays under 1k.
 */
export function createFx(scene) {
  const positions = new Float32Array(POOL * 3);
  const colors = new Float32Array(POOL * 3);
  const base = new Float32Array(POOL * 3);
  positions.fill(0);
  for (let i = 0; i < POOL; i++) positions[i * 3 + 1] = -8;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    // World units. 7.5 covered the headquarters. About 0.3 is a few pixels at this camera.
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    // Parked slots sit at y −8 with colour 0. Depth test keeps that stack under the ground.
    depthTest: true,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = 4;
  scene.add(points);

  const MAX_LINES = 24;
  const linePos = new Float32Array(MAX_LINES * 18);
  const lineCol = new Float32Array(MAX_LINES * 18);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  lineGeo.setAttribute('color', new THREE.BufferAttribute(lineCol, 3));
  lineGeo.setDrawRange(0, 0);
  // A flat ribbon. GL lines are a fraction of a CSS pixel at this camera.
  const tracers = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  }));
  tracers.frustumCulled = false;
  tracers.renderOrder = 5;
  scene.add(tracers);

  // A soft disc on each clashing rank. Point sprites were too faint on the deck.
  const puffCanvas = document.createElement('canvas');
  puffCanvas.width = 64;
  puffCanvas.height = 64;
  const puffCtx = puffCanvas.getContext('2d');
  const puffGrad = puffCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
  puffGrad.addColorStop(0, 'rgba(244, 240, 230, 0.95)');
  puffGrad.addColorStop(1, 'rgba(244, 240, 230, 0)');
  puffCtx.fillStyle = puffGrad;
  puffCtx.fillRect(0, 0, 64, 64);
  const puffMat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(puffCanvas),
    transparent: true,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const rankPuffs = [0, 1].map(() => {
    const sprite = new THREE.Sprite(puffMat);
    sprite.scale.set(0.16, 0.16, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const streakMat = new THREE.SpriteMaterial({
    color: 0xff7a32,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const streaks = [0, 1].map(() => {
    const sprite = new THREE.Sprite(streakMat);
    sprite.scale.set(0.22, 0.018, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const muzzleMat = new THREE.SpriteMaterial({
    color: 0xff9a3c,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const muzzles = [0, 1, 2, 3, 4].map(() => {
    const sprite = new THREE.Sprite(muzzleMat);
    sprite.scale.set(0.16, 0.08, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const dustMat = new THREE.SpriteMaterial({
    color: 0xe2c89a,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const dustPuffs = [0, 1, 2, 3].map(() => {
    const sprite = new THREE.Sprite(dustMat);
    sprite.scale.set(0.22, 0.12, 1);
    sprite.visible = false;
    sprite.renderOrder = 5;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const smokeCanvas = document.createElement('canvas');
  smokeCanvas.width = 64;
  smokeCanvas.height = 64;
  const smokeCtx = smokeCanvas.getContext('2d');
  const smokeGrad = smokeCtx.createRadialGradient(32, 32, 4, 32, 32, 30);
  smokeGrad.addColorStop(0, 'rgba(70, 72, 68, 0.92)');
  smokeGrad.addColorStop(0.4, 'rgba(70, 72, 68, 0.62)');
  smokeGrad.addColorStop(1, 'rgba(70, 72, 68, 0)');
  smokeCtx.fillStyle = smokeGrad;
  smokeCtx.fillRect(0, 0, 64, 64);
  const driftMat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(smokeCanvas),
    transparent: true,
    depthWrite: false,
    depthTest: false,
    opacity: 0.85,
    toneMapped: false,
  });
  const plumeCanvas = document.createElement('canvas');
  plumeCanvas.width = 64;
  plumeCanvas.height = 64;
  const plumeCtx = plumeCanvas.getContext('2d');
  const plumeGrad = plumeCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
  plumeGrad.addColorStop(0, 'rgba(186, 188, 180, 0.96)');
  plumeGrad.addColorStop(0.45, 'rgba(140, 142, 134, 0.78)');
  plumeGrad.addColorStop(1, 'rgba(120, 122, 114, 0)');
  plumeCtx.fillStyle = plumeGrad;
  plumeCtx.fillRect(0, 0, 64, 64);
  const plumeMat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(plumeCanvas),
    transparent: true,
    depthWrite: false,
    depthTest: false,
    opacity: 0.94,
    toneMapped: false,
  });
  const driftSpots = [
    [0.6, 1.6, 6.0],
    [1.5, 2.5, -4.8],
    // Enemy tower. The old (1.25, −5.15) spot projected past x=390.
    [-0.2, 3.25, -6.4],
    [6.6, 2.3, 2.4],
    [-6.8, 2.5, -2.2],
  ];
  const driftSize = [
    [0.85, 1.05],
    [0.7, 0.9],
    [2.15, 2.9],
    [0.7, 0.85],
    [0.7, 0.85],
  ];
  const drifts = driftSpots.map((spot, i) => {
    const sprite = new THREE.Sprite(i === 2 ? plumeMat : driftMat);
    sprite.scale.set(driftSize[i][0], driftSize[i][1], 1);
    sprite.position.set(spot[0], spot[1], spot[2]);
    sprite.renderOrder = 3;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const traceGreen = new THREE.Color(0xff9a3c);
  const traceRed = new THREE.Color(0xff6a28);

  const life = new Float32Array(POOL);
  const maxLife = new Float32Array(POOL);
  const vel = new Float32Array(POOL * 3);
  let cursor = 0;
  let enabled = true;
  const dust = new THREE.Color(PALETTE.sand);
  const smoke = new THREE.Color(0xc4beb4);
  const puff = new THREE.Color(0xf4f0e6);
  const flash = new THREE.Color(0xffe08a);
  const fire = new THREE.Color(0xff7a32);

  function spawn(x, y, z, color, ttl, vx, vy, vz) {
    const i = cursor;
    cursor = (cursor + 1) % POOL;
    life[i] = ttl;
    maxLife[i] = ttl;
    const o = i * 3;
    positions[o] = x;
    positions[o + 1] = y;
    positions[o + 2] = z;
    vel[o] = vx;
    vel[o + 1] = vy;
    vel[o + 2] = vz;
    base[o] = color.r;
    base[o + 1] = color.g;
    base[o + 2] = color.b;
    colors[o] = color.r;
    colors[o + 1] = color.g;
    colors[o + 2] = color.b;
  }

  return {
    setEnabled(on) {
      enabled = !!on;
      points.visible = enabled;
      tracers.visible = enabled;
      for (let i = 0; i < drifts.length; i++) drifts[i].visible = enabled;
      if (!enabled) {
        rankPuffs[0].visible = false;
        rankPuffs[1].visible = false;
        streaks[0].visible = false;
        streaks[1].visible = false;
        for (let i = 0; i < muzzles.length; i++) muzzles[i].visible = false;
        for (let i = 0; i < dustPuffs.length; i++) dustPuffs[i].visible = false;
      }
    },
    update(dt, state) {
      if (!enabled || !state) return;
      const squads = state.squads || [];
      let budget = 64;
      const tick = Math.floor((state.t || 0) * 8);
      let playerFighting = false;
      let muzzleIndex = 0;
      let dustIndex = 0;
      for (let i = 0; i < muzzles.length; i++) muzzles[i].visible = false;
      for (let i = 0; i < dustPuffs.length; i++) dustPuffs[i].visible = false;
      for (let s = 0; s < squads.length && budget > 0; s++) {
        const q = squads[s];
        if (!q || q.count <= 0) continue;
        const jitter = ((s * 17) % 5) * 0.05;
        if (q.mode === 'march') {
          // Planks run about z −1.1 to 1.1. Dust on that span reads as a pale card.
          if (Math.abs(q.z) >= 1.2) {
            spawn(q.x + jitter, 0.16, q.z - jitter, dust, 0.8, 0, 0.45, 0);
            budget -= 1;
            if (budget > 0 && s % 2 === 0) {
              spawn(q.x - jitter, 0.22, q.z + 0.1, dust, 0.55, 0.2, 0.3, 0);
              budget -= 1;
            }
          }
        } else if (q.mode === 'fight' || q.mode === 'siege') {
          if (q.owner === 'player') playerFighting = true;
          const spot = q.owner === 'enemy' && q.z > -3.6 ? { x: 0.4, z: -4.4 } : { x: q.x, z: q.z };
          const side = ((s + tick) % 3) - 1;
          // Player local forward is −Z. Enemy ranks face +Z, back toward their bank.
          const facing = q.owner === 'player' ? -1 : 1;
          if (muzzleIndex < muzzles.length - 1) {
            const flashSprite = muzzles[muzzleIndex];
            muzzleIndex += 1;
            flashSprite.position.set(spot.x + side * 0.1, 0.42, spot.z + facing * 0.34);
            flashSprite.scale.set(0.16, 0.08, 1);
            flashSprite.visible = enabled;
          }
          if (dustIndex < dustPuffs.length) {
            const puffSprite = dustPuffs[dustIndex];
            dustIndex += 1;
            const onDeck = q.owner === 'player' && Math.abs(q.z) < 1.15;
            const dustX = onDeck ? q.x : spot.x;
            const dustZ = onDeck ? 1.35 : spot.z;
            puffSprite.position.set(dustX + side * 0.1, 0.08, dustZ);
            puffSprite.scale.set(0.22, 0.12, 1);
            puffSprite.visible = enabled;
          }
          if (q.mode === 'siege' && budget > 0) {
            spawn(q.x - 0.2, 0.85, q.z + 0.1, fire, 0.55, 0.35, 1.1, -0.2);
            budget -= 1;
          }
          if (q.mode === 'siege' && budget > 0) {
            spawn(q.x + 0.15, 1.15, q.z, smoke, 0.9, -0.2, 0.8, 0.15);
            budget -= 1;
          }
          if (q.mode === 'siege') {
            const boom = (s * 3 + tick) % 6;
            for (let k = 0; k < 4 && budget > 0; k++) {
              const ang = boom + k * 1.5;
              const cx = Math.cos(ang);
              const sz = Math.sin(ang);
              spawn(q.x + cx * 0.35, 0.65 + (k % 3) * 0.28, q.z + sz * 0.35, k % 2 ? fire : flash, 0.5, cx * 1.5, 1.7, sz * 1.5);
              budget -= 1;
            }
          }
        }
      }
      if (playerFighting) {
        const barrel = muzzles[muzzles.length - 1];
        // Baked tank sits near (1.7, 0, 4.35) and the gun points −Z, toward the bridge.
        barrel.position.set(1.7, 0.58, 3.05);
        barrel.scale.set(0.24, 0.12, 1);
        barrel.visible = enabled;
      }
      const nodes = state.nodes;
      const buildings = state.buildings;
      if (nodes && buildings) {
        for (let i = 0; i < buildings.length && budget > 0; i++) {
          const b = buildings[i];
          if (b.kind !== 'hq' && b.kind !== 'barracks') continue;
          let hot = false;
          for (let s = 0; s < squads.length; s++) {
            const q = squads[s];
            if (q.mode === 'siege' && q.targetId === b.id && q.owner !== b.owner && q.count > 0) hot = true;
          }
          const p = nodes[b.node];
          if (!p) continue;
          if (hot && budget > 0) {
            spawn(p.x, 1.35, p.z, fire, 0.5, (i % 2 ? 0.4 : -0.4), 1.1, 0.1);
            budget -= 1;
          }
          if (hot && budget > 0) {
            spawn(p.x + 0.2, 1.7, p.z - 0.1, smoke, 0.8, 0.15, 0.7, 0);
            budget -= 1;
          }
          if (b.capture > 0.05 && budget > 0) {
            spawn(p.x, 0.9, p.z, flash, 0.35, 0, 1.4, 0);
            budget -= 1;
          }
          if (b.capture > 0.05 && budget > 0) {
            spawn(p.x + 0.25, 1.15, p.z - 0.15, flash, 0.4, 0.8, 1.6, -0.4);
            budget -= 1;
          }
          if (b.capture > 0.05 && budget > 0) {
            spawn(p.x - 0.2, 1.05, p.z + 0.1, fire, 0.35, -0.7, 1.5, 0.35);
            budget -= 1;
          }
        }
      }
      let lines = 0;
      rankPuffs[0].visible = false;
      rankPuffs[1].visible = false;
      streaks[0].visible = false;
      streaks[1].visible = false;
      const driftT = (typeof performance !== 'undefined' ? performance.now() : 0) * 0.001;
      for (let i = 0; i < drifts.length; i++) {
        const spot = driftSpots[i];
        drifts[i].position.y = spot[1] + Math.sin(driftT * 0.35 + i) * 0.18;
        drifts[i].visible = enabled;
      }
      for (let a = 0; a < squads.length; a++) {
        const qa = squads[a];
        if (!qa || qa.count <= 0) continue;
        for (let b = a + 1; b < squads.length; b++) {
          const qb = squads[b];
          if (!qb || qb.count <= 0 || qa.owner === qb.owner) continue;
          const dx = qb.x - qa.x;
          const dz = qb.z - qa.z;
          const dist = Math.hypot(dx, dz);
          if (dist > 4.4 || dist < 0.12 || lines >= MAX_LINES) continue;
          const halfW = Math.min(0.04, dist * 0.015);
          const inv = 1 / dist;
          const hx = -dz * inv * halfW;
          const hz = dx * inv * halfW;
          // Soldier height, so the line lies on the rank instead of stopping above it.
          const y = 0.5;
          const pad = 0.28;
          const ax = qa.x - dx * inv * pad;
          const az = qa.z - dz * inv * pad;
          const bx = qb.x + dx * inv * pad;
          const bz = qb.z + dz * inv * pad;
          const o = lines * 18;
          const xyz = [
            ax - hx, y, az - hz,
            ax + hx, y, az + hz,
            bx - hx, y, bz - hz,
            ax + hx, y, az + hz,
            bx + hx, y, bz + hz,
            bx - hx, y, bz - hz,
          ];
          for (let k = 0; k < 18; k++) linePos[o + k] = xyz[k];
          const from = qa.owner === 'player' ? traceGreen : traceRed;
          const to = qb.owner === 'player' ? traceGreen : traceRed;
          for (let v = 0; v < 6; v++) {
            const c = v === 2 || v === 4 || v === 5 ? to : from;
            const co = o + v * 3;
            lineCol[co] = c.r;
            lineCol[co + 1] = c.g;
            lineCol[co + 2] = c.b;
          }
          lines += 1;
          if (lines === 1) {
            // Cream rank discs sat on the planks. The ribbon is the tracer.
            streaks[0].position.set(ax, 0.48, az);
            streaks[1].position.set(bx, 0.48, bz);
            streaks[0].visible = enabled;
            streaks[1].visible = enabled;
          }
        }
      }
      lineGeo.setDrawRange(0, lines * 6);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
      tracers.visible = enabled && lines > 0;
      const step = Math.min(0.05, dt || 0.016);
      for (let i = 0; i < POOL; i++) {
        if (life[i] <= 0) continue;
        life[i] -= step;
        const o = i * 3;
        if (life[i] <= 0) {
          positions[o + 1] = -8;
          life[i] = 0;
          continue;
        }
        positions[o] += vel[o] * step;
        positions[o + 1] += vel[o + 1] * step;
        positions[o + 2] += vel[o + 2] * step;
        const fade = life[i] / maxLife[i];
        colors[o] = base[o] * fade;
        colors[o + 1] = base[o + 1] * fade;
        colors[o + 2] = base[o + 2] * fade;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
    },
  };
}
