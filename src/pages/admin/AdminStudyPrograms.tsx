import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageShell } from "./AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink, Search, Copy, Loader2, Pencil, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAdminStudyProgramsQuery } from "@/features/cms/hooks/useStudyProgramsQueries";
import {
  getStudyProgramCourseCount,
  studyProgramDetailPath,
} from "@/data/studyProgramsCurriculum";

export default function AdminStudyPrograms() {
  const { t } = useTranslation("admin");
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const { data: faculties = [], isLoading } = useAdminStudyProgramsQuery();

  const rows = useMemo(
    () =>
      faculties.flatMap((faculty) =>
        faculty.programs.map((program) => ({
          faculty,
          program,
          courseCount: getStudyProgramCourseCount(program),
        })),
      ),
    [faculties],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      ({ program, faculty }) =>
        program.title.toLowerCase().includes(s) ||
        program.id.toLowerCase().includes(s) ||
        program.code.toLowerCase().includes(s) ||
        program.degreeLevel.toLowerCase().includes(s) ||
        faculty.title.toLowerCase().includes(s),
    );
  }, [q, rows]);

  const copyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      toast({ title: t("toastProgramIdCopied"), description: id });
    } catch {
      toast({ title: t("toastCouldNotCopy"), variant: "destructive" });
    }
  };

  return (
    <AdminPageShell
      title={t("studyPrograms", "Study Programs")}
      description={t(
        "studyProgramsDescriptionLong",
      )}
      actions={
        <>
          <Button size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/admin/study-programs/new/edit">
              <Plus className="h-4 w-4" />
              {t("addStudyProgram", "Add program")}
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/programs" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              {t("openProgramsPage", "Open programs page")}
            </Link>
          </Button>
        </>
      }
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("searchStudyProgramsPlaceholder", "Search by title, code, or faculty…")}
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
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {t("of", "of")} {rows.length}{" "}
            {t("studyProgramsCount", "study programs")}
            {q.trim() ? ` ${t("matching", "matching")} "${q.trim()}"` : ""}
          </p>

          <div className="space-y-10">
            {faculties.map((faculty) => {
              const facultyRows = filtered.filter(({ faculty: f }) => f.id === faculty.id);
              if (facultyRows.length === 0) return null;
              return (
                <section key={faculty.id}>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">{faculty.title}</h2>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs text-slate-500">
                          <th className="px-4 py-3 font-medium">Program</th>
                          <th className="px-4 py-3 font-medium">Code</th>
                          <th className="px-4 py-3 font-medium">Degree</th>
                          <th className="px-4 py-3 font-medium">Courses</th>
                          <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facultyRows.map(({ program, courseCount }) => (
                          <tr key={program.id} className="border-b border-slate-100 last:border-0">
                            <td className="px-4 py-3 font-medium text-slate-900">{program.title}</td>
                            <td className="px-4 py-3 font-mono text-xs text-slate-600">{program.code}</td>
                            <td className="px-4 py-3 text-slate-600">{program.degreeLevel}</td>
                            <td className="px-4 py-3 text-slate-600">{courseCount}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <Button size="sm" className="h-8 rounded-md px-3 text-xs" asChild>
                                  <Link to={`/admin/study-programs/${program.id}/edit`}>
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                                  <Link
                                    to={studyProgramDetailPath(program.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    View
                                  </Link>
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-xs"
                                  onClick={() => copyId(program.id)}
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy ID
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
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No study programs match your search.
            </p>
          )}
        </>
      )}
    </AdminPageShell>
  );
}
