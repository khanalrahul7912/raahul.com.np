/**
 * js/render.js — DOM RENDERING
 * ==============================
 * Reads data from js/data.js and populates section containers.
 * Called automatically on script load (scripts at bottom of body).
 */

/* ── Utility: escape HTML entities ── */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Utility: fill a container, skipping if missing ── */
function fill(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ═══════════════════════════════════════════════════
   HERO STATS
═══════════════════════════════════════════════════ */
function renderHeroStats() {
  const container = document.getElementById('heroStats');
  if (!container || !HERO.stats) return;
  container.innerHTML = HERO.stats.map(s =>
    `<div class="stat-item">
       <span class="stat-number" data-target="${esc(s.target)}" data-suffix="${esc(s.suffix)}">${esc(s.target)}${esc(s.suffix)}</span>
       <span class="stat-label">${esc(s.label)}</span>
     </div>`
  ).join('');
}

/* ═══════════════════════════════════════════════════
   ABOUT TAGS
═══════════════════════════════════════════════════ */
function renderAboutTags() {
  fill('aboutTags', ABOUT_TAGS.map(t => `<span class="tag">${esc(t)}</span>`).join(''));
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE — Company accordion
═══════════════════════════════════════════════════ */
function renderExperience() {
  const container = document.getElementById('experienceContainer');
  if (!container) return;

  container.innerHTML = EXPERIENCE.map((co, ci) => `
    <div class="co-block reveal">
      <div class="co-header">
        <div class="co-logo-badge" style="background:${esc(co.color)}">${esc(co.logo)}</div>
        <div class="co-meta-wrap">
          <div class="co-name">${esc(co.company)}</div>
          <div class="co-submeta">
            <span class="co-type">${esc(co.type)}</span>
            <span class="co-sep">·</span>
            <span class="co-dur">${esc(co.duration)}</span>
          </div>
        </div>
      </div>

      <div class="co-roles">
        ${co.roles.map((role, ri) => {
          const currentBadge = role.current ? '<span class="role-badge current">Current</span>' : '';
          return `
          <div class="role-item ${role.current ? 'role-current' : ''}">
            <button class="role-head" aria-expanded="false" data-ci="${ci}" data-ri="${ri}">
              <div class="role-head-left">
                <span class="role-title-text">${esc(role.title)} ${currentBadge}</span>
                <span class="role-period-text">${esc(role.period)} &middot; ${esc(role.duration)}</span>
                <span class="role-location-text">${esc(role.location)}</span>
              </div>
              <span class="role-chevron" aria-hidden="true">▾</span>
            </button>
            <div class="role-body" id="role-${ci}-${ri}" hidden>
              <p class="role-desc">${esc(role.description)}</p>
              <ul class="role-resp">
                ${role.responsibilities.map(r => `<li>${esc(r)}</li>`).join('')}
              </ul>
              <div class="timeline-tags">
                ${role.tags.map(t => `<span class="project-tag">${esc(t)}</span>`).join('')}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');

  /* Accordion interaction */
  container.querySelectorAll('.role-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const ci = btn.dataset.ci;
      const ri = btn.dataset.ri;
      const body = document.getElementById(`role-${ci}-${ri}`);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      body.hidden = expanded;
      btn.classList.toggle('open', !expanded);
    });
  });
}

/* ═══════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════ */
function renderSkills() {
  fill('skillsGrid', SKILLS.map(card => `
    <div class="skill-card reveal">
      <div class="skill-card-header">
        <div class="skill-icon">${esc(card.icon)}</div>
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

/* ═══════════════════════════════════════════════════
   TOOLS — with Simple Icons CDN + emoji fallback
═══════════════════════════════════════════════════ */
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
         /><span class="tool-abbr-badge" style="background:${esc('#' + tool.color)};display:none">${esc(tool.abbr)}</span>`
      : `<span class="tool-emoji-icon">${esc(tool.emoji || tool.abbr)}</span>`;

    return `<div class="tool-chip reveal" title="${esc(tool.name)}">
      <div class="tool-icon-wrap">${iconHtml}</div>
      <span class="tool-name">${esc(tool.name)}</span>
    </div>`;
  }).join(''));
}

/* ═══════════════════════════════════════════════════
   EDUCATION
═══════════════════════════════════════════════════ */
function renderEducation() {
  fill('eduGrid', EDUCATION.map(ed => `
    <div class="edu-card reveal">
      <div class="edu-logo-badge" style="background:${esc(ed.logoColor)}">${esc(ed.logoAbbr)}</div>
      <div class="edu-content">
        <div class="edu-degree">${esc(ed.degree)}</div>
        <div class="edu-school">${esc(ed.school)}</div>
        <div class="edu-detail">${esc(ed.detail)}</div>
        <div class="edu-period">${esc(ed.period)}</div>
        <span class="cert-badge ${ed.status === 'completed' ? 'cert-active' : 'cert-progress'}">${esc(ed.statusLabel)}</span>
      </div>
    </div>
  `).join(''));
}

/* ═══════════════════════════════════════════════════
   TRAINING
═══════════════════════════════════════════════════ */
function renderTraining() {
  fill('trainingGrid', TRAINING.map(tr => `
    <div class="cert-card reveal">
      <div class="cert-icon">${esc(tr.icon)}</div>
      <div class="cert-content">
        <div class="cert-name">${esc(tr.name)}</div>
        <div class="cert-issuer">${esc(tr.issuer)}</div>
        <div class="cert-date">Duration: ${esc(tr.duration)}</div>
        <span class="cert-badge cert-active">✓ Completed</span>
      </div>
    </div>
  `).join(''));
}

/* ═══════════════════════════════════════════════════
   INIT — run all renderers
═══════════════════════════════════════════════════ */
(function initRender() {
  renderHeroStats();
  renderAboutTags();
  renderExperience();
  renderSkills();
  renderTools();
  renderEducation();
  renderTraining();
})();
