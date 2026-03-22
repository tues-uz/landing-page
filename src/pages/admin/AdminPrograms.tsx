import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { programs } from "@/components/Programs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, GraduationCap, Search, Copy, FileText, Pencil } from "lucide-react";

export default function AdminPrograms() {
  const { toast } = useToast();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return programs;
    return programs.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
    );
  }, [q]);

  const copySlug = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(slug);
      toast({ title: "Slug copied", description: slug });
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  return (
    <AdminPageShell
      title="Programs"
      description="Catalog shown on the public site — edit entries in code; upload PDFs in public/program-brochures/."
      actions={
        <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
          <Link to="/programs" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Open programs page
          </Link>
        </Button>
      }
    >
      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            PDF brochures
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Default: three files in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">public/program-brochures/</code> by slug. In{" "}
            <strong>Edit details</strong> you can upload PDFs (media API) or set URLs in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">programDetailConfig.ts</code> to override the public
            download cards.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title, slug, or description…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9 h-10 rounded-lg"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} of {programs.length} programs
        {q.trim() ? ` matching “${q.trim()}”` : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => {
          const Icon = p.icon;
          return (
            <article
              key={p.id}
              className="group flex flex-col rounded-xl border border-slate-200/65 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_6px_16px_-4px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start gap-3">
                <Icon
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-slate-400 transition-colors group-hover:text-slate-600"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-medium leading-snug tracking-tight text-slate-900">{p.title}</h3>
                  <p className="mt-2 flex min-w-0 flex-nowrap items-center gap-2 text-xs text-slate-500">
                    <span className="min-w-0 truncate font-mono text-[11px] text-slate-400" title={p.slug}>
                      {p.slug}
                    </span>
                    <span className="shrink-0 text-slate-300 select-none" aria-hidden>
                      ·
                    </span>
                    <span className="shrink-0 text-slate-500">{p.count}</span>
                  </p>
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-100 pt-4">
                <Button size="sm" className="h-8 rounded-md px-3 text-xs font-medium shadow-none" asChild>
                  <Link to={`/admin/programs/${p.slug}/edit`}>
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                </Button>
                <div className="flex flex-wrap items-center gap-x-1 text-xs text-slate-400">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-normal text-slate-600 hover:text-slate-900" asChild>
                    <Link to={`/programs/${p.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      View page
                    </Link>
                  </Button>
                  <span className="hidden sm:inline text-slate-200">|</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs font-normal text-slate-600 hover:text-slate-900"
                    onClick={() => copySlug(p.slug)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy slug
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">No programs match your search.</p>
      )}

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            Edit program data
          </CardTitle>
          <CardDescription>
            Grid + detail header fields live in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">Programs.tsx</code>. Introduction, sidebar
            facts, and hero URL overrides live in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">programDetailConfig.ts</code> — same merge
            rules as the public program page (<code className="text-xs">getProgramDetailViewModel</code>).
          </CardDescription>
        </CardHeader>
      </Card>
    </AdminPageShell>
  );
}
