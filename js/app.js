/**
 * js/app.js — INTERACTIONS & ANIMATIONS
 * =======================================
 * Handles: navbar, hamburger, typewriter, scroll-reveal,
 * particle canvas, counter animation, contact form (real email via FormSubmit.co).
 */

const COUNTER_STEPS = 50;
const PARTICLE_RADIUS_MAX = 1.5;
const PARTICLE_RADIUS_MIN = 0.5;

/* ═══════════════════════════════════════════════════
   NAVBAR — scroll shadow + active section highlight
═══════════════════════════════════════════════════ */
const navbar = document.querySelector('.navbar');
const navLinkEls = document.querySelectorAll('.nav-links a');
const scrollTopBtn = document.getElementById('scrollTop');

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
  });
  navLinkEls.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  updateActiveNav();
}, { passive: true });

/* ═══════════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════════ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function closeMenu() {
  navMenu.classList.remove('open');
  overlay.classList.remove('visible');
  hamburger.setAttribute('aria-expanded', 'false');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '1';
  spans[2].style.transform = '';
}

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  overlay.classList.toggle('visible', open);
  hamburger.setAttribute('aria-expanded', String(open));
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

overlay.addEventListener('click', closeMenu);
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ═══════════════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════════════ */
const typedEl = document.getElementById('typed-text');
let pi = 0, ci = 0, deleting = false;

function type() {
  if (!typedEl || !TYPEWRITER_PHRASES) return;
  const current = TYPEWRITER_PHRASES[pi];
  typedEl.textContent = deleting ? current.slice(0, --ci) : current.slice(0, ++ci);
  if (!deleting && ci === current.length) {
    setTimeout(() => { deleting = true; }, 2200);
  } else if (deleting && ci === 0) {
    deleting = false;
    pi = (pi + 1) % TYPEWRITER_PHRASES.length;
  }
  setTimeout(type, deleting ? 38 : 80);
}
setTimeout(type, 900);

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

/* Observe existing .reveal elements, and re-observe after render.js injects new ones */
function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
observeReveal();
/* Re-run after a small delay to catch render.js-injected elements */
setTimeout(observeReveal, 100);

/* ═══════════════════════════════════════════════════
   SCROLL TO TOP
═══════════════════════════════════════════════════ */
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ═══════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
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

const statsEl = document.getElementById('heroStats');
if (statsEl) counterObserver.observe(statsEl);

/* ═══════════════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════════════ */
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = Math.random() * PARTICLE_RADIUS_MAX + PARTICLE_RADIUS_MIN;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = -(Math.random() * 0.35 + 0.08);
      this.alpha = Math.random() * 0.35 + 0.08;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < 0) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,136,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 55; i++) particles.push(new Particle());

  (function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
}

/* ═══════════════════════════════════════════════════
   CONTACT FORM — real email via FormSubmit.co
   Note: The first submission will send a one-time
   verification email to khanalrahul79@gmail.com.
   Click "Activate Form" in that email to enable.
═══════════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const statusEl = document.getElementById('formStatus');
    const originalHtml = btn.innerHTML;

    /* ── Validate ── */
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      statusEl.className = 'form-status error';
      statusEl.textContent = '✗ Please fill in all required fields.';
      return;
    }

    /* ── Sending state ── */
    btn.innerHTML = '<span>⏳</span> Sending…';
    btn.disabled = true;
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    /* ── Submit to FormSubmit.co AJAX ── */
    try {
      const formData = new FormData(contactForm);
      formData.append('_subject', `New message from ${name} via raahul.com.np`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const res = await fetch('https://formsubmit.co/ajax/khanalrahul79@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const json = await res.json();

      if (json.success === 'true' || json.success === true) {
        statusEl.className = 'form-status success';
        statusEl.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        contactForm.reset();
      } else {
        throw new Error('FormSubmit returned failure');
      }
    } catch {
      statusEl.className = 'form-status error';
      statusEl.innerHTML =
        '✗ Could not send automatically. Please email me directly: ' +
        '<a href="mailto:khanalrahul79@gmail.com">khanalrahul79@gmail.com</a>';
    } finally {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      setTimeout(() => {
        statusEl.className = 'form-status';
        statusEl.textContent = '';
      }, 8000);
    }
  });
}

/* ═══════════════════════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════════════════════ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
