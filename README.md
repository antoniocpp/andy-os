# Andy OS — NanoClaw Command

Cockpit inteligente estilo Iron Man/Jarvis para **Antonio Pavan**, gerido pelo agente AI **Andy**.

🌐 **Live:** https://andy-os-seven.vercel.app

## Stack

- **Next.js 14** (App Router + Server Components)
- **TypeScript** + inline styles (design system próprio)
- **Supabase** — dados reais de projetos
- **Lucide React** — ícones
- **Vercel** — deploy

## Abas

| Rota | Conteúdo |
|---|---|
| `/` | Cockpit — config Andy + Live Activity |
| `/imoveis` | Holding Pestana Pavan — portfólio e KPIs |
| `/obras` | Galpão Mogi — retrofit vs nova construção |
| `/investimentos` | KPIs financeiros e oportunidades |
| `/inteligencia` | Skills e MCPs do Andy |
| `/documentos` | Pipeline RAG Docling |
| `/radar` | Sinais de mercado |
| `/memoria` | Vault Obsidian |
| `/andy` | Sistema Andy |
| `/config` | Configurações |

## Design System

| Token | Valor |
|---|---|
| Background | `#05080C` · `#07111A` · `#0A1621` |
| Amber | `#D39A2E` · `#F0B84A` |
| Cyan | `#27B6D6` |
| Green | `#44D083` |
| Neon (Live) | `#C8E800` |
| Fonte mono | IBM Plex Mono |

## Setup local

```bash
npm install
npm run dev
```

Variáveis de ambiente (opcional — tem fallback estático):
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

## Criado por Andy

Agente AI Chief of Staff de Antonio Pavan — [NanoClaw](https://nanoclaw.ai)
