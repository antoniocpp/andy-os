"use client";

type OrbStatus = "online" | "processing" | "warning" | "critical" | "offline";
const STATUS_COLORS: Record<OrbStatus, { primary: string; secondary: string }> = {
  online: { primary: "rgba(211,154,46,0.65)", secondary: "rgba(39,182,214,0.22)" },
  processing: { primary: "rgba(39,182,214,0.65)", secondary: "rgba(39,182,214,0.65)" },
  warning: { primary: "rgba(245,158,11,0.65)", secondary: "rgba(245,158,11,0.22)" },
  critical: { primary: "rgba(229,72,77,0.65)", secondary: "rgba(229,72,77,0.22)" },
  offline: { primary: "rgba(107,125,137,0.5)", secondary: "rgba(107,125,137,0.2)" },
};
const STATUS_LABEL: Record<OrbStatus, string> = { online: "● ATIVO", processing: "◌ PROCESSANDO", warning: "⚠ ATENÇÃO", critical: "! CRÍTICO", offline: "○ OFFLINE" };

export function SystemOrb({ status = "online", size = 110 }: { status?: OrbStatus; size?: number }) {
  const colors = STATUS_COLORS[status];
  const innerSize = Math.round(size * 0.727);
  const ring1Size = Math.round(size * 0.91);
  const ring2Size = Math.round(size * 1.11);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: size, height: size, borderRadius: "50%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(circle, rgba(39,182,214,0.16) 0%, transparent 70%), conic-gradient(from 180deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})` }}>
        <div style={{ position: "absolute", width: ring1Size, height: ring1Size, borderRadius: "50%", border: "1px solid rgba(211,154,46,0.18)" }} />
        <div style={{ position: "absolute", width: ring2Size, height: ring2Size, borderRadius: "50%", border: "1px dashed rgba(39,182,214,0.10)", animation: "spin 24s linear infinite" }} />
        <div style={{ width: innerSize, height: innerSize, borderRadius: "50%", background: "radial-gradient(circle, #0A1621 0%, #07111A 55%, #05080C 100%)", border: "1px solid rgba(39,182,214,0.18)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 8, fontWeight: 600, letterSpacing: "0.1em", color: "#27B6D6", textAlign: "center", lineHeight: 1.3 }}>ANDY<br />ONLINE</div>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: "#44D083" }}>{STATUS_LABEL[status]}</div>
        </div>
      </div>
    </div>
  );
}
