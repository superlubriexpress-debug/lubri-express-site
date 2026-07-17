import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { BookingButton } from "@/components/booking/booking-button";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge>Serviços</Badge>
            <h2 className="h-display mt-5 max-w-3xl text-4xl leading-tight sm:text-5xl">
              Cuidado completo, organizado por especialidade.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600 lg:justify-self-end">
            Da manutenção preventiva ao diagnóstico eletrônico, a equipe avalia o veículo e orienta o serviço correto antes da execução.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {serviceCategories.map((category, index) => {
            const Icon = category.icon;
            const isLast = index === serviceCategories.length - 1;

            return (
              <FadeIn key={category.id} delay={Math.min(index * 0.05, 0.2)} className={isLast ? "lg:col-span-2" : undefined}>
                <article className={`group h-full overflow-hidden rounded-lg border border-border bg-neutral-50 transition duration-300 hover:border-accent hover:bg-white hover:shadow-premium ${isLast ? "lg:grid lg:grid-cols-[0.72fr_1.28fr]" : ""}`}>
                  <div className={`relative overflow-hidden bg-ink ${isLast ? "min-h-52 lg:min-h-full" : "h-48"}`}>
                    {category.img ? (
                      <Image
                        src={category.img}
                        alt={category.title}
                        fill
                        sizes={isLast ? "(min-width: 1024px) 35vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#171717,#050505)] text-accent">
                        <Icon className="h-16 w-16" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-lg bg-accent text-ink shadow-glow">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <h3 className="h-display text-2xl leading-tight sm:text-3xl">{category.title}</h3>
                    <p className="mt-3 leading-7 text-neutral-600">{category.desc}</p>

                    <ul className={`mt-6 grid gap-3 ${isLast ? "sm:grid-cols-2" : ""}`}>
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-neutral-700">
                          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-ink">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <BookingButton serviceId={category.serviceId} variant="outline" className="mt-7 w-full sm:w-fit">
                      Solicitar atendimento
                    </BookingButton>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="h-display text-2xl">Não sabe qual serviço selecionar?</h3>
            <p className="mt-2 text-neutral-600">Conte os sintomas do carro e a equipe orienta o próximo passo.</p>
          </div>
          <Button asChild variant="dark" className="sm:shrink-0">
            <a href="#orcamento">
              Descrever o problema
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
