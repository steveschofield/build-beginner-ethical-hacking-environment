"use strict";

(function registerActivityEngine() {
  const DEFINITIONS = [
    {
      id: "mirror",
      number: "1",
      icon: "◉",
      label: "AI Mirror",
      title: "AI Mirror",
      instruction: "Move closer, raise your hands, and watch landmarks become an outline.",
      lesson: "A silhouette shows shape; landmarks show coordinates. Neither one needs to know who you are.",
      prompt: "Raise a hand and move around",
    },
    {
      id: "shield",
      number: "2",
      icon: "⬡",
      label: "Cyber Shield",
      title: "Cybersecurity Shield",
      instruction: "Block suspicious messages with your hands. Let safe messages pass.",
      lesson: "Pause before clicking: check the sender, urgency, link destination, and unexpected attachments.",
      prompt: "Raise your hands to activate the shields",
    },
    {
      id: "painter",
      number: "3",
      icon: "〰",
      label: "Music Painter",
      title: "Gesture Music Painter",
      instruction: "Paint with your fingertips. Higher gestures make higher notes when sound is on.",
      lesson: "Movement coordinates can control color, shape, and sound—no microphone required.",
      prompt: "Show a hand and draw in the air",
    },
  ];

  const PHISHING_MESSAGES = [
    { label: "URGENT: verify your password", detail: "login-reset.example", suspicious: true },
    { label: "Invoice_8842.zip", detail: "Unexpected attachment", suspicious: true },
    { label: "You won a free phone!", detail: "Claim in 10 minutes", suspicious: true },
    { label: "MFA code requested", detail: "Share this code now", suspicious: true },
    { label: "Library hours updated", detail: "school.example/library", suspicious: false },
    { label: "Career fair map", detail: "Saved event resource", suspicious: false },
    { label: "Meeting accepted", detail: "Your calendar response", suspicious: false },
    { label: "Assignment feedback", detail: "Learning portal notification", suspicious: false },
  ];

  const NOTE_FREQUENCIES = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33];

  function roundedRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function visiblePoint(landmarks, index) {
    const point = landmarks?.[index];
    return point && (point.visibility ?? 1) > 0.4 ? point : null;
  }

  function cloneLandmarks(landmarks) {
    return landmarks?.map((point) => ({ ...point })) || null;
  }

  function smoothLandmarks(current, target, alpha) {
    if (!target?.length) return null;
    if (!current || current.length !== target.length) return cloneLandmarks(target);
    for (let index = 0; index < target.length; index += 1) {
      const destination = target[index];
      const point = current[index];
      point.x += (destination.x - point.x) * alpha;
      point.y += (destination.y - point.y) * alpha;
      point.z = (point.z ?? 0) + ((destination.z ?? 0) - (point.z ?? 0)) * alpha;
      point.visibility = (point.visibility ?? 1) + ((destination.visibility ?? 1) - (point.visibility ?? 1)) * alpha;
    }
    return current;
  }

  class ActivityEngine {
    constructor(options) {
      this.canvas = options.canvas;
      this.context = this.canvas.getContext("2d");
      this.mapPoint = options.mapPoint;
      this.onChange = options.onChange;
      this.width = 1;
      this.height = 1;
      this.pixelRatio = 1;
      this.mode = "mirror";
      this.tracking = null;
      this.targetTracking = null;
      this.reducedPerformance = false;
      this.lastFrameAt = performance.now();
      this.lastTrackingAt = 0;
      this.inputIntervalMs = 60;
      this.paintStrokes = { left: [], right: [] };
      this.shieldItems = [];
      this.shieldScore = 0;
      this.lastShieldSpawn = 0;
      this.shieldFeedback = "Read the clues before you block.";
      this.audioMuted = true;
      this.audioContext = null;
      this.lastNoteAt = 0;
      this.lastNoteIndex = -1;
      this.motionFrames = 0;
      this.motionFps = 0;
      this.motionSampleAt = performance.now();
      this.lastMotionPoint = null;

      this.paintBuffer = document.createElement("canvas");
      this.paintBufferContext = this.paintBuffer.getContext("2d");

      this.guide = document.querySelector("#activity-guide");
      this.guideTitle = document.querySelector("#activity-title");
      this.guideInstruction = document.querySelector("#activity-instruction");
      this.guideLesson = document.querySelector("#activity-lesson");
      this.feedback = document.querySelector("#activity-feedback");
      this.score = document.querySelector("#shield-score");
      this.soundButton = document.querySelector("#sound-button");
      this.activityButtons = [...document.querySelectorAll("[data-activity]")];
      this.walkUpPrompt = document.querySelector("#walk-up-prompt p");

      this.activityButtons.forEach((button) => {
        button.addEventListener("click", () => this.setActivity(button.dataset.activity));
      });
      this.updateInterface();
    }

    get definition() {
      return DEFINITIONS.find((item) => item.id === this.mode) || DEFINITIONS[0];
    }

    resize(width, height, pixelRatio) {
      this.width = width;
      this.height = height;
      this.pixelRatio = pixelRatio;
      this.canvas.width = Math.round(width * pixelRatio);
      this.canvas.height = Math.round(height * pixelRatio);
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      this.paintBuffer.width = Math.round(width * pixelRatio);
      this.paintBuffer.height = Math.round(height * pixelRatio);
      this.paintBufferContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      this.paintStrokes = { left: [], right: [] };
    }

    setActivity(id) {
      if (!DEFINITIONS.some((item) => item.id === id) || id === this.mode) return;
      this.mode = id;
      this.reset();
      this.updateInterface();
      this.onChange?.(id);
    }

    updateInterface() {
      const definition = this.definition;
      this.activityButtons.forEach((button) => {
        const active = button.dataset.activity === this.mode;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      if (this.guideTitle) this.guideTitle.textContent = definition.title;
      if (this.guideInstruction) this.guideInstruction.textContent = definition.instruction;
      if (this.guideLesson) this.guideLesson.textContent = definition.lesson;
      if (this.walkUpPrompt) this.walkUpPrompt.innerHTML = `<strong>Step into the frame</strong><br>${definition.prompt}`;
      this.soundButton?.toggleAttribute("hidden", this.mode !== "painter");
      this.score?.toggleAttribute("hidden", this.mode !== "shield");
      this.feedback?.toggleAttribute("hidden", !["shield", "painter"].includes(this.mode));
      this.updateStatusText();
    }

    updateStatusText() {
      if (!this.feedback) return;
      if (this.mode === "shield") this.feedback.textContent = this.shieldFeedback;
      else if (this.mode === "painter") this.feedback.textContent = this.audioMuted ? "Sound is muted. Your gestures still paint." : "Sound is on. Height chooses the note.";
      if (this.score) this.score.textContent = `Cyber score ${this.shieldScore}`;
      if (this.soundButton) {
        this.soundButton.setAttribute("aria-pressed", String(!this.audioMuted));
        this.soundButton.querySelector(".sound-state").textContent = this.audioMuted ? "Sound off" : "Sound on";
      }
    }

    setReducedPerformance(enabled) {
      this.reducedPerformance = enabled;
      const maxPoints = enabled ? 240 : 700;
      Object.values(this.paintStrokes).forEach((stroke) => {
        if (stroke.length > maxPoints) stroke.splice(0, stroke.length - maxPoints);
      });
    }

    reset() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.paintBufferContext.clearRect(0, 0, this.width, this.height);
      this.paintStrokes = { left: [], right: [] };
      this.shieldItems = [];
      this.shieldScore = 0;
      this.lastShieldSpawn = 0;
      this.shieldFeedback = "Read the clues before you block.";
      this.updateStatusText();
    }

    async toggleSound() {
      this.audioMuted = !this.audioMuted;
      if (!this.audioMuted) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
          this.audioMuted = true;
          this.feedback.textContent = "This browser cannot play Web Audio; painting still works.";
          return;
        }
        this.audioContext ||= new AudioContextClass();
        if (this.audioContext.state === "suspended") await this.audioContext.resume();
      }
      this.updateStatusText();
    }

    updateTracking(tracking, timestamp = performance.now()) {
      this.targetTracking = tracking;
      if (!this.tracking || (!tracking?.pose && !tracking?.leftHand && !tracking?.rightHand)) {
        this.tracking = tracking ? {
          pose: cloneLandmarks(tracking.pose),
          face: tracking.face,
          leftHand: cloneLandmarks(tracking.leftHand),
          rightHand: cloneLandmarks(tracking.rightHand),
          hasMask: tracking.hasMask,
        } : null;
      }
      const elapsed = Math.max(16, timestamp - this.lastTrackingAt);
      if (this.lastTrackingAt) {
        this.inputIntervalMs = this.inputIntervalMs * 0.82 + elapsed * 0.18;
      }
      this.lastTrackingAt = timestamp;
    }

    advanceTracking(delta, timestamp) {
      const target = this.targetTracking;
      if (!target || (!target.pose && !target.leftHand && !target.rightHand)) {
        this.tracking = target;
        this.lastMotionPoint = null;
        return;
      }
      this.tracking ||= {};
      // Render between tracking results instead of jumping to each new result.
      // The time constants follow the measured input cadence, but are capped so
      // a temporarily slow model does not leave the visitor far behind.
      const poseTau = Math.min(180, Math.max(70, this.inputIntervalMs * (this.reducedPerformance ? 1 : 0.82)));
      const handTau = Math.min(140, Math.max(48, this.inputIntervalMs * (this.reducedPerformance ? 0.82 : 0.64)));
      const poseAlpha = 1 - Math.exp(-delta / poseTau);
      const handAlpha = 1 - Math.exp(-delta / handTau);
      this.tracking.pose = smoothLandmarks(this.tracking.pose, target.pose, poseAlpha);
      this.tracking.leftHand = smoothLandmarks(this.tracking.leftHand, target.leftHand, handAlpha);
      this.tracking.rightHand = smoothLandmarks(this.tracking.rightHand, target.rightHand, handAlpha);
      this.tracking.face = target.face;
      this.tracking.hasMask = target.hasMask;

      const motionPoint = visiblePoint(this.tracking.leftHand, 8) || visiblePoint(this.tracking.rightHand, 8) || visiblePoint(this.tracking.pose, 15);
      if (motionPoint && this.lastMotionPoint && Math.hypot(motionPoint.x - this.lastMotionPoint.x, motionPoint.y - this.lastMotionPoint.y) > 0.00004) {
        this.motionFrames += 1;
      }
      this.lastMotionPoint = motionPoint ? { x: motionPoint.x, y: motionPoint.y } : null;
      if (timestamp - this.motionSampleAt >= 1000) {
        this.motionFps = Math.round((this.motionFrames * 1000) / (timestamp - this.motionSampleAt));
        this.motionFrames = 0;
        this.motionSampleAt = timestamp;
      }
    }

    getMotionFps() {
      return this.motionFps;
    }

    capturePaint(hands, timestamp) {
      const maxPoints = this.reducedPerformance ? 240 : 700;
      Object.entries(hands).forEach(([side, hand]) => {
        if (!hand) return;
        const previous = this.paintStrokes[side].at(-1);
        if (previous && Math.hypot(previous.x - hand.x, previous.y - hand.y) < 0.006) return;
        const hue = Math.round((1 - hand.y) * 250 + hand.x * 100) % 360;
        const current = { x: hand.x, y: hand.y, hue, at: timestamp };
        this.paintStrokes[side].push(current);
        if (this.paintStrokes[side].length > maxPoints) this.paintStrokes[side].shift();
        if (previous) {
          const from = this.mapPoint(previous);
          const to = this.mapPoint(current);
          const context = this.paintBufferContext;
          context.save();
          context.globalCompositeOperation = "lighter";
          context.globalAlpha = 0.82;
          context.strokeStyle = `hsl(${hue} 92% 66%)`;
          context.lineWidth = 3.2;
          context.lineCap = "round";
          context.shadowColor = context.strokeStyle;
          context.shadowBlur = this.reducedPerformance ? 5 : 10;
          context.beginPath();
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
          context.stroke();
          context.restore();
        }
        if (!this.audioMuted) this.playPaintNote(hand, timestamp);
      });
    }

    playPaintNote(hand, timestamp) {
      if (!this.audioContext || timestamp - this.lastNoteAt < 110) return;
      const noteIndex = Math.max(0, Math.min(NOTE_FREQUENCIES.length - 1, Math.floor((1 - hand.y) * NOTE_FREQUENCIES.length)));
      if (noteIndex === this.lastNoteIndex && timestamp - this.lastNoteAt < 240) return;
      this.lastNoteAt = timestamp;
      this.lastNoteIndex = noteIndex;
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = NOTE_FREQUENCIES[noteIndex];
      gain.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, this.audioContext.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.11);
      oscillator.connect(gain).connect(this.audioContext.destination);
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.12);
    }

    render(time) {
      const delta = Math.min(50, time - this.lastFrameAt || 16);
      this.lastFrameAt = time;
      this.advanceTracking(delta, time);
      if (this.mode === "painter") {
        this.capturePaint({
          left: visiblePoint(this.tracking?.leftHand, 8) || visiblePoint(this.tracking?.leftHand, 9),
          right: visiblePoint(this.tracking?.rightHand, 8) || visiblePoint(this.tracking?.rightHand, 9),
        }, time);
      }
      this.context.clearRect(0, 0, this.width, this.height);
      if (this.mode === "shield") this.renderShield(time, delta);
      else if (this.mode === "painter") this.renderPainter(time);
    }

    spawnShieldItem(time) {
      const minimumDelay = this.reducedPerformance ? 1550 : 1100;
      if (time - this.lastShieldSpawn < minimumDelay || this.shieldItems.length >= (this.reducedPerformance ? 5 : 8)) return;
      this.lastShieldSpawn = time;
      const source = PHISHING_MESSAGES[Math.floor(Math.random() * PHISHING_MESSAGES.length)];
      this.shieldItems.push({
        ...source,
        x: 0.18 + Math.random() * 0.67,
        y: -0.12,
        speed: 0.13 + Math.random() * 0.07,
        rotation: (Math.random() - 0.5) * 0.08,
      });
    }

    renderShield(time, delta) {
      this.spawnShieldItem(time);
      const context = this.context;
      const hands = [visiblePoint(this.tracking?.leftHand, 9), visiblePoint(this.tracking?.rightHand, 9)].filter(Boolean);
      const handPoints = hands.map((hand) => this.mapPoint(hand));
      const resolved = [];

      this.shieldItems.forEach((item) => {
        item.y += item.speed * (delta / 1000);
        const point = this.mapPoint(item);
        const collided = handPoints.some((hand) => Math.hypot(hand.x - point.x, hand.y - point.y) < 82);
        if (collided) {
          if (item.suspicious) {
            this.shieldScore += 1;
            this.shieldFeedback = "Nice block — urgency, password requests, and odd links are warning signs.";
          } else {
            this.shieldScore = Math.max(0, this.shieldScore - 1);
            this.shieldFeedback = "That one was safe. Check context and sender before deciding.";
          }
          resolved.push(item);
          return;
        }
        if (item.y > 0.88) {
          if (item.suspicious) {
            this.shieldScore = Math.max(0, this.shieldScore - 1);
            this.shieldFeedback = "A suspicious message slipped through. Slow down and inspect the clues.";
          } else {
            this.shieldScore += 1;
            this.shieldFeedback = "Correct — safe, expected messages can continue.";
          }
          resolved.push(item);
          return;
        }
        this.drawMessageCard(item, point);
      });

      if (resolved.length) {
        this.shieldItems = this.shieldItems.filter((item) => !resolved.includes(item));
        this.updateStatusText();
      }
      handPoints.forEach((point) => this.drawShield(point, time));
    }

    drawMessageCard(item, point) {
      const context = this.context;
      const width = Math.min(238, this.width * 0.2);
      const height = 78;
      context.save();
      context.translate(point.x, point.y);
      context.rotate(item.rotation);
      roundedRect(context, -width / 2, -height / 2, width, height, 14);
      context.fillStyle = "rgba(7, 29, 18, 0.96)";
      context.fill();
      context.strokeStyle = item.suspicious ? "rgba(255, 103, 145, 0.72)" : "rgba(93, 235, 181, 0.72)";
      context.lineWidth = 2;
      context.stroke();
      context.textAlign = "left";
      context.fillStyle = "#f6f8ff";
      context.font = "700 13px system-ui";
      context.fillText(item.label.slice(0, 29), -width / 2 + 16, -7, width - 32);
      context.fillStyle = "#c3d6c8";
      context.font = "11px system-ui";
      context.fillText(item.detail.slice(0, 34), -width / 2 + 16, 16, width - 32);
      context.restore();
    }

    drawShield(point, time) {
      const context = this.context;
      const pulse = 1 + Math.sin(time * 0.006) * 0.04;
      context.save();
      context.translate(point.x, point.y);
      context.scale(pulse, pulse);
      context.beginPath();
      context.moveTo(0, -54);
      context.lineTo(48, -34);
      context.lineTo(40, 27);
      context.quadraticCurveTo(0, 62, -40, 27);
      context.lineTo(-48, -34);
      context.closePath();
      context.fillStyle = "rgba(255, 202, 5, 0.12)";
      context.strokeStyle = "#ffca05";
      context.lineWidth = 3;
      context.shadowColor = "#ffca05";
      context.shadowBlur = 20;
      context.fill();
      context.stroke();
      context.restore();
    }

    renderPainter(time) {
      const context = this.context;
      context.drawImage(this.paintBuffer, 0, 0, this.paintBuffer.width, this.paintBuffer.height, 0, 0, this.width, this.height);
      context.save();
      context.globalCompositeOperation = "lighter";
      Object.entries(this.paintStrokes).forEach(([side, points]) => {
        if (!points.length) return;
        const latest = this.mapPoint(points.at(-1));
        context.globalAlpha = 0.9;
        context.fillStyle = side === "left" ? "#ffca05" : "#b1d33d";
        context.beginPath();
        context.arc(latest.x, latest.y, 8 + Math.sin(time * 0.008) * 2, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();
    }

  }

  window.IMEXPLORING_ACTIVITIES = DEFINITIONS;
  window.ActivityEngine = ActivityEngine;
})();
