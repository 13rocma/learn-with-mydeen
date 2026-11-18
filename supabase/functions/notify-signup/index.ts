import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Appelée uniquement par le déclencheur de la base de données (en-tête secret),
// pour envoyer un message Telegram à l'administrateur à chaque nouvelle inscription.

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const secret = Deno.env.get("NOTIFY_SECRET");
  if (!secret || req.headers.get("x-notify-secret") !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
  if (!token || !chatId) return new Response("Not configured", { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const prenom = String(body.prenom ?? "").slice(0, 60);
  const email = String(body.email ?? "").slice(0, 120);
  const total = Number(body.total) || 0;
  const text =
    `🆕 <b>Nouvelle inscription MyDeen</b>\n` +
    `👤 ${esc(prenom || "(sans prénom)")}\n` +
    `✉️ ${esc(email)}\n` +
    `📧 Emails : ${body.marketing_consent === true ? "accepte" : "refuse"}` +
    (total ? `\n👥 Inscrits au total : ${total}` : "");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) {
    console.error("Telegram error", res.status); // jamais le token dans les journaux
    return new Response("Telegram error", { status: 502 });
  }
  return new Response("ok");
});
