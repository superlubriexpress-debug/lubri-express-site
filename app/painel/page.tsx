import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PainelPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-white">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-accent text-ink">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <h1 className="h-display mt-6 text-3xl">Área administrativa</h1>
        <p className="mt-3 leading-7 text-neutral-300">
          O acesso administrativo será conectado sem alterar nenhuma autenticação já existente.
        </p>
        <Button asChild className="mt-7 w-full">
          <Link href="/site">Voltar ao site</Link>
        </Button>
      </section>
    </main>
  );
}
