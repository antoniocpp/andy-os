"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05080C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "linear-gradient(135deg, #D39A2E 0%, #F0B84A 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
            boxShadow: "0 0 28px rgba(211,154,46,0.35)",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 800, color: "#05080C" }}>A</span>
        </div>
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6F7D89",
            marginBottom: 4,
          }}
        >
          NanoClaw Command
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#F4F7FA" }}>
          Andy OS
        </div>
      </div>

      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#F0B84A",
            colorBackground: "#07111A",
            borderRadius: "10px",
            fontFamily: "Inter, sans-serif",
          },
          elements: {
            card: {
              border: "1px solid #1B2A36",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              background: "#07111A",
            },
            headerTitle: { color: "#F4F7FA" },
            headerSubtitle: { color: "#6F7D89" },
            socialButtonsBlockButton: {
              border: "1px solid #1B2A36",
              background: "#0A1621",
              color: "#F4F7FA",
            },
            socialButtonsBlockButton__google: {
              border: "1px solid rgba(240,184,74,0.3)",
            },
            dividerLine: { background: "#1B2A36" },
            dividerText: { color: "#6F7D89" },
            formFieldInput: {
              border: "1px solid #1B2A36",
              background: "#0A1621",
              color: "#F4F7FA",
            },
            footerActionLink: { color: "#F0B84A" },
          },
        }}
      />
    </div>
  );
}
