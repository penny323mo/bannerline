import './style.css';
import { createAudio } from './audio.js';
import { createBadges } from './render/badges.js';
import { createCrowds } from './render/crowds.js';
import { attachInput } from './render/input.js';
import { createStage } from './render/stage.js';
import { createWorld } from './render/world.js';
import { NODES } from './sim/mapdata.js';
import { buildingById, createMatch, sendSquad, sideStrength, stepMatch } from './sim/match.js';

const app = document.getElementById('app');
const canvas = document.getElementById('view');
const hintEl = document.getElementById('hint');
const sheetEl = document.getElementById('sheet');
const muteBtn = document.getElementById('mute');
const scoreMine = document.getElementById('score-mine');
const scoreFoe = document.getElementById('score-foe');

const stage = createStage(canvas);
const world = createWorld(stage.scene);
const crowds = createCrowds(stage.scene);
const badges = createBadges(document.getElementById('badges'));
const audio = createAudio();

let state = createMatch();
let selected = null;
let dragging = false;
let nextSpawnSfx = 0;

function paintMute() {
  const muted = audio.muted;
  muteBtn.textContent = muted ? '靜音' : '有聲';
  muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
  muteBtn.setAttribute('aria-label', muted ? '打開聲音' : '靜音');
  muteBtn.classList.toggle('is-muted', muted);
}

function setHint(mode) {
  if (state.status !== 'playing') {
    hintEl.textContent = '撳再戰，重開一局';
    return;
  }
  if (mode === 'drag') hintEl.textContent = '鬆手就放出呢隊兵';
  else if (mode === 'selected') hintEl.textContent = '拖去目標，或者點目標出兵';
  else hintEl.textContent = '點我軍建築，再點目標出兵';
}

function showSheet(kind) {
  sheetEl.hidden = false;
  sheetEl.classList.toggle('win', kind === 'win');
  sheetEl.classList.toggle('lose', kind === 'lose');
  document.getElementById('sheet-title').textContent = kind === 'win' ? '勝利' : '失敗';
  document.getElementById('sheet-kicker').textContent = kind === 'win' ? '綠旗站住' : '紅旗打入';
  document.getElementById('sheet-body').textContent = kind === 'win' ? '攻陷咗對方司令部' : '我方司令部失守';
}

function hideSheet() {
  sheetEl.hidden = true;
  sheetEl.classList.remove('win', 'lose');
}

function syncHud() {
  scoreMine.textContent = String(sideStrength(state, 'player'));
  scoreFoe.textContent = String(sideStrength(state, 'enemy'));
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
  const from = buildingById(state, fromId);
  if (!from || from.owner !== 'player') return false;
  const res = sendSquad(state, fromId, toId);
  if (res.ok) {
    audio.sfx('send');
    selected = null;
    setHint('idle');
    return true;
  }
  audio.sfx('nope');
  return false;
}

attachInput(canvas, stage.camera, () => {
  const list = [];
  for (let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    const p = NODES[b.node];
    list.push({ id: b.id, owner: b.owner, x: p.x, z: p.z });
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
    const building = buildingById(state, id);
    if (selected && selected !== id) {
      const from = buildingById(state, selected);
      if (from && from.owner === 'player') {
        dispatch(selected, id);
        return;
      }
    }
    if (building && building.owner === 'player') {
      selected = selected === id ? null : id;
      setHint(selected ? 'selected' : 'idle');
    }
  },
  onDragStart(id) {
    dragging = true;
    selected = id;
    setHint('drag');
  },
  onDragMove(worldPoint, hoverId) {
    world.setDrag(selected, worldPoint, hoverId);
  },
  onDragEnd(fromId, toId) {
    dragging = false;
    world.resetDrag();
    if (fromId && toId) dispatch(fromId, toId);
    else setHint(selected ? 'selected' : 'idle');
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

document.getElementById('retry').addEventListener('click', () => {
  audio.unlock();
  state = createMatch();
  selected = null;
  dragging = false;
  world.resetDrag();
  hideSheet();
  setHint('idle');
  syncHud();
});

function resize() {
  stage.resize();
}

const ro = new ResizeObserver(resize);
ro.observe(app);
resize();
paintMute();
setHint('idle');
syncHud();

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (state.status === 'playing') {
    stepMatch(state, dt);
    consumeEvents(now);
  }
  const t = now / 1000;
  world.update(t, state, dragging ? null : selected);
  crowds.update(state);
  badges.update(state, stage.camera, canvas);
  syncHud();
  stage.renderer.render(stage.scene, stage.camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

window.__BL = {
  get state() {
    return state;
  },
  send(fromId, toId) {
    return sendSquad(state, fromId, toId);
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
  reset() {
    state = createMatch();
    selected = null;
    hideSheet();
    setHint('idle');
  },
};

window.addEventListener('error', (ev) => {
  const note = document.createElement('pre');
  note.id = 'boot-error';
  note.textContent = ev.message || '畫面起動失敗';
  app.appendChild(note);
});
