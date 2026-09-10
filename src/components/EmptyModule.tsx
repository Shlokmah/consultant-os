import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type EmptyModuleProps = {
  icon: LucideIcon;
  description: string;
  emptyLabel: string;
  actionLabel: string;
} & ({ actionHref: string; unlocksIn?: never } | { actionHref?: never; unlocksIn: string });

export default function EmptyModule({
  icon: Icon,
  description,
  emptyLabel,
  actionLabel,
  actionHref,
  unlocksIn,
}: EmptyModuleProps) {
  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-ink-soft">{description}</p>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line bg-surface px-8 py-14 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <p className="text-sm text-ink-soft">{emptyLabel}</p>
        {actionHref ? (
          <Link
            href={actionHref}
            className="rounded-md border border-line bg-surface-2 px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
          >
            + {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            title={`Available in ${unlocksIn}`}
            className="cursor-not-allowed rounded-md border border-line bg-surface-2 px-4 py-2 font-mono text-xs text-ink-soft/60"
          >
            + {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
