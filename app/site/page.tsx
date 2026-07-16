import type { Metadata } from "next";

import { SitePage } from "@/components/site-page";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function SitePreviewPage() {
  return <SitePage brandDisplay="logos" />;
}
