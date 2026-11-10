import { start, getRun } from "workflow/api";
import { notifyWorkflow, type Alert } from "@/workflows/notify";
import { cors, json, validSub } from "@/lib/http";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

// Body: { subscription, alerts: [{ at, title, body }], replace?: runId }
export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "bad json" }, 400); }
  const { subscription, alerts, replace } = body ?? {};
  if (!validSub(subscription)) return json(req, { error: "bad subscription" }, 400);

  if (typeof replace === "string" && replace) {
    try { await getRun(replace).cancel({ cancelReason: "replaced" }); } catch {}
  }

  const now = Date.now();
  const list: Alert[] = Array.isArray(alerts)
    ? alerts
        .filter((a: any) => Number.isFinite(a?.at) && a.at > now - 5000 && a.at < now + 6 * 3600_000)
        .slice(0, 3)
        .map((a: any) => ({ at: Math.round(a.at), title: String(a.title ?? "Tonnetto").slice(0, 80), body: String(a.body ?? "").slice(0, 160) }))
        .sort((x: Alert, y: Alert) => x.at - y.at)
    : [];
  if (!list.length) return json(req, { runId: null });

  const run = await start(notifyWorkflow, [subscription, list]);
  return json(req, { runId: run.runId });
}
