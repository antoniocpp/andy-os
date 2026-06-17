import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRFA0NiK7kyqHFSBFJDeBRWthNT5ZrX5b0jZHFOwOJc";

export const supabase = createClient(url, key);

export interface Project { id: string; name: string; description: string; status: string; badge: string; priority: number; icon: string; accent_color: string; kpi_label: string; kpi_value: string; }
export interface KPI { id: string; label: string; value: string; change_label: string; change_positive: boolean; accent: string; }
export interface DbAlert { id: number; title: string; description: string; priority: string; project_id: string | null; resolved: boolean; }
export interface ActivityEntry { id: number; type: string; content: string; tool_name: string | null; session_id: string | null; created_at: string; }
