"use strict";

const CONFIG = Object.freeze({
  inferenceWidth: 320,
  inferenceHeight: 180,
  handInferenceWidth: 256,
  handInferenceHeight: 144,
  maskWidth: 160,
  maskHeight: 90,
  initialInferenceFps: 18,
  minInferenceFps: 12,
  maxInferenceFps: 22,
  noPersonPromptDelayMs: 900,
  particleCount: navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 ? 1800 : 3200,
  maxDevicePixelRatio: 1,
});

const queryParameters = new URLSearchParams(window.location.search);
const syntheticSetting = queryParameters.get("synthetic");
const syntheticMode = syntheticSetting === "1" || syntheticSetting === "empty";

const THEMES = [
  { name: "Montcalm Green & Gold", body: "#b1d33d", face: "#fff4bf", hand: "#ffca05", particle: "#e5f2ba", secondary: "#5fce8b" },
  { name: "Rainbow", body: "#63f5ff", face: "#ff72d7", hand: "#ffd166", particle: "#b9fbff", secondary: "#d18cff" },
  { name: "Fire", body: "#ff8c42", face: "#ffd166", hand: "#ff4d8d", particle: "#ffe0a8", secondary: "#ff5c35" },
  { name: "Ocean", body: "#3ae8ff", face: "#70a7ff", hand: "#8bfff0", particle: "#d2fbff", secondary: "#3478ff" },
  { name: "Galaxy", body: "#a88bff", face: "#ff75d8", hand: "#65f4ff", particle: "#e7ddff", secondary: "#7446ff" },
  { name: "Matrix", body: "#58ff7b", face: "#b8ffca", hand: "#f4ff62", particle: "#ccffd6", secondary: "#13b84f" },
];

const elements = {
  detailsPanel: document.querySelector("#details-panel"),
  detailsToggle: document.querySelector("#details-toggle"),
  welcome: document.querySelector("#welcome"),
  welcomeStatus: document.querySelector("#welcome-status"),
  startButton: document.querySelector("#start-button"),
  cameraExperience: document.querySelector("#camera-experience"),
  camera: document.querySelector("#camera"),
  videoCanvas: document.querySelector("#video-canvas"),
  particleCanvas: document.querySelector("#particle-canvas"),
  activityCanvas: document.querySelector("#activity-canvas"),
  overlayCanvas: document.querySelector("#overlay-canvas"),
  walkUpPrompt: document.querySelector("#walk-up-prompt"),
  trackBody: document.querySelector("#track-body"),
  trackFace: document.querySelector("#track-face"),
  trackHands: document.querySelector("#track-hands"),
  performance: document.querySelector("#performance"),
  activityNumber: document.querySelector("#activity-number"),
  themeButton: document.querySelector("#theme-button"),
  soundButton: document.querySelector("#sound-button"),
  resetButton: document.querySelector("#reset-button"),
  performanceButton: document.querySelector("#performance-button"),
  fullscreenButton: document.querySelector("#fullscreen-button"),
  errorCard: document.querySelector("#error-card"),
  errorTitle: document.querySelector("#error-title"),
  errorMessage: document.querySelector("#error-message"),
  retryButton: document.querySelector("#retry-button"),
  backButton: document.querySelector("#back-button"),
};

const videoContext = elements.videoCanvas.getContext("2d", { alpha: false });
const particleContext = elements.particleCanvas.getContext("2d");
const overlayContext = elements.overlayCanvas.getContext("2d");

// Let the browser compositor present the live camera directly. Copying the
// whole frame through Canvas 2D on every animation frame was the largest Mac
// rendering cost. The canvas remains available for generated test mode.
elements.camera.hidden = syntheticMode;
elements.videoCanvas.hidden = !syntheticMode;

const inferenceCanvas = document.createElement("canvas");
inferenceCanvas.width = CONFIG.inferenceWidth;
inferenceCanvas.height = CONFIG.inferenceHeight;
const inferenceContext = inferenceCanvas.getContext("2d", { alpha: false, desynchronized: true });

const rawMaskCanvas = document.createElement("canvas");
rawMaskCanvas.width = CONFIG.maskWidth;
rawMaskCanvas.height = CONFIG.maskHeight;
const rawMaskContext = rawMaskCanvas.getContext("2d", { willReadFrequently: true });

const tintMaskCanvas = document.createElement("canvas");
tintMaskCanvas.width = CONFIG.maskWidth;
tintMaskCanvas.height = CONFIG.maskHeight;
const tintMaskContext = tintMaskCanvas.getContext("2d");

let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
let pixelRatio = 1;
let holistic = null;
let hands = null;
let mediaStream = null;
let isRunning = false;
let inferenceBusy = false;
let inferenceFps = CONFIG.initialInferenceFps;
let lastInferenceAt = 0;
let lastVideoTime = -1;
let averageInferenceMs = 0;
let lastInferenceCompletedAt = 0;
let inferenceCooldownMs = 28;
let renderFrames = 0;
let renderedFps = 0;
let fpsSampleAt = performance.now();
let averageRenderCostMs = 0;
let trackingIntervalMs = 0;
let lastTrackingResultAt = 0;
let activeTheme = 0;
let contourSegments = [];
let particleTargets = [];
let lastTrackingData = null;
let lastPersonSeenAt = 0;
let gestureLatched = false;
let lastGestureAt = 0;
const openedAsLocalFile = window.location.protocol === "file:";
let activityEngine = null;
let reducedPerformance = false;
let syntheticLastTrackingAt = 0;
let transitionTimer = 0;
let particleFrame = 0;
let maskResultCounter = 0;
let adaptiveParticleStep = 1;

const particles = [];

class FlowParticle {
  constructor(index) {
    this.index = index;
    this.reset(true);
  }

  reset(randomize = false) {
    this.x = randomize ? Math.random() * viewportWidth : viewportWidth * 0.5;
    this.y = randomize ? Math.random() * viewportHeight : viewportHeight * 0.5;
    this.vx = (Math.random() - 0.5) * 0.55;
    this.vy = (Math.random() - 0.5) * 0.55;
    this.size = 0.55 + Math.random() * 1.25;
    this.phase = Math.random() * Math.PI * 2;
    this.alpha = 0.2 + Math.random() * 0.68;
  }

  update(time) {
    if (particleTargets.length) {
      const target = particleTargets[(this.index * 37) % particleTargets.length];
      const point = normalizedToScreen(target);
      const dx = point.x - this.x;
      const dy = point.y - this.y;
      const distance = Math.hypot(dx, dy) || 1;
      const pull = Math.min(0.12, 3.5 / distance);
      this.vx += dx * pull * 0.018;
      this.vy += dy * pull * 0.018;
    } else {
      this.vx += Math.cos(time * 0.00022 + this.phase) * 0.012;
      this.vy += Math.sin(time * 0.00019 + this.phase) * 0.012;
    }

    this.vx *= 0.925;
    this.vy *= 0.925;
    const speed = Math.hypot(this.vx, this.vy);
    if (speed > 5.5) {
      this.vx = (this.vx / speed) * 5.5;
      this.vy = (this.vy / speed) * 5.5;
    }
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -20) this.x = viewportWidth + 20;
    if (this.x > viewportWidth + 20) this.x = -20;
    if (this.y < -20) this.y = viewportHeight + 20;
    if (this.y > viewportHeight + 20) this.y = -20;
  }
}

function initializeParticles() {
  particles.length = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = reducedMotion ? Math.min(CONFIG.particleCount, 1000) : CONFIG.particleCount;
  for (let index = 0; index < count; index += 1) particles.push(new FlowParticle(index));
}

function resizeCanvases() {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.maxDevicePixelRatio);

  [
    [elements.videoCanvas, videoContext],
    [elements.particleCanvas, particleContext],
    [elements.overlayCanvas, overlayContext],
  ].forEach(([canvas, context]) => {
    canvas.width = Math.round(viewportWidth * pixelRatio);
    canvas.height = Math.round(viewportHeight * pixelRatio);
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  });

  particles.forEach((particle) => particle.reset(true));
  activityEngine?.resize(viewportWidth, viewportHeight, pixelRatio);
  if (lastTrackingData) renderTrackingOverlay(lastTrackingData);
}

function sourceCrop(sourceWidth, sourceHeight, targetAspect = 16 / 9) {
  const sourceAspect = sourceWidth / sourceHeight;
  if (sourceAspect > targetAspect) {
    const width = sourceHeight * targetAspect;
    return { x: (sourceWidth - width) / 2, y: 0, width, height: sourceHeight };
  }
  const height = sourceWidth / targetAspect;
  return { x: 0, y: (sourceHeight - height) / 2, width: sourceWidth, height };
}

function coverRect(aspect = 16 / 9) {
  const viewportAspect = viewportWidth / viewportHeight;
  if (viewportAspect > aspect) {
    const height = viewportWidth / aspect;
    return { x: 0, y: (viewportHeight - height) / 2, width: viewportWidth, height };
  }
  const width = viewportHeight * aspect;
  return { x: (viewportWidth - width) / 2, y: 0, width, height: viewportHeight };
}

function normalizedToScreen(point) {
  const rect = coverRect();
  return { x: rect.x + point.x * rect.width, y: rect.y + point.y * rect.height };
}

function drawCameraFrame() {
  const gradient = videoContext.createLinearGradient(0, 0, viewportWidth, viewportHeight);
  gradient.addColorStop(0, "#071d12");
  gradient.addColorStop(0.5, "#0b2417");
  gradient.addColorStop(1, "#143823");
  videoContext.fillStyle = gradient;
  videoContext.fillRect(0, 0, viewportWidth, viewportHeight);
  videoContext.strokeStyle = "rgba(177, 211, 61, 0.035)";
  videoContext.lineWidth = 1;
  const spacing = 64;
  for (let x = 0; x < viewportWidth; x += spacing) {
    videoContext.beginPath();
    videoContext.moveTo(x, 0);
    videoContext.lineTo(x, viewportHeight);
    videoContext.stroke();
  }
  for (let y = 0; y < viewportHeight; y += spacing) {
    videoContext.beginPath();
    videoContext.moveTo(0, y);
    videoContext.lineTo(viewportWidth, y);
    videoContext.stroke();
  }
}

function drawInferenceFrame() {
  const crop = sourceCrop(elements.camera.videoWidth, elements.camera.videoHeight);
  inferenceContext.save();
  inferenceContext.setTransform(1, 0, 0, 1, 0, 0);
  inferenceContext.drawImage(
    elements.camera,
    crop.x, crop.y, crop.width, crop.height,
    0, 0, inferenceCanvas.width, inferenceCanvas.height,
  );
  inferenceContext.restore();
}

function renderParticles(time) {
  particleFrame += 1;
  if (reducedPerformance && particleFrame % 2) return;
  particleContext.save();
  particleContext.globalCompositeOperation = "destination-out";
  particleContext.fillStyle = "rgba(0, 0, 0, 0.2)";
  particleContext.fillRect(0, 0, viewportWidth, viewportHeight);
  particleContext.globalCompositeOperation = "lighter";

  const theme = THEMES[activeTheme];
  const step = reducedPerformance ? 3 : adaptiveParticleStep;
  particles.forEach((particle, index) => {
    if (index % step) return;
    particle.update(time);
    particleContext.globalAlpha = particle.alpha;
    particleContext.fillStyle = index % 9 === 0 ? theme.secondary : theme.particle;
    particleContext.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
  particleContext.restore();
}

function animationLoop(time) {
  if (!isRunning) return;
  const frameWorkStartedAt = performance.now();
  if (syntheticMode) drawCameraFrame();
  if (activityEngine?.mode === "mirror") renderParticles(time);
  activityEngine?.render(time);
  const renderCost = performance.now() - frameWorkStartedAt;
  averageRenderCostMs = averageRenderCostMs ? averageRenderCostMs * 0.92 + renderCost * 0.08 : renderCost;

  renderFrames += 1;
  if (time - fpsSampleAt >= 1000) {
    renderedFps = Math.round((renderFrames * 1000) / (time - fpsSampleAt));
    if (!reducedPerformance) {
      if (renderedFps < 28) adaptiveParticleStep = 3;
      else if (renderedFps < 48) adaptiveParticleStep = 2;
      else if (renderedFps > 54) adaptiveParticleStep = 1;
    }
    renderFrames = 0;
    fpsSampleAt = time;
    updatePerformanceLabel();
  }

  requestAnimationFrame(animationLoop);
}

async function inferenceLoop(time) {
  if (!isRunning) return;
  requestAnimationFrame(inferenceLoop);

  const interval = 1000 / inferenceFps;
  if (
    inferenceBusy ||
    document.hidden ||
    time - lastInferenceAt < interval ||
    time - lastInferenceCompletedAt < inferenceCooldownMs ||
    elements.camera.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
    elements.camera.currentTime === lastVideoTime
  ) return;

  inferenceBusy = true;
  lastInferenceAt = time;
  lastVideoTime = elements.camera.currentTime;
  drawInferenceFrame();
  const startedAt = performance.now();
  const inferenceEngine = activityEngine?.mode === "mirror" ? holistic : hands;

  try {
    await inferenceEngine.send({ image: inferenceCanvas });
    const elapsed = performance.now() - startedAt;
    averageInferenceMs = averageInferenceMs ? averageInferenceMs * 0.86 + elapsed * 0.14 : elapsed;
    const handsOnly = activityEngine?.mode !== "mirror";
    inferenceCooldownMs = reducedPerformance
      ? Math.max(70, Math.min(160, averageInferenceMs * 0.7))
      : handsOnly
        ? Math.max(12, Math.min(45, averageInferenceMs * 0.35))
        : Math.max(45, Math.min(120, averageInferenceMs * 0.45));
    adaptInferenceRate();
  } catch (error) {
    console.error("MediaPipe frame failed", error);
  } finally {
    lastInferenceCompletedAt = performance.now();
    inferenceBusy = false;
  }
}

function adaptInferenceRate() {
  if (reducedPerformance) inferenceFps = CONFIG.minInferenceFps;
  else if (averageInferenceMs > 72) inferenceFps = CONFIG.minInferenceFps;
  else if (averageInferenceMs > 52) inferenceFps = 15;
  else if (averageInferenceMs > 38) inferenceFps = 18;
  else inferenceFps = CONFIG.maxInferenceFps;
}

function updatePerformanceLabel() {
  const modeText = reducedPerformance ? "reduced effects" : "full effects";
  const motionRate = activityEngine?.getMotionFps() || 0;
  const cadence = trackingIntervalMs ? `${Math.round(1000 / trackingIntervalMs)} Hz input` : `${inferenceFps} Hz target`;
  elements.performance.textContent = `${renderedFps} FPS · ${motionRate} Hz eased motion · ${cadence} · ${averageRenderCostMs.toFixed(1)} ms draw · ${modeText}`;
  window.IMEXPLORING_DIAGNOSTICS = {
    displayFps: renderedFps,
    easedMotionFps: motionRate,
    trackingIntervalMs: Math.round(trackingIntervalMs),
    averageInferenceMs: Math.round(averageInferenceMs),
    inferenceCooldownMs: Math.round(inferenceCooldownMs),
    averageRenderCostMs: Number(averageRenderCostMs.toFixed(2)),
    activity: activityEngine?.mode,
    inferenceEngine: activityEngine?.mode === "mirror" ? "holistic" : "hands-lite",
    inferenceWidth: inferenceCanvas.width,
    inferenceHeight: inferenceCanvas.height,
    adaptiveParticleStep,
    reducedPerformance,
    synthetic: syntheticMode,
  };
}

function extractContour(segmentationMask) {
  rawMaskContext.save();
  rawMaskContext.setTransform(1, 0, 0, 1, 0, 0);
  rawMaskContext.clearRect(0, 0, CONFIG.maskWidth, CONFIG.maskHeight);
  rawMaskContext.drawImage(segmentationMask, 0, 0, CONFIG.maskWidth, CONFIG.maskHeight);
  rawMaskContext.restore();

  let imageData;
  try {
    imageData = rawMaskContext.getImageData(0, 0, CONFIG.maskWidth, CONFIG.maskHeight);
  } catch (error) {
    console.warn("Body mask could not be read", error);
    contourSegments = [];
    return;
  }

  const { data } = imageData;
  const alpha = new Uint8Array(CONFIG.maskWidth * CONFIG.maskHeight);
  for (let index = 0; index < alpha.length; index += 1) {
    const offset = index * 4;
    alpha[index] = Math.round((data[offset] + data[offset + 1] + data[offset + 2]) / 3);
    data[offset] = 255;
    data[offset + 1] = 255;
    data[offset + 2] = 255;
    data[offset + 3] = alpha[index];
  }
  rawMaskContext.putImageData(imageData, 0, 0);

  const threshold = 122;
  const width = CONFIG.maskWidth;
  const height = CONFIG.maskHeight;
  const segments = [];
  const point = (edge, x, y) => {
    if (edge === 0) return { x: x + 0.5, y };
    if (edge === 1) return { x: x + 1, y: y + 0.5 };
    if (edge === 2) return { x: x + 0.5, y: y + 1 };
    return { x, y: y + 0.5 };
  };
  const lookup = {
    1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]],
    5: [[3, 0], [1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]],
    9: [[0, 2]], 10: [[0, 1], [2, 3]], 11: [[1, 2]], 12: [[1, 3]],
    13: [[0, 1]], 14: [[3, 0]],
  };

  for (let y = 0; y < height - 1; y += 1) {
    for (let x = 0; x < width - 1; x += 1) {
      const topLeft = alpha[y * width + x] > threshold ? 1 : 0;
      const topRight = alpha[y * width + x + 1] > threshold ? 2 : 0;
      const bottomRight = alpha[(y + 1) * width + x + 1] > threshold ? 4 : 0;
      const bottomLeft = alpha[(y + 1) * width + x] > threshold ? 8 : 0;
      const configuration = topLeft | topRight | bottomRight | bottomLeft;
      const pairs = lookup[configuration];
      if (!pairs) continue;
      pairs.forEach(([firstEdge, secondEdge]) => {
        const first = point(firstEdge, x, y);
        const second = point(secondEdge, x, y);
        segments.push([
          { x: first.x / (width - 1), y: first.y / (height - 1) },
          { x: second.x / (width - 1), y: second.y / (height - 1) },
        ]);
      });
    }
  }
  contourSegments = segments;
  tintMask();
}

function tintMask() {
  tintMaskContext.save();
  tintMaskContext.setTransform(1, 0, 0, 1, 0, 0);
  tintMaskContext.clearRect(0, 0, CONFIG.maskWidth, CONFIG.maskHeight);
  tintMaskContext.drawImage(rawMaskCanvas, 0, 0);
  tintMaskContext.globalCompositeOperation = "source-in";
  tintMaskContext.fillStyle = THEMES[activeTheme].body;
  tintMaskContext.fillRect(0, 0, CONFIG.maskWidth, CONFIG.maskHeight);
  tintMaskContext.restore();
}

function drawConnections(context, landmarks, connections, color, lineWidth, glow = 0) {
  if (!landmarks || !connections) return;
  context.save();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.shadowColor = color;
  context.shadowBlur = glow;
  context.beginPath();
  connections.forEach(([startIndex, endIndex]) => {
    const start = landmarks[startIndex];
    const end = landmarks[endIndex];
    if (!start || !end) return;
    if ((start.visibility ?? 1) < 0.42 || (end.visibility ?? 1) < 0.42) return;
    const startPoint = normalizedToScreen(start);
    const endPoint = normalizedToScreen(end);
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
  });
  context.stroke();
  context.restore();
}

function drawHandPoints(context, landmarks, color) {
  if (!landmarks) return;
  const fingertips = new Set([4, 8, 12, 16, 20]);
  context.save();
  context.fillStyle = color;
  context.shadowColor = color;
  context.shadowBlur = 12;
  landmarks.forEach((landmark, index) => {
    const point = normalizedToScreen(landmark);
    const radius = fingertips.has(index) ? 4.2 : 2.2;
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawBodySilhouette(data, color, fillAlpha = 0.12, outlineAlpha = 1, lineWidth = 3.2) {
  if (!data.hasMask) return;
  const destination = coverRect();
  overlayContext.save();
  overlayContext.globalCompositeOperation = "screen";
  overlayContext.globalAlpha = fillAlpha;
  overlayContext.filter = "blur(18px)";
  overlayContext.drawImage(tintMaskCanvas, destination.x, destination.y, destination.width, destination.height);
  overlayContext.restore();

  overlayContext.save();
  overlayContext.globalAlpha = outlineAlpha;
  overlayContext.strokeStyle = color;
  overlayContext.lineCap = "round";
  overlayContext.lineWidth = lineWidth;
  overlayContext.shadowColor = color;
  overlayContext.shadowBlur = 18;
  overlayContext.beginPath();
  contourSegments.forEach(([start, end]) => {
    const startPoint = normalizedToScreen(start);
    const endPoint = normalizedToScreen(end);
    overlayContext.moveTo(startPoint.x, startPoint.y);
    overlayContext.lineTo(endPoint.x, endPoint.y);
  });
  overlayContext.stroke();
  overlayContext.lineWidth = 1.1;
  overlayContext.strokeStyle = "rgba(255,255,255,0.86)";
  overlayContext.shadowBlur = 0;
  overlayContext.stroke();
  overlayContext.restore();
}

function renderTrackingOverlay(data) {
  overlayContext.clearRect(0, 0, viewportWidth, viewportHeight);
  const theme = THEMES[activeTheme];
  const mode = activityEngine?.mode || "mirror";

  if (mode === "mirror") {
    drawBodySilhouette(data, theme.body);
    drawConnections(overlayContext, data.pose, window.POSE_CONNECTIONS, theme.body, 2.2, 10);
    drawConnections(overlayContext, data.face, window.FACEMESH_CONTOURS, theme.face, 1.25, 7);
    drawConnections(overlayContext, data.leftHand, window.HAND_CONNECTIONS, theme.hand, 2.4, 12);
    drawConnections(overlayContext, data.rightHand, window.HAND_CONNECTIONS, theme.hand, 2.4, 12);
    drawHandPoints(overlayContext, data.leftHand, theme.hand);
    drawHandPoints(overlayContext, data.rightHand, theme.hand);
  } else if (mode === "shield") {
    drawBodySilhouette(data, theme.body, 0.035, 0.3, 1.4);
  } else if (mode === "painter") {
    // The painter renders eased fingertip positions on its cached trail canvas.
  }
}

function addConnectionTargets(targets, landmarks, connections, steps = 2) {
  if (!landmarks || !connections) return;
  connections.forEach(([startIndex, endIndex]) => {
    const start = landmarks[startIndex];
    const end = landmarks[endIndex];
    if (!start || !end) return;
    if ((start.visibility ?? 1) < 0.42 || (end.visibility ?? 1) < 0.42) return;
    for (let step = 0; step <= steps; step += 1) {
      const amount = step / steps;
      targets.push({
        x: start.x + (end.x - start.x) * amount,
        y: start.y + (end.y - start.y) * amount,
      });
    }
  });
}

function updateParticleTargets(data) {
  const targets = [];
  const mode = activityEngine?.mode || "mirror";
  if (mode === "mirror") {
    contourSegments.forEach((segment, index) => {
      if (index % 3 === 0) targets.push(segment[0]);
    });
  }
  addConnectionTargets(targets, data.pose, window.POSE_CONNECTIONS, 4);
  if (mode === "mirror") addConnectionTargets(targets, data.face, window.FACEMESH_CONTOURS, 1);
  addConnectionTargets(targets, data.leftHand, window.HAND_CONNECTIONS, 4);
  addConnectionTargets(targets, data.rightHand, window.HAND_CONNECTIONS, 4);
  particleTargets = mode === "mirror" ? targets : [];
}

function setTrackingRow(element, active, activeLabel = "Found", inactiveLabel = "Waiting") {
  element.classList.toggle("active", active);
  element.querySelector(".tracking-state").textContent = active ? activeLabel : inactiveLabel;
}

function isFist(landmarks) {
  if (!landmarks || landmarks.length < 21) return false;
  const tips = [4, 8, 12, 16, 20];
  const bases = [3, 6, 10, 14, 18];
  const wrist = landmarks[0];
  let closed = 0;
  tips.forEach((tipIndex, index) => {
    const tip = landmarks[tipIndex];
    const base = landmarks[bases[index]];
    const tipDistance = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
    const baseDistance = Math.hypot(base.x - wrist.x, base.y - wrist.y);
    if (tipDistance < baseDistance * 1.12) closed += 1;
  });
  return closed >= 4;
}

function updateGesture(leftHand, rightHand) {
  if ((activityEngine?.mode || "mirror") !== "mirror") return;
  const fist = isFist(leftHand) || isFist(rightHand);
  const now = performance.now();
  if (fist && !gestureLatched && now - lastGestureAt > 1300) {
    cycleTheme();
    lastGestureAt = now;
  }
  gestureLatched = fist;
}

function applyTrackingData(data) {
  lastTrackingData = data;
  const trackingNow = performance.now();
  if (lastTrackingResultAt) {
    const interval = trackingNow - lastTrackingResultAt;
    trackingIntervalMs = trackingIntervalMs ? trackingIntervalMs * 0.86 + interval * 0.14 : interval;
  }
  lastTrackingResultAt = trackingNow;
  const hasPose = Boolean(data.pose?.length);
  const hasFace = Boolean(data.face?.length);
  const handCount = Number(Boolean(data.leftHand?.length)) + Number(Boolean(data.rightHand?.length));
  renderTrackingOverlay(data);
  updateParticleTargets(data);
  updateGesture(data.leftHand, data.rightHand);
  activityEngine?.updateTracking(data, trackingNow);

  const personFound = hasPose || hasFace || handCount > 0;
  if (personFound) lastPersonSeenAt = performance.now();
  const shouldPrompt = !personFound && performance.now() - lastPersonSeenAt > CONFIG.noPersonPromptDelayMs;
  elements.walkUpPrompt.classList.toggle("is-hidden", !shouldPrompt);

  const handsOnly = (activityEngine?.mode || "mirror") !== "mirror";
  setTrackingRow(elements.trackBody, !handsOnly && (data.hasMask || hasPose), data.hasMask ? "Outlined" : "Pose found", handsOnly ? "Not needed" : "Waiting");
  setTrackingRow(elements.trackFace, !handsOnly && hasFace, "Found", handsOnly ? "Not needed" : "Waiting");
  setTrackingRow(elements.trackHands, handCount > 0, handCount ? `${handCount} found` : "Waiting");
}

function handleResults(results) {
  const hasPose = Boolean(results.poseLandmarks?.length);
  const hasMask = Boolean(results.segmentationMask && hasPose);
  if (hasMask) {
    maskResultCounter += 1;
    const contourInterval = reducedPerformance ? 3 : 2;
    if (!contourSegments.length || maskResultCounter % contourInterval === 0) extractContour(results.segmentationMask);
  } else {
    contourSegments = [];
  }
  applyTrackingData({
    pose: results.poseLandmarks || null,
    face: results.faceLandmarks || null,
    leftHand: results.leftHandLandmarks || null,
    rightHand: results.rightHandLandmarks || null,
    hasMask,
  });
}

function handleHandResults(results) {
  let leftHand = null;
  let rightHand = null;
  const landmarks = results.multiHandLandmarks || [];
  const handedness = results.multiHandedness || [];
  landmarks.forEach((hand, index) => {
    const classification = handedness.find((entry) => entry.index === index) || handedness[index];
    if (classification?.label === "Left") leftHand = hand;
    else if (classification?.label === "Right") rightHand = hand;
    else if (!leftHand) leftHand = hand;
    else rightHand = hand;
  });
  contourSegments = [];
  applyTrackingData({ pose: null, face: null, leftHand, rightHand, hasMask: false });
}

function createSyntheticHand(centerX, centerY, phase, mirror = false) {
  const direction = mirror ? -1 : 1;
  const points = Array.from({ length: 21 }, () => ({ x: centerX, y: centerY, z: 0, visibility: 1 }));
  const fingerBases = [1, 5, 9, 13, 17];
  fingerBases.forEach((base, finger) => {
    const spread = (finger - 2) * 0.014 * direction;
    const length = finger === 0 ? 0.055 : 0.082 + (2 - Math.abs(2 - finger)) * 0.006;
    for (let joint = 0; joint < 4; joint += 1) {
      const index = base + joint;
      points[index] = {
        x: centerX + spread * (0.55 + joint * 0.18) + Math.sin(phase + finger) * 0.002,
        y: centerY - length * ((joint + 1) / 4),
        z: 0,
        visibility: 1,
      };
    }
  });
  return points;
}

function createSyntheticTracking(time) {
  const phase = time * 0.0012;
  const sway = Math.sin(phase) * 0.025;
  const pose = Array.from({ length: 33 }, () => ({ x: 0.5 + sway, y: 0.3, z: 0, visibility: 1 }));
  const assign = (index, x, y) => { pose[index] = { x: x + sway, y, z: 0, visibility: 1 }; };
  assign(0, 0.5, 0.17);
  assign(1, 0.485, 0.158); assign(2, 0.475, 0.16); assign(3, 0.465, 0.165);
  assign(4, 0.515, 0.158); assign(5, 0.525, 0.16); assign(6, 0.535, 0.165);
  assign(7, 0.45, 0.18); assign(8, 0.55, 0.18);
  assign(9, 0.48, 0.205); assign(10, 0.52, 0.205);
  assign(11, 0.42, 0.31); assign(12, 0.58, 0.31);
  assign(13, 0.34 + Math.sin(phase * 1.3) * 0.035, 0.42);
  assign(14, 0.66 + Math.cos(phase * 1.2) * 0.035, 0.42);
  assign(15, 0.27 + Math.sin(phase * 4.5) * 0.09, 0.45 + Math.cos(phase) * 0.05);
  assign(16, 0.73 + Math.cos(phase * 4.2) * 0.09, 0.45 + Math.sin(phase) * 0.05);
  [17, 19, 21].forEach((index) => assign(index, pose[15].x - sway, pose[15].y));
  [18, 20, 22].forEach((index) => assign(index, pose[16].x - sway, pose[16].y));
  assign(23, 0.455, 0.57); assign(24, 0.545, 0.57);
  assign(25, 0.44 + Math.sin(phase) * 0.015, 0.73); assign(26, 0.56 - Math.sin(phase) * 0.015, 0.73);
  assign(27, 0.43 + Math.sin(phase) * 0.02, 0.9); assign(28, 0.57 - Math.sin(phase) * 0.02, 0.9);
  [29, 31].forEach((index) => assign(index, pose[27].x - sway, 0.92));
  [30, 32].forEach((index) => assign(index, pose[28].x - sway, 0.92));

  const leftHand = createSyntheticHand(pose[15].x, pose[15].y, phase, true);
  const rightHand = createSyntheticHand(pose[16].x, pose[16].y, phase, false);
  const outline = [
    { x: 0.46 + sway, y: 0.12 }, { x: 0.41 + sway, y: 0.18 }, { x: 0.4 + sway, y: 0.28 },
    { x: pose[13].x, y: pose[13].y }, { x: pose[15].x, y: pose[15].y }, { x: 0.42 + sway, y: 0.53 },
    { x: 0.41 + sway, y: 0.9 }, { x: 0.47 + sway, y: 0.93 }, { x: 0.5 + sway, y: 0.61 },
    { x: 0.53 + sway, y: 0.93 }, { x: 0.59 + sway, y: 0.9 }, { x: 0.58 + sway, y: 0.53 },
    { x: pose[16].x, y: pose[16].y }, { x: pose[14].x, y: pose[14].y }, { x: 0.6 + sway, y: 0.28 },
    { x: 0.59 + sway, y: 0.18 }, { x: 0.54 + sway, y: 0.12 },
  ];
  contourSegments = outline.map((point, index) => [point, outline[(index + 1) % outline.length]]);
  return { pose, face: null, leftHand, rightHand, hasMask: true };
}

function syntheticTrackingLoop(time) {
  if (!isRunning || !syntheticMode) return;
  requestAnimationFrame(syntheticTrackingLoop);
  if (time - syntheticLastTrackingAt < 50) return;
  syntheticLastTrackingAt = time;
  if (syntheticSetting === "empty") {
    contourSegments = [];
    applyTrackingData({ pose: null, face: null, leftHand: null, rightHand: null, hasMask: false });
  } else {
    applyTrackingData(createSyntheticTracking(time));
  }
}

function cycleTheme() {
  activeTheme = (activeTheme + 1) % THEMES.length;
  tintMask();
  if (lastTrackingData) renderTrackingOverlay(lastTrackingData);
  elements.themeButton.setAttribute("aria-label", `Current look: ${THEMES[activeTheme].name}. Change look`);
}

function configureInferenceForActivity(id) {
  const handsOnly = id !== "mirror";
  const width = handsOnly ? CONFIG.handInferenceWidth : CONFIG.inferenceWidth;
  const height = handsOnly ? CONFIG.handInferenceHeight : CONFIG.inferenceHeight;
  if (inferenceCanvas.width !== width || inferenceCanvas.height !== height) {
    inferenceCanvas.width = width;
    inferenceCanvas.height = height;
  }
  averageInferenceMs = 0;
  trackingIntervalMs = 0;
  lastTrackingResultAt = 0;
  lastInferenceAt = 0;
  lastInferenceCompletedAt = 0;
  lastVideoTime = -1;
  inferenceCooldownMs = handsOnly ? 12 : 45;
  inferenceFps = reducedPerformance ? CONFIG.minInferenceFps : CONFIG.initialInferenceFps;
}

function handleActivityChange(id) {
  window.clearTimeout(transitionTimer);
  elements.cameraExperience.classList.add("switching");
  elements.cameraExperience.dataset.activity = id;
  const activities = window.IMEXPLORING_ACTIVITIES || [];
  const index = activities.findIndex((activity) => activity.id === id);
  elements.activityNumber.textContent = `${Math.max(1, index + 1)} OF ${activities.length || 3}`;
  elements.themeButton.hidden = id !== "mirror";
  configureInferenceForActivity(id);
  if (id !== "mirror") {
    setTrackingRow(elements.trackBody, false, "Found", "Not needed");
    setTrackingRow(elements.trackFace, false, "Found", "Not needed");
  }
  particleContext.clearRect(0, 0, viewportWidth, viewportHeight);
  overlayContext.clearRect(0, 0, viewportWidth, viewportHeight);
  particleTargets = [];
  if (lastTrackingData) {
    renderTrackingOverlay(lastTrackingData);
    updateParticleTargets(lastTrackingData);
  }
  transitionTimer = window.setTimeout(() => elements.cameraExperience.classList.remove("switching"), 190);
}

function toggleReducedPerformance() {
  reducedPerformance = !reducedPerformance;
  elements.performanceButton.setAttribute("aria-pressed", String(reducedPerformance));
  elements.performanceButton.querySelector(".performance-state").textContent = reducedPerformance ? "Reduced effects" : "Full effects";
  inferenceFps = reducedPerformance ? CONFIG.minInferenceFps : CONFIG.initialInferenceFps;
  activityEngine?.setReducedPerformance(reducedPerformance);
  updatePerformanceLabel();
}

async function createHolisticModel() {
  if (holistic) return;
  if (typeof window.Holistic !== "function") throw new Error("The bundled MediaPipe runtime did not load.");

  holistic = new window.Holistic({
    locateFile: (file) => `vendor/mediapipe/holistic/${file}`,
  });
  holistic.setOptions({
    selfieMode: true,
    modelComplexity: 0,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: false,
    minDetectionConfidence: 0.55,
    minTrackingConfidence: 0.55,
  });
  holistic.onResults(handleResults);
  await holistic.initialize();
}

async function createHandsModel() {
  if (hands) return;
  if (typeof window.Hands !== "function") throw new Error("The bundled MediaPipe Hands runtime did not load.");

  hands = new window.Hands({
    locateFile: (file) => `vendor/mediapipe/hands/${file}`,
  });
  hands.setOptions({
    selfieMode: true,
    maxNumHands: 2,
    modelComplexity: 0,
    minDetectionConfidence: 0.55,
    minTrackingConfidence: 0.55,
  });
  hands.onResults(handleHandResults);
  await hands.initialize();
}

async function requestCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new DOMException("Camera access is not available in this browser context.", "NotSupportedError");
  }
  const cameraRequest = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: { ideal: 960, max: 1280 },
      height: { ideal: 540, max: 720 },
      frameRate: { ideal: 24, max: 24 },
    },
  });
  let timeoutId;
  const cameraTimeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new DOMException("The browser did not finish opening the camera.", "TimeoutError"));
    }, 20000);
  });

  try {
    mediaStream = await Promise.race([cameraRequest, cameraTimeout]);
  } finally {
    window.clearTimeout(timeoutId);
  }

  cameraRequest.then((stream) => {
    if (stream !== mediaStream) stream.getTracks().forEach((track) => track.stop());
  }).catch(() => {});

  elements.camera.srcObject = mediaStream;
  await elements.camera.play();
  if (!elements.camera.videoWidth) {
    await new Promise((resolve) => elements.camera.addEventListener("loadedmetadata", resolve, { once: true }));
  }
}

function cameraErrorCopy(error) {
  if (error?.name === "FileLaunchError") {
    return {
      title: "Start it with the local launcher",
      message: "This page was opened as a file, so the browser cannot load the bundled AI model. On Mac, double-click Launch-IMExploring2026.command. On Linux, run ./scripts/launch-kiosk.sh. Both use only 127.0.0.1.",
    };
  }
  if (error?.name === "NotAllowedError" || error?.name === "SecurityError") {
    return {
      title: "Camera permission is off",
      message: "Choose Allow for camera access in the browser’s address bar, then select Try again. The video stays on this laptop.",
    };
  }
  if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
    return { title: "No camera was found", message: "Connect or enable the laptop camera, then select Try again." };
  }
  if (error?.name === "NotReadableError" || error?.name === "TrackStartError") {
    return { title: "The camera is busy", message: "Close any other app using the camera, then select Try again." };
  }
  if (error?.name === "NotSupportedError") {
    return { title: "Open this from localhost", message: "Camera access requires the included local web server. Run ./scripts/serve.sh and open the localhost address shown." };
  }
  if (error?.name === "TimeoutError") {
    return { title: "Camera permission is still waiting", message: "Choose Allow in the browser’s camera prompt or address bar, then select Try again." };
  }
  return { title: "The experience could not start", message: "Reload the page or restart the local server, then try again." };
}

function stopCamera() {
  if (!mediaStream) return;
  mediaStream.getTracks().forEach((track) => track.stop());
  mediaStream = null;
  elements.camera.srcObject = null;
}

function showError(error) {
  const copy = cameraErrorCopy(error);
  elements.errorTitle.textContent = copy.title;
  elements.errorMessage.textContent = copy.message;
  elements.errorCard.hidden = false;
  elements.startButton.disabled = false;
  elements.startButton.querySelector("span").textContent = openedAsLocalFile ? "Show launch instructions" : "Start the camera";
  if (!openedAsLocalFile) elements.welcomeStatus.textContent = "";
}

function launchExperienceInterface() {
  elements.welcome.hidden = true;
  elements.cameraExperience.hidden = false;
  elements.startButton.disabled = false;
  elements.startButton.querySelector("span").textContent = syntheticMode ? "Start synthetic demo" : "Start the camera";
  elements.walkUpPrompt.classList.remove("is-hidden");
  elements.performance.textContent = syntheticMode ? "Synthetic tracking test" : "Warming up…";
  lastPersonSeenAt = performance.now();
  isRunning = true;
  requestAnimationFrame(animationLoop);
}

async function startExperience() {
  if (openedAsLocalFile) {
    showError(new DOMException("The AI model requires a localhost origin.", "FileLaunchError"));
    return;
  }
  elements.errorCard.hidden = true;
  elements.startButton.disabled = true;
  elements.startButton.querySelector("span").textContent = "Starting…";
  elements.welcomeStatus.textContent = syntheticMode ? "Starting synthetic tracking…" : "Checking the camera…";

  try {
    if (syntheticMode) {
      launchExperienceInterface();
      requestAnimationFrame(syntheticTrackingLoop);
      return;
    }
    await requestCamera();
    elements.welcomeStatus.textContent = "Loading the local AI model…";
    // The legacy MediaPipe Solutions loaders share a temporary global WebAssembly
    // module while they initialize. Starting both together can make one loader
    // resolve the other model's files. Initialize sequentially; once ready, the
    // two graph instances can be selected independently per activity.
    await createHolisticModel();
    await createHandsModel();

    launchExperienceInterface();
    requestAnimationFrame(inferenceLoop);
  } catch (error) {
    console.error("Startup failed", error);
    stopCamera();
    showError(error);
  }
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (error) {
    console.warn("Fullscreen request was declined", error);
  }
}

elements.startButton.addEventListener("click", startExperience);
elements.retryButton.addEventListener("click", startExperience);
elements.backButton.addEventListener("click", () => { elements.errorCard.hidden = true; });
elements.themeButton.addEventListener("click", cycleTheme);
elements.soundButton.addEventListener("click", () => activityEngine?.toggleSound());
elements.resetButton.addEventListener("click", () => activityEngine?.reset());
elements.performanceButton.addEventListener("click", toggleReducedPerformance);
elements.fullscreenButton.addEventListener("click", toggleFullscreen);

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key.toLowerCase() === "h" && isRunning && !event.repeat) {
    event.preventDefault();
    elements.detailsPanel.open = !elements.detailsPanel.open;
    elements.detailsToggle.focus();
  }
  if (event.key === "Escape" && elements.detailsPanel.open) {
    elements.detailsPanel.open = false;
    elements.detailsToggle.focus();
  }
  const activity = window.IMEXPLORING_ACTIVITIES?.[Number(event.key) - 1];
  if (activity) activityEngine?.setActivity(activity.id);
  if (event.key.toLowerCase() === "t") cycleTheme();
  if (event.key.toLowerCase() === "f") toggleFullscreen();
  if (event.key.toLowerCase() === "r") activityEngine?.reset();
  if (event.key.toLowerCase() === "m" && activityEngine?.mode === "painter") activityEngine.toggleSound();
  if (event.key === "Escape" && !elements.errorCard.hidden) elements.errorCard.hidden = true;
});

window.addEventListener("resize", resizeCanvases);
window.addEventListener("beforeunload", () => {
  stopCamera();
  holistic?.close();
  hands?.close();
  activityEngine?.audioContext?.close();
});

activityEngine = new window.ActivityEngine({
  canvas: elements.activityCanvas,
  mapPoint: normalizedToScreen,
  onChange: handleActivityChange,
});
resizeCanvases();
initializeParticles();

if (openedAsLocalFile) {
  elements.startButton.querySelector("span").textContent = "Show launch instructions";
  elements.welcomeStatus.textContent = "Opened as a file — use the included launcher to start the local AI model.";
} else if (syntheticMode) {
  elements.startButton.querySelector("span").textContent = "Start synthetic demo";
  elements.welcomeStatus.textContent = "Testing mode: generated pose and hand landmarks; no camera is used.";
}
