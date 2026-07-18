import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MessageCircleMore } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServicePageData } from "@/lib/service-pages";
import { getPublicSiteSettings } from "@/lib/site-settings";

export async function ServiceDetailPage({ service }: { service: ServicePageData }) {
  const settings = await getPublicSiteSettings();

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={settings} />
      <main id="conteudo">
        <section className="relative isolate min-h-[620px] overflow-hidden bg-ink pt-28 text-white sm:min-h-[680px]">
          <Image src={service.image} alt={service.name} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,.94)_0%,rgba(0,0,0,.8)_48%,rgba(0,0,0,.25)_100%)]" />
          <div className="container-x flex min-h-[520px] items-center py-14 sm:min-h-[580px]">
            <div className="min-w-0 max-w-3xl">
              <Breadcrumbs light items={[{ label: "Início", href: "/" }, { label: "Serviços", href: "/#servicos" }, { label: service.name }]} />
              <Badge className="mt-8">Serviço automotivo em Itapetininga</Badge>
              <h1 className="h-display mt-5 break-words text-[2.35rem] leading-[1.04] sm:text-6xl lg:text-7xl">{service.name}</h1>
              <p className="mt-6 max-w-2xl break-words text-base leading-8 text-neutral-200 sm:text-xl">{service.shortDescription}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={`/?servico=${service.slug}#orcamento`}>
                    Solicitar atendimento
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href={`tel:+${settings.phoneHref}`}>Ligar para a oficina</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge>Como funciona</Badge>
              <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Avaliação técnica antes de qualquer intervenção.</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-neutral-600">{service.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex min-h-16 items-center gap-3 rounded-lg border border-border bg-neutral-50 p-4 font-bold">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-20 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-2">
            <div className="rounded-lg bg-ink p-7 text-white sm:p-10">
              <Clock3 className="h-10 w-10 text-accent" />
              <h2 className="h-display mt-6 text-3xl sm:text-4xl">Quando procurar o serviço</h2>
              <ul className="mt-7 grid gap-4">
                {service.whenToDo.map((item) => (
                  <li key={item} className="flex gap-3 leading-7 text-neutral-200">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Badge>FAQ do serviço</Badge>
              <h2 className="h-display mt-5 text-4xl">Dúvidas frequentes</h2>
              <Accordion type="single" collapsible className="mt-7 rounded-lg border border-border bg-white px-6">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`service-faq-${index}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-accent py-14 text-ink">
          <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em]">Próximo passo</p>
              <h2 className="h-display mt-2 text-3xl sm:text-4xl">Conte o sintoma e receba orientação da equipe.</h2>
            </div>
            <Button asChild variant="dark" size="lg" className="shrink-0">
              <Link href="/#orcamento">
                <MessageCircleMore className="h-5 w-5" />
                Montar solicitação
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
