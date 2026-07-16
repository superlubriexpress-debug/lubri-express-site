"use client";

import { useId, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/site-data";

const serviceChoices = [
  "Troca de Óleo",
  "Câmbio Automático",
  "Freios",
  "Suspensão",
  "Diagnóstico Geral",
];

type QuoteForm = {
  vehicle: string;
  year: string;
  engine: string;
  services: string[];
  symptoms: string;
};

const initialForm: QuoteForm = {
  vehicle: "",
  year: "",
  engine: "",
  services: [],
  symptoms: "",
};

export function CTASection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const symptomsId = useId();

  const selectedServices = form.services.length > 0 ? form.services.join(", ") : "Não informado";

  const whatsappUrl = useMemo(() => {
    const message = [
      "*Solicitação de orçamento - Lubri Express Auto Center*",
      "",
      "*Ficha do carro*",
      `Marca e modelo: ${form.vehicle || "Não informado"}`,
      `Ano: ${form.year || "Não informado"}`,
      `Motorização: ${form.engine || "Não informado"}`,
      "",
      "*Serviços selecionados*",
      selectedServices,
      "",
      "*Sintomas / observações*",
      form.symptoms || "Não informado",
    ].join("\n");

    return `https://wa.me/${company.phoneHref}?text=${encodeURIComponent(message)}`;
  }, [form, selectedServices]);

  const toggleService = (service: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  return (
    <section id="orcamento" className="bg-ink py-20 text-white sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <Badge>Orçamento</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Monte uma mensagem pronta para a equipe.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-300">
            Responda três passos rápidos e envie para o WhatsApp da Lubri Express com as informações organizadas para agilizar o atendimento.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-5 text-ink shadow-2xl sm:p-7">
          <div className="mb-6 grid grid-cols-3 gap-2" aria-label="Etapas do orçamento">
            {[1, 2, 3].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStep(item)}
                className={`h-2 rounded-full transition ${step >= item ? "bg-accent" : "bg-neutral-200"}`}
                aria-label={`Ir para o passo ${item}`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="grid gap-4">
              <StepTitle step="Passo 1" title="Dados do veículo" />
              <Field label="Marca e modelo do carro" value={form.vehicle} onChange={(value) => setForm({ ...form, vehicle: value })} placeholder="Ex: Ford Ka, Corolla, Onix" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ano" value={form.year} onChange={(value) => setForm({ ...form, year: value })} placeholder="Ex: 2019" />
                <Field label="Motorização" value={form.engine} onChange={(value) => setForm({ ...form, engine: value })} placeholder="Ex: Zetec Rocam 1.0" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <StepTitle step="Passo 2" title="Serviços desejados" />
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceChoices.map((service) => {
                  const selected = form.services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`flex min-h-14 items-center gap-3 rounded-xl border px-4 text-left font-display text-sm font-bold transition ${
                        selected ? "border-accent bg-accent text-ink" : "border-border bg-white text-ink hover:border-accent"
                      }`}
                    >
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${selected ? "border-ink bg-ink text-accent" : "border-neutral-300"}`}>
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </span>
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <StepTitle step="Passo 3" title="Sintomas e observações" />
              <label htmlFor={symptomsId} className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
                Descreva sintomas adicionais
              </label>
              <textarea
                id={symptomsId}
                value={form.symptoms}
                onChange={(event) => setForm({ ...form, symptoms: event.target.value })}
                placeholder="Ex: barulho ao frear, luz acesa no painel, vazamento, dificuldade na partida..."
                className="min-h-36 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="border-border"
              disabled={step === 1}
              onClick={() => setStep((current) => Math.max(1, current - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>

            {step < 3 ? (
              <Button type="button" onClick={() => setStep((current) => Math.min(3, current + 1))}>
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button asChild className="sm:min-w-56">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Enviar pelo WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
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
        className="mt-2 h-12 w-full rounded-xl border border-border px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}

function StepTitle({ step, title }: { step: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">{step}</p>
      <h3 className="h-display mt-1 text-2xl">{title}</h3>
    </div>
  );
}
