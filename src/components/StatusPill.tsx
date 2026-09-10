const STATUS_STYLES: Record<string, string> = {
  active: "bg-sev-low/15 text-sev-low",
  inactive: "bg-sev-med/15 text-sev-med",
  archived: "bg-later/15 text-later",
};

export default function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-line/40 text-ink-soft";
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-medium ${style}`}
    >
      {label}
    </span>
  );
}
