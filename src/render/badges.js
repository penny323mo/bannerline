import { NODES } from '../sim/mapdata.js';
import { BADGE_LIFT, SQUAD_LIFT, projectToCss, squadMarkX } from './pointer-math.js';

export function createBadges(host) {
  const pool = new Map();
  const spot = { x: 0, y: 0 };
  const seen = new Set();
  const stale = [];
  const MARKS = ['', '快', '固', '快固'];
  let nodes = NODES;

  function take(id) {
    let node = pool.get(id);
    if (!node) {
      node = document.createElement('div');
      node.className = 'badge';
      node.innerHTML = '<span class="tag"></span><b class="num"></b><i class="sub"></i>';
      host.appendChild(node);
      pool.set(id, node);
    }
    return node;
  }

  function setText(node, selector, text) {
    const el = node.querySelector(selector);
    if (el.textContent !== text) el.textContent = text;
  }

  function move(node, x, y, z, camera, w, h) {
    if (!projectToCss(x, y, z, camera, w, h, spot)) {
      node.hidden = true;
      return;
    }
    node.hidden = false;
    node.style.transform = `translate(${spot.x}px, ${spot.y}px) translate(-50%, -115%)`;
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

      for (let i = 0; i < state.buildings.length; i++) {
        const b = state.buildings[i];
        seen.add(b.id);
        const node = take(b.id);
        node.classList.toggle('player', b.owner === 'player');
        node.classList.toggle('enemy', b.owner === 'enemy');
        node.classList.toggle('squad', false);
        const label = b.kind === 'hq' ? '司令部' : '兵營';
        setText(node, '.tag', label);
        setText(node, '.num', String(Math.max(0, Math.floor(b.count))));
        const ranks = b.upgrades;
        const markIndex = (ranks && ranks.haste > 0 ? 1 : 0) + (ranks && ranks.bulwark > 0 ? 2 : 0);
        const mark = MARKS[markIndex];
        let extra = '';
        if (b.capture > 0.02) extra = '佔領中';
        else if (b.kind === 'hq' && (b.count <= 0 || underAttack(state, b.id, b.owner))) extra = '危';
        else if (mark) extra = mark;
        else if (b.count >= b.cap) extra = '滿';
        setText(node, '.sub', extra);
        const p = layout[b.node];
        if (!p) continue;
        const lift = BADGE_LIFT[b.kind] || BADGE_LIFT.barracks;
        move(node, p.x, lift, p.z, camera, w, h);
      }

      for (let i = 0; i < state.squads.length; i++) {
        const s = state.squads[i];
        seen.add(s.id);
        const node = take(s.id);
        node.classList.add('squad');
        node.classList.toggle('player', s.owner === 'player');
        node.classList.toggle('enemy', s.owner === 'enemy');
        setText(node, '.tag', s.mode === 'siege' ? '攻城' : '行軍');
        setText(node, '.num', String(Math.max(0, Math.floor(s.count))));
        setText(node, '.sub', s.mode === 'fight' ? '交戰' : '');
        move(node, squadMarkX(s.x, s.owner, s.mode), SQUAD_LIFT, s.z, camera, w, h);
      }

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
