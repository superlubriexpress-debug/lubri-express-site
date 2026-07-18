"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { stats } from "@/lib/site-data";

function AnimatedValue({ value, decimals, prefix, suffix }: (typeof stats)[number]) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const duration = 1100;
    const startedAt = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);

  const formatted = current.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="bg-accent py-12 text-ink" aria-label="Indicadores da Lubri Express">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border border-black/10 bg-white/45 p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/60">
            <div className="h-display min-h-10 text-4xl tabular-nums"><AnimatedValue {...item} /></div>
            <div className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-black/60">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
