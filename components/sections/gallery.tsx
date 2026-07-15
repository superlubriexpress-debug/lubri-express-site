import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { gallery } from "@/lib/site-data";

export function GallerySection() {
  return (
    <section id="oficina" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <Badge>Oficina</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Um espaço preparado para receber seu carro.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Imagens reais da Lubri Express para você conhecer a estrutura antes de agendar.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-4">
          {gallery.map((item) => (
            <figure key={item.label} className={cn("group relative overflow-hidden rounded-lg bg-neutral-100", item.span)}>
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
