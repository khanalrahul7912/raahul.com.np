/**
 * js/cv-render.js — CV PAGE RENDERER
 * ====================================
 * Reads SITE_CONFIG (js/config.js) and the data globals
 * (js/data.js) to build a print-ready Curriculum Vitae.
 *
 * This file does NOT contain personal information.
 * Edit js/config.js and js/data.js to update the CV.
 *
 * Render order:
 *   1. renderCvMeta        — <title>
 *   2. renderCvHeader      — name, title, contact bar
 *   3. renderCvSummary     — from ABOUT.intro[0]
 *   4. renderCvExperience  — from EXPERIENCE array
 *   5. renderCvSkills      — from SKILLS array
 *   6. renderCvEducation   — from EDUCATION array
 *   7. renderCvTraining    — from TRAINING array
 */

/* ── Utility: escape plain text for HTML insertion ── */
function cvEsc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Set innerHTML on element by id; silently skip if absent. */
function cvFill(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ══════════════════════════════════════════════════════
   1. PAGE TITLE
══════════════════════════════════════════════════════ */
function renderCvMeta() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;
  document.title = cvEsc(cfg.name) + ' — Curriculum Vitae';
}

/* ══════════════════════════════════════════════════════
   2. HEADER — name, current role, contact row
══════════════════════════════════════════════════════ */
function renderCvHeader() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;

  /* Build contact items — skip empty values */
  const items = [
    cfg.email    && `<a href="mailto:${cvEsc(cfg.email)}">${cvEsc(cfg.email)}</a>`,
    cfg.phone    && `<a href="tel:${cvEsc(cfg.phone.replace(/[\s\-]/g, ''))}">${cvEsc(cfg.phone)}</a>`,
    cfg.location && cvEsc(cfg.location),
    cfg.linkedin && `<a href="${cvEsc(cfg.linkedin)}" target="_blank" rel="noopener noreferrer">${cvEsc(cfg.linkedin.replace(/^https?:\/\//, ''))}</a>`,
    cfg.github   && `<a href="${cvEsc(cfg.github)}"   target="_blank" rel="noopener noreferrer">${cvEsc(cfg.github.replace(/^https?:\/\//, ''))}</a>`,
    cfg.website  && `<a href="${cvEsc(cfg.website)}"  target="_blank" rel="noopener noreferrer">${cvEsc(cfg.website.replace(/^https?:\/\//, ''))}</a>`,
  ].filter(Boolean);

  const contactHtml = items.join(' <span class="cv-sep" aria-hidden="true">|</span> ');

  cvFill('cvHeader',
    `<div class="cv-name">${cvEsc(cfg.name)}</div>` +
    (cfg.tagline ? `<div class="cv-role-tag">${cvEsc(cfg.tagline)}</div>` : '') +
    `<div class="cv-contact-row">${contactHtml}</div>`
  );
}

/* ══════════════════════════════════════════════════════
   3. PROFESSIONAL SUMMARY — first paragraph of ABOUT.intro
══════════════════════════════════════════════════════ */
function renderCvSummary() {
  if (!ABOUT || !ABOUT.intro || !ABOUT.intro.length) return;

  /* Strip HTML tags using DOM parsing — more robust than regex */
  const tmp   = document.createElement('div');
  tmp.innerHTML = ABOUT.intro[0];
  const plain = tmp.textContent || tmp.innerText || '';

  cvFill('cvSummary',
    `<div class="cv-sect-title">Professional Summary</div>` +
    `<p class="cv-summary-text">${cvEsc(plain)}</p>`
  );
}

/* ══════════════════════════════════════════════════════
   4. PROFESSIONAL EXPERIENCE
══════════════════════════════════════════════════════ */
function renderCvExperience() {
  if (!EXPERIENCE || !EXPERIENCE.length) return;

  const companiesHtml = EXPERIENCE.map(co => {

    const rolesHtml = co.roles.map(role => {
      const liveHtml = role.current
        ? '<span class="cv-role-live" aria-label="Current role">Current</span>'
        : '';

      const respHtml = role.responsibilities
        .map(r => `<li>${cvEsc(r)}</li>`)
        .join('');

      const tagsHtml = role.tags
        .map(t => `<span class="cv-tag">${cvEsc(t)}</span>`)
        .join('');

      return (
        `<div class="cv-role">` +
          `<div class="cv-role-header">` +
            `<span class="cv-role-title">${cvEsc(role.title)}${liveHtml}</span>` +
            `<span class="cv-role-period">${cvEsc(role.period)} · ${cvEsc(role.duration)}</span>` +
          `</div>` +
          `<div class="cv-role-loc">📍 ${cvEsc(role.location)}</div>` +
          `<p class="cv-role-desc">${cvEsc(role.description)}</p>` +
          `<ul class="cv-resp-list" aria-label="Responsibilities">${respHtml}</ul>` +
          `<div class="cv-tag-row" aria-label="Skills">${tagsHtml}</div>` +
        `</div>`
      );
    }).join('');

    return (
      `<div class="cv-exp-co">` +
        `<div class="cv-exp-co-header">` +
          `<span class="cv-exp-co-name">${cvEsc(co.company)}</span>` +
          `<span class="cv-exp-co-meta">${cvEsc(co.type)} · ${cvEsc(co.duration)}</span>` +
        `</div>` +
        rolesHtml +
      `</div>`
    );
  }).join('');

  cvFill('cvExperience',
    `<div class="cv-sect-title">Professional Experience</div>` +
    companiesHtml
  );
}

/* ══════════════════════════════════════════════════════
   5. TECHNICAL SKILLS
══════════════════════════════════════════════════════ */
function renderCvSkills() {
  if (!SKILLS || !SKILLS.length) return;

  const rowsHtml = SKILLS.map(s =>
    `<div class="cv-skill-row">` +
      `<span class="cv-skill-label">${cvEsc(s.title)}:</span>` +
      `<span class="cv-skill-items">${cvEsc(s.items.join(', '))}</span>` +
    `</div>`
  ).join('');

  cvFill('cvSkills',
    `<div class="cv-sect-title">Technical Skills</div>` +
    `<div class="cv-skills-grid">${rowsHtml}</div>`
  );
}

/* ══════════════════════════════════════════════════════
   6. EDUCATION
══════════════════════════════════════════════════════ */
function renderCvEducation() {
  if (!EDUCATION || !EDUCATION.length) return;

  const itemsHtml = EDUCATION.map(ed =>
    `<div class="cv-edu-item">` +
      `<div class="cv-edu-degree">${cvEsc(ed.degree)}</div>` +
      `<div class="cv-edu-school">${cvEsc(ed.school)}</div>` +
      `<div class="cv-edu-detail">${cvEsc(ed.detail)}</div>` +
      `<div class="cv-edu-period">${cvEsc(ed.period)} · ${cvEsc(ed.statusLabel)}</div>` +
    `</div>`
  ).join('');

  cvFill('cvEducation',
    `<div class="cv-sect-title">Education</div>` +
    itemsHtml
  );
}

/* ══════════════════════════════════════════════════════
   7. TRAINING & COURSES
══════════════════════════════════════════════════════ */
function renderCvTraining() {
  if (!TRAINING || !TRAINING.length) return;

  const itemsHtml = TRAINING.map(tr =>
    `<div class="cv-tr-item">` +
      `<div class="cv-tr-name">${cvEsc(tr.name)}</div>` +
      `<div class="cv-tr-meta">${cvEsc(tr.issuer)} · ${cvEsc(tr.duration)}</div>` +
    `</div>`
  ).join('');

  cvFill('cvTraining',
    `<div class="cv-sect-title">Training &amp; Courses</div>` +
    `<div class="cv-tr-grid">${itemsHtml}</div>`
  );
}

/* ══════════════════════════════════════════════════════
   INIT — run all CV renderers
══════════════════════════════════════════════════════ */
(function initCvRender() {
  renderCvMeta();
  renderCvHeader();
  renderCvSummary();
  renderCvExperience();
  renderCvSkills();
  renderCvEducation();
  renderCvTraining();
})();
