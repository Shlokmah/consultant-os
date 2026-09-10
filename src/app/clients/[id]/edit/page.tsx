import { notFound } from "next/navigation";
import { getClientById } from "@/lib/supabase/clients";
import { updateClient } from "@/app/clients/actions";
import ClientForm from "@/components/ClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  const action = updateClient.bind(null, id);

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-serif text-xl font-semibold text-ink">
        Edit {client.name}
      </h2>
      <ClientForm action={action} submitLabel="Save changes" defaultValues={client} />
    </div>
  );
}
