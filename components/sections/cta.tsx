"use client";

import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";

import { BOOKING_EVENT } from "@/components/booking/booking-events";
import { WhatsAppIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { serviceOptions } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-settings-types";

type QuoteForm = {
  vehicle: string;
  year: string;
  engine: string;
  services: string[];
  name: string;
  phone: string;
  preferredDate: string;
  period: string;
  symptoms: string;
};

const initialForm: QuoteForm = {
  vehicle: "",
  year: "",
  engine: "",
  services: [],
  name: "",
  phone: "",
  preferredDate: "",
  period: "Manhã",
  symptoms: "",
};

const steps = [
  { number: 1, label: "Veículo" },
  { number: 2, label: "Serviços" },
  { number: 3, label: "Contato" },
];

export function CTASection({ settings }: { settings: SiteSettings }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const symptomsId = useId();
  const periodId = useId();

  useEffect(() => {
    const handleBooking = (event: Event) => {
      const preselect = (event as CustomEvent<{ preselect?: string }>).detail?.preselect;

      if (preselect && serviceOptions.some((service) => service.id === preselect)) {
        setForm((current) => ({
          ...current,
          services: current.services.includes(preselect) ? current.services : [...current.services, preselect],
        }));
      }

      setStep(1);
    };

    window.addEventListener(BOOKING_EVENT, handleBooking);
    return () => window.removeEventListener(BOOKING_EVENT, handleBooking);
  }, []);

  const selectedLabels = useMemo(
    () => serviceOptions.filter((service) => form.services.includes(service.id)).map((service) => service.label),
    [form.services],
  );

  const whatsappUrl = useMemo(() => {
    const message = [
      "*Solicitação de atendimento - Lubri Express Auto Center*",
      "",
      "*Veículo*",
      `Marca e modelo: ${form.vehicle || "Não informado"}`,
      `Ano: ${form.year || "Não informado"}`,
      `Motorização: ${form.engine || "Não informado"}`,
      "",
      "*Serviços de interesse*",
      ...(selectedLabels.length ? selectedLabels.map((service) => `- ${service}`) : ["- Não informado"]),
      "",
      "*Contato*",
      `Nome: ${form.name || "Não informado"}`,
      `Telefone: ${form.phone || "Não informado"}`,
      `Data preferida: ${form.preferredDate || "A combinar"}`,
      `Período: ${form.period}`,
      "",
      "*Sintomas ou observações*",
      form.symptoms || "Não informado",
    ].join("\n");

    return `https://wa.me/${settings.whatsappHref}?text=${encodeURIComponent(message)}`;
  }, [form, selectedLabels, settings.whatsappHref]);

  const canAdvance =
    (step === 1 && Boolean(form.vehicle.trim())) ||
    (step === 2 && form.services.length > 0) ||
    (step === 3 && Boolean(form.name.trim()) && Boolean(form.phone.trim()));

  const toggleService = (serviceId: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(serviceId)
        ? current.services.filter((item) => item !== serviceId)
        : [...current.services, serviceId],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canAdvance) return;

    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) window.location.href = whatsappUrl;
  };

  return (
    <section id="orcamento" className="bg-ink py-20 text-white sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Badge>Atendimento</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Conte o que seu carro precisa.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-300">
            Uma única solicitação reúne veículo, serviço e contato. A equipe recebe tudo organizado para orientar o próximo passo.
          </p>
          <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-neutral-400">
            <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            O envio final abre o WhatsApp com a mensagem pronta. Nenhum dado é armazenado pelo site.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-white p-5 text-ink shadow-2xl sm:p-7" noValidate>
          <div className="grid grid-cols-3 gap-2" aria-label="Etapas da solicitação">
            {steps.map((item) => {
              const active = step === item.number;
              const complete = step > item.number;

              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setStep(item.number)}
                  className="group min-h-11 text-left"
                  aria-current={active ? "step" : undefined}
                  aria-label={`Ir para a etapa ${item.number}: ${item.label}`}
                >
                  <span className={`block h-1.5 rounded-full transition ${active || complete ? "bg-accent" : "bg-neutral-200 group-hover:bg-neutral-300"}`} />
                  <span className={`mt-2 block text-[10px] font-black uppercase tracking-normal ${active ? "text-ink" : "text-neutral-400"}`}>
                    {item.number}. {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 min-h-[390px]">
            {step === 1 && (
              <div className="grid gap-4">
                <StepTitle step="Etapa 1" title="Dados do veículo" description="Comece pelo básico para identificarmos a aplicação correta." />
                <Field
                  label="Marca e modelo do carro *"
                  value={form.vehicle}
                  onChange={(value) => setForm({ ...form, vehicle: value })}
                  placeholder="Ex: Ford Ka, Corolla, Onix"
                  autoComplete="off"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Ano" value={form.year} onChange={(value) => setForm({ ...form, year: value })} placeholder="Ex: 2019" inputMode="numeric" />
                  <Field label="Motorização" value={form.engine} onChange={(value) => setForm({ ...form, engine: value })} placeholder="Ex: Zetec Rocam 1.0" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <StepTitle step="Etapa 2" title="Serviços de interesse" description="Selecione um ou mais itens. A avaliação confirma o que realmente será necessário." />
                <div className="grid max-h-[430px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                  {serviceOptions.map((service) => {
                    const selected = form.services.includes(service.id);
                    const Icon = service.icon;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(service.id)}
                        className={`flex min-h-14 items-center gap-3 rounded-lg border px-3 text-left text-sm font-bold transition ${
                          selected ? "border-ink bg-ink text-white" : "border-border bg-white text-ink hover:border-accent"
                        }`}
                      >
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${selected ? "bg-accent text-ink" : "bg-accent/15"}`}>
                          {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                        </span>
                        {service.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <StepTitle step="Etapa 3" title="Contato e observações" description="Informe como a equipe pode retornar e descreva qualquer sintoma importante." />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nome *" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Seu nome" autoComplete="name" />
                  <Field label="Telefone / WhatsApp *" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="(15) 99999-9999" inputMode="tel" autoComplete="tel" />
                  <Field label="Data preferida" type="date" value={form.preferredDate} onChange={(value) => setForm({ ...form, preferredDate: value })} />
                  <div>
                    <span id={periodId} className="text-xs font-black uppercase tracking-normal text-neutral-500">Período</span>
                    <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-labelledby={periodId}>
                      {["Manhã", "Tarde"].map((period) => (
                        <button
                          key={period}
                          type="button"
                          aria-pressed={form.period === period}
                          onClick={() => setForm({ ...form, period })}
                          className={`h-12 rounded-lg border text-sm font-bold transition ${form.period === period ? "border-ink bg-ink text-white" : "border-border hover:border-accent"}`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor={symptomsId} className="text-xs font-black uppercase tracking-normal text-neutral-500">Sintomas ou observações</label>
                  <textarea
                    id={symptomsId}
                    value={form.symptoms}
                    onChange={(event) => setForm({ ...form, symptoms: event.target.value })}
                    placeholder="Ex: barulho ao frear, luz acesa no painel, vazamento..."
                    className="mt-2 min-h-28 w-full rounded-lg border border-border px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="outline" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))}>
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>

            {step < 3 ? (
              <Button type="button" disabled={!canAdvance} onClick={() => setStep((current) => Math.min(3, current + 1))}>
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={!canAdvance} className="sm:min-w-56">
                <Send className="h-4 w-4" />
                Enviar pelo WhatsApp
              </Button>
            )}
          </div>
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
  type?: string;
  inputMode?: "numeric" | "tel";
  autoComplete?: string;
};

function Field({ label, value, onChange, placeholder, type = "text", inputMode, autoComplete }: FieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-xs font-black uppercase tracking-normal text-neutral-500">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-border px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}

function StepTitle({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="mb-2">
      <p className="text-xs font-black uppercase tracking-normal text-accent">{step}</p>
      <h3 className="h-display mt-1 text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
    </div>
  );
}
