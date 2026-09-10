import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, CalendarDays } from "lucide-react";
import { getProjectById } from "@/lib/supabase/projects";
import { getTasksByProject } from "@/lib/supabase/tasks";
import { getDeliverablesByProject } from "@/lib/supabase/deliverables";
import { getRisksByProject } from "@/lib/supabase/risks";
import { getDecisionsByProject } from "@/lib/supabase/decisions";
import { getMeetingsByProject } from "@/lib/supabase/meetings";
import {
  addTask,
  updateTaskStatus,
  addDeliverable,
  updateDeliverableStatus,
  addRisk,
  updateRiskStatus,
  addDecision,
} from "@/app/projects/[id]/actions";
import Badge from "@/components/Badge";
import StatusSelectForm from "@/components/StatusSelectForm";

const PROJECT_STATUS_TONE = {
  not_started: "neutral",
  in_progress: "accent",
  on_hold: "warning",
  completed: "good",
  cancelled: "neutral",
} as const;

const PRIORITY_TONE = { low: "neutral", medium: "warning", high: "critical" } as const;
const TASK_STATUS_OPTIONS = ["not_started", "in_progress", "done", "blocked"] as const;
const DELIVERABLE_STATUS_OPTIONS = ["not_started", "in_progress", "review", "delivered"] as const;
const RISK_STATUS_OPTIONS = ["open", "mitigated", "closed"] as const;
const RISK_TONE = { low: "good", medium: "warning", high: "critical" } as const;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  const [tasks, deliverables, risks, decisions, meetings] = await Promise.all([
    getTasksByProject(id),
    getDeliverablesByProject(id),
    getRisksByProject(id),
    getDecisionsByProject(id),
    getMeetingsByProject(id),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              {project.name}
            </h2>
            <Badge label={project.status} tone={PROJECT_STATUS_TONE[project.status]} />
            <Badge label={project.priority} tone={PRIORITY_TONE[project.priority]} />
          </div>
          {project.client && (
            <p className="mt-1 text-ink-soft">
              for{" "}
              <Link href={`/clients/${project.client.id}`} className="text-accent hover:underline">
                {project.client.name}
              </Link>
            </p>
          )}
        </div>
        <Link
          href={`/projects/${project.id}/edit`}
          className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
        >
          <Pencil size={14} strokeWidth={2} />
          Edit
        </Link>
      </div>

      {(project.objective || project.description) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.objective && <DetailField label="Objective" value={project.objective} />}
          {project.description && <DetailField label="Description" value={project.description} />}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DetailField label="Start date" value={formatDate(project.start_date)} />
        <DetailField label="End date" value={formatDate(project.end_date)} />
      </div>

      {project.notes && (
        <Panel title="Notes">
          <p className="text-sm whitespace-pre-wrap text-ink-soft">{project.notes}</p>
        </Panel>
      )}

      <Panel title="Tasks" count={tasks.length}>
        <form action={addTask} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="project_id" value={project.id} />
          <QuickInput label="Title" name="title" required className="flex-1 min-w-[160px]" />
          <QuickInput label="Due" name="due_date" type="date" />
          <QuickSelect label="Priority" name="priority" options={["low", "medium", "high"]} defaultValue="medium" />
          <AddButton label="Add task" />
        </form>
        {tasks.length > 0 && (
          <ul className="divide-y divide-line">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{task.title}</p>
                  <p className="text-xs text-ink-soft">
                    {task.priority} priority{task.due_date ? ` · due ${formatDate(task.due_date)}` : ""}
                  </p>
                </div>
                <StatusSelectForm
                  action={updateTaskStatus}
                  id={task.id}
                  status={task.status}
                  options={TASK_STATUS_OPTIONS}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Deliverables" count={deliverables.length}>
        <form action={addDeliverable} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="project_id" value={project.id} />
          <QuickInput label="Name" name="name" required className="flex-1 min-w-[160px]" />
          <QuickInput label="Due" name="due_date" type="date" />
          <AddButton label="Add deliverable" />
        </form>
        {deliverables.length > 0 && (
          <ul className="divide-y divide-line">
            {deliverables.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{d.name}</p>
                  {d.due_date && <p className="text-xs text-ink-soft">due {formatDate(d.due_date)}</p>}
                </div>
                <StatusSelectForm
                  action={updateDeliverableStatus}
                  id={d.id}
                  status={d.status}
                  options={DELIVERABLE_STATUS_OPTIONS}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Risks" count={risks.length}>
        <form action={addRisk} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="project_id" value={project.id} />
          <QuickInput label="Title" name="title" required className="flex-1 min-w-[160px]" />
          <QuickSelect label="Severity" name="severity" options={["low", "medium", "high"]} defaultValue="medium" />
          <QuickSelect label="Likelihood" name="likelihood" options={["low", "medium", "high"]} defaultValue="medium" />
          <AddButton label="Add risk" />
        </form>
        {risks.length > 0 && (
          <ul className="divide-y divide-line">
            {risks.map((risk) => (
              <li key={risk.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{risk.title}</p>
                  <div className="mt-1 flex gap-1.5">
                    <Badge label={`${risk.severity} severity`} tone={RISK_TONE[risk.severity]} />
                    <Badge label={`${risk.likelihood} likelihood`} tone="neutral" />
                  </div>
                </div>
                <StatusSelectForm
                  action={updateRiskStatus}
                  id={risk.id}
                  status={risk.status}
                  options={RISK_STATUS_OPTIONS}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Decisions" count={decisions.length}>
        <form action={addDecision} className="space-y-2">
          <input type="hidden" name="project_id" value={project.id} />
          <div className="flex flex-wrap items-end gap-2">
            <QuickInput label="Title" name="title" required className="flex-1 min-w-[160px]" />
            <QuickInput label="Decided by" name="decided_by" />
            <QuickInput label="Date" name="decided_on" type="date" />
          </div>
          <div className="flex items-end gap-2">
            <label className="block flex-1">
              <span className="mb-1 block text-xs text-ink-soft">Description</span>
              <input
                name="description"
                className="w-full rounded-md border border-line bg-surface px-2.5 py-1.5 text-sm text-ink"
              />
            </label>
            <AddButton label="Add decision" />
          </div>
        </form>
        {decisions.length > 0 && (
          <ul className="divide-y divide-line">
            {decisions.map((decision) => (
              <li key={decision.id} className="py-2.5">
                <p className="text-sm text-ink">{decision.title}</p>
                <p className="text-xs text-ink-soft">
                  {[decision.decided_by, formatDate(decision.decided_on)].filter(Boolean).join(" · ") || "—"}
                </p>
                {decision.description && (
                  <p className="mt-1 text-sm text-ink-soft">{decision.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Meetings" count={meetings.length}>
        {meetings.length === 0 ? (
          <p className="text-sm text-ink-soft">
            No meetings logged yet — the full Meetings module arrives in Phase 6.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {meetings.map((meeting) => (
              <li key={meeting.id} className="flex items-center gap-2 py-2.5 text-sm text-ink">
                <CalendarDays size={14} strokeWidth={1.75} className="text-ink-soft" />
                {meeting.title}
                <span className="text-xs text-ink-soft">{formatDate(meeting.meeting_date)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Panel({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-line bg-surface p-5">
      <h3 className="font-serif text-base font-semibold text-ink">
        {title}
        {typeof count === "number" && (
          <span className="ml-2 font-mono text-xs font-normal text-ink-soft">{count}</span>
        )}
      </h3>
      {children}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <div className="text-xs text-ink-soft">{label}</div>
      <div className="mt-1 text-sm text-ink">{value || "—"}</div>
    </div>
  );
}

function QuickInput({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs text-ink-soft">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-line bg-surface px-2.5 py-1.5 text-sm text-ink"
      />
    </label>
  );
}

function QuickSelect({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-ink-soft">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-sm text-ink capitalize"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function AddButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="rounded-md border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
    >
      + {label}
    </button>
  );
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
