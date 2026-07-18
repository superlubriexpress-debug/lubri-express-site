import type { Metadata } from "next";
import {
  Accessibility,
  BarChart3,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  LockKeyhole,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Atualizações e documentação",
  robots: { index: false, follow: false },
};

const technologies = [
  ["Next.js 15", "App Router, Server Components, Metadata API e rotas protegidas."],
  ["React 19", "Componentes reutilizáveis e formulários interativos."],
  ["TypeScript", "Tipagem estrita para reduzir falhas e facilitar manutenção."],
  ["Tailwind CSS", "Interface responsiva, consistente e mobile first."],
  ["Radix UI", "Base acessível para dialog, accordion, tooltip e outros controles."],
  ["Framer Motion", "Animações suaves com respeito a preferências de movimento."],
  ["Lucide Icons", "Ícones vetoriais consistentes em toda a interface."],
  ["Supabase", "Autenticação, perfis administrativos e configurações do site."],
  ["Vercel", "Hospedagem da aplicação Next.js, HTTPS e distribuição global."],
  ["GitHub", "Histórico de versões, rastreabilidade e recuperação do código."],
  ["Schema.org", "Dados estruturados de AutoRepair, serviços, FAQ e artigos."],
  ["Google Maps e WhatsApp", "Rota da oficina e contato orientado por serviço."],
];

const improvements = [
  [Search, "SEO local completo", "Metadados, canonical, Open Graph, sitemap, robots e JSON-LD para Itapetininga."],
  [Smartphone, "Responsividade", "Layouts ajustados para celular, tablet, desktop e telas ultrawide."],
  [ShieldCheck, "Segurança", "Painel não indexado, autenticação, sessões seguras e cabeçalhos de proteção."],
  [Database, "Painel administrativo", "Edição de contato, horários, endereço, redes, dados empresariais e usuários."],
  [Accessibility, "Acessibilidade", "Semântica, navegação por teclado, foco visível, contraste e textos alternativos."],
  [Gauge, "Performance", "Otimização de imagens, fontes locais do Next.js, lazy loading e componentes no servidor."],
  [Wrench, "Conteúdo automotivo", "Serviços reais, páginas especializadas, FAQ, blog e fluxo de orçamento."],
  [Globe2, "Identidade digital", "Paleta Lubri Express, fotos reais, logos oficiais e página 404 personalizada."],
];

const futureImprovements = [
  "Histórico de alterações do painel com data, usuário e opção de restauração.",
  "Gestão de fotos, serviços, artigos e depoimentos diretamente pelo painel.",
  "Integração com agenda, lembretes de revisão e acompanhamento de orçamentos.",
  "Monitoramento contínuo de disponibilidade, erros e métricas reais de desempenho.",
  "Backup automatizado e política periódica de recuperação do banco de dados.",
  "Perfis de permissão mais detalhados para proprietário, administrador e editor.",
  "Testes automatizados de navegação, autenticação e formulários em múltiplos navegadores.",
  "Integração oficial com avaliações do Google Business Profile, quando houver API disponível.",
];

export default function UpdatesPage() {
  return (
    <div className="grid gap-7">
      <section className="overflow-hidden rounded-xl bg-ink p-6 text-white shadow-xl sm:p-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-accent">
              <Sparkles className="h-4 w-4" />
              Documentação do projeto
            </p>
            <h1 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">
              Evolução da Lubri Express na internet
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
              Registro técnico das tecnologias, melhorias entregues, esforço documentado e próximos passos do site criado por Gean Maikon.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-bold text-accent">
            <CheckCircle2 className="h-5 w-5" />
            Aplicação em produção
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do projeto">
        <Metric icon={GitBranch} value="26" label="versões documentadas" detail="Histórico Git até 18/07/2026" />
        <Metric icon={Clock3} value="4 dias" label="período documentado" detail="De 15 a 18 de julho de 2026" />
        <Metric icon={Code2} value="35–55 h" label="esforço técnico estimado" detail="Não houve apontamento formal de horas" />
        <Metric icon={BarChart3} value="R$ 18–30 mil" label="valor comercial estimado" detail="Faixa de reconstrução equivalente" />
      </section>

      <p className="rounded-xl border border-amber-500/30 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Transparência:</strong> os 4 dias e as 26 versões vêm do histórico do projeto, incluindo esta entrega. A faixa de horas é uma estimativa de esforço, pois não existiu cronômetro de trabalho. O valor é uma avaliação comercial aproximada para um projeto equivalente no mercado brasileiro, não uma nota fiscal ou cobrança.
      </p>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <SectionHeading icon={Rocket} title="Melhorias realizadas" description="Principais entregas incorporadas à aplicação atual." />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {improvements.map(([Icon, title, description]) => {
            const ImprovementIcon = Icon as typeof Search;
            return (
              <article key={String(title)} className="rounded-xl border border-black/10 bg-neutral-50 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-ink">
                  <ImprovementIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-black">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{String(description)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <SectionHeading icon={Code2} title="Tecnologias utilizadas" description="Ferramentas que compõem o site, o painel e a infraestrutura." />
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map(([name, description]) => (
            <article key={name} className="rounded-lg border border-black/10 p-4">
              <h3 className="font-display text-sm font-black">{name}</h3>
              <p className="mt-1.5 text-sm leading-6 text-neutral-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
        <SectionHeading icon={LockKeyhole} title="Melhorias futuras" description="Evoluções recomendadas conforme a operação digital da oficina crescer." />
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {futureImprovements.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ icon: Icon, value, label, detail }: { icon: typeof Clock3; value: string; label: string; detail: string }) {
  return (
    <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-2xl font-black tracking-tight">{value}</p>
          <p className="mt-1 text-sm font-bold text-neutral-800">{label}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/20 text-amber-700">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-xs leading-5 text-neutral-500">{detail}</p>
    </article>
  );
}

function SectionHeading({ icon: Icon, title, description }: { icon: typeof Rocket; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="font-display text-xl font-black sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
