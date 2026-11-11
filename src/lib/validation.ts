export type LeadFormValues = {
  fullName: string;
  dialCode: string;
  phone: string;
  email: string;
};

export type LeadFormErrors = Partial<Record<"fullName" | "phone" | "email", string>>;

/** Datos normalizados listos para enviar al CRM. */
export type LeadPayload = {
  fullName: string;
  /** Formato E.164, p. ej. +593991234567 */
  whatsapp: string;
  email: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function validateFullName(value: string): string | undefined {
  const name = value.trim();
  if (!name) return "Ingresa tu nombre completo.";
  if (name.length < 3) return "El nombre es demasiado corto.";
  return undefined;
}

export function validatePhone(phone: string, dialCode: string): string | undefined {
  const digits = onlyDigits(phone);
  if (!digits) return "Ingresa tu número de WhatsApp.";
  const total = onlyDigits(dialCode).length + digits.length;
  if (digits.length < 6 || total > 15) return "Ingresa un número de WhatsApp válido.";
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const email = value.trim();
  if (!email) return "Ingresa tu correo electrónico.";
  if (!EMAIL_PATTERN.test(email)) return "Ingresa un correo electrónico válido.";
  return undefined;
}

export function validateLeadForm(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const fullName = validateFullName(values.fullName);
  const phone = validatePhone(values.phone, values.dialCode);
  const email = validateEmail(values.email);
  if (fullName) errors.fullName = fullName;
  if (phone) errors.phone = phone;
  if (email) errors.email = email;
  return errors;
}

export function toLeadPayload(values: LeadFormValues): LeadPayload {
  return {
    fullName: values.fullName.trim().replace(/\s+/g, " "),
    whatsapp: `+${onlyDigits(values.dialCode)}${onlyDigits(values.phone)}`,
    email: values.email.trim().toLowerCase(),
  };
}

/** Origen del registro: parámetros UTM de la campaña y página de llegada. */
export type LeadAttribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  /** URL de la landing en la que se registró (sin dominio). */
  page: string;
  /** Sitio desde el que llegó la persona (document.referrer). */
  referrer: string;
};

/** Cuerpo que el formulario envía a `/api/leads`. */
export type LeadSubmission = LeadPayload & {
  /** Código ISO del país elegido en el selector (p. ej. "EC"). */
  country: string;
  attribution: LeadAttribution;
  /** Campo trampa anti-spam: las personas lo dejan vacío. */
  website?: string;
};

const E164_PATTERN = /^\+[1-9]\d{6,14}$/;
const ISO_PATTERN = /^[A-Z]{2}$/;
const ATTRIBUTION_KEYS: (keyof LeadAttribution)[] = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "page",
  "referrer",
];

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Validación en el servidor: nunca se confía en lo que valida el navegador.
 * Devuelve los datos limpios o `null` si algo no es válido.
 */
export function parseLeadSubmission(body: unknown): LeadSubmission | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = body as Record<string, unknown>;

  const fullName = text(raw.fullName, 120).replace(/\s+/g, " ");
  const email = text(raw.email, 160).toLowerCase();
  const whatsapp = text(raw.whatsapp, 20);
  const country = text(raw.country, 2).toUpperCase();

  if (validateFullName(fullName) || validateEmail(email)) return null;
  if (!E164_PATTERN.test(whatsapp)) return null;

  const rawAttribution =
    typeof raw.attribution === "object" && raw.attribution !== null
      ? (raw.attribution as Record<string, unknown>)
      : {};
  const attribution = Object.fromEntries(
    ATTRIBUTION_KEYS.map((key) => [key, text(rawAttribution[key], 300)]),
  ) as LeadAttribution;

  return {
    fullName,
    email,
    whatsapp,
    country: ISO_PATTERN.test(country) ? country : "",
    attribution,
    website: text(raw.website, 200),
  };
}
