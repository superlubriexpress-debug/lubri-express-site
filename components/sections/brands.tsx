import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { brandLogos, brands } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type BrandsSectionProps = {
  display?: "names" | "logos";
};

const compactLogoNames = new Set(["Shell", "Petronas"]);

export function BrandsSection({ display = "names" }: BrandsSectionProps) {
  const nameLoop = [...brands, ...brands];
  const logoLoop = [...brandLogos, ...brandLogos];
  const brandNames = brandLogos.map((brand) => brand.name).join(", ");

  return (
    <section id="marcas" className="relative overflow-hidden bg-ink py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,196,0,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_45%)]" />
      <div className="container-x relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge>Marcas e linhas</Badge>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            Produtos reconhecidos, aplicados com criterio.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-8 text-neutral-300 md:text-right">
          Trabalhamos com linhas reconhecidas no mercado automotivo, respeitando a especificacao de cada veiculo.
        </p>
      </div>

      <p className="sr-only">Marcas: {brandNames}</p>

      {display === "logos" ? (
        <div className="relative mt-12" aria-hidden="true">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent md:w-36" />
          <div className="flex animate-marquee items-center gap-5 whitespace-nowrap py-2">
          {logoLoop.map((brand, index) => (
            <article
              key={`${brand.name}-${index}`}
              className="group flex h-32 w-48 shrink-0 flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-accent/55 hover:bg-white/[0.09]"
            >
              <div className="grid h-20 place-items-center rounded-2xl bg-white px-5 shadow-inner shadow-black/10">
                <Image
                  src={brand.logo}
                  alt=""
                  width={180}
                  height={72}
                  className={cn("max-h-12 w-auto max-w-[8.75rem] object-contain", compactLogoNames.has(brand.name) && "max-h-10 max-w-[5.5rem]")}
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-1">
                <span className="font-display text-sm font-bold text-white">{brand.name}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_rgba(255,196,0,0.85)]" />
              </div>
            </article>
          ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-12" aria-hidden="true">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent md:w-36" />
          <div className="flex animate-marquee gap-4 whitespace-nowrap py-2">
          {nameLoop.map((brand, index) => (
            <span key={`${brand}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-7 py-4 font-display text-lg font-bold text-white">
              {brand}
            </span>
          ))}
          </div>
        </div>
      )}
    </section>
  );
}
