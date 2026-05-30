# assets/certificates/

This folder stores your certificate PDF files locally so they can be served directly from your website — no Google Drive or third-party link required.

## How to add your certificates

1. **Get your certificate** as a PDF (scan or download from the issuer).
2. **Name it** using the filename listed in `js/data.js` under `certFile:`.
3. **Drop it here** — replace the placeholder PDF with your actual certificate file.
4. **Refresh the site** — the "📜 View Certificate" button will now open the real file.

## Placeholder files (replace these)

| Filename | Course |
|---|---|
| `certificate-cybersecurity.pdf` | Cyber Security — Islington College |
| `certificate-ai-ml.pdf` | AI & Machine Learning — Omdena Academy |
| `certificate-laravel.pdf` | Full Stack Web Dev (Laravel) |
| `certificate-django.pdf` | Django Framework |
| `certificate-computer-training.pdf` | Advanced Computer Training |
| `certificate-electrical.pdf` | Basic Electrical Training |
| `certificate-technopreneurship.pdf` | Advanced Technopreneurship Course |

## Tips

- **PDF format recommended** — works in all browsers without plugins.
- **Keep file sizes small** — compress scans below 2 MB if possible (use Smallpdf, ilovepdf, or similar).
- **File name must match** the `certFile` value in `js/data.js` exactly (case-sensitive).
- **Want to change a filename?** Update both the file name here AND the `certFile` field in `js/data.js`.

## Optional: Keep Google Drive links as backup

You can also fill in `certDriveId` in `js/data.js` for each entry.  
`certFile` takes priority — Drive ID is only used when `certFile` is empty.

## Link certificates from Google Drive instead (optional)

If you prefer to use Google Drive links:
1. Set `certFile: ''` in `js/data.js` for that entry.
2. Share the file as "Anyone with the link can view".
3. Copy the file ID from the URL: `https://drive.google.com/file/d/**FILE_ID**/view`
4. Paste it as `certDriveId: 'FILE_ID'` in `js/data.js`.
