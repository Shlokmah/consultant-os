import { createClient } from "@/app/clients/actions";
import ClientForm from "@/components/ClientForm";

export default function NewClientPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-serif text-xl font-semibold text-ink">
        Add a client
      </h2>
      <ClientForm action={createClient} submitLabel="Add client" />
    </div>
  );
}
