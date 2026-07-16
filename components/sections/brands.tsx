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
    <section className="overflow-hidden bg-ink py-16 text-white">
      <div className="container-x">
        <Badge>Marcas e linhas</Badge>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-300">
          Trabalhamos com produtos e linhas reconhecidas no mercado automotivo, respeitando a especificacao de cada veiculo.
        </p>
      </div>

      <p className="sr-only">Marcas: {brandNames}</p>

      {display === "logos" ? (
        <div className="mt-10 flex animate-marquee items-center gap-4 whitespace-nowrap" aria-hidden="true">
          {logoLoop.map((brand, index) => (
            <span
              key={`${brand.name}-${index}`}
              className="grid h-24 w-52 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white px-6 shadow-[0_20px_55px_-32px_rgba(255,255,255,0.45)]"
            >
              <Image src={brand.logo} alt="" width={180} height={72} className="max-h-16 w-auto object-contain" />
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex animate-marquee gap-4 whitespace-nowrap" aria-hidden="true">
          {nameLoop.map((brand, index) => (
            <span key={`${brand}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-7 py-4 font-display text-lg font-bold text-white">
              {brand}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
