import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AdminPageShell } from "./AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { adminApi } from "@/api/adminClient";
import {
  useAdminBachelorProgramsQuery,
  useBachelorProgramMutations,
} from "@/features/cms/hooks/useBachelorProgramsQueries";
import { bachelorFullTimeProgramDetailPath } from "@/data/bachelorFullTimePrograms";
import { bachelorCorrespondenceProgramDetailPath } from "@/data/bachelorCorrespondencePrograms";
import type { BachelorProgramTrack } from "@/types/bachelorPrograms";

const SUPPORTED_LOCALES = ["uz", "en", "ru"] as const;
type BachelorProgramLocale = (typeof SUPPORTED_LOCALES)[number];

/** The list fetch is always made with the current admin UI language, so the loaded
 * program's content is in that locale — the edit tab must start there too, otherwise it
 * mislabels the loaded content and can overwrite the wrong locale on save. */
function currentContentLocale(language: string): BachelorProgramLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(language) ? (language as BachelorProgramLocale) : "uz";
}

export default function AdminBachelorProgramEdit() {
  const { id = "" } = useParams<{ id: string }>();
  const isCreate = id === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation("admin");

  const { data: programs = [], isLoading } = useAdminBachelorProgramsQuery();
  const existing = !isCreate ? programs.find((p) => p.id === id) : undefined;
  const { create, update, remove, upsertTranslation } = useBachelorProgramMutations();

  const [editLocale, setEditLocale] = useState<BachelorProgramLocale>(() => currentContentLocale(i18n.language));
  const [loadingLocale, setLoadingLocale] = useState(false);

  const [track, setTrack] = useState<BachelorProgramTrack>("full-time");
  const [programNo, setProgramNo] = useState<number>(1);
  const [cipher, setCipher] = useState("");
  const [specialtyName, setSpecialtyName] = useState("");
  const [duration, setDuration] = useState("");
  const [qualification, setQualification] = useState("");
  const [totalCredits, setTotalCredits] = useState("");
  const [typeOfEducation, setTypeOfEducation] = useState("");
  const [instructionLanguages, setInstructionLanguages] = useState("");
  const [formOfEducation, setFormOfEducation] = useState("");
  const [descriptionParagraphs, setDescriptionParagraphs] = useState<string[]>([""]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    if (!existing) return;
    setEditLocale(currentContentLocale(i18n.language));
    setTrack(existing.track);
    setProgramNo(existing.programNo);
    setCipher(existing.cipher);
    setSpecialtyName(existing.specialtyName);
    setDuration(existing.duration);
    setQualification(existing.qualification);
    setTotalCredits(existing.totalCredits);
    setTypeOfEducation(existing.typeOfEducation);
    setInstructionLanguages(existing.instructionLanguages);
    setFormOfEducation(existing.formOfEducation);
    setDescriptionParagraphs(existing.descriptionParagraphs.length ? existing.descriptionParagraphs : [""]);
    setPdfUrl(existing.pdfUrl);
  }, [existing]);

  useEffect(() => {
    if (!isCreate || programs.length === 0) return;
    const maxNo = Math.max(0, ...programs.filter((p) => p.track === track).map((p) => p.programNo));
    setProgramNo((current) => (current > 0 ? current : maxNo + 1));
  }, [isCreate, programs, track]);

  const handleLocaleChange = async (newLocale: BachelorProgramLocale) => {
    if (isCreate) {
      toast({
        title: t("toastSaveProgramFirst", "Save the program first"),
        description: t("toastSaveProgramFirstDesc", "Create the program in Uzbek (uz) before adding translations."),
      });
      return;
    }
    if (newLocale === editLocale || !id) return;
    setLoadingLocale(true);
    try {
      const allPrograms = await adminApi.bachelorPrograms.list(undefined, newLocale);
      const localeData = allPrograms.find((p) => p.id === id);
      if (localeData) {
        setSpecialtyName(localeData.specialtyName || "");
        setDescriptionParagraphs(localeData.descriptionParagraphs.length ? localeData.descriptionParagraphs : [""]);
      } else {
        setSpecialtyName("");
        setDescriptionParagraphs([""]);
      }
      setEditLocale(newLocale);
    } catch (e) {
      toast({
        title: t("toastFailedSwitchLanguage", "Failed to switch language"),
        description: String(e),
        variant: "destructive",
      });
    } finally {
      setLoadingLocale(false);
    }
  };

  const handlePdfUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast({ title: t("toastSelectPdfFile", "Please select a PDF file"), variant: "destructive" });
      return;
    }
    setUploadingPdf(true);
    try {
      const { url } = await adminApi.media.upload(file);
      setPdfUrl(url);
      toast({ title: t("toastPdfUploaded", "PDF uploaded") });
    } catch (err) {
      toast({
        title: t("toastUploadFailed", "Upload failed"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    } finally {
      setUploadingPdf(false);
    }
  };

  const updateParagraph = (index: number, value: string) => {
    setDescriptionParagraphs((paras) => paras.map((p, i) => (i === index ? value : p)));
  };

  const addParagraph = () => setDescriptionParagraphs((paras) => [...paras, ""]);

  const removeParagraph = (index: number) =>
    setDescriptionParagraphs((paras) => (paras.length > 1 ? paras.filter((_, i) => i !== index) : paras));

  const saving = create.isPending || update.isPending || upsertTranslation.isPending;

  const handleSave = async () => {
    if (!specialtyName.trim()) {
      toast({ title: t("toastTitleRequired", "Program name is required"), variant: "destructive" });
      return;
    }

    if (!isCreate && editLocale !== "uz") {
      try {
        await upsertTranslation.mutateAsync({
          id,
          locale: editLocale,
          payload: { specialtyName, descriptionParagraphs: descriptionParagraphs.filter((p) => p.trim()) },
        });
        toast({ title: t("toastTranslationUpdated", { locale: editLocale.toUpperCase() }) });
      } catch (err) {
        toast({
          title: t("toastFailedSave", "Failed to save"),
          description: err instanceof Error ? err.message : undefined,
          variant: "destructive",
        });
      }
      return;
    }

    const payload = {
      track,
      programNo,
      cipher,
      specialtyName,
      duration,
      qualification,
      totalCredits,
      descriptionParagraphs: descriptionParagraphs.filter((p) => p.trim()),
      typeOfEducation,
      instructionLanguages,
      formOfEducation,
      pdfUrl,
      sortOrder: existing?.sortOrder ?? programNo,
    };
    try {
      if (isCreate) {
        const created = await create.mutateAsync(payload);
        toast({ title: t("bachelorProgramCreated", "Program created") });
        navigate(`/admin/bachelor-programs/${created.id}/edit`, { replace: true });
      } else {
        await update.mutateAsync({ id, payload });
        toast({ title: t("bachelorProgramSaved", "Program saved") });
      }
    } catch (err) {
      toast({
        title: t("toastFailedSave", "Failed to save"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (isCreate) return;
    if (!window.confirm(t("bachelorProgramDeleteConfirm", "Delete this program?"))) return;
    try {
      await remove.mutateAsync(id);
      toast({ title: t("bachelorProgramDeleted", "Program deleted") });
      navigate("/admin/bachelor-programs");
    } catch (err) {
      toast({
        title: t("bachelorProgramDeleteFailed", "Could not delete program"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  const publicPath =
    track === "correspondence"
      ? bachelorCorrespondenceProgramDetailPath(programNo)
      : bachelorFullTimeProgramDetailPath(programNo);

  if (!isCreate && isLoading) {
    return (
      <AdminPageShell title={t("editBachelorProgram", "Edit bachelor program")} bare>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminPageShell>
    );
  }

  if (!isCreate && !existing) {
    return (
      <AdminPageShell title={t("editBachelorProgram", "Edit bachelor program")} bare>
        <p className="text-muted-foreground">Program not found.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/admin/bachelor-programs">
            <ArrowLeft className="h-4 w-4" />
            {t("back", "Back")}
          </Link>
        </Button>
      </AdminPageShell>
    );
  }

  const pageTitle = isCreate
    ? t("addBachelorProgram", "Add bachelor program")
    : existing?.specialtyName || t("editBachelorProgram", "Edit bachelor program");

  return (
    <AdminPageShell title={pageTitle} bare>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin/bachelor-programs">
            <ArrowLeft className="h-4 w-4" />
            {t("back", "Back")}
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          {!isCreate ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to={publicPath} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t("viewPublicPage", "View public page")}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete} disabled={remove.isPending}>
                <Trash2 className="h-4 w-4" />
                {t("delete", "Delete")}
              </Button>
            </>
          ) : null}
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isCreate ? t("createProgram", "Create program") : t("save", "Save")}
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {SUPPORTED_LOCALES.map((locale) => (
          <Button
            key={locale}
            type="button"
            size="sm"
            variant={editLocale === locale ? "default" : "outline"}
            disabled={loadingLocale || isCreate}
            onClick={() => handleLocaleChange(locale)}
          >
            {locale.toUpperCase()}
          </Button>
        ))}
      </div>
      {isCreate ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {t("createProgramUzFirst", "Create the program in Uzbek first. Translations can be added after saving.")}
        </p>
      ) : null}

      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("metadataTitle", "Program details")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="track">{t("trackLabel", "Track")}</Label>
              <select
                id="track"
                value={track}
                onChange={(e) => setTrack(e.target.value as BachelorProgramTrack)}
                disabled={editLocale !== "uz"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="full-time">Bachelor's degree (Full-time)</option>
                <option value="correspondence">Baccalaureate (correspondence)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="programNo">{t("programNoLabel", "Program No.")}</Label>
              <Input
                id="programNo"
                type="number"
                min={1}
                value={programNo}
                onChange={(e) => setProgramNo(Number.parseInt(e.target.value, 10) || 0)}
                disabled={editLocale !== "uz"}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="specialtyName">{t("specialtyNameLabel", "Program name")}</Label>
              <Input id="specialtyName" value={specialtyName} onChange={(e) => setSpecialtyName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cipher">{t("cipherLabel", "Cipher")}</Label>
              <Input id="cipher" value={cipher} onChange={(e) => setCipher(e.target.value)} disabled={editLocale !== "uz"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">{t("qualificationLabel", "Qualification")}</Label>
              <Input
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                disabled={editLocale !== "uz"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">{t("durationLabel", "Duration")}</Label>
              <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} disabled={editLocale !== "uz"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalCredits">{t("totalCreditsLabel", "Total credits")}</Label>
              <Input
                id="totalCredits"
                value={totalCredits}
                onChange={(e) => setTotalCredits(e.target.value)}
                disabled={editLocale !== "uz"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeOfEducation">{t("typeOfEducationLabel", "Type of education")}</Label>
              <Input
                id="typeOfEducation"
                value={typeOfEducation}
                onChange={(e) => setTypeOfEducation(e.target.value)}
                disabled={editLocale !== "uz"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formOfEducation">{t("formOfEducationLabel", "Form of education")}</Label>
              <Input
                id="formOfEducation"
                value={formOfEducation}
                onChange={(e) => setFormOfEducation(e.target.value)}
                disabled={editLocale !== "uz"}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="instructionLanguages">
                {t("instructionLanguagesLabel", "Instruction languages")}
              </Label>
              <Input
                id="instructionLanguages"
                value={instructionLanguages}
                onChange={(e) => setInstructionLanguages(e.target.value)}
                placeholder="uzbek / russian / english"
                disabled={editLocale !== "uz"}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("overviewLabel", "Overview")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {descriptionParagraphs.map((para, i) => (
              <div key={i} className="flex gap-2">
                <Textarea
                  value={para}
                  onChange={(e) => updateParagraph(i, e.target.value)}
                  rows={3}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  onClick={() => removeParagraph(i)}
                  disabled={descriptionParagraphs.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addParagraph} className="gap-1.5">
              <Plus className="h-4 w-4" />
              {t("addParagraph", "Add paragraph")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("programPdfLabel", "Program PDF")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                {t("currentPdf", "Current PDF")}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">{t("noPdfYet", "No PDF uploaded yet.")}</p>
            )}
            <div>
              <input
                id="pdfUpload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) await handlePdfUpload(file);
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={uploadingPdf || editLocale !== "uz"}
                onClick={() => document.getElementById("pdfUpload")?.click()}
              >
                {uploadingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {pdfUrl ? t("replacePdf", "Replace PDF") : t("uploadPdf", "Upload PDF")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageShell>
  );
}
