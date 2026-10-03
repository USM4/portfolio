import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${profile.name} - E-commerce & Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const knife = `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 32" width="640" height="160"><path d="M46 11.6 H94 L124 16 H46 Z" fill="#ececf1"/><path d="M46 16 H124 L103 20.4 H46 Z" fill="#a3a3ae"/><path d="M50 14.6 H88" stroke="#6c6c78" stroke-width="1.4" stroke-linecap="round"/><path d="M46 20.4 H103 L122.5 16.3" fill="none" stroke="#c6ff3d" stroke-width="1.6" stroke-linecap="round"/><rect x="41.5" y="7.5" width="4.5" height="17" rx="1" fill="#d6d6de"/><circle cx="43.75" cy="4.6" r="3" fill="none" stroke="#d6d6de" stroke-width="1.8"/><rect x="10" y="11.2" width="31.5" height="9.6" rx="2" fill="#2b2b33" stroke="#55555f" stroke-width="0.8"/><path d="M10 10.2 H5 Q3 10.2 3 12.2 V19.8 Q3 21.8 5 21.8 H10 Z" fill="#d6d6de"/></svg>`).toString("base64")}`;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07070a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ededef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              border: "2px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c6ff3d",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {"4"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>USM4</div>
            <div style={{ fontSize: 22, color: "#8b8b94" }}>{profile.name}</div>
          </div>
          <img src={knife} width={420} height={105} style={{ marginLeft: "auto" }} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            I build commerce systems.
          </div>
          <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, color: "#8b8b94" }}>
            End to end.
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 26, color: "#c6ff3d" }}>
          <span>WooCommerce</span>
          <span>Shopify</span>
          <span>Laravel</span>
          <span>Next.js</span>
          <span>Docker</span>
        </div>
      </div>
    ),
    size,
  );
}
