import { getRun } from "workflow/api";
import { cors, json } from "@/lib/http";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

// Body: { runId }
export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "bad json" }, 400); }
  const runId = body?.runId;
  if (typeof runId !== "string" || !runId) return json(req, { error: "missing runId" }, 400);
  try { await getRun(runId).cancel({ cancelReason: "user" }); } catch {}
  return json(req, { ok: true });
}
