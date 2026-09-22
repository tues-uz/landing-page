import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Pencil, Plus, Trash2, Check, X } from "lucide-react";
import { useFacultyMutations } from "@/features/cms/hooks/useStudyProgramsQueries";
import type { StudyProgramFaculty } from "@/types/studyPrograms";

const SUPPORTED_LOCALES = ["uz", "en", "ru", "zh"] as const;
type FacultyLocale = (typeof SUPPORTED_LOCALES)[number];
/** Base-record locale: its title lives in `faculties.title`, the rest in `faculty_translations`. */
const BASE_LOCALE: FacultyLocale = "uz";
const TRANSLATED_LOCALES: FacultyLocale[] = SUPPORTED_LOCALES.filter((locale) => locale !== BASE_LOCALE);

type FacultyTitles = Record<FacultyLocale, string>;

type AdminFacultyManagerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculties: StudyProgramFaculty[];
};

/** Current stored titles per locale: translations are only present when actually saved. */
function storedTitles(faculty: StudyProgramFaculty): FacultyTitles {
  const titles = faculty.titles ?? {};
  return {
    uz: titles.uz ?? faculty.title,
    en: titles.en ?? "",
    ru: titles.ru ?? "",
    zh: titles.zh ?? "",
  };
}

export function AdminFacultyManager({ open, onOpenChange, faculties }: AdminFacultyManagerProps) {
  const { t } = useTranslation("admin");
  const { toast } = useToast();
  const { create, update, remove, upsertTranslation, removeTranslation } = useFacultyMutations();

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titles, setTitles] = useState<FacultyTitles>({ uz: "", en: "", ru: "", zh: "" });
  const [original, setOriginal] = useState<FacultyTitles>({ uz: "", en: "", ru: "", zh: "" });

  const handleCreate = async () => {
    const title = newTitle.trim();
    if (!title) return;
    try {
      await create.mutateAsync({ title });
      setNewTitle("");
      toast({ title: t("facultyCreated", "Faculty added") });
    } catch (err) {
      toast({
        title: t("facultyCreateFailed", "Could not add faculty"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  const startEdit = (faculty: StudyProgramFaculty) => {
    const current = storedTitles(faculty);
    setEditingId(faculty.id);
    setTitles(current);
    setOriginal(current);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitles({ uz: "", en: "", ru: "", zh: "" });
    setOriginal({ uz: "", en: "", ru: "", zh: "" });
  };

  const handleSave = async (facultyId: string) => {
    const baseTitle = titles.uz.trim();
    if (!baseTitle) {
      toast({
        title: t("facultyTitleRequired", "The Uzbek name is required"),
        variant: "destructive",
      });
      return;
    }
    try {
      const jobs: Promise<unknown>[] = [];
      if (baseTitle !== original.uz) {
        jobs.push(update.mutateAsync({ facultyId, payload: { title: baseTitle } }));
      }
      for (const locale of TRANSLATED_LOCALES) {
        const value = titles[locale].trim();
        const hadTranslation = Boolean(original[locale]);
        if (value && value !== original[locale]) {
          jobs.push(upsertTranslation.mutateAsync({ facultyId, locale, title: value }));
        } else if (!value && hadTranslation) {
          // Cleared field -> remove the translation so the locale falls back to uz again.
          jobs.push(removeTranslation.mutateAsync({ facultyId, locale }));
        }
      }
      if (jobs.length) await Promise.all(jobs);
      cancelEdit();
      toast({ title: t("toastFacultyTranslationsSaved", "Faculty names saved") });
    } catch (err) {
      toast({
        title: t("facultyUpdateFailed", "Could not update faculty"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (faculty: StudyProgramFaculty) => {
    if (faculty.programs.length > 0) {
      toast({
        title: t("facultyHasPrograms", "This faculty still has programs"),
        description: t(
          "facultyHasProgramsDescription",
          "Move or delete its study programs before removing the faculty.",
        ),
        variant: "destructive",
      });
      return;
    }
    if (!window.confirm(t("facultyDeleteConfirm", "Delete this faculty?"))) return;
    try {
      if (editingId === faculty.id) cancelEdit();
      await remove.mutateAsync(faculty.id);
      toast({ title: t("facultyDeleted", "Faculty deleted") });
    } catch (err) {
      toast({
        title: t("facultyDeleteFailed", "Could not delete faculty"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  const saving = update.isPending || upsertTranslation.isPending || removeTranslation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("manageFaculties", "Manage faculties")}</DialogTitle>
          <DialogDescription>
            {t(
              "manageFacultiesDescription",
              "Faculties group study programs on the public site. Add, rename, or remove them here.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {faculties.length === 0 && (
            <p className="text-sm text-muted-foreground py-2">{t("noFacultiesYet", "No faculties yet.")}</p>
          )}
          {faculties.map((faculty) => (
            <div key={faculty.id} className="rounded-md border border-slate-200">
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{faculty.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {faculty.programs.length}{" "}
                    {faculty.programs.length === 1 ? t("program", "program") : t("programs", "programs")}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                  onClick={() => (editingId === faculty.id ? cancelEdit() : startEdit(faculty))}
                  aria-label={t("edit", "Edit")}
                >
                  {editingId === faculty.id ? <X className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(faculty)}
                  disabled={remove.isPending}
                  aria-label={t("delete", "Delete")}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {editingId === faculty.id && (
                <div className="space-y-3 border-t border-slate-100 bg-slate-50/60 px-3 py-3">
                  {SUPPORTED_LOCALES.map((locale) => (
                    <div key={locale} className="space-y-1">
                      <Label
                        htmlFor={`faculty-title-${faculty.id}-${locale}`}
                        className="text-xs uppercase text-muted-foreground"
                      >
                        {locale}
                      </Label>
                      <Input
                        id={`faculty-title-${faculty.id}-${locale}`}
                        className="h-8"
                        value={titles[locale]}
                        onChange={(e) => setTitles((current) => ({ ...current, [locale]: e.target.value }))}
                        placeholder={locale === BASE_LOCALE ? undefined : titles.uz}
                        autoFocus={locale === BASE_LOCALE}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSave(faculty.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    {t(
                      "facultyTranslationHint",
                      "Leave EN/RU/ZH empty to fall back to the Uzbek name.",
                    )}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>
                      {t("cancel", "Cancel")}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSave(faculty.id)}
                      disabled={saving || !titles.uz.trim()}
                      className="gap-1.5"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                      {t("save", "Save")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder={t("newFacultyTitlePlaceholder", "New faculty name (Uzbek)…")}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
            <Button onClick={handleCreate} disabled={create.isPending || !newTitle.trim()} className="shrink-0 gap-1.5">
              {create.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {t("add", "Add")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
