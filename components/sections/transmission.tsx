import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { BookingButton } from "@/components/booking/booking-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/site-data";

const highlights = [
  "Troca com máquina especializada",
  "Diagnóstico antes da execução",
  "Procedimento indicado para nacionais e importados",
  "Orientação sobre fluido e manutenção preventiva",
];

export function TransmissionSection() {
  return (
    <section id="cambio" className="overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10">
          <Image src={assets.transmission} alt="Troca de óleo do câmbio automático com máquina" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-black/55 p-5 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Especialidade Lubri Express</p>
            <p className="mt-2 text-sm leading-6 text-neutral-200">Serviço técnico para preservar funcionamento, conforto e vida útil do câmbio.</p>
          </div>
        </div>

        <div>
          <Badge>Câmbio automático</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Troca de óleo do câmbio automático com máquina.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-300">
            Um dos serviços mais importantes para quem quer evitar trancos, desgaste prematuro e reparos caros. A Lubri Express faz a avaliação e orienta o melhor procedimento para o seu veículo.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingButton serviceId="cambio-automatico">Agendar avaliação</BookingButton>
            <Button asChild variant="secondary">
              <a href="#faq">
                Tirar dúvidas
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
