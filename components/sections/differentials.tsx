import { Badge } from "@/components/ui/badge";
import { differentials } from "@/lib/site-data";

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Badge>Diferenciais</Badge>
            <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Estrutura para atender com precisão.</h2>
          </div>
          <p className="text-lg leading-8 text-neutral-600">
            A proposta é unir atendimento rápido com clareza técnica. Você entende o que precisa ser feito, aprova o serviço e acompanha o cuidado com o carro.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-border bg-neutral-50 p-6 transition hover:-translate-y-1 hover:border-accent hover:bg-white hover:shadow-premium">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-tight">{item.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
