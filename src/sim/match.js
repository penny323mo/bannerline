import { FIRST_SEND, RULES, startingBuildings } from './balance.js';
import { canStartCapture, captureResult, matchOutcome, stepCapture } from './capture.js';
import { clashTick, splitSurvivors } from './combat.js';
import { applyRegen } from './economy.js';
import { NODES } from './mapdata.js';
import { findPath } from './path.js';

function blankBuilding(spec) {
  return {
    id: spec.id,
    kind: spec.kind,
    owner: spec.owner,
    node: spec.node,
    count: spec.count,
    cap: spec.cap,
    regen: spec.regen,
    bank: 0,
    capture: 0,
  };
}

export function createMatch() {
  const buildings = startingBuildings().map(blankBuilding);
  const nextSendAt = {};
  for (const b of buildings) {
    if (b.owner === 'enemy') nextSendAt[b.id] = FIRST_SEND[b.id] ?? 12;
  }
  return {
    t: 0,
    status: 'playing',
    ai: true,
    clashAcc: 0,
    nextSquadId: 1,
    nextSendAt,
    buildings,
    squads: [],
    events: [],
  };
}

export function buildingById(state, id) {
  for (let i = 0; i < state.buildings.length; i++) {
    if (state.buildings[i].id === id) return state.buildings[i];
  }
  return null;
}

export function squadById(state, id) {
  if (!state) return null;
  for (let i = 0; i < state.squads.length; i++) {
    if (state.squads[i].id === id) return state.squads[i];
  }
  return null;
}

/**
 * Send a squad that is already on the map toward a building.
 * The new path starts on the segment the squad is walking, so it does not
 * snap back to the node it has left.
 */
export function retargetSquad(state, squadId, targetId) {
  if (!state || state.status !== 'playing') return { ok: false, reason: 'over' };
  const squad = squadById(state, squadId);
  const target = buildingById(state, targetId);
  if (!squad || squad.owner !== 'player' || squad.count <= 0) return { ok: false, reason: 'bad-squad' };
  if (!target) return { ok: false, reason: 'bad-target' };
  const path = squad.path || [];
  if (!path.length) return { ok: false, reason: 'no-path' };
  const atEnd = squad.seg >= path.length - 1;
  const behind = atEnd ? path[path.length - 1] : path[squad.seg];
  const next = atEnd ? null : path[squad.seg + 1];
  let rebuilt;
  if (!next) {
    rebuilt = findPath(behind, target.node);
  } else {
    const rest = findPath(next, target.node);
    if (!rest) return { ok: false, reason: 'no-path' };
    rebuilt = rest[0] === behind ? rest : [behind, ...rest];
  }
  if (!rebuilt || rebuilt.length < 2) return { ok: false, reason: 'same' };
  squad.targetId = target.id;
  squad.path = rebuilt;
  squad.seg = 0;
  squad.mode = 'march';
  state.events.push({ type: 'retarget', squadId, targetId, owner: squad.owner });
  return { ok: true };
}

export function sideStrength(state, owner) {
  let n = 0;
  for (let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    if (b.owner === owner) n += b.count;
  }
  for (let i = 0; i < state.squads.length; i++) {
    const s = state.squads[i];
    if (s.owner === owner) n += s.count;
  }
  return n;
}

/**
 * Garrison left behind by a player order.
 * A fifth of the stack, at least one soldier when there are two or more,
 * and never more than 6 — a full barracks of 54 must still march more than
 * the 44 troops in the enemy headquarters.
 */
export function playerHold(building) {
  const count = Math.max(0, Math.floor(building.count || 0));
  if (count <= 1) return 0;
  const fraction = Math.max(1, Math.floor(count * 0.2));
  return Math.min(fraction, 6, count - 1);
}

/** Headquarters reserve. A stack of 14 can still send an 8-troop probe. */
function enemyHqKeep(count) {
  const half = Math.floor(count * 0.5);
  return Math.max(0, Math.min(half, count - 8));
}

export function sendSquad(state, fromId, targetId, keep = 0) {
  if (!state || state.status !== 'playing') return { ok: false, reason: 'over' };
  const from = buildingById(state, fromId);
  const target = buildingById(state, targetId);
  if (!from || !target || from.id === target.id) return { ok: false, reason: 'bad-target' };
  const hold = Math.max(0, Math.floor(keep));
  if (from.count - hold < 1) return { ok: false, reason: 'empty' };
  const path = findPath(from.node, target.node);
  if (!path || path.length < 2) return { ok: false, reason: 'no-path' };
  const count = from.count - hold;
  from.count = hold;
  from.bank = 0;
  const start = NODES[path[0]];
  const squad = {
    id: `sq${state.nextSquadId++}`,
    owner: from.owner,
    count,
    targetId: target.id,
    path,
    seg: 0,
    x: start.x,
    z: start.z,
    mode: 'march',
  };
  state.squads.push(squad);
  state.events.push({ type: 'send', owner: from.owner, count, fromId, targetId });
  return { ok: true, count, id: squad.id };
}

function moveSquad(squad, dt) {
  let left = RULES.marchSpeed * dt;
  while (left > 0 && squad.seg < squad.path.length - 1) {
    const b = NODES[squad.path[squad.seg + 1]];
    const dx = b.x - squad.x;
    const dz = b.z - squad.z;
    const dist = Math.hypot(dx, dz);
    if (dist <= 1e-6) {
      squad.x = b.x;
      squad.z = b.z;
      squad.seg += 1;
      continue;
    }
    if (dist <= left + 1e-8) {
      squad.x = b.x;
      squad.z = b.z;
      left -= dist;
      squad.seg += 1;
    } else {
      const inv = 1 / dist;
      squad.x += dx * inv * left;
      squad.z += dz * inv * left;
      left = 0;
    }
  }
}

function pathTravel(path) {
  let d = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const a = NODES[path[i]];
    const b = NODES[path[i + 1]];
    d += Math.hypot(a.x - b.x, a.z - b.z);
  }
  return d;
}

function nearestPlayerTarget(state, from) {
  let best = null;
  let bestD = Infinity;
  for (let i = 0; i < state.buildings.length; i++) {
    const t = state.buildings[i];
    if (t.owner !== 'player') continue;
    const path = findPath(from.node, t.node);
    if (!path) continue;
    const d = pathTravel(path);
    if (d < bestD) {
      bestD = d;
      best = t;
    }
  }
  return best;
}

function planEnemy(state) {
  if (!state.ai) return;
  for (let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    if (b.owner !== 'enemy') continue;
    if (state.t < (state.nextSendAt[b.id] ?? 0)) continue;
    const keep = b.kind === 'hq' ? enemyHqKeep(b.count) : 0;
    if (b.kind === 'hq') {
      if (b.count < 14 || b.count - keep < 8) continue;
    } else if (b.count < RULES.enemySendMin) {
      continue;
    }
    const target = nearestPlayerTarget(state, b);
    if (!target) continue;
    const res = sendSquad(state, b.id, target.id, keep);
    if (res.ok) state.nextSendAt[b.id] = state.t + RULES.enemySendPeriod;
  }
}

function collectPairs(state) {
  const squads = state.squads;
  const paired = new Set();
  const pairs = [];
  for (let i = 0; i < squads.length; i++) {
    const a = squads[i];
    if (a.count <= 0 || paired.has(a.id)) continue;
    let best = null;
    let bestD = RULES.contactRadius;
    for (let j = 0; j < squads.length; j++) {
      if (i === j) continue;
      const b = squads[j];
      if (b.count <= 0 || paired.has(b.id) || b.owner === a.owner) continue;
      const d = Math.hypot(a.x - b.x, a.z - b.z);
      if (d <= bestD) {
        bestD = d;
        best = b;
      }
    }
    if (best) {
      paired.add(a.id);
      paired.add(best.id);
      pairs.push([a, best]);
    }
  }
  return { pairs, paired };
}

function assignModes(state, paired) {
  for (let i = 0; i < state.squads.length; i++) {
    const s = state.squads[i];
    if (s.count <= 0) continue;
    if (paired.has(s.id)) {
      s.mode = 'fight';
      continue;
    }
    const target = buildingById(state, s.targetId);
    if (!target) {
      s.mode = 'march';
      continue;
    }
    const dest = NODES[target.node];
    const dist = Math.hypot(s.x - dest.x, s.z - dest.z);
    const finished = s.seg >= s.path.length - 1;
    if (finished && dist <= RULES.arriveRadius) {
      if (target.owner === s.owner) {
        const room = Math.max(0, target.cap - target.count);
        const take = Math.min(s.count, room);
        if (take > 0) {
          target.count += take;
          s.count -= take;
          state.events.push({ type: 'reinforce', buildingId: target.id, owner: s.owner });
        }
        if (s.count > 0) {
          s.x = dest.x;
          s.z = dest.z;
          s.mode = 'march';
        }
      } else {
        s.mode = 'siege';
        s.x = dest.x;
        s.z = dest.z;
      }
    } else {
      s.mode = 'march';
    }
  }
}

function resolveFights(state, pairs) {
  let any = false;
  for (let i = 0; i < pairs.length; i++) {
    const a = pairs[i][0];
    const b = pairs[i][1];
    if (a.count <= 0 || b.count <= 0) continue;
    const r = clashTick(a.count, b.count, RULES.clashLoss);
    a.count = r.a;
    b.count = r.b;
    any = true;
  }

  const groups = new Map();
  for (let i = 0; i < state.squads.length; i++) {
    const s = state.squads[i];
    if (s.mode !== 'siege' || s.count <= 0) continue;
    let list = groups.get(s.targetId);
    if (!list) {
      list = [];
      groups.set(s.targetId, list);
    }
    list.push(s);
  }

  for (const [bid, attackers] of groups) {
    const bld = buildingById(state, bid);
    if (!bld) continue;
    if (attackers.every((s) => s.owner === bld.owner)) continue;
    const enemy = attackers.filter((s) => s.owner !== bld.owner && s.count > 0);
    if (!enemy.length) continue;
    const counts = enemy.map((s) => s.count);
    const sum = counts.reduce((n, c) => n + c, 0);
    const r = clashTick(sum, bld.count, RULES.clashLoss);
    bld.count = r.b;
    const shares = splitSurvivors(counts, r.a);
    for (let i = 0; i < enemy.length; i++) enemy[i].count = shares[i];
    if (bld.count > 0) bld.capture = 0;
    any = true;
  }
  if (any) state.events.push({ type: 'clash' });
}

function advanceCaptures(state, dt) {
  for (let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    let attackerCount = 0;
    let attackerOwner = null;
    const holders = [];
    for (let s = 0; s < state.squads.length; s++) {
      const sq = state.squads[s];
      if (sq.mode !== 'siege' || sq.targetId !== b.id || sq.count <= 0) continue;
      if (sq.owner === b.owner) continue;
      attackerCount += sq.count;
      attackerOwner = sq.owner;
      holders.push(sq);
    }
    const allowed = canStartCapture({
      garrison: b.count,
      attackerCount,
      attackerOwner,
      buildingOwner: b.owner,
    });
    const step = stepCapture(b.capture, dt, RULES.captureSeconds, allowed);
    b.capture = step.progress;
    if (!step.done || !attackerOwner) continue;
    const flipped = captureResult(attackerOwner, attackerCount);
    b.owner = flipped.owner;
    b.count = flipped.count;
    b.capture = 0;
    b.bank = 0;
    for (let h = 0; h < holders.length; h++) holders[h].count = 0;
    state.events.push({ type: 'capture', buildingId: b.id, owner: attackerOwner });
  }
}

function checkOutcome(state) {
  const playerHq = buildingById(state, 'player-hq');
  const enemyHq = buildingById(state, 'enemy-hq');
  const outcome = matchOutcome(playerHq && playerHq.owner, enemyHq && enemyHq.owner);
  if (outcome && state.status === 'playing') {
    state.status = outcome;
    state.events.push({ type: outcome });
  }
}

function stepOnce(state, dt) {
  if (state.status !== 'playing') return;

  for (let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    if (b.kind !== 'barracks' || !(b.regen > 0)) continue;
    let sieged = false;
    for (let s = 0; s < state.squads.length; s++) {
      const sq = state.squads[s];
      if (sq.mode === 'siege' && sq.targetId === b.id && sq.owner !== b.owner && sq.count > 0) {
        sieged = true;
        break;
      }
    }
    if (sieged) continue;
    const before = b.count;
    const next = applyRegen(b.count, b.cap, b.bank, b.regen, dt);
    b.count = next.count;
    b.bank = next.bank;
    if (b.count > before) state.events.push({ type: 'spawn', buildingId: b.id, owner: b.owner });
  }

  planEnemy(state);

  for (let i = 0; i < state.squads.length; i++) {
    const s = state.squads[i];
    if (s.mode === 'march' && s.count > 0) moveSquad(s, dt);
  }

  const { pairs, paired } = collectPairs(state);
  assignModes(state, paired);

  state.clashAcc += dt;
  while (state.clashAcc >= RULES.clashEvery) {
    state.clashAcc -= RULES.clashEvery;
    resolveFights(state, pairs);
  }

  advanceCaptures(state, dt);

  if (state.squads.some((s) => s.count <= 0)) {
    state.squads = state.squads.filter((s) => s.count > 0);
  }

  checkOutcome(state);
}

export function stepMatch(state, dt, opts = {}) {
  if (!state || state.status !== 'playing') return state;
  if (!Number.isFinite(dt) || dt <= 0) return state;
  if (opts.ai === false) state.ai = false;
  if (opts.ai === true) state.ai = true;
  state.events.length = 0;
  let left = dt;
  const hmax = RULES.substep;
  while (left > 1e-8 && state.status === 'playing') {
    const h = Math.min(hmax, left);
    stepOnce(state, h);
    state.t += h;
    left -= h;
  }
  return state;
}
