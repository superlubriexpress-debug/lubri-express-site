import { KeyRound, Save, ShieldCheck, UserPlus, UserRound } from "lucide-react";
import { redirect } from "next/navigation";

import { changeAdminPassword, createAdminUser, updateAdminProfile } from "@/app/painel/actions";
import { getCurrentAdmin } from "@/lib/supabase-auth";

type AdminPageProps = {
  searchParams: Promise<{
    profileSaved?: string;
    passwordSaved?: string;
    userCreated?: string;
    error?: string;
  }>;
};

const errors: Record<string, string> = {
  nome: "Informe um nome válido.",
  perfil: "Não foi possível atualizar os dados do perfil.",
  permissao: "Seu usuário não possui permissão para criar novos acessos.",
  "senha-atual": "Confirme a senha atual corretamente antes de alterar.",
  "senha-curta": "A nova senha precisa ter pelo menos 12 caracteres.",
  "senha-diferente": "A confirmação não corresponde à nova senha.",
  senha: "Não foi possível alterar a senha.",
  "service-role": "A criação de usuários ainda precisa da chave privada do Supabase configurada.",
  "novo-nome": "Informe o nome do novo usuário.",
  "novo-email": "Informe um e-mail válido para o novo usuário.",
  "novo-senha-curta": "A senha inicial do novo usuário precisa ter pelo menos 12 caracteres.",
  "novo-senha-diferente": "A confirmação da senha inicial não confere.",
  "novo-usuario": "Não foi possível criar o usuário. Confira se o e-mail já não existe.",
  "novo-perfil": "O login foi criado, mas não foi possível vincular o perfil administrativo.",
};

export default async function AdministratorPage({ searchParams }: AdminPageProps) {
  const [admin, params] = await Promise.all([getCurrentAdmin(), searchParams]);
  if (!admin) redirect("/login?next=/painel/administrador");

  const hasFeedback = params.profileSaved === "1" || params.passwordSaved === "1" || params.userCreated === "1" || params.error;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {hasFeedback && (
        <div className="xl:col-span-2">
          {params.error ? (
            <p role="alert" className="rounded-lg border border-red-600/20 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {errors[params.error] ?? "Não foi possível concluir a alteração."}
            </p>
          ) : (
            <p role="status" className="rounded-lg border border-green-600/20 bg-green-50 p-4 text-sm font-semibold text-green-800">
              {params.userCreated === "1" ? "Usuário administrativo criado com sucesso." : "Alteração realizada com sucesso."}
            </p>
          )}
        </div>
      )}

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent">
            <UserRound className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">Perfil do administrador</h1>
            <p className="text-sm text-neutral-600">Identificação usada somente no painel.</p>
          </div>
        </div>

        <form action={updateAdminProfile} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Nome
            <input
              name="fullName"
              defaultValue={admin.name}
              required
              minLength={2}
              maxLength={100}
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            E-mail de acesso
            <input value={admin.email} disabled className="h-12 rounded-lg border border-border bg-neutral-100 px-4 font-normal text-neutral-500" />
          </label>
          <p className="text-xs leading-5 text-neutral-500">
            Este e-mail é o login cadastrado no Supabase. Ele não precisa ser uma caixa de e-mail real, mas é recomendado usar um e-mail existente para recuperação futura.
          </p>
          <button type="submit" className="btn-primary min-h-12 w-full sm:w-fit">
            <Save className="h-4 w-4" />
            Salvar perfil
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent">
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold">Alterar senha</h2>
            <p className="text-sm text-neutral-600">Confirme a senha atual e use no mínimo 12 caracteres.</p>
          </div>
        </div>

        <form action={changeAdminPassword} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Senha atual
            <input
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Nova senha
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Confirmar nova senha
            <input
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <button type="submit" className="btn-dark min-h-12 w-full sm:w-fit">
            <KeyRound className="h-4 w-4" />
            Atualizar senha
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8 xl:col-span-2">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent">
            <UserPlus className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold">Criar novo usuário</h2>
            <p className="text-sm text-neutral-600">Gere acessos separados para equipe, sem mostrar nada no site público.</p>
          </div>
        </div>

        <form action={createAdminUser} className="mt-7 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Nome
            <input
              name="newUserName"
              required
              minLength={2}
              maxLength={100}
              placeholder="Nome do colaborador"
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            E-mail de acesso
            <input
              name="newUserEmail"
              type="email"
              autoComplete="off"
              required
              placeholder="usuario@lubriexpress.com.br"
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Função
            <select
              name="newUserRole"
              defaultValue="editor"
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              <option value="editor">Editor</option>
              <option value="admin">Administrador</option>
              <option value="owner">Proprietário</option>
            </select>
          </label>
          <div className="hidden items-end gap-2 rounded-lg bg-neutral-50 p-4 text-sm leading-5 text-neutral-600 md:flex">
            <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
            O novo usuário poderá entrar pelo /login e editar informações do painel conforme a função.
          </div>
          <label className="grid gap-2 text-sm font-bold">
            Senha inicial
            <input
              name="newUserPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Confirmar senha inicial
            <input
              name="newUserPasswordConfirmation"
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              className="h-12 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="btn-dark min-h-12 w-full sm:w-fit">
              <UserPlus className="h-4 w-4" />
              Criar usuário
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
