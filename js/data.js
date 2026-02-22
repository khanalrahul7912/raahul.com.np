/**
 * js/data.js — SECTION CONTENT
 * ==============================
 * Edit this file to update the content of each section.
 * Personal info (name, email, links) lives in js/config.js.
 * No need to touch HTML or CSS for text/list updates.
 *
 * Sections:
 *   HERO         → Hero stats counter and description
 *   TYPEWRITER   → Rotating phrases in the hero terminal
 *   ABOUT        → About section paragraphs, terminal lines, skill tags
 *   EXPERIENCE   → Work experience (companies + roles)
 *   SKILLS       → Technical skill cards
 *   TOOLS        → Tools & Technologies grid
 *   EDUCATION    → Academic background cards
 *   TRAINING     → Trainings & courses attended
 *
 * NOTE: Fields marked "supports basic HTML" may contain
 *       <strong>, <em>, and <a href="..."> tags.
 *       All other fields are plain text only.
 */

/* ─────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────── */
const HERO = {
  /** Plain-text description shown below the terminal prompt. */
  description:
    'Cybersecurity professional with hands-on experience in information security, ' +
    'system administration, and network operations at WorldLink Communications. ' +
    'Passionate about defending networks, monitoring threats, and advancing into ' +
    'penetration testing and advanced security practices.',

  /** Stats counters shown in the hero. target = number, suffix = unit string. */
  stats: [
    { target: 3,  suffix: '+ yrs', label: 'Experience' },
    { target: 25, suffix: '+',     label: 'Team Led'   },
    { target: 7,  suffix: '',      label: 'Courses'    },
    { target: 3,  suffix: ' yrs',  label: 'Tutoring'   },
  ],
};

/* ─────────────────────────────────────────────────────
   TYPEWRITER PHRASES
   Rotating lines typed out in the hero terminal.
───────────────────────────────────────────────────── */
const TYPEWRITER_PHRASES = [
  'Information Security Analyst',
  'System Administrator & DevOps',
  'Aspiring Penetration Tester',
  'Network Security Professional',
];

/* ─────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────── */
const ABOUT = {
  /**
   * Paragraphs shown in the About section.
   * Supports basic HTML: <strong>, <em>, <a href="...">.
   * Each string is one paragraph.
   */
  intro: [
    'I\'m <strong>Rahul Khanal</strong>, an enthusiastic cybersecurity professional ' +
    'currently working as <strong>Asst. Information Security Analyst at WorldLink ' +
    'Communications</strong>, Kathmandu, Nepal. I bring hands-on experience in system ' +
    'administration, network operations, and security monitoring with a strong drive ' +
    'to specialise in offensive and defensive security.',

    'My career journey at WorldLink spans from customer service to L2 network ' +
    'monitoring and now information security — giving me a unique end-to-end ' +
    'perspective on both operations and the security posture of a large-scale ISP.',

    'I hold a <strong>BCA degree (Pokhara University)</strong> and have completed ' +
    'specialised training in Cyber Security, AI/ML, and full-stack web development.',
  ],

  /**
   * Lines shown inside the terminal card in the About section.
   * Each line has a cmd (green prompt text) and output (response text).
   * Add className: 't-success' to make the output text green.
   */
  terminalLines: [
    { cmd: '$ whoami',             output: 'Rahul Khanal — Information Security Analyst' },
    { cmd: '$ cat interests.txt',  output: 'InfoSec | SysAdmin | DevOps | Pentest | Network Security' },
    { cmd: '$ cat location.txt',   output: 'Kalanki, Kathmandu, Nepal 🇳🇵' },
    { cmd: '$ echo $STATUS',       output: 'Open for opportunities ✓', className: 't-success' },
  ],

  /**
   * Small pill-shaped tags shown below the terminal card.
   * Plain text only.
   */
  tags: [
    'Linux', 'Docker', 'ELK Stack', 'SIEM', 'Active Directory',
    'Python', 'Laravel', 'Network Security', 'Vulnerability Assessment', 'Team Leadership',
  ],
};

/* ─────────────────────────────────────────────────────
   EXPERIENCE
   Each company has:
     company     – display name
     logo        – 2-3 char abbreviation shown in badge
     color       – badge background color (hex)
     type        – employment type
     duration    – total duration string
     url         – company website (use '#' if none)
     roles[]     – list of roles at this company
       .title        – job title
       .period       – date range string
       .duration     – duration string
       .location     – location string
       .current      – true/false (shows "Current" badge)
       .description  – short paragraph
       .responsibilities[] – bullet points
       .tags[]       – skill tags
───────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    company: 'WorldLink Communications',
    logo: 'WL',
    color: '#0060AF',
    logoUrl: 'assets/logos/worldlink.svg',
    type: 'Full-time',
    duration: '2 yrs 6 mos',
    startDate: '2023-09',   /* ← enables dynamic company-total duration */
    location: 'Lalitpur, Nepal',
    url: 'https://worldlink.com.np',
    roles: [
      {
        title: 'Ass. Information Security Analyst',
        period: 'Jan 2025 – Present',
        duration: '1 yr 2 mos',
        startDate: '2025-01',   /* ← enables dynamic role duration */
        location: 'Jawalakhel, Lalitpur · On-site',
        current: true,
        description:
          'Working as Assistant Information Security Analyst in the security team at ' +
          "Nepal's leading internet service provider, supporting senior analysts in " +
          'monitoring, vulnerability management, and compliance activities.',
        responsibilities: [
          'Access Management: Manage user access controls and permissions within systems.',
          'Data Security: Ensure sensitive data is encrypted and properly handled during transit and storage.',
          'System Security: Ensure proper system security with regular configuration updates and patches.',
          'Vulnerability Scanning: Perform routine scans of systems, logs and applications; review & report findings to senior analyst.',
          'Support: Assist in developing and updating security policies and procedures.',
          'Compliance: Collaborate on audits and compliance checks as needed.',
          'Incident Documentation: Maintain records of incidents and troubleshooting steps.',
          'Security Incident Documentation: Document security breaches and assess the potential impact.',
        ],
        tags: ['Information Security', 'System Administration', 'Access Management', 'Vulnerability Scanning', 'SIEM', 'Active Directory', 'Linux', 'Docker'],
      },
      {
        title: 'Team Leader (L2 & Monitoring)',
        period: 'Sep 2023 – Feb 2025',
        duration: '1 yr 6 mos',
        location: 'Lalitpur District, Nepal',
        current: false,
        description:
          'Led the L2 and monitoring team overseeing OLT/GPON network infrastructure, ' +
          'outage management, and nationwide coordination at WorldLink Communications.',
        responsibilities: [
          'Proactively monitor OLT, Master, and Distribution outages and take necessary actions.',
          'Assign outages to the respective branch ONM team members.',
          'Coordinate with nationwide ONM teams for OLT, GPON, and MS/DS-related issues.',
          'Collaborate with phone and field support staff for L2 troubleshooting.',
          'Escalate unresolved technical issues to NOC, Server, and Programming teams.',
          'Notify affected customers via SMS, FCM, and Emails with timely updates.',
          'Maintain daily reports on tasks performed and assist with documentation.',
        ],
        tags: ['Network Monitoring', 'OLT', 'GPON', 'L2 Troubleshooting', 'Problem Solving', 'Team Coordination', 'NOC'],
      },
    ],
  },
  {
    company: 'Kalash Services Pvt. Ltd.',
    logo: 'KS',
    color: '#6366f1',
    logoUrl: 'assets/logos/kalash.svg',
    type: 'Full-time',
    duration: '1 yr 7 mos',
    location: 'Lalitpur District, Nepal',
    url: '#',
    roles: [
      {
        title: 'Team Leader for WorldLink Support',
        period: 'Oct 2022 – Sep 2023',
        duration: '1 yr',
        location: 'Lalitpur District, Nepal',
        current: false,
        description:
          'Led and managed a team of 25–30 customer support representatives delivering ' +
          'WorldLink Communications support services, ensuring KPI targets and quality standards were met.',
        responsibilities: [
          'Lead and coach team members of 25–30 on technical and soft skills to reach targeted KPIs and competencies.',
          'Monitor productivity and performance of every individual — daily, weekly, and monthly.',
          'Identify technical issues and escalate to the L2 team during the shift.',
          'Responsible for the overall productivity and performance of the team.',
          'Evaluate team performance and provide constructive feedback.',
          'Provide product-related retraining based on the needs of individual team members.',
          'Lead, motivate, and coach the team to ensure quality service delivery exceeding Company expectations.',
        ],
        tags: ['Team Leadership', 'Leadership', 'Performance Management', 'Coaching', 'KPI Management', 'Technical Support'],
      },
      {
        title: 'CSR / ITSR — WorldLink Communications',
        period: 'Mar 2022 – Sep 2022',
        duration: '7 mos',
        location: 'Lalitpur District, Nepal · Hybrid',
        current: false,
        description:
          'Customer Service and IT Support Representative providing inbound technical support ' +
          'and customer service for WorldLink Communications subscribers.',
        responsibilities: [
          'Manage inbound calls and give technical support as well as respond to non-technical queries.',
          'Handle customer inquiries and provide accurate, valid, and complete information using the right methods/tools.',
          'Handle customer complaints; determine possible causes and provide appropriate solutions within time limits.',
          'Refer unresolved customer grievances to designated departments for further investigation.',
          'Keep records of customer interactions — inquiries, complaints, comments, and actions taken.',
          'Build sustainable relationships and trust with customers through open and interactive communication.',
          'Guide and provide mentorship to newly hired agents.',
          'Follow communication procedures, guidelines, and policies.',
        ],
        tags: ['Customer Service', 'Internet Troubleshooting', 'Soft Skills', 'Communication', 'Technical Support'],
      },
    ],
  },
  {
    company: 'Woodapple Hotel and Spa',
    logo: 'WA',
    color: '#d97706',
    logoUrl: 'assets/logos/woodapple.svg',
    type: 'Full-time',
    duration: '1 yr 2 mos',
    location: 'Kathmandu, Nepal',
    url: '#',
    roles: [
      {
        title: 'Customer Service Representative',
        period: 'Jul 2020 – Aug 2021',
        duration: '1 yr 2 mos',
        location: 'Kathmandu, Nepal',
        current: false,
        description:
          'Gained valuable hospitality management skills and international cultural awareness ' +
          'while serving international guests from all over the world.',
        responsibilities: [
          'Serve international guests from diverse cultural backgrounds with excellent hospitality.',
          'Manage front desk operations, check-ins, check-outs, and reservations.',
          'Handle guest inquiries, requests, and feedback ensuring high satisfaction.',
          'Coordinate with housekeeping and other departments for seamless guest experience.',
        ],
        tags: ['Hospitality', 'Customer Service', 'Front Desk', 'International Relations'],
      },
    ],
  },
  {
    company: 'Self-employed',
    logo: '✏',
    color: '#10b981',
    logoUrl: 'assets/logos/self.svg',
    type: 'Part-time',
    duration: '3 yrs 1 mo',
    location: 'Kathmandu, Nepal',
    url: '#',
    roles: [
      {
        title: 'Part-Time Math & Science Tutor',
        period: 'Aug 2018 – Aug 2021',
        duration: '3 yrs 1 mo',
        location: 'Kathmandu, Nepal',
        current: false,
        description:
          'Worked as a part-time tutor for students preparing for SEE (Grade 10) and below, ' +
          'providing instruction in mathematics and science.',
        responsibilities: [
          'Provide personalised instruction in mathematics and science for SEE-level and below students.',
          'Develop lesson plans and teaching materials tailored to individual learning needs.',
          'Monitor student progress and provide constructive feedback.',
          'Prepare students for examinations and build subject confidence.',
        ],
        tags: ['Teaching', 'Mentoring', 'Mathematics', 'Science', 'Communication'],
      },
    ],
  },
  {
    company: 'HariOm Emporium',
    logo: 'HE',
    color: '#ef4444',
    logoUrl: 'assets/logos/hariom.svg',
    type: 'Full-time',
    duration: '1 yr 3 mos',
    location: 'New Road, Kathmandu, Nepal',
    url: '#',
    roles: [
      {
        title: 'Field Sales Representative',
        period: 'May 2019 – Jul 2020',
        duration: '1 yr 3 mos',
        location: 'New Road, Kathmandu · On-site',
        current: false,
        description:
          'Obtained wholesale marketing & sales skills through interactions with retailers across various districts of Nepal.',
        responsibilities: [
          'Obtain wholesale marketing & sales skills through interactions with retailers.',
          'Visit and interact with retail clothing stores across various districts of Nepal.',
          'Build strong customer relationships and drive product sales.',
          'Develop understanding of the sales market through field engagement.',
        ],
        tags: ['Sales', 'Field Sales', 'Customer Relations', 'Marketing', 'Business Development'],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────── */
const SKILLS = [
  {
    icon: '🛡️',
    title: 'Information Security',
    sub: 'Defense | SIEM | Compliance',
    items: ['SIEM Operations', 'Active Directory', 'Log Analysis', 'Threat Monitoring', 'Incident Response', 'Access Management', 'Data Security', 'Compliance & Audit', 'Security Policy'],
  },
  {
    icon: '🔐',
    title: 'Penetration Testing & Vulnerability Assessment',
    sub: 'Offensive | Assessment | Tooling',
    items: ['Vulnerability Assessment', 'Penetration Testing', 'OpenVAS', 'Nessus', 'Burp Suite', 'Metasploit', 'Nmap', 'OWASP Top 10', 'Exploitation Techniques', 'Reporting'],
  },
  {
    icon: '🐍',
    title: 'Programming & Automation',
    sub: 'Scripting | Task Automation',
    items: ['Python', 'Bash / Shell', 'PowerShell', 'PHP', 'SQL', 'C++', 'Automation Scripts', 'Cron Jobs'],
  },
  {
    icon: '💻',
    title: 'Web Development',
    sub: 'Full Stack | Frameworks',
    items: ['Laravel (PHP)', 'Django (Python)', 'HTML / CSS', 'JavaScript', 'MySQL / SQL', 'REST APIs', 'Git', 'C++'],
  },
  {
    icon: '🤝',
    title: 'Leadership & Soft Skills',
    sub: 'Team Management | Communication',
    items: ['Team Leadership (25–30)', 'Customer Service', 'Problem Solving', 'Mentoring', 'Communication', 'Adaptability', 'Composure Under Pressure', 'R&D Interest'],
  },
  {
    icon: '🖥️',
    title: 'System Administration',
    sub: 'Linux | Automation | Monitoring',
    items: ['Linux (Ubuntu/CentOS)', 'Bash Scripting', 'Python Scripting', 'PowerShell', 'Docker', 'Nagios', 'Grafana', 'Prometheus', 'Cacti', 'ELK Stack'],
  },
  {
    icon: '🌐',
    title: 'Networking',
    sub: 'ISP-Level | Monitoring',
    items: ['TCP/IP', 'OLT / BRAS', 'GPON', 'Uplink Networks', 'Network Monitoring', 'Troubleshooting', 'DNS / DHCP', 'Firewall Config'],
  },
];

/* ─────────────────────────────────────────────────────
   TOOLS
   Each entry:
     name   – display name
     si     – Simple Icons slug (https://simpleicons.org), or '' for emoji fallback
     abbr   – 2-char fallback abbreviation if no SI icon
     color  – hex color for SI icon (without #), also used for abbr badge
     emoji  – emoji shown when no SI icon (if si is '')
   To add a new tool: copy a line and fill in the fields.
───────────────────────────────────────────────────── */
const TOOLS = [
  // ── SIEM & Monitoring ──────────────────────────────
  { name: 'ELK Stack',    si: 'elasticsearch',  color: '00bfb3', abbr: 'EL' },
  { name: 'Splunk',       si: 'splunk',          color: 'ff6600', abbr: 'SP' },
  { name: 'Wazuh',        si: '',                color: '005571', abbr: 'WZ', emoji: '🛡️' },
  { name: 'Grafana',      si: 'grafana',         color: 'F46800', abbr: 'GR' },
  { name: 'Prometheus',   si: 'prometheus',      color: 'E6522C', abbr: 'PR' },
  { name: 'Nagios',       si: '',                color: '26a269', abbr: 'NG', emoji: '📡' },
  { name: 'Cacti',        si: '',                color: '5a7e3a', abbr: 'CA', emoji: '📉' },

  // ── Vulnerability Assessment ────────────────────────
  { name: 'Nessus',       si: 'tenable',         color: '00b4e6', abbr: 'NS' },
  { name: 'OpenVAS',      si: '',                color: '2e8b57', abbr: 'OV', emoji: '🔍' },
  { name: 'Nuclei',       si: '',                color: '9c59ff', abbr: 'NU', emoji: '🏹' },
  { name: 'OWASP ZAP',   si: 'owasp',           color: '00A4E4', abbr: 'ZA' },
  { name: 'Nikto',        si: '',                color: 'f59e0b', abbr: 'NK', emoji: '🦊' },
  { name: 'Nmap',         si: '',                color: '4b8bbe', abbr: 'NM', emoji: '🗺️' },

  // ── Network Security ──────────────────────────────
  { name: 'Palo Alto',    si: 'paloaltonetworks', color: 'FA582C', abbr: 'PA' },
  { name: 'Cisco Meraki', si: 'cisco',            color: '1BA0D7', abbr: 'CM' },
  { name: 'Imperva WAF',  si: '',                 color: '0070C0', abbr: 'IW', emoji: '🔒' },
  { name: 'Wireshark',    si: '',                color: '1679a7', abbr: 'WS', emoji: '🔎' },
  { name: 'tcpdump',      si: '',                color: '4e9a06', abbr: 'TC', emoji: '📦' },
  { name: 'Snort',        si: '',                color: 'd73527', abbr: 'SN', emoji: '🐷' },
  { name: 'Suricata',     si: '',                color: 'f97316', abbr: 'SU', emoji: '🌊' },

  // ── Pentest & Exploitation ─────────────────────────
  { name: 'Burp Suite',   si: '',                color: 'ff7139', abbr: 'BS', emoji: '🕷️' },
  { name: 'Metasploit',   si: '',                color: '2563eb', abbr: 'MS', emoji: '💥' },
  { name: 'SQLmap',       si: '',                color: 'a21caf', abbr: 'SQ', emoji: '🧵' },
  { name: 'Hydra',        si: '',                color: '7c3aed', abbr: 'HY', emoji: '🐙' },
  { name: 'John the Ripper', si: '',              color: 'dc2626', abbr: 'JR', emoji: '🔑' },
  { name: 'Hashcat',      si: '',                color: '0891b2', abbr: 'HC', emoji: '🔐' },
  { name: 'Aircrack-ng',  si: '',                color: '16a34a', abbr: 'AC', emoji: '📶' },

  // ── OSINT & Recon ─────────────────────────────────
  { name: 'Shodan',       si: '',                color: 'dc2626', abbr: 'SH', emoji: '🔭' },
  { name: 'Maltego',      si: '',                color: '7c3aed', abbr: 'MT', emoji: '🧲' },
  { name: 'FFUF',         si: '',                color: '2563eb', abbr: 'FF', emoji: '🦅' },
  { name: 'Gobuster',     si: '',                color: '059669', abbr: 'GB', emoji: '🌐' },

  // ── Forensics ─────────────────────────────────────
  { name: 'Volatility',   si: '',                color: '0284c7', abbr: 'VL', emoji: '🔬' },
  { name: 'Autopsy',      si: '',                color: '6b21a8', abbr: 'AU', emoji: '🧬' },

  // ── OS & Infrastructure ────────────────────────────
  { name: 'Kali Linux',   si: 'kalilinux',       color: '557C94', abbr: 'KL' },
  { name: 'Docker',       si: 'docker',          color: '2496ED', abbr: 'DK' },
  { name: 'Active Directory', si: 'windows',     color: '0078D4', abbr: 'AD' },
  { name: 'VirtualBox',   si: 'virtualbox',      color: '183A61', abbr: 'VB' },

  // ── Development ───────────────────────────────────
  { name: 'Python',       si: 'python',          color: '3776AB', abbr: 'PY' },
  { name: 'Bash / Shell', si: 'gnubash',         color: '4EAA25', abbr: 'SH' },
  { name: 'PowerShell',   si: 'powershell',      color: '5391FE', abbr: 'PS' },
  { name: 'Laravel',      si: 'laravel',         color: 'FF2D20', abbr: 'LV' },
  { name: 'Django',       si: 'django',          color: '44B78B', abbr: 'DJ' },
  { name: 'Git / GitHub', si: 'git',             color: 'F05032', abbr: 'GT' },
];

/* ─────────────────────────────────────────────────────
   EDUCATION
───────────────────────────────────────────────────── */
const EDUCATION = [
  {
    emoji: '🎓',
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Pokhara University',
    detail: 'Nepal College of Information Technology (NCIT), Lalitpur',
    period: 'Graduated — Convocated ✓',
    status: 'completed',
    statusLabel: '✓ Completed & Convocated',
    logoAbbr: 'PU',
    logoColor: '#8B0000',
    logoUrl: 'assets/logos/pokhara-university.svg',
  },
  {
    emoji: '📚',
    degree: '+2 Science (Higher Secondary)',
    school: 'Gyanodaya Secondary School, Bafal, Kathmandu',
    detail: 'Computer Science as a major subject',
    period: 'Graduated January 2020',
    status: 'completed',
    statusLabel: '✓ Completed',
    logoAbbr: 'GS',
    logoColor: '#0891b2',
    logoUrl: 'assets/logos/gyanodaya.svg',
  },
];

/* ─────────────────────────────────────────────────────
   TRAINING
───────────────────────────────────────────────────── */
const TRAINING = [
  {
    icon: '🔒',
    name: 'Cyber Security',
    issuer: 'Islington College — Organized by Kathmandu Metro',
    duration: '100 hours',
    /**
     * ✏️ Google Drive file ID for this certificate.
     * Find the ID in the file's share URL:
     *   https://drive.google.com/file/d/FILE_ID_HERE/view
     * Leave as '' to show a "View in Drive" folder link instead.
     */
    certDriveId: '',
  },
  {
    icon: '🤖',
    name: 'Artificial Intelligence & Machine Learning',
    issuer: 'Omdena Academy — Organized by National Innovation Center',
    duration: '6 Months',
    certDriveId: '',
  },
  {
    icon: '🌿',
    name: 'Full Stack Web Development (Laravel)',
    issuer: 'Laravel Framework Training',
    duration: '1 Month',
    certDriveId: '',
  },
  {
    icon: '🐍',
    name: 'Django Framework',
    issuer: 'Python-Django Full Stack Web Applications',
    duration: '15 Days',
    certDriveId: '',
  },
  {
    icon: '🖥️',
    name: 'Advanced Computer Training',
    issuer: 'Touch Typing, Office Packages, Software & Hardware',
    duration: '3 Months',
    certDriveId: '',
  },
  {
    icon: '⚡',
    name: 'Basic Electrical Training',
    issuer: 'Electrical Components & House Wiring',
    duration: '15 Days',
    certDriveId: '',
  },
  {
    icon: '🚀',
    name: 'Advanced Technopreneurship Course',
    issuer: 'Business Startup Strategies & Core Business Operations',
    duration: '40 hours',
    certDriveId: '',
  },
];

/* ─────────────────────────────────────────────────────
   CERTIFICATES
   Each entry represents a received certificate / credential.
   Fields:
     icon        – emoji icon for the card
     name        – certificate / course name
     issuer      – issuing organisation
     date        – year or date received (plain text)
     driveFileId – Google Drive file ID for direct preview/download link
                   Find the ID in the share URL:
                     https://drive.google.com/file/d/FILE_ID_HERE/view
                   Leave as '' to show a folder-level "View in Drive" link
                   (uses SITE_CONFIG.certFolderUrl from js/config.js).
   To add a new certificate: copy a block and fill in the fields.
   To remove: delete the block.
───────────────────────────────────────────────────── */
const CERTIFICATES = [
  {
    icon: '🔒',
    name: 'Cyber Security',
    issuer: 'Islington College — Organized by Kathmandu Metro',
    date: '2023',
    driveFileId: '', // ✏️ paste Google Drive file ID here
  },
  {
    icon: '🤖',
    name: 'Artificial Intelligence & Machine Learning',
    issuer: 'Omdena Academy — Organized by National Innovation Center',
    date: '2023',
    driveFileId: '',
  },
  {
    icon: '🌿',
    name: 'Full Stack Web Development (Laravel)',
    issuer: 'Laravel Framework Training',
    date: '2023',
    driveFileId: '',
  },
  {
    icon: '🐍',
    name: 'Django Framework',
    issuer: 'Python-Django Full Stack Web Applications',
    date: '2023',
    driveFileId: '',
  },
  {
    icon: '🖥️',
    name: 'Advanced Computer Training',
    issuer: 'Touch Typing, Office Packages, Software & Hardware',
    date: '2022',
    driveFileId: '',
  },
  {
    icon: '⚡',
    name: 'Basic Electrical Training',
    issuer: 'Electrical Components & House Wiring',
    date: '2022',
    driveFileId: '',
  },
  {
    icon: '🚀',
    name: 'Advanced Technopreneurship Course',
    issuer: 'Business Startup Strategies & Core Business Operations',
    date: '2022',
    driveFileId: '',
  },
];
