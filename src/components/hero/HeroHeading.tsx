import { landingConfig } from "@/config/landing";

export function HeroHeading() {
  const { hero } = landingConfig;

  return (
    <header className="mx-auto flex max-w-[74rem] flex-col items-center text-center">
      <h1 className="reveal reveal-1 max-w-[62rem] text-balance text-[1.75rem] font-extrabold uppercase leading-[1.08] tracking-[-0.015em] text-white min-[400px]:text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] lg:leading-[1.04] xl:text-[3rem] short:text-[2.25rem] short:xl:text-[2.375rem] tiny:text-[2rem] tiny:xl:text-[2.125rem]">
        {hero.headline}{" "}
        <span className="block text-electric">{hero.headlineAccent}</span>
      </h1>

      <p className="reveal reveal-2 mt-4 max-w-[44rem] text-pretty text-base leading-relaxed text-muted sm:text-lg lg:mt-4 lg:leading-[1.6] short:mt-3 short:text-[1.0625rem] tiny:mt-2.5 tiny:text-base tiny:leading-normal">
        {hero.subheadline}
      </p>
    </header>
  );
}
