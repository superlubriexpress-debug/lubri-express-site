import { ArrowUpRight, ClipboardCheck, MessageSquareText, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/site-settings-types";

const commitments = [
  {
    icon: ClipboardCheck,
    title: "Avaliação antes da execução",
    text: "O serviço é orientado conforme o veículo e o diagnóstico apresentado.",
  },
  {
    icon: MessageSquareText,
    title: "Explicação sem complicação",
    text: "Você entende o que precisa ser feito antes de autorizar o atendimento.",
  },
  {
    icon: ShieldCheck,
    title: "Peças e fluidos especificados",
    text: "A aplicação respeita a necessidade técnica de cada veículo.",
  },
];

export function TestimonialsSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="avaliacoes" className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <Badge>Confiança</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Transparência em cada etapa do atendimento.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
            Em vez de promessas genéricas, a Lubri Express trabalha com avaliação, orientação e aprovação antes do serviço.
          </p>
          <Button asChild variant="dark" className="mt-7">
            <a href={settings.mapsUrl} target="_blank" rel="noreferrer">
              Ver perfil no Google
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {commitments.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:items-start">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-ink">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-neutral-600">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
