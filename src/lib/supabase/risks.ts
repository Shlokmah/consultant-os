import { supabaseAdmin } from "@/lib/supabase/server";

export type Risk = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  severity: "low" | "medium" | "high";
  likelihood: "low" | "medium" | "high";
  status: "open" | "mitigated" | "closed";
  mitigation: string | null;
  created_at: string;
  updated_at: string;
};

export async function getRisksByProject(projectId: string): Promise<Risk[]> {
  const { data, error } = await supabaseAdmin
    .from("risks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at");
  if (error) throw error;
  return data;
}
