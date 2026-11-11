import Image from "next/image";
import { landingConfig, type LearningClass } from "@/config/landing";
import { ScrollToFormLink } from "./ScrollToFormLink";

function ClassCard({ item }: { item: LearningClass }) {
  const label = `Clase ${item.number}`;

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-field bg-white shadow-[0_1px_2px_rgba(11,13,20,0.05)]">
      <div className="border-b border-field">
        <Image
          src={item.cover.src}
          width={item.cover.width}
          height={item.cover.height}
          alt={`Portada de la ${label.toLowerCase()}: ${item.name}, ${item.date}`}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 640px, 100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.24em] text-electric">{label}</p>
        <h3 className="mt-2 text-xl font-extrabold uppercase leading-tight tracking-[-0.01em] text-ink sm:text-[1.375rem]">
          {item.name}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{item.description}</p>

        <p className="mt-auto pt-6">
          <span className="block border-t border-field pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {label} <span className="text-ink/25">|</span> {item.date}
          </span>
        </p>
      </div>
    </li>
  );
}

export function LearningSection() {
  const { learning, form } = landingConfig;

  return (
    <section aria-labelledby="aprenderas-titulo" className="relative bg-surface">
      <div className="mx-auto w-full max-w-[78rem] px-4 py-16 sm:px-8 lg:px-10 lg:py-20">
        <header className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <h2
            id="aprenderas-titulo"
            className="text-balance text-[1.625rem] font-extrabold uppercase leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2rem] lg:text-[2.25rem]"
          >
            {learning.title}
          </h2>
          <p className="mt-5 max-w-[42rem] text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            {learning.subtitle}
          </p>
        </header>

        <ul className="mx-auto mt-12 grid max-w-[40rem] grid-cols-[minmax(0,1fr)] gap-6 lg:mt-14 lg:max-w-none lg:grid-cols-3 lg:gap-7">
          {learning.classes.map((item) => (
            <ClassCard key={item.number} item={item} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center lg:mt-14">
          <ScrollToFormLink
            targetId={form.anchorId}
            className="btn-primary inline-flex h-14 items-center justify-center whitespace-nowrap rounded-xl bg-electric px-7 text-[0.875rem] font-bold uppercase tracking-[0.04em] text-white sm:px-9 sm:text-[0.9375rem]"
          >
            {learning.ctaLabel}
          </ScrollToFormLink>
        </div>
      </div>
    </section>
  );
}
