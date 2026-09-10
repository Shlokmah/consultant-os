import { supabaseAdmin } from "@/lib/supabase/server";

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: "not_started" | "in_progress" | "done" | "blocked";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export async function getTasksByProject(projectId: string): Promise<Task[]> {
  const { data, error } = await supabaseAdmin
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at");
  if (error) throw error;
  return data;
}
