import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/login/actions";
import { assets } from "@/lib/site-data";
import { isSupabaseConfigured } from "@/lib/site-settings";
import { getCurrentAdmin } from "@/lib/supabase-auth";

export const metadata: Metadata = {
  title: "Acesso administrativo",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/painel");

  const params = await searchParams;
  const next = params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : "/painel";

  return (
    <main id="conteudo" className="grid min-h-svh place-items-center bg-[#080808] px-5 py-12 text-white">
      <section className="w-full max-w-md rounded-xl border border-white/10 bg-[#111111] p-6 shadow-2xl sm:p-8">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <Image src={assets.logo} alt="" width={56} height={56} className="h-14 w-14 object-contain" priority />
          <div>
            <p className="font-display text-xl font-bold">Área administrativa</p>
            <p className="mt-1 text-sm text-neutral-400">Lubri Express Auto Center</p>
          </div>
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-lg bg-accent/10 p-4 text-sm leading-6 text-neutral-300">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          Acesso exclusivo para pessoas autorizadas.
        </div>

        {!isSupabaseConfigured() && (
          <p className="mt-4 rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-200">
            A conexão segura do painel ainda precisa ser configurada no ambiente de produção.
          </p>
        )}

        {params.error && (
          <p role="alert" className="mt-4 rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-200">
            {params.error}
          </p>
        )}

        <form action={loginAction} className="mt-6 grid gap-5">
          <input type="hidden" name="next" value={next} />
          <label className="grid gap-2 text-sm font-bold">
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="h-12 rounded-lg border border-white/15 bg-white px-4 font-normal text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Senha
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 rounded-lg border border-white/15 bg-white px-4 font-normal text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <button type="submit" className="btn-primary min-h-12 w-full">
            Entrar com segurança
          </button>
        </form>

        <Link href="/" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>
      </section>
    </main>
  );
}
