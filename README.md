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
admin/index.html      Password-gated page to set the site-wide default theme/font
css/style.css          Styles — theme tokens (7 themes) + font pairings (6), see js/theme-switcher.js
js/main.js             Mobile nav toggle + footer year
js/theme-switcher.js    Appearance panel logic + fetches the admin-set site default
favicon.svg              Browser tab icon
robots.txt / sitemap.xml
_headers                 Cloudflare response headers (security headers, caching)
wrangler.jsonc            Worker config — static assets + KV binding for /api/appearance
worker/index.js            The Worker's server-side logic (GET/POST /api/appearance)
.assetsignore               Excludes source/, scripts/, etc. from the public static assets
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

## Deploying to Cloudflare

This is now a **Worker with static assets** (Cloudflare's current model — what used to be
called "Pages"), configured via `wrangler.jsonc`. It serves the static site directly, plus
one small API route (`/api/appearance`) backed by Cloudflare KV so the `/admin` page can set
a site-wide default theme/font. Every push to `main` redeploys automatically once Git is
connected (Workers & Pages → this project → Settings → Git).

**One-time setup** (only needed once, or if the KV binding/secret is ever reset):

1. Create a KV namespace: Cloudflare dashboard → **Storage & Databases → KV → Create**
   (name it e.g. `sanjula-appearance`).
2. Bind it to this Worker: project → **Settings → Bindings → Add → KV Namespace**,
   variable name `APPEARANCE_KV`, pointing at the namespace you just created. (Alternatively,
   put the namespace's ID into `wrangler.jsonc`'s `kv_namespaces[0].id` and redeploy.)
3. Set the admin password: project → **Settings → Variables and Secrets → Add** →
   name `ADMIN_PASSWORD`, type **Secret**, value of your choosing. Never commit this value
   to the repo.
4. Custom domain: **Custom Domains** tab → add `sanjulabai.com`, once the first deploy succeeds.

## Site-wide appearance default (`/admin`)

`/admin` is a password-gated page (not linked from the public site) that sets the theme and
typeface every **first-time** visitor sees. It calls `POST /api/appearance` with the
`ADMIN_PASSWORD` secret as a bearer token, which writes to KV.

Visitors who use the 🎨 Appearance panel on the main site always keep their own choice
(stored in their browser's `localStorage`) — the admin default only affects people who
haven't customized anything yet. This is basic-auth-level protection (a single shared
password checked server-side), fine for a low-stakes internal control, not enterprise auth.

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
