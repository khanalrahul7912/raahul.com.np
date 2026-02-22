# 🔐 Cybersecurity Portfolio Template

A clean, fast, and fully configurable portfolio website for cybersecurity and IT professionals.  
Built with **vanilla HTML, CSS, and JavaScript** — no build tools, no frameworks, no dependencies.

**Live demo:** [raahul.com.np](https://raahul.com.np)

---

## ✨ Features

- ⚡ Zero dependencies — pure HTML / CSS / JavaScript
- 🎨 Dark cyberpunk aesthetic (accent colours easily customisable)
- 📱 Fully responsive — mobile, tablet, desktop, all browsers
- 🗂 Tab-based experience section (LinkedIn-style)
- 🖥 Particle canvas hero with typewriter animation
- 🔢 Animated stats counters
- 📬 Working contact form (FormSubmit.co — no backend needed)
- ♿ Accessible — ARIA roles, keyboard navigation, semantic HTML
- 🔍 SEO-ready meta tags
- 🌑 Scroll-reveal animations

---

## 🗂 Project Structure

```
portfolio/
├── index.html              ← page shell (structural HTML only, no personal data)
├── .gitignore
├── README.md               ← this file
│
├── assets/                 ← place your photo, résumé, and logo here
│   └── (photo.jpg, resume.pdf, …)
│
├── css/
│   ├── base.css            ← CSS variables, reset, keyframes, shared utilities
│   ├── navbar.css          ← navigation bar & hamburger menu
│   ├── hero.css            ← hero section
│   ├── experience.css      ← tab-based work experience layout
│   ├── sections.css        ← about, skills, tools, education, training, contact, footer
│   └── responsive.css      ← all @media breakpoints
│
└── js/
    ├── config.js           ← ✏️ YOUR PERSONAL INFO — edit this first
    ├── data.js             ← ✏️ SECTION CONTENT — experience, skills, tools, …
    ├── render.js           ← reads config.js + data.js and builds the DOM
    └── app.js              ← animations, nav, form submission
```

> **Rule of thumb:** Edit `js/config.js` for personal info.  
> Edit `js/data.js` for section content.  
> Edit `css/base.css` to change colours.  
> You should rarely (if ever) need to touch `index.html`, `render.js`, or `app.js`.

---

## 🚀 Quick Start

1. **Clone or download** this repository.
2. **Edit `js/config.js`** — fill in your name, email, and links (5 minutes).
3. **Edit `js/data.js`** — add your experience, skills, and education.
4. **Open `index.html`** in any browser — no build step needed.
5. Deploy to GitHub Pages, Netlify, or any static host.

---

## ⚙️ Configuration

### Step 1 — Personal Info (`js/config.js`)

This file is the **single source of truth** for all personal data.  
Open it and update every field:

```js
const SITE_CONFIG = {
  name:      'Your Full Name',        // shown in hero, about, footer
  initials:  'YN',                    // 2-letter navbar logo
  tagline:   'Your Job Title @ Company',

  email:    'you@example.com',
  phone:    '+1-555-000-0000',
  location: 'Your City, Country',
  responseTime: 'Usually within 24 hours',

  website:  'https://yoursite.com',
  linkedin: 'https://linkedin.com/in/yourhandle',
  github:   'https://github.com/yourusername',
  twitter:  '',             // leave blank to hide

  resumeUrl: 'assets/resume.pdf',     // '' to hide Download CV button

  hireMeLabel:   'hire me',
  terminalUser:  'you@YOURSITE',      // hero terminal prompt
  formEmail:     'you@example.com',   // FormSubmit.co delivery address
  footerTagline: '</your_tagline>',

  contactSubjects: [
    'Job Opportunity',
    'Consultation',
    'Collaboration',
    'General Inquiry',
  ],

  seo: {
    title:       'Your Name | Your Title',
    description: 'Short bio for search engines…',
    keywords:    'your, keywords, here',
    ogImage:     'https://yoursite.com/assets/preview.jpg',
  },
};
```

Also update the `<title>` and `<meta>` tags at the top of `index.html` to match — these are used when JavaScript is disabled.

---

### Step 2 — Hero Stats (`js/data.js` → `HERO.stats`)

```js
const HERO = {
  description: 'Your hero description…',
  stats: [
    { target: 3,  suffix: '+ yrs', label: 'Experience' },
    { target: 50, suffix: '+',     label: 'Projects'   },
    { target: 10, suffix: '',      label: 'Certs'       },
  ],
};
```

---

### Step 3 — Typewriter Phrases (`js/data.js` → `TYPEWRITER_PHRASES`)

```js
const TYPEWRITER_PHRASES = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3',
];
```

---

### Step 4 — About Section (`js/data.js` → `ABOUT`)

```js
const ABOUT = {
  intro: [
    'First paragraph — supports <strong>bold</strong> and <em>italic</em>.',
    'Second paragraph.',
    'Third paragraph.',
  ],
  terminalLines: [
    { cmd: '$ whoami',       output: 'Your Name — Your Title' },
    { cmd: '$ cat job.txt',  output: 'Your Company' },
    { cmd: '$ echo $STATUS', output: 'Open for opportunities ✓', className: 't-success' },
  ],
  tags: ['Skill 1', 'Skill 2', 'Skill 3'],
};
```

> **Security note:** `intro` paragraphs support a limited allow-list of HTML tags
> (`<strong>`, `<em>`, `<b>`, `<i>`, `<a href="https://...">`).
> Only include HTML you have written yourself — never paste untrusted content here.

--- (`js/data.js` → `EXPERIENCE`)

Each entry is a **company** that can have one or more **roles**:

```js
const EXPERIENCE = [
  {
    company:  'Company Name',
    logo:     'CN',             // 2-3 char abbreviation for the badge
    color:    '#0060AF',        // badge background colour (hex)
    type:     'Full-time',
    duration: '2 yrs',
    url:      'https://company.com',
    roles: [
      {
        title:    'Your Job Title',
        period:   'Jan 2023 – Present',
        duration: '2 yrs',
        location: 'City, Country · On-site',
        current:  true,         // shows "● Live" badge
        description: 'Short role summary.',
        responsibilities: [
          'Responsibility one.',
          'Responsibility two.',
        ],
        tags: ['Skill A', 'Skill B'],
      },
    ],
  },
];
```

---

### Step 6 — Skills (`js/data.js` → `SKILLS`)

```js
const SKILLS = [
  {
    icon:  '🛡️',
    title: 'Category Name',
    sub:   'Subcategory | Tags',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
];
```

---

### Step 7 — Tools (`js/data.js` → `TOOLS`)

Each tool uses a [Simple Icons](https://simpleicons.org) slug for the logo.  
Leave `si: ''` to use an emoji fallback instead.

```js
const TOOLS = [
  // Simple Icons CDN logo:
  { name: 'Docker',   si: 'docker',   color: '2496ED', abbr: 'DK' },

  // Emoji fallback (no SI icon):
  { name: 'My Tool',  si: '',         color: 'ff7139', abbr: 'MT', emoji: '🔧' },
];
```

Find icon slugs at **[simpleicons.org](https://simpleicons.org)** — use the slug shown under each icon.

---

### Step 8 — Education (`js/data.js` → `EDUCATION`)

```js
const EDUCATION = [
  {
    degree:      'Bachelor of Computer Applications (BCA)',
    school:      'Your University, Location',
    detail:      'Under Affiliated University',
    period:      'Graduated May 2024',
    status:      'completed',           // 'completed' or 'progress'
    statusLabel: '✓ Completed',
    logoAbbr:    'UNI',
    logoColor:   '#7c3aed',
  },
];
```

---

### Step 9 — Training (`js/data.js` → `TRAINING`)

```js
const TRAINING = [
  {
    icon:     '🔒',
    name:     'Course Name',
    issuer:   'Issuing Organisation',
    duration: '3 Months',
  },
];
```

---

### Step 10 — Adding Your Photo

1. Place a square photo (min 400×400 px) in the `assets/` folder, e.g. `assets/photo.jpg`.
2. Open `index.html` and find the `<!-- ✏️ PHOTO -->` comment (in the About section).
3. Replace the emoji `<div>` with an `<img>` tag:

```html
<img src="assets/photo.jpg" alt="Your Name" class="avatar-photo" />
```

---

### Step 11 — Download CV Button

1. Place your résumé in `assets/resume.pdf`.
2. In `js/config.js`, set:

```js
resumeUrl: 'assets/resume.pdf',
```

The "Download CV" button in the hero will appear automatically.

---

### Step 12 — Customising Colours

Open `css/base.css` and edit the CSS custom properties at the top:

```css
:root {
  --bg:     #0a0e17;   /* page background */
  --bg2:    #0d1321;   /* alternate section background */
  --card:   #131b2e;   /* card background */
  --green:  #00ff88;   /* primary accent colour */
  --cyan:   #00d4ff;   /* secondary accent colour */
  --purple: #7c3aed;   /* tertiary accent colour */
  --text:   #e2e8f0;   /* body text */
  --muted:  #64748b;   /* muted / secondary text */
}
```

---

### Step 13 — Updating the Favicon

Replace the inline SVG emoji favicon in `index.html` with a real file:

```html
<!-- Option A: PNG -->
<link rel="icon" type="image/png" href="assets/favicon.png" />

<!-- Option B: ICO -->
<link rel="icon" href="assets/favicon.ico" />
```

---

## 📬 Contact Form

The contact form submits to **[FormSubmit.co](https://formsubmit.co)** — no backend or account required.

1. Set `SITE_CONFIG.formEmail` in `js/config.js` to your email address.
2. Deploy the site and submit the form once.
3. Check your inbox — FormSubmit will send a **one-time activation email**.
4. Click **"Activate Form"** in that email.

All future submissions will be delivered to your inbox automatically.

---

## 🚀 Deployment

### GitHub Pages (free)

1. Push this repo to GitHub.
2. Go to **Settings → Pages → Source → Deploy from branch → `main` → `/ (root)`**.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.

### Netlify (free, drag & drop)

1. Drag the project folder onto [netlify.com/drop](https://app.netlify.com/drop).
2. Get a live URL instantly — no account needed.

### Custom Domain (Apache / Nginx)

Upload all files to your server's web root (e.g. `/var/www/html/`).  
No `.htaccess` or server config needed — it's plain static HTML.

---

## 🖥 Browser Support

| Browser       | Support |
|---------------|---------|
| Chrome 90+    | ✅ Full  |
| Firefox 90+   | ✅ Full  |
| Safari 14+    | ✅ Full  |
| Edge 90+      | ✅ Full  |
| Mobile Chrome | ✅ Full  |
| Mobile Safari | ✅ Full  |

The site uses no IE-specific polyfills. IE 11 is not supported.

---

## ❓ FAQ

**Q: Do I need Node.js / npm?**  
A: No. Open `index.html` directly in a browser — no build step required.

**Q: Can I add more sections?**  
A: Yes. Add a new `<section id="my-section">` in `index.html`, add entries to a new array in `js/data.js`, add a render function in `js/render.js`, and call it in `initRender()`.

**Q: How do I remove a section (e.g. Training)?**  
A: Delete the `<section id="training">` block from `index.html` and remove `<a href="#training">Training</a>` from both nav menus.

**Q: How do I change the nav section labels?**  
A: Edit the `<a href="#...">Label</a>` items inside `<ul class="nav-links">` in `index.html`.

**Q: The contact form isn't sending emails.**  
A: Make sure you clicked "Activate Form" in the one-time activation email that FormSubmit.co sent after your first submission. Also verify `SITE_CONFIG.formEmail` is correct.

**Q: How do I add Google Analytics?**  
A: Paste your GA `<script>` tag before `</head>` in `index.html`.

---

## 📄 License

This project is open source. Fork, use, and adapt freely.  
Attribution appreciated but not required.

---

*Built with ♥ by [Rahul Khanal](https://raahul.com.np)*
