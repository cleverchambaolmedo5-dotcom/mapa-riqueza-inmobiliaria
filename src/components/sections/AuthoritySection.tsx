import Image from "next/image";
import { landingConfig } from "@/config/landing";
import { ScrollToFormLink } from "./ScrollToFormLink";

export function AuthoritySection() {
  const { authority, form } = landingConfig;
  const { closing } = authority;

  return (
    <section aria-labelledby="instructor-titulo" className="relative isolate overflow-hidden bg-night">
      {/* Iluminación ambiental muy sutil, coherente con el Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(55%_50%_at_30%_10%,rgba(23,100,255,0.10),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-[78rem] px-4 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Retrato de estudio original, sin filtros: se enmarca y se funde con el fondo en la base */}
          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[25rem]">
            {/* Luz azul muy discreta detrás del retrato */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 top-[8%] bottom-[18%] -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(23,100,255,0.32),rgba(18,59,154,0.12)_65%,transparent)] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 [mask-image:linear-gradient(to_bottom,#000_70%,rgba(0,0,0,0.6)_86%,transparent_100%)]">
              <Image
                src={authority.photo.src}
                width={authority.photo.width}
                height={authority.photo.height}
                alt={authority.photo.alt}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 352px, 304px"
                className="block h-auto w-full object-contain object-top"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-muted sm:text-xs">
              <span aria-hidden className="h-px w-8 bg-electric/70" />
              {authority.eyebrow}
            </p>
            <h2
              id="instructor-titulo"
              className="mt-5 text-balance text-[1.5rem] font-extrabold uppercase leading-[1.12] tracking-[-0.015em] text-white sm:text-[1.875rem] xl:text-[2.125rem]"
            >
              {authority.title} <span className="text-electric-bright">{authority.titleAccent}</span>
            </h2>
            <div className="mx-auto mt-6 flex max-w-[40rem] flex-col gap-4 text-pretty text-base leading-relaxed text-muted sm:text-[1.0625rem] lg:mx-0">
              {authority.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Cifras de autoridad */}
        <dl className="mt-12 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-line sm:grid-cols-3 lg:mt-14">
          {authority.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center gap-1.5 bg-white/[0.02] px-5 py-7 text-center sm:py-9 ${
                index > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""
              }`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[1.625rem] font-extrabold uppercase leading-none tracking-[-0.01em] text-white sm:text-[1.5rem] lg:text-[2rem]">
                {stat.value}
              </dd>
              <dd className="text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:text-[0.8125rem]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Cierre con CTA hacia el formulario del Hero */}
      <div className="mx-auto w-full max-w-[78rem] px-4 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center border-t border-line pt-14 text-center lg:pt-16">
          <h2 className="text-balance text-[1.375rem] font-extrabold uppercase leading-[1.15] tracking-[-0.01em] text-white sm:text-[1.75rem]">
            {closing.title}
          </h2>
          <p className="mt-4 max-w-[34rem] text-pretty text-base leading-relaxed text-muted sm:text-lg">{closing.text}</p>
          <ScrollToFormLink
            targetId={form.anchorId}
            className="btn-primary mt-9 inline-flex h-14 items-center justify-center whitespace-nowrap rounded-xl bg-electric px-7 text-[0.875rem] font-bold uppercase tracking-[0.04em] text-white sm:px-9 sm:text-[0.9375rem]"
          >
            {closing.ctaLabel}
          </ScrollToFormLink>
        </div>
      </div>
    </section>
  );
}
