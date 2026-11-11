import { landingConfig } from "@/config/landing";

export function TrainingSchedule() {
  const { schedule } = landingConfig;
  const items = [schedule.dates, schedule.time, schedule.format];

  return (
    <div className="reveal reveal-6 mx-auto mt-14 w-full max-w-[60rem] lg:mt-16">
      <ul className="flex flex-col items-center gap-3 border-t border-line pt-7 text-center lg:flex-row lg:justify-center lg:gap-0">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-center text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white sm:text-[0.8125rem]"
          >
            {index > 0 && <span aria-hidden className="mx-6 hidden size-1 rounded-full bg-electric-bright lg:inline-block" />}
            <span className={index === 0 ? "text-white" : "text-muted"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
