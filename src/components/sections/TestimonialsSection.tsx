import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { landingConfig, type Testimonial } from "@/config/landing";
import "./TestimonialsMarquee.css";

/** Contenido de cada tarjeta: un testimonio real o un espacio pendiente. */
type Card = { kind: "testimonial"; item: Testimonial } | { kind: "pending"; id: string };

/** Mínimo de tarjetas por grupo para que cada fila cubra pantallas anchas sin huecos. */
const MIN_CARDS_PER_GROUP = 6;

const cardClass =
  "flex h-full w-[17.5rem] flex-col rounded-2xl border border-field bg-white p-6 shadow-[0_1px_2px_rgba(11,13,20,0.05)] sm:w-[21rem] sm:p-7 lg:w-[23rem]";

const MAX_STARS = 5;
const STAR_PATH =
  "M10 1.6l2.47 5.2 5.7.68-4.2 3.9 1.1 5.63L10 14.2l-5.07 2.81 1.1-5.63-4.2-3.9 5.7-.68L10 1.6z";

/** Estrellas decorativas (no son una calificación verificada): ocultas a lectores de pantalla. */
function Stars({ count }: { count: number }) {
  const filled = Math.min(MAX_STARS, Math.max(0, Math.round(count)));
  return (
    <div aria-hidden className="tcard-stars">
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={i < filled ? undefined : "tcard-star-empty"}>
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className="tcard-quote-mark">
      <path
        fill="currentColor"
        d="M17 9.5c-5.9 1.7-10 6.7-10 13.4V31h10.2V20.8h-4.6c.3-3.7 2.4-6.2 5.6-7.4L17 9.5zm16 0c-5.9 1.7-10 6.7-10 13.4V31h10.2V20.8h-4.6c.3-3.7 2.4-6.2 5.6-7.4L33 9.5z"
      />
    </svg>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="tcard">
      <span aria-hidden className="tcard-stripe" />
      <span aria-hidden className="tcard-glint" />
      <div className="tcard-head">
        <Stars count={item.stars ?? MAX_STARS} />
        <QuoteMark />
      </div>
      {item.image && (
        <Image
          src={item.image.src}
          width={item.image.width}
          height={item.image.height}
          alt={item.image.alt}
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 290px, 250px"
          className="mt-5 h-auto w-full rounded-xl border border-field"
        />
      )}
      <blockquote className="tcard-text">“{item.quote}”</blockquote>
      {(item.name || item.detail) && (
        <figcaption className="tcard-author">
          {item.name && <span className="tcard-name">{item.name}</span>}
          {item.detail && <span className="tcard-program">{item.detail}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * PENDIENTE: espacio reservado para un testimonio real autorizado.
 * No contiene texto, nombre ni imagen ficticios.
 */
function PendingCard() {
  return (
    <div data-testimonial-pending className={`${cardClass} justify-between`}>
      <div aria-hidden className="flex flex-col gap-2.5">
        <span className="h-2.5 w-[92%] rounded-full bg-ink/[0.06]" />
        <span className="h-2.5 w-[80%] rounded-full bg-ink/[0.06]" />
        <span className="h-2.5 w-[86%] rounded-full bg-ink/[0.06]" />
        <span className="h-2.5 w-[55%] rounded-full bg-ink/[0.06]" />
      </div>
      <div className="mt-7 flex items-center gap-3 border-t border-field pt-4">
        <span aria-hidden className="size-9 shrink-0 rounded-full border border-field bg-surface" />
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Testimonio pendiente
        </span>
      </div>
    </div>
  );
}

function renderCard(card: Card) {
  return card.kind === "testimonial" ? <TestimonialCard item={card.item} /> : <PendingCard />;
}

/** Repite el grupo hasta alcanzar el mínimo, conservando el orden. */
function fillGroup(cards: Card[]): Card[] {
  if (cards.length === 0) return cards;
  const filled = [...cards];
  while (filled.length < MIN_CARDS_PER_GROUP) filled.push(...cards);
  return filled;
}

type MarqueeRowProps = {
  cards: Card[];
  reverse?: boolean;
  durationSeconds: number;
  label: string;
};

function MarqueeRow({ cards, reverse = false, durationSeconds, label }: MarqueeRowProps) {
  const group = fillGroup(cards);
  // Tarjetas repetidas solo para continuidad visual: ocultas a lectores de pantalla.
  const renderGroup = (copy: "a" | "b"): ReactNode =>
    group.map((card, index) => {
      const isRepeat = copy === "b" || index >= cards.length;
      const key = `${copy}-${index}-${card.kind === "testimonial" ? card.item.id : card.id}`;
      return (
        <li
          key={key}
          aria-hidden={isRepeat || undefined}
          className={`marquee-item ${copy === "b" ? "marquee-clone" : ""} ${
            copy === "a" && index >= cards.length ? "marquee-clone" : ""
          }`}
        >
          {renderCard(card)}
        </li>
      );
    });

  return (
    <div className="marquee-row" aria-label={label} role="region">
      <ul
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
      >
        {renderGroup("a")}
        {renderGroup("b")}
      </ul>
    </div>
  );
}

export function TestimonialsSection() {
  const { testimonials } = landingConfig;

  // Una sola fila: testimonios escritos reales (o espacios pendientes si la lista quedara vacía).
  const cards: Card[] =
    testimonials.items.length > 0
      ? testimonials.items.map((item) => ({ kind: "testimonial", item }))
      : Array.from({ length: testimonials.pendingSlots }, (_, i) => ({ kind: "pending", id: `pendiente-${i + 1}` }));

  return (
    <section aria-labelledby="testimonios-titulo" className="relative overflow-hidden bg-surface">

      <div className="mx-auto w-full max-w-[78rem] px-4 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <header className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <h2
            id="testimonios-titulo"
            className="text-balance text-[1.625rem] font-extrabold uppercase leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2rem] lg:text-[2.25rem]"
          >
            {testimonials.title}
          </h2>
          <p className="mt-5 max-w-[42rem] text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            {testimonials.subtitle}
          </p>
        </header>
      </div>

      <div className="mt-12 pb-16 lg:mt-14 lg:pb-20">
        <MarqueeRow cards={cards} durationSeconds={62} label="Testimonios de alumnos" />
      </div>
    </section>
  );
}
