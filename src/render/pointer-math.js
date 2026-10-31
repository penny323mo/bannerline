import * as THREE from 'three';

/** Canvas-local pointer → NDC. Top-left of the rect is (−1, +1). */
export function clientToNdc(clientX, clientY, rect) {
  return {
    x: ((clientX - rect.left) / rect.width) * 2 - 1,
    y: -((clientY - rect.top) / rect.height) * 2 + 1,
  };
}

/** Ground disc on y=0, in world units. The mesh foot still uses this. */
export const PICK_RADIUS = 1.42;

/** Screen hit around a badge, its count pill, the roof, and the flag. */
export const SCREEN_HIT_PX = 44;

/**
 * The count pill is shifted up from the badge anchor by translate(-50%, -115%).
 * 32px is the middle of that card, so a 44px disc covers the white number.
 */
export const PILL_SHIFT_PX = 32;

/** World y of the HTML badge anchor. Shared with the badge layer. */
export const BADGE_LIFT = { hq: 2.15, barracks: 1.7 };

/**
 * World y of the roof and the flag. Buildings sit 0.06 above the ground,
 * so these are the mesh heights plus that rise.
 */
export const ROOF_Y = { hq: 1.4, barracks: 0.76 };
export const FLAG_Y = { hq: 1.98, barracks: 1.28 };

const projected = new THREE.Vector3();
const css = { x: 0, y: 0 };

/** Project a world point to CSS pixels inside a canvas of size width×height. */
export function projectToCss(x, y, z, camera, width, height, out) {
  projected.set(x, y, z);
  projected.project(camera);
  if (projected.z < -1 || projected.z > 1) return false;
  out.x = (projected.x * 0.5 + 0.5) * width;
  out.y = (-projected.y * 0.5 + 0.5) * height;
  return true;
}

function nearer(bestD, d) {
  return d <= SCREEN_HIT_PX && d < bestD;
}

/**
 * Choose a building from the ground disc or from screen points on the pill,
 * the roof, and the flag. Screen hits win, so a count pill above the disc
 * still selects. `pointerX` / `pointerY` are CSS pixels from the canvas top-left.
 */
export function pickBuilding(buildings, camera, width, height, pointerX, pointerY, ground) {
  let best = null;
  let bestScreen = Infinity;
  let groundBest = null;
  let bestGround = PICK_RADIUS;
  const canProject = width >= 1 && height >= 1 && camera;

  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    const kind = b.kind === 'hq' ? 'hq' : 'barracks';
    if (canProject) {
      const lift = BADGE_LIFT[kind];
      if (projectToCss(b.x, lift, b.z, camera, width, height, css)) {
        const onAnchor = Math.hypot(pointerX - css.x, pointerY - css.y);
        const onPill = Math.hypot(pointerX - css.x, pointerY - (css.y - PILL_SHIFT_PX));
        const d = onAnchor < onPill ? onAnchor : onPill;
        if (nearer(bestScreen, d)) {
          bestScreen = d;
          best = b;
        }
      }
      if (projectToCss(b.x, ROOF_Y[kind], b.z, camera, width, height, css)) {
        const d = Math.hypot(pointerX - css.x, pointerY - css.y);
        if (nearer(bestScreen, d)) {
          bestScreen = d;
          best = b;
        }
      }
      if (projectToCss(b.x, FLAG_Y[kind], b.z, camera, width, height, css)) {
        const d = Math.hypot(pointerX - css.x, pointerY - css.y);
        if (nearer(bestScreen, d)) {
          bestScreen = d;
          best = b;
        }
      }
    }
    if (ground) {
      const d = Math.hypot(b.x - ground.x, b.z - ground.z);
      if (d < bestGround) {
        bestGround = d;
        groundBest = b;
      }
    }
  }
  return best || groundBest;
}
