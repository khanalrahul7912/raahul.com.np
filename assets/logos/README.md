# assets/logos/ — Company & Institution Logo Placeholders

This folder contains **placeholder SVG logos** for each company and educational
institution shown in the portfolio. Each file is a clean, colour-matched SVG
designed to look good at small sizes (48–52 px).

## 📋 Files

| File | Used for | Replace with |
|------|----------|--------------|
| `worldlink.svg` | WorldLink Communications (Experience) | Official WorldLink logo |
| `kalash.svg` | Kalash Services Pvt. Ltd. (Experience) | Official Kalash Services logo |
| `woodapple.svg` | Woodapple Hotel and Spa (Experience) | Official Woodapple logo |
| `self.svg` | Self-employed Tutor (Experience) | Optional: a personal photo or icon |
| `hariom.svg` | HariOm Emporium (Experience) | Official HariOm Emporium logo |
| `ncit.svg` | Nepal College of Information Technology (Education) | Official NCIT logo |
| `gyanodaya.svg` | Gyanodaya Secondary School (Education) | Official school logo |

## 🔁 How to Replace

1. **Download** the official logo from the company/institution's website.
2. **Save** it in this folder with the **same filename** as listed above
   (e.g. `worldlink.svg`, `ncit.svg`).
3. Acceptable formats: `.svg` (preferred), `.png`, `.jpg`, `.webp`.
4. If you use a non-SVG format, update the matching `logoUrl` field in
   `js/data.js` to point to the new filename:
   ```js
   // js/data.js → EXPERIENCE[0]
   logoUrl: 'assets/logos/worldlink.png',   // ← change extension
   ```
5. **Recommended size**: 56 × 56 px (square); the image is automatically
   displayed inside a 48 × 48 px rounded-square container.

## 🎨 Logo Tips

- Use a **transparent background** (PNG/SVG) for best results on the dark theme.
- If the original logo has a light/white background, add a coloured
  `border-radius` wrapper — or just keep the coloured SVG placeholder.
- The `data.js` colour field (`color: '#0060AF'`) is used for the fallback badge
  when no `logoUrl` is set. Keep it in sync if you change the logo.

## ⚠️ Copyright Note

Do **not** commit copyrighted logos to a public repository without permission.
Consider:
- Using the company's official media-kit/press resources.
- Linking to the logo URL instead of hosting it (`logoUrl: 'https://...'`).
- Keeping the SVG placeholders as-is for public repos.
