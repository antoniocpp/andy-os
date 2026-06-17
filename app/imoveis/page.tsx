import { PageShell } from "@/components/PageShell";
import { Building2, CheckCircle2, AlertCircle } from "lucide-react";

const IMOVEIS = [
  { nome: "Holding Pestana Pavan", tipo: "Portfólio Familiar", status: "ativo", receita: "R$ 147k/mês", capRate: "7,2%", yield_: "8,1%", area: "—", obs: "Portfólio diversificado de imóveis para renda", accent: "#F0B84A" },
  { nome: "Galpão Mogi", tipo: "Industrial", status: "em análise", receita: "A definir", capRate: "—", yield_: "—", area: "2.400 m²", obs: "Retrofit vs nova construção — análise em andamento", accent: "#F59E0B" },
  { nome: "Condomínio Guararema", tipo: "Loteamento", status: "aprovação", receita: "Projetado", capRate: "—", yield_: "—", area: "22 lotes", obs: "Aprovação municipal em andamento", accent: "#44D083" },
];

const KPIS = [
  { label: "Patrimônio Total", value: "R$ 5,2M", change: "+3% vs ano ant.", ok: true, accent: "#F0B84A" },
  { label: "Receita Mensal", value: "R$ 147k", change: "+12% vs mês ant.", ok: true, accent: "#27B6D6" },
  { label: "Cap Rate Médio", value: "7,2%", change: "Meta: 8%", ok: false, accent: "#F0B84A" },
  { label: "Vacância", value: "0%", change: "Todos alugados", ok: true, accent: "#44D083" },
];

const ALERTAS = [
  { msg: "Reajuste IGPM pendente — verificar contratos da Holding", tipo: "warning" },
  { msg: "Condomínio Guararema: aguardando resposta da prefeitura", tipo: "info" },
  { msg: "Galpão Mogi: avaliação técnica de retrofit necessária", tipo: "warning" },
];

export default function ImoveisPage() {
  return (
    <PageShell activePath="/imoveis" title="Imóveis" path="Holding Pestana Pavan">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 4 }}>
          {KPIS.map(k => (
            <div key={k.label} style={{ padding: "12px 14px", background: "rgba(16,27,37,0.8)", border: `1px solid ${k.accent}28`, borderRadius: 12 }}>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6F7D89" }}>{k.label}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:20,fontWeight:700,color:k.accent,marginTop:6,lineHeight:1 }}>{k.value}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:k.ok?"#44D083":"#F59E0B",marginTop:4 }}>{k.change}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Portfólio</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {IMOVEIS.map(im => (
            <div key={im.nome} style={{ display:"grid",gridTemplateColumns:"1fr auto",padding:"14px 16px",background:"rgba(16,27,37,0.72)",border:`1px solid ${im.accent}22`,borderRadius:12 }}>
              <div>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:5 }}>
                  <Building2 size={14} color={im.accent} />
                  <span style={{ fontSize:14,fontWeight:700,color:"#F4F7FA" }}>{im.nome}</span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:600,padding:"2px 7px",borderRadius:5,background:`${im.accent}18`,color:im.accent,border:`1px solid ${im.accent}35` }}>{im.status}</span>
                </div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>{im.tipo} {im.area !== "—" ? `· ${im.area}` : ""} · {im.obs}</div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4 }}>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:13,fontWeight:700,color:im.accent }}>{im.receita}</div>
                {im.capRate !== "—" && (
                  <div style={{ display:"flex",gap:8 }}>
                    <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Cap Rate: <span style={{ color:"#AAB6C2" }}>{im.capRate}</span></span>
                    <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Yield: <span style={{ color:"#AAB6C2" }}>{im.yield_}</span></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Pendências</div>
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          {ALERTAS.map((a,i) => (
            <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:8,padding:"9px 12px",borderRadius:8,background:a.tipo==="warning"?"rgba(245,158,11,0.06)":"rgba(39,182,214,0.06)",border:`1px solid ${a.tipo==="warning"?"rgba(245,158,11,0.22)":"rgba(39,182,214,0.22)"}`}}>
              <AlertCircle size={13} color={a.tipo==="warning"?"#F59E0B":"#27B6D6"} style={{ marginTop:1,flexShrink:0 }} />
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:11,color:"#AAB6C2" }}>{a.msg}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop:18,padding:"12px 14px",borderRadius:10,background:"rgba(68,208,131,0.05)",border:"1px solid rgba(68,208,131,0.15)",display:"flex",gap:8 }}>
          <CheckCircle2 size={14} color="#44D083" style={{ flexShrink:0,marginTop:1 }} />
          <div>
            <div style={{ fontSize:12,fontWeight:600,color:"#F4F7FA",marginBottom:3 }}>Análise Andy</div>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#AAB6C2",lineHeight:1.6 }}>Cap Rate de 7,2% está abaixo da meta de 8%. Reajuste IGPM pode recuperar ~0,5pp. Galpão Mogi representa a maior oportunidade de alavancagem.</div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
