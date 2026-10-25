# سماء النخبة للخدمات العامة — Landing page

Static site (HTML/CSS/JS, no build step) for an insurance-claims office.
Forms hand off to WhatsApp (`wa.me/966567852320`); there is no backend.

## Structure

```
index.html        page markup, inline SVG icon sprite + logo
styles.css        all styles (green brand palette tokens at the top)
main.js           services list, form validation, WhatsApp hand-off, mobile menu
vercel.json       clean URLs, cache + security headers
robots.txt
assets/
  hero.webp           hero background (desktop)
  hero-mobile.webp    hero background (≤920px)
  og.jpg              social share image (1200×630)
  logo.svg            logo / favicon
  apple-touch-icon.png
```

## Run locally

```bash
npx serve .
# or
python3 -m http.server 3000
```

## Deploy to Vercel

**Option A — GitHub (recommended, auto-deploys on every push)**
1. Push this folder to a GitHub repo.
2. Vercel → Add New → Project → import the repo.
3. Framework preset: **Other**. Build command: *(empty)*. Output directory: `.`
4. Deploy.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## After connecting a domain
- Make `og:image` absolute in `index.html` (e.g. `https://yourdomain.com/assets/og.jpg`) — WhatsApp/Facebook previews need an absolute URL.
- Optionally add `og:url` and a `sitemap.xml`.

## Editing content
- Claim types (cards + form dropdowns + footer list): `CLAIMS` array in `main.js`.
- Phone / WhatsApp number: search for `966567852320` (index.html + main.js).
- Colors: CSS custom properties `--g50…--g900` / `--b50…--b900` at the top of `styles.css`.

## Notes
- Assets are cached for 7 days. If you replace an image under the same name, rename it (e.g. `hero-v2.webp`) or visitors may see the old one for up to a week.
- WhatsApp opens in a new tab on submit; if a popup blocker stops it, the confirmation panel shows a button that opens it.
