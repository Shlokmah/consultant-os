import { supabaseAdmin } from "@/lib/supabase/server";

// Minimal read used by the project detail page's "Meetings" panel.
// The full Meetings module (create/edit) arrives in Phase 6.
export async function getMeetingsByProject(projectId: string) {
  const { data, error } = await supabaseAdmin
    .from("meetings")
    .select("id, title, meeting_date")
    .eq("project_id", projectId)
    .order("meeting_date", { ascending: false });
  if (error) throw error;
  return data;
}
