"use client";

import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { NAV } from "@/lib/nav";

export default function Topbar() {
  const pathname = usePathname();
  const current = NAV.find((item) => item.href === pathname);
  const title = current?.label ?? "Consultant OS";

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-8 py-5">
      <h1 className="truncate font-serif text-xl font-semibold text-ink">
        {title}
      </h1>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs whitespace-nowrap text-accent transition-colors hover:border-accent/40 hover:bg-accent-soft"
      >
        <Plus size={14} strokeWidth={2} />
        Quick add
      </button>
    </header>
  );
}
