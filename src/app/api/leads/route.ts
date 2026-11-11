import { parseLeadSubmission } from "@/lib/validation";

/**
 * POST /api/leads — recibe el registro del formulario y lo guarda en Google Sheets
 * a través de un Web App de Google Apps Script (ver integrations/google-sheets/).
 *
 * Variables de entorno (solo servidor, nunca en el cliente):
 *   GOOGLE_SHEETS_WEBHOOK_URL     URL del Web App publicado (termina en /exec).
 *   GOOGLE_SHEETS_WEBHOOK_SECRET  Clave compartida con el script (SECRET en Code.gs).
 */

const MAX_BODY_BYTES = 8 * 1024;
const UPSTREAM_TIMEOUT_MS = 12_000;

// Límite básico por IP (en memoria, por instancia): frena envíos masivos.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 5000) attempts.clear();
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "desconocida";
}

const json = (body: Record<string, unknown>, status: number) => Response.json(body, { status });

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !secret) {
    return json({ error: "not_configured" }, 503);
  }

  if (isRateLimited(clientIp(request))) {
    return json({ error: "rate_limited" }, 429);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) return json({ error: "invalid" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const lead = parseLeadSubmission(body);
  if (!lead) return json({ error: "invalid" }, 400);

  // Campo trampa relleno = bot. Se responde "ok" para no darle pistas, pero no se guarda.
  if (lead.website) return json({ ok: true }, 200);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      // text/plain: Apps Script lo recibe igual en e.postData.contents.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret,
        fullName: lead.fullName,
        whatsapp: lead.whatsapp,
        email: lead.email,
        country: lead.country,
        ...lead.attribution,
        userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
      }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    const result = (await upstream.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!upstream.ok || !result?.ok) {
      console.error("[api/leads] Google Sheets rechazó el registro:", upstream.status, result?.error ?? "sin detalle");
      return json({ error: "upstream" }, 502);
    }
  } catch (error) {
    console.error("[api/leads] No se pudo contactar con Google Sheets:", error);
    return json({ error: "upstream" }, 502);
  }

  return json({ ok: true }, 200);
}
