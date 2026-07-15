import type { MetadataRoute } from "next";

import { company } from "@/lib/site-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description: company.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#FFC400",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
