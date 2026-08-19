# Sanjula Bai — Executive Profile Site

Personal board/executive profile site for **Sanjula Bai**, Global Risk & Compliance Executive
and Certified Independent Director (IICA, Ministry of Corporate Affairs, GoI).

Live at: https://sanjulabai.com

## Stack

Static site — plain HTML, CSS, and vanilla JS. No build step, no framework, no external
CDNs or hosted fonts (system font stack only). Every fact on the page is sourced from
[`source/Sanjula-Bai-Resume.pdf`](source/Sanjula-Bai-Resume.pdf).

```
index.html          Single-page site (all sections)
css/style.css        Styles — light theme primary, dark theme via prefers-color-scheme
js/main.js            Mobile nav toggle + footer year
favicon.svg            Browser tab icon
robots.txt / sitemap.xml
_headers               Cloudflare Pages response headers (security headers, caching)
assets/img/            Headshot, generated OG image, apple touch icon
assets/resume/          Downloadable résumé PDF (same file as source/, as confirmed)
source/                 Original résumé PDF — source of truth for all content on the site
scripts/gen_og_image.py Regenerates the OG/social preview image and apple-touch-icon
                         from resume stats — rerun if headline stats or branding change
```

## Local development

No build step — just serve the folder statically and open it.

```bash
python -m http.server 8420
```

Then open http://localhost:8420. (Opening `index.html` directly via `file://` will not
work correctly, since the page uses root-relative asset paths like `/css/style.css`.)

## Deploying to Cloudflare Pages

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
2. Select this repository, branch `main`.
3. Build settings: **no build command**, output directory `/` (the repo root).
4. Add the custom domain `sanjulabai.com` under the Pages project's **Custom domains** tab
   once the first deploy succeeds.

Every push to `main` redeploys automatically.

## Content updates

All copy is drawn directly from the résumé (`source/Sanjula-Bai-Resume.pdf`). To update a
number, title, or date:

1. Confirm the change against an updated résumé or directly with Sanjula — do not edit
   figures from memory or inference.
2. Update the corresponding text in `index.html`.
3. If a headline stat (24+ years, 800+ FTE, $70M+, etc.) changes, also rerun
   `python scripts/gen_og_image.py` to refresh the social-preview image, and update the
   `hasCredential` / description text in the JSON-LD block in `index.html`'s `<head>`.
4. If the résumé PDF itself is replaced, update both `source/Sanjula-Bai-Resume.pdf` and
   `assets/resume/Sanjula-Bai-Resume.pdf` (the latter is what the site links to for download).

## Ownership & handover

This repository was created and is currently hosted under Praveen's GitHub account
(`PraveenYzfr`) as a temporary arrangement while setting the site up on Sanjula's behalf.
To hand over full ownership:

1. **Repo** — transfer this GitHub repository to an account Sanjula controls
   (Settings → General → Danger Zone → Transfer ownership), or have her fork/re-host it.
2. **Cloudflare Pages project** — either invite Sanjula as a member of the Cloudflare
   account/project, or reconnect the Pages project to the transferred repo under her own
   Cloudflare account.
3. **Domain** (`sanjulabai.com`) — transfer registrar/DNS control to her, or grant her
   access to the DNS zone if it stays on a shared Cloudflare account.

## Accessibility & performance targets

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), skip link, visible
  focus states, real alt text.
- WCAG AA contrast verified for both themes (see `scripts/contrast_check.py`).
- No web fonts, no client-side frameworks, no render-blocking third-party requests —
  built to score 95+ on Lighthouse across Performance, Accessibility, Best Practices, SEO.
