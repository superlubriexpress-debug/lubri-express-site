import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Timer } from "lucide-react";

import { BookingButton } from "@/components/booking/booking-button";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-settings-types";

export function HeroSection({ settings }: { settings: SiteSettings }) {
  const hoursLabel = settings.hoursText.replace(/\s*\|\s*/g, "\n");
  const highlights = [
    { icon: Timer, label: hoursLabel },
    { icon: Phone, label: settings.phoneDisplay },
    { icon: ShieldCheck, label: "Revisão e diagnóstico" },
  ];

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={assets.hero}
          alt="Centro automotivo Lubri Express em Itapetininga"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black" />
      </div>

      <div className="container-x relative grid min-h-screen items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="w-full min-w-0 max-w-3xl">
          <span className="eyebrow-inv rounded-full bg-accent px-4 py-2 text-ink">Auto Center em Itapetininga</span>
          <h1 className="h-display mt-7 max-w-3xl text-[2.55rem] leading-[1.03] text-white sm:text-6xl lg:text-7xl">
            <span className="block sm:inline">Troca de óleo,</span>{" "}
            <span className="block sm:inline">revisão e</span>{" "}
            <span className="block text-accent sm:inline">diagnóstico</span>{" "}
            <span className="block sm:inline">com atendimento direto.</span>
          </h1>
          <p className="mt-6 w-full max-w-2xl break-words text-base leading-8 text-neutral-200 sm:text-xl">
            Oficina para quem quer resolver o carro sem perder tempo: você solicita o atendimento, combina o melhor horário e recebe orientação clara sobre o serviço.
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookingButton className="w-full max-w-full sm:w-auto">Solicitar atendimento</BookingButton>
            <Button asChild variant="ghost" className="w-full max-w-full border border-white/25 sm:w-auto">
              <a href={settings.mapsUrl} target="_blank" rel="noreferrer" data-analytics-event="route_click" data-analytics-label="Hero - abrir rota">
                <MapPin className="h-4 w-4" />
                Abrir rota
              </a>
            </Button>
          </div>

          <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="min-w-0 whitespace-pre-line break-words text-sm font-bold leading-5 text-white">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="rounded-lg border border-white/15 bg-black/45 p-7 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow-inv">Especialidade</p>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-black uppercase text-accent">
                Procedimento especializado
              </span>
            </div>
            <h2 className="h-display mt-5 text-3xl text-white">Câmbio automático com máquina</h2>
            <p className="mt-4 leading-7 text-neutral-300">
              Troca completa do fluido do câmbio com equipamento especializado, diagnóstico e orientação para veículos nacionais e importados.
            </p>
            <div className="mt-6 grid gap-3">
              {["Diagnóstico antes do serviço", "Fluido correto para o veículo", "Procedimento limpo e monitorado"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 text-sm font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {item}
                </div>
              ))}
            </div>
            <Button asChild className="mt-7 w-full">
              <Link href="/cambio-automatico">
                Ver detalhes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </aside>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
    </section>
  );
}
