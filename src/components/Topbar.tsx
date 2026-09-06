"use client";

import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export default function Topbar() {
  const pathname = usePathname();
  const current = NAV.find((item) => item.href === pathname);
  const title = current?.label ?? "Consultant OS";

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-8 py-4">
      <h1 className="truncate font-serif text-xl font-semibold text-ink">
        {title}
      </h1>
      <button
        type="button"
        className="shrink-0 whitespace-nowrap rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent-soft"
      >
        + Quick add
      </button>
    </header>
  );
}
