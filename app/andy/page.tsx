import { PageShell } from "@/components/PageShell";
import { SystemOrb } from "@/components/SystemOrb";

const INFO = [
  { label: "Nome", value: "Andy" },
  { label: "Modelo", value: "claude-sonnet-4-6" },
  { label: "Fornecedor", value: "Anthropic" },
  { label: "Knowledge cutoff", value: "August 2025" },
  { label: "Plataforma", value: "NanoClaw Agent SDK" },
  { label: "Canal", value: "Telegram mg-17816" },
  { label: "Workspace", value: "/workspace/agent/" },
  { label: "Vault", value: "/workspace/extra/vault (~/Documents/Andy)" },
];

const PAPEIS = ["Chief of Staff","Analista estratégico","Gerente de projetos","Engenheiro civil (consultivo)","Consultor imobiliário","Arquiteto de viabilidade","Especialista em automação IA"];

export default function AndyPage() {
  return (
    <PageShell activePath="/andy" title="Andy" path="Sistema">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:20,padding:"18px 20px",background:"rgba(16,27,37,0.8)",border:"1px solid rgba(240,184,74,0.22)",borderRadius:14,marginBottom:4 }}>
          <SystemOrb status="online" size={80} />
          <div>
            <div style={{ fontSize:22,fontWeight:700,color:"#F4F7FA" }}>Andy</div>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#6F7D89",marginTop:2 }}>NanoClaw Command · Chief of Staff de Antonio Pavan</div>
            <div style={{ display:"flex",gap:5,marginTop:8,flexWrap:"wrap" }}>
              {["claude-sonnet-4-6","ONLINE","4 MCPs","29 skills"].map(t=>(
                <span key={t} style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,padding:"2px 7px",borderRadius:5,background:"rgba(240,184,74,0.1)",color:"#F0B84A",border:"1px solid rgba(240,184,74,0.25)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop:18,fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8 }}>Papéis</div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
          {PAPEIS.map(p=><span key={p} style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,padding:"5px 10px",borderRadius:7,background:"rgba(16,27,37,0.7)",border:"1px solid #1B2A36",color:"#AAB6C2" }}>{p}</span>)}
        </div>
        <div style={{ marginTop:18,fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8 }}>Informações do Sistema</div>
        <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
          {INFO.map(i=>(
            <div key={i.label} style={{ display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:"rgba(16,27,37,0.6)",border:"1px solid #1B2A36",borderRadius:8 }}>
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",minWidth:140,flexShrink:0 }}>{i.label}</span>
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#AAB6C2" }}>{i.value}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
