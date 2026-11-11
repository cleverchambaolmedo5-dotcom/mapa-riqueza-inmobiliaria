import Image from "next/image";
import { landingConfig } from "@/config/landing";

function PhotoPlaceholder() {
  return (
    <div className="flex aspect-[4/5] w-full max-w-[24rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-white/[0.02] text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Fotografía pendiente</span>
      <span className="text-sm text-white/40">public/images/clever-chamba.png</span>
    </div>
  );
}

export function ExpertProfile() {
  const { expert } = landingConfig;

  return (
    <div className="reveal reveal-4 flex flex-col items-center">
      <div className="relative flex w-full justify-center">
        {/* Halo azul sutil detrás del experto */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,100,255,0.30),rgba(23,100,255,0.08)_60%,transparent)] blur-2xl"
        />

        {expert.photo ? (
          <Image
            src={expert.photo.src}
            width={expert.photo.width}
            height={expert.photo.height}
            alt={expert.photo.alt}
            preload
            sizes="(min-width: 1280px) 336px, (min-width: 1024px) 320px, (min-width: 640px) 352px, 288px"
            className="expert-photo relative h-auto w-[18rem] object-contain sm:w-[22rem] lg:w-[20rem] xl:w-[21rem] short:w-[15rem] short:xl:w-[15.5rem] tiny:w-[13.5rem] tiny:xl:w-[13.5rem]"
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>

      <div className="relative -mt-14 flex w-full flex-col items-center text-center sm:-mt-16">
        <h2 className="text-2xl font-extrabold uppercase tracking-[0.08em] text-white sm:text-[1.75rem]">
          {expert.name}
        </h2>
        <p className="mt-1.5 max-w-[22rem] text-balance text-sm leading-snug text-muted sm:max-w-none sm:text-[0.9375rem]">
          {expert.role}
        </p>

        <dl className="mt-5 grid w-full max-w-[30rem] grid-cols-3 border-y border-line short:mt-4">
          {expert.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 px-2 py-4 lg:py-3.5 short:py-3 ${index > 0 ? "border-l border-line" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{stat.value}</dd>
              <dd className="text-[0.6875rem] leading-tight text-muted sm:text-xs">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
