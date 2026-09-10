"use client";

import { useTransition } from "react";

// A <select> that submits itself the moment you change it, via a Server
// Action bound to the row's id. Used for quick status changes on tasks,
// deliverables and risks without a separate edit page.
export default function StatusSelectForm({
  action,
  id,
  status,
  options,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  status: string;
  options: readonly string[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={action}
      onChange={(event) => {
        const form = event.currentTarget;
        startTransition(() => {
          action(new FormData(form));
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        disabled={pending}
        className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-ink capitalize disabled:opacity-60"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </form>
  );
}
