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
    // World units. 7.5 covered the headquarters. About 1.6 reads as a flash from the high camera.
    size: 1.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    // The bridge deck and the hangar were hiding the puff and the muzzle flash.
    depthTest: false,
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
    sprite.scale.set(0.7, 0.7, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const traceGreen = new THREE.Color(0xb6ff6a);
  const traceRed = new THREE.Color(0xffb15a);

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
      if (!enabled) {
        rankPuffs[0].visible = false;
        rankPuffs[1].visible = false;
      }
    },
    update(dt, state) {
      if (!enabled || !state) return;
      const squads = state.squads || [];
      let budget = 64;
      const tick = Math.floor((state.t || 0) * 8);
      for (let s = 0; s < squads.length && budget > 0; s++) {
        const q = squads[s];
        if (!q || q.count <= 0) continue;
        const jitter = ((s * 17) % 5) * 0.05;
        if (q.mode === 'march') {
          spawn(q.x + jitter, 0.16, q.z - jitter, dust, 0.8, 0, 0.45, 0);
          budget -= 1;
          if (budget > 0 && s % 2 === 0) {
            spawn(q.x - jitter, 0.22, q.z + 0.1, dust, 0.55, 0.2, 0.3, 0);
            budget -= 1;
          }
        } else if (q.mode === 'fight' || q.mode === 'siege') {
          spawn(q.x, 0.45, q.z, smoke, 1.2, s % 2 ? 0.6 : -0.6, 1.1, 0);
          budget -= 1;
          if (budget > 0) {
            spawn(q.x + 0.12, 0.62, q.z, q.mode === 'siege' ? fire : flash, 0.4, 0, 0.4, 0);
            budget -= 1;
          }
          const shot = q.owner === 'player' ? -2.8 : 2.8;
          if (budget > 0) {
            spawn(q.x, 0.7, q.z, flash, 0.22, 0, 0.15, shot);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(q.x + 0.08, 0.58, q.z, flash, 0.18, 0, 0.1, shot * 0.75);
            budget -= 1;
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
          const halfW = Math.min(0.18, dist * 0.08);
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
            rankPuffs[0].position.set(ax, 0.62, az);
            rankPuffs[1].position.set(bx, 0.62, bz);
            rankPuffs[0].visible = enabled;
            rankPuffs[1].visible = enabled;
          }
          const mx = (qa.x + qb.x) * 0.5;
          const mz = (qa.z + qb.z) * 0.5;
          if (budget > 0) {
            spawn(mx, 0.28, mz, smoke, 0.7, 0, 0.55, 0);
            budget -= 1;
          }
          // Stays up through the clash frame. Sits on the midpoint at soldier height.
          if (budget > 0) {
            spawn(mx, 0.55, mz, puff, 1.2, 0, 0.15, 0);
            budget -= 1;
          }
          // A flash and a puff on each squad. The bridge rank is one of these ends.
          if (budget > 0) {
            spawn(qa.x, 0.55, qa.z, puff, 1.2, 0, 0.12, 0);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(qb.x, 0.55, qb.z, puff, 1.2, 0, 0.12, 0);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(qa.x, 0.62, qa.z, flash, 0.9, 0, 0.08, 0);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(qb.x, 0.62, qb.z, flash, 0.9, 0, 0.08, 0);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(qa.x, 0.5, qa.z, flash, 0.16, (dx / dist) * 3.2, 0.25, (dz / dist) * 3.2);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(qb.x, 0.5, qb.z, flash, 0.16, (-dx / dist) * 3.2, 0.25, (-dz / dist) * 3.2);
            budget -= 1;
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
