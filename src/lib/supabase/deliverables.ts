import { supabaseAdmin } from "@/lib/supabase/server";

export type Deliverable = {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  due_date: string | null;
  status: "not_started" | "in_progress" | "review" | "delivered";
  created_at: string;
  updated_at: string;
};

export async function getDeliverablesByProject(
  projectId: string,
): Promise<Deliverable[]> {
  const { data, error } = await supabaseAdmin
    .from("deliverables")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at");
  if (error) throw error;
  return data;
}
