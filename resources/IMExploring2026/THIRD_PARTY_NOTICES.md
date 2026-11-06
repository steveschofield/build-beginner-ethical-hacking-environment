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
