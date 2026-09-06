import { Lightbulb } from "lucide-react";
import EmptyModule from "@/components/EmptyModule";

export default function InsightsPage() {
  return (
    <EmptyModule
      icon={Lightbulb}
      description="Your personal library of frameworks, case studies, lessons learned, useful questions and best practices."
      emptyLabel="No insights saved yet."
      actionLabel="Add an insight"
      unlocksIn="Phase 7"
    />
  );
}
