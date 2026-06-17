import { PageShell } from "@/components/PageShell";
import { Brain, Zap, Database, Mic, Workflow, BookOpen } from "lucide-react";

const SKILLS = [
  { grupo: "Superpowers", count: 14, color: "#27B6D6", items: ["brainstorming","TDD","debugging","agentes paralelos","engenharia de prompt","análise de código","arquitetura de sistemas","análise de risco","storytelling","planejamento estratégico","análise financeira","engenharia civil","gestão de obras","desenvolvimento imobiliário"] },
  { grupo: "UI/UX Pro Max", count: 1, color: "#F0B84A", items: ["67 estilos de UI","161 paletas","57 fontes","99 regras UX","dark mode","motion design","design systems"] },
  { grupo: "N8N", count: 9, color: "#44D083", items: ["workflow-patterns","node-config","expressions","triggers","error handling","HTTP requests","data transformation","scheduling","webhooks"] },
  { grupo: "Obsidian", count: 5, color: "#AAB6C2", items: ["markdown","bases de dados","defuddle","json-canvas","dataview"] },
];

const MCPS = [
  { name: "N8N MCP", desc: "Criação e gestão de workflows", status: "ativo", color: "#44D083" },
  { name: "Supabase MCP", desc: "Banco de dados local + RAG", status: "ativo", color: "#44D083" },
  { name: "NanoClaw MCP", desc: "Mensagens, tarefas e agentes", status: "ativo", color: "#44D083" },
  { name: "Obsidian MCP", desc: "Vault + notas (via filesystem)", status: "ativo", color: "#44D083" },
];

export default function InteligenciaPage() {
  return (
    <PageShell activePath="/inteligencia" title="Inteligência" path="Capacidades Andy">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:4 }}>
          {[
            { label:"Modelo", value:"Claude Sonnet 4.6", icon:<Brain size={16} color="#27B6D6" />, accent:"#27B6D6" },
            { label:"Total Skills", value:"29 skills", icon:<Zap size={16} color="#F0B84A" />, accent:"#F0B84A" },
            { label:"MCPs Ativos", value:"4 servidores", icon:<Database size={16} color="#44D083" />, accent:"#44D083" },
          ].map(c=>(
            <div key={c.label} style={{ padding:"14px 16px",background:"rgba(16,27,37,0.8)",border:`1px solid ${c.accent}28`,borderRadius:12 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>{c.icon}<span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",letterSpacing:"0.1em",textTransform:"uppercase" }}>{c.label}</span></div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:16,fontWeight:700,color:c.accent }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>MCPs Conectados</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          {MCPS.map(m=>(
            <div key={m.name} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(16,27,37,0.6)",border:"1px solid #1B2A36",borderRadius:9 }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:m.color,flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12,fontWeight:600,color:"#F4F7FA" }}>{m.name}</div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",marginTop:1 }}>{m.desc}</div>
              </div>
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:m.color,padding:"1px 6px",borderRadius:4,background:`${m.color}12`,border:`1px solid ${m.color}25` }}>{m.status}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Skills por Grupo</div>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {SKILLS.map(g=>(
            <div key={g.grupo} style={{ padding:"14px",background:"rgba(16,27,37,0.6)",border:`1px solid ${g.color}20`,borderRadius:11 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                <span style={{ fontSize:13,fontWeight:700,color:"#F4F7FA" }}>{g.grupo}</span>
                <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:g.color,padding:"2px 8px",borderRadius:5,background:`${g.color}12`,border:`1px solid ${g.color}25` }}>{g.count} skills</span>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
                {g.items.map(it=><span key={it} style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#AAB6C2",padding:"2px 7px",borderRadius:4,background:"rgba(10,22,33,0.7)",border:"1px solid #1B2A36" }}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Capacidades Especiais</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8 }}>
          {[
            { icon:<Mic size={14} color="#27B6D6" />, label:"Transcrição de Voz", detail:"Groq Whisper large-v3 · PT-BR otimizado", color:"#27B6D6" },
            { icon:<Database size={14} color="#F0B84A" />, label:"RAG Semântico", detail:"Docling PDF → pgvector → query semântica", color:"#F0B84A" },
            { icon:<Workflow size={14} color="#44D083" />, label:"Automação N8N", detail:"Criação e execução de workflows automatizados", color:"#44D083" },
            { icon:<BookOpen size={14} color="#AAB6C2" />, label:"Memória Persistente", detail:"Obsidian vault + histórico de conversas", color:"#AAB6C2" },
          ].map(c=>(
            <div key={c.label} style={{ display:"flex",alignItems:"flex-start",gap:10,padding:"12px 14px",background:"rgba(16,27,37,0.6)",border:`1px solid ${c.color}18`,borderRadius:10 }}>
              <div style={{ marginTop:1 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:"#F4F7FA",marginBottom:3 }}>{c.label}</div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",lineHeight:1.5 }}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
