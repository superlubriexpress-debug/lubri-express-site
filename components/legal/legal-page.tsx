import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { getPublicSiteSettings } from "@/lib/site-settings";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
  updatedAt: string;
};

export async function LegalPage({ title, description, sections, updatedAt }: LegalPageProps) {
  const settings = await getPublicSiteSettings();

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={settings} />
      <main id="conteudo" className="pt-20">
        <section className="border-b border-black/10 bg-ink text-white">
          <div className="container-x py-16 sm:py-20">
            <nav aria-label="Breadcrumb" className="text-sm font-semibold text-white/60">
              <Link href="/" className="transition hover:text-accent">
                Início
              </Link>
              <span className="mx-2 text-white/30">/</span>
              <span className="text-accent">{title}</span>
            </nav>
            <div className="mt-8 max-w-3xl">
              <p className="eyebrow-inv text-accent">Informações institucionais</p>
              <h1 className="h-display mt-4 text-4xl leading-tight text-white sm:text-5xl">{title}</h1>
              <p className="mt-5 text-lg leading-8 text-neutral-300">{description}</p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container-x py-14 sm:py-16">
            <article className="mx-auto max-w-3xl rounded-xl border border-black/10 bg-white p-6 shadow-sm sm:p-10">
              <div className="grid gap-10">
                {sections.map((section, index) => (
                  <section key={section.title} aria-labelledby={`legal-section-${index}`} className="grid gap-4">
                    <h2 id={`legal-section-${index}`} className="font-display text-2xl font-black tracking-tight text-ink">
                      {section.title}
                    </h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-neutral-700">
                        {paragraph}
                      </p>
                    ))}
                    {section.items && (
                      <ul className="grid gap-2 pl-5 text-base leading-8 text-neutral-700">
                        {section.items.map((item) => (
                          <li key={item} className="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <p className="mt-12 border-t border-black/10 pt-6 text-sm font-semibold text-neutral-500">
                Última atualização: {updatedAt}.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
