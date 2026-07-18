import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { servicePageBySlug, servicePages } from "@/lib/service-pages";
import { company } from "@/lib/site-data";
import { getPublicSiteSettings } from "@/lib/site-settings";

export const dynamicParams = false;

export const generateStaticParams = () => servicePages.map((service) => ({ serviceSlug: service.slug }));

type ServiceRouteProps = { params: Promise<{ serviceSlug: string }> };

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = servicePageBySlug.get(serviceSlug);
  if (!service) return {};

  const title = `${service.name} em Itapetininga`;
  return {
    title,
    description: service.shortDescription,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      title: `${title} | ${company.name}`,
      description: service.shortDescription,
      url: `${company.siteUrl}/${service.slug}`,
      type: "website",
      images: [{ url: service.image, alt: service.name }],
    },
    twitter: { card: "summary_large_image", title, description: service.shortDescription, images: [service.image] },
  };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { serviceSlug } = await params;
  const service = servicePageBySlug.get(serviceSlug);
  if (!service) notFound();
  const settings = await getPublicSiteSettings();
  const breadcrumbs = [
    { name: "Início", url: company.siteUrl },
    { name: "Serviços", url: `${company.siteUrl}/#servicos` },
    { name: service.name, url: `${company.siteUrl}/${service.slug}` },
  ];

  return (
    <>
      <ServiceDetailPage service={service} />
      <JsonLd id={`${service.slug}-service-schema`} data={serviceSchema(service, settings)} />
      <JsonLd id={`${service.slug}-faq-schema`} data={faqSchema(service.faqs)} />
      <JsonLd id={`${service.slug}-breadcrumb-schema`} data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}
