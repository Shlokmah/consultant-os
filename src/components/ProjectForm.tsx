"use client";

import { useActionState } from "react";
import type { ProjectFormState } from "@/app/projects/actions";

const STATUS_OPTIONS = [
  "not_started",
  "in_progress",
  "on_hold",
  "completed",
  "cancelled",
] as const;

const PRIORITY_OPTIONS = ["low", "medium", "high"] as const;

type DefaultValues = {
  client_id?: string;
  name?: string;
  objective?: string | null;
  description?: string | null;
  status?: string;
  priority?: string;
  start_date?: string | null;
  end_date?: string | null;
  notes?: string | null;
};

export default function ProjectForm({
  action,
  clients,
  defaultValues,
  submitLabel,
}: {
  action: (
    prevState: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  clients: { id: string; name: string }[];
  defaultValues?: DefaultValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-md border border-sev-high/40 bg-sev-high/10 px-4 py-3 text-sm text-sev-high">
          {state.error}
        </div>
      )}

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
          Client<span className="text-accent"> *</span>
        </span>
        <select
          name="client_id"
          required
          defaultValue={defaultValues?.client_id ?? ""}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="" disabled>
            Select a client…
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>

      <Field
        label="Project name"
        name="name"
        required
        defaultValue={defaultValues?.name}
      />
      <Field
        label="Objective"
        name="objective"
        defaultValue={defaultValues?.objective ?? undefined}
      />

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
          Description
        </span>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? undefined}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">
            Status
          </span>
          <select
            name="status"
            defaultValue={defaultValues?.status ?? "not_started"}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink capitalize"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">
            Priority
          </span>
          <select
            name="priority"
            defaultValue={defaultValues?.priority ?? "medium"}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink capitalize"
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Start date"
          name="start_date"
          type="date"
          defaultValue={defaultValues?.start_date ?? undefined}
        />
        <Field
          label="End date"
          name="end_date"
          type="date"
          defaultValue={defaultValues?.end_date ?? undefined}
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
          Notes
        </span>
        <textarea
          name="notes"
          rows={4}
          defaultValue={defaultValues?.notes ?? undefined}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface transition-opacity disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink"
      />
    </label>
  );
}
