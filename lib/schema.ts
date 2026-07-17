import { company } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-settings-types";

export const seoServices = [
  "Troca de Óleo e Fluidos: Óleo de motor, óleo de câmbio automático (com máquina especializada), óleo de câmbio manual, fluido de freio e fluido de direção hidráulica.",
  "Serviços de Pneus: Alinhamento, balanceamento e uma PARCERIA ESPECIAL com o supermercado Tenda (o cliente que compra pneus no Tenda ganha o alinhamento grátis na Lubri Express).",
  "Mecânica Preventiva e Corretiva: Troca de correia dentada, freios, suspensão e injeção eletrônica (incluindo limpeza de bicos).",
  "Elétrica Automotiva Completa: Motor de partida (motor de arranque), alternador, troca de lâmpadas, instalação elétrica completa de som, travas, alarmes e buzinas a ar.",
  "Climatização: Limpeza e higienização de ar-condicionado automotivo.",
];

export function autoRepairSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${company.siteUrl}/#auto-repair`,
    name: settings.tradeName,
    description:
      "Mecânica geral, elétrica automotiva e troca de fluidos/óleos para veículos leves em Itapetininga - SP.",
    image: `${company.siteUrl}/assets/real/fachada.jpg`,
    url: company.siteUrl,
    telephone: settings.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city.replace(/\s*-\s*SP$/i, ""),
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: "Itapetininga - SP",
    },
    knowsAbout: [
      "troca de óleo de câmbio automático",
      "troca de correia dentada",
      "motor de partida",
      "alternador",
      "instalação de som e alarme",
      "alinhamento e balanceamento",
      "limpeza de bicos e injeção eletrônica",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços automotivos da Lubri Express Auto Center",
      itemListElement: seoServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [settings.instagram, settings.facebook].filter(Boolean),
  };
}
