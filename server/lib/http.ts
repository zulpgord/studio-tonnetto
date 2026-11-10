// Origini da cui l'app può chiamare il server.
const ALLOWED = ["https://zulpgord.github.io", "http://localhost:3000", "http://localhost:8080"];

export function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function json(req: Request, body: unknown, status = 200) {
  return Response.json(body, { status, headers: cors(req) });
}

// Solo i servizi push dei browser: evita che il server venga usato per chiamare indirizzi qualsiasi.
const PUSH_HOSTS = [/\.push\.apple\.com$/, /^fcm\.googleapis\.com$/, /\.mozilla\.com$/, /\.notify\.windows\.com$/, /^android\.googleapis\.com$/];

export type PushSub = { endpoint: string; keys: { p256dh: string; auth: string } };

export function validSub(s: any): s is PushSub {
  try {
    if (!s || typeof s.endpoint !== "string" || !s.keys?.p256dh || !s.keys?.auth) return false;
    const u = new URL(s.endpoint);
    if (process.env.ALLOW_LOCAL_PUSH === "1" && u.hostname === "127.0.0.1") return true;
    return u.protocol === "https:" && PUSH_HOSTS.some((r) => r.test(u.hostname));
  } catch {
    return false;
  }
}
