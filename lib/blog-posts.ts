import { assets } from "@/lib/site-data";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  image: string;
  content: Array<{ heading: string; paragraphs: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "quando-trocar-oleo-do-motor",
    title: "Quando trocar o óleo do motor?",
    excerpt: "Entenda por que prazo, quilometragem, especificação e tipo de uso precisam ser avaliados juntos.",
    category: "Óleo e fluidos",
    publishedAt: "2026-07-18",
    image: assets.oilChange,
    content: [
      {
        heading: "O manual é o ponto de partida",
        paragraphs: [
          "O intervalo correto é definido pelo fabricante e pode mudar conforme motor, óleo aplicado e regime de uso. Quilometragem isolada não conta toda a história.",
          "Trajetos curtos frequentes, trânsito intenso, poeira e longos períodos parado podem exigir mais atenção. Sempre registre a data, a quilometragem e a especificação usada.",
        ],
      },
      {
        heading: "Óleo correto e filtro em dia",
        paragraphs: [
          "Viscosidade parecida não significa produto equivalente. A especificação precisa atender às exigências do motor.",
          "Na troca, o filtro de óleo normalmente também é substituído. Uma avaliação simples ainda permite observar vazamentos e condições de outros fluidos.",
        ],
      },
    ],
  },
  {
    slug: "sinais-de-atencao-no-cambio-automatico",
    title: "Sinais de atenção no câmbio automático",
    excerpt: "Trancos, demora no engate e alterações no fluido pedem diagnóstico antes de qualquer procedimento.",
    category: "Câmbio automático",
    publishedAt: "2026-07-18",
    image: assets.transmission,
    content: [
      {
        heading: "Nem todo sintoma tem a mesma causa",
        paragraphs: [
          "Trancos, patinação, demora para engatar ou alertas no painel podem envolver fluido, sensores, adaptações eletrônicas ou componentes internos.",
          "Por isso, trocar o fluido sem avaliar o veículo não é uma solução universal. O diagnóstico orienta o procedimento adequado.",
        ],
      },
      {
        heading: "Respeite especificação e histórico",
        paragraphs: [
          "O tipo de fluido e o método de troca dependem do câmbio. O histórico de manutenção também ajuda a decidir com segurança.",
          "Antes de viajar ou comprar um usado, uma inspeção pode revelar sinais que merecem acompanhamento.",
        ],
      },
    ],
  },
  {
    slug: "checklist-revisao-antes-de-viajar",
    title: "Checklist de revisão antes de viajar",
    excerpt: "Freios, pneus, fluidos, iluminação e arrefecimento merecem atenção antes de pegar a estrada.",
    category: "Revisão preventiva",
    publishedAt: "2026-07-18",
    image: assets.serviceDesk,
    content: [
      {
        heading: "Comece pelos itens de segurança",
        paragraphs: [
          "Pneus, freios, iluminação e limpadores influenciam diretamente a segurança. Confira também estepe, ferramentas e calibragem.",
          "Fluidos e arrefecimento devem estar no nível correto e sem sinais de vazamento. Ruídos ou luzes no painel não devem ser ignorados.",
        ],
      },
      {
        heading: "Faça a revisão com antecedência",
        paragraphs: [
          "Evite deixar a inspeção para o dia da viagem. Antecedência permite diagnosticar, orçar e testar o veículo após qualquer serviço necessário.",
        ],
      },
    ],
  },
];

export const blogPostBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export const readingTime = (post: BlogPost) => {
  const words = post.content.flatMap((section) => section.paragraphs).join(" ").split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 180));
};
