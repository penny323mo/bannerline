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
export const BADGE_LIFT = { hq: 2.85, barracks: 1.55 };

/** World y of a marching squad's count pill. */
export const SQUAD_LIFT = 1.05;

/** Siege badges step sideways so they don't sit on the building door. */
export function squadMarkX(x, owner, mode) {
  if (mode !== 'siege') return x;
  return x + (owner === 'player' ? 0.85 : -0.85);
}

/**
 * World y of the roof and the flag. Buildings sit 0.06 above the ground,
 * so these are the mesh heights plus that rise.
 */
export const ROOF_Y = { hq: 2.05, barracks: 0.78 };
export const FLAG_Y = { hq: 2.55, barracks: 1.2 };

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
 * Choose a building or a friendly squad.
 * Screen hits (pill, roof, flag) win over the ground disc.
 * A squad's screen sample is its count pill. The lift point sits on the tower
 * foot, so it is not a hit; the 44px pill disc still covers the badge.
 * Steal the pick only when the pointer is nearer that pill than any building
 * screen point, so the roof, flag, and foot stay on the building.
 * `pointerX` / `pointerY` are CSS pixels from the canvas top-left.
 */
export function pickBuilding(buildings, camera, width, height, pointerX, pointerY, ground) {
  let best = null;
  let bestScreen = Infinity;
  let groundBest = null;
  let bestGround = PICK_RADIUS;
  let steal = null;
  let stealPill = Infinity;
  const canProject = width >= 1 && height >= 1 && camera;

  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    const squad = b.kind === 'squad';
    const kind = b.kind === 'hq' ? 'hq' : 'barracks';
    let localBest = Infinity;
    let pillDist = Infinity;

    if (canProject) {
      const lift = squad ? SQUAD_LIFT : BADGE_LIFT[kind];
      if (projectToCss(b.x, lift, b.z, camera, width, height, css)) {
        const onPill = Math.hypot(pointerX - css.x, pointerY - (css.y - PILL_SHIFT_PX));
        pillDist = onPill;
        if (onPill < localBest) localBest = onPill;
        // Squad lift overlaps the mesh under the flag. Buildings still use it.
        if (!squad) {
          const onAnchor = Math.hypot(pointerX - css.x, pointerY - css.y);
          if (onAnchor < localBest) localBest = onAnchor;
        }
      }
      if (!squad && projectToCss(b.x, ROOF_Y[kind], b.z, camera, width, height, css)) {
        const d = Math.hypot(pointerX - css.x, pointerY - css.y);
        if (d < localBest) localBest = d;
      }
      if (!squad && projectToCss(b.x, FLAG_Y[kind], b.z, camera, width, height, css)) {
        const d = Math.hypot(pointerX - css.x, pointerY - css.y);
        if (d < localBest) localBest = d;
      }
      if (nearer(bestScreen, localBest)) {
        bestScreen = localBest;
        best = b;
      }
      if (squad && pillDist <= SCREEN_HIT_PX && pillDist < stealPill) {
        steal = b;
        stealPill = pillDist;
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

  if (best && best.kind !== 'squad' && steal && stealPill < bestScreen) {
    best = steal;
  }
  return best || groundBest;
}
