import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Termos de Uso | Lubri Express Auto Center",
  description: "Leia os Termos de Uso do site da Lubri Express Auto Center.",
  alternates: {
    canonical: "/termos-de-uso",
  },
  openGraph: {
    title: "Termos de Uso | Lubri Express Auto Center",
    description: "Leia os Termos de Uso do site da Lubri Express Auto Center.",
    url: "/termos-de-uso",
  },
};

const sections = [
  {
    title: "1. Objetivo",
    paragraphs: ["Este site possui finalidade institucional e informativa, apresentando os serviços da Lubri Express Auto Center."],
  },
  {
    title: "2. Utilização",
    paragraphs: ["O usuário compromete-se a utilizar o site de forma ética, legal e responsável."],
  },
  {
    title: "3. Orçamentos",
    paragraphs: [
      "As informações apresentadas possuem caráter informativo.",
      "Valores e serviços poderão sofrer alterações após avaliação presencial do veículo.",
    ],
  },
  {
    title: "4. Propriedade Intelectual",
    paragraphs: [
      "Todo o conteúdo deste site é protegido pela legislação brasileira de direitos autorais, incluindo:",
      "É proibida a reprodução sem autorização.",
    ],
    items: ["textos;", "imagens;", "logotipo;", "identidade visual;", "layout;", "código."],
  },
  {
    title: "5. Links Externos",
    paragraphs: ["O site poderá conter links para:", "A Lubri Express Auto Center não é responsável pelas políticas desses serviços."],
    items: ["WhatsApp", "Google Maps", "Redes sociais"],
  },
  {
    title: "6. Limitação de Responsabilidade",
    paragraphs: [
      "Embora as informações sejam constantemente revisadas, não garantimos ausência de erros, indisponibilidades ou interrupções temporárias.",
    ],
  },
  {
    title: "7. Alterações",
    paragraphs: ["Os Termos poderão ser modificados a qualquer momento."],
  },
  {
    title: "8. Legislação",
    paragraphs: ["Este documento é regido pela legislação brasileira, incluindo:"],
    items: ["Código Civil", "Código de Defesa do Consumidor", "Lei Geral de Proteção de Dados (LGPD)"],
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Termos de Uso"
      description="Ao acessar este site, o usuário concorda com estes Termos de Uso."
      sections={sections}
      updatedAt="Julho de 2026"
    />
  );
}
