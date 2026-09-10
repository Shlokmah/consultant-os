"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim() || null;
}

// --- Tasks ---------------------------------------------------------------

export async function addTask(formData: FormData) {
  const project_id = String(formData.get("project_id"));
  const title = str(formData, "title");
  if (!title) return;

  await supabaseAdmin.from("tasks").insert({
    project_id,
    title,
    priority: String(formData.get("priority") ?? "medium"),
    due_date: str(formData, "due_date"),
  });

  revalidatePath(`/projects/${project_id}`);
}

export async function updateTaskStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const { data } = await supabaseAdmin
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select("project_id")
    .single();
  if (data) revalidatePath(`/projects/${data.project_id}`);
}

// --- Deliverables ----------------------------------------------------------

export async function addDeliverable(formData: FormData) {
  const project_id = String(formData.get("project_id"));
  const name = str(formData, "name");
  if (!name) return;

  await supabaseAdmin.from("deliverables").insert({
    project_id,
    name,
    due_date: str(formData, "due_date"),
  });

  revalidatePath(`/projects/${project_id}`);
}

export async function updateDeliverableStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const { data } = await supabaseAdmin
    .from("deliverables")
    .update({ status })
    .eq("id", id)
    .select("project_id")
    .single();
  if (data) revalidatePath(`/projects/${data.project_id}`);
}

// --- Risks -----------------------------------------------------------------

export async function addRisk(formData: FormData) {
  const project_id = String(formData.get("project_id"));
  const title = str(formData, "title");
  if (!title) return;

  await supabaseAdmin.from("risks").insert({
    project_id,
    title,
    severity: String(formData.get("severity") ?? "medium"),
    likelihood: String(formData.get("likelihood") ?? "medium"),
  });

  revalidatePath(`/projects/${project_id}`);
}

export async function updateRiskStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const { data } = await supabaseAdmin
    .from("risks")
    .update({ status })
    .eq("id", id)
    .select("project_id")
    .single();
  if (data) revalidatePath(`/projects/${data.project_id}`);
}

// --- Decisions ---------------------------------------------------------------

export async function addDecision(formData: FormData) {
  const project_id = String(formData.get("project_id"));
  const title = str(formData, "title");
  if (!title) return;

  await supabaseAdmin.from("decisions").insert({
    project_id,
    title,
    description: str(formData, "description"),
    decided_by: str(formData, "decided_by"),
    decided_on: str(formData, "decided_on"),
  });

  revalidatePath(`/projects/${project_id}`);
}
