"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

export type ClientFormState = { error?: string } | undefined;

function readClientFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim() || null,
    industry: String(formData.get("industry") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: String(formData.get("status") ?? "active"),
  };
}

export async function createClient(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const fields = readClientFields(formData);
  if (!fields.name) {
    return { error: "Client name is required." };
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .insert(fields)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/clients");
  redirect(`/clients/${data.id}`);
}

export async function updateClient(
  id: string,
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const fields = readClientFields(formData);
  if (!fields.name) {
    return { error: "Client name is required." };
  }

  const { error } = await supabaseAdmin
    .from("clients")
    .update(fields)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
  redirect(`/clients/${id}`);
}

export async function setClientStatus(
  id: string,
  status: "active" | "inactive" | "archived",
) {
  await supabaseAdmin.from("clients").update({ status }).eq("id", id);
  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
}
