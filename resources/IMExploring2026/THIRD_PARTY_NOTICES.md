# Third-party notices

## MediaPipe Holistic

- Package: `@mediapipe/holistic`
- Version: `0.5.1675471629`
- Copyright: Google LLC and MediaPipe contributors
- License: Apache License 2.0
- Upstream: <https://github.com/google-ai-edge/mediapipe>
- Package registry: <https://www.npmjs.com/package/@mediapipe/holistic>

The redistributed runtime, WebAssembly binaries, packed model assets, graph, and lite pose model are in `vendor/mediapipe/holistic/`. The upstream license is included at `vendor/mediapipe/holistic/LICENSE`.

The full and heavy pose landmark models were intentionally not redistributed because this kiosk selects `modelComplexity: 0` (the lite model). Both SIMD and non-SIMD WebAssembly runtimes are included for browser compatibility.

## MediaPipe Hands

- Package: `@mediapipe/hands`
- Version: `0.4.1675469240`
- Copyright: Google LLC and MediaPipe contributors
- License: Apache License 2.0
- Upstream: <https://github.com/google-ai-edge/mediapipe>
- Package registry: <https://www.npmjs.com/package/@mediapipe/hands>

The redistributed runtime, WebAssembly binaries, packed model assets, graph, and lite hand-landmark model are in `vendor/mediapipe/hands/`. The upstream license is included at `vendor/mediapipe/hands/LICENSE`. The full hand-landmark model was intentionally omitted because this kiosk selects `modelComplexity: 0`. Both SIMD and non-SIMD WebAssembly runtimes are included for browser compatibility.

## Montcalm-inspired styling and Plus Jakarta Sans

The green/gold palette and typography are inspired by the public [Montcalm Community College website](https://www.montcalm.edu/) and the matching Cable Clash theme. Website reference checked for Cable Clash on 2026-11-06. Colors include green `#117B47`, dark green `#074225`, green-black `#102818`, gold `#FFCA05`, lime `#B1D33D`, and off-white `#F5F4F0`. These are observed website colors, not an official brand specification. This independent educational experience does not use college logos, seals, or endorsement claims.

Plus Jakarta Sans is bundled locally in `vendor/fonts/plus-jakarta-sans-latin.woff2`, under the SIL Open Font License 1.1. Copyright 2020 The Plus Jakarta Sans Project Authors. Full license: `vendor/fonts/OFL.txt`. The font was copied from the licensed offline asset already used by Cable Clash.

- Original font: <https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2>
- License source: <https://raw.githubusercontent.com/google/fonts/main/ofl/plusjakartasans/OFL.txt>

No fonts or theme assets are fetched from external sites at runtime.
