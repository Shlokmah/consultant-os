import { BookOpen } from "lucide-react";
import EmptyModule from "@/components/EmptyModule";

export default function ResearchPage() {
  return (
    <EmptyModule
      icon={BookOpen}
      description="Research notes with source, tags and an optional link to a client or project."
      emptyLabel="No research entries yet."
      actionLabel="Add research"
      unlocksIn="Phase 7"
    />
  );
}
