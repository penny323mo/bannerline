import { ZONES } from './mapdata.js';

const zones = ZONES.map((z) => ({
  buildingId: z.buildingId,
  zMin: z.z - z.rz,
  zMax: z.z + z.rz,
  xMin: z.x - z.rx,
  xMax: z.x + z.rx,
})).sort((a, b) => b.zMax - a.zMax);

const segmentBuffer = [];

/** Stable zone list. The island slabs do not move, so this array is reused. */
export function sortedZones() {
  return zones;
}

/**
 * One glow segment wherever two neighbouring slabs have different owners.
 * plusOwner holds the +z side (player end of the island at the start).
 * `out` is cleared and refilled. The default buffer is reused every call.
 */
export function frontierSegments(ownerById, out = segmentBuffer) {
  out.length = 0;
  for (let i = 0; i < zones.length - 1; i++) {
    const plus = zones[i];
    const minus = zones[i + 1];
    const plusOwner = ownerById[plus.buildingId];
    const minusOwner = ownerById[minus.buildingId];
    if (!plusOwner || !minusOwner || plusOwner === minusOwner) continue;
    out.push({
      z: (plus.zMin + minus.zMax) / 2,
      x0: Math.max(plus.xMin, minus.xMin),
      x1: Math.min(plus.xMax, minus.xMax),
      plusOwner,
      minusOwner,
    });
  }
  return out;
}
