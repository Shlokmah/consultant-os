import { Briefcase } from "lucide-react";
import EmptyModule from "@/components/EmptyModule";

export default function ProjectsPage() {
  return (
    <EmptyModule
      icon={Briefcase}
      description="Each project's objective, deliverables, tasks, risks, decisions and notes will live here."
      emptyLabel="No projects yet."
      actionLabel="Add a project"
      unlocksIn="Phase 5"
    />
  );
}
