// Global variables
let canvas, ctx, video;
let particles = [];
let hands = null, faceMesh = null, camera = null;
let handLandmarks = [], faceLandmarks = [];
let mode = 'attract';
let currentTheme = 0;
let isRunning = false;
let lastFistTime = 0;
let targetPoints = [];
let particleCount = 12000;

const themes = {
    Rainbow: ['#ff0080', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#0080ff', '#8000ff'],
    Fire: ['#ff4500', '#ff6347', '#ffa500', '#ffff00', '#ff1493'],
    Ocean: ['#00bfff', '#1e90ff', '#4169e1', '#0000cd', '#191970'],
    Galaxy: ['#9400d3', '#4b0082', '#0000ff', '#00ff00', '#ffff00', '#ff7f00', '#ff0000'],
    Matrix: ['#00ff00', '#32cd32', '#90ee90', '#98fb98', '#f0fff0']
};

const themeNames = Object.keys(themes);
const PHI = 1.618033988749;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = 1;
        this.size = Math.random() * 2 + 0.5;
        this.trail = [];
        this.targetX = x;
        this.targetY = y;
        this.assignedTarget = null;
        this.energy = Math.random() * 0.1 + 0.05;
    }

    update() {
        // Find closest target point
        if (targetPoints.length > 0) {
            let nearestDist = Infinity;
            let nearestTarget = null;
            
            targetPoints.forEach(target => {
                const dist = Math.hypot(this.x - target.x, this.y - target.y);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestTarget = target;
                }
            });
            
            if (nearestTarget) {
                const force = mode === 'attract' ? this.energy : -this.energy * 2;
                const dx = nearestTarget.x - this.x;
                const dy = nearestTarget.y - this.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist > 0) {
                    const normalizedDx = dx / dist;
                    const normalizedDy = dy / dist;
                    
                    // Stronger attraction when closer
                    const distanceForce = Math.min(1, 100 / (dist + 1));
                    
                    this.vx += normalizedDx * force * distanceForce;
                    this.vy += normalizedDy * force * distanceForce;
                }
            }
        } else {
            // Random movement when no targets
            this.vx += (Math.random() - 0.5) * 0.01;
            this.vy += (Math.random() - 0.5) * 0.01;
        }
        
        // Apply friction
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        // Update trail
        this.trail.push({x: this.x, y: this.y, alpha: 1});
        if (this.trail.length > 8) this.trail.shift();
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Boundary conditions
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.3;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.3;
        
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
        const colors = themes[themeNames[currentTheme]];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Draw trail
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < this.trail.length - 1; i++) {
            const alpha = (i / this.trail.length) * 0.4;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.trail[i].x, this.trail[i].y);
            ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
            ctx.stroke();
        }
        
        // Draw particle
        ctx.globalAlpha = this.life;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
}

function generateHandTargets(landmarks) {
    const connections = [
        [0,1],[1,2],[2,3],[3,4], // thumb
        [0,5],[5,6],[6,7],[7,8], // index
        [0,9],[9,10],[10,11],[11,12], // middle
        [0,13],[13,14],[14,15],[15,16], // ring
        [0,17],[17,18],[18,19],[19,20], // pinky
        [5,9],[9,13],[13,17] // palm
    ];
    
    let targets = [];
    
    // Generate points along bone connections
    connections.forEach(([start, end]) => {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];
        
        const segments = [4,8,12,16,20].includes(end) ? 8 : 12; // More points for fingertips
        
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const x = startPoint.x + (endPoint.x - startPoint.x) * t;
            const y = startPoint.y + (endPoint.y - startPoint.y) * t;
            
            // Add some spread using golden ratio
            const spread = [4,8,12,16,20].includes(end) ? 2 : 8;
            const angle = t * PHI * 4;
            const offsetX = Math.cos(angle) * spread * (1 - t);
            const offsetY = Math.sin(angle) * spread * (1 - t);
            
            targets.push({x: x + offsetX, y: y + offsetY, type: 'hand'});
        }
    });
    
    return targets;
}

function drawHandSkeleton(landmarks) {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 5;
    
    const connections = [
        [0,1],[1,2],[2,3],[3,4],
        [0,5],[5,6],[6,7],[7,8],
        [0,9],[9,10],[10,11],[11,12],
        [0,13],[13,14],[14,15],[15,16],
        [0,17],[17,18],[18,19],[19,20],
        [5,9],[9,13],[13,17]
    ];
    
    connections.forEach(([start, end]) => {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];
        
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
    });
    
    landmarks.forEach((landmark, i) => {
        const size = [4,8,12,16,20].includes(i) ? 6 : 4;
        ctx.fillStyle = i === 0 ? '#ff69b4' : '#00ffff';
        ctx.beginPath();
        ctx.arc(landmark.x, landmark.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.shadowBlur = 0;
}

function generateFaceTargets(landmarks) {
    let targets = [];
    
    // Dense face mesh points
    const faceRegions = {
        oval: [10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109],
        leftEye: [33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246],
        rightEye: [362,398,384,385,386,387,388,466,263,249,390,373,374,380,381,382],
        lips: [61,84,17,314,405,320,307,375,321,308,324,318],
        nose: [1,2,5,4,6,19,20,94,125,141,235,236,3,51,48,115,131,134,102,49,220,305,290,328,326,2,97,99,68,67]
    };
    
    Object.entries(faceRegions).forEach(([region, indices]) => {
        indices.forEach(i => {
            if (landmarks[i]) {
                const point = landmarks[i];
                // Add depth boost for nose, cheekbones
                const depthBoost = region === 'nose' ? point.z * 20 : 0;
                
                // Dense clustering for face mesh
                for (let j = 0; j < 3; j++) {
                    const angle = (j / 3) * Math.PI * 2;
                    const radius = 1;
                    targets.push({
                        x: point.x + Math.cos(angle) * radius,
                        y: point.y + Math.sin(angle) * radius + depthBoost,
                        type: 'face'
                    });
                }
            }
        });
    });
    
    return targets;
}

function drawFaceMesh(landmarks) {
    ctx.globalAlpha = 0.6;
    
    // Face oval
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;
    const faceOval = [10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
    
    ctx.beginPath();
    faceOval.forEach((i, idx) => {
        const point = landmarks[i];
        if (idx === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
    
    // Eyes
    ctx.strokeStyle = '#40e0d0';
    const leftEye = [33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246];
    const rightEye = [362,398,384,385,386,387,388,466,263,249,390,373,374,380,381,382];
    
    [leftEye, rightEye].forEach(eye => {
        ctx.beginPath();
        eye.forEach((i, idx) => {
            const point = landmarks[i];
            if (idx === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.stroke();
    });
    
    // Lips
    ctx.strokeStyle = '#ff69b4';
    const lips = [61,84,17,314,405,320,307,375,321,308,324,318];
    ctx.beginPath();
    lips.forEach((i, idx) => {
        const point = landmarks[i];
        if (idx === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
    
    ctx.globalAlpha = 1;
}

function detectFist(landmarks) {
    if (!landmarks || landmarks.length < 21) return false;
    
    const fingerTips = [4, 8, 12, 16, 20];
    const fingerBases = [3, 6, 10, 14, 18];
    
    let closedFingers = 0;
    
    for (let i = 0; i < fingerTips.length; i++) {
        const tip = landmarks[fingerTips[i]];
        const base = landmarks[fingerBases[i]];
        const wrist = landmarks[0];
        
        const tipDist = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
        const baseDist = Math.hypot(base.x - wrist.x, base.y - wrist.y);
        
        if (tipDist < baseDist * 1.1) closedFingers++;
    }
    
    return closedFingers >= 4;
}

function onHandResults(results) {
    handLandmarks = [];
    let handTargets = [];
    
    if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach(landmarks => {
            const scaledLandmarks = landmarks.map(landmark => ({
                x: landmark.x * canvas.width,
                y: landmark.y * canvas.height,
                z: landmark.z
            }));
            
            handLandmarks.push(...scaledLandmarks);
            handTargets.push(...generateHandTargets(scaledLandmarks));
            drawHandSkeleton(scaledLandmarks);
            
            if (detectFist(scaledLandmarks)) {
                const now = Date.now();
                if (now - lastFistTime > 1000) {
                    cycleTheme();
                    lastFistTime = now;
                }
            }
        });
    }
    
    // Update target points for hands
    targetPoints = targetPoints.filter(p => p.type !== 'hand');
    targetPoints.push(...handTargets);
    
    updateStatus();
}

function onFaceResults(results) {
    faceLandmarks = [];
    let faceTargets = [];
    
    if (results.multiFaceLandmarks) {
        results.multiFaceLandmarks.forEach(landmarks => {
            const scaledLandmarks = landmarks.map(landmark => ({
                x: landmark.x * canvas.width,
                y: landmark.y * canvas.height,
                z: landmark.z
            }));
            
            faceLandmarks.push(...scaledLandmarks);
            faceTargets.push(...generateFaceTargets(scaledLandmarks));
            drawFaceMesh(scaledLandmarks);
        });
    }
    
    // Update target points for face
    targetPoints = targetPoints.filter(p => p.type !== 'face');
    targetPoints.push(...faceTargets);
}

function animate() {
    if (!isRunning) return;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

function updateStatus() {
    const status = document.getElementById('status');
    if (handLandmarks.length === 0 && faceLandmarks.length === 0) {
        status.textContent = 'Show your hands or face';
    } else {
        const handCount = Math.floor(handLandmarks.length / 21);
        const faceCount = Math.floor(faceLandmarks.length / 468);
        status.textContent = `Tracking: ${handCount} hands, ${faceCount} faces`;
    }
}

function toggleMode() {
    mode = mode === 'attract' ? 'repel' : 'attract';
    document.getElementById('modeText').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
}

function cycleTheme() {
    currentTheme = (currentTheme + 1) % themeNames.length;
    document.getElementById('themeText').textContent = themeNames[currentTheme];
}

function toggleCamera() {
    const video = document.getElementById('video');
    video.classList.toggle('hidden');
}

async function startApp() {
    document.getElementById('introScreen').classList.add('hidden');
    document.getElementById('controls').classList.remove('hidden');
    document.getElementById('status').classList.remove('hidden');
    document.getElementById('shortcuts').classList.remove('hidden');
    document.getElementById('video').classList.remove('hidden');
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    video = document.getElementById('video');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initParticles();
    
    // Initialize MediaPipe
    hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });
    
    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    
    hands.onResults(onHandResults);
    
    faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });
    
    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    
    faceMesh.onResults(onFaceResults);
    
    // Start camera
    camera = new Camera(video, {
        onFrame: async () => {
            await hands.send({image: video});
            await faceMesh.send({image: video});
        },
        width: 1280,
        height: 720
    });
    
    await camera.start();
    
    isRunning = true;
    animate();
    
    document.getElementById('status').textContent = 'Show your hands or face';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleMode();
    } else if (e.key.toLowerCase() === 'v') {
        toggleCamera();
    }
});

// Resize handler
window.addEventListener('resize', () => {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});