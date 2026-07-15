import { Badge } from "@/components/ui/badge";
import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  return (
    <section id="como-funciona" className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>Como funciona</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Atendimento direto, sem complicar sua rotina.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            O site foi pensado para transformar interesse em conversa rápida no WhatsApp, com as informações que a oficina precisa para te atender bem.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-lg border border-border bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-5xl font-bold text-neutral-100">0{index + 1}</span>
                </div>
                <h3 className="h-display mt-7 text-2xl">{step.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
