import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageShell } from "./AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, Search, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useAdminBachelorProgramsQuery,
  useBachelorProgramMutations,
} from "@/features/cms/hooks/useBachelorProgramsQueries";
import { bachelorFullTimeProgramDetailPath } from "@/data/bachelorFullTimePrograms";
import { bachelorCorrespondenceProgramDetailPath } from "@/data/bachelorCorrespondencePrograms";
import type { BachelorProgramItem, BachelorProgramTrack } from "@/types/bachelorPrograms";

const TRACKS: { slug: BachelorProgramTrack; label: string }[] = [
  { slug: "full-time", label: "Bachelor's degree (Full-time)" },
  { slug: "correspondence", label: "Baccalaureate (correspondence)" },
];

function detailPathFor(program: BachelorProgramItem): string {
  return program.track === "correspondence"
    ? bachelorCorrespondenceProgramDetailPath(program.programNo)
    : bachelorFullTimeProgramDetailPath(program.programNo);
}

export default function AdminBachelorPrograms() {
  const { t } = useTranslation("admin");
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const { data: programs = [], isLoading } = useAdminBachelorProgramsQuery();
  const { remove } = useBachelorProgramMutations();

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return programs;
    return programs.filter(
      (p) =>
        p.specialtyName.toLowerCase().includes(s) ||
        p.cipher.toLowerCase().includes(s) ||
        p.qualification.toLowerCase().includes(s),
    );
  }, [q, programs]);

  const handleDelete = async (program: BachelorProgramItem) => {
    if (!window.confirm(t("bachelorProgramDeleteConfirm", "Delete this program?"))) return;
    try {
      await remove.mutateAsync(program.id);
      toast({ title: t("bachelorProgramDeleted", "Program deleted") });
    } catch (err) {
      toast({
        title: t("bachelorProgramDeleteFailed", "Could not delete program"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  return (
    <AdminPageShell
      title={t("bachelorPrograms", "Bachelor Programs")}
      description={t(
        "bachelorProgramsDescription",
        "Manage the course catalogue shown under Education → Bachelor (full-time and correspondence tracks).",
      )}
      actions={
        <>
          <Button size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/admin/bachelor-programs/new/edit">
              <Plus className="h-4 w-4" />
              {t("addBachelorProgram", "Add program")}
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/education/bachelor" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              {t("openCatalogue", "Open catalogue")}
            </Link>
          </Button>
        </>
      }
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("searchBachelorProgramsPlaceholder", "Search by name, cipher, or qualification…")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9 h-10"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-10">
          {TRACKS.map(({ slug, label }) => {
            const rows = filtered
              .filter((p) => p.track === slug)
              .sort((a, b) => a.sortOrder - b.sortOrder);
            if (rows.length === 0) return null;
            return (
              <section key={slug}>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">{label}</h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs text-slate-500">
                        <th className="px-4 py-3 font-medium">Program</th>
                        <th className="px-4 py-3 font-medium">Cipher</th>
                        <th className="px-4 py-3 font-medium">Qualification</th>
                        <th className="px-4 py-3 font-medium">Duration</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((program) => (
                        <tr key={program.id} className="border-b border-slate-100 last:border-0">
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {program.specialtyName.replace(/;\s*$/, "").trim() || `Programme №${program.programNo}`}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-600">{program.cipher}</td>
                          <td className="px-4 py-3 text-slate-600">{program.qualification}</td>
                          <td className="px-4 py-3 text-slate-600">{program.duration}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Button size="sm" className="h-8 rounded-md px-3 text-xs" asChild>
                                <Link to={`/admin/bachelor-programs/${program.id}/edit`}>
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                                <Link to={detailPathFor(program)} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                                onClick={() => handleDelete(program)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No bachelor programs match your search.
            </p>
          )}
        </div>
      )}
    </AdminPageShell>
  );
}
