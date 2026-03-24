import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { staticPrograms } from "@/components/Programs";
import { adminApi } from "@/api/adminClient";
import { programsKeys } from "@/api/queryKeys";
import { withEnglishProgramTitles } from "@/lib/localeContent";
import { getProgramHeroImageUrl } from "@/data/programHeroImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  ExternalLink,
  GraduationCap,
  Search,
  Copy,
  Loader2,
  Pencil,
  Plus,
} from "lucide-react";

export default function AdminPrograms() {
  const { toast } = useToast();
  const [q, setQ] = useState("");

  const { data: programs = staticPrograms, isLoading } = useQuery({
    queryKey: programsKeys.list(),
    queryFn: adminApi.programs.list,
  });

  /** Same English catalog overlay as the public site — CMS rows are often Uzbek. */
  const programsDisplay = useMemo(() => withEnglishProgramTitles(programs), [programs]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return programsDisplay;
    return programsDisplay.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
    );
  }, [q, programsDisplay]);

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
      description="Manage program catalog — edit entries via the CMS;\nupload PDFs in public/program-brochures/."
      actions={
        <>
          <Button size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/admin/programs/new">
              <Plus className="h-4 w-4" />
              Add program
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/programs" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open programs page
            </Link>
          </Button>
        </>
      }
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title, slug, or description…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9 h-10 rounded-lg"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {programsDisplay.length} programs
            {q.trim() ? ` matching "${q.trim()}"` : ""}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => {
              return (
                <article
                  key={p.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.12)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                    <img
                      src={getProgramHeroImageUrl(p)}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/10"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 pt-10">
                      <div className="flex items-end justify-between gap-3">
                        <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug tracking-tight text-white drop-shadow-md [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] line-clamp-2">
                          {p.title}
                        </h3>
                        {p.count ? (
                          <span className="shrink-0 rounded-md border border-white/25 bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                            {p.count}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 px-5 pb-4 pt-4">
                    <div className="border-b border-slate-100 pb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Slug</p>
                      <code className="mt-1 block truncate font-mono text-[12px] text-slate-800" title={p.slug}>
                        {p.slug}
                      </code>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                  </div>

                  <div className="bg-white px-5 pb-4 pt-0">
                    <nav
                      className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-1.5"
                      aria-label="Program actions"
                    >
                      <Button
                        size="sm"
                        className="h-10 flex-1 gap-2 rounded-xl font-medium shadow-sm sm:min-h-0"
                        asChild
                      >
                        <Link to={`/admin/programs/${p.slug}/edit`}>
                          <Pencil className="h-4 w-4 opacity-90" aria-hidden />
                          Edit
                        </Link>
                      </Button>
                      <div className="flex min-h-[2.5rem] shrink-0 gap-1.5 sm:min-h-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 shrink-0 rounded-xl border-slate-200/90 bg-white/90 text-slate-700 shadow-sm hover:bg-white"
                          asChild
                        >
                          <Link
                            to={`/programs/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View public page: ${p.title}`}
                          >
                            <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          title={`Copy slug: ${p.slug}`}
                          aria-label={`Copy slug: ${p.slug}`}
                          className="h-10 w-10 shrink-0 rounded-xl border-slate-200/90 bg-white/90 text-slate-700 shadow-sm hover:bg-white"
                          onClick={() => copySlug(p.slug)}
                        >
                          <Copy className="h-4 w-4 opacity-90" aria-hidden />
                        </Button>
                      </div>
                    </nav>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">No programs match your search.</p>
          )}
        </>
      )}

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            Edit program data
          </CardTitle>
          <CardDescription>
            All program fields are stored in the database and editable via the CMS. Click{" "}
            <strong>Edit</strong> on any program to update its catalog fields, detail page content, hero image, and PDF URLs.
          </CardDescription>
        </CardHeader>
      </Card>
    </AdminPageShell>
  );
}
