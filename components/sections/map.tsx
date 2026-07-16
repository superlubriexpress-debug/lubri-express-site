import Image from "next/image";
import { Clock, MapPin } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { assets, company } from "@/lib/site-data";

const mapSrc =
  "https://maps.google.com/maps?q=Rua%20Quintino%20Bocaiuva%20318%20Itapetininga%20SP&ll=-23.5927781,-48.0540598&t=k&z=17&output=embed";

export function MapSection() {
  return (
    <section id="contato" className="relative border-t-4 border-accent bg-ink">
      <div className="relative h-[720px] min-h-[720px] overflow-hidden lg:h-[620px] lg:min-h-[620px]">
        <iframe
          title="Mapa da Lubri Express Auto Center"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

        <div className="container-x pointer-events-none relative z-10 flex h-full items-start pt-10 lg:items-center lg:pt-0">
          <article className="pointer-events-auto w-full max-w-md rounded-lg border border-white/10 bg-ink/95 p-6 text-white shadow-2xl backdrop-blur">
            <Image src={assets.logo} alt="" width={52} height={52} className="h-12 w-12 object-contain" />
            <p className="mt-8 inline-flex rounded-full bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-ink">Unidade Itapetininga</p>
            <h2 className="h-display mt-5 text-3xl">{company.name}</h2>
            <p className="mt-3 text-lg font-bold text-neutral-300">{company.address}</p>

            <div className="mt-7 grid gap-4">
              <p className="flex items-center gap-3 font-bold">
                <Clock className="h-5 w-5 text-accent" />
                {company.hours}
              </p>
              <p className="flex items-center gap-3 font-bold">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                {company.phoneDisplay}
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button asChild>
                <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                  <MapPin className="h-4 w-4" />
                  Traçar rota
                </a>
              </Button>
              <Button asChild variant="ghost" className="border border-white/15">
                <a href={`https://wa.me/${company.phoneHref}`} target="_blank" rel="noreferrer">
                  <WhatsAppIcon variant="white" className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
