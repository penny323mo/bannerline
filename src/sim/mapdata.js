/**
 * World frame: y up, player home at +z (near the camera), enemy at −z (top of the portrait).
 * Screen-right from the fixed camera is +x. Node ids are the path graph.
 */

export const NODES = {
  'player-hq': { x: 0, z: 6.55 },
  'player-bar': { x: 1.72, z: 3.05 },
  'player-road': { x: 0, z: 3.05 },
  mid: { x: 0, z: 0 },
  'enemy-road': { x: 0, z: -3.05 },
  'enemy-bar': { x: -1.72, z: -3.05 },
  'enemy-hq': { x: 0, z: -6.55 },
};

export const GRAPH = {
  'player-hq': ['player-road'],
  'player-bar': ['player-road'],
  'player-road': ['player-hq', 'player-bar', 'mid'],
  mid: ['player-road', 'enemy-road'],
  'enemy-road': ['mid', 'enemy-bar', 'enemy-hq'],
  'enemy-bar': ['enemy-road'],
  'enemy-hq': ['enemy-road'],
};

/** Soft territory slabs. rx/rz are half-extents on x/z. */
export const ZONES = [
  { buildingId: 'player-hq', x: 0, z: 5.75, rx: 3.15, rz: 1.95 },
  { buildingId: 'player-bar', x: 0.12, z: 2.25, rx: 3.25, rz: 1.6 },
  { buildingId: 'enemy-bar', x: -0.12, z: -2.25, rx: 3.25, rz: 1.6 },
  { buildingId: 'enemy-hq', x: 0, z: -5.75, rx: 3.15, rz: 1.95 },
];

/** Road polyline the eye follows (not every graph node). */
export const ROAD = [
  NODES['player-hq'],
  NODES['player-road'],
  NODES.mid,
  NODES['enemy-road'],
  NODES['enemy-hq'],
];
