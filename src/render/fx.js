import * as THREE from 'three';
import { PALETTE } from './palette.js';

const POOL = 360;

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
    size: 0.72,
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
      let budget = 12;
      const tick = Math.floor((state.t || 0) * 8);
      for (let s = 0; s < squads.length && budget > 0; s++) {
        const q = squads[s];
        if (!q || q.count <= 0) continue;
        const jitter = ((s * 17) % 5) * 0.04;
        if (q.mode === 'march') {
          spawn(q.x + jitter, 0.14, q.z - jitter, dust, 0.6, 0, 0.2, 0);
          budget -= 1;
        } else if (q.mode === 'fight' || q.mode === 'siege') {
          spawn(q.x, 0.45, q.z, smoke, 0.9, s % 2 ? 0.25 : -0.25, 0.7, 0);
          budget -= 1;
          if (budget > 0) {
            spawn(q.x + 0.15, 0.55, q.z, flash, 0.28, 0, 0.1, 0);
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
