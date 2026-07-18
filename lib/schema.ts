import type { BlogPost } from "@/lib/blog-posts";
import type { ServicePageData } from "@/lib/service-pages";
import { company } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-settings-types";

export const seoServices = [
  "Troca de Óleo e Fluidos: Óleo de motor, óleo de câmbio automático (com máquina especializada), óleo de câmbio manual, fluido de freio e fluido de direção hidráulica.",
  "Serviços de Pneus: Alinhamento, balanceamento e uma PARCERIA ESPECIAL com o supermercado Tenda (o cliente que compra pneus no Tenda ganha o alinhamento grátis na Lubri Express).",
  "Mecânica Preventiva e Corretiva: Troca de correia dentada, freios, suspensão e injeção eletrônica (incluindo limpeza de bicos).",
  "Elétrica Automotiva Completa: Motor de partida (motor de arranque), alternador, troca de lâmpadas, instalação elétrica completa de som, travas, alarmes e buzinas a ar.",
  "Climatização: Limpeza e higienização de ar-condicionado automotivo.",
];

const postalAddress = (settings: SiteSettings) => ({
  "@type": "PostalAddress",
  streetAddress: settings.address,
  addressLocality: settings.city.replace(/\s*-\s*SP$/i, ""),
  addressRegion: "SP",
  postalCode: "14300-210",
  addressCountry: "BR",
});

export const organizationSchema = (settings: SiteSettings) => ({
  "@type": "Organization",
  "@id": `${company.siteUrl}/#organization`,
  name: settings.tradeName,
  url: company.siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${company.siteUrl}/assets/brand/logo.png`,
  },
  telephone: settings.phoneDisplay,
  address: postalAddress(settings),
  sameAs: [settings.instagram, settings.facebook].filter(Boolean),
});

export const autoRepairSchema = (settings: SiteSettings) => ({
  "@type": ["AutoRepair", "LocalBusiness"],
  "@id": `${company.siteUrl}/#auto-repair`,
  name: settings.tradeName,
  description:
    "Mecânica geral, elétrica automotiva e troca de fluidos e óleos para veículos leves em Itapetininga - SP.",
  image: `${company.siteUrl}/assets/real/fachada.jpg`,
  url: company.siteUrl,
  telephone: settings.phoneDisplay,
  address: postalAddress(settings),
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.5962368,
    longitude: -48.0411648,
  },
  hasMap: settings.mapsUrl,
  areaServed: {
    "@type": "City",
    name: "Itapetininga - SP",
  },
  parentOrganization: { "@id": `${company.siteUrl}/#organization` },
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
      itemOffered: { "@type": "Service", name: service },
    })),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  sameAs: [settings.instagram, settings.facebook].filter(Boolean),
});

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${company.siteUrl}/#website`,
  url: company.siteUrl,
  name: company.name,
  inLanguage: "pt-BR",
  publisher: { "@id": `${company.siteUrl}/#organization` },
};

export const businessSchemaGraph = (settings: SiteSettings) => ({
  "@context": "https://schema.org",
  "@graph": [organizationSchema(settings), autoRepairSchema(settings), websiteSchema],
});

export const faqSchema = (faqs: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const serviceSchema = (service: ServicePageData, settings: SiteSettings) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${company.siteUrl}/${service.slug}/#service`,
  name: service.name,
  description: service.description,
  url: `${company.siteUrl}/${service.slug}`,
  image: `${company.siteUrl}${service.image}`,
  areaServed: { "@type": "City", name: "Itapetininga - SP" },
  provider: {
    "@type": "AutoRepair",
    "@id": `${company.siteUrl}/#auto-repair`,
    name: settings.tradeName,
    telephone: settings.phoneDisplay,
  },
});

export const blogPostSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: `${company.siteUrl}${post.image}`,
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  inLanguage: "pt-BR",
  mainEntityOfPage: `${company.siteUrl}/blog/${post.slug}`,
  author: { "@id": `${company.siteUrl}/#organization` },
  publisher: { "@id": `${company.siteUrl}/#organization` },
});
