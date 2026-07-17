import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidade | Lubri Express Auto Center",
  description: "Conheça nossa Política de Privacidade e saiba como protegemos seus dados conforme a LGPD.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    title: "Política de Privacidade | Lubri Express Auto Center",
    description: "Conheça nossa Política de Privacidade e saiba como protegemos seus dados conforme a LGPD.",
    url: "/politica-de-privacidade",
  },
};

const sections = [
  {
    title: "1. Coleta de Informações",
    paragraphs: ["Podemos coletar:"],
    items: [
      "Nome",
      "Telefone",
      "E-mail",
      "Informações enviadas pelo formulário",
      "Dados enviados pelo WhatsApp",
      "Cookies",
      "Dados de navegação",
      "Endereço IP",
      "Tipo de navegador",
    ],
  },
  {
    title: "2. Finalidade",
    paragraphs: ["Os dados são utilizados para:"],
    items: [
      "Atendimento",
      "Orçamentos",
      "Agendamento de serviços",
      "Contato com clientes",
      "Melhorar a experiência do usuário",
      "Cumprimento de obrigações legais",
    ],
  },
  {
    title: "3. Compartilhamento",
    paragraphs: ["Não comercializamos dados pessoais.", "Os dados poderão ser compartilhados apenas quando:"],
    items: ["exigido por lei;", "necessário para funcionamento do site;", "necessário para hospedagem e ferramentas utilizadas."],
  },
  {
    title: "4. Cookies",
    paragraphs: ["O site utiliza cookies para:", "O usuário pode desativar cookies no navegador."],
    items: ["melhorar a navegação;", "estatísticas de acesso;", "preferências do usuário."],
  },
  {
    title: "5. Segurança",
    paragraphs: ["Adotamos medidas técnicas e administrativas para proteger os dados pessoais."],
  },
  {
    title: "6. Direitos do Titular",
    paragraphs: ["Nos termos da LGPD, o usuário pode solicitar:"],
    items: ["confirmação do tratamento;", "acesso;", "correção;", "exclusão;", "revogação do consentimento."],
  },
  {
    title: "7. Contato",
    paragraphs: ["Em caso de dúvidas, utilize os canais oficiais disponibilizados no site."],
  },
  {
    title: "8. Atualizações",
    paragraphs: ["Esta política poderá ser alterada para atender mudanças legais ou melhorias no serviço."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      description="Esta Política de Privacidade explica como a Lubri Express Auto Center coleta, utiliza e protege as informações fornecidas pelos usuários durante a navegação em nosso site."
      sections={sections}
      updatedAt="Julho de 2026"
    />
  );
}
