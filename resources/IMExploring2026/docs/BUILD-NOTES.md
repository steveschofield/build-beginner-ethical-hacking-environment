# Build notes for Steve's educational blog

Date: 2026-11-05

## Goal

Keep the existing TechFest 2026 experience unchanged while building a separate, polished career-fair kiosk under `resources/IMExploring2026`. The walk-up experience must visibly distinguish a true body contour from skeleton, face-mesh, and hand-landmark output. Frames stay local and are never recorded or uploaded.

## Source material inspected

- `resources/Techfest/TechFest2026/index.html`
- `resources/Techfest/TechFest2026/app.js`
- `resources/Techfest/TechFest2026/particle-simulator.html`
- `resources/Techfest/TechFest2026/particle-simulator-prompt.md`
- `resources/Techfest/TechFest2026/prompt.txt.md`
- Original social post: <https://x.com/emilylambert/status/2009475725947228308>
- Google MediaPipe Holistic overview: <https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker>
- MediaPipe repository: <https://github.com/google-ai-edge/mediapipe>

The original optimized single-file demo already used 4,000–8,000 adaptive particles, 320×240 input, throttled inference, and lite hand tracking. Its separate face and hand passes did not provide a body outline.

## Design decision

The polished build uses one pinned `@mediapipe/holistic` pipeline. Holistic combines pose, face, both hands, and a person segmentation mask. The segmentation mask produces the actual outer body contour; pose/face/hand connections remain a separate landmark visualization.

The camera was initially requested at 1280×720 for display, but inference receives a cropped 320×180 frame. Pose complexity `0` selects the lite model. Tracking adapts from 12–22 Hz based on measured inference time. The particle field uses stable indexed targets rather than comparing every particle with every target. The smoothness pass described below revised the camera request to 960×540 at 24 FPS, with 1280×720 retained only as the maximum.

## Commands run

Repository inspection:

```bash
git clone https://github.com/steveschofield/build-beginner-ethical-hacking-environment.git
git status --short --branch
find resources/Techfest/TechFest2026 -maxdepth 3 -type f -print
rg -n "particleCount|320|240|thrott|Hands|Face|camera|setOptions" resources/Techfest/TechFest2026
```

Dependency review and acquisition:

```bash
npm view @mediapipe/holistic version dist.unpackedSize dist.tarball license
npm pack @mediapipe/holistic@0.5.1675471629 --pack-destination /tmp
```

Relevant results:

- version: `0.5.1675471629`
- license: `Apache-2.0`
- npm integrity: `sha512-qY+cxtDeSOvVt[...]vgshkAqQRSYAw==`
- package tarball: 52.6 MB; unpacked: 67.4 MB
- vendored subset: about 32 MB
- omitted: 6.4 MB full and 27.7 MB heavy pose models, because the app selects the 2.8 MB lite model
- retained: SIMD and non-SIMD WebAssembly paths for browser compatibility

Verification commands:

```bash
node --check app.js
node tests/static-check.mjs
./scripts/serve.sh 8080
```

Results in the development environment:

- `node --check app.js`: passed
- `node tests/static-check.mjs`: passed
- welcome screen: rendered correctly in the in-app Chromium browser
- unavailable/pending camera: the 20-second timeout displayed the recovery card with Retry and Back controls
- `tests/model-smoke.html`: **PASS** after one blank 320×180 frame was processed
- server log: local HTTP 200 responses for the graph, packed assets, SIMD loader, SIMD WebAssembly binary, and lite pose model

The local model smoke test verifies that the complete bundled inference path can load and run in a browser. Physical-camera tracking quality and performance still need a rehearsal on the event laptops because the development browser did not expose a webcam.

## Privacy and offline claims

The app has no analytics, `MediaRecorder`, image export, upload code, or remote runtime references. Its JavaScript uses `getUserMedia` for the live stream and passes cropped frames directly to the local MediaPipe runtime. MediaPipe's own loader uses `fetch`, but `locateFile` directs every asset to the vendored same-origin folder.

Static verification can prove that every referenced runtime asset is present and no runtime HTML/CSS/app URL points to the internet. A disconnected-laptop reload is still the appropriate end-to-end offline check because browser permissions and WebAssembly support are environment-specific.

## Limitations

- MediaPipe Holistic tracks one primary person. This kiosk is designed for one visitor at a time.
- Segmentation quality depends on lighting, contrast, framing, and occlusion.
- A 320×180 inference frame favors responsiveness over tiny facial detail.
- The application can verify that it does not save or transmit frames; it cannot control unrelated browser extensions or operating-system camera software.
- No physical-camera performance number should be claimed until tested on the three Dell laptops.

## Direct-file launch diagnosis and fix

Steve's first review opened `index.html` directly from Finder, producing a `file:///Users/ss/code/.../index.html` URL. The HTML and CSS can render from a file URL, and some browsers may even expose the camera, but MediaPipe initializes by fetching its graph, WebAssembly, packed assets, and TFLite model. Browser origin rules block those fetches from `file://`, so model initialization fell through to the generic startup error.

The fix has three parts:

1. The app now detects `window.location.protocol === "file:"` before requesting the camera and shows exact Mac and Linux launcher instructions.
2. `Launch-IMExploring2026.command` provides a Finder-friendly Mac launcher.
3. `scripts/launch-kiosk.sh` starts a Python server bound only to `127.0.0.1`, waits until it is ready, opens the browser, and shuts the server down on exit.

The server exposes only the static application files to the same laptop. Camera frames are obtained by the browser and are never sent to the Python server.

Commands used to verify the fix:

```bash
bash -n Launch-IMExploring2026.command scripts/launch-kiosk.sh scripts/serve.sh
node --check app.js
node tests/static-check.mjs
IMEXPLORING_NO_OPEN=1 ./scripts/launch-kiosk.sh 8766
curl -fsSI http://127.0.0.1:8766/
```

Results:

- all shell launchers passed Bash syntax checking;
- application JavaScript passed Node syntax checking;
- 17 required local assets passed the static/privacy checks;
- the launcher reported that the app was running at `http://127.0.0.1:8766`;
- the served entry point returned `HTTP/1.0 200 OK`;
- `Control-C` stopped the launcher and its child server via the cleanup trap.

The automation browser intentionally disallows navigation to `file://` URLs, so the exact Finder launch could not be replayed there. The reported `file://` URL, the MediaPipe fetch-based loader, and the now-explicit protocol check identify and cover that failure path. The localhost model smoke test remains the browser-level proof for the supported launch path.

## Six-activity expansion (historical prototype)

Date: 2026-11-06

The existing AI Mirror remains activity 1. Five new renderers reuse its single MediaPipe Holistic result:

1. **AI Constellation** draws star joints and a flowing arc between detected palms.
2. **Cybersecurity Shield** turns palms into shields and runs a bounded safe-versus-suspicious message game with immediate teaching feedback.
3. **Gesture Music Painter** stores fingertip trails and optionally maps vertical position to short Web Audio notes. Sound starts muted; no microphone permission or input API is used.
4. **Digital Weather** uses the segmentation contour as a landscape and horizontal hand velocity to cycle storm, rain, and clear states.
5. **Human-to-Robot Mirror** maps pose joints to robot segments and displays normalized hand coordinates.

All modes live in `activities.js` and share the existing 320×180 tracking result. Switching activities does not reload MediaPipe or restart the camera. No new package or external runtime dependency was added.

Shared usability additions:

- six-button activity dock plus keys `1`–`6`;
- activity-specific instruction, learning point, and no-person prompt;
- short transitions and per-activity Reset (`R`);
- default-muted sound control (`M`) only in Music Painter;
- Reduced effects control that selects 12 Hz inference, half the particles, shorter paint history, fewer weather particles, and fewer message cards;
- activity state and controls exposed with `aria-pressed` semantics;
- a clearly labeled `?synthetic=1` generated-landmark test and `?synthetic=empty` no-person test.

Commands run:

```bash
node --check app.js
node --check activities.js
node tests/static-check.mjs
rg -n "https?://" index.html styles.css app.js activities.js
IMEXPLORING_NO_OPEN=1 ./scripts/launch-kiosk.sh 8770
```

Results:

- both JavaScript files passed syntax checking;
- 19 required assets passed static, privacy, local-runtime, launcher, and activity-presence checks;
- no runtime HTML, CSS, or application JavaScript URL points to an external host;
- `tests/model-smoke.html` again reached **PASS** for the bundled graph, WebAssembly, packed assets, and lite pose model;
- the generated-landmark browser test exercised all six activity selections, number-key navigation, Cyber Shield cards and lesson, Music Painter mute toggle, Digital Weather state changes, robot coordinate output, Reset, and Reduced effects;
- the generated-landmark test reported 60 FPS during stable full-effects periods in the in-app Chromium browser;
- `?synthetic=empty` showed all tracking rows in Waiting state and the activity-specific step-into-frame prompt.

Important distinction: synthetic tests verify UI, state changes, rendering, and control flow. They do not measure MediaPipe camera inference, segmentation quality, webcam framing, WebGL behavior, or sustained performance on the Dell Precision 3551 laptops. A real-camera rehearsal on each event laptop remains required. Short FPS dips observed while the automation tool captured or changed browser state were not treated as hardware benchmarks.

## Smoothness investigation and revision

Date: 2026-11-06

Steve's first real-camera review found that the five new activities looked jerky compared with the original TechFest particle experience. Source comparison showed why: the original `particle-simulator.html` runs its particle simulation on every `requestAnimationFrame` even though it performs hand detection only every third 24 FPS camera frame (roughly 8 Hz). The first activity implementation instead rendered raw pose and hand coordinates only when a 12–22 Hz Holistic result arrived, making every inference boundary visible as a jump.

The revised pipeline separates **input cadence** from **visible motion cadence**:

- raw tracking results become targets, while pose and hand landmarks move toward those targets on every display frame;
- interpolation time constants adapt to the measured result interval and are capped to avoid excessive lag after a slow inference;
- a measured 28–90 ms post-inference cooldown (70–160 ms in Reduced effects mode) prevents a slow synchronous model from immediately monopolizing the main thread again;
- the performance line reports display FPS, eased-motion Hz, input Hz, and average drawing cost separately;
- Music Painter appends each new eased segment once to an off-screen canvas instead of redrawing up to 1,400 historical points every frame;
- the robot coordinate readout is limited to about 8 updates per second while the robot itself remains display-rate animated;
- the camera request is 960×540 at 24 FPS, device-pixel-ratio rendering is capped at 1, and Constellation particle density is reduced without changing tracking quality;
- segmentation is enabled only for Mirror and Weather, which need a literal silhouette; contour extraction runs every second result (every third in Reduced effects mode);
- raw moving pose/hand overlays are hidden behind Painter and Robot, whose eased renderers now own those visuals.

Representative generated-landmark measurements from the local browser were:

| Activity | Display rate | Eased motion | Input | Average draw |
| --- | ---: | ---: | ---: | ---: |
| AI Mirror | 59 FPS | 59 Hz | 18 Hz | 1.2 ms |
| AI Constellation | 60 FPS | 60 Hz | 17 Hz | 0.6 ms |
| Gesture Music Painter with trails | 54 FPS | 54 Hz | 17 Hz | 0.2 ms |
| Digital Weather | 56 FPS | 56 Hz | 16 Hz | 0.1 ms |

Cyber Shield and Robot control flow also ran, but measurements taken after the automation browser was background-throttled were discarded as performance evidence. The key before/after behavior is architectural: the old activity positions changed only at the input rate; the new positions progress on each rendered frame. The generated browser test validates this scheduling and drawing work, not webcam inference speed.

An existing real-camera Chrome tab showed `2 FPS display · 521 ms inference · 12 Hz tracking` before the revision while it was under automation/background observation. That observation proves the previous direct-update path could expose large steps, but it is **not** a foreground Mac or Dell benchmark because browsers throttle background work. No camera image or video was captured, saved, or transmitted during the check.

After the final cooldown revision, the same automation-controlled real-camera path reached `11 FPS display · 11 Hz eased motion · 2 Hz input · 1.1 ms draw` in Constellation, compared with 4 display FPS before the cooldown was added. The low input rate shows that this browser/model context remained heavily constrained, while the higher display rate confirms that the main thread received time to interpolate between model results. This is useful before/after pipeline evidence, but it remains a background/automation observation rather than a foreground device benchmark. The temporary test tab was closed immediately afterward, stopping its camera stream; no frame or screenshot was captured.

The final generated-landmark pass through the synced `~/code` checkout exercised all six activities at a browser-capped 30 FPS. Mirror, Constellation, Cyber Shield, Music Painter, and Weather reported 30 Hz eased motion from 15 Hz input; Robot reported 27 Hz eased motion from 15 Hz input during the sampled interval. Average drawing cost was 0.2–1.2 ms. These measurements validate the render scheduler and mode code, not the model or webcam.

Commands used for the smoothness pass:

```bash
rg -n "particleCount|detectionFrameCounter|requestAnimationFrame|send\(" resources/Techfest/TechFest2026/particle-simulator.html
node --check app.js
node --check activities.js
node tests/static-check.mjs
bash -n Launch-IMExploring2026.command scripts/launch-kiosk.sh scripts/serve.sh
IMEXPLORING_NO_OPEN=1 ./scripts/launch-kiosk.sh 8771
```

Remaining validation: run the revised build in foreground, full-screen Chrome on each Dell Precision 3551 with its Realtek webcam. Exercise all three retained modes for several minutes, confirm hardware acceleration is enabled, and use Reduced effects only if foreground display remains below roughly 45 FPS. The live browser camera is the only reliable way to evaluate motion-to-photon latency, lighting-dependent segmentation, and thermal throttling on those event machines.

## Three-activity cleanup

Date: 2026-11-06

After Steve's hands-on review, the public experience was intentionally narrowed to the three activities that worked best:

1. AI Mirror
2. Cybersecurity Shield
3. Gesture Music Painter

AI Constellation, Digital Weather, and Human-to-Robot Mirror were removed rather than hidden. The cleanup deleted their dock controls, definitions, renderer and gesture code, weather and robot state, coordinate panel, CSS, and mode-specific branches. Cyber Shield and Music Painter were renumbered to keys `2` and `3`. Segmentation is now requested only for AI Mirror, while Shield and Painter use the lighter pose/hand path.

Current documentation, operator instructions, responsive layout, and static tests now describe exactly three modes. `BUILD-NOTES.md` retains the earlier six-mode work above as a clearly labeled historical prototype record for the educational blog.

Verification commands:

```bash
node --check app.js
node --check activities.js
node tests/static-check.mjs
bash -n Launch-IMExploring2026.command scripts/launch-kiosk.sh scripts/serve.sh
rg -n "constellation|weather|robot" app.js activities.js index.html styles.css
```

The syntax, launcher, local-runtime, camera/privacy, and exact-three-activity assertions passed. Browser validation used the generated-landmark mode so it did not access or retain camera images. The three retained modes reported `1 OF 3`, `2 OF 3`, and `3 OF 3`; Mirror and Shield rendered at 29–30 FPS and Painter at 28 FPS in the sampled automation window. Shield showed its score control only in mode 2, Painter showed its default-muted sound control only in mode 3, and toggling sound, Reset, Reduced effects, and keys `1`–`3` worked. Removed keys `4` and `6` did not change the active mode. The `?synthetic=empty` path showed all three tracking rows in Waiting state and the activity-specific walk-up prompt. No browser warnings or errors were logged. The final physical-camera rehearsal on each Dell remains required.

## Apple-silicon foreground optimization

Date: 2026-11-06

Steve requested another optimization pass after testing the three retained modes on his Mac. The machine profile was collected without retaining hardware identifiers: MacBook Air with Apple M3, four performance plus four efficiency CPU cores, 24 GB memory, 10-core integrated GPU, Metal support, macOS 26.6.2, and Chrome 156.0.8078.80.

### Measured bottleneck and changes

The previous real-camera renderer copied, mirrored, scaled, and shaded the entire 960×540 video frame through a full-screen Canvas 2D on every `requestAnimationFrame`. An automation-observed run reached only `1 FPS · 1 Hz eased motion · 0 Hz input · 19.9 ms draw`. The test involved a duplicate camera tab, so it is evidence of an overloaded path rather than a general Mac benchmark; however, the 19.9 ms Canvas drawing cost directly identified the full-frame copy as a rendering bottleneck.

The revised build:

- presents the mirrored live `<video>` through the browser compositor and reserves the video canvas for generated test mode;
- vendors pinned `@mediapipe/hands@0.4.1675469240` and uses its lite graph at 256×144 for Shield and Painter;
- keeps Holistic at 320×180 only for Mirror, the mode that needs pose, face, and segmentation;
- initializes the two legacy MediaPipe Solutions graphs sequentially because concurrent initialization made their shared temporary WebAssembly loader resolve assets from the wrong package;
- thins Mirror particles adaptively when display rate falls below 48 or 28 FPS, while retaining the manual Reduced effects mode; and
- exposes the selected inference engine, input size, particle step, inference/cooldown timing, display rate, eased-motion rate, input cadence, and drawing cost through the existing diagnostics object.

Hands package acquisition and verification:

```bash
npm view @mediapipe/hands version dist.unpackedSize dist.tarball license
npm pack @mediapipe/hands@0.4.1675469240 --pack-destination /tmp
node --check app.js
node --check activities.js
node --check tests/model-smoke.js
node tests/static-check.mjs
```

Relevant package results:

- version: `0.4.1675469240`
- license: `Apache-2.0`
- npm integrity: `sha512-GxoZvL1mmhJxF[...]6/+wewmEHPrHg==`
- package tarball: 13.2 MB; unpacked: 24.4 MB
- the full hand model was omitted; the lite TFLite model plus SIMD and non-SIMD WebAssembly paths were retained

The static pass reported `30 required assets, 49.9 MiB checked` and confirmed that runtime references are local and recording/export/upload APIs are absent. A local browser smoke test processed five blank frames through each graph and reported `Holistic cold 483 ms / warm 9 ms; Hands Lite cold 119 ms / warm 7 ms`. Blank-frame timings verify local graph loading and warm execution; they are not person-detection latency measurements.

### Foreground camera results on this Mac

After granting camera permission, the supported localhost app started both models without an error. Measurements were read from the in-app performance line while Chrome was foreground and the camera was active; no screenshot, still image, recording, or camera frame was captured or transmitted.

| Activity | Display | Input callback cadence | Average app draw |
| --- | ---: | ---: | ---: |
| AI Mirror / Holistic | 60 FPS | 12 Hz | 0.7 ms |
| Cybersecurity Shield / Hands Lite | 60 FPS | 20 Hz | 0.3 ms |
| Gesture Music Painter / Hands Lite | 60 FPS | 20 Hz | 0.0 ms rounded |
| Music Painter, Reduced effects | 60 FPS | 10 Hz | 0.0 ms rounded |

No person was deliberately placed in front of the camera during this automated pass, so eased-motion rate was `0 Hz` and pose/hand accuracy was not evaluated. The result still exercises the actual camera capture, frame crop, local WebAssembly graphs, activity switching, and renderer. The temporary test tab was closed afterward, stopping its camera track. A human real-motion check remains required on this Mac and on each Dell event laptop.

### Library screenshot limitation

The provided Library ID was resolved to the current `image(1).png` item, and the current Library download helper plus its companion transfer module were materialized into a private temporary directory. The helper requires the caller to close stdin after sending exactly one JSON request. This execution terminal can write to an interactive process but cannot signal stdin EOF without terminating it, so the supported transfer retry failed with `stdin must be closed after one JSON request`. No file appeared at the consumer-local destination, no transfer URL was guessed, and the screenshot pixels were therefore not inspected. Profiling continued from the live app and device instead.
