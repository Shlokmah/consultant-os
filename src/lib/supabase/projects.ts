import { supabaseAdmin } from "@/lib/supabase/server";

// Minimal read used by the client detail page's "Projects" panel.
// The full Projects module (create/edit) arrives in Phase 5.
export async function getProjectsByClient(clientId: string) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id, name, status")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
