/**
 * Teachers' Day 2026 — TCET
 * Interactive invitation script
 * — Petal / flower particle animation
 * — Open Invitation transition
 * — Generative ambient music via Web Audio API (no external files needed)
 * — Mute / unmute control
 */

'use strict';

/* ═══════════════════════════════════════════════
   1. DOM References
═══════════════════════════════════════════════ */
const landingScreen    = document.getElementById('landingScreen');
const invitationWrap   = document.getElementById('invitationWrap');
const invitationCard   = document.getElementById('invitationCard');
const openInvitationBtn = document.getElementById('openInvitationBtn');
const backBtn          = document.getElementById('backBtn');
const musicBtn         = document.getElementById('musicBtn');
const musicIcon        = document.getElementById('musicIcon');
const canvas           = document.getElementById('petalCanvas');
const ctx              = canvas.getContext('2d');

/* ═══════════════════════════════════════════════
   2. Petal / Flower Particle System
═══════════════════════════════════════════════ */

// Resize canvas to fill viewport
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

// Petal colours — warm Indian palette
const PETAL_COLORS = [
  'rgba(255, 180, 100, 0.7)',   // marigold orange
  'rgba(220, 150,  80, 0.65)',  // deep marigold
  'rgba(255, 210, 120, 0.6)',   // pale gold
  'rgba(230, 120,  80, 0.55)',  // terracotta
  'rgba(255, 240, 180, 0.5)',   // cream
  'rgba(200, 160, 100, 0.6)',   // warm brown-gold
  'rgba(255, 200, 140, 0.65)',  // soft apricot
];

// Each petal object
class Petal {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x     = Math.random() * canvas.width;
    this.y     = initial ? Math.random() * canvas.height : -30;
    this.size  = 5 + Math.random() * 9;
    this.speedY = 0.5 + Math.random() * 1.2;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.angle  = Math.random() * Math.PI * 2;
    this.spin   = (Math.random() - 0.5) * 0.04;
    this.sway   = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.012 + Math.random() * 0.015;
    this.swayAmt  = 0.6 + Math.random() * 1.2;
    this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    this.opacity = 0.5 + Math.random() * 0.5;
    // Shape: 0 = oval petal, 1 = teardrop, 2 = circle dot
    this.shape = Math.random() < 0.6 ? 0 : (Math.random() < 0.5 ? 1 : 2);
  }

  update() {
    this.y    += this.speedY;
    this.sway += this.swaySpeed;
    this.x    += Math.sin(this.sway) * this.swayAmt + this.speedX;
    this.angle += this.spin;
    if (this.y > canvas.height + 30) this.reset();
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    if (this.shape === 0) {
      // Oval petal
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.45, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 1) {
      // Teardrop
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(
        this.size * 0.6, -this.size * 0.4,
        this.size * 0.6,  this.size * 0.4,
        0, this.size * 0.7
      );
      ctx.bezierCurveTo(
        -this.size * 0.6, this.size * 0.4,
        -this.size * 0.6, -this.size * 0.4,
        0, -this.size
      );
      ctx.fill();
    } else {
      // Small circle dot
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.38, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// Responsive petal count
function petalCount() {
  const area = canvas.width * canvas.height;
  if (area < 400000) return 22;   // small phones
  if (area < 800000) return 32;   // tablets
  return 42;                       // desktop
}

let petals = [];

function initPetals() {
  petals = Array.from({ length: petalCount() }, () => new Petal());
}
initPetals();

// Re-init on significant resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initPetals, 400);
}, { passive: true });

// Animation loop — uses requestAnimationFrame for 60fps
let animFrameId;
function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => { p.update(); p.draw(); });
  animFrameId = requestAnimationFrame(animatePetals);
}
animatePetals();

// Respect reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  cancelAnimationFrame(animFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


/* ═══════════════════════════════════════════════
   3. Open Invitation Transition
═══════════════════════════════════════════════ */
openInvitationBtn.addEventListener('click', openInvitation);

function openInvitation() {
  // 1. Fade out landing
  landingScreen.classList.add('hide-out');

  // 2. After landing fades, show invitation
  setTimeout(() => {
    landingScreen.style.display = 'none';

    invitationWrap.setAttribute('aria-hidden', 'false');
    invitationWrap.classList.add('visible');

    // Trigger reflow before adding revealed class
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        invitationWrap.classList.add('revealed');
        // Stagger card children
        setTimeout(() => {
          invitationCard.classList.add('animate');
        }, 80);
      });
    });

    // Scroll to top of card smoothly
    invitationWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });

  }, 580);
}

/* ═══════════════════════════════════════════════
   4. Back Button — return to landing
═══════════════════════════════════════════════ */
backBtn.addEventListener('click', backToLanding);

function backToLanding() {
  // Fade out invitation
  invitationWrap.classList.remove('revealed');
  invitationCard.classList.remove('animate');

  setTimeout(() => {
    invitationWrap.classList.remove('visible');
    invitationWrap.setAttribute('aria-hidden', 'true');

    landingScreen.style.display = '';
    landingScreen.classList.remove('hide-out');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 650);
}


/* ═══════════════════════════════════════════════
   5. Ambient Music — Web Audio API
   Generates a soft, looping sarod/veena-like
   ambient tone without any external audio file.
   Completely free, no libraries, works offline.
═══════════════════════════════════════════════ */

let audioCtx = null;
let musicPlaying = false;
let masterGain = null;
let oscillators = [];
let musicInterval = null;

// Pentatonic scale frequencies (Sa-Ga-Pa-Ni in Indian music / D pentatonic)
const PENTATONIC = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25];

function buildAudioContext() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Master gain (controls overall volume)
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 1.8);
  masterGain.connect(audioCtx.destination);

  // Reverb-like convolver using noise IR
  const convolver = audioCtx.createConvolver();
  const irLength  = audioCtx.sampleRate * 2.5;
  const irBuffer  = audioCtx.createBuffer(2, irLength, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = irBuffer.getChannelData(ch);
    for (let i = 0; i < irLength; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLength, 2.5);
    }
  }
  convolver.buffer = irBuffer;

  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.35;

  convolver.connect(reverbGain);
  reverbGain.connect(masterGain);

  // Drone base (Sa — tonic D3)
  const droneFreqs = [146.83, 220.00, 293.66]; // D2, A2, D3
  droneFreqs.forEach((freq, i) => {
    const osc   = audioCtx.createOscillator();
    const gain  = audioCtx.createGain();

    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.value = freq;
    gain.gain.value = i === 0 ? 0.08 : 0.04;

    osc.connect(gain);
    gain.connect(masterGain);
    gain.connect(convolver);
    osc.start();
    oscillators.push(osc);
  });

  // Melodic notes: pluck a pentatonic note periodically
  scheduleMelody(convolver);
}

function scheduleMelody(convolver) {
  let step = 0;
  // Pre-defined melodic sequence (indices into PENTATONIC)
  const sequence = [0, 2, 4, 5, 3, 2, 1, 0, 4, 3, 5, 2, 0, 1, 3, 4];

  function pluck() {
    if (!musicPlaying || !audioCtx) return;

    const freq  = PENTATONIC[sequence[step % sequence.length]];
    const now   = audioCtx.currentTime;

    // Create plucked string-like sound
    const osc   = audioCtx.createOscillator();
    const gain  = audioCtx.createGain();
    const filt  = audioCtx.createBiquadFilter();

    filt.type            = 'bandpass';
    filt.frequency.value = freq * 2;
    filt.Q.value         = 4;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.999, now + 0.8);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(filt);
    filt.connect(gain);
    gain.connect(masterGain);
    gain.connect(convolver);

    osc.start(now);
    osc.stop(now + 1.6);

    step++;

    // Variable interval: 0.9 – 2.2 seconds between notes
    const nextIn = 900 + Math.random() * 1300;
    musicInterval = setTimeout(pluck, nextIn);
  }

  // Start first pluck after short delay
  musicInterval = setTimeout(pluck, 1200);
}

function startMusic() {
  buildAudioContext();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (masterGain) {
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.28, audioCtx.currentTime + 1.2);
  }
  musicPlaying = true;
  musicBtn.classList.add('playing');
  musicIcon.textContent = '♫';
  musicBtn.setAttribute('aria-label', 'Mute background music');
  musicBtn.title = 'Mute Music';
}

function stopMusic() {
  if (!audioCtx || !masterGain) return;
  masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
  masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
  musicPlaying = false;
  clearTimeout(musicInterval);
  musicBtn.classList.remove('playing');
  musicIcon.textContent = '♪';
  musicBtn.setAttribute('aria-label', 'Play background music');
  musicBtn.title = 'Play Music';
}

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

// Auto-start music on first interaction (browser autoplay policy)
let musicAutoStarted = false;
function autoStartMusic() {
  if (!musicAutoStarted) {
    musicAutoStarted = true;
    startMusic();
  }
}
document.addEventListener('click', autoStartMusic, { once: true });
document.addEventListener('touchstart', autoStartMusic, { once: true, passive: true });


/* ═══════════════════════════════════════════════
   6. Keyboard accessibility
═══════════════════════════════════════════════ */
openInvitationBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});

backBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    backToLanding();
  }
});


/* ═══════════════════════════════════════════════
   7. Diya glow flicker (subtle CSS variable update
      applied to card header ornament)
═══════════════════════════════════════════════ */
function flickerDiyas() {
  const diyas = document.querySelectorAll('.orn-diya');
  diyas.forEach(diya => {
    const scale   = 0.9 + Math.random() * 0.25;
    const opacity = 0.7 + Math.random() * 0.3;
    diya.style.transform = `scale(${scale})`;
    diya.style.opacity   = opacity;
  });
  // Reschedule with a fresh random delay each time for organic feel
  setTimeout(flickerDiyas, 500 + Math.random() * 700);
}
setTimeout(flickerDiyas, 800);


/* ═══════════════════════════════════════════════
   8. Intersection Observer — scroll-in for card
   (redundant safety for slower devices)
═══════════════════════════════════════════════ */
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

cardObserver.observe(invitationCard);
