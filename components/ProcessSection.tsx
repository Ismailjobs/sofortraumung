import { PROCESS_STEPS } from "@/lib/data";

export default function ProcessSection() {
  return (
    <section id="prozess" className="bg-navy py-16 lg:py-20">
      <div className="site-container">
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-tight text-lime sm:text-3xl">
          Unser 4-Schritte Wow-Prozess
        </h2>

        <div className="relative mt-12 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-3 lg:pl-10">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative flex flex-1 items-stretch">
                {index === 0 ? (
                  <div
                    className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-0.5 lg:flex"
                    aria-hidden="true"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy">
                      1
                    </span>
                    <span className="text-2xl font-extrabold leading-none text-lime">→</span>
                  </div>
                ) : null}

                <article className="flex w-full flex-col rounded-xl border border-white/20 bg-transparent p-5 text-center sm:p-6">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </article>

                {index < PROCESS_STEPS.length - 1 ? (
                  <div
                    className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-0.5 lg:flex"
                    aria-hidden="true"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-navy">
                      {step.id + 1}
                    </span>
                    <span className="text-2xl font-extrabold leading-none text-lime">→</span>
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="mx-auto mt-4 flex shrink-0 items-center justify-center lg:mt-0 lg:ml-2">
            <div className="flex h-28 w-28 rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-double border-lime bg-navy-light p-3 text-center shadow-lg">
              <span className="text-sm font-extrabold uppercase leading-tight tracking-tight text-lime">
                Wow!
              </span>
              <span className="mt-0.5 text-[10px] font-bold uppercase leading-tight text-white">
                Zusagen halten wir!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
