import { landingConfig } from "@/config/landing";

export function HeroHeading() {
  const { program, hero } = landingConfig;

  return (
    <header className="mx-auto flex max-w-[74rem] flex-col items-center text-center">
      <p className="reveal reveal-1 mb-4 inline-flex short:mb-3 tiny:mb-2.5 items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-muted sm:text-xs sm:tracking-[0.28em]">
        <span aria-hidden className="hidden h-px w-10 bg-electric/70 sm:block" />
        <span>
          <span className="hidden md:inline">
            {program.eyebrow} <span className="text-white/30">·</span>{" "}
          </span>
          <span className="text-white">{program.name}</span>
        </span>
        <span aria-hidden className="hidden h-px w-10 bg-electric/70 sm:block" />
      </p>

      <h1 className="reveal reveal-2 text-balance text-[1.625rem] font-extrabold uppercase leading-[1.08] tracking-[-0.015em] text-white min-[400px]:text-[2rem] sm:text-[2.375rem] lg:text-[2.375rem] lg:leading-[1.05] xl:text-[2.625rem] short:text-[2.125rem] short:xl:text-[2.25rem] tiny:text-[1.875rem] tiny:xl:text-[2rem]">
        {hero.headline}{" "}
        <span className="block text-electric">{hero.headlineAccent}</span>
      </h1>

      <p className="reveal reveal-3 mt-4 max-w-[44rem] text-pretty text-base leading-relaxed text-muted sm:text-lg lg:mt-4 lg:leading-[1.6] short:mt-3 short:text-[1.0625rem] tiny:mt-2.5 tiny:text-base tiny:leading-normal">
        {hero.subheadline}
      </p>
    </header>
  );
}
