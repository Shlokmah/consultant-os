import { supabaseAdmin } from "@/lib/supabase/server";

export type Decision = {
  id: string;
  project_id: string;
  meeting_id: string | null;
  title: string;
  description: string | null;
  decided_by: string | null;
  decided_on: string | null;
  created_at: string;
  updated_at: string;
};

export async function getDecisionsByProject(
  projectId: string,
): Promise<Decision[]> {
  const { data, error } = await supabaseAdmin
    .from("decisions")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
