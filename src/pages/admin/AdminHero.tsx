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
import {
  Loader2,
  Plus,
  Search,
  Video,
  Image,
  Upload,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { getHeroImageUrls, serializeHeroBackgroundForApi } from "@/lib/heroBackgroundUtils";
import { HeroBackgroundSlideshow } from "@/components/HeroBackgroundSlideshow";

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
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [isDraggingFallback, setIsDraggingFallback] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<{ video: string | null; fallback: string | null }>({
    video: null,
    fallback: null,
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

  const uploadMultipleImages = async (files: File[]) => {
    const validImageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (validImageFiles.length === 0) {
      toast({ title: t("toastSelectImageFile"), variant: "destructive" });
      return;
    }

    setUploadingMedia("image");
    setUploadProgress({ current: 0, total: validImageFiles.length });

    try {
      const uploaded: string[] = [];
      for (let i = 0; i < validImageFiles.length; i++) {
        const file = validImageFiles[i];
        setUploadProgress({ current: i + 1, total: validImageFiles.length });
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
          toast({ title: t("toastFileTooLarge", { max: MAX_FILE_MB }), variant: "destructive" });
          continue;
        }
        try {
          const { url } = await adminApi.media.upload(file);
          uploaded.push(url);
        } catch (uploadErr) {
          console.error("Single image upload failed:", uploadErr);
        }
      }

      if (uploaded.length > 0) {
        setBackground((b) => {
          if (!b) return b;
          const currentUrls = getHeroImageUrls(b);
          const merged = [...currentUrls, ...uploaded];
          return {
            ...b,
            mediaType: "image",
            imageUrls: merged,
            imageUrl: merged[0] ?? null,
          };
        });
        toast({ title: t("toastBackgroundImagesUploaded", { count: uploaded.length }) });
      }
    } catch (err) {
      toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
    } finally {
      setUploadingMedia(null);
      setUploadProgress(null);
    }
  };

  const handleImageBackgroundFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length || !background) return;
    await uploadMultipleImages(Array.from(fileList));
    e.target.value = "";
  };

  const handleImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImage(false);
    if (!e.dataTransfer.files?.length || !background) return;
    await uploadMultipleImages(Array.from(e.dataTransfer.files));
  };

  const removeHeroBackgroundImage = (index: number) => {
    setBackground((b) => {
      if (!b) return b;
      const urls = getHeroImageUrls(b).filter((_, i) => i !== index);
      return {
        ...b,
        imageUrls: urls.length > 0 ? urls : null,
        imageUrl: urls[0] ?? null,
      };
    });
  };

  const clearAllHeroBackgroundImages = () => {
    if (!confirm(t("clearAllImagesConfirm", "Are you sure you want to remove all background images?"))) return;
    setBackground((b) => {
      if (!b) return b;
      return {
        ...b,
        imageUrls: null,
        imageUrl: null,
      };
    });
  };

  const moveHeroBackgroundImage = (index: number, direction: -1 | 1) => {
    setBackground((b) => {
      if (!b) return b;
      const urls = [...getHeroImageUrls(b)];
      const target = index + direction;
      if (target < 0 || target >= urls.length) return b;
      [urls[index], urls[target]] = [urls[target], urls[index]];
      return { ...b, imageUrls: urls, imageUrl: urls[0] ?? null };
    });
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, b] = await Promise.all([adminApi.heroSlides.list(i18n.language), adminApi.heroBackground.get()]);
      setSlides(s);
      const merged = b
        ? b
        : {
            mediaType: "video" as const,
            videoUrl: null as string | null,
            imageUrl: null as string | null,
            imageUrls: null as string[] | null,
          };
      setBackground(merged.mediaType === "image" ? serializeHeroBackgroundForApi(merged) : merged);
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
      const updated = await adminApi.heroBackground.update(serializeHeroBackgroundForApi(background));
      setBackground(updated);
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
          sortOrder: editingSlide.sortOrder,
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
    kind: "video" | "fallback",
    inputRef: React.RefObject<HTMLInputElement | null>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    accept: string,
    idleTitle: string,
    fileHint: string,
    currentUrl: string | null,
    onRemove: () => void,
    isDragging: boolean,
    setIsDragging: (val: boolean) => void,
    onDropFile: (file: File) => void,
  ) => {
    const successName = uploadSuccess[kind];
    const isUploading = uploadingMedia === kind;
    const activeUrl = currentUrl;

    if (activeUrl && !isUploading) {
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {kind === "video" ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Video className="h-5 w-5" />
                </div>
              ) : (
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
                  {activeUrl.startsWith("http") || activeUrl.startsWith("/") || activeUrl.startsWith("blob:") ? (
                    <img src={activeUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <Image className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {successName ? t("newlyUploaded", "Newly Uploaded") : t("activeMedia", "Current Media")}
                </p>
                <p className="text-sm font-medium text-foreground truncate max-w-sm" title={activeUrl}>
                  {successName || activeUrl}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                className="h-8 text-xs"
              >
                {t("replace", "Replace")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                {t("remove", "Remove")}
              </Button>
            </div>
          </div>
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isUploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !isUploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) onDropFile(file);
          }}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-all ${
            isDragging
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-border hover:border-primary/60 hover:bg-muted/50"
          }`}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {isUploading ? t("uploading") : idleTitle}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{t("dragDropClick")}</p>
            <p className="text-xs text-muted-foreground">{fileHint}</p>
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

  const bg = background ?? { mediaType: "video" as const, videoUrl: null, imageUrl: null, imageUrls: null };
  const heroBackgroundImages = getHeroImageUrls(bg);
  const isUploadingBackgroundImages = uploadingMedia === "image";

  return (
    <AdminPageShell bare>
      <div className="p-0 space-y-8">
        <div className="text-card-foreground shadow-sm rounded-xl border border-border bg-card">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-border/40">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-semibold tracking-tight text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <Image className="h-5 w-5 text-primary" />
                {t("heroBackgroundTitle")}
              </h3>
              {bg.mediaType === "image" && heroBackgroundImages.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Layers className="h-3.5 w-3.5" />
                    {heroBackgroundImages.length} {heroBackgroundImages.length === 1 ? "image" : "images"}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className="h-7 text-xs gap-1.5"
                  >
                    {showLivePreview ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        {t("hidePreview", "Hide Preview")}
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        {t("previewSlideshow", "Preview Slideshow")}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{t("heroBackgroundDesc")}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Media Type Switcher */}
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors capitalize ${
                  bg.mediaType === "video"
                    ? "border-primary bg-primary/10 text-primary font-semibold shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setBackground({ ...bg, mediaType: "video" })}
              >
                <Video className="h-4 w-4" />
                {t("video")}
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors capitalize ${
                  bg.mediaType === "image"
                    ? "border-primary bg-primary/10 text-primary font-semibold shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setBackground({ ...bg, mediaType: "image" })}
              >
                <Image className="h-4 w-4" />
                {t("image")}
                {heroBackgroundImages.length > 1 && (
                  <span className="ml-1 rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold">
                    {heroBackgroundImages.length}
                  </span>
                )}
              </button>
            </div>

            {/* Video Mode */}
            {bg.mediaType === "video" && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>{t("uploadVideo")}</Label>
                  {renderUploadZone(
                    "video",
                    videoInputRef,
                    handleVideoFile,
                    "video/mp4,video/webm,image/*",
                    t("uploadHeroVideo"),
                    t("videoOrImageMaxMb", { max: MAX_FILE_MB }),
                    bg.videoUrl,
                    () => {
                      setBackground((b) => (b ? { ...b, videoUrl: null } : b));
                      setUploadSuccess((s) => ({ ...s, video: null }));
                    },
                    isDraggingVideo,
                    setIsDraggingVideo,
                    async (file) => {
                      const isVid = file.type.startsWith("video/");
                      try {
                        const url = await uploadFileAndSetUrl(file, "video");
                        if (isVid) {
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
                    }
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
                    bg.imageUrl,
                    () => {
                      setBackground((b) => (b ? { ...b, imageUrl: null } : b));
                      setUploadSuccess((s) => ({ ...s, fallback: null }));
                    },
                    isDraggingFallback,
                    setIsDraggingFallback,
                    async (file) => {
                      if (!file.type.startsWith("image/")) {
                        toast({ title: t("toastSelectImageFile"), variant: "destructive" });
                        return;
                      }
                      try {
                        const url = await uploadFileAndSetUrl(file, "fallback");
                        setBackground((b) => (b ? { ...b, imageUrl: url } : b));
                        setUploadSuccess((s) => ({ ...s, fallback: file.name }));
                        toast({ title: t("toastFallbackImageUploaded") });
                      } catch (err) {
                        toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
                      }
                    }
                  )}
                </div>
              </div>
            )}

            {/* Image Mode */}
            {bg.mediaType === "image" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <Label className="text-base font-semibold">{t("uploadBackgroundImage")}</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">{t("heroBackgroundImagesHint")}</p>
                  </div>
                  {heroBackgroundImages.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearAllHeroBackgroundImages}
                      className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      {t("clearAll", "Clear all")}
                    </Button>
                  )}
                </div>

                {/* Live Slideshow Preview Panel */}
                {showLivePreview && heroBackgroundImages.length > 0 && (
                  <div className="rounded-xl border border-primary/30 bg-muted/20 p-4 space-y-2 transition-all animate-in fade-in-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                          {t("liveSlideshowPreview", "Live Slideshow Preview (Auto-Crossfade)")}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {heroBackgroundImages.length} {heroBackgroundImages.length === 1 ? "slide" : "slides rotating (3.5s)"}
                      </span>
                    </div>
                    <div className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden border border-border shadow-inner bg-black">
                      <HeroBackgroundSlideshow images={heroBackgroundImages} intervalMs={3500} />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded text-white text-xs font-medium flex items-center gap-2 z-20">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>{t("simulatedLandingBackground", "Landing Page Background Simulation")}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Uploaded Images Gallery Grid */}
                {heroBackgroundImages.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t("configuredSlides", "Configured background slides (first image is default cover)")}</span>
                      <span>{heroBackgroundImages.length} {heroBackgroundImages.length === 1 ? "image" : "images"}</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {heroBackgroundImages.map((url, index) => (
                        <div
                          key={`${url}-${index}`}
                          className="group relative flex flex-col rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                            <img src={url} alt={`Hero background slide ${index + 1}`} className="h-full w-full object-cover" />
                            <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-md bg-black/75 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                              <span>#{index + 1}</span>
                              {index === 0 && (
                                <span className="rounded bg-primary px-1 text-[10px] uppercase tracking-wider font-bold">
                                  Cover
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground" title={url}>
                              {url}
                            </p>
                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={index === 0}
                                onClick={() => moveHeroBackgroundImage(index, -1)}
                                title={t("moveImageEarlier")}
                                aria-label={t("moveImageEarlier")}
                              >
                                <ChevronLeft className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={index === heroBackgroundImages.length - 1}
                                onClick={() => moveHeroBackgroundImage(index, 1)}
                                title={t("moveImageLater")}
                                aria-label={t("moveImageLater")}
                              >
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                                onClick={() => removeHeroBackgroundImage(index)}
                                title={t("removeImage")}
                                aria-label={t("removeImage")}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drag-and-drop Multi-file Upload Zone */}
                <div className="space-y-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => !isUploadingBackgroundImages && imageBackgroundRef.current?.click()}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !isUploadingBackgroundImages && imageBackgroundRef.current?.click()
                    }
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDraggingImage(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDraggingImage(false);
                    }}
                    onDrop={handleImageDrop}
                    className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all ${
                      isDraggingImage
                        ? "border-primary bg-primary/10 scale-[1.01]"
                        : "border-border hover:border-primary/60 hover:bg-muted/50"
                    }`}
                  >
                    {isUploadingBackgroundImages ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-9 w-9 animate-spin text-primary" />
                        {uploadProgress && (
                          <div className="text-center">
                            <p className="text-xs font-semibold text-primary">
                              {t("uploadingCount", { current: uploadProgress.current, total: uploadProgress.total, defaultValue: `Uploading ${uploadProgress.current} of ${uploadProgress.total}...` })}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Upload className="h-6 w-6" />
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        {isUploadingBackgroundImages
                          ? t("uploading")
                          : heroBackgroundImages.length > 0
                            ? t("addMoreHeroBackgroundImages")
                            : t("uploadHeroBackgroundImages")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("dragDropClick", "Drag & drop multiple image files here, or click to browse")}
                      </p>
                      <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                        {t("imageFilesMaxMb", { max: MAX_FILE_MB })} • JPG, PNG, WebP, SVG
                      </p>
                    </div>
                  </div>
                  <input
                    ref={imageBackgroundRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageBackgroundFiles}
                  />
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-2">
              <Button
                type="button"
                onClick={handleSaveBackground}
                disabled={saving || isUploadingBackgroundImages}
                className="gap-2 px-6"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("saving", "Saving...")}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    {t("saveBackground")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Slides Management Section */}
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
