import { ImageResponse } from "next/og";

import { company } from "@/lib/site-data";

export const alt = "Lubri Express Auto Center em Itapetininga";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const assetBaseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : company.siteUrl;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#111111",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${assetBaseUrl}/assets/real/fachada.jpg`}
          alt=""
          width="1200"
          height="630"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(0,0,0,.96) 0%, rgba(0,0,0,.82) 48%, rgba(0,0,0,.18) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", width: 700, padding: "64px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${assetBaseUrl}/assets/brand/logo.png`} alt="" width="86" height="86" style={{ objectFit: "contain" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 34, lineHeight: 1 }}>Lubri Express</strong>
              <span style={{ marginTop: 8, color: "#ffc400", fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>Auto Center</span>
            </div>
          </div>
          <div style={{ marginTop: 48, fontSize: 58, fontWeight: 800, lineHeight: 1.04 }}>
            Mecânica, elétrica e câmbio em Itapetininga.
          </div>
          <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 12, fontSize: 22 }}>
            <span style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#ffc400" }} />
            Rua Quintino Bocaiuva, 318 - Centro
          </div>
        </div>
        <div style={{ position: "absolute", insetInline: 0, bottom: 0, display: "flex", height: 10, background: "#ffc400" }} />
      </div>
    ),
    size,
  );
}
