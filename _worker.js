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
const RATE_LIMIT_MAX_ATTEMPTS = 8;
const RATE_LIMIT_WINDOW_SECONDS = 15 * 60;

function json(data, init) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init && init.headers) },
  });
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function isAuthorized(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  return Boolean(env.ADMIN_PASSWORD) && timingSafeEqual(token, env.ADMIN_PASSWORD);
}

function rateLimitKey(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  return "ratelimit:" + ip;
}

async function isRateLimited(request, env) {
  if (!env.APPEARANCE_KV) return false;
  const raw = await env.APPEARANCE_KV.get(rateLimitKey(request));
  const count = raw ? parseInt(raw, 10) : 0;
  return count >= RATE_LIMIT_MAX_ATTEMPTS;
}

async function recordFailedAttempt(request, env) {
  if (!env.APPEARANCE_KV) return;
  const key = rateLimitKey(request);
  const raw = await env.APPEARANCE_KV.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  await env.APPEARANCE_KV.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SECONDS });
}

async function clearFailedAttempts(request, env) {
  if (!env.APPEARANCE_KV) return;
  await env.APPEARANCE_KV.delete(rateLimitKey(request));
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
        if (await isRateLimited(request, env)) {
          return json(
            { error: "Too many failed attempts. Try again in a few minutes." },
            { status: 429 }
          );
        }
        if (!isAuthorized(request, env)) {
          await recordFailedAttempt(request, env);
          return json({ error: "Unauthorized" }, { status: 401 });
        }
        await clearFailedAttempts(request, env);
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
