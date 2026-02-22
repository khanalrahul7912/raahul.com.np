/**
 * js/config.js — SITE CONFIGURATION
 * ====================================
 * ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT FOR BASIC CUSTOMISATION.
 *
 * All personal details, contact info, and branding live here.
 * After editing, save the file and refresh your browser — no build tools needed.
 *
 * See README.md for a full guide to every field.
 */

const SITE_CONFIG = {

  /* ─────────────────────────────────────────────────────
     IDENTITY
     ─────────────────────────────────────────────────── */
  /** Your full display name — appears in hero, about, footer. */
  name: 'Rahul Khanal',

  /** Two-letter initials shown as the navbar logo (e.g. 'RK', 'JS', 'AB'). */
  initials: 'RK',

  /**
   * Short tagline shown as the coloured badge above your name in the hero.
   * Example: 'Ass. Information Security Analyst @ WorldLink Communications'
   */
  tagline: 'Ass. Information Security Analyst @ WorldLink Communications',

  /* ─────────────────────────────────────────────────────
     CONTACT
     ─────────────────────────────────────────────────── */
  email:        'khanalrahul79@gmail.com',
  phone:        '+977-9863786408',
  location:     'Kalanki, Kathmandu, Nepal',

  /** How quickly you typically respond to messages. */
  responseTime: 'Usually within 24 hours',

  /* ─────────────────────────────────────────────────────
     SOCIAL LINKS
     Set any value to '' (empty string) to hide that link.
     ─────────────────────────────────────────────────── */
  website:  'https://raahul.com.np',
  linkedin: 'https://linkedin.com/in/khanalrahul79',
  github:   'https://github.com/khanalrahul7912',
  twitter:  '',   // e.g. 'https://twitter.com/yourhandle'

  /**
   * Path to your profile photo inside the assets/ folder.
   * If set, an <img> is shown in the About section instead of the default emoji.
   * Set to '' to keep the emoji placeholder.
   * Replace assets/photo.png with your own square photo (400×400 px recommended).
   * See assets/README.md for details.
   */
  photoUrl: 'assets/photo.png',

  /** Alt text for your profile photo — use your full name. */
  photoAlt: 'Rahul Khanal',

  /**
   * Path to your résumé / CV file inside the assets/ folder.
   * The "Download CV" button is hidden — use cvPageUrl (View CV) instead.
   * To re-enable the download button, set this to e.g. 'assets/resume.pdf'.
   * Replace assets/resume.pdf with your actual CV first.
   * See assets/README.md for details.
   */
  resumeUrl: '',

  /**
   * URL of the printable CV page.
   * Set to '' to hide the "View CV" button in the hero.
   * Keep as 'cv.html' to use the built-in CV page that
   * auto-generates from your js/config.js and js/data.js.
   */
  cvPageUrl: 'cv.html',

  /* ─────────────────────────────────────────────────────
     NAVBAR
     ─────────────────────────────────────────────────── */
  /** Label on the "hire me" call-to-action button in the navbar. */
  hireMeLabel: 'hire me',

  /* ─────────────────────────────────────────────────────
     HERO TERMINAL PROMPT
     Shown as: ┌──(user㉿HOST)-[~]
     Set terminalUser to e.g. 'john@PORTFOLIO'
     ─────────────────────────────────────────────────── */
  terminalUser: 'rahul@RAAHUL',

  /* ─────────────────────────────────────────────────────
     CONTACT FORM
     FormSubmit.co delivers form submissions to this email
     address — no backend or account required.
     The FIRST submission sends a one-time activation email
     to this address; click "Activate Form" to enable it.
     ─────────────────────────────────────────────────── */
  formEmail: 'khanalrahul79@gmail.com',

  /**
   * Options shown in the contact form Subject dropdown.
   * Add, remove, or rename as needed.
   */
  contactSubjects: [
    'Job Opportunity',
    'Security Consultation',
    'Collaboration',
    'General Inquiry',
  ],

  /* ─────────────────────────────────────────────────────
     FOOTER
     ─────────────────────────────────────────────────── */
  /** Decorative tag displayed at the bottom of the footer. */
  footerTagline: '</secure_the_world>',

  /* ─────────────────────────────────────────────────────
     SEO / META TAGS
     These values are also hard-coded in index.html <head>
     for browsers that don't run JavaScript.  Update BOTH
     places when you change your name / title.
     ─────────────────────────────────────────────────── */
  seo: {
    title:
      'Rahul Khanal | Information Security Analyst',
    description:
      'Rahul Khanal — Information Security Analyst at WorldLink Communications. ' +
      'Skilled in system administration, SIEM, network security, and vulnerability ' +
      'assessment — Kathmandu, Nepal.',
    keywords:
      'Rahul Khanal, information security analyst, cybersecurity, Nepal, ' +
      'WorldLink Communications, system administration, network security, SIEM, ELK stack, Docker',
    /**
     * Absolute URL to a preview image for social sharing (LinkedIn, Twitter/X, etc.).
     * MUST be an absolute URL — relative paths don't work for OG tags.
     *
     * ✏️ REPLACE the domain below with YOUR OWN domain before deploying.
     *    Example: 'https://YOUR-NAME.github.io/assets/og-image.png'
     *             'https://YOUR-DOMAIN.com/assets/og-image.png'
     *
     * Replace assets/og-image.png with a 1200×630 preview image first.
     * See assets/README.md for details.
     */
    ogImage: 'https://raahul.com.np/assets/og-image.png', // ✏️ Change domain to yours
  },

};
