import * as THREE from 'three';
import { rotateXZ, yawForFacing } from '../sim/facing.js';
import { PALETTE } from './palette.js';
import { SOLDIER_SCALE, drawAnchor, drawnCount, formationWorld } from './crowds.js';

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
    // World units. 7.5 covered the headquarters. About 0.3 is a few pixels at this camera.
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    // Parked slots sit at y −8 with colour 0. Depth test keeps that stack under the ground.
    depthTest: true,
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
    blending: THREE.AdditiveBlending,
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
    sprite.scale.set(0.16, 0.16, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  function radialMap(stops) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
    for (let i = 0; i < stops.length; i++) grad.addColorStop(stops[i][0], stops[i][1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }
  const flashMap = radialMap([
    [0, 'rgba(255, 252, 240, 1)'],
    [0.06, 'rgba(255, 248, 210, 0.95)'],
    [0.16, 'rgba(255, 210, 90, 0.35)'],
    [0.36, 'rgba(255, 150, 40, 0)'],
    [1, 'rgba(255, 140, 40, 0)'],
  ]);
  const dustMap = radialMap([
    [0, 'rgba(214, 198, 168, 0.55)'],
    [0.45, 'rgba(186, 170, 142, 0.22)'],
    [1, 'rgba(160, 148, 124, 0)'],
  ]);
  const streakMat = new THREE.SpriteMaterial({
    map: flashMap,
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const streaks = [0, 1].map(() => {
    const sprite = new THREE.Sprite(streakMat);
    sprite.scale.set(0.2, 0.2, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const muzzleMat = new THREE.SpriteMaterial({
    map: flashMap,
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const rankMap = radialMap([
    [0, 'rgba(255, 252, 230, 1)'],
    [0.34, 'rgba(255, 236, 150, 1)'],
    [0.62, 'rgba(255, 190, 60, 0.9)'],
    [1, 'rgba(255, 140, 30, 0)'],
  ]);
  const rankMat = new THREE.SpriteMaterial({
    map: rankMap,
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const muzzles = [0, 1, 2, 3, 4].map(() => {
    const sprite = new THREE.Sprite(muzzleMat);
    sprite.scale.set(0.16, 0.16, 1);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const dustMat = new THREE.SpriteMaterial({
    map: dustMap,
    color: 0xffffff,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const dustPuffs = [0, 1, 2, 3].map(() => {
    const sprite = new THREE.Sprite(dustMat);
    sprite.scale.set(0.22, 0.12, 1);
    sprite.visible = false;
    sprite.renderOrder = 5;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const plumeCanvas = document.createElement('canvas');
  plumeCanvas.width = 64;
  plumeCanvas.height = 64;
  const plumeCtx = plumeCanvas.getContext('2d');
  const plumeGrad = plumeCtx.createRadialGradient(32, 30, 4, 32, 30, 31);
  plumeGrad.addColorStop(0, 'rgba(90, 92, 86, 1)');
  plumeGrad.addColorStop(0.72, 'rgba(90, 92, 86, 1)');
  plumeGrad.addColorStop(0.9, 'rgba(90, 92, 86, 0.65)');
  plumeGrad.addColorStop(1, 'rgba(90, 92, 86, 0)');
  plumeCtx.fillStyle = plumeGrad;
  plumeCtx.fillRect(0, 0, 64, 64);
  const plumeMap = new THREE.CanvasTexture(plumeCanvas);
  // Canvas bytes are sRGB. The default NoColorSpace path encodes them again and the puff reads pale.
  plumeMap.colorSpace = THREE.SRGBColorSpace;
  const plumeMat = new THREE.SpriteMaterial({
    map: plumeMap,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    opacity: 1,
    toneMapped: false,
  });
  // One small grey puff on the enemy roof. Parked discs used to float in the grass.
  const roofSmoke = new THREE.Sprite(plumeMat);
  roofSmoke.scale.set(0.28, 0.2, 1);
  roofSmoke.position.set(0.32, 1.78, -6.42);
  roofSmoke.renderOrder = 3;
  roofSmoke.frustumCulled = false;
  scene.add(roofSmoke);
  // Baked shotgun tip in the unit-height soldier. crowds modelMul is 1.8.
  const MUZZLE = { x: -0.024, y: 0.6, z: -0.397 };
  const FIGURE = SOLDIER_SCALE * 1.8;
  // Short sparks on the near edge of each red block and the front of the green rank.
  const rankSpots = [
    [-3.45, 0.58, -1.58],
    [-2.85, 0.58, -1.58],
    [-2.25, 0.58, -1.58],
    [-1.7, 0.58, -1.58],
    [0.25, 0.58, -1.88],
    [0.85, 0.58, -1.88],
    [1.45, 0.58, -1.88],
    [2.05, 0.58, -1.88],
    [-0.9, 0.58, 1.48],
    [-0.25, 0.58, 1.48],
    [0.4, 0.58, 1.48],
    [1.05, 0.58, 1.48],
  ];
  const rankSparks = rankSpots.map((spot) => {
    const sprite = new THREE.Sprite(rankMat);
    sprite.scale.set(0.4, 0.4, 1);
    sprite.position.set(spot[0], spot[1], spot[2]);
    sprite.visible = false;
    sprite.renderOrder = 6;
    sprite.frustumCulled = false;
    scene.add(sprite);
    return sprite;
  });
  const traceGreen = new THREE.Color(0xfff4c8);
  const traceRed = new THREE.Color(0xffd27a);

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

  const slot = { x: 0, z: 0 };
  const face = { x: 0, z: 0 };
  let lines = 0;

  function yawOf(q, nodes) {
    let dx = 0;
    let dz = q.owner === 'player' ? -1 : 1;
    if (q.path && q.path.length > 1 && nodes) {
      const prev = nodes[q.path[Math.max(0, (q.seg || 1) - 1)]];
      if (prev) {
        dx = q.x - prev.x;
        dz = q.z - prev.z;
      }
    }
    return yawForFacing(dx, dz);
  }

  function flashOn(sprite, x, z, yaw) {
    rotateXZ(MUZZLE.x, MUZZLE.z, yaw, slot);
    sprite.position.set(x + slot.x * FIGURE, 0.02 + MUZZLE.y * FIGURE, z + slot.z * FIGURE);
    sprite.scale.set(0.42, 0.42, 1);
    sprite.visible = enabled;
  }

  function frontFigures(owner, count, anchorX, anchorZ, yaw) {
    const n = Math.max(1, drawnCount(owner, count));
    const placed = [];
    rotateXZ(0, -1, yaw, face);
    for (let i = 0; i < n; i++) {
      formationWorld(owner, i, n, yaw, slot);
      const along = slot.x * face.x + slot.z * face.z;
      placed.push({ x: anchorX + slot.x, z: anchorZ + slot.z, along });
    }
    placed.sort((a, b) => b.along - a.along);
    const lead = placed[0];
    const next = placed[Math.min(placed.length - 1, Math.max(1, Math.floor(n / 8)))];
    return next && next !== lead ? [lead, next] : [lead];
  }

  function pushStreak(x0, y0, z0, x1, y1, z1, color) {
    if (lines >= MAX_LINES) return;
    const dx = x1 - x0;
    const dz = z1 - z0;
    const dist = Math.hypot(dx, dz) || 1;
    const halfW = 0.055;
    const inv = 1 / dist;
    const hx = -dz * inv * halfW;
    const hz = dx * inv * halfW;
    const o = lines * 18;
    const xyz = [
      x0 - hx, y0, z0 - hz,
      x0 + hx, y0, z0 + hz,
      x1 - hx, y1, z1 - hz,
      x0 + hx, y0, z0 + hz,
      x1 + hx, y1, z1 + hz,
      x1 - hx, y1, z1 - hz,
    ];
    for (let k = 0; k < 18; k++) linePos[o + k] = xyz[k];
    for (let v = 0; v < 6; v++) {
      const co = o + v * 3;
      lineCol[co] = color.r;
      lineCol[co + 1] = color.g;
      lineCol[co + 2] = color.b;
    }
    lines += 1;
  }

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
      roofSmoke.visible = enabled;
      for (let i = 0; i < rankSparks.length; i++) rankSparks[i].visible = enabled;
      if (!enabled) {
        rankPuffs[0].visible = false;
        rankPuffs[1].visible = false;
        streaks[0].visible = false;
        streaks[1].visible = false;
        for (let i = 0; i < muzzles.length; i++) muzzles[i].visible = false;
        for (let i = 0; i < dustPuffs.length; i++) dustPuffs[i].visible = false;
      }
    },
    update(dt, state) {
      if (!enabled || !state) return;
      const squads = state.squads || [];
      let budget = 64;
      const tick = Math.floor((state.t || 0) * 8);
      let muzzleIndex = 0;
      let dustIndex = 0;
      const nodesNow = state.nodes;
      for (let i = 0; i < muzzles.length; i++) muzzles[i].visible = false;
      for (let i = 0; i < dustPuffs.length; i++) dustPuffs[i].visible = false;
      for (let s = 0; s < squads.length && budget > 0; s++) {
        const q = squads[s];
        if (!q || q.count <= 0) continue;
        const jitter = ((s * 17) % 5) * 0.05;
        if (q.mode === 'march') {
          // Planks run about z −1.1 to 1.1. Dust on that span reads as a pale card.
          if (Math.abs(q.z) >= 1.2) {
            spawn(q.x + jitter, 0.16, q.z - jitter, dust, 0.8, 0, 0.45, 0);
            budget -= 1;
            if (budget > 0 && s % 2 === 0) {
              spawn(q.x - jitter, 0.22, q.z + 0.1, dust, 0.55, 0.2, 0.3, 0);
              budget -= 1;
            }
          }
        } else if (q.mode === 'fight' || q.mode === 'siege') {
          const spot = drawAnchor(q.owner, q.x, q.z, q.count);
          const side = ((s + tick) % 3) - 1;
          const yaw = yawOf(q, nodesNow);
          const tips = frontFigures(q.owner, q.count, spot.x, spot.z, yaw);
          for (let t = 0; t < tips.length && muzzleIndex < muzzles.length - 1; t++) {
            flashOn(muzzles[muzzleIndex], tips[t].x, tips[t].z, yaw);
            muzzleIndex += 1;
          }
          if (dustIndex < dustPuffs.length) {
            const puffSprite = dustPuffs[dustIndex];
            dustIndex += 1;
            const onDeck = q.owner === 'player' && Math.abs(q.z) < 1.15;
            const dustX = onDeck ? q.x : spot.x;
            const dustZ = onDeck ? 1.35 : spot.z;
            puffSprite.position.set(dustX + side * 0.1, 0.08, dustZ);
            puffSprite.scale.set(0.26, 0.16, 1);
            puffSprite.visible = enabled;
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
      const barrel = muzzles[muzzles.length - 1];
      // Baked Tank_Gun runs toward the camera. The visible tip is just short of the mesh max-Z.
      const pulse = 0.86 + 0.14 * Math.sin((state.t || 0) * 16);
      barrel.position.set(1.69, 0.66, 5.05);
      barrel.scale.set(0.18 * pulse, 0.18 * pulse, 1);
      barrel.visible = enabled;
      if (muzzleIndex < muzzles.length - 1) {
        const hqFlash = muzzles[muzzleIndex];
        // Red gate faces the road. A short spark, not a beam up the screen.
        hqFlash.position.set(0, 0.48, -5.45);
        hqFlash.scale.set(0.18 * pulse, 0.18 * pulse, 1);
        hqFlash.visible = enabled;
      }
      if (dustIndex < dustPuffs.length) {
        const kick = dustPuffs[dustIndex];
        kick.position.set(1.55, 0.1, 4.55);
        kick.scale.set(0.42, 0.2, 1);
        kick.visible = enabled;
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
      lines = 0;
      rankPuffs[0].visible = false;
      rankPuffs[1].visible = false;
      streaks[0].visible = false;
      streaks[1].visible = false;
      const driftT = (typeof performance !== 'undefined' ? performance.now() : 0) * 0.001;
      roofSmoke.position.y = 1.78 + Math.sin(driftT * 0.35) * 0.03;
      roofSmoke.visible = enabled;
      const sparkPulse = 0.86 + 0.14 * Math.sin((state.t || 0) * 18);
      for (let i = 0; i < rankSparks.length; i++) {
        const spot = rankSpots[i];
        rankSparks[i].position.set(spot[0], spot[1], spot[2]);
        rankSparks[i].scale.set(0.4 * sparkPulse, 0.4 * sparkPulse, 1);
        rankSparks[i].visible = enabled;
      }
      for (let a = 0; a < squads.length; a++) {
        const qa = squads[a];
        if (!qa || qa.count <= 0) continue;
        for (let b = a + 1; b < squads.length; b++) {
          const qb = squads[b];
          if (!qb || qb.count <= 0 || qa.owner === qb.owner) continue;
          const realDx = qb.x - qa.x;
          const realDz = qb.z - qa.z;
          const realDist = Math.hypot(realDx, realDz);
          if (realDist > 4.4 || realDist < 0.12 || lines >= MAX_LINES) continue;
          const aDraw = drawAnchor(qa.owner, qa.x, qa.z, qa.count);
          const bDraw = drawAnchor(qb.owner, qb.x, qb.z, qb.count);
          let dx = bDraw.x - aDraw.x;
          let dz = bDraw.z - aDraw.z;
          let dist = Math.hypot(dx, dz);
          if (dist < 0.2) {
            dx = realDx;
            dz = realDz;
            dist = realDist;
          }
          const reach = Math.min(0.55, dist * 0.35);
          const halfW = Math.min(0.022, reach * 0.05);
          const inv = 1 / dist;
          const hx = -dz * inv * halfW;
          const hz = dx * inv * halfW;
          // A short streak from the visible rank, not a bar across the map.
          const y = 0.5;
          const ax = aDraw.x;
          const az = aDraw.z;
          const bx = aDraw.x + dx * inv * reach;
          const bz = aDraw.z + dz * inv * reach;
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
          if (lines < MAX_LINES) {
            const cx0 = bDraw.x;
            const cz0 = bDraw.z;
            const cx1 = bDraw.x - dx * inv * reach;
            const cz1 = bDraw.z - dz * inv * reach;
            const o2 = lines * 18;
            const xyz2 = [
              cx0 - hx, y, cz0 - hz,
              cx0 + hx, y, cz0 + hz,
              cx1 - hx, y, cz1 - hz,
              cx0 + hx, y, cz0 + hz,
              cx1 + hx, y, cz1 + hz,
              cx1 - hx, y, cz1 - hz,
            ];
            for (let k = 0; k < 18; k++) linePos[o2 + k] = xyz2[k];
            const back = qb.owner === 'player' ? traceGreen : traceRed;
            for (let v = 0; v < 6; v++) {
              const co = o2 + v * 3;
              lineCol[co] = back.r;
              lineCol[co + 1] = back.g;
              lineCol[co + 2] = back.b;
            }
            lines += 1;
          }
          if (lines === 1 || lines === 2) {
            streaks[0].position.set(ax, 0.52, az);
            streaks[1].position.set(bDraw.x, 0.52, bDraw.z);
            streaks[0].visible = enabled;
            streaks[1].visible = enabled;
          }
        }
      }
      // Opening volley. Short sparks on the tank muzzle and the red gate.
      pushStreak(1.69, 0.66, 5.05, 1.58, 0.58, 4.72, traceGreen);
      pushStreak(0, 0.48, -5.45, 0.06, 0.42, -5.18, traceRed);
      streaks[0].position.set(1.64, 0.62, 4.88);
      streaks[0].scale.set(0.16, 0.16, 1);
      streaks[0].visible = enabled;
      streaks[1].position.set(0.03, 0.46, -5.32);
      streaks[1].scale.set(0.16, 0.16, 1);
      streaks[1].visible = enabled;
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
