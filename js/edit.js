/**
 * js/edit.js — CONTENT EDITOR LOGIC
 * ====================================
 * Reads SITE_CONFIG (js/config.js) and the data globals
 * (js/data.js) to pre-populate all editor form fields.
 *
 * Provides "Download config.js" and "Download data.js"
 * buttons so the site owner can update their files
 * without touching raw code.
 *
 * No backend required — runs entirely in the browser.
 *
 * HOW TO USE:
 *   1. Open edit.html in your browser
 *   2. Edit the fields in any section
 *   3. Click "⬇ config.js" or "⬇ data.js" to download the updated file
 *   4. Replace the file in your project folder
 *   5. Refresh index.html and cv.html to see your changes
 */

/* ══════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════ */

/** Get form element value by id; return '' if absent. */
function gv(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

/** Set value of a form element by id; silently skip if absent. */
function sv(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = (value === null || value === undefined) ? '' : String(value);
}

/** Show a toast notification. */
function showToast(msg, isError) {
  const t = document.getElementById('edToast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'ed-toast visible' + (isError ? ' error' : '');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => { t.className = 'ed-toast'; }, 3500);
}

/** Trigger a file download in the browser. */
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/javascript;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
}

/** Parse JSON from a textarea; alert on error and return null on failure. */
function parseJson(textareaId, label) {
  const raw = gv(textareaId).trim();
  try {
    return JSON.parse(raw);
  } catch (err) {
    showToast('✗ Invalid JSON in ' + label + ': ' + err.message, true);
    return null;
  }
}

/* ══════════════════════════════════════════════════════
   SECTION TAB NAVIGATION
══════════════════════════════════════════════════════ */
function initNavigation() {
  const buttons = document.querySelectorAll('.ed-nav-btn');
  const panels  = document.querySelectorAll('.ed-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.panel;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.id === 'panel-' + target);
      });

      /* Scroll main area to top */
      const main = document.getElementById('edMain');
      if (main) main.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════════════════
   POPULATE FORM — fill all fields from current globals
══════════════════════════════════════════════════════ */
function populateForm() {
  const cfg = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {};

  /* ── Personal Info ── */
  sv('cfg-name',         cfg.name         || '');
  sv('cfg-initials',     cfg.initials     || '');
  sv('cfg-tagline',      cfg.tagline      || '');
  sv('cfg-email',        cfg.email        || '');
  sv('cfg-phone',        cfg.phone        || '');
  sv('cfg-location',     cfg.location     || '');
  sv('cfg-website',      cfg.website      || '');
  sv('cfg-linkedin',     cfg.linkedin     || '');
  sv('cfg-github',       cfg.github       || '');
  sv('cfg-twitter',      cfg.twitter      || '');
  sv('cfg-photoUrl',     cfg.photoUrl     || '');
  sv('cfg-resumeUrl',    cfg.resumeUrl    || '');
  sv('cfg-cvPageUrl',    cfg.cvPageUrl    || '');

  /* ── Hero & SEO ── */
  sv('cfg-terminalUser',  cfg.terminalUser  || '');
  sv('cfg-hireMeLabel',   cfg.hireMeLabel   || '');
  sv('cfg-footerTagline', cfg.footerTagline || '');
  sv('cfg-responseTime',  cfg.responseTime  || '');

  const seo = cfg.seo || {};
  sv('cfg-seo-title',       seo.title       || '');
  sv('cfg-seo-description', seo.description || '');
  sv('cfg-seo-keywords',    seo.keywords    || '');
  sv('cfg-seo-ogImage',     seo.ogImage     || '');

  /* ── Contact Settings ── */
  sv('cfg-formEmail', cfg.formEmail || '');
  sv('cfg-contactSubjects',
    Array.isArray(cfg.contactSubjects)
      ? cfg.contactSubjects.join('\n')
      : ''
  );

  /* ── Hero Stats (data.js) ── */
  if (typeof HERO !== 'undefined') {
    sv('data-hero-json', JSON.stringify(HERO, null, 2));
  }

  /* ── Typewriter Phrases (data.js) ── */
  if (typeof TYPEWRITER_PHRASES !== 'undefined') {
    sv('data-typewriter-text', TYPEWRITER_PHRASES.join('\n'));
  }

  /* ── About (data.js) ── */
  if (typeof ABOUT !== 'undefined') {
    sv('data-about-json', JSON.stringify(ABOUT, null, 2));
  }

  /* ── Experience (data.js) ── */
  if (typeof EXPERIENCE !== 'undefined') {
    sv('data-experience-json', JSON.stringify(EXPERIENCE, null, 2));
  }

  /* ── Skills (data.js) ── */
  if (typeof SKILLS !== 'undefined') {
    sv('data-skills-json', JSON.stringify(SKILLS, null, 2));
  }

  /* ── Tools (data.js) ── */
  if (typeof TOOLS !== 'undefined') {
    sv('data-tools-json', JSON.stringify(TOOLS, null, 2));
  }

  /* ── Education (data.js) ── */
  if (typeof EDUCATION !== 'undefined') {
    sv('data-education-json', JSON.stringify(EDUCATION, null, 2));
  }

  /* ── Training (data.js) ── */
  if (typeof TRAINING !== 'undefined') {
    sv('data-training-json', JSON.stringify(TRAINING, null, 2));
  }
}

/* ══════════════════════════════════════════════════════
   GENERATE config.js
══════════════════════════════════════════════════════ */
function generateConfigJs() {
  const existingCfg = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {};
  const subjects = gv('cfg-contactSubjects')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  const cfg = {
    name:         gv('cfg-name'),
    initials:     gv('cfg-initials'),
    tagline:      gv('cfg-tagline'),
    email:        gv('cfg-email'),
    phone:        gv('cfg-phone'),
    location:     gv('cfg-location'),
    responseTime: gv('cfg-responseTime'),
    website:      gv('cfg-website'),
    linkedin:     gv('cfg-linkedin'),
    github:       gv('cfg-github'),
    twitter:      gv('cfg-twitter'),
    photoUrl:     gv('cfg-photoUrl'),
    photoAlt:     gv('cfg-name'),   /* kept in sync with name */
    resumeUrl:    gv('cfg-resumeUrl'),
    cvPageUrl:    gv('cfg-cvPageUrl'),
    hireMeLabel:  gv('cfg-hireMeLabel') || 'hire me',
    terminalUser: gv('cfg-terminalUser'),
    formEmail:    gv('cfg-formEmail'),
    mailerUrl:    existingCfg.mailerUrl || '',
    certLocalDir: existingCfg.certLocalDir || '',
    certFolderUrl: existingCfg.certFolderUrl || '',
    contactSubjects: subjects,
    footerTagline: gv('cfg-footerTagline'),
    seo: {
      title:       gv('cfg-seo-title'),
      description: gv('cfg-seo-description'),
      keywords:    gv('cfg-seo-keywords'),
      ogImage:     gv('cfg-seo-ogImage'),
    },
  };

  /* Format contact subjects as a proper JS array literal */
  const subjectsLiteral = JSON.stringify(subjects, null, 4)
    .replace(/^\[/, '[\n  ')
    .split('\n').map((l, i, a) => (i === 0 ? l : '  ' + l)).join('\n');

  return `/**
 * js/config.js — SITE CONFIGURATION
 * ====================================
 * ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT FOR BASIC CUSTOMISATION.
 *
 * All personal details, contact info, and branding live here.
 * After editing, save the file and refresh your browser — no build tools needed.
 *
 * See README.md for a full guide to every field.
 * This file was generated by edit.html — ${new Date().toLocaleString()}.
 */

const SITE_CONFIG = {

  /* ─────────────────────────────────────────────────────
     IDENTITY
     ─────────────────────────────────────────────────── */
  name:     ${JSON.stringify(cfg.name)},
  initials: ${JSON.stringify(cfg.initials)},
  tagline:  ${JSON.stringify(cfg.tagline)},

  /* ─────────────────────────────────────────────────────
     CONTACT
     ─────────────────────────────────────────────────── */
  email:        ${JSON.stringify(cfg.email)},
  phone:        ${JSON.stringify(cfg.phone)},
  location:     ${JSON.stringify(cfg.location)},
  responseTime: ${JSON.stringify(cfg.responseTime)},

  /* ─────────────────────────────────────────────────────
     SOCIAL LINKS  (set to '' to hide)
     ─────────────────────────────────────────────────── */
  website:  ${JSON.stringify(cfg.website)},
  linkedin: ${JSON.stringify(cfg.linkedin)},
  github:   ${JSON.stringify(cfg.github)},
  twitter:  ${JSON.stringify(cfg.twitter)},

  /* ─────────────────────────────────────────────────────
     ASSETS
     ─────────────────────────────────────────────────── */
  photoUrl:  ${JSON.stringify(cfg.photoUrl)},
  photoAlt:  ${JSON.stringify(cfg.photoAlt)},
  resumeUrl: ${JSON.stringify(cfg.resumeUrl)},
  cvPageUrl: ${JSON.stringify(cfg.cvPageUrl)},

  /* ─────────────────────────────────────────────────────
     NAVBAR
     ─────────────────────────────────────────────────── */
  hireMeLabel: ${JSON.stringify(cfg.hireMeLabel)},

  /* ─────────────────────────────────────────────────────
     HERO TERMINAL PROMPT
     Format: user@HOST  → displayed as ┌──(user㉿HOST)-[~]
     ─────────────────────────────────────────────────── */
  terminalUser: ${JSON.stringify(cfg.terminalUser)},

  /* ─────────────────────────────────────────────────────
     CONTACT FORM  (FormSubmit.co — no backend needed)
     ─────────────────────────────────────────────────── */
  formEmail: ${JSON.stringify(cfg.formEmail)},
  mailerUrl: ${JSON.stringify(cfg.mailerUrl)},
  certLocalDir: ${JSON.stringify(cfg.certLocalDir)},
  certFolderUrl: ${JSON.stringify(cfg.certFolderUrl)},
  contactSubjects: ${subjectsLiteral},

  /* ─────────────────────────────────────────────────────
     FOOTER
     ─────────────────────────────────────────────────── */
  footerTagline: ${JSON.stringify(cfg.footerTagline)},

  /* ─────────────────────────────────────────────────────
     SEO / META TAGS
     Also update the static <meta> tags in index.html.
     ─────────────────────────────────────────────────── */
  seo: {
    title:       ${JSON.stringify(cfg.seo.title)},
    description: ${JSON.stringify(cfg.seo.description)},
    keywords:    ${JSON.stringify(cfg.seo.keywords)},
    ogImage:     ${JSON.stringify(cfg.seo.ogImage)}, // ✏️ Must be absolute URL
  },

};
`;
}

/* ══════════════════════════════════════════════════════
   GENERATE data.js
══════════════════════════════════════════════════════ */
function generateDataJs() {
  /* Parse all JSON sections — abort on any error */
  const hero = parseJson('data-hero-json', 'HERO');
  if (!hero) return null;

  const phrases = gv('data-typewriter-text')
    .split('\n').map(s => s.trim()).filter(Boolean);

  const about      = parseJson('data-about-json',      'ABOUT');
  if (!about) return null;
  const experience = parseJson('data-experience-json', 'EXPERIENCE');
  if (!experience) return null;
  const skills     = parseJson('data-skills-json',     'SKILLS');
  if (!skills) return null;
  const tools      = parseJson('data-tools-json',      'TOOLS');
  if (!tools) return null;
  const education  = parseJson('data-education-json',  'EDUCATION');
  if (!education) return null;
  const training   = parseJson('data-training-json',   'TRAINING');
  if (!training) return null;

  return `/**
 * js/data.js — SECTION CONTENT
 * ==============================
 * Edit this file to update the content of each section.
 * Personal info (name, email, links) lives in js/config.js.
 * No need to touch HTML or CSS for text/list updates.
 *
 * This file was generated by edit.html — ${new Date().toLocaleString()}.
 *
 * Sections:
 *   HERO             → Hero stats counter and description
 *   TYPEWRITER_PHRASES → Rotating phrases in the hero terminal
 *   ABOUT            → About section paragraphs, terminal lines, skill tags
 *   EXPERIENCE       → Work experience (companies + roles)
 *   SKILLS           → Technical skill cards
 *   TOOLS            → Tools & Technologies grid
 *   EDUCATION        → Academic background cards
 *   TRAINING         → Trainings & courses attended
 */

/* ─────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────── */
const HERO = ${JSON.stringify(hero, null, 2)};

/* ─────────────────────────────────────────────────────
   TYPEWRITER PHRASES
───────────────────────────────────────────────────── */
const TYPEWRITER_PHRASES = ${JSON.stringify(phrases, null, 2)};

/* ─────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────── */
const ABOUT = ${JSON.stringify(about, null, 2)};

/* ─────────────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────────────── */
const EXPERIENCE = ${JSON.stringify(experience, null, 2)};

/* ─────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────── */
const SKILLS = ${JSON.stringify(skills, null, 2)};

/* ─────────────────────────────────────────────────────
   TOOLS
───────────────────────────────────────────────────── */
const TOOLS = ${JSON.stringify(tools, null, 2)};

/* ─────────────────────────────────────────────────────
   EDUCATION
───────────────────────────────────────────────────── */
const EDUCATION = ${JSON.stringify(education, null, 2)};

/* ─────────────────────────────────────────────────────
   TRAINING
───────────────────────────────────────────────────── */
const TRAINING = ${JSON.stringify(training, null, 2)};

/* Kept for compatibility with render.js and older templates */
const CERTIFICATES = [];
`;
}

/* ══════════════════════════════════════════════════════
   DOWNLOAD BUTTON HANDLERS
══════════════════════════════════════════════════════ */
function initDownloads() {
  const dlConfigBtn = document.getElementById('dlConfig');
  const dlDataBtn   = document.getElementById('dlData');

  if (dlConfigBtn) {
    dlConfigBtn.addEventListener('click', () => {
      try {
        const content = generateConfigJs();
        downloadFile('config.js', content);
        showToast('✓ config.js downloaded — replace js/config.js in your project');
      } catch (err) {
        showToast('✗ Error generating config.js: ' + err.message, true);
      }
    });
  }

  if (dlDataBtn) {
    dlDataBtn.addEventListener('click', () => {
      const content = generateDataJs();
      if (content === null) return; /* parseJson already showed error */
      downloadFile('data.js', content);
      showToast('✓ data.js downloaded — replace js/data.js in your project');
    });
  }
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
(function initEditor() {
  initNavigation();
  populateForm();
  initDownloads();
})();
