# سماء النخبة للخدمات العامة — Landing page

Static site (HTML/CSS/JS, no build step) for an insurance-claims office.
Forms hand off to WhatsApp (`wa.me/966567852320`); there is no backend.

## Structure

```
index.html        page markup, inline SVG icon sprite + logo
privacy.html      privacy policy (/privacy, linked from footer)
styles.css        all styles (green brand palette tokens at the top)
main.js           services list, form validation, WhatsApp hand-off, mobile menu
vercel.json       clean URLs, cache + security headers
robots.txt
sitemap.xml       add new pages here; submitted in Google Search Console
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

## Domain
Live at `https://www.nj113.com` (bare `nj113.com` redirects to `www`). Canonical, `og:url`, `og:image` and `sitemap.xml` use the full `www` URL — update them if the domain changes.

## Editing content
- Claim types (cards + form dropdowns + footer list): `CLAIMS` array in `main.js`.
- Phone / WhatsApp number: search for `966567852320` (index.html + main.js).
- Colors: CSS custom properties `--g50…--g900` / `--b50…--b900` at the top of `styles.css`.

## Notes
- Assets are cached for 7 days. If you replace an image under the same name, rename it (e.g. `hero-v2.webp`) or visitors may see the old one for up to a week.
- WhatsApp opens in a new tab on submit; if a popup blocker stops it, the confirmation panel shows a button that opens it.
