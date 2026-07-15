import { company } from "@/lib/site-data";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: company.name,
    image: `${company.siteUrl}/assets/real/fachada.jpg`,
    url: company.siteUrl,
    telephone: company.phoneDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Quintino Bocaiuva, 318",
      addressLocality: "Itapetininga",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [company.instagram, company.facebook],
    areaServed: "Itapetininga e região",
    makesOffer: [
      "Troca de óleo",
      "Troca de óleo do câmbio automático com máquina",
      "Diagnóstico eletrônico",
      "Injeção eletrônica",
      "Mecânica geral",
      "Elétrica automotiva",
      "Alinhamento",
      "Balanceamento",
      "Suspensão",
      "Freios",
      "Arrefecimento",
      "Filtros",
      "Revisão preventiva",
      "Manutenção corretiva",
    ],
  };
}
