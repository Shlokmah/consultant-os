"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

export type ProjectFormState = { error?: string } | undefined;

function readProjectFields(formData: FormData) {
  return {
    client_id: String(formData.get("client_id") ?? ""),
    name: String(formData.get("name") ?? "").trim(),
    objective: String(formData.get("objective") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    status: String(formData.get("status") ?? "not_started"),
    priority: String(formData.get("priority") ?? "medium"),
    start_date: String(formData.get("start_date") ?? "").trim() || null,
    end_date: String(formData.get("end_date") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const fields = readProjectFields(formData);
  if (!fields.name) return { error: "Project name is required." };
  if (!fields.client_id) return { error: "Please select a client." };

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert(fields)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/projects");
  revalidatePath(`/clients/${fields.client_id}`);
  redirect(`/projects/${data.id}`);
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const fields = readProjectFields(formData);
  if (!fields.name) return { error: "Project name is required." };
  if (!fields.client_id) return { error: "Please select a client." };

  const { error } = await supabaseAdmin
    .from("projects")
    .update(fields)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath(`/clients/${fields.client_id}`);
  redirect(`/projects/${id}`);
}
