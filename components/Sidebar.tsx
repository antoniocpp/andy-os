"use client";
import { LayoutDashboard, HardHat, Building2, TrendingUp, FileStack, Radar, Brain, Cpu, Settings2 } from "lucide-react";

const NAV_ITEMS = [
  { section: "Operações", items: [
    { icon: LayoutDashboard, label: "Cockpit", href: "/" },
    { icon: HardHat, label: "Obras", href: "/obras" },
    { icon: Building2, label: "Imóveis", href: "/imoveis" },
    { icon: TrendingUp, label: "Investimentos", href: "/investimentos" },
  ]},
  { section: "Inteligência", items: [
    { icon: FileStack, label: "Documentos", href: "/documentos" },
    { icon: Radar, label: "Radar", href: "/radar" },
    { icon: Brain, label: "Memória", href: "/memoria" },
  ]},
  { section: "Sistema", items: [
    { icon: Cpu, label: "Andy", href: "/andy" },
    { icon: Settings2, label: "Config", href: "/config" },
  ]},
];

export function Sidebar({ activePath = "/", skillsCount = 29, mcpCount = 4 }: { activePath?: string; skillsCount?: number; mcpCount?: number }) {
  return (
    <aside style={{ width: 240, minWidth: 240, background: "linear-gradient(180deg, #05080C 0%, #07111A 100%)", borderRight: "1px solid #1B2A36", display: "flex", flexDirection: "column", height: "100vh", position: "relative", zIndex: 20 }}>
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid #1B2A36" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F4F7FA" }}>ANDY<span style={{ color: "#F0B84A" }}> OS</span></div>
        <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6F7D89", marginTop: 3 }}>NanoClaw Command · v1.0</div>
      </div>
      <nav style={{ padding: "14px 10px", flex: 1, overflowY: "auto" }}>
        {NAV_ITEMS.map(group => (
          <div key={group.section}>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6F7D89", padding: "0 8px", marginBottom: 4, marginTop: 14 }}>{group.section}</div>
            {group.items.map(item => {
              const active = activePath === item.href;
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 9, height: 42, padding: "0 10px", borderRadius: 10, marginBottom: 1, textDecoration: "none", fontSize: 13.5, fontWeight: 500, borderLeft: active ? "3px solid #D39A2E" : "3px solid transparent", background: active ? "linear-gradient(90deg, rgba(211,154,46,0.20), rgba(211,154,46,0.04))" : "transparent", color: active ? "#F4F7FA" : "#AAB6C2" }}>
                  <Icon size={16} style={{ flexShrink: 0, color: active ? "#F0B84A" : "inherit" }} />
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
      <div style={{ padding: 14, borderTop: "1px solid #1B2A36" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "rgba(68,208,131,0.07)", border: "1px solid rgba(68,208,131,0.22)", borderRadius: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#44D083", flexShrink: 0 }} />
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 10, fontWeight: 500, color: "#44D083" }}>ANDY OPERACIONAL</span>
        </div>
        <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 9, color: "#6F7D89", textAlign: "center", marginTop: 7 }}>claude-sonnet-4-6 · {skillsCount} skills · {mcpCount} MCPs</div>
      </div>
    </aside>
  );
}
