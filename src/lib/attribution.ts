import type { LeadAttribution } from "@/lib/validation";

const STORAGE_KEY = "lead-attribution";

/**
 * Lee los parámetros UTM de la URL actual y la página de llegada.
 * Solo se ejecuta en el navegador, en el momento del envío (sin riesgo de hidratación).
 *
 * Se guarda el primer origen de la sesión: si la persona navega dentro de la
 * landing (anclas, recargas sin UTM), no se pierde la campaña que la trajo.
 */
export function readAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);
  const current: LeadAttribution = {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    utmTerm: params.get("utm_term") ?? "",
    page: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer,
  };

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const first = JSON.parse(stored) as LeadAttribution;
      // Si la URL actual no trae campaña, se conserva la de la primera visita.
      if (!current.utmSource && first.utmSource) return first;
    }
    if (current.utmSource || !stored) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Almacenamiento bloqueado (modo privado, etc.): se usa lo que haya en la URL.
  }
  return current;
}
