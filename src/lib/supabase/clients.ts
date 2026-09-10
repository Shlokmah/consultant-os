import { supabaseAdmin } from "@/lib/supabase/server";

export type Client = {
  id: string;
  name: string;
  company: string | null;
  industry: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  status: "active" | "inactive" | "archived";
  created_at: string;
  updated_at: string;
};

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getClientById(id: string): Promise<Client | null> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Lightweight list for the project form's client dropdown.
export async function getClientOptions(): Promise<
  Pick<Client, "id" | "name">[]
> {
  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("id, name")
    .neq("status", "archived")
    .order("name");
  if (error) throw error;
  return data;
}
