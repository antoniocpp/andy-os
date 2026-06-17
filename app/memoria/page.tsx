import { PageShell } from "@/components/PageShell";
import { BookOpen, FolderOpen } from "lucide-react";

const PASTAS = [
  { pasta: "00 - Inbox", desc: "Notas de entrada não organizadas", count: "—", color: "#6F7D89" },
  { pasta: "Projetos", desc: "Holding, Galpão Mogi, Guararema...", count: "7+", color: "#F0B84A" },
  { pasta: "Áreas", desc: "Engenharia, IA, Patrimônio, Família", count: "4+", color: "#27B6D6" },
  { pasta: "Pessoas", desc: "Contatos, parceiros, fornecedores", count: "—", color: "#AAB6C2" },
  { pasta: "Reuniões", desc: "Atas e decisões registradas", count: "—", color: "#44D083" },
  { pasta: "Andy", desc: "Como uso o vault · instruções Andy", count: "2+", color: "#C8E800" },
];

export default function MemoriaPage() {
  return (
    <PageShell activePath="/memoria" title="Memória" path="Obsidian Vault">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:4 }}>
          {[
            { label:"Vault", value:"~/Documents/Andy", color:"#F0B84A" },
            { label:"Status", value:"Ativo", color:"#44D083" },
            { label:"Acesso Andy", value:"Filesystem MCP", color:"#27B6D6" },
          ].map(k=>(
            <div key={k.label} style={{ padding:"12px 14px",background:"rgba(16,27,37,0.8)",border:`1px solid ${k.color}25`,borderRadius:11 }}>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:5 }}>{k.label}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:12,fontWeight:700,color:k.color }}>{k.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:18,fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8 }}>Estrutura do Vault</div>
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          {PASTAS.map(p=>(
            <div key={p.pasta} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(16,27,37,0.6)",border:`1px solid ${p.color}18`,borderRadius:9 }}>
              <FolderOpen size={13} color={p.color} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12,fontWeight:600,color:"#F4F7FA" }}>{p.pasta}</div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",marginTop:1 }}>{p.desc}</div>
              </div>
              {p.count !== "—" && <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:p.color,padding:"1px 6px",borderRadius:4,background:`${p.color}12`,border:`1px solid ${p.color}25` }}>{p.count}</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop:20,padding:"14px",background:"rgba(68,208,131,0.05)",border:"1px solid rgba(68,208,131,0.18)",borderRadius:10,display:"flex",gap:10 }}>
          <BookOpen size={14} color="#44D083" style={{ flexShrink:0,marginTop:1 }} />
          <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",lineHeight:1.6 }}>Andy lê e escreve no vault automaticamente durante as sessões. Perguntas como "O que decidimos sobre o Galpão Mogi?" buscam no vault antes de responder.</div>
        </div>
      </div>
    </PageShell>
  );
}
