import { PageShell } from "@/components/PageShell";
import { FileStack, Upload, Search, Database } from "lucide-react";

export default function DocumentosPage() {
  return (
    <PageShell activePath="/documentos" title="Documentos" path="RAG · Docling">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:4 }}>
          {[
            { label:"Pipeline RAG", value:"Docling", sub:"PDF → chunks → pgvector", color:"#27B6D6", ok:true },
            { label:"Documentos", value:"0", sub:"Nenhum indexado ainda", color:"#F0B84A", ok:false },
            { label:"Embeddings", value:"0", sub:"pgvector · local", color:"#44D083", ok:false },
          ].map(s=>(
            <div key={s.label} style={{ padding:"14px",background:"rgba(16,27,37,0.8)",border:`1px solid ${s.color}25`,borderRadius:12 }}>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",marginBottom:6,letterSpacing:"0.1em",textTransform:"uppercase" }}>{s.label}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:18,fontWeight:700,color:s.color,lineHeight:1 }}>{s.value}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:s.ok?"#44D083":"#6F7D89",marginTop:5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:18,fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8 }}>Como Funciona</div>
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          {[
            { icon:<Upload size={13} color="#F0B84A" />, label:"Upload de PDF", desc:"Envie um PDF para Andy via Telegram — contratos, laudos, orçamentos, estudos" },
            { icon:<Database size={13} color="#27B6D6" />, label:"Indexação Docling", desc:"Docling extrai texto, tabelas e estrutura → chunking → embeddings pgvector" },
            { icon:<Search size={13} color="#44D083" />, label:"Query Semântica", desc:"\"Andy, quais contratos vencem em 2026?\" → Andy busca semanticamente no vault" },
          ].map((s,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:10,padding:"12px 14px",background:"rgba(16,27,37,0.6)",border:"1px solid #1B2A36",borderRadius:10 }}>
              <div style={{ marginTop:1 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:12,fontWeight:700,color:"#F4F7FA",marginBottom:3 }}>{s.label}</div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",lineHeight:1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:24,padding:"16px",background:"rgba(200,232,0,0.04)",border:"1px solid rgba(200,232,0,0.18)",borderRadius:12,display:"flex",alignItems:"center",gap:10 }}>
          <FileStack size={16} color="#C8E800" />
          <div>
            <div style={{ fontSize:12,fontWeight:700,color:"#C8E800",marginBottom:2 }}>Em desenvolvimento</div>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Envie contratos, laudos ou estudos para Andy indexar. Próxima sessão: configurar Docling + pgvector.</div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
