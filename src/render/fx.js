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
    // World units. 7.5 covered the enemy headquarters at 390px; about 1 stays on the building.
    size: 1,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = 4;
  scene.add(points);

  const life = new Float32Array(POOL);
  const maxLife = new Float32Array(POOL);
  const vel = new Float32Array(POOL * 3);
  let cursor = 0;
  let enabled = true;
  const dust = new THREE.Color(PALETTE.sand);
  const smoke = new THREE.Color(0xc4beb4);
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
    },
    update(dt, state) {
      if (!enabled || !state) return;
      const squads = state.squads || [];
      let budget = 36;
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
          if (budget > 0) {
            spawn(q.x, 0.7, q.z - 0.35, flash, 0.22, 0, 0.15, -3.2);
            budget -= 1;
          }
          if (budget > 0) {
            spawn(q.x + 0.08, 0.58, q.z - 0.7, flash, 0.18, 0, 0.1, -2.4);
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
        }
      }
      const nodes = state.nodes;
      const buildings = state.buildings;
      if (nodes && buildings && tick % 2 === 0) {
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
        }
      }
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
