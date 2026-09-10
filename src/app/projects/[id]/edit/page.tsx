import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/supabase/projects";
import { getClientOptions } from "@/lib/supabase/clients";
import { updateProject } from "@/app/projects/actions";
import ProjectForm from "@/components/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, clients] = await Promise.all([
    getProjectById(id),
    getClientOptions(),
  ]);
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-serif text-xl font-semibold text-ink">
        Edit {project.name}
      </h2>
      <ProjectForm
        action={action}
        clients={clients}
        submitLabel="Save changes"
        defaultValues={project}
      />
    </div>
  );
}
