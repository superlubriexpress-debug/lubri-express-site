import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/site-data";

const commitments = [
  "Diagnóstico antes da indicação do serviço",
  "Atendimento direto e explicação clara",
  "Aplicação conforme a especificação do veículo",
  "Estrutura para veículos nacionais e importados",
];

export function AboutSection() {
  return (
    <section id="sobre" className="overflow-hidden bg-neutral-50 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <FadeIn>
          <div className="relative grid grid-cols-2 gap-4">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-200">
              <Image src={assets.serviceDesk} alt="Área de atendimento da Lubri Express" fill sizes="(min-width: 1024px) 28vw, 48vw" className="object-cover" />
            </figure>
            <figure className="relative mt-10 aspect-[4/5] overflow-hidden rounded-lg bg-neutral-200">
              <Image src={assets.store} alt="Estrutura interna da oficina Lubri Express" fill sizes="(min-width: 1024px) 28vw, 48vw" className="object-cover" />
            </figure>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Badge>Conheça a Lubri Express</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Atendimento local com critério técnico e conversa direta.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            A Lubri Express Auto Center atende veículos leves em Itapetininga com foco em mecânica, elétrica automotiva e troca de óleos e fluidos. A missão é tornar a manutenção mais clara, organizada e segura para cada cliente.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {commitments.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-neutral-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {item}
              </div>
            ))}
          </div>
          <Button asChild variant="dark" className="mt-8">
            <Link href="/sobre">
              Conhecer a oficina
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
