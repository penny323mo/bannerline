/**
 * Enemy orders. Pure: reads a context object and writes into `out`.
 * Personalities pick targets. Difficulty supplies sendMin, reactDelay, and timers.
 */

/** Headquarters reserve. A stack of 14 can still send an 8-troop probe. */
export function hqKeep(count) {
  const half = Math.floor(count * 0.5);
  return Math.max(0, Math.min(half, count - 8));
}

/**
 * A future cooldown does not freeze a building that is already under attack.
 * Once it answers, only nextSendAt can fire again.
 */
export function canIssue(t, nextSendAt, underAttack, alarmAt, reactDelay, answered) {
  if (t >= nextSendAt) return true;
  if (!underAttack || alarmAt == null || answered) return false;
  return t >= alarmAt + reactDelay;
}

function attackScore(personality, target) {
  if (personality === 'aggressive') {
    const value = target.kind === 'hq' ? 40 : 16;
    return value - target.count - target.travel * 0.5;
  }
  if (personality === 'cautious') {
    const shy = target.kind === 'hq' ? -20 : 0;
    return shy - target.travel * 2 - target.count * 0.05;
  }
  return -target.travel * 10 - target.count * 0.01;
}

export function bestTarget(personality, targets, count, skipHq) {
  let best = null;
  let bestScore = -Infinity;
  const n = count == null ? targets.length : count;
  for (let i = 0; i < n; i++) {
    if (skipHq && targets[i].kind === 'hq') continue;
    const score = attackScore(personality, targets[i]);
    if (score > bestScore) {
      bestScore = score;
      best = targets[i];
    }
  }
  return best;
}

/**
 * Fill `out.targetId` and `out.keep`. Returns false when the building waits.
 * Defending ignores the usual stack minimum so a siege cannot soft-lock the AI.
 * A fat stack still waits for its opening wave. After that wave, an attack
 * can break the cooldown. A stack that can never meet the send gate may sally
 * during the opening so it does not sit idle.
 */
export function writeOrder(ctx, out) {
  const ready = canIssue(
    ctx.t,
    ctx.nextSendAt,
    ctx.underAttack,
    ctx.alarmAt,
    ctx.reactDelay,
    ctx.answered,
  );
  if (!ready || ctx.count < 2) return false;

  if (ctx.t < ctx.nextSendAt) {
    const tooSmall = ctx.kind === 'hq' ? ctx.count < 14 : ctx.count < ctx.sendMin;
    if (!tooSmall && !ctx.opened) return false;
  }

  // A squad already standing on the building is a siege, not a march to cut off.
  const defending = !!(ctx.underAttack && ctx.threatenedId && !ctx.pressing);
  if (defending && ctx.buildingId !== ctx.threatenedId && ctx.ownsThreatened) {
    const frac = ctx.reliefKeep > 0 ? ctx.reliefKeep : 0.35;
    const keep = Math.min(ctx.count - 1, Math.max(0, Math.floor(ctx.count * frac)));
    if (ctx.count - keep < 1) return false;
    out.targetId = ctx.threatenedId;
    out.keep = keep;
    return true;
  }

  if (!defending) {
    if (ctx.kind === 'hq') {
      const keep = hqKeep(ctx.count);
      if (ctx.count < 14 || ctx.count - keep < 8) return false;
    } else if (ctx.count < ctx.sendMin) {
      return false;
    }
  }

  // Opening grace blocks a march on the player headquarters. Reinforcing an
  // enemy building (above) is unchanged. marchCap trims offensive waves only.
  const skipHq = ctx.hqGrace > 0 && ctx.t < ctx.hqGrace;
  const target = bestTarget(ctx.personality, ctx.targets, ctx.targetCount, skipHq);
  if (!target) return false;
  let keep = 0;
  if (ctx.kind === 'hq' && !defending) keep = hqKeep(ctx.count);
  else if (defending) keep = ctx.count >= 3 ? 1 : 0;
  else if (ctx.personality === 'cautious') keep = Math.min(ctx.count - 1, Math.max(0, Math.floor(ctx.count * 0.3)));
  if (ctx.marchCap > 0 && !defending) {
    const capped = ctx.count - ctx.marchCap;
    if (capped > keep) keep = capped;
  }
  if (ctx.count - keep < 1) return false;
  out.targetId = target.id;
  out.keep = keep;
  return true;
}
