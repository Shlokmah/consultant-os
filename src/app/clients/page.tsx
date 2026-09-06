import { Users } from "lucide-react";
import EmptyModule from "@/components/EmptyModule";

export default function ClientsPage() {
  return (
    <EmptyModule
      icon={Users}
      description="Your client list will live here — add, edit and archive clients, with contacts and notes on each one."
      emptyLabel="No clients yet."
      actionLabel="Add a client"
      unlocksIn="Phase 4"
    />
  );
}
