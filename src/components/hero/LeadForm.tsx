"use client";

import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { landingConfig } from "@/config/landing";
import { readAttribution } from "@/lib/attribution";
import { submitLead, type LeadSubmissionResult } from "@/lib/lead-submission";
import {
  toLeadPayload,
  validateLeadForm,
  type LeadFormErrors,
  type LeadFormValues,
} from "@/lib/validation";

type Field = keyof LeadFormErrors;
type Status = "idle" | "submitting" | LeadSubmissionResult["status"];

const { form } = landingConfig;
const defaultCountry = form.countries.find((c) => c.iso === form.defaultCountryIso) ?? form.countries[0];

/** Solo se acepta un enlace https válido como destino de la comunidad. */
const communityUrl = (() => {
  const url = landingConfig.leadCapture.communityUrl;
  if (!url) return null;
  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
})();

/** Marca en el navegador de que la persona ya se registró (para no mostrarle el popup). */
export const REGISTERED_STORAGE_KEY = "lead-registered";

type LeadFormProps = {
  /** Prefijo de los id HTML: debe ser distinto en cada formulario de la página. */
  idPrefix?: string;
  /** `card`: formulario del Hero (ancla #registro). `modal`: dentro del popup. */
  variant?: "card" | "modal";
};

export function LeadForm({ idPrefix = "lead", variant = "card" }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>({
    fullName: "",
    dialCode: `${defaultCountry.iso}|${defaultCountry.dialCode}`,
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Registra la campaña (UTM) de llegada aunque la persona se registre más tarde.
  useEffect(() => {
    readAttribution();
  }, []);

  // El select guarda "ISO|+código" para distinguir países con el mismo prefijo.
  const normalized = (v: LeadFormValues): LeadFormValues => ({ ...v, dialCode: v.dialCode.split("|")[1] ?? "" });

  const revalidate = (next: LeadFormValues, fields: Partial<Record<Field, boolean>>) => {
    const all = validateLeadForm(normalized(next));
    const visible: LeadFormErrors = {};
    (Object.keys(fields) as Field[]).forEach((f) => {
      if (fields[f] && all[f]) visible[f] = all[f];
    });
    setErrors(visible);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (status !== "idle" && status !== "submitting") setStatus("idle");
    revalidate(next, touched);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as Field;
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    revalidate(values, nextTouched);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allTouched = { fullName: true, phone: true, email: true };
    setTouched(allTouched);
    const validation = validateLeadForm(normalized(values));
    setErrors(validation);

    const firstInvalid = (["fullName", "phone", "email"] as Field[]).find((f) => validation[f]);
    if (firstInvalid) {
      document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus();
      return;
    }

    const honeypot = new FormData(event.currentTarget).get("website");

    setStatus("submitting");
    const result = await submitLead({
      ...toLeadPayload(normalized(values)),
      country: values.dialCode.split("|")[0] ?? "",
      attribution: readAttribution(),
      website: typeof honeypot === "string" ? honeypot : "",
    });
    setStatus(result.status);
    setErrorMessage(result.status === "error" ? result.message : "");
    if (result.status === "sent") {
      setValues((current) => ({ ...current, fullName: "", phone: "", email: "" }));
      setTouched({});
      setErrors({});
      try {
        window.localStorage.setItem(REGISTERED_STORAGE_KEY, "1");
      } catch {
        // Almacenamiento bloqueado: solo implica que el popup podría volver a mostrarse.
      }
      // Redirección en la misma pestaña: no la bloquean los navegadores (una ventana nueva sí).
      if (communityUrl) window.location.assign(communityUrl);
    }
  };

  const countrySelect = (
    <div className="relative flex shrink-0 items-center border-r border-field bg-surface">
      <label htmlFor={`${idPrefix}-dialCode`} className="sr-only">
        Código de país
      </label>
      <select
        id={`${idPrefix}-dialCode`}
        name="dialCode"
        value={values.dialCode}
        onChange={handleChange}
        autoComplete="tel-country-code"
        className="h-full cursor-pointer appearance-none bg-transparent pl-3.5 pr-8 text-[0.9375rem] font-semibold text-ink outline-none"
      >
        {form.countries.map((country) => (
          <option key={country.iso} value={`${country.iso}|${country.dialCode}`}>
            {country.iso} {country.dialCode}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="pointer-events-none absolute right-3 size-2.5 text-placeholder"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <div
      id={variant === "card" ? landingConfig.form.anchorId : undefined}
      className={
        variant === "card"
          ? "reveal reveal-5 form-card relative w-full rounded-[1.25rem] bg-white p-5 min-[400px]:p-6 sm:p-8 lg:p-7 short:px-7 short:py-6 tiny:py-4"
          : "relative w-full"
      }
    >
      <div className={variant === "card" ? "mb-5 short:mb-4 tiny:mb-3" : "mb-5"}>
        <h2
          id={`${idPrefix}-title`}
          className="text-[1.375rem] font-extrabold uppercase leading-tight tracking-[-0.01em] text-ink sm:text-[1.625rem] tiny:text-[1.375rem]"
        >
          {form.title}
        </h2>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft short:text-sm">{form.description}</p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-1" aria-describedby={`${idPrefix}-status`}>
        <Input
          id={`${idPrefix}-fullName`}
          name="fullName"
          label="Nombre completo"
          placeholder="Ej. María Fernanda López"
          autoComplete="name"
          required
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />
        <Input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          label="WhatsApp (con código de país)"
          placeholder="99 123 4567"
          autoComplete="tel-national"
          required
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          leading={countrySelect}
        />
        <Input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          inputMode="email"
          label="Correo electrónico"
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        {/* Campo trampa anti-spam: invisible para personas, los bots lo rellenan. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${idPrefix}-website`}>No completes este campo</label>
          <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <Button type="submit" fullWidth disabled={status === "submitting"} className="mt-2">
          <span>{status === "submitting" ? "Enviando…" : form.submitLabel}</span>
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Button>

        <p className="mt-2.5 text-center text-xs leading-relaxed text-ink-soft tiny:mt-2">
          {landingConfig.privacy.formNotice.before}{" "}
          <a
            href={landingConfig.privacy.href}
            target="_blank"
            rel="noopener"
            className="font-semibold text-electric underline-offset-2 hover:underline focus-visible:underline"
          >
            {landingConfig.privacy.formNotice.linkLabel}
          </a>{" "}
          {landingConfig.privacy.formNotice.after}
        </p>

        <div id={`${idPrefix}-status`} aria-live="polite" className="min-h-0">
          {status === "sent" && (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-emerald-900">
              <strong>{landingConfig.leadCapture.successTitle}</strong>{" "}
              {communityUrl ? (
                <>
                  {landingConfig.leadCapture.redirectingMessage}{" "}
                  <a href={communityUrl} className="font-semibold underline underline-offset-2">
                    {landingConfig.leadCapture.communityLinkLabel}
                  </a>
                </>
              ) : (
                landingConfig.leadCapture.successMessage
              )}
            </p>
          )}
          {status === "not_configured" && (
            <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-[0.8125rem] leading-snug text-amber-900">
              <strong>Integración pendiente:</strong> los datos son válidos, pero el registro todavía no está conectado
              a Google Sheets, así que no se han enviado.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[0.8125rem] text-red-800">
              {errorMessage}
              {communityUrl && (
                <>
                  {" "}
                  Si el problema continúa, puedes{" "}
                  <a href={communityUrl} className="font-semibold underline underline-offset-2">
                    unirte a la comunidad
                  </a>{" "}
                  igualmente.
                </>
              )}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
