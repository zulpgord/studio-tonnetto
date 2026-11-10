import { sleep, FatalError } from "workflow";
import webpush from "web-push";
import { VAPID_PUBLIC, VAPID_PRIVATE } from "@/lib/vapid";

export type Alert = { at: number; title: string; body: string };
type Sub = { endpoint: string; keys: { p256dh: string; auth: string } };

// Aspetta fino a ogni orario e manda la notifica. Nessun costo di calcolo mentre dorme.
export async function notifyWorkflow(sub: Sub, alerts: Alert[]) {
  "use workflow";
  for (const a of alerts) {
    await sleep(new Date(a.at));
    await sendPush(sub, a);
  }
  return { sent: alerts.length };
}

async function sendPush(sub: Sub, a: Alert) {
  "use step";
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:tonnetto@example.com",
    VAPID_PUBLIC,
    VAPID_PRIVATE,
  );
  try {
    await webpush.sendNotification(sub, JSON.stringify({ title: a.title, body: a.body }), {
      TTL: 300,
      urgency: "high",
      topic: "tonnetto",
    });
  } catch (e: any) {
    // Gli errori di web-push non sono serializzabili: li trasformo in messaggi semplici.
    const code = Number(e?.statusCode) || 0;
    const msg = `push ${code || "network"}: ${String(e?.body || e?.message || "").slice(0, 200)}`;
    // 4xx (iscrizione scaduta, revocata o non valida): inutile riprovare.
    if (code >= 400 && code < 500 && code !== 429) throw new FatalError(msg);
    throw new Error(msg);
  }
}
