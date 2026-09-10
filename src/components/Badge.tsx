const TONE_STYLES = {
  good: "bg-sev-low/15 text-sev-low",
  warning: "bg-sev-med/15 text-sev-med",
  critical: "bg-sev-high/15 text-sev-high",
  neutral: "bg-later/15 text-later",
  accent: "bg-accent-soft text-accent",
} as const;

export default function Badge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: keyof typeof TONE_STYLES;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-medium capitalize ${TONE_STYLES[tone]}`}
    >
      {label.replace(/_/g, " ")}
    </span>
  );
}
