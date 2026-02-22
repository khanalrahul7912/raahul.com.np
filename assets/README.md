# assets/ — Replaceable Site Files

This folder contains placeholder files that you should replace with your own content.
**Every file in this folder has the same name it will use in production** — just drop
your real file in with the same filename and the site will pick it up automatically.

---

## 📸 photo.png — Your Profile Photo

**Where it appears:** About section (the animated square on the left).

**To replace:**
1. Export your photo as a square image (recommended: 400 × 400 px minimum).
2. Save it as `assets/photo.png` (or `.jpg`).
3. Open `js/config.js` and set:
   ```js
   photoUrl: 'assets/photo.png',   // ← your filename here
   photoAlt: 'Your Name',          // ← your name for alt text
   ```
4. Refresh the browser — your photo appears automatically.

**Tips:**
- Square crops look best (the card is square).
- Keep the file under 200 KB for fast load times.
- Accepted formats: `.jpg`, `.png`, `.webp`.
- To revert to the emoji placeholder, set `photoUrl: ''` in `js/config.js`.

---

## 📄 resume.pdf — Your CV / Résumé

**Where it appears:** A **Download CV** button in the hero section.

**To replace:**
1. Export your CV as `resume.pdf`.
2. Place it in the `assets/` folder.
3. Open `js/config.js` and confirm:
   ```js
   resumeUrl: 'assets/resume.pdf',
   ```
4. The button becomes visible and links to your PDF.

**Tips:**
- To hide the button, set `resumeUrl: ''` in `js/config.js`.
- Keep the PDF under 2 MB. Compress via [smallpdf.com](https://smallpdf.com) if needed.

---

## 🌐 og-image.png — Social Media Preview

**Where it appears:** When someone shares your site on LinkedIn, Twitter/X, WhatsApp,
Slack, or Facebook — the "Open Graph" preview image.

**Recommended size:** 1200 × 630 px (standard OG image ratio).

**To replace:**
1. Design a preview image (screenshot of your site, personal branding, headshot + name).
2. Save it as `assets/og-image.png`.
3. Open `js/config.js` and update:
   ```js
   seo: {
     ogImage: 'https://YOUR-DOMAIN.com/assets/og-image.png', // absolute URL required
     ...
   }
   ```
   Replace `YOUR-DOMAIN.com` with your actual domain (e.g. `raahul.com.np`).

**Tips:**
- Use an **absolute URL** — relative paths don't work for OG tags.
- Keep under 5 MB; ideally under 500 KB.
- You can design one for free at [canva.com](https://canva.com).

---

## 🔖 favicon.png — Browser Tab Icon

**Where it appears:** Browser tab, bookmarks, mobile home-screen shortcut.

**To replace:**
1. Design a 32 × 32 (or 64 × 64) icon. A simple monogram or shield works well.
2. Save it as `assets/favicon.png`.
3. The `<link rel="icon">` in `index.html` already points here — no other change needed.

**Tips:**
- You can also use a `.ico` format — update the `href` in `index.html` accordingly.
- Generate a full favicon set at [realfavicongenerator.net](https://realfavicongenerator.net).

---

## 📁 Folder Structure Reference

```
assets/
├── photo.png       ← Profile photo (About section + hero avatar)
├── resume.pdf      ← Downloadable CV (hero "Download CV" button)
├── og-image.png    ← Social media preview (1200×630 recommended)
├── favicon.png     ← Browser tab icon (32×32 or 64×64)
└── README.md       ← This file
```

Feel free to add sub-folders for future assets (e.g. `assets/projects/`, `assets/certs/`).

---

## ⚡ Quick Checklist

- [ ] Replace `photo.png` with your square profile photo
- [ ] Set `SITE_CONFIG.photoUrl = 'assets/photo.png'` in `js/config.js`
- [ ] Replace `resume.pdf` with your actual CV
- [ ] Replace `og-image.png` with a 1200×630 preview image
- [ ] Replace `favicon.png` with your personal icon
- [ ] Update `SITE_CONFIG.seo.ogImage` with the **absolute URL** to `og-image.png`
