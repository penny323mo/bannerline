import { NODES } from '../sim/mapdata.js';
import { BADGE_LIFT, projectToCss } from './pointer-math.js';

export function createBadges(host) {
  const pool = new Map();
  const spot = { x: 0, y: 0 };

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

  return {
    update(state, camera, canvas) {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const seen = new Set();

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
        let extra = '';
        if (b.capture > 0.02) extra = '佔領中';
        else if (b.kind === 'barracks' && b.count >= b.cap) extra = '滿';
        setText(node, '.sub', extra);
        const p = NODES[b.node];
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
        const ox = s.mode === 'siege' ? (s.owner === 'player' ? 0.85 : -0.85) : 0;
        move(node, s.x + ox, 1.05, s.z, camera, w, h);
      }

      const stale = [];
      for (const id of pool.keys()) {
        if (!seen.has(id)) stale.push(id);
      }
      for (let i = 0; i < stale.length; i++) {
        pool.get(stale[i]).remove();
        pool.delete(stale[i]);
      }
    },
    clientPoint(id, camera, canvas) {
      const p = NODES[id];
      if (!p) return null;
      const rect = canvas.getBoundingClientRect();
      if (!projectToCss(p.x, 0.4, p.z, camera, rect.width, rect.height, spot)) return null;
      return { x: rect.left + spot.x, y: rect.top + spot.y };
    },
  };
}
