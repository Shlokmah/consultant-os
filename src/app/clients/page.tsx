import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { getClients } from "@/lib/supabase/clients";
import EmptyModule from "@/components/EmptyModule";
import StatusPill from "@/components/StatusPill";

export default async function ClientsPage() {
  const clients = await getClients();

  if (clients.length === 0) {
    return (
      <EmptyModule
        icon={Users}
        description="Your client list will live here — add, edit and archive clients, with contacts and notes on each one."
        emptyLabel="No clients yet."
        actionLabel="Add a client"
        actionHref="/clients/new"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-ink-soft">
          {clients.length} client{clients.length === 1 ? "" : "s"}.
        </p>
        <Link
          href="/clients/new"
          className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
        >
          <Plus size={14} strokeWidth={2} />
          Add a client
        </Link>
      </div>

      <div className="overflow-hidden overflow-x-auto rounded-lg border border-line bg-surface">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2 text-left text-xs tracking-wide text-ink-soft uppercase">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Industry</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-line last:border-0 hover:bg-surface-2"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/clients/${client.id}`}
                    className="font-medium text-ink hover:text-accent"
                  >
                    {client.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {client.company || "—"}
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {client.industry || "—"}
                </td>
                <td className="px-5 py-3">
                  <StatusPill status={client.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
