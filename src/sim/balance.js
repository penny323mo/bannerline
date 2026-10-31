/** Tunable match numbers. Pure data — no rendering. */

export const RULES = {
  clashEvery: 0.3,
  clashLoss: 4,
  captureSeconds: 0.7,
  marchSpeed: 4.8,
  contactRadius: 0.92,
  arriveRadius: 0.7,
  enemySendMin: 16,
  enemySendPeriod: 10,
  substep: 0.05,
};

/**
 * First moment each enemy building may march out.
 * The player barracks first reads 滿 at (54−30)/2.25 ≈ 10.7s. The enemy
 * barracks waits until 16s so a rush a few seconds after 滿 is not met
 * on the road by that wave.
 */
export const FIRST_SEND = {
  'enemy-bar': 16,
  'enemy-hq': 22,
};

export function startingBuildings() {
  return [
    {
      id: 'player-hq',
      kind: 'hq',
      owner: 'player',
      node: 'player-hq',
      count: 12,
      cap: 28,
      regen: 0,
    },
    {
      id: 'player-bar',
      kind: 'barracks',
      owner: 'player',
      node: 'player-bar',
      count: 30,
      cap: 54,
      regen: 2.25,
    },
    {
      id: 'enemy-bar',
      kind: 'barracks',
      owner: 'enemy',
      node: 'enemy-bar',
      count: 18,
      cap: 48,
      regen: 1.7,
    },
    {
      id: 'enemy-hq',
      kind: 'hq',
      owner: 'enemy',
      node: 'enemy-hq',
      count: 44,
      cap: 52,
      regen: 0,
    },
  ];
}
