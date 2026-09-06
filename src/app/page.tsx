import { Briefcase, CheckSquare, CalendarDays, Clock, Plus } from "lucide-react";

const METRICS = [
  { label: "Active projects", value: "—", icon: Briefcase },
  { label: "Open tasks", value: "—", icon: CheckSquare },
  { label: "Meetings this week", value: "—", icon: CalendarDays },
  { label: "Next deadline", value: "—", icon: Clock },
];

const QUICK_ACTIONS = [
  { label: "Add client", unlocksIn: "Phase 4" },
  { label: "New project", unlocksIn: "Phase 5" },
  { label: "Log meeting", unlocksIn: "Phase 6" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-[11px] tracking-wide text-accent uppercase">
          Overview
        </span>
        <p className="mt-2 max-w-2xl text-ink-soft">
          This is where active projects, upcoming meetings, open tasks and
          deadlines will appear once real data is connected in Phase 8. The
          dashes below are placeholders, not live numbers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {METRICS.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <div className="flex items-center gap-2 text-ink-soft">
              <item.icon size={16} strokeWidth={1.75} />
              <span className="text-xs">{item.label}</span>
            </div>
            <div className="mt-3 font-mono text-3xl font-medium text-ink">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-6">
          <h2 className="font-serif text-base font-semibold text-ink">
            Recent activity
          </h2>
          <div className="mt-4 rounded-md border border-dashed border-line p-8 text-center text-sm text-ink-soft">
            Nothing yet — this fills in as clients, projects and meetings are
            added.
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-6">
          <h2 className="font-serif text-base font-semibold text-ink">
            Upcoming deadlines
          </h2>
          <div className="mt-4 rounded-md border border-dashed border-line p-8 text-center text-sm text-ink-soft">
            Nothing due yet — deadlines from your projects will surface here.
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-surface-2 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">
            Quick actions
          </span>
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              disabled
              title={`Available in ${action.unlocksIn}`}
              className="flex cursor-not-allowed items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink-soft/60"
            >
              <Plus size={13} strokeWidth={2} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
