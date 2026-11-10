// Genera le chiavi che firmano le notifiche durante la build su Vercel.
// Restano solo nel server pubblicato: non vanno su GitHub (file in .gitignore).
import fs from "node:fs";
import webpush from "web-push";

const out = new URL("../lib/vapid.generated.json", import.meta.url);
const fromEnv = process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY;
const keys = fromEnv
  ? { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY }
  : webpush.generateVAPIDKeys();
fs.writeFileSync(out, JSON.stringify(keys));
console.log("VAPID keys ready", fromEnv ? "(from env)" : "(generated)");
