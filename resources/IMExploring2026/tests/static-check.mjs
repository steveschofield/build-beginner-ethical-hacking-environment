import { access, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(testDirectory, "..");

const requiredAssets = [
  "index.html",
  "styles.css",
  "montcalm-theme.css",
  "vendor/fonts/plus-jakarta-sans-latin.woff2",
  "vendor/fonts/OFL.txt",
  "app.js",
  "activities.js",
  "docs/ACTIVITIES.md",
  "Launch-IMExploring2026.command",
  "scripts/launch-kiosk.sh",
  "tests/model-smoke.html",
  "tests/model-smoke.js",
  "vendor/mediapipe/holistic/holistic.js",
  "vendor/mediapipe/holistic/holistic.binarypb",
  "vendor/mediapipe/holistic/holistic_solution_packed_assets_loader.js",
  "vendor/mediapipe/holistic/holistic_solution_packed_assets.data",
  "vendor/mediapipe/holistic/holistic_solution_simd_wasm_bin.js",
  "vendor/mediapipe/holistic/holistic_solution_simd_wasm_bin.wasm",
  "vendor/mediapipe/holistic/holistic_solution_wasm_bin.js",
  "vendor/mediapipe/holistic/holistic_solution_wasm_bin.wasm",
  "vendor/mediapipe/holistic/pose_landmark_lite.tflite",
  "vendor/mediapipe/holistic/LICENSE",
  "vendor/mediapipe/hands/hands.js",
  "vendor/mediapipe/hands/hands.binarypb",
  "vendor/mediapipe/hands/hands_solution_packed_assets_loader.js",
  "vendor/mediapipe/hands/hands_solution_packed_assets.data",
  "vendor/mediapipe/hands/hands_solution_simd_wasm_bin.js",
  "vendor/mediapipe/hands/hands_solution_simd_wasm_bin.wasm",
  "vendor/mediapipe/hands/hands_solution_wasm_bin.js",
  "vendor/mediapipe/hands/hands_solution_wasm_bin.wasm",
  "vendor/mediapipe/hands/hand_landmark_lite.tflite",
  "vendor/mediapipe/hands/package.json",
  "vendor/mediapipe/hands/LICENSE",
];

for (const asset of requiredAssets) {
  await access(path.join(projectDirectory, asset), constants.R_OK);
}

const [html, css, themeCss, app, activities, packageText, handsPackageText] = await Promise.all([
  readFile(path.join(projectDirectory, "index.html"), "utf8"),
  readFile(path.join(projectDirectory, "styles.css"), "utf8"),
  readFile(path.join(projectDirectory, "montcalm-theme.css"), "utf8"),
  readFile(path.join(projectDirectory, "app.js"), "utf8"),
  readFile(path.join(projectDirectory, "activities.js"), "utf8"),
  readFile(path.join(projectDirectory, "vendor/mediapipe/holistic/package.json"), "utf8"),
  readFile(path.join(projectDirectory, "vendor/mediapipe/hands/package.json"), "utf8"),
]);

const [macLauncher, kioskLauncher] = await Promise.all([
  readFile(path.join(projectDirectory, "Launch-IMExploring2026.command"), "utf8"),
  readFile(path.join(projectDirectory, "scripts/launch-kiosk.sh"), "utf8"),
]);

for (const [name, source] of [["index.html", html], ["styles.css", css], ["montcalm-theme.css", themeCss], ["app.js", app], ["activities.js", activities]]) {
  if (/https?:\/\//i.test(source)) throw new Error(`${name} contains a remote runtime URL`);
}

const packageMetadata = JSON.parse(packageText);
if (packageMetadata.name !== "@mediapipe/holistic") throw new Error("Unexpected MediaPipe package name");
if (packageMetadata.version !== "0.5.1675471629") throw new Error("MediaPipe version is not pinned");
if (packageMetadata.license !== "Apache-2.0") throw new Error("Unexpected MediaPipe license metadata");
const handsPackageMetadata = JSON.parse(handsPackageText);
if (handsPackageMetadata.name !== "@mediapipe/hands") throw new Error("Unexpected MediaPipe Hands package name");
if (handsPackageMetadata.version !== "0.4.1675469240") throw new Error("MediaPipe Hands version is not pinned");
if (handsPackageMetadata.license !== "Apache-2.0") throw new Error("Unexpected MediaPipe Hands license metadata");

const helpPanel = html.match(/<details class="details-panel" id="details-panel">([\s\S]*?)<\/details>/)?.[1] || "";
const assertions = [
  [html.includes('<link rel="stylesheet" href="montcalm-theme.css">'), "Montcalm stylesheet is not linked"],
  [themeCss.includes('url("vendor/fonts/plus-jakarta-sans-latin.woff2")'), "offline theme font is missing"],
  [themeCss.includes("--brand-gold: #ffca05") && themeCss.includes("--brand-green: #117b47"), "shared green/gold palette is missing"],
  [/const THEMES = \[\s*\{ name: "Montcalm Green & Gold"/.test(app), "green/gold is not the default mirror look"],
  [helpPanel.length > 0, "help panel must exist and start collapsed"],
  [["activity-guide", "tracking-panel", "walk-up-prompt", "utility-controls", "activity-feedback"].every((name) => helpPanel.includes(`class="${name}"`)), "camera distractions must be contained in the optional help panel"],
  [html.indexOf('id="activity-dock"') > html.indexOf("</details>"), "activity dock must remain outside optional help"],
  [app.includes('event.key.toLowerCase() === "h"') && app.includes('event.key === "Escape" && elements.detailsPanel.open'), "help keyboard open/close controls are missing"],
  [["theme-button", "sound-button", "reset-button", "performance-button", "fullscreen-button"].every((id) => new RegExp(`id="${id}"[^>]*aria-label=`).test(html)), "utility controls need accessible names"],

  [app.includes("getUserMedia"), "camera API is missing"],
  [app.includes("enableSegmentation: true"), "body segmentation is not enabled"],
  [app.includes("modelComplexity: 0"), "lite pose model is not selected"],
  [app.includes('activityEngine?.mode === "mirror" ? holistic : hands'), "activity-aware inference selection is missing"],
  [app.includes("await createHolisticModel();") && app.includes("await createHandsModel();") && !app.includes("Promise.all([createHolisticModel(), createHandsModel()])"), "MediaPipe models must initialize sequentially"],
  [app.includes("new window.Hands") && app.includes("hands.setOptions") && app.includes("maxNumHands: 2"), "local hand-only inference path is missing"],
  [html.includes("vendor/mediapipe/hands/hands.js"), "MediaPipe Hands runtime script is missing"],
  [css.includes("object-fit: cover") && app.includes("elements.videoCanvas.hidden = !syntheticMode"), "compositor camera presentation is missing"],
  [app.includes("IMEXPLORING_DIAGNOSTICS"), "runtime performance diagnostics are missing"],
  [app.includes("inferenceCooldownMs") && app.includes("lastInferenceCompletedAt"), "inference cooldown is missing"],
  [app.includes('window.location.protocol === "file:"'), "direct-file launch detection is missing"],
  [app.includes('syntheticSetting === "1"') && app.includes('syntheticSetting === "empty"'), "synthetic activity test modes are missing"],
  [!app.includes("MediaRecorder"), "recording code must not be present"],
  [!app.includes("toBlob("), "image export code must not be present"],
  [!app.includes("toDataURL("), "image export code must not be present"],
  [html.includes("Nothing is recorded, saved, or uploaded"), "privacy notice is missing"],
  [html.includes("Body silhouette"), "body silhouette label is missing"],
  [!app.includes("audio: true"), "microphone capture must not be enabled"],
  [activities.includes("AudioContext") && !activities.includes("getUserMedia"), "music mode must use output-only Web Audio"],
  [activities.includes("smoothLandmarks") && activities.includes("advanceTracking"), "render-time landmark easing is missing"],
  [activities.includes("paintBuffer") && activities.includes("drawImage(this.paintBuffer"), "cached painter trail is missing"],
  [["mirror", "shield", "painter"].every((id) => html.includes(`data-activity="${id}"`)), "one or more retained activity controls are missing"],
  [(html.match(/data-activity=/g) || []).length === 3, "activity dock must contain exactly three choices"],
  [html.includes('id="activity-number">1 OF 3'), "initial activity count must show three choices"],
  [["AI Mirror", "Cybersecurity Shield", "Gesture Music Painter"].every((title) => activities.includes(title)), "one or more retained activity definitions are missing"],
  [["constellation", "weather", "robot"].every((id) => !html.includes(`data-activity="${id}"`) && !activities.includes(`id: "${id}"`) && !app.includes(`mode === "${id}"`)), "removed activity code or controls remain"],
  [kioskLauncher.includes("--bind 127.0.0.1"), "kiosk server is not loopback-only"],
  [macLauncher.includes("scripts/launch-kiosk.sh"), "Mac launcher does not use the kiosk launcher"],
];

for (const [condition, message] of assertions) {
  if (!condition) throw new Error(message);
}

for (const launcher of ["Launch-IMExploring2026.command", "scripts/launch-kiosk.sh", "scripts/serve.sh"]) {
  const mode = (await stat(path.join(projectDirectory, launcher))).mode;
  if ((mode & 0o111) === 0) throw new Error(`${launcher} is not executable`);
}

let totalBytes = 0;
for (const asset of requiredAssets) totalBytes += (await stat(path.join(projectDirectory, asset))).size;

console.log(`Static checks passed: ${requiredAssets.length} required assets, ${(totalBytes / 1024 / 1024).toFixed(1)} MiB checked.`);
console.log("Runtime references are local; camera recording/export/upload APIs are absent.");
