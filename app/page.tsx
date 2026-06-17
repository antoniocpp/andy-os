import { PageShell } from "@/components/PageShell";
import { SystemOrb } from "@/components/SystemOrb";
import { LiveActivity } from "@/components/LiveActivity";
import { TaskStrip } from "@/components/TaskStrip";
import { Mic, Database, BookOpen, Workflow, Zap, Cpu, BrainCircuit, Activity } from "lucide-react";
import { fetchActivity } from "@/lib/data";
import type { ActivityEntry } from "@/lib/supabase";

const INTEGRATIONS = [
  { name: "N8N",            detail: "v2.57 · local",        ok: true },
  { name: "Supabase",       detail: "host.docker:54322",    ok: true },
  { name: "Groq / Whisper", detail: "whisper-large-v3",     ok: true },
  { name: "Obsidian Vault", detail: "~/Documents/Andy",     ok: true },
  { name: "Docling",        detail: ".venv · PDF/RAG",      ok: true },
  { name: "Telegram",       detail: "mg-17816 · ativo",     ok: true },
];

const SKILLS_GROUPS = [
  { name: "Superpowers",   count: 14, color: "#27B6D6", tags: ["brainstorming","TDD","debugging","agentes paralelos","+10"] },
  { name: "UI/UX Pro Max", count: 1,  color: "#F0B84A", tags: ["67 estilos","161 paletas","57 fontes","99 UX rules"] },
  { name: "N8N",           count: 9,  color: "#44D083", tags: ["workflow-patterns","node-config","expressions","+6"] },
  { name: "Obsidian",      count: 5,  color: "#AAB6C2", tags: ["markdown","bases","defuddle","json-canvas","+1"] },
];

const CAPABILITIES = [
  { icon: <Mic size={13} color="#27B6D6" />,     label: "Voz",       detail: "Groq Whisper v3" },
  { icon: <Database size={13} color="#F0B84A" />, label: "RAG",       detail: "Docling + pgvector" },
  { icon: <Workflow size={13} color="#44D083" />, label: "Automação", detail: "N8N (0 flows)" },
  { icon: <BookOpen size={13} color="#AAB6C2" />, label: "Memória",   detail: "Obsidian vault" },
  { icon: <Cpu size={13} color="#F0B84A" />,      label: "Modelo",    detail: "Sonnet 4.6" },
  { icon: <Zap size={13} color="#F59E0B" />,      label: "Status",    detail: "idle · aguardando" },
];

function SecLbl({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F7D89", marginBottom: 6, marginTop: 13 }}>{children}</div>;
}

export default async function CockpitPage() {
  const activity = await fetchActivity();
  return (
    <PageShell activePath="/" title="Cockpit" path="Visão Geral">
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", paddingBottom: 60 }}>

        {/* ── LIVE ACTIVITY — topo horizontal ── */}
        <div style={{ flexShrink: 0, borderBottom: "1px solid rgba(68,208,131,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px 7px", borderBottom: "1px solid rgba(68,208,131,0.1)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#44D083", boxShadow: "0 0 7px rgba(68,208,131,0.9)", flexShrink: 0 }} />
            <Activity size={12} color="#44D083" />
            <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#44D083" }}>Live Activity</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(68,208,131,0.25),transparent)" }} />
            <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 8, color: "#6F7D89" }}>sess-active · ag-1781625174579-ris4g3</span>
          </div>
          <TaskStrip initial={activity as ActivityEntry[]} />
        </div>

        {/* ── GRID INFERIOR ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", flex: 1, overflow: "hidden" }}>

          {/* Coluna esquerda — Configuração Andy */}
          <div style={{ borderRight: "1px solid #1B2A36", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px 9px", borderBottom: "1px solid rgba(39,182,214,0.18)" }}>
              <div style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(39,182,214,0.12)", border: "1px solid rgba(39,182,214,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}><BrainCircuit size={13} color="#27B6D6" /></div>
              <span style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#27B6D6" }}>Configuração Andy</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(39,182,214,0.28),transparent)" }} />
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, paddingTop: 12 }}>
                <SystemOrb status="online" size={72} />
                <div>
                  <div style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 11, fontWeight: 600, color: "#F4F7FA" }}>claude-sonnet-4-6</div>
                  <div style={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: 9, color: "#6F7D89", marginTop: 2 }}>Anthropic · Aug 2025 cutoff</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 7, flexWrap: "wrap" }}>
                    {(["29 skills","#27B6D6"],["4 MCPs","#44D083"],["Sonnet 4.6","#F0B84A"]] as [string,string][]).map(([l,c])=>(
                      <span key={l} style={{ padding:"2px 5px",borderRadius:5,fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:500,background:`${c}15`,color:c,border:`1px solid ${c}30` }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
              <SecLbl>Ferramentas Conectadas</SecLbl>
              {INTEGRATIONS.map(i => (
                <div key={i.name} style={{ display:"flex",alignItems:"center",gap:7,padding:"6px 10px",background:"rgba(10,22,33,.5)",border:"1px solid #1B2A36",borderRadius:8,marginBottom:4 }}>
                  <div style={{ width:5,height:5,borderRadius:"50%",background:i.ok?"#44D083":"#E5484D",flexShrink:0 }} />
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:11,fontWeight:500,color:"#AAB6C2",flex:1 }}>{i.name}</span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>{i.detail}</span>
                </div>
              ))}
              <SecLbl>Skills — 29 total</SecLbl>
              {SKILLS_GROUPS.map(g => (
                <div key={g.name} style={{ padding:"8px 11px",background:"rgba(10,22,33,.5)",border:`1px solid ${g.color}22`,borderRadius:8,marginBottom:5 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5 }}>
                    <span style={{ fontSize:12,fontWeight:600,color:"#F4F7FA" }}>{g.name}</span>
                    <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:g.color,padding:"1px 5px",borderRadius:4,background:`${g.color}12`,border:`1px solid ${g.color}25` }}>{g.count}</span>
                  </div>
                  <div style={{ display:"flex",gap:3,flexWrap:"wrap" }}>
                    {g.tags.map(t=><span key={t} style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",padding:"1px 4px",borderRadius:3,border:"1px solid #1B2A36" }}>{t}</span>)}
                  </div>
                </div>
              ))}
              <SecLbl>Capacidades</SecLbl>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:5 }}>
                {CAPABILITIES.map(c=>(
                  <div key={c.label} style={{ display:"flex",alignItems:"center",gap:7,padding:"7px 9px",background:"rgba(10,22,33,.5)",border:"1px solid #1B2A36",borderRadius:8 }}>
                    {c.icon}
                    <div>
                      <div style={{ fontSize:11,fontWeight:600,color:"#AAB6C2" }}>{c.label}</div>
                      <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",marginTop:1 }}>{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna direita — Log de atividade detalhado */}
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 14px 9px",borderBottom:"1px solid rgba(200,232,0,0.12)" }}>
              <div style={{ width:5,height:5,borderRadius:"50%",background:"#C8E800",boxShadow:"0 0 5px rgba(200,232,0,0.6)" }} />
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#C8E800" }}>Log Detalhado</span>
              <div style={{ flex:1,height:1,background:"linear-gradient(90deg,rgba(200,232,0,0.2),transparent)" }} />
            </div>
            <LiveActivity initial={activity as ActivityEntry[]} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
