import Image from "next/image";

import { assets, company, navItems, socialLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:items-start">
          <div className="flex items-start gap-4">
            <Image src={assets.logo} alt="" width={56} height={56} className="h-12 w-12 object-contain" />
            <div>
              <h2 className="font-display text-xl font-bold">{company.name}</h2>
              <p className="mt-1 text-sm text-neutral-400">{company.tagline}</p>
              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-500">{company.address}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 lg:justify-center" aria-label="Links do rodapé">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-neutral-300 transition hover:border-accent hover:text-accent">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="grid gap-3 lg:justify-end">
            <a href={`https://wa.me/${company.phoneHref}`} className="font-display text-lg font-bold text-accent">
              {company.phoneDisplay}
            </a>
            <p className="text-sm font-bold text-neutral-300">{company.city}</p>
            <div className="flex gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:border-accent hover:bg-accent hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-neutral-500 lg:flex-row lg:items-center lg:justify-between">
          <p>Lubri Express Auto Center © 2026. Atendimento ativo pelo WhatsApp.</p>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">Desenvolvido por</span>
            <Image src={assets.signature} alt="Gean Maikon" width={150} height={38} className="h-7 w-auto object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
