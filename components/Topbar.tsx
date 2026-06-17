"use client";
import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";

export function Topbar({ title, path = "Visão Geral" }: { title: string; path?: string }) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("pt-BR", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header style={{ height: 58, minHeight: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", borderBottom: "1px solid #1B2A36", background: "rgba(5,8,12,0.85)", backdropFilter: "blur(14px)", zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</span>
        <span style={{ color: "#273644", fontFamily: '"IBM Plex Mono", monospace' }}>/</span>
        <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, color: "#6F7D89" }}>{path}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12, color: "#6F7D89" }}>{time}</span>
        {[Bell, Search].map((Icon, i) => (
          <button key={i} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #273644", background: "transparent", color: "#AAB6C2", cursor: "pointer" }}><Icon size={15} /></button>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 10px 4px 6px", background: "rgba(211,154,46,0.07)", border: "1px solid rgba(211,154,46,0.18)", borderRadius: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "radial-gradient(circle, rgba(211,154,46,0.5), rgba(39,182,214,0.2))", border: "1px solid rgba(211,154,46,0.4)" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#F4F7FA" }}>Antonio</span>
        </div>
      </div>
    </header>
  );
}
