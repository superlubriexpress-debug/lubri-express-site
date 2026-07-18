"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { gallery } from "@/lib/site-data";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const active = activeIndex === null ? null : gallery[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current + direction + gallery.length) % gallery.length;
    });
  };

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
          {gallery.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ampliar imagem: ${item.label}`}
              className={cn("group relative overflow-hidden rounded-lg bg-neutral-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", item.span)}
            >
              {!loaded[item.src] && <span className="absolute inset-0 animate-pulse bg-neutral-200" aria-hidden="true" />}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
                onLoad={() => setLoaded((current) => ({ ...current, [item.src]: true }))}
                className={cn("object-cover transition duration-700 group-hover:scale-105", loaded[item.src] ? "opacity-100" : "opacity-0")}
              />
              <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/65 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn className="h-5 w-5" />
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-6xl border-white/15 bg-black p-0 text-white">
          <DialogTitle className="sr-only">{active?.label ?? "Imagem da oficina"}</DialogTitle>
          <DialogDescription className="sr-only">Imagem ampliada da estrutura da Lubri Express Auto Center.</DialogDescription>
          {active && (
            <div className="relative aspect-[4/3] max-h-[88vh] w-full sm:aspect-video">
              <Image src={active.src} alt={active.alt} fill sizes="96vw" quality={95} className="select-none object-contain" draggable={false} priority />
              <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-white transition hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Próxima imagem" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-white transition hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <ChevronRight className="h-6 w-6" />
              </button>
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-6 pb-5 pt-12 text-sm font-bold">{active.label}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
