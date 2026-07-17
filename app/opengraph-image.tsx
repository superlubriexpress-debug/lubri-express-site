import { ImageResponse } from "next/og";

export const alt = "Lubri Express Auto Center em Itapetininga";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(135deg, #050505 0%, #111111 46%, #ffc400 46%, #ffc400 50%, #151515 50%, #050505 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 110,
            display: "flex",
            width: 300,
            height: 300,
            border: "18px solid #ffc400",
            borderRadius: 999,
            opacity: 0.9,
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", width: 760, padding: "64px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 86,
                height: 86,
                borderRadius: 999,
                background: "#ffc400",
                color: "#111111",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              L
            </div>
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
