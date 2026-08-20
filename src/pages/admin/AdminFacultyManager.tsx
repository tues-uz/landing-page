import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type AdminFacultyManagerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculties: StudyProgramFaculty[];
};

export function AdminFacultyManager({ open, onOpenChange, faculties }: AdminFacultyManagerProps) {
  const { t } = useTranslation("admin");
  const { toast } = useToast();
  const { create, update, remove } = useFacultyMutations();

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

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
    setEditingId(faculty.id);
    setEditingTitle(faculty.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleRename = async (facultyId: string) => {
    const title = editingTitle.trim();
    if (!title) return;
    try {
      await update.mutateAsync({ facultyId, payload: { title } });
      cancelEdit();
      toast({ title: t("facultyUpdated", "Faculty updated") });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("manageFaculties", "Manage faculties")}</DialogTitle>
          <DialogDescription>
            {t(
              "manageFacultiesDescription",
              "Faculties group study programs on the public site. Add, rename, or remove them here.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-72 overflow-y-auto">
          {faculties.length === 0 && (
            <p className="text-sm text-muted-foreground py-2">{t("noFacultiesYet", "No faculties yet.")}</p>
          )}
          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2"
            >
              {editingId === faculty.id ? (
                <>
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="h-8"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename(faculty.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleRename(faculty.id)}
                    disabled={update.isPending}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={cancelEdit}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
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
                    onClick={() => startEdit(faculty)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(faculty)}
                    disabled={remove.isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder={t("newFacultyTitlePlaceholder", "New faculty name…")}
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
