"use client";

import { useSyncExternalStore } from "react";
import { landingConfig } from "@/config/landing";

const { countdown } = landingConfig;
const TARGET_MS = new Date(countdown.target).getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Tiempo restante hasta `targetMs`, nunca negativo. `null` cuando ya llegó. */
export function getTimeLeft(targetMs: number, nowMs: number): TimeLeft | null {
  const total = Math.floor((targetMs - nowMs) / 1000);
  if (total <= 0) return null;
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

/* Reloj compartido: un único intervalo por suscriptor, limpiado al desmontar. */
function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
/** Segundo actual (valor primitivo estable dentro del mismo segundo). */
const getSnapshot = () => Math.floor(Date.now() / 1000);
/** En servidor/prerender no hay "ahora": se pinta un marcador neutro. */
const getServerSnapshot = () => null;

const pad = (value: number) => String(value).padStart(2, "0");

export function CountdownBar() {
  const nowSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const timeLeft = nowSec === null ? undefined : getTimeLeft(TARGET_MS, nowSec * 1000);
  const ended = timeLeft === null;

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: "days", label: countdown.labels.days },
    { key: "hours", label: countdown.labels.hours },
    { key: "minutes", label: countdown.labels.minutes },
    { key: "seconds", label: countdown.labels.seconds },
  ];

  return (
    <div className="w-full bg-electric text-white">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center justify-center gap-2 px-4 py-2.5 sm:px-8 lg:flex-row lg:gap-6 lg:py-2 short:py-1.5">
        {ended ? (
          <p
            role="status"
            className="py-2 text-center text-sm font-extrabold uppercase tracking-[0.18em] sm:text-base"
          >
            {countdown.endedMessage}
          </p>
        ) : (
          <>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
              {countdown.title}
            </p>
            <ul role="timer" aria-label={countdown.title} className="flex items-stretch gap-2 sm:gap-2.5">
              {units.map(({ key, label }) => (
                <li
                  key={key}
                  className="flex w-[3.875rem] flex-col items-center justify-center rounded-lg bg-white px-1 py-1 sm:w-[4.75rem] sm:py-1.5"
                >
                  <span className="text-xl font-extrabold leading-none tabular-nums text-[#123B9A] sm:text-2xl">
                    {timeLeft ? pad(timeLeft[key]) : "--"}
                  </span>
                  <span className="mt-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.08em] text-[#123B9A]/70 sm:text-[0.625rem] sm:tracking-[0.12em]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
