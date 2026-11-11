import { landingConfig } from "@/config/landing";
import type { LeadSubmission } from "@/lib/validation";

export type LeadSubmissionResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "error"; message: string };

/**
 * Envía el registro a la Route Handler propia (`/api/leads`), que lo guarda en
 * Google Sheets. Las credenciales viven solo en el servidor.
 */
export async function submitLead(payload: LeadSubmission): Promise<LeadSubmissionResult> {
  const endpoint = landingConfig.leadCapture.endpoint;
  if (!endpoint) return { status: "not_configured" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { status: "sent" };
    if (response.status === 503) return { status: "not_configured" };
    if (response.status === 429) {
      return { status: "error", message: "Has realizado demasiados intentos. Espera unos minutos e inténtalo de nuevo." };
    }
    if (response.status === 400) {
      return { status: "error", message: "Revisa tus datos: alguno no es válido." };
    }
    return { status: "error", message: "No pudimos completar tu registro. Inténtalo de nuevo." };
  } catch {
    return { status: "error", message: "Error de conexión. Revisa tu internet e inténtalo de nuevo." };
  }
}
