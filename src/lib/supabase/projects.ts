import { supabaseAdmin } from "@/lib/supabase/server";

export type Project = {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  objective: string | null;
  status: "not_started" | "in_progress" | "on_hold" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectWithClient = Project & {
  client: { id: string; name: string } | null;
};

export async function getProjects(): Promise<ProjectWithClient[]> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*, client:clients(id, name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as unknown as ProjectWithClient[];
}

export async function getProjectById(
  id: string,
): Promise<ProjectWithClient | null> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*, client:clients(id, name)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as ProjectWithClient | null;
}

// Minimal read used by the client detail page's "Projects" panel.
export async function getProjectsByClient(clientId: string) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id, name, status")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
