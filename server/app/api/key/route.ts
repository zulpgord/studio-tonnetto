import { VAPID_PUBLIC } from "@/lib/vapid";
import { cors } from "@/lib/http";

export const dynamic = "force-static";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

export async function GET(req: Request) {
  return Response.json({ publicKey: VAPID_PUBLIC }, { headers: { ...cors(req), "Access-Control-Allow-Origin": "*" } });
}
