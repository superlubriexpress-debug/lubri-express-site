import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { SourceShortcutGuard } from "@/components/security/source-shortcut-guard";
import { company } from "@/lib/site-data";
import { autoRepairSchema } from "@/lib/schema";
import { getPublicSiteSettings } from "@/lib/site-settings";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const seoTitle = "Lubri Express Auto Center | Mecânica, Elétrica e Câmbio em Itapetininga";
const seoDescription =
  "Lubri Express Auto Center em Itapetininga: mecânica geral, elétrica automotiva, troca de óleo de motor, câmbio automático com máquina, freios, suspensão e higienização de ar-condicionado. Comprou pneus no Tenda? Ganhe alinhamento grátis na Lubri Express.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: seoTitle,
    template: `%s | ${company.name}`,
  },
  description: seoDescription,
  keywords: [
    "Lubri Express",
    "Lubri Express Auto Center",
    "mecânica em Itapetininga",
    "elétrica automotiva em Itapetininga",
    "troca de óleo em Itapetininga",
    "óleo de câmbio automático com máquina",
    "troca de correia dentada",
    "motor de partida",
    "alternador",
    "limpeza de bicos",
    "alinhamento e balanceamento",
    "alinhamento grátis Tenda",
  ],
  authors: [{ name: "Lubri Express Auto Center" }],
  creator: "Gean Maikon",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: company.siteUrl,
    siteName: company.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fachada da Lubri Express Auto Center em Itapetininga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description:
      "Mecânica, elétrica automotiva, troca de óleo, câmbio automático com máquina e parceria de alinhamento grátis com o Tenda em Itapetininga.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getPublicSiteSettings();

  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SourceShortcutGuard />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <Script
          id="lubri-express-auto-repair-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRepairSchema(settings)) }}
        />
      </body>
    </html>
  );
}
