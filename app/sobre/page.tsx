import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, ShieldCheck, Target } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema } from "@/lib/schema";
import { assets, company } from "@/lib/site-data";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Sobre a Lubri Express Auto Center",
  description: "Conheça a Lubri Express Auto Center, sua estrutura, valores e atendimento automotivo em Itapetininga - SP.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre a Lubri Express Auto Center",
    description: "Estrutura, valores e atendimento automotivo em Itapetininga - SP.",
    url: `${company.siteUrl}/sobre`,
    images: [{ url: assets.store, alt: "Estrutura da Lubri Express Auto Center" }],
  },
};

const values = [
  { icon: Target, title: "Diagnóstico objetivo", text: "Entender a causa antes de indicar o serviço." },
  { icon: Eye, title: "Transparência", text: "Explicar prioridades e próximos passos com clareza." },
  { icon: ShieldCheck, title: "Critério técnico", text: "Respeitar a especificação de cada veículo." },
  { icon: HeartHandshake, title: "Atendimento próximo", text: "Receber o cliente com comunicação direta e responsável." },
];

export default async function AboutPage() {
  const settings = await getPublicSiteSettings();
  const crumbs = [
    { name: "Início", url: company.siteUrl },
    { name: "Sobre", url: `${company.siteUrl}/sobre` },
  ];

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={settings} />
      <main id="conteudo" className="pt-20">
        <section className="bg-ink py-20 text-white sm:py-28">
          <div className="container-x">
            <Breadcrumbs light items={[{ label: "Início", href: "/" }, { label: "Sobre" }]} />
            <Badge className="mt-8">Lubri Express Auto Center</Badge>
            <h1 className="h-display mt-5 max-w-5xl text-5xl leading-tight sm:text-6xl lg:text-7xl">Manutenção automotiva com clareza, estrutura e atendimento local.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">
              Uma oficina em Itapetininga preparada para cuidar de veículos leves com serviços de mecânica, elétrica automotiva, diagnóstico e troca de óleos e fluidos.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge>Nossa história</Badge>
              <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Uma oficina construída para resolver sem complicação.</h2>
              <div className="mt-6 grid gap-5 text-lg leading-8 text-neutral-600">
                <p>A Lubri Express consolidou sua atuação em Itapetininga reunindo troca de óleo, revisão, diagnóstico, mecânica e elétrica em um único atendimento.</p>
                <p>O compromisso diário é avaliar primeiro, explicar com objetividade e executar somente o que foi orientado e aprovado.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
                <Image src={assets.hero} alt="Área de serviço da Lubri Express" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" priority />
              </figure>
              <figure className="relative mt-10 aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
                <Image src={assets.store} alt="Área interna da Lubri Express" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-20 sm:py-28">
          <div className="container-x">
            <div className="max-w-3xl">
              <Badge>Valores</Badge>
              <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">O padrão que orienta cada atendimento.</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="rounded-lg border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-5 font-display text-xl font-bold">{value.title}</h3>
                    <p className="mt-3 leading-7 text-neutral-600">{value.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <figure className="relative aspect-video overflow-hidden rounded-lg bg-neutral-100">
              <Image src={assets.front} alt="Fachada da Lubri Express Auto Center em Itapetininga" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </figure>
            <div className="rounded-lg bg-ink p-8 text-white sm:p-10">
              <Badge>Estrutura</Badge>
              <h2 className="h-display mt-5 text-4xl">Conheça a oficina de perto.</h2>
              <p className="mt-5 leading-7 text-neutral-300">Estamos na {settings.address}. Abra a rota ou envie os dados do veículo para organizar o atendimento.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild><Link href="/#orcamento">Solicitar atendimento <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild variant="secondary"><a href={settings.mapsUrl} target="_blank" rel="noreferrer">Como chegar</a></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <JsonLd id="about-breadcrumb-schema" data={breadcrumbSchema(crumbs)} />
    </div>
  );
}
