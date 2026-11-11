import { ExpertProfile } from "./ExpertProfile";
import { HeroHeading } from "./HeroHeading";
import { LeadForm } from "./LeadForm";
import { TrainingSchedule } from "./TrainingSchedule";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Iluminación ambiental muy sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60%_55%_at_50%_0%,rgba(23,100,255,0.13),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-electric-bright/50 to-transparent"
      />

      <div className="mx-auto w-full max-w-[78rem] px-4 pb-14 pt-9 sm:px-8 sm:pt-12 lg:px-10 lg:pb-16 lg:pt-10 short:pt-5 tiny:pt-3">
        <HeroHeading />

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-10 sm:mt-10 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20 short:mt-4 tiny:mt-3">
          <ExpertProfile />
          <div className="order-first mx-auto w-full max-w-[32rem] lg:order-none lg:max-w-[30rem] lg:justify-self-start xl:max-w-[31rem]">
            <LeadForm />
          </div>
        </div>

        <TrainingSchedule />
      </div>
    </section>
  );
}
