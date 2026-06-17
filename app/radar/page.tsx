import { PageShell } from "@/components/PageShell";
import { Radar, MapPin } from "lucide-react";

const SINAIS = [
  { label: "Mogi das Cruzes", cat: "Imóveis Industriais", sinal: "Alta demanda de galpões — vacância < 3%", tipo: "oportunidade", accent: "#44D083" },
  { label: "Guararema", cat: "Loteamentos", sinal: "Crescimento residencial +18% 2024/25 — terrenos valorizando", tipo: "oportunidade", accent: "#44D083" },
  { label: "IGPM Jun/26", cat: "Reajuste Contratos", sinal: "IGPM acumulado 12m: ~5,8% — reajuste pendente Holding", tipo: "ação", accent: "#F59E0B" },
  { label: "Taxa Selic", cat: "Custo de Capital", sinal: "Selic 13,25% — custo alto para leverage", tipo: "alerta", accent: "#E5484D" },
  { label: "Condomínio Fechado", cat: "Tendência Mercado", sinal: "Demanda crescente por lotes em condomínio — região Leste SP", tipo: "oportunidade", accent: "#27B6D6" },
];

const TIPO_STYLE: Record<string, { bg: string; border: string; color: string }> = {
  oportunidade: { bg: "rgba(68,208,131,0.06)", border: "rgba(68,208,131,0.22)", color: "#44D083" },
  ação: { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.22)", color: "#F59E0B" },
  alerta: { bg: "rgba(229,72,77,0.06)", border: "rgba(229,72,77,0.22)", color: "#E5484D" },
};

export default function RadarPage() {
  return (
    <PageShell activePath="/radar" title="Radar" path="Mercado & Oportunidades">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:8 }}>Sinais de Mercado</div>
        <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
          {SINAIS.map((s,i)=>{
            const st = TIPO_STYLE[s.tipo];
            return (
              <div key={i} style={{ padding:"12px 14px",background:st.bg,border:`1px solid ${st.border}`,borderRadius:10 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:5 }}>
                  <MapPin size={12} color={st.color} />
                  <span style={{ fontSize:12,fontWeight:700,color:"#F4F7FA" }}>{s.label}</span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#6F7D89",padding:"1px 5px",border:"1px solid #1B2A36",borderRadius:4 }}>{s.cat}</span>
                  <span style={{ marginLeft:"auto",fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:st.color,padding:"1px 6px",borderRadius:4,background:`${st.color}12`,border:`1px solid ${st.color}25` }}>{s.tipo}</span>
                </div>
                <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#AAB6C2",lineHeight:1.5 }}>{s.sinal}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:20,padding:"14px",background:"rgba(200,232,0,0.04)",border:"1px solid rgba(200,232,0,0.15)",borderRadius:10,display:"flex",gap:10 }}>
          <Radar size={15} color="#C8E800" style={{ flexShrink:0,marginTop:1 }} />
          <div>
            <div style={{ fontSize:11,fontWeight:700,color:"#C8E800",marginBottom:3 }}>Radar Automático — em desenvolvimento</div>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",lineHeight:1.6 }}>Próxima versão: monitoramento automático via N8N de IGPM, FipeZap, prefeitura Guararema e anúncios de galpões industriais na região de Mogi.</div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
