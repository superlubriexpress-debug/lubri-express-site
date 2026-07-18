import { ArrowUpRight, ClipboardCheck, MessageSquareText, ShieldCheck, Star } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/site-settings-types";

const reviewSignals = [
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
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <FadeIn>
            <Badge>Avaliações do Google</Badge>
            <div className="mt-5 flex items-end gap-4">
              <strong className="h-display text-6xl leading-none">4.8</strong>
              <div className="pb-1">
                <div className="flex gap-1 text-accent" aria-label="4,8 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />)}
                </div>
                <p className="mt-1 text-sm font-semibold text-neutral-500">Nota informada para o perfil da oficina</p>
              </div>
            </div>
            <h2 className="h-display mt-6 text-4xl leading-tight sm:text-5xl">Confiança construída com atendimento claro.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
              A quantidade e os comentários mais recentes ficam no perfil oficial, evitando avaliações desatualizadas ou reproduzidas sem contexto.
            </p>
            <Button asChild variant="dark" className="mt-7">
              <a href={settings.mapsUrl} target="_blank" rel="noreferrer" data-analytics-event="google_profile_click" data-analytics-label="Avaliações - perfil Google">
                Ver todas as avaliações no Google
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-3">
            {reviewSignals.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <article className="h-full rounded-lg border border-border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-ink">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-neutral-600">{item.text}</p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
