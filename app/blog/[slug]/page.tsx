import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, Facebook, Link2 } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPostBySlug, blogPosts, readingTime } from "@/lib/blog-posts";
import { blogPostSchema, breadcrumbSchema } from "@/lib/schema";
import { company } from "@/lib/site-data";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const dynamicParams = false;
export const generateStaticParams = () => blogPosts.map((post) => ({ slug: post.slug }));

type BlogPostRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug.get(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${company.siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = blogPostBySlug.get(slug);
  if (!post) notFound();
  const settings = await getPublicSiteSettings();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const postUrl = `${company.siteUrl}/blog/${post.slug}`;
  const crumbs = [
    { name: "Início", url: company.siteUrl },
    { name: "Conteúdos", url: `${company.siteUrl}/blog` },
    { name: post.title, url: postUrl },
  ];

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={settings} />
      <main id="conteudo" className="pt-20">
        <article>
          <header className="bg-ink py-16 text-white sm:py-24">
            <div className="container-x max-w-5xl">
              <Breadcrumbs light items={[{ label: "Início", href: "/" }, { label: "Conteúdos", href: "/blog" }, { label: post.title }]} />
              <Badge className="mt-8">{post.category}</Badge>
              <h1 className="h-display mt-5 text-5xl leading-tight sm:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-400">
                <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> {readingTime(post)} minutos de leitura</span>
                <time dateTime={post.publishedAt}>Atualizado em 18 de julho de 2026</time>
              </div>
            </div>
          </header>

          <div className="container-x max-w-5xl py-12 sm:py-16">
            <figure className="relative aspect-video overflow-hidden rounded-lg bg-neutral-100">
              <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
            </figure>
            <div className="mx-auto mt-12 max-w-3xl">
              {post.content.map((section) => (
                <section key={section.heading} className="mb-10">
                  <h2 className="h-display text-3xl leading-tight sm:text-4xl">{section.heading}</h2>
                  <div className="mt-5 grid gap-5 text-lg leading-8 text-neutral-700">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
              <aside className="mt-12 rounded-lg bg-accent p-7 sm:p-9">
                <h2 className="h-display text-3xl">Seu veículo apresenta algum desses sinais?</h2>
                <p className="mt-3 leading-7 text-black/70">Use o formulário para organizar veículo, sintomas e serviço antes de falar com a equipe.</p>
                <Button asChild variant="dark" className="mt-6"><Link href="/#orcamento">Solicitar atendimento <ArrowRight className="h-4 w-4" /></Link></Button>
              </aside>
              <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-border py-5">
                <span className="text-sm font-black uppercase tracking-[0.12em] text-neutral-500">Compartilhar</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noreferrer" aria-label="Compartilhar no Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:border-accent hover:bg-accent"><Facebook className="h-4 w-4" /></a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`} target="_blank" rel="noreferrer" aria-label="Compartilhar pelo WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:border-accent hover:bg-accent"><Link2 className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-neutral-50 py-16">
          <div className="container-x max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="h-display text-3xl">Artigos relacionados</h2>
              <Link href="/blog" className="inline-flex items-center gap-2 font-bold hover:text-neutral-600"><ArrowLeft className="h-4 w-4" /> Ver todos</Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-lg border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-neutral-500">{item.category}</span>
                  <h3 className="h-display mt-3 text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-neutral-600">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <JsonLd id="blog-post-schema" data={blogPostSchema(post)} />
      <JsonLd id="blog-post-breadcrumb-schema" data={breadcrumbSchema(crumbs)} />
    </div>
  );
}
