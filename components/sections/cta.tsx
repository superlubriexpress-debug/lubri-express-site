"use client";

import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";

import { BOOKING_EVENT } from "@/components/booking/booking-events";
import { WhatsAppIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { serviceOptions } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-settings-types";
import { trackEvent } from "@/lib/analytics";

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

const serviceSlugToOption: Record<string, string> = {
  "troca-de-oleo": "oleo-motor",
  "cambio-automatico": "cambio-automatico",
  "revisao-preventiva": "mecanica",
  freios: "freios",
  suspensao: "suspensao",
  "eletrica-automotiva": "eletrica",
  "ar-condicionado": "ar-condicionado",
  "alinhamento-balanceamento": "alinhamento",
};

type FormErrors = Partial<Record<"vehicle" | "year" | "engine" | "services" | "name" | "phone", string>>;

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export function CTASection({ settings }: { settings: SiteSettings }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");
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

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("servico");
    const option = requestedService ? serviceSlugToOption[requestedService] : undefined;
    if (!option) return;
    setForm((current) => ({ ...current, services: current.services.includes(option) ? current.services : [...current.services, option] }));
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

  const phoneDigits = form.phone.replace(/\D/g, "");
  const canAdvance =
    (step === 1 && Boolean(form.vehicle.trim()) && /^\d{4}$/.test(form.year) && Boolean(form.engine.trim())) ||
    (step === 2 && form.services.length > 0) ||
    (step === 3 && Boolean(form.name.trim()) && phoneDigits.length >= 10);

  const validateStep = (stepToValidate: number) => {
    const nextErrors: FormErrors = {};
    if (stepToValidate === 1) {
      if (!form.vehicle.trim()) nextErrors.vehicle = "Informe a marca e o modelo.";
      if (!/^\d{4}$/.test(form.year)) nextErrors.year = "Informe o ano com quatro dígitos.";
      if (!form.engine.trim()) nextErrors.engine = "Informe a motorização ou escreva 'não sei'.";
    }
    if (stepToValidate === 2 && form.services.length === 0) nextErrors.services = "Selecione pelo menos um serviço.";
    if (stepToValidate === 3) {
      if (form.name.trim().length < 2) nextErrors.name = "Informe seu nome.";
      if (phoneDigits.length < 10) nextErrors.phone = "Informe um telefone com DDD.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const toggleService = (serviceId: string) => {
    setErrors((current) => ({ ...current, services: undefined }));
    setForm((current) => ({
      ...current,
      services: current.services.includes(serviceId)
        ? current.services.filter((item) => item !== serviceId)
        : [...current.services, serviceId],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep(3)) return;

    setSubmitStatus("loading");
    trackEvent("quote_submit", { services: selectedLabels.join(", "), vehicle: form.vehicle });

    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) window.location.href = whatsappUrl;
    window.setTimeout(() => setSubmitStatus("success"), 450);
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(3, current + 1));
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
                  onClick={() => {
                    if (item.number < step || validateStep(step)) setStep(item.number);
                  }}
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
                  onChange={(value) => { setForm({ ...form, vehicle: value }); setErrors((current) => ({ ...current, vehicle: undefined })); }}
                  placeholder="Ex: Ford Ka, Corolla, Onix"
                  autoComplete="off"
                  error={errors.vehicle}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Ano *" value={form.year} onChange={(value) => { setForm({ ...form, year: value.replace(/\D/g, "").slice(0, 4) }); setErrors((current) => ({ ...current, year: undefined })); }} placeholder="Ex: 2019" inputMode="numeric" error={errors.year} required />
                  <Field label="Motorização *" value={form.engine} onChange={(value) => { setForm({ ...form, engine: value }); setErrors((current) => ({ ...current, engine: undefined })); }} placeholder="Ex: Zetec Rocam 1.0" error={errors.engine} required />
                </div>
                {errors.vehicle || errors.year || errors.engine ? <p className="text-sm font-semibold text-red-700" role="alert">Revise os campos destacados para continuar.</p> : null}
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
                {errors.services && <p className="text-sm font-semibold text-red-700" role="alert">{errors.services}</p>}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <StepTitle step="Etapa 3" title="Contato e observações" description="Informe como a equipe pode retornar e descreva qualquer sintoma importante." />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nome *" value={form.name} onChange={(value) => { setForm({ ...form, name: value }); setErrors((current) => ({ ...current, name: undefined })); }} placeholder="Seu nome" autoComplete="name" error={errors.name} required />
                  <Field label="Telefone / WhatsApp *" value={form.phone} onChange={(value) => { setForm({ ...form, phone: formatPhone(value) }); setErrors((current) => ({ ...current, phone: undefined })); }} placeholder="(15) 99999-9999" inputMode="tel" autoComplete="tel" error={errors.phone} required />
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
              <Button type="button" aria-disabled={!canAdvance} onClick={goNext}>
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" aria-disabled={!canAdvance} disabled={submitStatus === "loading"} className="sm:min-w-56" aria-live="polite">
                {submitStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : submitStatus === "success" ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {submitStatus === "loading" ? "Abrindo WhatsApp..." : submitStatus === "success" ? "Mensagem preparada" : "Enviar pelo WhatsApp"}
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
  error?: string;
  required?: boolean;
};

function Field({ label, value, onChange, placeholder, type = "text", inputMode, autoComplete, error, required }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-xs font-black uppercase tracking-normal text-neutral-500">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`mt-2 h-12 w-full rounded-lg border px-4 text-sm outline-none transition focus:ring-2 ${error ? "border-red-600 focus:border-red-600 focus:ring-red-200" : "border-border focus:border-accent focus:ring-accent/30"}`}
      />
      {error && <p id={errorId} className="mt-1.5 text-xs font-semibold text-red-700">{error}</p>}
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
