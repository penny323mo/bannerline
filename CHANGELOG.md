# Changelog

## M1 — playable vertical slice

- Soft low-poly island, mint against coral, glowing ownership line.
- Headquarters and barracks. Barracks refill over time; count badges follow the crowds.
- Tap-tap or drag to send a whole stack. Instanced soldiers march, clash by subtraction, and capture buildings.
- Win sheet when the enemy headquarters falls. Lose sheet when yours does.
- Mute toggle persisted in `localStorage`.
- Node tests for combat math, capture, march, and match outcomes.

## Round 0 — scaffold

- PLAN.md, orch.json, build prompt, GitHub Pages target.

## Round 1 fixes

- Count pills, roofs, and flags take a tap or a drag-release within 44 CSS pixels. The ground disc still selects the building foot.
- A drag that does not send puts the hint back on the real selection.
- A friendly arrival fills a building only up to its cap. Extra soldiers stay with the squad.
- A player order leaves a small garrison. The enemy barracks waits until after the player barracks first reads 滿, and a 14-troop enemy headquarters can still probe.
- The ownership glow reuses one zone list and one segment buffer.

## Round 2 fixes

- Rebuilt `static/app.js` so the shipped page uses the 44px screen pick for count pills, roofs, and flags.
- A friendly squad waiting outside a full building can be tapped or dragged to another building. That order retargets the squad and leaves the garrison where it is.

## Round 3 fixes

- A squad standing on a building keeps its count pill. That building's roof, flag, and foot stay on the building.
- Rebuilt `static/app.js` so the shipped page uses that pick.

## Round 4 fixes

- The 390×844 review shipped with the round 3 pick already in `static/app.js`. Tests stayed at 37/37.

## Round 5 fixes (M2)

- The ownership edge is a green-to-red glow and it moves when a slab is captured. A headquarters under siege pulses and reads 危, and it refills with a slow trickle. The headquarters is a tower and the barracks is a long hall. Win and lose sheets share one Cantonese register.
- Home screen offers 對岸, 長路, and 雙橋, plus 易/中/難. Each map has a personality. The enemy defends an incoming march, and a thin garrison still sallies so a siege cannot leave it idle.
- 加速 and 加固 can be bought mid-match from a friendly building. The cost is troops, and the mark shows on that building.
- Shadows bake when the island mounts, and static props share meshes, so a full match stays at or above 50 fps at 390×844.
- Node tests cover AI orders, upgrade math, and the map JSON. Rebuilt `static/app.js`.
