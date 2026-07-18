import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, House } from "lucide-react";

import { assets } from "@/lib/site-data";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      aria-labelledby="not-found-title"
      className="relative isolate h-[100svh] min-h-[480px] w-full overflow-hidden bg-black text-white"
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 select-none object-cover object-center opacity-50 blur-2xl sm:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        draggable={false}
        tabIndex={-1}
        aria-hidden="true"
      >
        <source src="/assets/404.mp4" type="video/mp4" />
      </video>

      <video
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center sm:object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        draggable={false}
        tabIndex={-1}
        aria-hidden="true"
      >
        <source src="/assets/404.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_25%,rgba(0,0,0,0.36)_58%,rgba(0,0,0,0.94)_100%)]"
        aria-hidden="true"
      />

      <section className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-8 lg:px-12 lg:pb-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl pb-1 sm:pr-44">
            <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
              Erro HTTP 404
            </p>
            <h1
              id="not-found-title"
              className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
              Página não encontrada
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Este endereço não existe ou foi movido. Volte para a página inicial
              da Lubri Express.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-bold text-ink shadow-[0_14px_38px_rgba(255,196,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd84d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <House className="h-4 w-4" aria-hidden="true" />
              Voltar ao início
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </section>

      <div
        className="not-found-watermark-cover pointer-events-none absolute right-4 z-20 flex h-[72px] w-[112px] select-none items-center justify-center rounded-2xl border border-accent/45 bg-black/95 shadow-[0_16px_42px_rgba(0,0,0,0.58)] sm:right-8 sm:h-[96px] sm:w-[164px] lg:right-12"
        aria-hidden="true"
      >
        <Image
          src={assets.logo}
          alt=""
          width={88}
          height={88}
          priority
          draggable={false}
          className="h-14 w-14 object-contain sm:h-20 sm:w-20"
        />
      </div>
    </main>
  );
}
