import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons";
import { assets, company, navItems, socialLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer id="rodape" className="relative border-t border-accent/30 bg-[#080808] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-[1.25fr_0.7fr_0.9fr_1.15fr] xl:gap-12">
          <div>
            <div className="flex items-center gap-4">
              <Image src={assets.logo} alt="" width={56} height={56} className="h-12 w-12 object-contain" />
              <div>
                <h2 className="font-display text-xl font-bold">{company.name}</h2>
                <p className="mt-1 text-xs font-black uppercase tracking-normal text-accent">Itapetininga - SP</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-neutral-400">{company.tagline}</p>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex max-w-md items-start gap-3 text-sm leading-6 text-neutral-400 transition hover:text-white"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {company.address}
            </a>
          </div>

          <nav aria-label="Links do rodapé">
            <h3 className="font-display text-sm font-bold uppercase tracking-normal text-neutral-500">Navegação</h3>
            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="w-fit text-sm font-semibold text-neutral-300 transition hover:translate-x-1 hover:text-accent">
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-normal text-neutral-500">Atendimento</h3>
            <div className="mt-5 grid gap-4">
              <p className="flex items-start gap-3 text-sm font-semibold leading-6 text-neutral-300">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {company.hours}
              </p>
              <a
                href={`tel:+${company.phoneHref}`}
                className="flex items-center gap-3 text-sm font-semibold text-neutral-300 transition hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {company.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-normal text-neutral-500">Fale com a equipe</h3>
            <p className="mt-5 text-sm leading-6 text-neutral-400">Envie os dados do veículo e receba orientação para o próximo passo.</p>
            <a
              href={`https://wa.me/${company.phoneHref}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Falar com a Lubri Express pelo WhatsApp"
              className="footer-whatsapp group relative mt-5 flex min-h-16 items-center gap-3 overflow-hidden rounded-xl bg-accent px-4 text-ink shadow-glow transition hover:-translate-y-1 hover:bg-[#ffd43b]"
            >
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-black/10">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span className="relative z-10 min-w-0 flex-1 leading-tight">
                <strong className="block font-display text-sm">Conversar no WhatsApp</strong>
                <span className="mt-1 block text-xs font-semibold text-ink/70">Atendimento da oficina</span>
              </span>
              <ArrowUpRight className="relative z-10 h-5 w-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={`grid h-10 w-10 place-items-center rounded-full border transition duration-300 hover:-translate-y-1 hover:scale-105 ${item.className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Lubri Express Auto Center © 2026. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] font-black uppercase tracking-normal text-neutral-500">Desenvolvido por</span>
            <Image src={assets.signature} alt="Gean Maikon" width={132} height={23} className="h-6 w-auto max-w-[132px] object-contain opacity-90" />
          </div>
        </div>
      </div>
    </footer>
  );
}
