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
    return <div className="space-y-6">{children}</div>;
  }
  return (
    <div className="space-y-8">
      {/* Same two-block header on every page (matches reference 5175) */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">TUES CMS</h1>
        <p className="mt-0.5 text-sm text-slate-500">Content management</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
