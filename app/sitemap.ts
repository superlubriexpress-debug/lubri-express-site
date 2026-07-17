import type { MetadataRoute } from "next";

import { company } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: company.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${company.siteUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${company.siteUrl}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
