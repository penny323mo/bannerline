# 據點號令 · Bannerline — Art Style (v2)

**Authority:** This file + PLAN.md §4 supersede the old “bright soft toy diorama” brief.  
**Trigger:** Penny (2026-10-31 21:53 Asia/Macau) — live build reads 「又小學生lv」 (too childish / primary-school).  
**Goal:** Mature mobile military strategy, Top-Force-*ad*-like in *genre feel* only — never copy assets, branding, nation labels, or the title 「Top Force / 最強統帥」.

Still: bright + readable on iPhone 390×844; no gore; no real-world nation / ideology labels; original meshes only.

---

## 1. Tone (what to hit)

| Do | Don’t |
|----|-------|
| Compact theatre-of-operations map, clear command feel | Pastel toy island / soft candy diorama |
| Realistic-*ish* low-poly soldiers & light vehicles | Chibi blobs, rounded “toy brick” people |
| Fortified HQ clearly different from barracks | Same chunky rounded block for every building |
| Muted terrain + **strong** faction colours | Rainbow bridges, neon candy borders, cream trees as hero props |
| Sharp military HUD panels | Giant pastel pills, soft bubble chrome |
| Formal spoken Cantonese UI (司令部 / 兵營 / 出兵 / 攻陷) | Cute / playground copy |

Elevator line (keep): 「兩邊陣營出兵，拖一拖就攻過去。人數對撞、數字相減，攻陷對方司令部就贏！」

---

## 2. Palette (replace `src/render/palette.js` + CSS vars)

Terrain stays **muted** so units/buildings pop. Faction paints stay **strong**, not pastel.

Suggested hex (coder may tune ±5% for lighting; keep contrast):

| Token | Hex | Role |
|-------|-----|------|
| sky | `#7FA8C4` | Cool clear day, not baby-blue pastel |
| water | `#3E6F8F` | Deep bay / river |
| meadow / ground | `#6B7A4E` → `#5A6B42` | Olive drab / dry grass |
| sand / dirt | `#8A7A5C` | Dust roads, pads |
| road | `#5C5348` | Packed earth / asphalt strip |
| rock | `#6E6A63` | Low ridges |
| leaf / tree | `#3F5A3A` + `#2F4530` | Real green cones — not white/cream candy |
| ink | `#1A2220` | HUD text |
| panel | `#1C2422` @ ~88% opacity | HUD chrome fill |
| panel-edge | `#9AA39A` | Thin hard border |

**Player (綠軍)** — saturated command green, not mint candy:

- main `#2F9E5B`, deep `#1B6B3D`, glow `#3DCE7A`, slab `#3A5C3F`

**Enemy (紅軍)** — strong operational red, not coral pink:

- main `#C43C32`, deep `#8E241C`, glow `#E25548`, slab `#5C3532`

Ownership border: **two-tone only** — player-side green glow + enemy-side red glow meeting at a hard edge. **No** yellow / rainbow / multi-stop gradient middle. Bridges use neutral stone/metal greys; never rainbow.

---

## 3. Buildings (silhouette must read at 390px)

**司令部 (HQ)** — fortified command bunker:

- Low wide bunker mass, angled concrete faces, sandbag or berm lip
- Roof: dish / mast / antenna cluster (readable silhouette)
- Faction flag + small “司令部” chip
- Stronger perimeter pad / trench ring than barracks
- When under attack: pulse deep faction glow + 「危」 toast (keep behaviour)

**兵營 (Barracks)** — troop factory, clearly subordinate:

- Rectangular block / hangar with roll door or slit vents
- Shorter than HQ; no dish; optional small chimney / crate stack
- Spawn point marker on the pad
- Upgrade chips (加速 / 加固) sit on a hard square/diamond affordance, not a soft pastel bubble

Do **not** reuse one rounded “toy hall” mesh for both.

---

## 4. Units & badges

- Squads = dense **soldier blocks** (helmeted torso + rifle silhouette), instanced; optional light vehicle as upgrade tier
- Colour = solid faction main; tiny faces optional but not chibi
- Floating badge: **hard circle or short hex** with rifle glyph + crisp white count (not candy pill)
- Marching pills smaller than building badges; building badges win taps; de-overlap on bridges

---

## 5. Lighting & materials

- Clear directional sun + modest ambient (readable, not blown-out pastel)
- Lambert / simple Phong OK; slight roughness on concrete; metal trim on HQ dish
- Soft contact shadows under buildings/squads (keep ≥50 fps; prefer cheap blobs / one shadow plane)
- No bloom rainbows, no glitter particles as default ambience

---

## 6. HUD / UI chrome (`src/style.css` + overlay)

- Sharp panels: 2–4px radius max (or 0); thin hard borders; dark translucent fills
- Primary buttons ≥44px; semi-bold zh-HK labels
- Home: 「揀地圖」「難度：易／中／難」「出戰」
- In-match: 「出兵」「加速」「加固」「靜音」with speaker glyph 🔊/🔇 + aria-label (not ambiguous 靜音-only when muted)
- Result sheet: win/lose title, **match time**, one-line reason (e.g. 「攻陷敵方司令部」/「司令部被攻陷」), 「再戰」「地圖」
- Coach marks: short formal line, e.g. 「撳自己建築可以升級」— panel style, not cartoon bubble
- Avoid: oversized rounded pills, pastel gradients, rainbow strokes, playground emoji spam

---

## 7. Copy register (zh-HK, formal spoken)

Preferred terms: 據點號令、司令部、兵營、出兵、行軍、對撞、攻陷、升級、加速、加固、靜音、再戰、揀地圖、難度.  
Keep labels short; stay consistent across home / HUD / result.

---

## 8. Acceptance (art pass)

Ship the restyle only when **all** are true at 390×844 (real taps + screenshot):

1. Palette in `palette.js` + CSS matches muted terrain / strong faction table above (no pastel meadow, no cream hero trees, no rainbow border/bridge).
2. HQ vs barracks silhouettes are unmistakably different (bunker+antenna vs hangar).
3. Squads read as soldiers (rifle badge), not toy bricks.
4. HUD uses sharp military panels; mute uses 🔊/🔇.
5. Copy is consistent formal Cantonese.
6. M1/M2 gameplay intact; `npm test` green; ≥50 fps target with ≥200 instanced soldiers; live `static/app.js` rebuilt for Pages.
7. Side-by-side vs old toy look would not read as “primary-school” — supervisor audits before Penny gets the link.

Reference (local only, never ship branding): `assets/ref/inspiration-ad.png`.
