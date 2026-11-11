"use client";

import type { MouseEvent, ReactNode } from "react";

/** Aire sobre el formulario al llegar, para que no quede pegado al borde. */
const SCROLL_OFFSET_PX = 24;

type ScrollToFormLinkProps = {
  targetId: string;
  children: ReactNode;
  className?: string;
};

/**
 * Enlace al formulario. Sin JavaScript funciona como ancla normal (#id);
 * con JavaScript desplaza suavemente, salvo si el usuario prefiere menos movimiento.
 */
export function ScrollToFormLink({ targetId, children, className = "" }: ScrollToFormLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", `#${targetId}`);

    // Activado con teclado (detail === 0): lleva el foco al primer campo, sin otro salto.
    // Con clic/toque no se enfoca, para no abrir el teclado móvil durante el desplazamiento.
    if (event.detail === 0) {
      target.querySelector<HTMLElement>("input, select, textarea")?.focus({ preventScroll: true });
    }
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
