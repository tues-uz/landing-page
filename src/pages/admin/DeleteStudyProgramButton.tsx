import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useStudyProgramMutations } from "@/features/cms/hooks/useStudyProgramsQueries";

type DeleteStudyProgramButtonProps = {
  programId: string;
  programTitle?: string;
  /** Called after a successful delete (e.g. to navigate away from the edit page). */
  onDeleted?: () => void;
};

/** Destructive action with an explicit confirmation dialog, shared by the study
 * programs list and the edit page so both behave the same way. */
export function DeleteStudyProgramButton({ programId, programTitle, onDeleted }: DeleteStudyProgramButtonProps) {
  const { t } = useTranslation("admin");
  const { toast } = useToast();
  const { remove } = useStudyProgramMutations();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (remove.isPending) return;
    try {
      await remove.mutateAsync(programId);
      setOpen(false);
      toast({ title: t("toastStudyProgramDeleted", "Study program deleted") });
      onDeleted?.();
    } catch (err) {
      toast({
        title: t("toastStudyProgramDeleteFailed", "Could not delete study program"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 px-2 text-xs text-destructive hover:text-destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-3.5 w-3.5" />
        {t("delete", "Delete")}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteProgramTitle", "Delete study program?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                "deleteProgramConfirm",
                'This will permanently delete "{{title}}" and all of its translations. This action cannot be undone.',
                { title: programTitle ?? programId },
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel", "Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
              disabled={remove.isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {remove.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              {t("delete", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
