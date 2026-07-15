import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { BookingButton } from "@/components/booking/booking-button";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <Badge>Serviços</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Serviços completos para cuidar do seu carro com qualidade e confiança.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            Escolha o atendimento e solicite um orçamento direto pelo WhatsApp da Lubri Express.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={Math.min(index * 0.03, 0.18)}>
                <article className="card-service group h-full">
                  {service.img && (
                    <div className="relative h-48 overflow-hidden">
                      <Image src={service.img} alt={service.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-ink">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="h-display mt-5 text-2xl leading-tight">{service.title}</h3>
                    <p className="mt-3 min-h-20 leading-7 text-neutral-600">{service.desc}</p>
                    <BookingButton serviceId={service.id} variant="outline" className="mt-6 w-full">
                      Pedir orçamento
                    </BookingButton>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-neutral-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h3 className="h-display text-2xl">Não sabe exatamente qual serviço precisa?</h3>
            <p className="mt-2 text-neutral-600">Envie uma mensagem com os sintomas do carro e a equipe orienta o melhor caminho.</p>
          </div>
          <Button asChild variant="dark" className="mt-5 sm:mt-0">
            <a href="#orcamento">
              Montar mensagem
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
