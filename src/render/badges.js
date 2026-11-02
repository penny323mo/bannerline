import { NODES } from '../sim/mapdata.js';
import { TROOP_DISPLAY, shownTroops } from '../sim/match.js';
import { quoteUpgrade, upgradeAffordance } from '../sim/upgrades.js';
import { BADGE_LIFT, PILL_SHIFT_PX, SQUAD_LIFT, layoutPills, projectToCss, squadMarkX } from './pointer-math.js';

const RIFLE = '<svg viewBox="0 0 16 12" aria-hidden="true"><path fill="currentColor" d="M0 5.1h2.4l.5 2.6H1zM2.2 4.2h6.4v1.8H2.2zM8.4 3.3h6.4v1.5H8.4zM6 6h1.3v3.4H6z"/></svg>';
const CAMP = '<svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M6 .4l4.6 2.6v1.6H1.4V3zM2.2 5.6h7.6V11H2.2z"/></svg>';

export function createBadges(host) {
  const pool = new Map();
  const spot = { x: 0, y: 0 };
  const seen = new Set();
  const stale = [];
  const MARKS = ['', '快', '固', '快固'];
  const points = [];
  const laid = [];
  const refs = [];
  let nodes = NODES;

  function pointAt(i) {
    let row = points[i];
    if (!row) {
      row = { x: 0, y: 0, z: 0, squad: 0 };
      points[i] = row;
      laid[i] = { px: 0, py: 0, ok: 0 };
    }
    return row;
  }

  function take(id) {
    let node = pool.get(id);
    if (!node) {
      node = document.createElement('div');
      node.className = 'badge';
      node.innerHTML = '<span class="mark" aria-hidden="true"></span><span class="tag"></span><b class="num"></b><i class="sub"></i>';
      host.appendChild(node);
      pool.set(id, node);
    }
    return node;
  }

  function setMark(node, kind) {
    const mark = node.querySelector('.mark');
    if (!mark || mark.dataset.kind === kind) return;
    mark.dataset.kind = kind;
    mark.innerHTML = kind === 'squad' ? RIFLE : CAMP;
  }

  function setText(node, selector, text) {
    const el = node.querySelector(selector);
    if (el.textContent !== text) el.textContent = text;
  }

  function place(node, row) {
    if (!row || !row.ok) {
      node.hidden = true;
      return;
    }
    node.hidden = false;
    const anchorY = row.py + PILL_SHIFT_PX;
    node.style.transform = `translate(${row.px}px, ${anchorY}px) translate(-50%, -139%)`;
  }

  function underAttack(state, id, owner) {
    const squads = state.squads;
    for (let i = 0; i < squads.length; i++) {
      const s = squads[i];
      if (s.mode === 'siege' && s.targetId === id && s.owner !== owner && s.count > 0) return true;
    }
    return false;
  }

  return {
    setMap(map) {
      nodes = (map && map.nodes) || NODES;
    },
    update(state, camera, canvas) {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const layout = (state && state.nodes) || nodes;
      seen.clear();
      let n = 0;

      for (let i = 0; i < state.buildings.length; i++) {
        const b = state.buildings[i];
        seen.add(b.id);
        const node = take(b.id);
        node.classList.toggle('player', b.owner === 'player');
        node.classList.toggle('enemy', b.owner === 'enemy');
        node.classList.toggle('squad', false);
        node.classList.toggle('hq', b.kind === 'hq');
        setMark(node, 'camp');
        const canUp = upgradeAffordance(b);
        node.classList.toggle('can-up', canUp);
        if (canUp) {
          const haste = quoteUpgrade(b, 'haste');
          const wall = quoteUpgrade(b, 'bulwark');
          const quote = haste.ok ? haste : wall;
          node.dataset.cost = quote && quote.cost ? ` ${quote.cost * TROOP_DISPLAY}` : '';
        } else if (node.dataset.cost) {
          node.dataset.cost = '';
        }
        const label = b.kind === 'hq' ? '司令部' : '兵營';
        setText(node, '.tag', label);
        setText(node, '.num', String(shownTroops(b.count)));
        const ranks = b.upgrades;
        const markIndex = (ranks && ranks.haste > 0 ? 1 : 0) + (ranks && ranks.bulwark > 0 ? 2 : 0);
        const mark = MARKS[markIndex];
        let extra = '';
        if (b.capture > 0.02) extra = '佔領中';
        else if (b.kind === 'hq' && (b.count <= 0 || underAttack(state, b.id, b.owner))) extra = '危';
        else if (mark) extra = mark;
        else if (b.count >= b.cap) extra = '滿';
        setText(node, '.sub', extra);
        node.classList.toggle('is-danger', extra === '危');
        const p = layout[b.node];
        if (!p) {
          node.hidden = true;
          continue;
        }
        const row = pointAt(n);
        row.x = p.x;
        row.y = BADGE_LIFT[b.kind] || BADGE_LIFT.barracks;
        row.z = p.z;
        row.squad = 0;
        refs[n] = node;
        n += 1;
      }

      for (let i = 0; i < state.squads.length; i++) {
        const s = state.squads[i];
        if (s.count <= 0) continue;
        seen.add(s.id);
        const node = take(s.id);
        node.classList.add('squad');
        setMark(node, 'squad');
        node.classList.remove('hq');
        node.classList.toggle('player', s.owner === 'player');
        node.classList.toggle('enemy', s.owner === 'enemy');
        node.classList.toggle('can-up', false);
        node.classList.toggle('is-danger', false);
        setText(node, '.tag', s.mode === 'siege' ? '攻城' : '行軍');
        setText(node, '.num', String(shownTroops(s.count)));
        setText(node, '.sub', s.mode === 'fight' ? '交戰' : '');
        const row = pointAt(n);
        row.x = squadMarkX(s.x, s.owner, s.mode);
        row.y = SQUAD_LIFT;
        row.z = s.z;
        row.squad = 1;
        refs[n] = node;
        n += 1;
      }

      layoutPills(points, n, camera, w, h, laid);
      for (let i = 0; i < n; i++) place(refs[i], laid[i]);

      stale.length = 0;
      for (const id of pool.keys()) {
        if (!seen.has(id)) stale.push(id);
      }
      for (let i = 0; i < stale.length; i++) {
        pool.get(stale[i]).remove();
        pool.delete(stale[i]);
      }
    },
    clientPoint(id, camera, canvas) {
      const p = nodes[id];
      if (!p) return null;
      const rect = canvas.getBoundingClientRect();
      if (!projectToCss(p.x, 0.4, p.z, camera, rect.width, rect.height, spot)) return null;
      return { x: rect.left + spot.x, y: rect.top + spot.y };
    },
  };
}
