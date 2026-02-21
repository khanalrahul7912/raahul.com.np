/**
 * js/render.js — DOM RENDERING
 * ==============================
 * Reads content from js/data.js and populates section containers.
 * Run automatically on script load (scripts at bottom of <body>).
 */

/* ── Utility: escape HTML entities ── */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Utility: validate a hex color (with or without #), fallback to safe default ── */
function safeColor(hex, fallback) {
  const stripped = String(hex).replace(/^#/, '');
  return /^[0-9a-fA-F]{6}$/.test(stripped)
    ? ('#' + stripped.toLowerCase())
    : (fallback || '#334155');
}

/* ── Utility: set innerHTML on a container, skip if absent ── */
function fill(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ══════════════════════════════════════════════════════
   HERO STATS
══════════════════════════════════════════════════════ */
function renderHeroStats() {
  const container = document.getElementById('heroStats');
  if (!container || !HERO.stats) return;
  container.innerHTML = HERO.stats.map(s =>
    `<div class="stat-item">
       <span class="stat-number"
             data-target="${esc(String(s.target))}"
             data-suffix="${esc(s.suffix)}">${esc(String(s.target))}${esc(s.suffix)}</span>
       <span class="stat-label">${esc(s.label)}</span>
     </div>`
  ).join('');
}

/* ══════════════════════════════════════════════════════
   ABOUT TAGS
══════════════════════════════════════════════════════ */
function renderAboutTags() {
  fill('aboutTags', ABOUT_TAGS.map(t => `<span class="tag">${esc(t)}</span>`).join(''));
}

/* ══════════════════════════════════════════════════════
   EXPERIENCE — Tab-based layout
   Left:  company tab list
   Right: selected company panel with timeline roles
══════════════════════════════════════════════════════ */
function renderExperience() {
  const container = document.getElementById('experienceContainer');
  if (!container) return;

  /* ── Build company tabs ── */
  const tabsHtml = EXPERIENCE.map((co, ci) => `
    <button class="exp-tab ${ci === 0 ? 'active' : ''}"
            id="exp-tab-${ci}"
            data-ci="${ci}"
            role="tab"
            aria-selected="${ci === 0 ? 'true' : 'false'}"
            aria-controls="exp-panel-${ci}">
      <span class="exp-tab-logo" style="background:${safeColor(co.color)}">${esc(co.logo)}</span>
      <div class="exp-tab-info">
        <span class="exp-tab-name">${esc(co.company)}</span>
        <span class="exp-tab-dur">${esc(co.duration)}</span>
      </div>
    </button>
  `).join('');

  /* ── Build company panels ── */
  const panelsHtml = EXPERIENCE.map((co, ci) => {
    const companyLink = (co.url && co.url !== '#')
      ? `<a href="${esc(co.url)}" target="_blank" rel="noopener noreferrer">${esc(co.company)}</a>`
      : esc(co.company);

    const rolesHtml = co.roles.map((role) => {
      const currentBadge = role.current
        ? '<span class="exp-current-badge">● Live</span>'
        : '';

      /* Extract start date for the date chip */
      const dateChip = role.period.split('–')[0].trim();

      const respHtml = role.responsibilities.map(r => `<li>${esc(r)}</li>`).join('');
      const tagsHtml = role.tags.map(t => `<span class="exp-tag">${esc(t)}</span>`).join('');

      return `
        <div class="exp-role-card ${role.current ? 'exp-role-current' : ''}">
          <div class="exp-role-header">
            <div class="exp-role-title-group">
              <div class="exp-role-title">
                ${esc(role.title)} ${currentBadge}
              </div>
              <div class="exp-role-meta">
                <span class="exp-role-period">${esc(role.period)}</span>
                <span class="exp-role-sep" aria-hidden="true">·</span>
                <span class="exp-role-dur">${esc(role.duration)}</span>
              </div>
              <div class="exp-role-location">${esc(role.location)}</div>
            </div>
            <span class="exp-date-chip" aria-label="Start date">${esc(dateChip)}</span>
          </div>
          <p class="exp-role-desc">${esc(role.description)}</p>
          <ul class="exp-resp-list" aria-label="Responsibilities">${respHtml}</ul>
          <div class="exp-role-tags" aria-label="Skills">${tagsHtml}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="exp-panel ${ci === 0 ? 'active' : ''}"
           id="exp-panel-${ci}"
           role="tabpanel"
           aria-labelledby="exp-tab-${ci}"
           ${ci !== 0 ? 'hidden' : ''}>
        <div class="exp-panel-company-bar">
          <div class="exp-panel-logo" style="background:${safeColor(co.color)}">${esc(co.logo)}</div>
          <div>
            <div class="exp-panel-company-name">${companyLink}</div>
            <div class="exp-panel-meta">
              <span>${esc(co.type)}</span>
              <span class="exp-panel-meta-dot" aria-hidden="true">·</span>
              <span>${esc(co.duration)}</span>
            </div>
          </div>
        </div>
        <div class="exp-roles-list">${rolesHtml}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="exp-layout" role="tablist" aria-label="Work experience by company">
      <nav class="exp-tabs-nav" aria-label="Select company">${tabsHtml}</nav>
      <div class="exp-panels-wrap">${panelsHtml}</div>
    </div>
  `;

  /* ── Tab switching logic ── */
  const tabs   = container.querySelectorAll('.exp-tab');
  const panels = container.querySelectorAll('.exp-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const ci = tab.dataset.ci;
      tabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      panels.forEach(p => {
        const isActive = p.id === `exp-panel-${ci}`;
        p.classList.toggle('active', isActive);
        if (isActive) {
          p.removeAttribute('hidden');
        } else {
          p.setAttribute('hidden', '');
        }
      });
    });

    /* Keyboard navigation: arrow keys between tabs */
    tab.addEventListener('keydown', (e) => {
      const tabArr = [...tabs];
      const idx    = tabArr.indexOf(tab);
      let next     = -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % tabArr.length;
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  next = (idx - 1 + tabArr.length) % tabArr.length;
      if (next !== -1) { e.preventDefault(); tabArr[next].focus(); tabArr[next].click(); }
    });
  });
}

/* ══════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════ */
function renderSkills() {
  fill('skillsGrid', SKILLS.map(card => `
    <div class="skill-card reveal">
      <div class="skill-card-header">
        <div class="skill-icon" aria-hidden="true">${esc(card.icon)}</div>
        <div>
          <div class="skill-card-title">${esc(card.title)}</div>
          <div class="skill-card-sub">${esc(card.sub)}</div>
        </div>
      </div>
      <div class="skill-items">
        ${card.items.map(item => `<span class="skill-badge">${esc(item)}</span>`).join('')}
      </div>
    </div>
  `).join(''));
}

/* ══════════════════════════════════════════════════════
   TOOLS — Simple Icons CDN + emoji/abbr fallback
══════════════════════════════════════════════════════ */
function renderTools() {
  fill('toolsGrid', TOOLS.map(tool => {
    const iconHtml = tool.si
      ? `<img
           src="https://cdn.simpleicons.org/${esc(tool.si)}/${esc(tool.color)}"
           alt="${esc(tool.name)}"
           class="tool-si-img"
           width="32" height="32"
           loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
         /><span class="tool-abbr-badge" style="background:${safeColor(tool.color)};display:none">${esc(tool.abbr)}</span>`
      : `<span class="tool-emoji-icon" aria-hidden="true">${esc(tool.emoji || tool.abbr)}</span>`;

    return `
      <div class="tool-chip reveal" title="${esc(tool.name)}" aria-label="${esc(tool.name)}">
        <div class="tool-icon-wrap">${iconHtml}</div>
        <span class="tool-name">${esc(tool.name)}</span>
      </div>`;
  }).join(''));
}

/* ══════════════════════════════════════════════════════
   EDUCATION
══════════════════════════════════════════════════════ */
function renderEducation() {
  fill('eduGrid', EDUCATION.map(ed => `
    <div class="edu-card reveal">
      <div class="edu-logo-badge" style="background:${safeColor(ed.logoColor)}"
           aria-hidden="true">${esc(ed.logoAbbr)}</div>
      <div class="edu-content">
        <div class="edu-degree">${esc(ed.degree)}</div>
        <div class="edu-school">${esc(ed.school)}</div>
        <div class="edu-detail">${esc(ed.detail)}</div>
        <div class="edu-period">${esc(ed.period)}</div>
        <span class="cert-badge ${ed.status === 'completed' ? 'cert-active' : 'cert-progress'}">
          ${esc(ed.statusLabel)}
        </span>
      </div>
    </div>
  `).join(''));
}

/* ══════════════════════════════════════════════════════
   TRAINING
══════════════════════════════════════════════════════ */
function renderTraining() {
  fill('trainingGrid', TRAINING.map(tr => `
    <div class="cert-card reveal">
      <div class="cert-icon" aria-hidden="true">${esc(tr.icon)}</div>
      <div class="cert-content">
        <div class="cert-name">${esc(tr.name)}</div>
        <div class="cert-issuer">${esc(tr.issuer)}</div>
        <div class="cert-date">Duration: ${esc(tr.duration)}</div>
        <span class="cert-badge cert-active">✓ Completed</span>
      </div>
    </div>
  `).join(''));
}

/* ══════════════════════════════════════════════════════
   INIT — run all renderers
══════════════════════════════════════════════════════ */
(function initRender() {
  renderHeroStats();
  renderAboutTags();
  renderExperience();
  renderSkills();
  renderTools();
  renderEducation();
  renderTraining();
})();
