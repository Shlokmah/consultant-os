import { CalendarDays } from "lucide-react";
import EmptyModule from "@/components/EmptyModule";

export default function MeetingsPage() {
  return (
    <EmptyModule
      icon={CalendarDays}
      description="Meeting notes, decisions, action items and follow-up dates, linked to a client and project."
      emptyLabel="No meetings yet."
      actionLabel="Log a meeting"
      unlocksIn="Phase 6"
    />
  );
}
