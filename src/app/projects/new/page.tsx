import Link from "next/link";
import { Users } from "lucide-react";
import { getClientOptions } from "@/lib/supabase/clients";
import { createProject } from "@/app/projects/actions";
import ProjectForm from "@/components/ProjectForm";
import EmptyModule from "@/components/EmptyModule";

export default async function NewProjectPage() {
  const clients = await getClientOptions();

  if (clients.length === 0) {
    return (
      <EmptyModule
        icon={Users}
        description="Every project belongs to a client. Add a client first, then come back here to create a project for them."
        emptyLabel="No clients yet."
        actionLabel="Add a client"
        actionHref="/clients/new"
      />
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-serif text-xl font-semibold text-ink">
        Add a project
      </h2>
      <ProjectForm action={createProject} clients={clients} submitLabel="Add project" />
      <p className="text-xs text-ink-soft">
        Don&apos;t see the client you need?{" "}
        <Link href="/clients/new" className="text-accent hover:underline">
          Add one first
        </Link>
        .
      </p>
    </div>
  );
}
