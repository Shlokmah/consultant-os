"use client";

import { useActionState } from "react";
import type { ClientFormState } from "@/app/clients/actions";

const STATUS_OPTIONS = ["active", "inactive", "archived"] as const;

type DefaultValues = {
  name?: string;
  company?: string | null;
  industry?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  status?: string;
};

export default function ClientForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (
    prevState: ClientFormState,
    formData: FormData,
  ) => Promise<ClientFormState>;
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

      <Field
        label="Client name"
        name="name"
        required
        defaultValue={defaultValues?.name}
      />
      <Field
        label="Company"
        name="company"
        defaultValue={defaultValues?.company ?? undefined}
      />
      <Field
        label="Industry"
        name="industry"
        defaultValue={defaultValues?.industry ?? undefined}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          defaultValue={defaultValues?.email ?? undefined}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={defaultValues?.phone ?? undefined}
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
          Status
        </span>
        <select
          name="status"
          defaultValue={defaultValues?.status ?? "active"}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </label>

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
