import { PageShell } from "@/components/PageShell";
import { Settings2 } from "lucide-react";

const CONFIG_ITEMS = [
  { grupo: "Identidade", items: [
    { label: "Nome", value: "Andy", editavel: false },
    { label: "Modelo", value: "claude-sonnet-4-6", editavel: false },
    { label: "Idioma", value: "Português Brasileiro (PT-BR)", editavel: false },
    { label: "Usuário", value: "Antonio Pavan", editavel: false },
  ]},
  { grupo: "Canais", items: [
    { label: "Telegram", value: "mg-17816 · ativo", editavel: false },
    { label: "Destino", value: "telegram-mg-17816", editavel: false },
  ]},
  { grupo: "Armazenamento", items: [
    { label: "Workspace", value: "/workspace/agent/", editavel: false },
    { label: "Vault", value: "/workspace/extra/vault/", editavel: false },
    { label: "Mac Mini", value: "/workspace/extra/home/", editavel: false },
    { label: "Supabase", value: "host.docker.internal:54322", editavel: false },
  ]},
  { grupo: "Automações", items: [
    { label: "N8N", value: "v2.57 · local · 0 workflows", editavel: false },
    { label: "Schedules", value: "0 tarefas agendadas", editavel: false },
  ]},
];

export default function ConfigPage() {
  return (
    <PageShell activePath="/config" title="Config" path="Configurações Andy">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px 80px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,padding:"12px 14px",background:"rgba(39,182,214,0.05)",border:"1px solid rgba(39,182,214,0.18)",borderRadius:10 }}>
          <Settings2 size={14} color="#27B6D6" />
          <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89" }}>Configurações gerenciadas via NanoClaw admin. Alterações requerem aprovação do admin.</span>
        </div>
        {CONFIG_ITEMS.map(grupo=>(
          <div key={grupo.grupo}>
            <div style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",color:"#6F7D89",marginBottom:6,marginTop:18 }}>{grupo.grupo}</div>
            <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
              {grupo.items.map(i=>(
                <div key={i.label} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"rgba(16,27,37,0.6)",border:"1px solid #1B2A36",borderRadius:8 }}>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:9,color:"#6F7D89",minWidth:120,flexShrink:0 }}>{i.label}</span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:10,color:"#AAB6C2",flex:1 }}>{i.value}</span>
                  <span style={{ fontFamily:'"IBM Plex Mono",monospace',fontSize:8,color:"#3A4A56",padding:"1px 5px",border:"1px solid #1B2A36",borderRadius:4 }}>read-only</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
