import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Briefcase } from "lucide-react";
import { getClientById } from "@/lib/supabase/clients";
import { getProjectsByClient } from "@/lib/supabase/projects";
import { setClientStatus } from "@/app/clients/actions";
import StatusPill from "@/components/StatusPill";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  const projects = await getProjectsByClient(id);
  const toggleStatus = client.status === "archived" ? "active" : "archived";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              {client.name}
            </h2>
            <StatusPill status={client.status} />
          </div>
          {client.company && (
            <p className="mt-1 text-ink-soft">{client.company}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/clients/${client.id}/edit`}
            className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
          >
            <Pencil size={14} strokeWidth={2} />
            Edit
          </Link>
          <form action={setClientStatus.bind(null, client.id, toggleStatus)}>
            <button
              type="submit"
              className="rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs text-ink-soft transition-colors hover:border-sev-high/40 hover:text-sev-high"
            >
              {client.status === "archived" ? "Reactivate" : "Archive"}
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailField label="Industry" value={client.industry} />
        <DetailField label="Email" value={client.email} />
        <DetailField label="Phone" value={client.phone} />
        <DetailField
          label="Created"
          value={new Date(client.created_at).toLocaleDateString()}
        />
      </div>

      {client.notes && (
        <div className="rounded-lg border border-line bg-surface p-5">
          <h3 className="font-serif text-base font-semibold text-ink">
            Notes
          </h3>
          <p className="mt-2 text-sm whitespace-pre-wrap text-ink-soft">
            {client.notes}
          </p>
        </div>
      )}

      <div className="rounded-lg border border-line bg-surface p-5">
        <div className="flex items-center gap-2">
          <Briefcase size={16} strokeWidth={1.75} className="text-ink-soft" />
          <h3 className="font-serif text-base font-semibold text-ink">
            Projects
          </h3>
        </div>
        {projects.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">
            No projects yet — the Projects module arrives in Phase 5.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {projects.map((p) => (
              <li key={p.id} className="text-sm text-ink">
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <div className="text-xs text-ink-soft">{label}</div>
      <div className="mt-1 text-sm text-ink">{value || "—"}</div>
    </div>
  );
}
