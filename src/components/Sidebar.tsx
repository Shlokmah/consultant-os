"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-surface-2">
      <div className="border-b border-line px-6 py-6">
        <span className="font-serif text-lg font-semibold text-ink">
          Consultant OS
        </span>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-accent-soft font-medium text-accent"
                      : "text-ink-soft hover:bg-accent-soft/60 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-3 px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-later">
            Assistant · Phase 11
          </li>
        </ul>
      </nav>
    </aside>
  );
}
