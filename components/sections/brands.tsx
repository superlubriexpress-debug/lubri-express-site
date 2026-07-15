import { Badge } from "@/components/ui/badge";
import { brands } from "@/lib/site-data";

export function BrandsSection() {
  const loop = [...brands, ...brands];

  return (
    <section className="overflow-hidden bg-ink py-16 text-white">
      <div className="container-x">
        <Badge>Marcas e linhas</Badge>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-300">
          Trabalhamos com produtos e linhas reconhecidas no mercado automotivo, respeitando a especificação de cada veículo.
        </p>
      </div>
      <div className="mt-10 flex animate-marquee gap-4 whitespace-nowrap" aria-hidden="true">
        {loop.map((brand, index) => (
          <span key={`${brand}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-7 py-4 font-display text-lg font-bold text-white">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
