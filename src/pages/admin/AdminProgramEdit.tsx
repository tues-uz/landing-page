import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { adminApi } from "@/api/adminClient";
import { programsKeys } from "@/api/queryKeys";
import { getProgramDetailViewModelFromItem } from "@/lib/programDetailDisplay";
import { getProgramIcon } from "@/lib/programIconMap";
import { PROGRAM_ICON_MAP } from "@/lib/programIconMap";
import { slugifyFromTitle } from "@/lib/slugifyTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ExternalLink, Copy, FileText, Loader2, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import type { ProgramItem } from "@/api/client";

const MAX_PDF_MB = 40;

type PdfKind = "brochure" | "admissions" | "curriculum";

export default function AdminProgramEdit() {
  const { slug: editSlug } = useParams<{ slug: string }>();
  const isCreate = !!useMatch({ path: "/admin/programs/new", end: true });
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: program, isLoading } = useQuery({
    queryKey: programsKeys.detail(editSlug!),
    queryFn: () => adminApi.programs.getBySlug(editSlug!),
    enabled: !isCreate && !!editSlug,
  });

  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [iconName, setIconName] = useState("BookOpen");

  const [introduction, setIntroduction] = useState("");
  const [careerOutcomes, setCareerOutcomes] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [duration, setDuration] = useState("");
  const [languages, setLanguages] = useState("");
  const [pace, setPace] = useState("");
  const [studyFormat, setStudyFormat] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [tuition, setTuition] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [brochurePdfUrl, setBrochurePdfUrl] = useState("");
  const [admissionsPdfUrl, setAdmissionsPdfUrl] = useState("");
  const [curriculumPdfUrl, setCurriculumPdfUrl] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState<PdfKind | null>(null);
  /** How many PDF slots to show (1–3). Maps to brochure → admissions → curriculum on the public page. */
  const [pdfSlotCount, setPdfSlotCount] = useState(1);
  const [localPdfFileName, setLocalPdfFileName] = useState<Partial<Record<PdfKind, string>>>({});

  const brochurePdfInputRef = useRef<HTMLInputElement>(null);
  const admissionsPdfInputRef = useRef<HTMLInputElement>(null);
  const curriculumPdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!program) return;
    setTitle(program.title);
    setCount(program.count);
    setDescription(program.description);
    setLongDescription(program.longDescription);
    setHighlightsText(program.highlights.join("\n"));
    setIconName(program.iconName || "BookOpen");

    // Apply same defaults as the public detail page so the admin sees what visitors see
    const view = getProgramDetailViewModelFromItem(program);
    setIntroduction(view.introduction);
    setCareerOutcomes(view.careerOutcomes);
    setDegreeType(view.degreeType);
    setDuration(view.duration);
    setLanguages(view.languages);
    setPace(view.pace);
    setStudyFormat(view.studyFormat);
    setApplicationDeadline(view.applicationDeadline);
    setStartDate(view.startDate);
    setTuition(view.tuition);
    setHeroImageUrl(program.heroImageUrl || "");
    setBrochurePdfUrl(program.brochurePdfUrl || "");
    setAdmissionsPdfUrl(program.admissionsPdfUrl || "");
    setCurriculumPdfUrl(program.curriculumPdfUrl || "");
    let slots = 1;
    if (program.curriculumPdfUrl?.trim()) slots = 3;
    else if (program.admissionsPdfUrl?.trim()) slots = 2;
    setPdfSlotCount(slots);
    setLocalPdfFileName({});
  }, [program]);

  const saveMutation = useMutation({
    mutationFn: (payload: Partial<ProgramItem>) => adminApi.programs.update(program!.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programsKeys.list() });
      queryClient.invalidateQueries({ queryKey: programsKeys.detail(editSlug!) });
      toast({ title: "Saved", description: "Program updated." });
    },
    onError: (err) =>
      toast({ title: "Save failed", description: String(err), variant: "destructive" }),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Omit<ProgramItem, "id">) => adminApi.programs.create(payload),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: programsKeys.list() });
      toast({ title: "Created", description: "Program added." });
      navigate(`/admin/programs/${created.slug}/edit`, { replace: true });
    },
    onError: (err) =>
      toast({ title: "Could not create program", description: String(err), variant: "destructive" }),
  });

  const buildPayload = (): Omit<ProgramItem, "id"> => {
    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      slug: slugifyFromTitle(title),
      title,
      count,
      description,
      longDescription,
      highlights,
      iconName,
      introduction,
      careerOutcomes,
      degreeType,
      duration,
      languages,
      pace,
      studyFormat,
      applicationDeadline,
      startDate,
      tuition,
      heroImageUrl,
      brochurePdfUrl,
      admissionsPdfUrl,
      curriculumPdfUrl,
    };
  };

  const handleSave = () => {
    const newSlug = slugifyFromTitle(title);
    if (!newSlug.trim()) {
      toast({ title: "Title required", description: "Enter a title to generate the URL slug.", variant: "destructive" });
      return;
    }
    if (isCreate) {
      createMutation.mutate(buildPayload());
      return;
    }
    if (!program) return;
    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    saveMutation.mutate({
      title,
      count,
      description,
      longDescription,
      highlights,
      iconName,
      introduction,
      careerOutcomes,
      degreeType,
      duration,
      languages,
      pace,
      studyFormat,
      applicationDeadline,
      startDate,
      tuition,
      heroImageUrl,
      brochurePdfUrl,
      admissionsPdfUrl,
      curriculumPdfUrl,
    });
  };

  const handlePdfSelected = async (kind: PdfKind, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      toast({ title: "Please choose a PDF file", variant: "destructive" });
      return;
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      toast({ title: `PDF too large (max ${MAX_PDF_MB} MB)`, variant: "destructive" });
      return;
    }
    setLocalPdfFileName((prev) => ({ ...prev, [kind]: file.name }));
    setUploadingPdf(kind);
    try {
      const { url } = await adminApi.media.upload(file);
      if (kind === "brochure") setBrochurePdfUrl(url);
      if (kind === "admissions") setAdmissionsPdfUrl(url);
      if (kind === "curriculum") setCurriculumPdfUrl(url);
      toast({ title: "PDF uploaded", description: "URL set — save the program to persist." });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: `${String(err)} — Copy the file into public/program-brochures/ manually if needed.`,
        variant: "destructive",
      });
    } finally {
      setUploadingPdf(null);
    }
  };

  /** Slug used in PDF path hints — from title when creating, from URL when editing. */
  const slugForPdf = isCreate ? slugifyFromTitle(title) || "your-slug" : (editSlug ?? "");

  const PDF_SLOTS: {
    kind: PdfKind;
    label: string;
    hint: string;
    placeholder: string;
    inputRef: RefObject<HTMLInputElement | null>;
  }[] = [
    {
      kind: "brochure",
      label: "PDF 1 · Brochure",
      hint: "Overview & highlights (matches first download card)",
      placeholder: `Default file: /program-brochures/${slugForPdf}.pdf`,
      inputRef: brochurePdfInputRef,
    },
    {
      kind: "admissions",
      label: "PDF 2 · Admissions",
      hint: "Apply & requirements (second card)",
      placeholder: `Default file: /program-brochures/${slugForPdf}-admissions.pdf`,
      inputRef: admissionsPdfInputRef,
    },
    {
      kind: "curriculum",
      label: "PDF 3 · Curriculum",
      hint: "Courses & structure (third card)",
      placeholder: `Default file: /program-brochures/${slugForPdf}-curriculum.pdf`,
      inputRef: curriculumPdfInputRef,
    },
  ];

  const getPdfUrl = (kind: PdfKind) =>
    kind === "brochure" ? brochurePdfUrl : kind === "admissions" ? admissionsPdfUrl : curriculumPdfUrl;
  const setPdfUrl = (kind: PdfKind, v: string) => {
    if (kind === "brochure") setBrochurePdfUrl(v);
    else if (kind === "admissions") setAdmissionsPdfUrl(v);
    else setCurriculumPdfUrl(v);
  };

  const addPdfSlot = () => setPdfSlotCount((c) => Math.min(3, c + 1));

  const removeLastPdfSlot = () => {
    if (pdfSlotCount <= 1) return;
    if (pdfSlotCount === 3) {
      setCurriculumPdfUrl("");
      setLocalPdfFileName((p) => {
        const n = { ...p };
        delete n.curriculum;
        return n;
      });
      setPdfSlotCount(2);
      return;
    }
    setAdmissionsPdfUrl("");
    setCurriculumPdfUrl("");
    setLocalPdfFileName((p) => {
      const n = { ...p };
      delete n.admissions;
      delete n.curriculum;
      return n;
    });
    setPdfSlotCount(1);
  };

  const copyJson = async () => {
    if (isCreate) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(buildPayload(), null, 2));
        toast({ title: "Copied JSON", description: "Draft program data." });
      } catch {
        toast({ title: "Could not copy", variant: "destructive" });
      }
      return;
    }
    if (!program || !editSlug) return;
    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      slug: editSlug,
      title,
      count,
      description,
      longDescription,
      highlights,
      iconName,
      introduction,
      careerOutcomes,
      degreeType,
      duration,
      languages,
      pace,
      studyFormat,
      applicationDeadline,
      startDate,
      tuition,
      heroImageUrl,
      brochurePdfUrl,
      admissionsPdfUrl,
      curriculumPdfUrl,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast({ title: "Copied JSON", description: "Full program data for this entry." });
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  if (!isCreate && isLoading) {
    return (
      <AdminPageShell title="Loading program…" description="">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AdminPageShell>
    );
  }

  if (!isCreate && (!editSlug || !program)) {
    return (
      <AdminPageShell title="Program not found" description="Check the URL or pick a program from the list.">
        <Button asChild variant="outline" className="rounded-lg">
          <Link to="/admin/programs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to programs
          </Link>
        </Button>
      </AdminPageShell>
    );
  }

  const Icon = getProgramIcon(iconName);

  return (
    <AdminPageShell
      title={isCreate ? "Add program" : "Edit program details"}
      description="Fields match the public program detail page (listing + body + At a glance sidebar)."
      actions={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/admin/programs">
              <ArrowLeft className="h-4 w-4" />
              All programs
            </Link>
          </Button>
          {!isCreate && editSlug ? (
            <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
              <Link to={`/programs/${editSlug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                View live
              </Link>
            </Button>
          ) : null}
        </div>
      }
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground flex items-center gap-2">
            <Pencil className="h-4 w-4 text-muted-foreground" />
            {isCreate ? title.trim() || "New program" : program!.title}
          </p>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">{slugForPdf}</p>
        </div>
      </div>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-base">Catalog (programs grid + detail header)</CardTitle>
          <CardDescription>Title, count, short description, about, key areas, and icon.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prog-title">Title</Label>
            <Input id="prog-title" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-slug">URL slug (from title)</Label>
            <Input
              id="prog-slug"
              readOnly
              value={slugifyFromTitle(title)}
              className="rounded-lg font-mono text-sm bg-muted/50"
              aria-describedby="prog-slug-hint"
            />
            <p id="prog-slug-hint" className="text-xs text-muted-foreground">
              {isCreate
                ? "Generated from the title — this becomes the public URL path when you create the program."
                : "Generated from the title above — slug cannot be changed via this form."}
              {!isCreate && editSlug && slugifyFromTitle(title) !== editSlug ? (
                <>
                  {" "}
                  <span className="text-amber-700">
                    This editor URL uses <code className="rounded bg-amber-100 px-1">{editSlug}</code>.
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-icon">Icon</Label>
            <select
              id="prog-icon"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {Object.keys(PROGRAM_ICON_MAP).map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-count">Count label</Label>
            <Input
              id="prog-count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="rounded-lg"
              placeholder="e.g. 25+ Programs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-desc">Short description</Label>
            <Textarea
              id="prog-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg min-h-[80px] resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-long">Long description (About section)</Label>
            <Textarea
              id="prog-long"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="rounded-lg min-h-[120px] resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-highlights">Key areas (one per line)</Label>
            <Textarea
              id="prog-highlights"
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              className="rounded-lg min-h-[140px] resize-y font-mono text-sm"
              placeholder="One highlight per line"
            />
          </div>
        </CardContent>
      </Card>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-base">Detail page &amp; sidebar</CardTitle>
          <CardDescription>
            Introduction, career outcomes, &quot;At a glance&quot; facts, hero image, and PDF download URLs.
            Upload uses the same media API as Events/Hero; empty PDF fields fall back to{" "}
            <code className="text-xs">/program-brochures/</code> on the site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prog-intro">Introduction</Label>
            <Textarea
              id="prog-intro"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="rounded-lg min-h-[100px] resize-y"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-career">Career outcomes</Label>
            <Textarea
              id="prog-career"
              value={careerOutcomes}
              onChange={(e) => setCareerOutcomes(e.target.value)}
              className="rounded-lg min-h-[100px] resize-y"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="prog-degree">Degree type</Label>
              <Input id="prog-degree" value={degreeType} onChange={(e) => setDegreeType(e.target.value)} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prog-duration">Duration</Label>
              <Input id="prog-duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prog-lang">Languages</Label>
              <Input id="prog-lang" value={languages} onChange={(e) => setLanguages(e.target.value)} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prog-pace">Pace</Label>
              <Input id="prog-pace" value={pace} onChange={(e) => setPace(e.target.value)} className="rounded-lg" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="prog-format">Study format</Label>
              <Input id="prog-format" value={studyFormat} onChange={(e) => setStudyFormat(e.target.value)} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prog-deadline">Application deadline</Label>
              <Input
                id="prog-deadline"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prog-start">Earliest start date</Label>
              <Input id="prog-start" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="rounded-lg" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="prog-tuition">Tuition fees</Label>
              <Input id="prog-tuition" value={tuition} onChange={(e) => setTuition(e.target.value)} className="rounded-lg" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-hero">Hero image URL (optional)</Label>
            <Input
              id="prog-hero"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              className="rounded-lg font-mono text-sm"
              placeholder="Leave empty to use slug default from programHeroImages.ts"
            />
          </div>

          <div className="space-y-5 border-t border-slate-200 pt-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Program PDFs (download cards)</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Add up to three PDFs (brochure → admissions → curriculum), matching the public program page cards. Start with
                one; use <span className="font-medium text-slate-700">Add PDF</span> for more (max 3). Choose a file from your
                computer to upload via the API, or paste a full URL. Leave a URL blank to fall back to{" "}
                <span className="font-mono">/program-brochures/{slugForPdf}.pdf</span>,{" "}
                <span className="font-mono">{slugForPdf}-admissions.pdf</span>, and{" "}
                <span className="font-mono">{slugForPdf}-curriculum.pdf</span>.
              </p>
            </div>

            <input
              ref={brochurePdfInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => handlePdfSelected("brochure", e)}
            />
            <input
              ref={admissionsPdfInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => handlePdfSelected("admissions", e)}
            />
            <input
              ref={curriculumPdfInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => handlePdfSelected("curriculum", e)}
            />

            {PDF_SLOTS.slice(0, pdfSlotCount).map((slot) => {
              const url = getPdfUrl(slot.kind);
              const id = `pdf-${slot.kind}`;
              const lastPicked = localPdfFileName[slot.kind];
              const isLastSlot = slot.kind === PDF_SLOTS[pdfSlotCount - 1].kind;
              return (
                <div key={slot.kind} className="space-y-2 rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Label htmlFor={id} className="text-slate-900">
                        {slot.label}
                      </Label>
                      <p className="mt-0.5 text-xs text-muted-foreground">{slot.hint}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="rounded-lg gap-1.5"
                        disabled={uploadingPdf !== null}
                        onClick={() => slot.inputRef.current?.click()}
                      >
                        {uploadingPdf === slot.kind ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        Choose PDF from computer
                      </Button>
                      {pdfSlotCount > 1 && isLastSlot ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg gap-1.5 text-destructive hover:text-destructive"
                          disabled={uploadingPdf !== null}
                          onClick={removeLastPdfSlot}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  {lastPicked ? (
                    <p className="text-xs text-muted-foreground">
                      Last selected file: <span className="font-medium text-slate-700">{lastPicked}</span>
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      id={id}
                      value={url}
                      onChange={(e) => setPdfUrl(slot.kind, e.target.value)}
                      className="rounded-lg font-mono text-sm sm:flex-1"
                      placeholder={slot.placeholder}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-lg gap-1.5"
                      disabled={uploadingPdf !== null}
                      onClick={() => slot.inputRef.current?.click()}
                    >
                      {uploadingPdf === slot.kind ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      Upload again
                    </Button>
                  </div>
                </div>
              );
            })}

            {pdfSlotCount < 3 ? (
              <Button type="button" variant="outline" size="sm" className="rounded-lg gap-1.5" onClick={addPdfSlot}>
                <Plus className="h-4 w-4" />
                Add PDF ({pdfSlotCount}/3)
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-end gap-2">
        <Button
          type="button"
          variant="default"
          className="rounded-lg gap-1.5"
          onClick={handleSave}
          disabled={saveMutation.isPending || createMutation.isPending}
        >
          {saveMutation.isPending || createMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isCreate ? "Create program" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" className="rounded-lg gap-1.5" onClick={copyJson}>
          <Copy className="h-4 w-4" />
          Copy JSON
        </Button>
      </div>
    </AdminPageShell>
  );
}
