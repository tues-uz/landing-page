import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { getProgramBySlug } from "@/components/Programs";
import { programDetailOverrides, type ProgramDetailOverride } from "@/data/programDetailConfig";
import { getProgramDetailViewModel } from "@/lib/programDetailDisplay";
import { slugifyFromTitle } from "@/lib/slugifyTitle";
import { adminApi } from "@/api/adminClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ExternalLink, Copy, FileText, Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";

const MAX_PDF_MB = 40;

type PdfKind = "brochure" | "admissions" | "curriculum";

export default function AdminProgramEdit() {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? getProgramBySlug(slug) : undefined;
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("");

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
    if (!program || !slug) return;
    setTitle(program.title);
    setCount(program.count);
    setDescription(program.description);
    setLongDescription(program.longDescription);
    setHighlightsText(program.highlights.join("\n"));

    const view = getProgramDetailViewModel(slug);
    if (view) {
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
    }
    const o = programDetailOverrides[slug] ?? {};
    setHeroImageUrl(o.heroImageUrl?.trim() ?? "");
    setBrochurePdfUrl(o.brochurePdfUrl?.trim() ?? "");
    setAdmissionsPdfUrl(o.admissionsPdfUrl?.trim() ?? "");
    setCurriculumPdfUrl(o.curriculumPdfUrl?.trim() ?? "");
    let slots = 1;
    if (o.curriculumPdfUrl?.trim()) slots = 3;
    else if (o.admissionsPdfUrl?.trim()) slots = 2;
    setPdfSlotCount(slots);
    setLocalPdfFileName({});
  }, [program, slug]);

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
      toast({ title: "PDF uploaded", description: "Public URL set — use Copy full JSON to persist in programDetailConfig.ts." });
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
      placeholder: `Default file: /program-brochures/${slug}.pdf`,
      inputRef: brochurePdfInputRef,
    },
    {
      kind: "admissions",
      label: "PDF 2 · Admissions",
      hint: "Apply & requirements (second card)",
      placeholder: `Default file: /program-brochures/${slug}-admissions.pdf`,
      inputRef: admissionsPdfInputRef,
    },
    {
      kind: "curriculum",
      label: "PDF 3 · Curriculum",
      hint: "Courses & structure (third card)",
      placeholder: `Default file: /program-brochures/${slug}-curriculum.pdf`,
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
    if (!program || !slug) return;
    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const detailOverrides: ProgramDetailOverride = {};
    const setIf = (k: keyof ProgramDetailOverride, v: string) => {
      const t = v.trim();
      if (t) (detailOverrides as Record<string, string>)[k] = t;
    };
    setIf("introduction", introduction);
    setIf("careerOutcomes", careerOutcomes);
    setIf("degreeType", degreeType);
    setIf("duration", duration);
    setIf("languages", languages);
    setIf("pace", pace);
    setIf("studyFormat", studyFormat);
    setIf("applicationDeadline", applicationDeadline);
    setIf("startDate", startDate);
    setIf("tuition", tuition);
    setIf("heroImageUrl", heroImageUrl);
    setIf("brochurePdfUrl", brochurePdfUrl);
    setIf("admissionsPdfUrl", admissionsPdfUrl);
    setIf("curriculumPdfUrl", curriculumPdfUrl);

    const suggestedSlug = slugifyFromTitle(title);
    const payload = {
      instructions:
        "1) Set `slug` on the program row to `suggestedSlug` (from title). 2) Merge `catalog` + `detailOverrides` in Programs.tsx / programDetailConfig.ts under that slug. If `suggestedSlug` ≠ `currentRouteSlug`, rename the route key for overrides and PDF filenames.",
      suggestedSlug,
      currentRouteSlug: slug,
      catalog: {
        slug: suggestedSlug,
        title,
        count,
        description,
        longDescription,
        highlights,
      },
      detailOverrides,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast({ title: "Copied JSON", description: "Catalog + detail overrides for this program." });
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  if (!slug || !program) {
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

  const Icon = program.icon;
  const livePreview = getProgramDetailViewModel(slug);

  return (
    <AdminPageShell
      title="Edit program details"
      description="Fields match the public program detail page (listing + body + At a glance sidebar). Copy JSON to update Programs.tsx and programDetailConfig.ts."
      actions={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to="/admin/programs">
              <ArrowLeft className="h-4 w-4" />
              All programs
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
            <Link to={`/programs/${slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View live
            </Link>
          </Button>
        </div>
      }
    >
      <Card className={`${ADMIN_CARD_CLASS} border-amber-200 bg-amber-50/50`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-amber-900">CMS save not connected</CardTitle>
          <CardDescription className="text-amber-900/80 text-sm">
            Use <strong>Copy full JSON</strong> at the bottom, then merge <code className="text-xs">catalog</code> into{" "}
            <code className="rounded bg-white/80 px-1 py-0.5 text-xs">Programs.tsx</code> and{" "}
            <code className="text-xs">detailOverrides</code> into{" "}
            <code className="rounded bg-white/80 px-1 py-0.5 text-xs">programDetailConfig.ts</code> for this slug.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground flex items-center gap-2">
            <Pencil className="h-4 w-4 text-muted-foreground" />
            {program.title}
          </p>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">{slug}</p>
          {livePreview && (
            <p className="text-xs text-muted-foreground mt-1 max-w-xl">
              Live hero:{" "}
              <span className="break-all text-foreground/80">{livePreview.heroImage}</span>
            </p>
          )}
        </div>
      </div>

      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-base">Catalog (programs grid + detail header)</CardTitle>
          <CardDescription>Maps to <code className="text-xs">programs[]</code> in Programs.tsx — title, count, short description, about, key areas.</CardDescription>
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
              Generated from the title above — use this as <code className="rounded bg-muted px-1">slug</code> in{" "}
              <code className="rounded bg-muted px-1">Programs.tsx</code>.
              {slug && slugifyFromTitle(title) !== slug ? (
                <>
                  {" "}
                  <span className="text-amber-700">
                    This editor URL still uses <code className="rounded bg-amber-100 px-1">{slug}</code> until routes
                    are updated.
                  </span>
                </>
              ) : null}
            </p>
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
            Introduction, career outcomes, &quot;At a glance&quot; facts, hero image, and PDF download URLs — stored in{" "}
            <code className="text-xs">programDetailConfig.ts</code> (or optional fields on the program row in Programs.tsx).
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
                <span className="font-mono">/program-brochures/{slug}.pdf</span>,{" "}
                <span className="font-mono">{slug}-admissions.pdf</span>, and{" "}
                <span className="font-mono">{slug}-curriculum.pdf</span>.
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

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="default" className="rounded-lg gap-1.5" onClick={copyJson}>
          <Copy className="h-4 w-4" />
          Copy full JSON
        </Button>
      </div>
    </AdminPageShell>
  );
}
