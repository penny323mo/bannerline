import { ZONES } from './mapdata.js';

export function sortedZones() {
  return ZONES.map((z) => ({
    buildingId: z.buildingId,
    zMin: z.z - z.rz,
    zMax: z.z + z.rz,
    xMin: z.x - z.rx,
    xMax: z.x + z.rx,
  })).sort((a, b) => b.zMax - a.zMax);
}

/**
 * One glow segment wherever two neighbouring slabs have different owners.
 * plusOwner holds the +z side (player end of the island at the start).
 */
export function frontierSegments(ownerById) {
  const zones = sortedZones();
  const out = [];
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
