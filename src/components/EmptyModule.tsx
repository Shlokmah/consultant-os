export default function EmptyModule({
  description,
  emptyLabel,
}: {
  description: string;
  emptyLabel: string;
}) {
  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-ink-soft">{description}</p>
      <div className="rounded-lg border border-dashed border-line p-10 text-center text-sm text-ink-soft">
        {emptyLabel}
      </div>
    </div>
  );
}
