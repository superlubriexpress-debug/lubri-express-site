"use client";

import { House } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      aria-labelledby="not-found-title"
      className="not-found-page relative h-svh min-h-[560px] w-full overflow-hidden bg-[#363636] select-none"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="not-found-art absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"
        aria-hidden="true"
      />

      <section className="absolute inset-x-0 bottom-0 z-10 flex min-h-[46%] flex-col items-center justify-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 text-center text-white sm:min-h-[36%] sm:px-10">
        <p
          role="status"
          className="mb-3 rounded-full border border-accent/40 bg-black/55 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent backdrop-blur-sm"
        >
          Erro HTTP 404
        </p>
        <h1
          id="not-found-title"
          className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          Página não encontrada
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          O endereço acessado não existe ou foi movido. Volte ao início para
          continuar navegando.
        </p>
        <Link
          href="/"
          className="btn-primary mt-6 min-h-14 w-full max-w-xs text-base shadow-[0_16px_40px_rgba(255,196,0,0.28)]"
        >
          <House aria-hidden="true" />
          Voltar para o início
        </Link>
      </section>
    </main>
  );
}
