"use client";

import { useId, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { company, serviceOptions } from "@/lib/site-data";

const initialState = {
  nome: "",
  telefone: "",
  veiculo: "",
  servico: serviceOptions[0]?.id ?? "troca-oleo",
  observacoes: "",
};

export function CTASection() {
  const [form, setForm] = useState(initialState);
  const serviceId = useId();
  const notesId = useId();

  const selectedService = serviceOptions.find((service) => service.id === form.servico)?.label ?? "Atendimento";

  const whatsappUrl = useMemo(() => {
    const message = [
      "*Solicitação de orçamento - Lubri Express Auto Center*",
      "",
      `*Nome:* ${form.nome || "-"}`,
      `*Telefone:* ${form.telefone || "-"}`,
      `*Veículo:* ${form.veiculo || "-"}`,
      `*Serviço:* ${selectedService}`,
      "",
      `*Observações:* ${form.observacoes || "-"}`,
    ].join("\n");

    return `https://wa.me/${company.phoneHref}?text=${encodeURIComponent(message)}`;
  }, [form, selectedService]);

  return (
    <section id="orcamento" className="bg-ink py-20 text-white sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <Badge>Orçamento</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Monte uma mensagem pronta para a equipe.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-300">
            O formulário prepara o texto e abre o WhatsApp da Lubri Express com tudo organizado para agilizar o atendimento.
          </p>
        </div>

        <form className="grid gap-4 rounded-lg border border-white/10 bg-white p-5 text-ink shadow-2xl sm:p-7" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" value={form.nome} onChange={(value) => setForm({ ...form, nome: value })} placeholder="Seu nome" />
            <Field label="Telefone" value={form.telefone} onChange={(value) => setForm({ ...form, telefone: value })} placeholder="(15) 99999-9999" />
          </div>
          <Field label="Veículo" value={form.veiculo} onChange={(value) => setForm({ ...form, veiculo: value })} placeholder="Marca, modelo e ano" />
          <div>
            <label htmlFor={serviceId} className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
              Serviço
            </label>
            <select
              id={serviceId}
              value={form.servico}
              onChange={(event) => setForm({ ...form, servico: event.target.value })}
              className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm font-semibold outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              {serviceOptions.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={notesId} className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
              Observações
            </label>
            <textarea
              id={notesId}
              value={form.observacoes}
              onChange={(event) => setForm({ ...form, observacoes: event.target.value })}
              placeholder="Conte rapidamente o que precisa"
              className="mt-2 min-h-28 w-full rounded-lg border border-border px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <Button asChild className="w-full">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Enviar pelo WhatsApp
            </a>
          </Button>
        </form>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function Field({ label, value, onChange, placeholder }: FieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-border px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}
