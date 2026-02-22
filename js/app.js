/**
 * js/app.js — INTERACTIONS & ANIMATIONS
 * =======================================
 * Handles: navbar, hamburger, typewriter, scroll-reveal,
 * particle canvas, counter animation, contact form (real email via FormSubmit.co).
 *
 * Personal info (email, name) is read from SITE_CONFIG (js/config.js).
 * Rotating phrases are read from TYPEWRITER_PHRASES (js/data.js).
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
   CONTACT FORM — try self-hosted PHP mailer first,
   then fall back to FormSubmit.co if PHP is unavailable.

   PHP mailer:   mailer.php (requires PHP-capable hosting)
   FormSubmit:   formsubmit.co/ajax/{email}
   Both use the email configured in js/config.js.
═══════════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const statusEl = document.getElementById('formStatus');
    const originalHtml = btn.innerHTML;

    /* ── Validate ── */
    const name    = contactForm.querySelector('[name="name"]').value.trim();
    const email   = contactForm.querySelector('[name="email"]').value.trim();
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

    const mailerUrl = (SITE_CONFIG && SITE_CONFIG.mailerUrl)  || '';
    const formEmail = (SITE_CONFIG && SITE_CONFIG.formEmail)  || '';
    let sent = false;

    try {
      /* ── 1. Try self-hosted PHP mailer (direct, no third-party) ── */
      if (mailerUrl) {
        try {
          const phpData = new FormData(contactForm);
          const phpRes  = await fetch(mailerUrl, { method: 'POST', body: phpData });
          if (phpRes.ok) {
            const phpJson = await phpRes.json();
            if (phpJson.success) sent = true;
          }
        } catch {
          /* PHP mailer not available (static host) — try FormSubmit below */
        }
      }

      /* ── 2. Fall back to FormSubmit.co ── */
      if (!sent && formEmail) {
        const fsData = new FormData(contactForm);
        fsData.append('_subject',
          `New message from ${name} via ${(SITE_CONFIG && SITE_CONFIG.website) || window.location.hostname}`);
        fsData.append('_captcha',  'false');
        fsData.append('_template', 'table');

        const fsRes  = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(formEmail)}`,
          { method: 'POST', headers: { Accept: 'application/json' }, body: fsData });
        const fsJson = await fsRes.json();
        if (fsJson.success === 'true' || fsJson.success === true) sent = true;
      }

      if (sent) {
        statusEl.className = 'form-status success';
        statusEl.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        contactForm.reset();
      } else {
        throw new Error('All delivery methods failed');
      }
    } catch {
      statusEl.className = 'form-status error';
      statusEl.innerHTML =
        '✗ Could not send automatically. Please email me directly: ' +
        (SITE_CONFIG && SITE_CONFIG.email
          ? `<a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>`
          : 'the address shown in the contact section.');
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
   FOOTER YEAR — set by js/render.js renderFooter()
═══════════════════════════════════════════════════ */
