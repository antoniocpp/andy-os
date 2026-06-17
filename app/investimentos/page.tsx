import { PageShell } from "@/components/PageShell";
import { TrendingUp, Target, CheckCircle2 } from "lucide-react";

const KPIS = [
  { label: "Patrimônio Total", value: "R$ 5,2M", change: "+3% vs ano ant.", ok: true, accent: "#F0B84A", sub: "Imóveis + ativos" },
  { label: "Receita Mensal", value: "R$ 147k", change: "+12% vs mês ant.", ok: true, accent: "#27B6D6", sub: "Aluguéis + outros" },
  { label: "Oportunidades Ativas", value: "4", change: "2 novas este mês", ok: true, accent: "#44D083", sub: "Em avaliação" },
  { label: "Cap Rate Médio", value: "7,2%", change: "Meta: 8,0%", ok: false, accent: "#F0B84A", sub: "Portfólio atual" },
];

const OPORTUNIDADES = [
  { nome: "Condomínio de Lotes Guararema", tipo: "Desenvolvimento", tir: "22–28%", investimento: "R$ 800k–1,2M", prazo: "24–36 meses", risco: "médio", status: "aprovação", accent: "#44D083" },
  { nome: "Retrofit Galpão Mogi", tipo: "Melhoria Ativo", tir: "18–24%", investimento: "R$ 280–350k", prazo: "3–4 meses", risco: "baixo", status: "análise técnica", accent: "#F59E0B" },
  { nome: "Aquisição — Mogi/Guararema", tipo: "Aquisição", tir: "A avaliar", investimento: "A definir", prazo: "A definir", risco: "—", status: "radar", accent: "#27B6D6" },
  { nome: "Expansão Holding", tipo: "Portfólio", tir: "A avaliar", investimento: "A definir", prazo: "2026", risco: "baixo", status: "planejamento", accent: "#AAB6C2" },
];

const RISCO_COLOR: Record<string, string> = { baixo: "#44D083", médio: "#F59E0B", alto: "#E5484D", "—": "#6F7D89" };

export default function InvestimentosPage() {
  return (
    <PageShell activePath="/investimentos" title="Investimentos" path="Portfólio & Oportunidades">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10 }}>
          {KPIS.map(k=>(
            <div key={k.label} style={{ padding:"14px 16px",background:"rgba(16,27,37,0.8)",border:`1px solid ${k.accent}28`,borderRadius:13 }}>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6F7D89",marginBottom:6 }}>{k.label}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:22,fontWeight:700,color:k.accent,lineHeight:1 }}>{k.value}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:k.ok?"#44D083":"#F59E0B",marginTop:5 }}>{k.change}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",marginTop:2 }}>{k.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Oportunidades em Avaliação</div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {OPORTUNIDADES.map(op=>(
            <div key={op.nome} style={{ display:"grid",gridTemplateColumns:"1fr auto",padding:"14px 16px",background:"rgba(16,27,37,0.72)",border:`1px solid ${op.accent}22`,borderRadius:12 }}>
              <div>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:5 }}>
                  <Target size={13} color={op.accent} />
                  <span style={{ fontSize:13,fontWeight:700,color:"#F4F7FA" }}>{op.nome}</span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:600,padding:"1px 6px",borderRadius:4,background:`${op.accent}15`,color:op.accent,border:`1px solid ${op.accent}30` }}>{op.status}</span>
                </div>
                <div style={{ display:"flex",gap:16 }}>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Tipo: <span style={{ color:"#AAB6C2" }}>{op.tipo}</span></span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Prazo: <span style={{ color:"#AAB6C2" }}>{op.prazo}</span></span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Risco: <span style={{ color:RISCO_COLOR[op.risco]??"#6F7D89" }}>{op.risco}</span></span>
                </div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3 }}>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:12,fontWeight:700,color:op.accent }}>{op.tir} TIR</div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>{op.investimento}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Estratégia 2026</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          {[
            { icon: CheckCircle2, color:"#44D083", titulo:"Curto prazo (0–6 meses)", items:["Reajuste IGPM Holding","Retrofit Galpão Mogi","Laudo técnico + orçamentos"] },
            { icon: TrendingUp, color:"#27B6D6", titulo:"Médio prazo (6–24 meses)", items:["Aprovação Condomínio Guararema","Lançamento e vendas de lotes","Avaliação de nova aquisição"] },
          ].map(bloco=>(
            <div key={bloco.titulo} style={{ padding:"14px",background:"rgba(16,27,37,0.6)",border:`1px solid ${bloco.color}18`,borderRadius:10 }}>
              <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:10 }}>
                <bloco.icon size={13} color={bloco.color} />
                <span style={{ fontSize:12,fontWeight:700,color:"#F4F7FA" }}>{bloco.titulo}</span>
              </div>
              {bloco.items.map(it=>(
                <div key={it} style={{ display:"flex",alignItems:"center",gap:7,marginBottom:6 }}>
                  <div style={{ width:4,height:4,borderRadius:"50%",background:bloco.color,flexShrink:0 }} />
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#AAB6C2" }}>{it}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
