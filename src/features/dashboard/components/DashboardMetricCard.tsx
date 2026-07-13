import { Link } from "react-router-dom";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardMetricCardProps {
  to: string;
  label: string;
  value: number;
  icon: LucideIcon;
}

export function DashboardMetricCard({ to, label, value, icon: Icon }: DashboardMetricCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative flex h-full min-h-[8.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted/20 hover:shadow-md",
      )}
    >
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/60 transition-colors duration-300 group-hover:bg-muted group-hover:border-foreground/10">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div className="relative mt-4 space-y-1">
        <p className="text-[13px] font-medium leading-snug text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold tabular-nums tracking-tight text-foreground">{value}</p>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-foreground/20 transition-all duration-300 group-hover:w-full"
      />
    </Link>
  );
}
