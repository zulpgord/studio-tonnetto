import { sleep, FatalError } from "workflow";
import webpush from "web-push";

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
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
  try {
    await webpush.sendNotification(sub, JSON.stringify({ title: a.title, body: a.body }), {
      TTL: 300,
      urgency: "high",
      topic: "tonnetto",
    });
  } catch (e: any) {
    // Iscrizione scaduta o revocata: inutile riprovare.
    if (e?.statusCode === 404 || e?.statusCode === 410) throw new FatalError("subscription gone");
    throw e;
  }
}
