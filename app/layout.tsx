import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { company } from "@/lib/site-data";
import { localBusinessSchema } from "@/lib/schema";

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

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} | Oficina em Itapetininga`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "Lubri Express",
    "auto center Itapetininga",
    "troca de óleo Itapetininga",
    "câmbio automático com máquina",
    "diagnóstico eletrônico",
    "revisão preventiva",
    "alinhamento e balanceamento",
  ],
  authors: [{ name: "Lubri Express Auto Center" }],
  creator: "Lubri Express Auto Center",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${company.name} | Oficina em Itapetininga`,
    description: company.description,
    url: company.siteUrl,
    siteName: company.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/real/fachada.jpg",
        width: 1200,
        height: 630,
        alt: "Fachada da Lubri Express Auto Center em Itapetininga",
      },
    ],
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
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </body>
    </html>
  );
}
