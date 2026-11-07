# See Yourself in AI — IM Exploring 2026

A polished, walk-up camera experience for the IM Exploring 2026 career fair. One local camera-tracking pipeline powers three selectable activities:

| Activity | Visitor interaction | Learning point |
| --- | --- | --- |
| **AI Mirror** | Move, pose, and make a fist to change colors. | Silhouettes and landmark coordinates are different AI outputs. |
| **Cybersecurity Shield** | Block suspicious messages and let safe ones pass. | Check sender, urgency, links, and unexpected attachments before clicking. |
| **Gesture Music Painter** | Draw with fingertips; optionally turn on notes. | Motion coordinates can control graphics and output-only Web Audio without a microphone. |

The original AI Mirror still shows a body silhouette traced from MediaPipe's segmentation mask, a body skeleton, face mesh, two hand skeletons, and flowing particles.

The original TechFest 2026 particle demos remain unchanged in `../Techfest/TechFest2026/`. This is a separate implementation inspired by their [original prompt](docs/ORIGINAL-PROMPT.md).

## Privacy and network behavior

Video frames are processed in the browser on the laptop. The app does not record, save, export, or upload camera images. It does not contain analytics.

The pinned MediaPipe runtime and model are included under `vendor/`, so the experience works without internet access **after the repository has been cloned**. It still needs to be served from `localhost`; camera access will not work reliably when `index.html` is opened as a `file://` URL.

## Start it — do not double-click `index.html`

The bundled AI model uses browser fetches for its graph, WebAssembly, and model files. Browsers block those fetches from a `file://` page. The app must therefore use the included loopback-only server.

### Mac or Kali: no Terminal window

Double-click **IM Exploring 2026** on the desktop. On Mac it is an `.app`; on Kali it is a desktop shortcut. It starts the loopback-only server in the background and opens the browser. Repeated launches reuse the same background server.

Close the camera tab when finished, then double-click **Stop IM Exploring 2026** to stop the local server. Closing the tab releases the webcam; the stop shortcut does not close your browser. Nothing starts automatically at login or after reboot.

On a new Mac checkout, run `./scripts/build-mac-apps.sh` once, then double-click `IM Exploring 2026.app` in this directory. Keep the generated apps beside the `scripts` folder. Desktop shortcuts may be aliases or symbolic links to those apps.

If the old Terminal launcher is already running, finish that session and press `Control-C` in its Terminal before using the new launcher. The new launcher will not interrupt an existing session.

`Launch-IMExploring2026.command` and `./scripts/launch-kiosk.sh` remain available for foreground troubleshooting. See [BACKGROUND-LAUNCHER.md](docs/BACKGROUND-LAUNCHER.md) for logs, terminal commands, and checks.

### Kali Linux or macOS terminal

From this directory:

```bash
./scripts/launch-kiosk.sh
```

The launcher opens <http://127.0.0.1:8080>. Choose **Start the camera**, allow camera access, then open **Controls & help** and select **Full screen**, or press `F` for kiosk presentation.

To use a different port:

```bash
./scripts/launch-kiosk.sh 8088
```

For manual server-only operation, `./scripts/serve.sh` remains available.

## Montcalm-inspired theme and clear camera view

The welcome screen, controls, and default AI Mirror colors use the same green/gold palette and locally bundled Plus Jakarta Sans font as Cable Clash. This is an independent educational design, not an official college product.

The camera view starts with instructions, tracking/FPS, walk-up messages, and utility settings tucked away. Open **Controls & help** in the upper right (or press `H`) to see them. Click again, press `H`, or press `Escape` to close the panel. The three activity buttons stay available along the bottom; Cyber Shield keeps its score in a corner. Help is collapsed again on page reload.

## Visitor controls

- Select an activity from the dock or press `1`–`3`.
- Open **Controls & help** (upper right or `H`) for instructions, tracking status, sound, Reset, Reduced effects, and Full screen.
- Press `R` to reset the current activity.
- In AI Mirror, make a fist or press `T` to change colors.
- In Music Painter, use the sound control or press `M` to toggle output-only notes. Sound starts muted.
- Use **Reduced effects** if a laptop is under load; it lowers tracking frequency and visual density.
- Press `F` or use the on-screen button to enter or leave full screen.

## Event operator checklist

1. Confirm the camera is enabled in the laptop firmware and visible to Chromium.
2. Start the local server and open the localhost URL—not the HTML file directly.
3. Allow camera permission and wait for the tracking panel under **Controls & help** to change from **Waiting**.
4. Enter full screen and leave the browser running. The experience needs a single initial click; visitors do not need to restart it.
5. Select each activity and verify its title, instruction, Reset control, and visual response.
6. Test with the laptop disconnected from Wi-Fi before the event. Reload the page and confirm the model still starts.
7. Keep a person roughly 4–10 feet from the camera, with even front lighting and the full upper body visible.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Camera permission is off | Use the camera icon in the browser address bar, allow access, then select **Try again**. |
| Camera is busy | Close other tabs or apps using the webcam. |
| “Start it with the local launcher” | Close the `file://` tab and run `Launch-IMExploring2026.command` on Mac or `./scripts/launch-kiosk.sh` on Linux. |
| Tracking is slow | Close other tabs, keep only one kiosk window open, and confirm hardware acceleration is enabled in Chromium. |
| Body outline is incomplete | Step back so shoulders and torso are visible and improve front lighting. |
| Face or hands are not found | Face the camera; keep hands inside the frame and away from the torso. |

## Technical design

- MediaPipe Holistic `0.5.1675471629` and MediaPipe Hands `0.4.1675469240`, both Apache-2.0, pinned and vendored locally.
- AI Mirror uses Holistic for pose, face, hands, and segmentation. Cyber Shield and Music Painter use the smaller Hands Lite graph because they do not need a body or face result.
- Camera display is requested at 960×540 and 24 FPS (with a 1280×720 maximum). The browser compositor presents the live video directly instead of copying a full camera frame through Canvas on every display refresh.
- Mirror inference uses a 320×180 off-screen frame; the hand-only activities use 256×144.
- The lite pose model is used for the Dell Precision 3551 laptops.
- Inference adapts between 12 and 22 Hz based on measured processing time; display rendering remains independent.
- A measured post-inference cooldown reserves main-thread time for animation instead of immediately starting another model pass after a slow result.
- Pose and hand targets are eased at display refresh rate with time constants that adapt to measured tracking cadence, so a 12–22 Hz model result does not become a 12–22 Hz visual jump.
- Segmentation runs only because AI Mirror is the only activity sent through Holistic. Contour extraction is throttled separately from pose/hand tracking.
- A 160×90 mask is converted into a literal contour using marching squares. Landmark lines are rendered separately so visitors can compare silhouette and skeleton data.
- Particle attraction is indexed rather than nearest-neighbor, avoiding the original implementation's particle-by-target quadratic search.
- Cyber Shield and Music Painter share one local Hands Lite graph and never initialize a second camera stream.
- Music Painter caches completed strokes in an off-screen canvas instead of repainting its full trail history every frame.
- Music uses the browser's built-in Web Audio output and never requests microphone access.

See [BUILD-NOTES.md](docs/BUILD-NOTES.md) for the reproducible build record and [OPERATOR-GUIDE.md](docs/OPERATOR-GUIDE.md) for the three-laptop setup.

## Verification

Run the dependency-free checks:

```bash
node --check app.js
node --check activities.js
node tests/static-check.mjs
```

These checks verify the expected local assets, pinned package metadata, absence of remote runtime URLs, and camera/privacy invariants. A real-camera rehearsal is still required on the event laptops.

With the local server running, open <http://127.0.0.1:8080/tests/model-smoke.html> to execute one blank frame through the bundled browser model. A green **PASS** verifies that the WebAssembly runtime, graph, packed assets, and lite pose model can all load from the local checkout.

For browser-only activity testing without a camera, open <http://127.0.0.1:8080/?synthetic=1>. This produces clearly labeled generated body and hand landmarks and exercises every activity. Use `?synthetic=empty` to verify the no-person state. Synthetic tests validate UI and simulation logic, not camera accuracy or laptop performance.
