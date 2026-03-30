import { ReactNode } from "react";

/** Shared layout for every admin page: same header block + content area. */
export const ADMIN_CARD_CLASS = "rounded-xl border border-slate-200 bg-white shadow-sm";

interface AdminPageShellProps {
  /** Page title (e.g. "Dashboard", "Hero section", "News", "Events", "Programs") */
  title: string;
  /** Optional short description under the page title (default: "Welcome back, Admin 👋") */
  description?: string;
  children: ReactNode;
  /** Optional actions (e.g. "Add article" button) to show on the right of the title row */
  actions?: ReactNode;
  /** When true, skip the default header (TUES CMS + title). Use for form pages that have their own top bar. */
  bare?: boolean;
}

export function AdminPageShell({ title, description = "Welcome back, Admin 👋", children, actions, bare }: AdminPageShellProps) {
  if (bare) {
    return <div className="space-y-6 p-6">{children}</div>;
  }
  return (
    <div className="p-6">
      <header className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50/95 via-white to-white px-5 py-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)] ring-1 ring-slate-900/[0.03] sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1 space-y-2.5">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem] md:leading-snug">
              {title}
            </h1>
            {description ? (
              <p className="max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-slate-600">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">{actions}</div>
          ) : null}
        </div>
      </header>
      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}
