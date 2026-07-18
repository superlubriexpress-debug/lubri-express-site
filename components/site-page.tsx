import { Navbar } from "@/components/navbar";
import { BrandsSection } from "@/components/sections/brands";
import { AboutSection } from "@/components/sections/about";
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
import { getPublicSiteSettings } from "@/lib/site-settings";

type SitePageProps = {
  brandDisplay?: "names" | "logos";
};

export async function SitePage({ brandDisplay = "logos" }: SitePageProps) {
  const settings = await getPublicSiteSettings();

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={settings} />
      <main id="conteudo">
        <HeroSection settings={settings} />
        <TrustBar />
        <ServicesSection />
        <TransmissionSection />
        <ProcessSection />
        <DifferentialsSection />
        <AboutSection />
        <StatsSection />
        <BrandsSection display={brandDisplay} />
        <GallerySection />
        <TestimonialsSection settings={settings} />
        <FAQSection />
        <CTASection settings={settings} />
        <MapSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}
