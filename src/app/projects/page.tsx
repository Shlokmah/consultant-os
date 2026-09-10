import Link from "next/link";
import { Plus, Briefcase } from "lucide-react";
import { getProjects } from "@/lib/supabase/projects";
import EmptyModule from "@/components/EmptyModule";
import Badge from "@/components/Badge";

const STATUS_TONE = {
  not_started: "neutral",
  in_progress: "accent",
  on_hold: "warning",
  completed: "good",
  cancelled: "neutral",
} as const;

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <EmptyModule
        icon={Briefcase}
        description="Each project's objective, deliverables, tasks, risks, decisions and notes will live here."
        emptyLabel="No projects yet."
        actionLabel="Add a project"
        actionHref="/projects/new"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-ink-soft">
          {projects.length} project{projects.length === 1 ? "" : "s"}.
        </p>
        <Link
          href="/projects/new"
          className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
        >
          <Plus size={14} strokeWidth={2} />
          Add a project
        </Link>
      </div>

      <div className="overflow-hidden overflow-x-auto rounded-lg border border-line bg-surface">
        <table className="w-full min-w-[620px] text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2 text-left text-xs tracking-wide text-ink-soft uppercase">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Priority</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-line last:border-0 hover:bg-surface-2"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-medium text-ink hover:text-accent"
                  >
                    {project.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {project.client?.name ?? "—"}
                </td>
                <td className="px-5 py-3 text-ink-soft capitalize">
                  {project.priority}
                </td>
                <td className="px-5 py-3">
                  <Badge
                    label={project.status}
                    tone={STATUS_TONE[project.status]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
