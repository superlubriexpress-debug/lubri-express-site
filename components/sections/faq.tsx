import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/lib/site-data";

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Badge>FAQ</Badge>
          <h2 className="h-display mt-5 text-4xl leading-tight sm:text-5xl">Perguntas frequentes.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Dúvidas comuns para quem quer cuidar melhor do carro antes de agendar.
          </p>
        </div>
        <Accordion type="single" collapsible className="rounded-lg border border-border bg-neutral-50 px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
