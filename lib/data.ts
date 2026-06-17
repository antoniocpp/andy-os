import { createClient } from "@supabase/supabase-js";
import type { Project, KPI, DbAlert, ActivityEntry } from "./supabase";

function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
  const key = process.env.SUPABASE_SERVICE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRFA0NiK7kyqHFSBFJDeBRWthNT5ZrX5b0jZHFOwOJc";
  return createClient(url, key);
}

const FALLBACK_PROJECTS: Project[] = [
  { id: 1, name: "Holding Pestana Pavan", description: "Portfólio imobiliário familiar", status: "active", badge: "ativo", priority: 1, icon: "H", accent_color: "amber", kpi_label: "Cap Rate", kpi_value: "7.2%" },
  { id: 2, name: "Galpão Mogi", description: "Galpão industrial — retrofit vs nova construção", status: "active", badge: "análise", priority: 2, icon: "G", accent_color: "orange", kpi_label: "Área", kpi_value: "2.400m²" },
  { id: 3, name: "Condomínio Guararema", description: "Loteamento 22 lotes — aprovação e infraestrutura", status: "planning", badge: "aprovação", priority: 3, icon: "C", accent_color: "green", kpi_label: "Lotes", kpi_value: "22" },
  { id: 4, name: "OpenClaw", description: "Plataforma de agentes de IA", status: "active", badge: "beta", priority: 4, icon: "O", accent_color: "cyan", kpi_label: "Agentes", kpi_value: "3" },
  { id: 5, name: "Andy OS", description: "Cockpit inteligente — este painel", status: "active", badge: "v1.0", priority: 5, icon: "A", accent_color: "cyan", kpi_label: "Uptime", kpi_value: "100%" },
  { id: 6, name: "N8N Automações", description: "Workflows e integrações em produção", status: "active", badge: "local", priority: 6, icon: "N", accent_color: "green", kpi_label: "Flows", kpi_value: "0 ativos" },
  { id: 7, name: "Docling RAG", description: "Pipeline PDF → embeddings → query semântica", status: "planning", badge: "dev", priority: 7, icon: "D", accent_color: "muted", kpi_label: "Docs", kpi_value: "0" },
];

const FALLBACK_KPIS: KPI[] = [
  { id: 1, label: "Patrimônio", value: "R$ 5,2M", change_label: "+3% vs ano ant.", change_positive: true, accent: "amber" },
  { id: 2, label: "Entradas/mês", value: "R$ 147k", change_label: "+12% vs mês ant.", change_positive: true, accent: "cyan" },
  { id: 3, label: "Oportunidades", value: "4", change_label: "2 novas este mês", change_positive: true, accent: "amber" },
];

const FALLBACK_ALERTS: DbAlert[] = [
  { id: 1, title: "Reajuste IGPM pendente", description: "Contratos Holding", priority: "warning", project_id: 1, resolved: false },
  { id: 2, title: "Aprovação Guararema", description: "Aguardando prefeitura", priority: "info", project_id: 3, resolved: false },
  { id: 3, title: "Galpão Mogi: análise retrofit", description: "Avaliação técnica necessária", priority: "warning", project_id: 2, resolved: false },
];

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await serverClient().from("andy_projects").select("*").order("priority");
    if (error || !data?.length) return FALLBACK_PROJECTS;
    return data;
  } catch { return FALLBACK_PROJECTS; }
}

export async function fetchKPIs(): Promise<KPI[]> {
  try {
    const { data, error } = await serverClient().from("andy_kpis").select("*");
    if (error || !data?.length) return FALLBACK_KPIS;
    return data;
  } catch { return FALLBACK_KPIS; }
}

export async function fetchAlerts(): Promise<DbAlert[]> {
  try {
    const { data, error } = await serverClient().from("andy_alerts").select("*").eq("resolved", false).order("id", { ascending: false }).limit(10);
    if (error || !data?.length) return FALLBACK_ALERTS;
    return data;
  } catch { return FALLBACK_ALERTS; }
}

export async function fetchActivity(since?: string): Promise<ActivityEntry[]> {
  try {
    let q = serverClient().from("andy_activity").select("*").order("created_at", { ascending: false }).limit(50);
    if (since) q = q.gt("created_at", since);
    const { data } = await q;
    return (data ?? []).reverse();
  } catch { return []; }
}
