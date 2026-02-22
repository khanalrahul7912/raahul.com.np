/**
 * js/render.js — DOM RENDERING
 * ==============================
 * Reads content from js/config.js and js/data.js
 * and populates every section in index.html.
 * Runs automatically on script load (scripts at bottom of <body>).
 *
 * Render order (called from initRender at the bottom):
 *   1. renderMeta          — <title> and <meta> from SITE_CONFIG.seo
 *   2. renderNavbar        — logo initials + hire-me link
 *   3. renderHero          — badge, name, terminal prompt, description
 *   4. renderHeroStats     — animated counters
 *   5. renderAbout         — intro paragraphs, terminal card, tags
 *   6. renderExperience    — tab-based work history
 *   7. renderSkills        — skill cards grid
 *   8. renderTools         — tools & technologies grid
 *   9. renderEducation     — education cards
 *  10. renderTraining      — training/course cards
 *  11. renderContactInfo   — contact links + location/response info
 *  12. renderContactForm   — subject dropdown options
 *  13. renderFooter        — footer links + copyright
 */

/* ══════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════ */

/** Escape plain text for safe insertion as HTML text content. */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Sanitise a field that supports basic HTML: <strong>, <em>, <b>, <i>,
 * and <a href="https://..."> only.
 *
 * Uses DOMParser (available in all modern browsers) to parse the HTML tree,
 * then walks it and removes any element not in the allow-list. Attributes are
 * stripped from non-<a> elements; <a> elements keep only href/target/rel and
 * href is validated to start with https:// or http://.
 *
 * Fallback: if DOMParser is unavailable, all tags are escaped as plain text.
 *
 * NOTE: This content comes from the site owner's own config file (data.js),
 * not from external user input. The sanitiser is an extra safety layer against
 * accidental or copy-paste mistakes.
 */
function safeHtml(str) {
  if (typeof DOMParser === 'undefined') return esc(str);

  try {
    const ALLOW = new Set(['STRONG', 'EM', 'B', 'I', 'A']);
    const doc   = new DOMParser().parseFromString('<div>' + str + '</div>', 'text/html');
    const root  = doc.querySelector('div');

    (function sanitize(node) {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType !== 1 /* ELEMENT_NODE */) return;
        if (!ALLOW.has(child.tagName)) {
          /* Replace disallowed element with its (recursively sanitised) children */
          sanitize(child);
          while (child.firstChild) node.insertBefore(child.firstChild, child);
          node.removeChild(child);
        } else {
          if (child.tagName === 'A') {
            const href = child.getAttribute('href') || '';
            const safeHref = /^https?:\/\//.test(href) ? href : '#';
            /* Keep only href / target / rel; strip everything else */
            Array.from(child.attributes).forEach(a => child.removeAttribute(a.name));
            child.setAttribute('href',   safeHref);
            child.setAttribute('target', '_blank');
            child.setAttribute('rel',    'noopener noreferrer');
          } else {
            /* Strip all attributes from non-<a> elements */
            Array.from(child.attributes).forEach(a => child.removeAttribute(a.name));
          }
          sanitize(child);
        }
      });
    }(root));

    return root.innerHTML;
  } catch (_) {
    return esc(str);   /* failsafe: render as plain escaped text */
  }
}

/** Validate a CSS hex colour; returns '#rrggbb' or a safe fallback. */
function safeColor(hex, fallback) {
  const stripped = String(hex).replace(/^#/, '');
  return /^[0-9a-fA-F]{6}$/.test(stripped)
    ? ('#' + stripped.toLowerCase())
    : (fallback || '#334155');
}

/** Set innerHTML on an element by id; silently skip if element is absent. */
function fill(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ══════════════════════════════════════════════════════
   1. META TAGS
══════════════════════════════════════════════════════ */
function renderMeta() {
  const seo = SITE_CONFIG && SITE_CONFIG.seo;
  if (!seo) return;

  if (seo.title) document.title = seo.title;

  const metaMap = {
    description:    seo.description,
    keywords:       seo.keywords,
    'og:title':     seo.title,
    'og:description': seo.description,
  };
  if (seo.ogImage) metaMap['og:image'] = seo.ogImage;

  Object.entries(metaMap).forEach(([key, val]) => {
    if (!val) return;
    const selector = key.startsWith('og:')
      ? `meta[property="${key}"]`
      : `meta[name="${key}"]`;
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', val);
  });
}

/* ══════════════════════════════════════════════════════
   2. NAVBAR
══════════════════════════════════════════════════════ */
function renderNavbar() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;

  /* Logo initials — built with DOM methods to avoid innerHTML */
  const logoEl = document.getElementById('navLogo');
  if (logoEl && cfg.initials) {
    logoEl.textContent = '';
    const first = cfg.initials.charAt(0);
    const rest  = cfg.initials.slice(1);
    logoEl.appendChild(document.createTextNode(first));
    if (rest) {
      const span = document.createElement('span');
      span.textContent = rest;
      logoEl.appendChild(span);
    }
    logoEl.setAttribute('aria-label', (cfg.name || '') + ' home');
  }

  /* Hire-me CTA */
  const ctaEl = document.getElementById('navHireCta');
  if (ctaEl) {
    ctaEl.textContent = cfg.hireMeLabel || 'hire me';
    if (cfg.email) ctaEl.href = 'mailto:' + cfg.email;
  }
}

/* ══════════════════════════════════════════════════════
   3. HERO
══════════════════════════════════════════════════════ */
function renderHero() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;

  /* Badge */
  const badgeEl = document.getElementById('heroBadge');
  if (badgeEl && cfg.tagline) badgeEl.textContent = cfg.tagline;

  /* Name + glitch */
  const nameEl = document.getElementById('heroName');
  if (nameEl && cfg.name) {
    nameEl.textContent  = cfg.name;
    nameEl.dataset.text = cfg.name;
  }

  /* Terminal prompt  ┌──(user㉿HOST)-[~]
     Built with DOM methods — no innerHTML string injection. */
  const promptEl = document.getElementById('heroPrompt');
  if (promptEl && cfg.terminalUser) {
    promptEl.textContent = '';
    const atIdx = cfg.terminalUser.indexOf('@');
    const user  = atIdx !== -1 ? cfg.terminalUser.slice(0, atIdx) : cfg.terminalUser;
    const host  = atIdx !== -1 ? cfg.terminalUser.slice(atIdx + 1) : '';

    promptEl.appendChild(document.createTextNode('┌──(' + user));
    const atSpan = document.createElement('span');
    atSpan.className   = 'prompt-at';
    atSpan.textContent = '㉿';
    promptEl.appendChild(atSpan);
    promptEl.appendChild(document.createTextNode(host + ')-[~]'));
    promptEl.appendChild(document.createElement('br'));
    promptEl.appendChild(document.createTextNode('└─$ '));
  }

  /* Description */
  const descEl = document.getElementById('heroDesc');
  if (descEl && HERO && HERO.description) descEl.textContent = HERO.description;

  /* Download CV button — show only when resumeUrl is set */
  const cvBtn = document.getElementById('heroCvBtn');
  if (cvBtn) {
    if (cfg.resumeUrl) {
      cvBtn.href = cfg.resumeUrl;
      cvBtn.style.display = 'inline-flex';
    } else {
      cvBtn.style.display = 'none';
    }
  }
}

/* ══════════════════════════════════════════════════════
   4. HERO STATS
══════════════════════════════════════════════════════ */
function renderHeroStats() {
  const container = document.getElementById('heroStats');
  if (!container || !HERO || !HERO.stats) return;
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
   5. ABOUT
══════════════════════════════════════════════════════ */
function renderAbout() {
  const ab  = ABOUT;
  const cfg = SITE_CONFIG;
  if (!ab) return;

  /* ── Avatar: photo or emoji placeholder ── */
  const avatarEl = document.getElementById('aboutAvatar');
  if (avatarEl && cfg && cfg.photoUrl) {
    /* Build <img> with DOM methods — no innerHTML injection */
    const img = document.createElement('img');
    img.src     = cfg.photoUrl;
    img.alt     = cfg.photoAlt || cfg.name || 'Profile photo';
    img.className = 'avatar-photo';
    img.loading   = 'lazy';
    avatarEl.textContent = '';   /* remove emoji fallback */
    avatarEl.appendChild(img);
  }

  /* Intro paragraphs */
  const introEl = document.getElementById('aboutIntro');
  if (introEl && ab.intro) {
    introEl.innerHTML = ab.intro.map(p => `<p>${safeHtml(p)}</p>`).join('');
  }

  /* Terminal card lines */
  const termBody = document.getElementById('aboutTerminalBody');
  if (termBody && ab.terminalLines) {
    termBody.innerHTML = ab.terminalLines.map(line =>
      `<div><span class="t-cmd">${esc(line.cmd)}</span></div>` +
      `<div class="t-output${line.className ? ' ' + esc(line.className) : ''}">${esc(line.output)}</div>`
    ).join('');
  }

  /* Skill tags */
  const tagsEl = document.getElementById('aboutTags');
  if (tagsEl && ab.tags) {
    tagsEl.innerHTML = ab.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
  }
}

/* ══════════════════════════════════════════════════════
   6. EXPERIENCE — Tab-based layout
   Left: company tab list  |  Right: selected panel
══════════════════════════════════════════════════════ */
function renderExperience() {
  const container = document.getElementById('experienceContainer');
  if (!container || !EXPERIENCE) return;

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
        if (isActive) p.removeAttribute('hidden');
        else          p.setAttribute('hidden', '');
      });
    });

    /* Arrow-key navigation between tabs */
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
   7. SKILLS
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
   8. TOOLS — Simple Icons CDN + emoji/abbr fallback
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
   9. EDUCATION
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
   10. TRAINING
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
   11. CONTACT INFO
══════════════════════════════════════════════════════ */
function renderContactInfo() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;

  /* Build the list of contact links from config */
  const links = [
    cfg.email    && { icon: '✉️', label: cfg.email,        href: 'mailto:' + cfg.email },
    cfg.phone    && { icon: '📞', label: cfg.phone,         href: 'tel:' + cfg.phone.replace(/[\s\-]/g, '') },
    cfg.linkedin && { icon: '💼', label: cfg.linkedin.replace(/^https?:\/\//, ''), href: cfg.linkedin, external: true },
    cfg.github   && { icon: '⬡',  label: cfg.github.replace(/^https?:\/\//, ''),  href: cfg.github,   external: true },
    cfg.twitter  && { icon: '🐦', label: cfg.twitter.replace(/^https?:\/\//, ''), href: cfg.twitter,  external: true },
    cfg.website  && { icon: '🌐', label: cfg.website.replace(/^https?:\/\//, ''), href: cfg.website },
  ].filter(Boolean);

  fill('contactLinks', links.map(link =>
    `<a href="${esc(link.href)}"
        class="contact-link-item"
        ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
       <span class="icon" aria-hidden="true">${link.icon}</span>
       <span>${esc(link.label)}</span>
       <span class="contact-arrow" aria-hidden="true">→</span>
     </a>`
  ).join(''));

  /* Location / response time info box */
  fill('contactMeta',
    `<div><span class="pgp-label">📍 Location:</span> ${esc(cfg.location || '')}</div>` +
    `<div><span class="response-label">🕐 Response time:</span> ${esc(cfg.responseTime || '')}</div>`
  );
}

/* ══════════════════════════════════════════════════════
   12. CONTACT FORM (subject dropdown)
══════════════════════════════════════════════════════ */
function renderContactForm() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;

  /* Populate subject <select> */
  const subjectEl = document.getElementById('subject');
  if (subjectEl && cfg.contactSubjects) {
    const opts = cfg.contactSubjects.map(s =>
      `<option value="${esc(s)}">${esc(s)}</option>`
    ).join('');
    subjectEl.innerHTML = `<option value="">Select a topic…</option>${opts}`;
  }
}

/* ══════════════════════════════════════════════════════
   13. FOOTER
══════════════════════════════════════════════════════ */
function renderFooter() {
  const cfg = SITE_CONFIG;
  if (!cfg) return;

  /* Footer built-by line */
  const builtByEl = document.getElementById('footerBuiltBy');
  if (builtByEl) {
    builtByEl.innerHTML =
      'Designed &amp; Built by <span>' + esc(cfg.name || '') + '</span> &bull; ' +
      '&copy; <span id="year"></span> ' +
      esc((cfg.website || '').replace(/^https?:\/\//, '') || cfg.name || '');
  }

  /* Footer tagline */
  const taglineEl = document.getElementById('footerTagline');
  if (taglineEl && cfg.footerTagline) taglineEl.textContent = cfg.footerTagline;

  /* Year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════
   INIT — run all renderers
══════════════════════════════════════════════════════ */
(function initRender() {
  renderMeta();
  renderNavbar();
  renderHero();
  renderHeroStats();
  renderAbout();
  renderExperience();
  renderSkills();
  renderTools();
  renderEducation();
  renderTraining();
  renderContactInfo();
  renderContactForm();
  renderFooter();
})();
