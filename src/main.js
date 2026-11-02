import './style.css';
import { createAudio } from './audio.js';
import { createBadges } from './render/badges.js';
import { createCrowds } from './render/crowds.js';
import { createFx } from './render/fx.js';
import { attachInput } from './render/input.js';
import { createStage, frameDioramaCamera, frameHomeCamera } from './render/stage.js';
import { createWorld } from './render/world.js';
import { NODES } from './sim/mapdata.js';
import { DIFFICULTIES, MAP_LIST } from './sim/maps.js';
import { buildingById, createMatch, playerHold, retargetSquad, sendSquad, sideStrength, squadById, stepMatch } from './sim/match.js';
import { COACH_KEY } from './sim/settings.js';
import { applyUpgrade, quoteUpgrade } from './sim/upgrades.js';
import { squadMarkX } from './render/pointer-math.js';
import { PALETTE, ownerPaint } from './render/palette.js';
import { islandBounds, rocksFor, streamBand, streamCrossings, treesFor } from './render/scenery.js';

const app = document.getElementById('app');
const canvas = document.getElementById('view');
const hintEl = document.getElementById('hint');
const sheetEl = document.getElementById('sheet');
const muteBtn = document.getElementById('mute');
const homeEl = document.getElementById('home');
const upgradesEl = document.getElementById('upgrades');
const upHaste = document.getElementById('up-haste');
const upWall = document.getElementById('up-bulwark');
const scoreMine = document.getElementById('score-mine');
const scoreFoe = document.getElementById('score-foe');
const scoresEl = document.querySelector('.scores');
const coachEl = document.getElementById('coach');
const toastEl = document.getElementById('toast');
const sheetTimeEl = document.getElementById('sheet-time');

const stage = createStage(canvas);
const world = createWorld(stage.scene);
const crowds = createCrowds(stage.scene);
const fx = createFx(stage.scene);
let fxOn = true;
const badges = createBadges(document.getElementById('badges'));
const audio = createAudio();

let mapId = 'crossing';
let difficulty = 'normal';
let state = null;
let selected = null;
let dragging = false;
let nextSpawnSfx = 0;
let hqToast = false;

function paintMute() {
  const muted = audio.muted;
  muteBtn.textContent = muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
  muteBtn.setAttribute('aria-label', muted ? '打開聲音' : '靜音');
  muteBtn.classList.toggle('is-muted', muted);
}

function formatPlayed(t) {
  const sec = Math.max(0, Math.floor(t || 0));
  if (sec < 60) return `用咗 ${sec} 秒`;
  const mins = Math.floor(sec / 60);
  const rest = sec % 60;
  return `用咗 ${mins} 分 ${rest} 秒`;
}

function dismissCoach() {
  if (coachEl) coachEl.hidden = true;
  try {
    localStorage.setItem(COACH_KEY, '1');
  } catch {
    /* private mode */
  }
}

function syncCoach() {
  // The bottom hint is the one play instruction. A second bar repeats it.
  if (coachEl) coachEl.hidden = true;
}

function warnHq() {
  if (!toastEl) return;
  let hot = false;
  if (state && state.status === 'playing' && homeEl.hidden) {
    const squads = state.squads;
    for (let i = 0; i < squads.length; i++) {
      const s = squads[i];
      if (s.owner === 'enemy' && s.count > 0 && s.targetId === 'player-hq') {
        hot = true;
        break;
      }
    }
  }
  if (hot === hqToast) return;
  hqToast = hot;
  toastEl.hidden = !hot;
}

function setHint(mode) {
  if (homeEl && !homeEl.hidden) {
    hintEl.hidden = true;
    return;
  }
  hintEl.hidden = false;
  if (!state || state.status !== 'playing') {
    hintEl.textContent = '再戰，或者揀地圖';
    return;
  }
  if (mode === 'drag') hintEl.textContent = '鬆手就出兵';
  else if (mode === 'selected') hintEl.textContent = '可以升級，或者拖去目標出兵';
  else hintEl.textContent = '點自己建築出兵';
}

function showSheet(kind) {
  sheetEl.hidden = false;
  sheetEl.classList.toggle('win', kind === 'win');
  sheetEl.classList.toggle('lose', kind === 'lose');
  document.getElementById('sheet-title').textContent = kind === 'win' ? '勝利' : '戰敗';
  document.getElementById('sheet-kicker').textContent = '戰果';
  document.getElementById('sheet-body').textContent = kind === 'win' ? '攻陷敵方司令部' : '司令部被攻陷';
  if (sheetTimeEl) sheetTimeEl.textContent = formatPlayed(state && state.t);
  setHint('idle');
}

function hideSheet() {
  sheetEl.hidden = true;
  sheetEl.classList.remove('win', 'lose');
}

function syncHud() {
  if (!state) return;
  scoreMine.textContent = String(sideStrength(state, 'player'));
  scoreFoe.textContent = String(sideStrength(state, 'enemy'));
}

function applyFrame() {
  const cam = stage.camera;
  if (homeEl && !homeEl.hidden) frameHomeCamera(cam, cam.aspect);
  else frameDioramaCamera(cam, cam.aspect);
}

function showHome(on) {
  homeEl.hidden = !on;
  if (app) app.classList.toggle('is-home', !!on);
  if (scoresEl) {
    scoresEl.hidden = false;
    scoresEl.classList.toggle('is-preview', !!on);
  }
  if (on) upgradesEl.hidden = true;
  applyFrame();
  syncCoach();
}

function mountMatch(status) {
  state = createMatch({ mapId, difficulty, status });
  world.mount(state.map);
  stage.renderer.shadowMap.needsUpdate = true;
  crowds.setMap(state.map);
  badges.setMap(state.map);
  selected = null;
  dragging = false;
  world.resetDrag();
  hqToast = false;
  if (toastEl) toastEl.hidden = true;
  syncHud();
  syncCoach();
}

function paintChoice(root, attr, value) {
  const buttons = root.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('is-on', buttons[i].getAttribute(attr) === value);
  }
}

function paintUpgrades() {
  const building = selected && state && state.status === 'playing'
    ? buildingById(state, selected)
    : null;
  const show = !!(building && building.owner === 'player' && homeEl.hidden);
  upgradesEl.hidden = !show;
  if (!show) return;
  paintUpgradeButton(upHaste, building, 'haste');
  paintUpgradeButton(upWall, building, 'bulwark');
}

function paintUpgradeButton(btn, building, id) {
  const quote = quoteUpgrade(building, id);
  const level = quote.rank + 1;
  const text = quote.reason === 'max' ? `${quote.label} 滿級` : `${quote.label} ${level}級 · ${quote.cost}`;
  if (btn.textContent !== text) btn.textContent = text;
  btn.disabled = !quote.ok;
}

function buyUpgrade(id) {
  const building = selected && buildingById(state, selected);
  if (!building) return;
  const res = applyUpgrade(building, id);
  audio.sfx(res.ok ? 'spawn' : 'nope');
  paintUpgrades();
}

function consumeEvents(now) {
  const types = new Set();
  for (let i = 0; i < state.events.length; i++) types.add(state.events[i].type);
  if (types.has('win')) {
    audio.sfx('win');
    showSheet('win');
  } else if (types.has('lose')) {
    audio.sfx('lose');
    showSheet('lose');
  } else if (types.has('capture')) {
    audio.sfx('capture');
  } else if (types.has('clash')) {
    audio.sfx('clash');
  }
  if (types.has('spawn') && now > nextSpawnSfx) {
    const own = state.events.some((e) => e.type === 'spawn' && e.owner === 'player');
    if (own) {
      audio.sfx('spawn');
      nextSpawnSfx = now + 900;
    }
  }
}

function dispatch(fromId, toId) {
  if (state.status !== 'playing' || !fromId || !toId || fromId === toId) return false;
  const squad = squadById(state, fromId);
  const res = squad
    ? retargetSquad(state, fromId, toId)
    : sendFromBuilding(fromId, toId);
  if (res.ok) {
    audio.sfx('send');
    selected = null;
    setHint('idle');
    return true;
  }
  audio.sfx('nope');
  return false;
}

function sendFromBuilding(fromId, toId) {
  const from = buildingById(state, fromId);
  if (!from || from.owner !== 'player') return { ok: false };
  return sendSquad(state, fromId, toId, playerHold(from));
}

attachInput(canvas, stage.camera, () => {
  const list = [];
  for (let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    const nodes = state.nodes || NODES;
    const p = nodes[b.node];
    list.push({ id: b.id, owner: b.owner, kind: b.kind, x: p.x, z: p.z });
  }
  for (let i = 0; i < state.squads.length; i++) {
    const s = state.squads[i];
    if (s.count <= 0) continue;
    list.push({
      id: s.id,
      owner: s.owner,
      kind: 'squad',
      x: squadMarkX(s.x, s.owner, s.mode),
      z: s.z,
    });
  }
  return list;
}, {
  unlock() {
    audio.unlock();
  },
  onTap(id) {
    if (state.status !== 'playing') return;
    if (!id) {
      selected = null;
      setHint('idle');
      return;
    }
    const tappedSquad = squadById(state, id);
    if (tappedSquad && tappedSquad.owner !== 'player') return;
    if (selected && selected !== id) {
      const fromSquad = squadById(state, selected);
      const fromBuilding = buildingById(state, selected);
      const fromPlayer = (fromSquad && fromSquad.owner === 'player')
        || (fromBuilding && fromBuilding.owner === 'player');
      if (fromPlayer) {
        dispatch(selected, id);
        return;
      }
    }
    const building = buildingById(state, id);
    if (building && building.owner === 'player') {
      dismissCoach();
      selected = selected === id ? null : id;
      setHint(selected ? 'selected' : 'idle');
      return;
    }
    const squad = squadById(state, id);
    if (squad && squad.owner === 'player') {
      selected = selected === id ? null : id;
      setHint(selected ? 'selected' : 'idle');
    }
  },
  onDragStart(id) {
    dragging = true;
    selected = id;
    const building = buildingById(state, id);
    if (building && building.owner === 'player') dismissCoach();
    setHint('drag');
  },
  onDragMove(worldPoint, hoverId) {
    const squad = squadById(state, selected);
    world.setDrag(selected, worldPoint, hoverId, squad ? { x: squad.x, z: squad.z } : null);
  },
  onDragEnd(fromId, toId) {
    dragging = false;
    world.resetDrag();
    if (fromId && toId) dispatch(fromId, toId);
    setHint(selected ? 'selected' : 'idle');
  },
});

muteBtn.addEventListener('pointerdown', (ev) => {
  ev.stopPropagation();
});
muteBtn.addEventListener('click', (ev) => {
  ev.stopPropagation();
  audio.unlock();
  audio.toggle();
  paintMute();
});
function bindTap(el, fn) {
  el.addEventListener('pointerdown', (ev) => {
    ev.stopPropagation();
  });
  el.addEventListener('click', (ev) => {
    ev.stopPropagation();
    audio.unlock();
    fn();
  });
}

function cssHex(n) {
  return `#${n.toString(16).padStart(6, '0')}`;
}

function mapThumb(map) {
  const thumb = document.createElement('canvas');
  thumb.className = 'map-thumb';
  const W = 280;
  const H = 188;
  thumb.width = W;
  thumb.height = H;
  const g = thumb.getContext('2d');
  const box = islandBounds(map);
  const trees = treesFor(map);
  const rocks = rocksFor(map);
  for (let i = 0; i < trees.length; i++) {
    const t = trees[i];
    box.minX = Math.min(box.minX, t.x - 0.35);
    box.maxX = Math.max(box.maxX, t.x + 0.35);
    box.minZ = Math.min(box.minZ, t.z - 0.35);
    box.maxZ = Math.max(box.maxZ, t.z + 0.35);
  }
  const pad = 16;
  const spanX = Math.max(0.001, box.maxX - box.minX);
  const spanZ = Math.max(0.001, box.maxZ - box.minZ);
  const scaleY = (H - pad * 2) / spanZ;
  const scaleX = Math.min((W - pad * 2) / spanX, scaleY * 1.65);
  const midX = (box.minX + box.maxX) / 2;
  // +z is the near / player side, which sits at the bottom of the thumbnail.
  function pt(p) {
    return {
      x: W / 2 + (p.x - midX) * scaleX,
      y: pad + (p.z - box.minZ) * scaleY,
    };
  }

  g.fillStyle = cssHex(PALETTE.meadow);
  g.fillRect(0, 0, W, H);
  g.fillStyle = cssHex(PALETTE.meadowDeep);
  g.fillRect(0, 0, W, H * 0.16);
  g.fillRect(0, H * 0.84, W, H * 0.16);
  g.fillRect(0, 0, W * 0.12, H);
  g.fillRect(W * 0.88, 0, W * 0.12, H);
  g.globalAlpha = 0.55;
  g.fillStyle = cssHex(PALETTE.sand);
  g.beginPath();
  g.ellipse(W * 0.5, H * 0.28, W * 0.08, H * 0.07, 0, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.ellipse(W * 0.46, H * 0.74, W * 0.1, H * 0.06, 0, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;

  const ownerById = {};
  const buildings = map.buildings || [];
  for (let i = 0; i < buildings.length; i++) ownerById[buildings[i].id] = buildings[i].owner;
  const zones = map.zones || [];
  g.globalAlpha = 0.22;
  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    const owner = ownerById[z.buildingId];
    const paint = owner ? ownerPaint(owner) : null;
    const at = pt(z);
    g.beginPath();
    g.ellipse(at.x, at.y, Math.max(10, z.rx * scaleX * 0.85), Math.max(8, z.rz * scaleY * 0.9), 0, 0, Math.PI * 2);
    g.fillStyle = cssHex(paint ? paint.slab : PALETTE.meadowDeep);
    g.fill();
  }
  g.globalAlpha = 1;

  const band = streamBand(map);
  const waterAt = pt({ x: band.x, z: band.z });
  const thick = Math.max(18, Math.min(H * 0.2, band.depth * scaleY * 0.55));
  const bow = Math.max(5, thick * 0.35);
  const shore = thick * 0.42;
  function riverPoly(half, dy) {
    const steps = 10;
    g.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = (W * i) / steps;
      const wave = Math.sin((i / steps) * Math.PI) * bow;
      g.lineTo(x, waterAt.y - half + wave + dy);
    }
    for (let i = steps; i >= 0; i--) {
      const x = (W * i) / steps;
      const wave = Math.sin((i / steps) * Math.PI) * bow;
      g.lineTo(x, waterAt.y + half + wave + dy);
    }
    g.closePath();
    g.fill();
  }
  g.fillStyle = cssHex(PALETTE.sand);
  riverPoly(thick / 2 + shore, 0);
  g.fillStyle = cssHex(0x6a5c44);
  riverPoly(thick / 2 + shore * 0.45, 0);
  g.fillStyle = cssHex(PALETTE.stream);
  riverPoly(thick / 2, 0);
  g.fillStyle = cssHex(0x6eb4d4);
  riverPoly(thick * 0.22, bow * 0.15);

  function frontBand(yOff, color) {
    const steps = 12;
    g.fillStyle = color;
    g.globalAlpha = 0.92;
    g.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = (W * i) / steps;
      const wave = Math.sin((i / steps) * Math.PI) * 16;
      g.lineTo(x, waterAt.y + wave + yOff);
    }
    for (let i = steps; i >= 0; i--) {
      const x = (W * i) / steps;
      const wave = Math.sin((i / steps) * Math.PI) * 16;
      g.lineTo(x, waterAt.y + wave + yOff + 4);
    }
    g.closePath();
    g.fill();
    g.globalAlpha = 1;
  }
  const land = thick / 2 + shore + 10;
  frontBand(land, cssHex(PALETTE.player.main));
  frontBand(-land - 4, cssHex(PALETTE.enemy.main));

  const nodes = map.nodes || {};
  const roadW = Math.max(11, 0.72 * scaleX);
  g.fillStyle = cssHex(PALETTE.road);
  function fillRoad(a, b) {
    const pa = pt(a);
    const pb = pt(b);
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * roadW * 0.5;
    const ny = (dx / len) * roadW * 0.5;
    g.beginPath();
    g.moveTo(pa.x + nx, pa.y + ny);
    g.lineTo(pb.x + nx, pb.y + ny);
    g.lineTo(pb.x - nx, pb.y - ny);
    g.lineTo(pa.x - nx, pa.y - ny);
    g.closePath();
    g.fill();
  }
  const bank = Math.max(0.42, band.depth * 0.85);
  const seen = new Set();
  const graph = map.graph || {};
  const keys = Object.keys(graph);
  for (let i = 0; i < keys.length; i++) {
    const nexts = graph[keys[i]] || [];
    const a = nodes[keys[i]];
    for (let j = 0; j < nexts.length; j++) {
      const bId = nexts[j];
      const key = keys[i] < bId ? `${keys[i]}|${bId}` : `${bId}|${keys[i]}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const b = nodes[bId];
      if (!a || !b) continue;
      if (a.z * b.z < -0.0001) {
        const t = (0 - a.z) / (b.z - a.z);
        const x = a.x + (b.x - a.x) * t;
        fillRoad(a, { x, z: a.z > 0 ? bank : -bank });
        fillRoad(b, { x, z: b.z > 0 ? bank : -bank });
      } else {
        fillRoad(a, b);
      }
    }
  }

  const crossings = streamCrossings(map);
  for (let i = 0; i < crossings.length; i++) {
    const at = pt(crossings[i]);
    const bw = Math.max(18, roadW + 8);
    const bh = thick + 6;
    g.fillStyle = cssHex(PALETTE.bridge);
    g.fillRect(at.x - bw / 2, at.y - bh / 2, bw, bh);
    g.fillStyle = cssHex(PALETTE.roadEdge);
    g.fillRect(at.x - bw / 2, at.y - bh / 2, 3, bh);
    g.fillRect(at.x + bw / 2 - 3, at.y - bh / 2, 3, bh);
  }

  for (let i = 0; i < rocks.length; i++) {
    const at = pt(rocks[i]);
    const r = Math.max(5, rocks[i].s * scaleY * 0.7);
    g.fillStyle = cssHex(PALETTE.rock);
    g.beginPath();
    g.ellipse(at.x, at.y, r * 1.25, r * 0.8, 0, 0, Math.PI * 2);
    g.fill();
  }

  for (let i = 0; i < trees.length; i++) {
    const t = trees[i];
    const at = pt(t);
    const h = Math.max(26, t.s * scaleY * 2.1);
    const w = h * 0.46;
    g.fillStyle = cssHex(PALETTE.trunk);
    g.fillRect(at.x - 1.5, at.y - 2, 3, 6);
    g.fillStyle = cssHex(t.color);
    g.beginPath();
    g.moveTo(at.x, at.y - h);
    g.lineTo(at.x + w, at.y + 2);
    g.lineTo(at.x - w, at.y + 2);
    g.fill();
    g.fillStyle = cssHex(PALETTE.leaf);
    g.beginPath();
    g.moveTo(at.x, at.y - h * 0.72);
    g.lineTo(at.x + w * 0.62, at.y - h * 0.22);
    g.lineTo(at.x - w * 0.62, at.y - h * 0.22);
    g.fill();
  }

  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    const p = nodes[b.node];
    if (!p) continue;
    const at = pt(p);
    const paint = ownerPaint(b.owner);
    const u = Math.max(15, Math.min(scaleX, scaleY) * 1.35);
    if (b.kind === 'hq') {
      g.fillStyle = cssHex(PALETTE.sand);
      g.fillRect(at.x - u * 1.25, at.y - u * 0.2, u * 2.5, u * 0.85);
      g.fillStyle = cssHex(PALETTE.concrete);
      g.fillRect(at.x - u * 0.95, at.y - u * 0.55, u * 1.9, u * 0.55);
      g.fillRect(at.x - u * 0.7, at.y - u * 0.95, u * 1.4, u * 0.45);
      g.fillStyle = cssHex(paint.main);
      g.fillRect(at.x - u * 0.78, at.y - u * 1.02, u * 1.56, u * 0.16);
      g.fillStyle = cssHex(PALETTE.metal);
      g.fillRect(at.x - u * 0.08, at.y - u * 1.7, u * 0.16, u * 0.75);
      g.beginPath();
      g.arc(at.x + u * 0.42, at.y - u * 1.35, Math.max(2, u * 0.12), 0, Math.PI * 2);
      g.fill();
      g.fillStyle = cssHex(paint.flag);
      g.fillRect(at.x - u * 0.08, at.y - u * 1.85, u * 0.42, u * 0.22);
    } else {
      g.fillStyle = cssHex(PALETTE.sand);
      g.fillRect(at.x - u * 1.45, at.y - u * 0.05, u * 0.28, u * 0.4);
      g.fillRect(at.x + u * 1.17, at.y - u * 0.05, u * 0.28, u * 0.4);
      g.fillStyle = cssHex(PALETTE.concrete);
      g.fillRect(at.x - u * 1.15, at.y - u * 0.15, u * 2.3, u * 0.45);
      g.fillRect(at.x - u * 1.05, at.y - u * 0.42, u * 2.1, u * 0.32);
      g.fillStyle = cssHex(paint.main);
      g.fillRect(at.x - u * 1.12, at.y - u * 0.58, u * 2.24, u * 0.16);
      g.fillStyle = cssHex(PALETTE.ink);
      g.fillRect(at.x - u * 0.28, at.y - u * 0.22, u * 0.56, u * 0.28);
      g.fillStyle = cssHex(paint.flag);
      g.fillRect(at.x - u * 0.95, at.y - u * 0.78, u * 0.28, u * 0.16);
    }
  }
  return thumb;
}

const mapHost = document.getElementById('maps');
const diffHost = document.getElementById('diffs');
for (let i = 0; i < MAP_LIST.length; i++) {
  const map = MAP_LIST[i];
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('data-map', map.id);
  btn.appendChild(mapThumb(map));
  const name = document.createElement('span');
  name.className = 'map-name';
  name.textContent = map.name;
  const blurb = document.createElement('small');
  blurb.textContent = map.blurb;
  btn.append(name, blurb);
  bindTap(btn, () => {
    mapId = map.id;
    paintChoice(mapHost, 'data-map', mapId);
    mountMatch('menu');
    showHome(true);
    setHint('idle');
  });
  mapHost.appendChild(btn);
}
const diffIds = ['easy', 'normal', 'hard'];
for (let i = 0; i < diffIds.length; i++) {
  const id = diffIds[i];
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('data-diff', id);
  btn.textContent = DIFFICULTIES[id].label;
  bindTap(btn, () => {
    difficulty = id;
    paintChoice(diffHost, 'data-diff', difficulty);
  });
  diffHost.appendChild(btn);
}

bindTap(document.getElementById('start'), () => {
  mountMatch('playing');
  hideSheet();
  showHome(false);
  setHint('idle');
});
function backToMaps() {
  hideSheet();
  showHome(true);
  mountMatch('menu');
  setHint('idle');
}
bindTap(document.getElementById('home-btn'), backToMaps);
bindTap(document.getElementById('sheet-map'), backToMaps);
bindTap(upHaste, () => buyUpgrade('haste'));
bindTap(upWall, () => buyUpgrade('bulwark'));
if (coachEl) bindTap(coachEl, dismissCoach);

document.getElementById('retry').addEventListener('click', () => {
  audio.unlock();
  mountMatch('playing');
  hideSheet();
  showHome(false);
  setHint('idle');
});

function resize() {
  stage.resize();
  applyFrame();
}

const ro = new ResizeObserver(resize);
ro.observe(app);
resize();
paintMute();
paintChoice(diffHost, 'data-diff', difficulty);
paintChoice(mapHost, 'data-map', mapId);
mountMatch('menu');
showHome(true);
setHint('idle');
syncHud();

let last = performance.now();
let fpsFrames = 0;
let fpsWindow = performance.now();
let fpsSeen = 0;
function noteFps(now) {
  fpsSeen += 1;
  // The first moments include shader compile. Do not spend the VFX budget on that.
  if (fpsSeen < 90) {
    fpsFrames = 0;
    fpsWindow = now;
    return;
  }
  fpsFrames += 1;
  const span = now - fpsWindow;
  if (span < 1600) return;
  const fps = (fpsFrames * 1000) / span;
  fpsFrames = 0;
  fpsWindow = now;
  // Bloom stays off. Under 40 fps, drop particles, then the shadow map.
  if (fps >= 40) return;
  if (fxOn) {
    fxOn = false;
    fx.setEnabled(false);
    return;
  }
  if (stage.shadowsOn) stage.setShadows(false);
}
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (state && state.status === 'playing') {
    stepMatch(state, dt);
    consumeEvents(now);
  }
  const t = now / 1000;
  const menuOpen = (homeEl && !homeEl.hidden) || (sheetEl && !sheetEl.hidden);
  const badgeHost = document.getElementById('badges');
  if (badgeHost) badgeHost.hidden = menuOpen;
  if (state) {
    world.update(t, state, dragging ? null : selected);
    crowds.update(state);
    fx.update(dt, state);
    if (!menuOpen) badges.update(state, stage.camera, canvas);
    paintUpgrades();
    syncHud();
    warnHq();
  }
  stage.renderer.render(stage.scene, stage.camera);
  noteFps(now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

window.__BL = {
  get state() {
    return state;
  },
  pick: 'screen-44',
  send(fromId, toId) {
    return sendSquad(state, fromId, toId);
  },
  retarget(squadId, targetId) {
    return retargetSquad(state, squadId, targetId);
  },
  step(seconds) {
    stepMatch(state, seconds);
    if (state.status === 'win' || state.status === 'lose') showSheet(state.status);
  },
  point(id) {
    return badges.clientPoint(id, stage.camera, canvas);
  },
  facingDot() {
    return crowds.facingDot();
  },
  quality() {
    return { shadows: stage.shadowsOn, fx: fxOn, software: stage.software };
  },
  setShadows(on) {
    stage.setShadows(!!on);
  },
  start(nextMap, nextDiff) {
    if (nextMap) mapId = nextMap;
    if (nextDiff) difficulty = nextDiff;
    mountMatch('playing');
    hideSheet();
    showHome(false);
    setHint('idle');
  },
  reset() {
    mountMatch('playing');
    hideSheet();
    showHome(false);
    setHint('idle');
  },
};

window.addEventListener('error', (ev) => {
  const note = document.createElement('pre');
  note.id = 'boot-error';
  note.textContent = ev.message || '畫面起動失敗';
  app.appendChild(note);
});
