import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { blogPosts, readingTime } from "@/lib/blog-posts";
import { breadcrumbSchema } from "@/lib/schema";
import { company } from "@/lib/site-data";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Cuidados automotivos e manutenção",
  description: "Conteúdos da Lubri Express sobre troca de óleo, câmbio automático, revisão preventiva e cuidados com o veículo.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Conteúdos Lubri Express", description: "Informação prática para cuidar melhor do seu veículo.", url: `${company.siteUrl}/blog`, type: "website" },
};

export default async function BlogPage() {
  const settings = await getPublicSiteSettings();
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={settings} />
      <main id="conteudo" className="pt-20">
        <section className="bg-ink py-20 text-white sm:py-28">
          <div className="container-x">
            <Breadcrumbs light items={[{ label: "Início", href: "/" }, { label: "Conteúdos" }]} />
            <Badge className="mt-8">Conteúdos</Badge>
            <h1 className="h-display mt-5 max-w-4xl text-5xl leading-tight sm:text-6xl">Informação prática para cuidar melhor do seu carro.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">Orientações gerais da Lubri Express. O diagnóstico do seu veículo continua sendo indispensável.</p>
          </div>
        </section>
        <section className="py-20 sm:py-28">
          <div className="container-x grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group overflow-hidden rounded-lg border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image src={post.image} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.12em] text-neutral-500">
                      <span>{post.category}</span>
                      <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {readingTime(post)} min</span>
                    </div>
                    <h2 className="h-display mt-4 text-2xl leading-tight">{post.title}</h2>
                    <p className="mt-3 leading-7 text-neutral-600">{post.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-bold">Ler artigo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <JsonLd id="blog-breadcrumb-schema" data={breadcrumbSchema([{ name: "Início", url: company.siteUrl }, { name: "Conteúdos", url: `${company.siteUrl}/blog` }])} />
    </div>
  );
}
