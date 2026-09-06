import { CheckSquare } from "lucide-react";
import EmptyModule from "@/components/EmptyModule";

export default function TasksPage() {
  return (
    <EmptyModule
      icon={CheckSquare}
      description="Every task, standalone or linked to a project, with owner, due date, priority and status."
      emptyLabel="No tasks yet."
      actionLabel="Add a task"
      unlocksIn="Phase 6"
    />
  );
}
