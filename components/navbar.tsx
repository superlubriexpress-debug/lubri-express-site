"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, MapPin } from "lucide-react";

import { BookingButton } from "@/components/booking/booking-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { assets, company, navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        scrolled ? "border-white/10 bg-ink/95 shadow-2xl backdrop-blur" : "border-white/10 bg-black/35 backdrop-blur-sm",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:flex-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="border border-white/15 lg:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <Image src={assets.logo} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
                  <div>
                    <SheetTitle className="text-white">{company.shortName}</SheetTitle>
                    <SheetDescription>Auto Center em Itapetininga</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <nav className="mt-10 grid gap-2">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <a href={item.href} className="rounded-lg px-3 py-3 font-display text-lg font-bold text-white transition hover:bg-white/10">
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-10 grid gap-3">
                <BookingButton className="w-full" onClick={() => setOpen(false)}>
                  Agendar pelo WhatsApp
                </BookingButton>
                <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">
                  <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                    <MapPin className="h-4 w-4" />
                    Abrir rota
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <a href="#inicio" className="flex items-center gap-3">
            <Image src={assets.logo} alt="Lubri Express Auto Center" width={48} height={48} priority className="h-11 w-11 object-contain" />
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-white sm:text-lg">Lubri Express</div>
              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-accent sm:text-xs">Auto Center</div>
            </div>
          </a>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-3 text-sm font-bold text-white/85 transition hover:bg-white/10 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex lg:flex-1 lg:justify-end">
          <a
            href={`https://wa.me/${company.phoneHref}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 min-w-48 items-center gap-3 rounded-lg bg-accent px-5 font-display text-xs font-bold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-[#ffd94a]"
          >
            <Phone className="h-4 w-4" />
            <span className="whitespace-nowrap leading-tight">
              Agende uma visita
              <strong className="block">{company.phoneDisplay.replace("+55 ", "")}</strong>
            </span>
          </a>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 min-w-44 items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-5 font-display text-xs font-bold text-white transition hover:bg-white/10"
          >
            <MapPin className="h-5 w-5 text-accent" />
            <span className="whitespace-nowrap leading-tight">
              Unidade
              <strong className="block">{company.city}</strong>
            </span>
          </a>
        </div>

        <BookingButton size="sm" className="lg:hidden">
          Agendar
        </BookingButton>
      </div>
    </header>
  );
}
