"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  CalendarDays,
  BookOpen,
  Lightbulb,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { NAV } from "@/lib/nav";

const ICONS: Record<string, LucideIcon> = {
  "/": LayoutDashboard,
  "/clients": Users,
  "/projects": Briefcase,
  "/tasks": CheckSquare,
  "/meetings": CalendarDays,
  "/research": BookOpen,
  "/insights": Lightbulb,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-surface-2">
      <div className="flex items-center gap-2.5 border-b border-line px-6 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-serif text-sm font-semibold text-paper">
          C
        </div>
        <span className="font-serif text-lg font-semibold text-ink">
          Consultant OS
        </span>
      </div>

      <nav className="flex-1 px-3 py-5">
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = ICONS[item.href];
            return (
              <li key={item.href} className="relative">
                {active && (
                  <span className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent" />
                )}
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-accent-soft font-medium text-accent"
                      : "text-ink-soft hover:bg-accent-soft/60 hover:text-ink"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center gap-3 rounded-md px-3 py-2 text-ink-soft/70">
          <Sparkles size={17} strokeWidth={1.75} />
          <span className="font-mono text-[11px] tracking-wide uppercase">
            Assistant · Phase 11
          </span>
        </div>
      </nav>

      <div className="border-t border-line px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft font-mono text-[11px] font-medium text-accent">
            Y
          </div>
          <span className="text-xs text-ink-soft">Solo workspace</span>
        </div>
      </div>
    </aside>
  );
}
