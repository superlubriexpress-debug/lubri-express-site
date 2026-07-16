import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { brandLogos, brands } from "@/lib/site-data";

type BrandsSectionProps = {
  display?: "names" | "logos";
};

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
          <div className="flex animate-marquee items-center gap-4 whitespace-nowrap py-2">
            {logoLoop.map((brand, index) => {
              const isMotul = brand.name === "Motul";

              return (
                <article
                  key={`${brand.name}-${index}`}
                  className="flex h-[92px] w-[170px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-5 shadow-[0_22px_55px_-36px_rgba(255,255,255,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_-38px_rgba(255,196,0,0.7)]"
                >
                  <div
                    className={
                      isMotul
                        ? "flex aspect-[219.5/60] w-full items-center justify-center bg-[#ed252f]"
                        : "flex h-full w-full items-center justify-center"
                    }
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={isMotul ? 220 : 150}
                      height={isMotul ? 60 : 70}
                      quality={100}
                      loading="lazy"
                      className={
                        isMotul
                          ? "h-full w-full object-contain brightness-0 invert"
                          : "max-h-[70%] max-w-[85%] object-contain"
                      }
                    />
                  </div>
                </article>
              );
            })}
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
