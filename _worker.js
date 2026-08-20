// Cloudflare Pages "Advanced Mode" worker — this file at the repo root takes
// over ALL routing for the Pages project. It handles the one API route this
// site needs (GET/POST /api/appearance) and falls through to env.ASSETS for
// everything else, which serves the static site exactly as before.

const VALID_THEMES = [
  "boardroom-navy-light",
  "boardroom-navy-dark",
  "ivory-classic",
  "slate-graphite",
  "midnight-emerald",
  "royal-indigo",
  "warm-bronze",
];

const VALID_FONTS = [
  "classic-serif",
  "institutional-times",
  "modern-sans",
  "elegant-palatino",
  "corporate-grotesk",
  "refined-cambria",
];

const KV_KEY = "site-default-appearance";

function json(data, init) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init && init.headers) },
  });
}

function isAuthorized(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  return Boolean(env.ADMIN_PASSWORD) && token === env.ADMIN_PASSWORD;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/appearance") {
      if (request.method === "GET") {
        if (!env.APPEARANCE_KV) {
          return json({ theme: null, font: null, resumeDownloadEnabled: true });
        }
        const stored = await env.APPEARANCE_KV.get(KV_KEY, "json");
        return json({
          theme: (stored && stored.theme) || null,
          font: (stored && stored.font) || null,
          resumeDownloadEnabled: !stored || stored.resumeDownloadEnabled !== false,
        });
      }

      if (request.method === "POST") {
        if (!isAuthorized(request, env)) {
          return json({ error: "Unauthorized" }, { status: 401 });
        }
        if (!env.APPEARANCE_KV) {
          return json({ error: "APPEARANCE_KV binding is not configured" }, { status: 500 });
        }
        let body;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON body" }, { status: 400 });
        }
        const theme = body.theme === null ? null : body.theme;
        const font = body.font === null ? null : body.font;
        if (theme !== null && !VALID_THEMES.includes(theme)) {
          return json({ error: "Invalid theme: " + theme }, { status: 400 });
        }
        if (font !== null && !VALID_FONTS.includes(font)) {
          return json({ error: "Invalid font: " + font }, { status: 400 });
        }
        if (typeof body.resumeDownloadEnabled !== "boolean") {
          return json({ error: "resumeDownloadEnabled must be true or false" }, { status: 400 });
        }
        const value = { theme, font, resumeDownloadEnabled: body.resumeDownloadEnabled };
        await env.APPEARANCE_KV.put(KV_KEY, JSON.stringify(value));
        return json({ ok: true, ...value });
      }

      return json({ error: "Method not allowed" }, { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
};
