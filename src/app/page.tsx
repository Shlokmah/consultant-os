const METRICS = [
  { label: "Active projects", value: "—" },
  { label: "Open tasks", value: "—" },
  { label: "Meetings this week", value: "—" },
  { label: "Next deadline", value: "—" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-ink-soft">
        This is where active projects, upcoming meetings, open tasks and
        deadlines will appear once real data is connected in Phase 8. The
        dashes below are placeholders, not live numbers.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {METRICS.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-line bg-surface p-4"
          >
            <div className="text-xs text-ink-soft">{item.label}</div>
            <div className="mt-1 font-mono text-2xl font-medium text-ink">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-dashed border-line p-10 text-center text-sm text-ink-soft">
        Recent activity and quick actions will appear here.
      </div>
    </div>
  );
}
