import { PageShell } from "@/components/PageShell";
import { HardHat, CheckCircle2, AlertCircle } from "lucide-react";

const CENARIOS = [
  { titulo: "Retrofit", descricao: "Modernização do galpão existente: estrutura, cobertura, elétrica, fachada", investimento: "R$ 280–350k", aluguel: "R$ 18–22k/mês", payback: "~16 meses", pros: ["Menor investimento inicial","Mais rápido (3–4 meses)","Preserva estrutura existente"], contras: ["Limitações estruturais","Menor vida útil","Risco de imprevistos"], recomendado: true, accent: "#44D083" },
  { titulo: "Nova Construção", descricao: "Demolição e construção de galpão moderno com especificações atuais", investimento: "R$ 720k–1M", aluguel: "R$ 28–35k/mês", payback: "~26 meses", pros: ["Maior valor de mercado","Melhor especificação","Vida útil longa"], contras: ["Alto investimento","Prazo 8–12 meses","Maior risco de execução"], recomendado: false, accent: "#27B6D6" },
];

const STATUS_ITEMS = [
  { label: "Status", value: "Em análise", ok: null },
  { label: "Área Total", value: "2.400 m²", ok: true },
  { label: "Localização", value: "Mogi das Cruzes/SP", ok: true },
  { label: "Uso Atual", value: "Galpão industrial", ok: true },
  { label: "Situação", value: "Desocupado", ok: false },
  { label: "Próx. passo", value: "Laudo técnico", ok: null },
];

export default function ObrasPage() {
  return (
    <PageShell activePath="/obras" title="Obras" path="Galpão Mogi">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr auto",padding:"16px 18px",background:"rgba(16,27,37,0.8)",border:"1px solid rgba(245,158,11,0.25)",borderRadius:14,marginBottom:4 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:6 }}>
              <HardHat size={16} color="#F59E0B" />
              <span style={{ fontSize:16,fontWeight:700,color:"#F4F7FA" }}>Galpão Mogi das Cruzes</span>
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:600,padding:"2px 7px",borderRadius:5,background:"rgba(245,158,11,0.14)",color:"#F59E0B",border:"1px solid rgba(245,158,11,0.35)" }}>em análise</span>
            </div>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#6F7D89" }}>Galpão industrial · Mogi das Cruzes/SP · Decisão: retrofit ou nova construção</div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3 }}>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:20,fontWeight:700,color:"#F59E0B" }}>2.400 m²</div>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>area total</div>
          </div>
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Status Atual</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
          {STATUS_ITEMS.map(s => (
            <div key={s.label} style={{ padding:"10px 12px",background:"rgba(16,27,37,0.6)",border:"1px solid #1B2A36",borderRadius:9 }}>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",marginBottom:4 }}>{s.label}</div>
              <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                {s.ok !== null && <div style={{ width:5,height:5,borderRadius:"50%",background:s.ok?"#44D083":"#E5484D",flexShrink:0 }} />}
                <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:11,fontWeight:600,color:"#F4F7FA" }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Cenários de Desenvolvimento</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          {CENARIOS.map(c => (
            <div key={c.titulo} style={{ padding:"16px",background:"rgba(16,27,37,0.72)",border:`2px solid ${c.recomendado?c.accent+"45":"#1B2A36"}`,borderRadius:12,position:"relative" }}>
              {c.recomendado && <div style={{ position:"absolute",top:-10,right:12,fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,padding:"2px 8px",borderRadius:20,background:c.accent,color:"#05080C" }}>RECOMENDADO</div>}
              <div style={{ fontSize:14,fontWeight:700,color:"#F4F7FA",marginBottom:4 }}>{c.titulo}</div>
              <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",marginBottom:10 }}>{c.descricao}</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,margin:"12px 0" }}>
                {[["Investimento",c.investimento,"#F4F7FA"],["Aluguel/mês",c.aluguel,c.accent],["Payback",c.payback,"#AAB6C2"]].map(([l,v,col])=>(
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:7,color:"#6F7D89",marginBottom:2 }}>{l}</div>
                    <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,fontWeight:700,color:col as string }}>{v}</div>
                  </div>
                ))}
              </div>
              {c.pros.map(p=><div key={p} style={{ display:"flex",alignItems:"center",gap:5,marginBottom:3 }}><CheckCircle2 size={10} color="#44D083" /><span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#AAB6C2" }}>{p}</span></div>)}
              {c.contras.map(p=><div key={p} style={{ display:"flex",alignItems:"center",gap:5,marginBottom:3 }}><AlertCircle size={10} color="#E5484D" /><span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>{p}</span></div>)}
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8,marginTop:18 }}>Próximos Passos</div>
        <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
          {[["1","Contratar laudo técnico estrutural (R$ 3–5k)","#F0B84A"],["2","Levantar orçamentos de retrofit com 3 construtoras","#27B6D6"],["3","Pesquisar demanda de mercado: galpões em Mogi","#27B6D6"],["4","Decisão final: retrofit vs nova construção","#44D083"]].map(([n,t,c])=>(
            <div key={n} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"rgba(16,27,37,0.6)",border:"1px solid #1B2A36",borderRadius:8 }}>
              <div style={{ width:20,height:20,borderRadius:"50%",background:`${c}18`,border:`1px solid ${c}35`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:'"IBM Plex Mono",monospace',fontSize:9,fontWeight:700,color:c as string,flexShrink:0 }}>{n}</div>
              <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#AAB6C2" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
