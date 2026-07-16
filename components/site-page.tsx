import { BookingModalLoader } from "@/components/booking/booking-modal-loader";
import { Navbar } from "@/components/navbar";
import { BrandsSection } from "@/components/sections/brands";
import { CTASection } from "@/components/sections/cta";
import { DifferentialsSection } from "@/components/sections/differentials";
import { FAQSection } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { GallerySection } from "@/components/sections/gallery";
import { HeroSection } from "@/components/sections/hero";
import { MapSection } from "@/components/sections/map";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { TransmissionSection } from "@/components/sections/transmission";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhatsAppFloatingButton } from "@/components/sections/whatsapp-floating-button";

type SitePageProps = {
  brandDisplay?: "names" | "logos";
};

export function SitePage({ brandDisplay = "names" }: SitePageProps) {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />
      <main id="conteudo">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <TransmissionSection />
        <ProcessSection />
        <DifferentialsSection />
        <StatsSection />
        <BrandsSection display={brandDisplay} />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <MapSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <BookingModalLoader />
    </div>
  );
}
