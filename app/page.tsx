import { SitePage } from "@/components/site-page";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { faqs } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <SitePage />
      <JsonLd id="home-faq-schema" data={faqSchema(faqs)} />
    </>
  );
}
