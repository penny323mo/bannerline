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

## Round 6 fixes

- The 390×844 review found no critical, major, or minor defects. The glow, headquarters trickle and pulse, Cantonese sheets, and tower-versus-hall silhouettes were already in `static/app.js`. Tests stayed at 46/46.

## Round 7 fixes (M2 polish)

- The first match shows 「撳自己建築可以升級」. A player building that can pay wears an ⬆ chip, and choosing it opens 加速 and 加固.
- 中 keeps enemy marches off the player headquarters for 20 seconds, and 難 for 12. The toast 敵軍打緊司令部 appears when a squad is heading there. 易 still attacks, in squads of at most 8. On 中, sending both 雙橋 barracks as the opening wave comes due can still win.
- The ownership edge is solid mint on the player side and solid coral on the enemy side, with the cream bridge left visible beside it.
- Count pills spread apart. A squad badge moves clear of a building, and the building keeps the tap.
- Mute shows 🔊 or 🔇, and the label says the Cantonese action. The map button says 揀地圖. The result sheet adds the match time under the one-line reason.
- Node tests cover a 40-second attack on every difficulty, the opening grace, and upgrade affordance. 51 tests passed. Rebuilt `static/app.js`. At 390×844 the match averaged about 57 fps.

## Round 8 fixes (art restyle — mature military)

- Terrain is muted olive, dust, and grey water. Player paint is command green and enemy paint is operational red. The ownership edge is those two glows on a hard split, and the bridge is neutral grey.
- The headquarters is a wide bunker with a dish and an antenna. The barracks is a lower hangar with a roll door and no dish.
- Squads are helmeted soldiers with a rifle aimed along local −z. Count badges are hard dark panels with a rifle mark, and the ⬆ chip stays on buildings that can pay.
- HUD panels use a 2px radius, a dark fill, and a hard edge. Mute stays 🔊 or 🔇. The start button says 出戰, and the result sheet says 攻陷敵方司令部 or 司令部被攻陷 plus the match time.
- The round 7 coach, headquarters grace, danger toast, and pill separation stay. 52 tests passed. Rebuilt `static/app.js`. At 390×844 the match averaged about 59 fps.

## Round 9 fixes

- Count badges are short hexes. The rifle mark and the tabular count stay, and the ⬆ chip sits clear of the label.
- The result sheet adds 地圖 beside 再戰. It returns to the map list. The post-match hint says 再戰，或者揀地圖.
- 52 tests passed. Rebuilt `static/app.js`.

## Round 10 fixes

- The 390×844 review shipped with no critical, major, or minor defects. The military palette, bunker and hangar, soldier squads, hex badges, and the result-sheet 地圖 button were already in `static/app.js`. Tests stayed at 52/52.

## Round 11 fixes

- 中 holds a threatened barracks and counter-attacks from the headquarters. A single full-barracks rush on 對岸 loses. A scripted measured player still wins, and those wins take more than a minute. 易 still falls to one barracks rush. 難 stays harder than 中. Headquarters grace and the「敵軍打緊司令部」toast stay.
- The sky is overcast grey (`#8A918C`) and the sea is grey steel (`#5C676E`). The frontier is a thin hard green|red split in the faction colours, at a fixed opacity.
- Squad soldiers are about 1.4× larger on the same instanced meshes. Headquarters and barracks gain parapets, wing walls, and corner posts. The ⬆ chip is 22px. Unit badges hide while the map picker or the result sheet is open. 據點號令 sits on a dark plate.
- 54 tests passed. Rebuilt `static/app.js`. At 390×844 a warmed match averaged 59.6 fps.

## Round 12 fixes

- The 390×844 review shipped with no critical, major, or minor defects. The round-8 art list stays closed on this bundle: muted olive terrain, bunker and hangar, soldier squads, sharp HUD, formal zh-HK copy, and the rebuilt `static/app.js`. Round-11 balance, grace, and the upgrade chip stay. Tests stayed at 54/54.

## Round 13 fixes

- On 中 a threatened barracks holds, and the nearest neighbour sends one reinforcement (at most 24) and then a counter (at most 16). After that pair the headquarters keeps the rest of its pile. A player who sends from every owned building, resends as troops return, and chains a capture into the enemy headquarters loses; a relief squad and a counter both appear inside 40s, so the chain is not a win before 90s. A measured player still wins, and those wins take more than a minute. The same measured line on 難 wins later, between two and four minutes, and is still playing at 45s. 易 still falls to one barracks rush. Headquarters grace stays 36/20/12, and the「敵軍打緊司令部」toast stays. Idling still loses the headquarters. A double send on 雙橋 still wins on 中.
- The ⬆ chip is a 26px plate with a 22px glyph, centered in the hex, clear of the count. Squad 行軍 and 交戰 are 12px. Troop totals stay off the home screen and appear once the match is running.
- Soldiers stay on the instanced mesh. The torso is darker, the helmet is larger, and the rifle is longer and darker, at instance scale 1.8. Shadows and antialiasing stay off.
- 56 tests passed. Rebuilt `static/app.js`. At 390×844 a warmed match averaged 60.0 fps, p95 about 16.8ms.
