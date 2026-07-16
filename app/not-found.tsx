import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="flex min-h-svh items-center justify-center overflow-hidden bg-[#f4f4f4]"
    >
      <div className="relative aspect-[3/2] w-full max-w-[150svh]">
        <Image
          src="/assets/404.png"
          alt="Pagina nao encontrada - Lubri Express Auto Center"
          fill
          priority
          sizes="(max-aspect-ratio: 3/2) 100vw, 150vh"
          className="select-none object-contain"
        />

        <Link
          href="/site"
          aria-label="Voltar para o inicio"
          className="absolute left-[33.79%] top-[85.45%] z-10 min-h-11 w-[31.25%] -translate-y-[12%] rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4 sm:h-[8.5%] sm:min-h-0 sm:translate-y-0 sm:rounded-2xl"
        >
          <span className="sr-only">Voltar para o inicio</span>
        </Link>
      </div>
    </main>
  );
}
