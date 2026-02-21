// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const scrollTopBtn = document.getElementById('scrollTop');

const COUNTER_STEPS = 50;
const PARTICLE_RADIUS_MAX = 1.5;
const PARTICLE_RADIUS_MIN = 0.5;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ===== ACTIVE NAV =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  overlay.classList.toggle('visible', open);
  hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
overlay.addEventListener('click', closeMenu);
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
function closeMenu() {
  navMenu.classList.remove('open');
  overlay.classList.remove('visible');
  hamburger.querySelectorAll('span')[0].style.transform = '';
  hamburger.querySelectorAll('span')[1].style.opacity = '1';
  hamburger.querySelectorAll('span')[2].style.transform = '';
}

// ===== TYPEWRITER =====
const phrases = [
  'Ethical Hacker & Penetration Tester',
  'Bug Bounty Hunter',
  'CTF Player & Security Researcher',
  'Web & Network Security Specialist',
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const current = phrases[pi];
  typedEl.textContent = deleting ? current.slice(0, --ci) : current.slice(0, ++ci);

  if (!deleting && ci === current.length) {
    setTimeout(() => { deleting = true; }, 2000);
  } else if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
  }
  setTimeout(type, deleting ? 40 : 85);
}
setTimeout(type, 800);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars').forEach(el => skillObserver.observe(el));

// ===== SCROLL TO TOP =====
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const status = document.getElementById('formStatus');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;

    // Simulate sending (replace with real endpoint if needed)
    await new Promise(r => setTimeout(r, 1200));

    status.className = 'form-status success';
    status.textContent = '✓ Message sent! I\'ll get back to you soon.';
    form.reset();
    btn.innerHTML = original;
    btn.disabled = false;
    setTimeout(() => { status.className = 'form-status'; status.textContent = ''; }, 5000);
  });
}

// ===== PARTICLE CANVAS (subtle background dots) =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = Math.random() * PARTICLE_RADIUS_MAX + PARTICLE_RADIUS_MIN;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.4 - 0.1;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,136,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.ceil(target / COUNTER_STEPS);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => counterObserver.observe(el));
