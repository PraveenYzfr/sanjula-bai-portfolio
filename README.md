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
sb-admin-5fb3c4a3/index.html  Password-gated site-settings page (theme/font default,
                               résumé-download toggle) — path is deliberately obscure,
                               not linked anywhere; treat the path itself as semi-secret
css/style.css          Styles — theme tokens (7 themes) + font pairings (6), see js/theme-switcher.js
js/main.js             Mobile nav toggle + footer year
js/theme-switcher.js    Appearance panel logic + fetches the admin-set site default
favicon.svg              Browser tab icon
robots.txt / sitemap.xml
_headers                 Cloudflare Pages response headers (security headers, caching)
_worker.js                Pages "Advanced Mode" worker — handles GET/POST /api/appearance,
                           falls through to static assets for everything else
assets/img/            Headshot, generated OG image, apple touch icon
assets/resume/          Downloadable résumé PDF (same file as source/, as confirmed)
source/                 Original résumé PDF — source of truth for all content on the site
scripts/gen_og_image.py Regenerates the OG/social preview image and apple-touch-icon
                         from resume stats — rerun if headline stats or branding change
scripts/*contrast_check.py  WCAG contrast checks for the color tokens — rerun before
                             adding/editing a theme
```

## Local development

No build step — just serve the folder statically and open it.

```bash
python -m http.server 8420
```

Then open http://localhost:8420. (Opening `index.html` directly via `file://` will not
work correctly, since the page uses root-relative asset paths like `/css/style.css`.)

## Deploying to Cloudflare Pages

This is a **Cloudflare Pages** project (Git-connected, `main` branch, no build command,
build output = repo root). Every push to `main` redeploys automatically.

Server-side logic (the `/api/appearance` route) is handled via Pages' **Advanced Mode**:
a `_worker.js` file at the repo root, which Pages automatically picks up and runs in front
of the static assets — no separate build step or `wrangler.jsonc` needed. `_worker.js`
handles `/api/appearance` itself and forwards every other request to `env.ASSETS`, which
serves the static site exactly as before.

**One-time setup** (only needed once, or if the KV binding/secret is ever reset) — all
under this Pages project's **Settings** tab:

1. Create a KV namespace: Cloudflare dashboard → **Storage & Databases → KV → Create**
   (name it e.g. `sanjula-appearance`).
2. Bind it: **Settings → Bindings → Add → KV namespace**, variable name `APPEARANCE_KV`,
   pointing at the namespace you just created. (Pages may label this section "Bindings" or
   "Functions → KV namespace bindings" depending on dashboard version — same setting either way.)
3. Set the admin password: **Settings → Variables and secrets → Add** → name
   `ADMIN_PASSWORD`, type **Secret**/**Encrypt**, value of your choosing. Never commit this
   value to the repo.
4. Custom domain: **Custom domains** tab → add `sanjulabai.com`, once the first deploy succeeds.

If `APPEARANCE_KV` isn't bound yet, `/api/appearance` degrades gracefully (`GET` returns an
empty default, `POST` returns a clear 500 instead of crashing) — the rest of the site is
unaffected either way, since only that one route is handled specially.

## Site settings (`/sb-admin-5fb3c4a3/`)

A password-gated page (not linked from the public site, and its path is deliberately an
unguessable random slug rather than `/admin` — reduces automated scanning, but is obscurity,
not real access control; don't treat the path as the actual security boundary) that sets:

- The default theme/typeface every **first-time** visitor sees. Visitors who use the 🎨
  Appearance panel on the main site always keep their own choice (stored in their browser's
  `localStorage`) — the admin default only affects people who haven't customized anything yet.
- Whether the résumé download is enabled site-wide (applies to every visitor, no override).

It calls `POST /api/appearance` with the `ADMIN_PASSWORD` secret as a bearer token, which
writes to KV. The endpoint rate-limits failed attempts (8 per IP / 15 minutes) — see
`_worker.js`. This is still basic-auth-level protection (one shared password), fine for a
low-stakes internal control, not enterprise auth. If you ever want real per-person login,
Cloudflare Access can be put in front of this path from the dashboard without a code change.

**If you ever want to change this path**: rename the `sb-admin-5fb3c4a3/` folder to a new
random slug (`openssl rand -hex 4` or similar) and update this README to match.

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
