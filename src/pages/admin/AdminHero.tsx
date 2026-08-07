import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { adminApi, type HeroSlide, type HeroBackground } from "@/api/adminClient";
import { AdminPageShell } from "./AdminPageShell";
import { Loader2, Plus, Search, Video, Image, Upload, CheckCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export default function AdminHero() {
  const { t, i18n } = useTranslation("admin");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [background, setBackground] = useState<HeroBackground | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>({ title: "", subtitle: "", year: "", linkUrl: "" });
  const [editLocale, setEditLocale] = useState<"uz" | "en" | "ru">("uz");
  const [loadingLocale, setLoadingLocale] = useState(false);
  const [searchSlides, setSearchSlides] = useState("");
  const [addSlideOpen, setAddSlideOpen] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState<"video" | "fallback" | "image" | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<{ video: string | null; fallback: string | null; image: string | null }>({
    video: null,
    fallback: null,
    image: null,
  });
  const { toast } = useToast();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fallbackInputRef = useRef<HTMLInputElement>(null);
  const imageBackgroundRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_MB = 50;

  const uploadFileAndSetUrl = async (
    file: File,
    kind: "video" | "fallback" | "image"
  ): Promise<string> => {
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast({ title: t("toastFileTooLarge", { max: MAX_FILE_MB }), variant: "destructive" });
      throw new Error("File too large");
    }
    setUploadingMedia(kind);
    setUploadSuccess((s) => ({ ...s, [kind]: null }));
    try {
      const { url } = await adminApi.media.upload(file);
      return url;
    } finally {
      setUploadingMedia(null);
    }
  };

  const handleVideoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!background) return;
    const isVideo = file.type.startsWith("video/");
    if (!isVideo && !file.type.startsWith("image/")) {
      toast({ title: t("toastChooseVideoOrImage"), variant: "destructive" });
      return;
    }
    try {
      const url = await uploadFileAndSetUrl(file, "video");
      if (isVideo) {
        setBackground((b) => (b ? { ...b, videoUrl: url } : b));
        setUploadSuccess((s) => ({ ...s, video: file.name }));
        toast({ title: t("toastVideoUploaded") });
      } else {
        setBackground((b) => (b ? { ...b, imageUrl: url } : b));
        setUploadSuccess((s) => ({ ...s, fallback: file.name }));
        toast({ title: t("toastFallbackImageUploaded") });
      }
    } catch (err) {
      toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  };

  const handleFallbackFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: t("toastSelectImageFile"), variant: "destructive" });
      return;
    }
    if (!background) return;
    try {
      const url = await uploadFileAndSetUrl(file, "fallback");
      setBackground((b) => (b ? { ...b, imageUrl: url } : b));
      setUploadSuccess((s) => ({ ...s, fallback: file.name }));
      toast({ title: t("toastFallbackImageUploaded") });
    } catch (err) {
      toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  };

  const handleImageBackgroundFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: t("toastSelectImageFile"), variant: "destructive" });
      return;
    }
    if (!background) return;
    try {
      const url = await uploadFileAndSetUrl(file, "image");
      setBackground((b) => (b ? { ...b, imageUrl: url } : b));
      setUploadSuccess((s) => ({ ...s, image: file.name }));
      toast({ title: t("toastBackgroundImageUploaded") });
    } catch (err) {
      toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, b] = await Promise.all([adminApi.heroSlides.list(i18n.language), adminApi.heroBackground.get()]);
      setSlides(s);
      const merged = b
        ? b
        : { mediaType: "video" as const, videoUrl: null as string | null, imageUrl: null as string | null };
      setBackground(merged);
    } catch (e) {
      toast({ title: t("toastFailedLoadHero"), description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [i18n.language, t, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredSlides = useMemo(() => {
    if (!searchSlides.trim()) return slides;
    const q = searchSlides.toLowerCase();
    return slides.filter(
      (s) =>
        (s.title || "").toLowerCase().includes(q) ||
        (s.subtitle || "").toLowerCase().includes(q) ||
        (s.year || "").toLowerCase().includes(q)
    );
  }, [slides, searchSlides]);

  const handleSaveBackground = async () => {
    if (!background) return;
    setSaving(true);
    try {
      await adminApi.heroBackground.update(background);
      toast({ title: t("toastHeroBackgroundSaved") });
    } catch (e) {
      toast({ title: t("toastFailedSaveBackground"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSlide = async (): Promise<boolean> => {
    if (!newSlide.title?.trim()) {
      toast({ title: t("toastTitleRequired"), variant: "destructive" });
      return false;
    }
    setSaving(true);
    try {
      const created = await adminApi.heroSlides.create({
        title: newSlide.title,
        subtitle: newSlide.subtitle ?? "",
        year: newSlide.year ?? "",
        linkUrl: newSlide.linkUrl || null,
      });
      setNewSlide({ title: "", subtitle: "", year: "", linkUrl: "" });
      toast({ title: t("toastSlideCreated") });
      setSlides((prev) => [...prev, created]);
      await load();
      return true;
    } catch (e) {
      toast({ title: t("toastFailedCreateSlide"), description: String(e), variant: "destructive" });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleLocaleChange = async (newLocale: "uz" | "en" | "ru") => {
    if (newLocale === editLocale || !editingSlide || !editingSlide.id) return;
    setLoadingLocale(true);
    try {
      const allSlides = await adminApi.heroSlides.list(newLocale);
      const localeData = allSlides.find(s => s.id === editingSlide.id);
      if (localeData && localeData.id) {
        setEditingSlide(prev => prev ? ({
          ...prev, 
          title: localeData.title || "",
          subtitle: localeData.subtitle || "",
        }) : null);
      } else {
        setEditingSlide(prev => prev ? ({ ...prev, title: "", subtitle: "" }) : null);
      }
      setEditLocale(newLocale);
    } catch (e) {
      toast({ title: t("toastFailedSwitchLanguage"), description: String(e), variant: "destructive" });
    } finally {
      setLoadingLocale(false);
    }
  };

  const handleUpdateSlide = async () => {
    if (!editingSlide?.id) return;
    setSaving(true);
    try {
      if (editLocale === "uz") {
        await adminApi.heroSlides.update(editingSlide.id, {
          title: editingSlide.title,
          subtitle: editingSlide.subtitle,
          year: editingSlide.year,
          linkUrl: editingSlide.linkUrl ?? null,
        });
        toast({ title: t("toastSlideUpdated") });
      } else {
        await adminApi.heroSlides.upsertTranslation(editingSlide.id, editLocale, {
          title: editingSlide.title,
          subtitle: editingSlide.subtitle,
        });
        toast({ title: t("toastTranslationUpdated", { locale: editLocale.toUpperCase() }) });
      }
      setEditingSlide(null);
      setEditLocale("uz");
      load();
    } catch (e) {
      toast({ title: t("toastFailedUpdateSlide"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm(t("deleteSlideConfirm"))) return;
    setSaving(true);
    try {
      await adminApi.heroSlides.delete(id);
      toast({ title: t("toastSlideDeleted") });
      load();
    } catch (e) {
      toast({ title: t("toastFailedDeleteSlide"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const renderUploadZone = (
    kind: "video" | "fallback" | "image",
    inputRef: React.RefObject<HTMLInputElement | null>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    accept: string,
    idleTitle: string,
    fileHint: string,
  ) => {
    const successName = uploadSuccess[kind];
    const isUploading = uploadingMedia === kind;

    return (
      <div className="space-y-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isUploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !isUploading && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-60 ${
            successName
              ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/10"
              : "border-border hover:border-primary/60 hover:bg-muted/50"
          }`}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : successName ? (
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="text-center">
            {successName ? (
              <>
                <p className="text-sm font-medium text-foreground">{t("uploadedSuccess")}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[240px]">{successName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("clickToReplace")}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground">
                  {isUploading ? t("uploading") : idleTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("dragDropClick")}</p>
                <p className="text-xs text-muted-foreground">{fileHint}</p>
              </>
            )}
          </div>
        </div>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
      </div>
    );
  };

  if (loading) {
    return (
      <AdminPageShell bare>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </AdminPageShell>
    );
  }

  const bg = background ?? { mediaType: "video" as const, videoUrl: null, imageUrl: null };

  return (
    <AdminPageShell bare>
      <div className="p-0 space-y-8">
        <div className="text-card-foreground shadow-sm rounded-xl border border-border bg-card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight text-lg flex items-center gap-2">
              <Video className="h-5 w-5" />
              <Image className="h-5 w-5" />
              {t("heroBackgroundTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">{t("heroBackgroundDesc")}</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors capitalize ${bg.mediaType === "video" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"}`}
                onClick={() => setBackground({ ...bg, mediaType: "video" })}
              >
                <Video className="h-4 w-4" />
                {t("video")}
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors capitalize ${bg.mediaType === "image" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"}`}
                onClick={() => setBackground({ ...bg, mediaType: "image" })}
              >
                <Image className="h-4 w-4" />
                {t("image")}
              </button>
            </div>
            {bg.mediaType === "video" && (
              <>
                <div className="grid gap-2">
                  <Label>{t("uploadVideo")}</Label>
                  {renderUploadZone(
                    "video",
                    videoInputRef,
                    handleVideoFile,
                    "video/mp4,video/webm,image/*",
                    t("uploadHeroVideo"),
                    t("videoOrImageMaxMb", { max: MAX_FILE_MB }),
                  )}
                </div>
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">{t("fallbackImageLabel")}</Label>
                  {renderUploadZone(
                    "fallback",
                    fallbackInputRef,
                    handleFallbackFile,
                    "image/*",
                    t("uploadFallbackImage"),
                    t("imageFilesMaxMb", { max: MAX_FILE_MB }),
                  )}
                </div>
              </>
            )}
            {bg.mediaType === "image" && (
              <div className="grid gap-2">
                <Label>{t("uploadBackgroundImage")}</Label>
                {renderUploadZone(
                  "image",
                  imageBackgroundRef,
                  handleImageBackgroundFile,
                  "image/*",
                  t("uploadHeroBackgroundImage"),
                  t("imageFilesMaxMb", { max: MAX_FILE_MB }),
                )}
              </div>
            )}
            <button
              type="button"
              onClick={handleSaveBackground}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("saveBackground")}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              placeholder={t("searchSlidesPlaceholder")}
              value={searchSlides}
              onChange={(e) => setSearchSlides(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setAddSlideOpen(true)}
            disabled={saving}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-1.5 shrink-0"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {t("addSlide")}
          </button>
        </div>

        <Dialog open={addSlideOpen} onOpenChange={setAddSlideOpen}>
          <DialogContent className="max-w-md border border-border">
            <DialogHeader>
              <DialogTitle>{t("newSlideTitle")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>{t("titleLabel")}</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("slideTitlePlaceholder")}
                  value={newSlide.title ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("subtitleLabel")}</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("slideSubtitlePlaceholder")}
                  value={newSlide.subtitle ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, subtitle: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("yearLabel")}</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("slideYearPlaceholder")}
                  value={newSlide.year ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, year: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("learnMoreLinkOptional")}</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("slideUrlPlaceholder")}
                  value={newSlide.linkUrl ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, linkUrl: e.target.value || undefined }))}
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  const ok = await handleCreateSlide();
                  if (ok) setAddSlideOpen(false);
                }}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          <ul className="space-y-4">
            {filteredSlides.map((slide) => (
              <li
                key={slide.id}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-border"
              >
                {editingSlide?.id === slide.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{t("editSlide")}</h4>
                      <Tabs value={editLocale} onValueChange={(v) => handleLocaleChange(v as "uz" | "en" | "ru")} className="w-[180px]">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="uz" disabled={loadingLocale}>UZ</TabsTrigger>
                          <TabsTrigger value="en" disabled={loadingLocale}>EN</TabsTrigger>
                          <TabsTrigger value="ru" disabled={loadingLocale}>RU</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    {loadingLocale && (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-xs text-muted-foreground">{t("loadingTranslation")}</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>{t("titleLabel")}</Label>
                      <Input
                        value={editingSlide.title}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, title: e.target.value })}
                        placeholder={t("titleLabel")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("subtitleLabel")}</Label>
                      <Input
                        value={editingSlide.subtitle ?? ""}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, subtitle: e.target.value })}
                        placeholder={t("subtitleLabel")}
                      />
                    </div>
                    <div className={`space-y-2 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
                      <Label>{t("yearLabel")}</Label>
                      <Input
                        value={editingSlide.year ?? ""}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, year: e.target.value })}
                        placeholder={t("yearLabel")}
                      />
                    </div>
                    <div className={`space-y-2 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
                      <Label>{t("learnMoreLinkOptional")}</Label>
                      <Input
                        value={editingSlide.linkUrl ?? ""}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, linkUrl: e.target.value })}
                        placeholder={t("slideUrlPlaceholder")}
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" onClick={handleUpdateSlide} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { setEditingSlide(null); setEditLocale("uz"); }}>
                        {t("cancel")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-foreground">{slide.title || t("untitled")}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{slide.subtitle || "—"}</p>
                      {slide.year && (
                        <p className="text-xs text-muted-foreground/80 mt-1">{t("yearPrefix", { year: slide.year })}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-muted hover:text-accent-foreground h-8 px-3"
                      >
                        {t("view")}
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setEditingSlide(slide); setEditLocale("uz"); }}
                        className="h-8 px-3"
                        aria-label={t("editSlideAria")}
                      >
                        {t("edit")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="h-8 px-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                        aria-label={t("deleteSlideAria")}
                      >
                        {t("delete")}
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {filteredSlides.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              {searchSlides.trim() ? t("noSlidesMatchSearch") : t("noSlidesYet")}
            </p>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}
