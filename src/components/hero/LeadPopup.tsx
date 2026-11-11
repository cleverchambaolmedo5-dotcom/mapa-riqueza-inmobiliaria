"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { landingConfig } from "@/config/landing";
import { LeadForm, REGISTERED_STORAGE_KEY } from "./LeadForm";
import "./LeadPopup.css";

const DISMISSED_STORAGE_KEY = "lead-popup-dismissed";

function readStorage(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

/**
 * Popup con el formulario de registro, a los `popup.delayMs` de entrar.
 *
 * No se muestra si la persona:
 *  - ya se registró en este navegador,
 *  - ya lo cerró durante esta visita (sesión),
 *  - está escribiendo en el formulario del Hero en ese momento.
 */
export function LeadPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { popup, form } = landingConfig;

  useEffect(() => {
    if (!popup.enabled) return;
    if (readStorage(() => window.localStorage, REGISTERED_STORAGE_KEY)) return;
    if (readStorage(() => window.sessionStorage, DISMISSED_STORAGE_KEY)) return;

    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      const heroForm = document.getElementById(form.anchorId);
      if (heroForm?.contains(document.activeElement)) return;
      dialog.showModal();
    }, popup.delayMs);

    return () => window.clearTimeout(timer);
  }, [popup.enabled, popup.delayMs, form.anchorId]);

  const handleClose = () => {
    try {
      window.sessionStorage.setItem(DISMISSED_STORAGE_KEY, "1");
    } catch {
      // Sin almacenamiento: el popup podría reaparecer al recargar, nada más.
    }
  };

  // Clic en el fondo oscuro (fuera de la tarjeta) cierra el popup.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  if (!popup.enabled) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="popup-title"
      className="lead-popup"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div className="lead-popup-card">
        <button
          type="button"
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:bg-surface"
          onClick={() => dialogRef.current?.close()}
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.5 3.5l9 9m0-9-9 9" strokeLinecap="round" />
          </svg>
        </button>

        <p className="mb-3 pr-10 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-electric min-[400px]:text-[0.6875rem] sm:tracking-[0.2em]">
          {popup.eyebrow}
        </p>
        <LeadForm idPrefix="popup" variant="modal" />
      </div>
    </dialog>
  );
}
