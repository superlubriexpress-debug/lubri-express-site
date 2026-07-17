import { Save } from "lucide-react";

import { updateSiteSettings } from "@/app/painel/actions";
import { getPublicSiteSettings, isSupabaseConfigured } from "@/lib/site-settings";

type PanelPageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

const errorMessages: Record<string, string> = {
  backend: "O backend ainda não está conectado às variáveis de ambiente.",
  telefone: "Confira o telefone e o WhatsApp informados.",
  salvar: "Não foi possível salvar. Confira a conexão e as permissões do banco.",
};

export default async function PanelPage({ searchParams }: PanelPageProps) {
  const [settings, params] = await Promise.all([getPublicSiteSettings(), searchParams]);

  return (
    <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
      {params.saved === "1" && (
        <p role="status" className="mb-6 rounded-lg border border-green-600/20 bg-green-50 p-4 text-sm font-semibold text-green-800">
          Alterações salvas e enviadas ao site.
        </p>
      )}
      {params.error && (
        <p role="alert" className="mb-6 rounded-lg border border-red-600/20 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {errorMessages[params.error] ?? "Não foi possível concluir a alteração."}
        </p>
      )}
      {!isSupabaseConfigured() && (
        <p className="mb-6 rounded-lg border border-amber-600/20 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Modo de configuração: o site continua usando os dados atuais, mas o salvamento será liberado após conectar o Supabase na Vercel.
        </p>
      )}

      <form action={updateSiteSettings} className="grid gap-10">
        <Fieldset legend="Empresa">
          <Field name="tradeName" label="Nome da oficina" defaultValue={settings.tradeName} required />
          <Field name="legalName" label="Razão social" defaultValue={settings.legalName} placeholder="Preencher quando disponível" />
          <Field name="cnpj" label="CNPJ" defaultValue={settings.cnpj} placeholder="00.000.000/0000-00" />
          <Field name="email" label="E-mail" type="email" defaultValue={settings.email} placeholder="contato@empresa.com.br" />
        </Fieldset>

        <Fieldset legend="Contato e atendimento">
          <Field name="phoneDisplay" label="Telefone" defaultValue={settings.phoneDisplay} required />
          <Field name="whatsappDisplay" label="WhatsApp" defaultValue={settings.whatsappDisplay} required />
          <Field name="hoursText" label="Horário de funcionamento" defaultValue={settings.hoursText} required wide />
          <Field name="maintenanceNotice" label="Aviso temporário" defaultValue={settings.maintenanceNotice} placeholder="Deixe em branco quando não houver aviso" wide />
        </Fieldset>

        <Fieldset legend="Localização e redes">
          <Field name="address" label="Endereço completo" defaultValue={settings.address} required wide />
          <Field name="city" label="Cidade" defaultValue={settings.city} required />
          <Field name="mapsUrl" label="Link do Google Maps" type="url" defaultValue={settings.mapsUrl} required wide />
          <Field name="instagram" label="Instagram" type="url" defaultValue={settings.instagram} wide />
          <Field name="facebook" label="Facebook" type="url" defaultValue={settings.facebook} wide />
        </Fieldset>

        <div className="flex justify-end border-t border-border pt-6">
          <button type="submit" className="btn-primary min-h-12 w-full sm:w-auto" disabled={!isSupabaseConfigured()}>
            <Save className="h-4 w-4" />
            Salvar alterações
          </button>
        </div>
      </form>
    </section>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-display text-lg font-bold">{legend}</legend>
      <div className="mt-5 grid gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
  required,
  wide,
}: {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <label className={`grid gap-2 text-sm font-bold ${wide ? "md:col-span-2" : ""}`}>
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="h-12 min-w-0 rounded-lg border border-border px-4 font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
