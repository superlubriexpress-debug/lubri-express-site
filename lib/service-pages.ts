import { assets } from "@/lib/site-data";

export type ServicePageData = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  benefits: string[];
  whenToDo: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const servicePages: ServicePageData[] = [
  {
    slug: "troca-de-oleo",
    name: "Troca de óleo e fluidos",
    shortDescription: "Aplicação correta de óleo e fluidos para proteger motor, câmbio, freios e direção.",
    description:
      "A Lubri Express verifica a especificação indicada para o veículo antes da aplicação. O atendimento inclui óleo de motor, óleo de câmbio manual, fluido de freio e fluido de direção hidráulica.",
    image: assets.oilChange,
    benefits: ["Proteção contra desgaste", "Aplicação conforme a especificação", "Inspeção visual durante o serviço", "Orientação sobre o próximo intervalo"],
    whenToDo: ["No intervalo previsto no manual", "Quando surgir alerta no painel", "Após uso severo ou longos períodos parado", "Ao comprar um veículo usado sem histórico"],
    faqs: [
      { q: "Qual óleo é o correto para meu carro?", a: "A viscosidade e a especificação variam por motor. A equipe confere a aplicação antes do serviço." },
      { q: "Vocês trocam outros fluidos?", a: "Sim. Também atendemos câmbio manual, freio e direção hidráulica, conforme a necessidade do veículo." },
      { q: "Precisa trocar o filtro junto?", a: "O filtro de óleo normalmente é substituído na troca. A avaliação confirma os demais filtros." },
    ],
  },
  {
    slug: "cambio-automatico",
    name: "Câmbio automático com máquina",
    shortDescription: "Troca de fluido com equipamento especializado, diagnóstico e procedimento monitorado.",
    description:
      "O serviço é indicado conforme o projeto do câmbio, o fluido correto e o histórico do veículo. A máquina permite renovar o fluido de forma controlada quando esse procedimento é tecnicamente recomendado.",
    image: assets.transmission,
    benefits: ["Fluido compatível com o câmbio", "Procedimento limpo e controlado", "Avaliação antes da execução", "Atendimento a nacionais e importados"],
    whenToDo: ["No intervalo do fabricante", "Ao notar trancos ou demora nas trocas", "Quando o fluido apresenta alteração", "Antes de viagens ou uso intenso, se o prazo estiver próximo"],
    faqs: [
      { q: "Todo câmbio automático usa a máquina?", a: "Não. O método depende do câmbio e da condição do veículo. A avaliação vem antes da execução." },
      { q: "Qual fluido será utilizado?", a: "Somente a especificação compatível com o câmbio do veículo, confirmada antes do serviço." },
      { q: "A troca resolve qualquer tranco?", a: "Nem sempre. Trancos podem ter causas mecânicas ou eletrônicas, por isso o diagnóstico é importante." },
    ],
  },
  {
    slug: "revisao-preventiva",
    name: "Revisão preventiva",
    shortDescription: "Checklist objetivo para antecipar desgastes e manter o veículo confiável.",
    description:
      "A revisão preventiva reúne inspeções de segurança, fluidos, filtros, freios, suspensão, arrefecimento e componentes sujeitos a desgaste. Você recebe orientação antes de autorizar qualquer intervenção.",
    image: assets.serviceDesk,
    benefits: ["Menor risco de imprevistos", "Planejamento de manutenção", "Mais segurança no uso diário", "Prioridades explicadas com clareza"],
    whenToDo: ["Antes de viajar", "Conforme a quilometragem do manual", "Ao comprar um veículo usado", "Quando o carro ficou muito tempo parado"],
    faqs: [
      { q: "A revisão inclui troca de peças?", a: "A inspeção identifica necessidades. Qualquer troca é apresentada antes para sua aprovação." },
      { q: "Posso revisar antes de uma viagem?", a: "Sim. É uma das melhores ocasiões para conferir itens de segurança e fluidos." },
      { q: "Vocês atendem carros importados?", a: "Sim, conforme disponibilidade técnica, especificações e peças aplicáveis ao veículo." },
    ],
  },
  {
    slug: "freios",
    name: "Freios",
    shortDescription: "Inspeção e manutenção para uma frenagem segura, progressiva e confiável.",
    description:
      "A avaliação considera pastilhas, discos, fluido, vazamentos e comportamento do pedal. O objetivo é localizar a origem do sintoma e orientar o reparo correto.",
    image: assets.brakes,
    benefits: ["Frenagem confiável", "Inspeção de desgaste", "Fluido adequado", "Diagnóstico antes do reparo"],
    whenToDo: ["Ao ouvir ruído na frenagem", "Quando o pedal muda de comportamento", "Se o veículo puxa ao frear", "No intervalo de revisão"],
    faqs: [
      { q: "Ruído sempre significa pastilha gasta?", a: "Não. Discos, sujeira, montagem e outros componentes também podem causar ruído." },
      { q: "Quando trocar o fluido de freio?", a: "O prazo segue o fabricante e a condição do fluido. A equipe avalia e orienta." },
      { q: "O diagnóstico é feito antes?", a: "Sim. A indicação do serviço vem depois da inspeção." },
    ],
  },
  {
    slug: "suspensao",
    name: "Suspensão",
    shortDescription: "Avaliação de componentes que influenciam estabilidade, conforto e segurança.",
    description:
      "Amortecedores, buchas, pivôs, terminais, molas e demais componentes trabalham em conjunto. A inspeção ajuda a identificar folgas, ruídos e desgaste irregular.",
    image: assets.alignment,
    benefits: ["Mais estabilidade", "Menos ruídos e folgas", "Desgaste uniforme dos pneus", "Conforto e segurança"],
    whenToDo: ["Ao ouvir batidas em pisos irregulares", "Se o carro perde estabilidade", "Quando pneus gastam de forma irregular", "Antes do alinhamento, se houver folgas"],
    faqs: [
      { q: "Alinhamento resolve folga na suspensão?", a: "Não. Folgas precisam ser corrigidas antes para que o alinhamento permaneça correto." },
      { q: "Amortecedor ruim sempre vaza?", a: "Não. Ele pode perder eficiência sem vazamento aparente, por isso a inspeção é importante." },
      { q: "Vocês verificam ruídos?", a: "Sim. A avaliação busca reproduzir e localizar a origem do sintoma." },
    ],
  },
  {
    slug: "eletrica-automotiva",
    name: "Elétrica automotiva",
    shortDescription: "Diagnóstico e reparo de partida, carga, iluminação e acessórios elétricos.",
    description:
      "Atendemos motor de partida, alternador, lâmpadas, som, travas, alarmes e buzinas a ar. A análise elétrica evita trocas por tentativa e identifica a causa do problema.",
    image: assets.diagnostic,
    benefits: ["Diagnóstico objetivo", "Teste de carga e partida", "Instalação organizada", "Menor risco de falhas recorrentes"],
    whenToDo: ["Quando o veículo demora a ligar", "Se a bateria descarrega", "Ao notar falhas de iluminação", "Antes de instalar acessórios"],
    faqs: [
      { q: "Vocês testam alternador e motor de partida?", a: "Sim. A avaliação considera o sistema de carga, partida e conexões." },
      { q: "Instalam som e alarme?", a: "Sim, além de travas e buzinas a ar, conforme compatibilidade com o veículo." },
      { q: "Luz no painel pode ser elétrica?", a: "Pode, mas é necessário diagnosticar para distinguir falhas elétricas, eletrônicas e mecânicas." },
    ],
  },
  {
    slug: "ar-condicionado",
    name: "Ar-condicionado automotivo",
    shortDescription: "Limpeza e higienização para melhorar o ar dentro do veículo.",
    description:
      "A higienização ajuda a reduzir odores e resíduos acumulados no sistema de ventilação. O filtro de cabine também é inspecionado para orientar a substituição quando necessário.",
    image: assets.store,
    benefits: ["Melhora da qualidade do ar", "Redução de odores", "Inspeção do filtro de cabine", "Mais conforto no uso diário"],
    whenToDo: ["Quando surgir odor ao ligar", "Após longos períodos sem uso", "No intervalo de manutenção do filtro", "Antes de períodos de calor intenso"],
    faqs: [
      { q: "Higienização corrige falta de refrigeração?", a: "Não necessariamente. Falta de refrigeração exige diagnóstico específico do sistema." },
      { q: "O filtro de cabine é verificado?", a: "Sim. A condição do filtro influencia o fluxo e a qualidade do ar." },
      { q: "Quanto tempo dura o serviço?", a: "O tempo depende do veículo e do procedimento indicado. A equipe informa antes do atendimento." },
    ],
  },
  {
    slug: "alinhamento-balanceamento",
    name: "Alinhamento e balanceamento",
    shortDescription: "Geometria e rodagem equilibradas para segurança, conforto e durabilidade dos pneus.",
    description:
      "O alinhamento corrige os ângulos das rodas e o balanceamento reduz vibrações do conjunto. Clientes que compram pneus no supermercado Tenda contam com a parceria de alinhamento grátis na Lubri Express, conforme as condições da ação.",
    image: assets.alignment,
    benefits: ["Direção mais estável", "Menos vibração", "Maior vida útil dos pneus", "Parceria especial com o Tenda"],
    whenToDo: ["Ao trocar pneus", "Se o volante fica desalinhado", "Quando surgem vibrações", "Após impactos fortes ou reparos na suspensão"],
    faqs: [
      { q: "Como funciona a parceria com o Tenda?", a: "Quem compra pneus no Tenda recebe o alinhamento grátis na Lubri Express conforme as regras e a comprovação da ação vigente." },
      { q: "Alinhamento e balanceamento são iguais?", a: "Não. O alinhamento corrige ângulos; o balanceamento corrige desequilíbrios do conjunto roda e pneu." },
      { q: "Posso alinhar com folga na suspensão?", a: "A folga deve ser corrigida antes para garantir um resultado consistente." },
    ],
  },
];

export const servicePageBySlug = new Map(servicePages.map((service) => [service.slug, service]));
