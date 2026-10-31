export const PALETTE = {
  sky: 0xb7e6f8,
  water: 0x74c8e8,
  sand: 0xf3d7ae,
  meadow: 0xd7f0b4,
  road: 0xf0d2a2,
  roadEdge: 0xe4bc86,
  trunk: 0xe8c79a,
  leaf: 0xfffaf2,
  leafMint: 0xe5f6d4,
  rock: 0xf4f0e7,
  stream: 0x67c0e4,
  bridge: 0xf7e3c0,
  ink: 0x2c4038,
  foam: 0xfff8ee,
  player: {
    main: 0x3dce8b,
    deep: 0x149a62,
    flag: 0x8dffc8,
    slab: 0xb5eb9a,
  },
  enemy: {
    main: 0xff6b58,
    deep: 0xd9443c,
    flag: 0xffb2a6,
    slab: 0xf7b3a2,
  },
};

export function ownerPaint(owner) {
  return owner === 'player' ? PALETTE.player : PALETTE.enemy;
}
