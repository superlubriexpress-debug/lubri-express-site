import { KeyRound, Save, UserRound } from "lucide-react";
import { redirect } from "next/navigation";

import { changeAdminPassword, updateAdminProfile } from "@/app/painel/actions";
import { getCurrentAdmin } from "@/lib/supabase-auth";

type AdminPageProps = {
  searchParams: Promise<{
    profileSaved?: string;
    passwordSaved?: string;
    error?: string;
  }>;
};

const errors: Record<string, string> = {
  nome: "Informe um nome válido.",
  perfil: "Não foi possível atualizar os dados do perfil.",
  "senha-curta": "A nova senha precisa ter pelo menos 12 caracteres.",
  "senha-diferente": "A confirmação não corresponde à nova senha.",
  senha: "Não foi possível alterar a senha.",
};

export default async function AdministratorPage({ searchParams }: AdminPageProps) {
  const [admin, params] = await Promise.all([getCurrentAdmin(), searchParams]);
  if (!admin) redirect("/login?next=/painel/administrador");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {(params.profileSaved === "1" || params.passwordSaved === "1" || params.error) && (
        <div className="lg:col-span-2">
          {params.error ? (
            <p role="alert" className="rounded-lg border border-red-600/20 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {errors[params.error] ?? "Não foi possível concluir a alteração."}
            </p>
          ) : (
            <p role="status" className="rounded-lg border border-green-600/20 bg-green-50 p-4 text-sm font-semibold text-green-800">
              Alteração realizada com sucesso.
            </p>
          )}
        </div>
      )}

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent"><UserRound className="h-5 w-5" /></span>
          <div>
            <h1 className="font-display text-xl font-bold">Perfil do administrador</h1>
            <p className="text-sm text-neutral-600">Identificação usada somente no painel.</p>
          </div>
        </div>

        <form action={updateAdminProfile} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Nome
            <input name="fullName" defaultValue={admin.name} required minLength={2} maxLength={100} className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            E-mail de acesso
            <input value={admin.email} disabled className="h-12 rounded-lg border border-border bg-neutral-100 px-4 font-normal text-neutral-500" />
          </label>
          <p className="text-xs leading-5 text-neutral-500">O e-mail é protegido pela autenticação e não pode ser alterado por este formulário.</p>
          <button type="submit" className="btn-primary min-h-12 w-full sm:w-fit">
            <Save className="h-4 w-4" />
            Salvar perfil
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent"><KeyRound className="h-5 w-5" /></span>
          <div>
            <h2 className="font-display text-xl font-bold">Alterar senha</h2>
            <p className="text-sm text-neutral-600">Use no mínimo 12 caracteres.</p>
          </div>
        </div>

        <form action={changeAdminPassword} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Nova senha
            <input name="password" type="password" autoComplete="new-password" required minLength={12} className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Confirmar nova senha
            <input name="passwordConfirmation" type="password" autoComplete="new-password" required minLength={12} className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30" />
          </label>
          <button type="submit" className="btn-dark min-h-12 w-full sm:w-fit">
            <KeyRound className="h-4 w-4" />
            Atualizar senha
          </button>
        </form>
      </section>
    </div>
  );
}
