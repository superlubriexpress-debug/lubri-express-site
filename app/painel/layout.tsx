import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileClock, LogOut, Settings, UserRound } from "lucide-react";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/painel/actions";
import { DeveloperCredit } from "@/components/developer-credit";
import { assets } from "@/lib/site-data";
import { getCurrentAdmin, hasRefreshSession } from "@/lib/supabase-auth";

export const metadata: Metadata = {
  title: "Painel administrativo",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    if (await hasRefreshSession()) redirect("/auth/refresh?next=/painel");
    redirect("/login?next=/painel");
  }

  return (
    <div className="min-h-svh bg-neutral-100 text-ink">
      <header className="border-b border-black/10 bg-ink text-white">
        <div className="container-x flex min-h-20 flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <Image src={assets.logo} alt="" width={48} height={48} className="h-11 w-11 object-contain" priority />
            <div>
              <p className="font-display font-bold">Painel Lubri Express</p>
              <p className="text-xs text-neutral-400">{admin.name} · {admin.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-bold transition hover:bg-white/10">
              Ver site <ExternalLink className="h-4 w-4" />
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 transition hover:bg-white/10" aria-label="Sair do painel">
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="container-x py-8 sm:py-12">
        <nav aria-label="Navegação do painel" className="mb-7 flex flex-wrap gap-2 rounded-xl border border-black/10 bg-white p-2 shadow-sm">
          <Link href="/painel" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold transition hover:bg-neutral-100">
            <Settings className="h-4 w-4 text-accent" />
            Dados do site
          </Link>
          <Link href="/painel/administrador" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold transition hover:bg-neutral-100">
            <UserRound className="h-4 w-4 text-accent" />
            Minha conta
          </Link>
          <Link href="/atualizacao" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-bold transition hover:bg-neutral-100">
            <FileClock className="h-4 w-4 text-accent" />
            Atualizações
          </Link>
        </nav>
        {children}
        <footer className="mt-10 flex justify-center border-t border-black/10 pt-7 sm:justify-end">
          <DeveloperCredit compact />
        </footer>
      </div>
    </div>
  );
}
