import { useState, useEffect, useMemo, useRef } from "react";
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
import { Loader2, Plus, Pencil, Trash2, Search, Video, Image, Upload, CheckCircle2 } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export default function AdminHero() {
  const { t, i18n } = useTranslation("admin");
  const { canAccessHero } = usePermissions();
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
      toast({ title: `File too large (max ${MAX_FILE_MB} MB)`, variant: "destructive" });
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
      toast({ title: "Please choose a video (MP4/WebM) or image", variant: "destructive" });
      return;
    }
    try {
      const url = await uploadFileAndSetUrl(file, "video");
      if (isVideo) {
        setBackground((b) => (b ? { ...b, videoUrl: url } : b));
        setUploadSuccess((s) => ({ ...s, video: file.name }));
        toast({ title: "Video uploaded" });
      } else {
        setBackground((b) => (b ? { ...b, imageUrl: url } : b));
        setUploadSuccess((s) => ({ ...s, fallback: file.name }));
        toast({ title: "Fallback image uploaded" });
      }
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  };

  const handleFallbackFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please choose an image file", variant: "destructive" });
      return;
    }
    if (!background) return;
    try {
      const url = await uploadFileAndSetUrl(file, "fallback");
      setBackground((b) => (b ? { ...b, imageUrl: url } : b));
      setUploadSuccess((s) => ({ ...s, fallback: file.name }));
      toast({ title: "Fallback image uploaded" });
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  };

  const handleImageBackgroundFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please choose an image file", variant: "destructive" });
      return;
    }
    if (!background) return;
    try {
      const url = await uploadFileAndSetUrl(file, "image");
      setBackground((b) => (b ? { ...b, imageUrl: url } : b));
      setUploadSuccess((s) => ({ ...s, image: file.name }));
      toast({ title: "Background image uploaded" });
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    }
    e.target.value = "";
  };

  const load = async () => {
    setLoading(true);
    try {
      const [s, b] = await Promise.all([adminApi.heroSlides.list(i18n.language), adminApi.heroBackground.get()]);
      setSlides(s);
      // Always show Video tab active when opening the page; keep saved videoUrl/imageUrl
      const merged = b
        ? { ...b, mediaType: "video" as const }
        : { mediaType: "video" as const, videoUrl: null as string | null, imageUrl: null as string | null };
      setBackground(merged);
    } catch (e) {
      toast({ title: "Failed to load hero", description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [i18n.language]);

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
      toast({ title: "Hero background saved" });
    } catch (e) {
      toast({ title: "Failed to save background", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSlide = async (): Promise<boolean> => {
    if (!newSlide.title?.trim()) {
      toast({ title: "Title required", variant: "destructive" });
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
      toast({ title: "Slide created" });
      // Add new slide to list immediately so it appears in the ul
      setSlides((prev) => [...prev, created]);
      await load();
      return true;
    } catch (e) {
      toast({ title: "Failed to create slide", description: String(e), variant: "destructive" });
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
      toast({ title: "Failed to switch language", description: String(e), variant: "destructive" });
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
        toast({ title: "Slide updated" });
      } else {
        await adminApi.heroSlides.upsertTranslation(editingSlide.id, editLocale, {
          title: editingSlide.title,
          subtitle: editingSlide.subtitle,
        });
        toast({ title: `${editLocale.toUpperCase()} translation updated` });
      }
      setEditingSlide(null);
      setEditLocale("uz");
      load();
    } catch (e) {
      toast({ title: "Failed to update slide", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    setSaving(true);
    try {
      await adminApi.heroSlides.delete(id);
      toast({ title: "Slide deleted" });
      load();
    } catch (e) {
      toast({ title: "Failed to delete slide", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminPageShell title="Hero section" description="Welcome back, Admin 👋">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </AdminPageShell>
    );
  }

  const bg = background ?? { mediaType: "video" as const, videoUrl: null, imageUrl: null };

  return (
    <AdminPageShell title="Hero section" description="Welcome back, Admin 👋">
      <div className="p-0 space-y-8">
        <div className="text-card-foreground shadow-sm rounded-xl border border-border bg-card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight text-lg flex items-center gap-2">
              <Video className="h-5 w-5" />
              <Image className="h-5 w-5" />
              Hero background
            </h3>
            <p className="text-sm text-muted-foreground">One video or image shown behind all slides on the landing page.</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors capitalize ${bg.mediaType === "video" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"}`}
                onClick={() => setBackground({ ...bg, mediaType: "video" })}
              >
                <Video className="h-4 w-4" />
                {t("video", "Video")}
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors capitalize ${bg.mediaType === "image" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"}`}
                onClick={() => setBackground({ ...bg, mediaType: "image" })}
              >
                <Image className="h-4 w-4" />
                {t("image", "Image")}
              </button>
            </div>
            {bg.mediaType === "video" && (
              <>
                <div className="grid gap-2">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t("uploadVideo", "Upload video file")}</Label>
                  <div className="space-y-2">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => uploadingMedia !== "video" && videoInputRef.current?.click()}
                      onKeyDown={(e) => e.key === "Enter" && uploadingMedia !== "video" && videoInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-60 ${
                        uploadSuccess.video
                          ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/10"
                          : "border-border hover:border-primary/60 hover:bg-muted/50"
                      }`}
                    >
                      {uploadingMedia === "video" ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : uploadSuccess.video ? (
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      )}
                      <div className="text-center">
                        {uploadSuccess.video ? (
                          <>
                            <p className="text-sm font-medium text-foreground">Uploaded successfully</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[240px]">{uploadSuccess.video}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Click to replace</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-foreground">
                              {uploadingMedia === "video" ? "Uploading…" : "Upload hero video (MP4 / WebM)"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">Drag & drop or click to browse</p>
                            <p className="text-xs text-muted-foreground">Video (MP4, WebM) or image, max 50 MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/mp4,video/webm,image/*"
                      className="hidden"
                      onChange={handleVideoFile}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">Fallback image (shown if video fails)</Label>
                  <div className="space-y-2">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => uploadingMedia !== "fallback" && fallbackInputRef.current?.click()}
                      onKeyDown={(e) => e.key === "Enter" && uploadingMedia !== "fallback" && fallbackInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-60 ${
                        uploadSuccess.fallback
                          ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/10"
                          : "border-border hover:border-primary/60 hover:bg-muted/50"
                      }`}
                    >
                      {uploadingMedia === "fallback" ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : uploadSuccess.fallback ? (
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      )}
                      <div className="text-center">
                        {uploadSuccess.fallback ? (
                          <>
                            <p className="text-sm font-medium text-foreground">Uploaded successfully</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[240px]">{uploadSuccess.fallback}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Click to replace</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-foreground">
                              {uploadingMedia === "fallback" ? "Uploading…" : "Upload fallback image"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">Drag & drop or click to browse</p>
                            <p className="text-xs text-muted-foreground">Image files, max 50 MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      ref={fallbackInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFallbackFile}
                    />
                  </div>
                </div>
              </>
            )}
            {bg.mediaType === "image" && (
              <div className="grid gap-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Upload background image</Label>
                <div className="space-y-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => uploadingMedia !== "image" && imageBackgroundRef.current?.click()}
                    onKeyDown={(e) => e.key === "Enter" && uploadingMedia !== "image" && imageBackgroundRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-60 ${
                      uploadSuccess.image
                        ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/10"
                        : "border-border hover:border-primary/60 hover:bg-muted/50"
                    }`}
                  >
                    {uploadingMedia === "image" ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : uploadSuccess.image ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                    <div className="text-center">
                      {uploadSuccess.image ? (
                        <>
                          <p className="text-sm font-medium text-foreground">Uploaded successfully</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[240px]">{uploadSuccess.image}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Click to replace</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-foreground">
                            {uploadingMedia === "image" ? "Uploading…" : "Upload hero background image"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">Drag & drop or click to browse</p>
                          <p className="text-xs text-muted-foreground">Image files, max 50 MB</p>
                        </>
                      )}
                    </div>
                  </div>
                  <input
                    ref={imageBackgroundRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageBackgroundFile}
                  />
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={handleSaveBackground}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("saveBackground", "Save background")}
            </button>
          </div>
        </div>
        {/* Hero slides — search + Add slide (editing/add slides) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              placeholder="Search slides…"
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
            {t("addSlide", "Add slide")}
          </button>
        </div>

        <Dialog open={addSlideOpen} onOpenChange={setAddSlideOpen}>
          <DialogContent className="max-w-md border border-border">
            <DialogHeader>
              <DialogTitle>New slide</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">title</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Slide title"
                  value={newSlide.title ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">subtitle</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Slide subtitle"
                  value={newSlide.subtitle ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, subtitle: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">year</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="2025"
                  value={newSlide.year ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, year: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Learn more link (optional)</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://..."
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
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
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
                      <h4 className="font-semibold text-sm">{t("editSlide", "Edit Slide")}</h4>
                      <Tabs value={editLocale} onValueChange={(v) => handleLocaleChange(v as any)} className="w-[180px]">
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
                        <span className="ml-2 text-xs text-muted-foreground">Loading translation...</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Title</Label>
                      <Input
                        value={editingSlide.title}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, title: e.target.value })}
                        placeholder="Title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Subtitle</Label>
                      <Input
                        value={editingSlide.subtitle ?? ""}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, subtitle: e.target.value })}
                        placeholder="Subtitle"
                      />
                    </div>
                    <div className={`space-y-2 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
                      <Label className="text-sm font-medium">Year</Label>
                      <Input
                        value={editingSlide.year ?? ""}
                        onChange={(e) => setEditingSlide((s) => s && { ...s, year: e.target.value })}
                        placeholder="Year"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" onClick={handleUpdateSlide} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { setEditingSlide(null); setEditLocale("uz"); }}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-foreground">{slide.title || "Untitled"}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{slide.subtitle || "—"}</p>
                      {slide.year && (
                        <p className="text-xs text-muted-foreground/80 mt-1">Year: {slide.year}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-muted hover:text-accent-foreground h-8 px-3"
                      >
                        View
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => { setEditingSlide(slide); setEditLocale("uz"); }}
                        className="h-8 px-3"
                        aria-label="Edit slide"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="h-8 px-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                        aria-label="Delete slide"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {filteredSlides.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              {searchSlides.trim() ? "No slides match your search." : "No slides yet. Add the first one!"}
            </p>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}
