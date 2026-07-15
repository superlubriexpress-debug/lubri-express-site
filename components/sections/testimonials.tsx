"use client";

import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { reviews } from "@/lib/site-data";

export function TestimonialsSection() {
  return (
    <section id="avaliacoes" className="bg-neutral-50 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>Avaliações</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Confiança construída no atendimento.</h2>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="mx-auto mt-12 max-w-6xl">
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.name} className="md:basis-1/2 lg:basis-1/3">
                <article className="h-full rounded-lg border border-border bg-white p-7 shadow-sm">
                  <div className="flex text-accent" aria-label="Avaliação 5 estrelas">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 leading-7 text-neutral-700">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-7 border-t border-border pt-5">
                    <strong className="font-display text-lg">{review.name}</strong>
                    <p className="mt-1 text-sm text-neutral-500">{review.role}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 hidden bg-white sm:flex lg:-left-14" />
          <CarouselNext className="right-0 hidden bg-white sm:flex lg:-right-14" />
        </Carousel>
      </div>
    </section>
  );
}
