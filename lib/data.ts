import { createClient } from "@supabase/supabase-js";
import type { Project, KPI, DbAlert, ActivityEntry } from "./supabase";

type BlobSnapshot = {
  activity?: ActivityEntry[];
  kpis?: KPI[];
  alerts?: DbAlert[];
  projects?: Project[];
  updatedAt?: string;
};

let _snapshotCache: { data: BlobSnapshot; at: number } | null = null;
const CACHE_TTL = 30_000;

async function fetchSnapshot(): Promise<BlobSnapshot> {
  if (_snapshotCache && Date.now() - _snapshotCache.at < CACHE_TTL) {
    return _snapshotCache.data;
  }
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return {};
    const listRes = await fetch(
      "https://blob.vercel-storage.com?prefix=andy-snapshot.json&limit=1",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!listRes.ok) return {};
    const list = await listRes.json();
    const url: string | undefined = list.blobs?.[0]?.url;
    if (!url) return {};
    const dataRes = await fetch(url, { cache: "no-store" });
    if (!dataRes.ok) return {};
    const data: BlobSnapshot = await dataRes.json();
    _snapshotCache = { data, at: Date.now() };
    return data;
  } catch {
    return {};
  }
}

function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
  const key = process.env.SUPABASE_SERVICE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRFA0NiK7kyqHFSBFJDeBRWthNT5ZrX5b0jZHFOwOJc";
  return createClient(url, key);
}

const FALLBACK_PROJECTS: Project[] = [
  { id: "1", name: "Holding Pestana Pavan", description: "Portfólio imobiliário familiar", status: "active", badge: "ativo", priority: 1, icon: "H", accent_color: "amber", kpi_label: "Cap Rate", kpi_value: "7.2%" },
  { id: "2", name: "Galpão Mogi", description: "Galpão industrial — retrofit vs nova construção", status: "active", badge: "análise", priority: 2, icon: "G", accent_color: "orange", kpi_label: "Área", kpi_value: "2.400m²" },
  { id: "3", name: "Condomínio Guararema", description: "Loteamento 22 lotes — aprovação e infraestrutura", status: "planning", badge: "aprovação", priority: 3, icon: "C", accent_color: "green", kpi_label: "Lotes", kpi_value: "22" },
  { id: "4", name: "OpenClaw", description: "Plataforma de agentes de IA", status: "active", badge: "beta", priority: 4, icon: "O", accent_color: "cyan", kpi_label: "Agentes", kpi_value: "3" },
  { id: "5", name: "Andy OS", description: "Cockpit inteligente — este painel", status: "active", badge: "v1.0", priority: 5, icon: "A", accent_color: "cyan", kpi_label: "Uptime", kpi_value: "100%" },
  { id: "6", name: "N8N Automações", description: "Workflows e integrações em produção", status: "active", badge: "local", priority: 6, icon: "N", accent_color: "green", kpi_label: "Flows", kpi_value: "0 ativos" },
  { id: "7", name: "Docling RAG", description: "Pipeline PDF → embeddings → query semântica", status: "planning", badge: "dev", priority: 7, icon: "D", accent_color: "muted", kpi_label: "Docs", kpi_value: "0" },
];

const FALLBACK_KPIS: KPI[] = [
  { id: "1", label: "Patrimônio", value: "R$ 5,2M", change_label: "+3% vs ano ant.", change_positive: true, accent: "amber" },
  { id: "2", label: "Entradas/mês", value: "R$ 147k", change_label: "+12% vs mês ant.", change_positive: true, accent: "cyan" },
  { id: "3", label: "Oportunidades", value: "4", change_label: "2 novas este mês", change_positive: true, accent: "amber" },
];

const FALLBACK_ALERTS: DbAlert[] = [
  { id: 1, title: "Reajuste IGPM pendente", description: "Contratos Holding — verificar reajuste anual", priority: "warning", project_id: "1", resolved: false },
  { id: 2, title: "Aprovação Guararema", description: "Aguardando resposta da prefeitura", priority: "info", project_id: "3", resolved: false },
  { id: 3, title: "Galpão Mogi: análise retrofit", description: "Avaliação técnica e orçamento necessários", priority: "warning", project_id: "2", resolved: false },
  { id: 4, title: "Andy OS online ●", description: "Sistema operacional e monitorando", priority: "success", project_id: "5", resolved: false },
];

const FALLBACK_ACTIVITY: ActivityEntry[] = [
  {
    id: 1, type: "task",
    task_title: "Deploy Andy OS",
    content: "Build errors corrigidos (TypeScript, Clerk v6), GitHub→Vercel conectado, auto-deploy ativo e funcionando",
    task_status: "completed",
    tool_name: null, session_id: null, created_at: "2026-06-17T15:00:00.000Z"
  },
  {
    id: 2, type: "task",
    task_title: "Auth Clerk",
    content: "Middleware Clerk investigado — problema Edge Runtime identificado, solução em progresso",
    task_status: "completed",
    tool_name: null, session_id: null, created_at: "2026-06-17T16:30:00.000Z"
  },
  {
    id: 3, type: "task",
    task_title: "Redesign Cockpit",
    content: "Live Activity horizontal no topo com cards de tarefa — título, descrição e status",
    task_status: "in_progress",
    tool_name: null, session_id: null, created_at: "2026-06-17T16:38:00.000Z"
  },
];

export async function fetchProjects(): Promise<Project[]> {
  const snap = await fetchSnapshot();
  if (snap.projects?.length) return snap.projects;
  try {
    const { data, error } = await serverClient()
      .from("andy_projects")
      .select("*")
      .order("priority");
    if (error || !data?.length) return FALLBACK_PROJECTS;
    return data;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function fetchKPIs(): Promise<KPI[]> {
  const snap = await fetchSnapshot();
  if (snap.kpis?.length) return snap.kpis;
  try {
    const { data, error } = await serverClient()
      .from("andy_kpis")
      .select("*");
    if (error || !data?.length) return FALLBACK_KPIS;
    return data;
  } catch {
    return FALLBACK_KPIS;
  }
}

export async function fetchAlerts(): Promise<DbAlert[]> {
  const snap = await fetchSnapshot();
  if (snap.alerts?.length) return snap.alerts;
  try {
    const { data, error } = await serverClient()
      .from("andy_alerts")
      .select("*")
      .eq("resolved", false)
      .order("id", { ascending: false })
      .limit(10);
    if (error || !data?.length) return FALLBACK_ALERTS;
    return data;
  } catch {
    return FALLBACK_ALERTS;
  }
}

export async function fetchActivity(since?: string): Promise<ActivityEntry[]> {
  if (!since) {
    const snap = await fetchSnapshot();
    if (snap.activity?.length) return snap.activity;
  }
  try {
    let q = serverClient()
      .from("andy_activity")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (since) q = q.gt("created_at", since);
    const { data } = await q;
    if (!since && (!data || !data.length)) return FALLBACK_ACTIVITY;
    return (data ?? []).reverse();
  } catch {
    if (!since) return FALLBACK_ACTIVITY;
    return [];
  }
}
