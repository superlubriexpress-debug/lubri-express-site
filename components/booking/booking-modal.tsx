"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

import { BOOKING_EVENT } from "@/components/booking/booking-events";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { company, serviceOptions } from "@/lib/site-data";

type Step = 0 | 1 | 2 | 3;

type Vehicle = {
  marca: string;
  modelo: string;
  ano: string;
};

type Contact = {
  nome: string;
  telefone: string;
  data: string;
  periodo: string;
  obs: string;
};

const initialVehicle: Vehicle = { marca: "", modelo: "", ano: "" };
const initialContact: Contact = { nome: "", telefone: "", data: "", periodo: "Manhã", obs: "" };
const steps = ["Serviço", "Veículo", "Contato", "Confirmação"];

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle);
  const [contact, setContact] = useState<Contact>(initialContact);
  const periodGroupId = useId();
  const notesId = useId();

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ preselect?: string }>).detail;
      setOpen(true);
      setStep(0);
      setSelected(detail?.preselect ? [detail.preselect] : []);
      setVehicle(initialVehicle);
      setContact(initialContact);
    };

    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  const selectedLabels = useMemo(
    () => serviceOptions.filter((service) => selected.includes(service.id)).map((service) => service.label),
    [selected],
  );

  const message = useMemo(() => {
    const lines = [
      "*Novo agendamento - Lubri Express Auto Center*",
      "",
      "*Serviços:*",
      ...(selectedLabels.length ? selectedLabels.map((label) => `- ${label}`) : ["- Não informado"]),
      "",
      "*Veículo:*",
      `- Marca: ${vehicle.marca || "-"}`,
      `- Modelo: ${vehicle.modelo || "-"}`,
      `- Ano: ${vehicle.ano || "-"}`,
      "",
      "*Cliente:*",
      `- Nome: ${contact.nome || "-"}`,
      `- Telefone: ${contact.telefone || "-"}`,
      `- Data preferida: ${contact.data || "-"} (${contact.periodo})`,
      contact.obs ? `\n*Observações:*\n${contact.obs}` : "",
    ];

    return lines.filter(Boolean).join("\n");
  }, [contact, selectedLabels, vehicle]);

  const whatsappUrl = `https://wa.me/${company.phoneHref}?text=${encodeURIComponent(message)}`;

  const canNext =
    (step === 0 && selected.length > 0) ||
    (step === 1 && Boolean(vehicle.marca.trim()) && Boolean(vehicle.modelo.trim())) ||
    (step === 2 && Boolean(contact.nome.trim()) && Boolean(contact.telefone.trim()));

  function toggle(id: string) {
    setSelected((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  function reset() {
    setStep(0);
    setSelected([]);
    setVehicle(initialVehicle);
    setContact(initialContact);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="bg-ink px-6 py-5 text-white">
          <div className="flex items-center gap-3 pr-8">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-ink">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-white">Agendar serviço</DialogTitle>
              <DialogDescription className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                Passo {step + 1} de 4 - {steps[step]}
              </DialogDescription>
            </div>
          </div>
          <div className="mt-5 flex gap-1">
            {steps.map((item, index) => (
              <div key={item} className={`h-1 flex-1 rounded-full ${index <= step ? "bg-accent" : "bg-white/10"}`} />
            ))}
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-7 sm:max-h-[62vh]">
          {step === 0 && (
            <section>
              <h3 className="h-display text-2xl">Quais serviços você precisa?</h3>
              <p className="mt-2 text-sm text-neutral-600">Selecione um ou mais serviços para montar o atendimento.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {serviceOptions.map((service) => {
                  const active = selected.includes(service.id);
                  const Icon = service.icon;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggle(service.id)}
                      className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${
                        active ? "border-ink bg-ink text-white" : "border-border bg-white hover:border-accent"
                      }`}
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${active ? "bg-accent text-ink" : "bg-accent/15 text-ink"}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-sm font-bold">{service.label}</span>
                      {active && <CheckCircle2 className="h-5 w-5 text-accent" />}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h3 className="h-display text-2xl">Sobre o seu veículo</h3>
              <p className="mt-2 text-sm text-neutral-600">Essas informações ajudam a preparar o atendimento.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Marca *" value={vehicle.marca} onChange={(value) => setVehicle({ ...vehicle, marca: value })} placeholder="Ex: Toyota" />
                <Field label="Modelo *" value={vehicle.modelo} onChange={(value) => setVehicle({ ...vehicle, modelo: value })} placeholder="Ex: Corolla XEi" />
                <Field label="Ano" value={vehicle.ano} onChange={(value) => setVehicle({ ...vehicle, ano: value })} placeholder="Ex: 2022" />
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h3 className="h-display text-2xl">Seus dados de contato</h3>
              <p className="mt-2 text-sm text-neutral-600">A confirmação do horário acontece pelo WhatsApp.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nome *" value={contact.nome} onChange={(value) => setContact({ ...contact, nome: value })} placeholder="Seu nome" />
                <Field label="Telefone / WhatsApp *" value={contact.telefone} onChange={(value) => setContact({ ...contact, telefone: value })} placeholder="(15) 99999-9999" />
                <Field label="Data preferida" type="date" value={contact.data} onChange={(value) => setContact({ ...contact, data: value })} />
                <div>
                  <span id={periodGroupId} className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                    Período
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-labelledby={periodGroupId}>
                    {["Manhã", "Tarde"].map((periodo) => (
                      <button
                        key={periodo}
                        type="button"
                        onClick={() => setContact({ ...contact, periodo })}
                        className={`rounded-lg border p-3 text-sm font-bold transition ${
                          contact.periodo === periodo ? "border-ink bg-ink text-white" : "border-border hover:border-accent"
                        }`}
                      >
                        {periodo}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={notesId} className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                    Observações
                  </label>
                  <textarea
                    id={notesId}
                    value={contact.obs}
                    onChange={(event) => setContact({ ...contact, obs: event.target.value })}
                    placeholder="Conte rapidamente o que está acontecendo"
                    className="mt-2 min-h-28 w-full rounded-lg border border-border px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h3 className="h-display text-2xl">Tudo pronto para enviar</h3>
              <p className="mt-2 text-sm text-neutral-600">Confira os dados e envie a mensagem para a equipe.</p>
              <div className="mt-6 rounded-lg border border-border bg-neutral-50 p-4 text-sm leading-7">
                <p>
                  <strong>Serviços:</strong> {selectedLabels.join(", ")}
                </p>
                <p>
                  <strong>Veículo:</strong> {[vehicle.marca, vehicle.modelo, vehicle.ano].filter(Boolean).join(" ")}
                </p>
                <p>
                  <strong>Cliente:</strong> {contact.nome} - {contact.telefone}
                </p>
              </div>
              <Button asChild className="mt-6 w-full">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Enviar pelo WhatsApp
                </a>
              </Button>
            </section>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((step - 1) as Step)}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset}>
              Limpar
            </Button>
            {step < 3 ? (
              <Button disabled={!canNext} onClick={() => setStep((step + 1) as Step)}>
                Próximo
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="dark" onClick={() => setOpen(false)}>
                Fechar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

function Field({ label, value, onChange, placeholder, type = "text" }: FieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-border px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}
