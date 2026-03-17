import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { adminApi, type HeroSlide, type HeroBackground } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { Loader2, Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";

export default function AdminHero() {
  const { canEditHero } = usePermissions();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [background, setBackground] = useState<HeroBackground | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>({ title: "", subtitle: "", year: "", linkUrl: "" });
  const [searchSlides, setSearchSlides] = useState("");
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const [s, b] = await Promise.all([adminApi.heroSlides.list(), adminApi.heroBackground.get()]);
      setSlides(s);
      setBackground(b ?? null);
    } catch (e) {
      toast({ title: "Failed to load hero", description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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

  const handleCreateSlide = async () => {
    if (!newSlide.title?.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await adminApi.heroSlides.create({
        title: newSlide.title,
        subtitle: newSlide.subtitle ?? "",
        year: newSlide.year ?? "",
        linkUrl: newSlide.linkUrl || null,
      });
      setNewSlide({ title: "", subtitle: "", year: "", linkUrl: "" });
      toast({ title: "Slide created" });
      load();
    } catch (e) {
      toast({ title: "Failed to create slide", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSlide = async () => {
    if (!editingSlide?.id) return;
    setSaving(true);
    try {
      await adminApi.heroSlides.update(editingSlide.id, {
        title: editingSlide.title,
        subtitle: editingSlide.subtitle,
        year: editingSlide.year,
        linkUrl: editingSlide.linkUrl ?? null,
      });
      setEditingSlide(null);
      toast({ title: "Slide updated" });
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
      <div className="space-y-8">
        {/* Hero background — single column, same as reference */}
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Hero background</CardTitle>
            <CardDescription className="text-slate-500">
              One video or image shown behind all slides on the landing page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-slate-700">Media type</Label>
              <ToggleGroup
                type="single"
                value={bg.mediaType}
                onValueChange={(v) => v && setBackground({ ...bg, mediaType: v as "video" | "image" })}
                className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50"
              >
                <ToggleGroupItem
                  value="video"
                  aria-label="Video"
                  className="rounded-md px-4 py-2 text-sm data-[state=on]:bg-white data-[state=on]:shadow-sm"
                >
                  video
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="image"
                  aria-label="Image"
                  className="rounded-md px-4 py-2 text-sm data-[state=on]:bg-white data-[state=on]:shadow-sm"
                >
                  image
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {bg.mediaType === "video" && (
              <div className="space-y-2">
                <Label className="text-slate-700">Upload hero video (MP4 / WebM)</Label>
                <p className="text-xs text-slate-500">Or paste a URL below. Drag & drop or click to browse not available (URL only).</p>
                <div className="flex gap-2">
                  <Input
                    value={bg.videoUrl ?? ""}
                    onChange={(e) => setBackground({ ...bg, videoUrl: e.target.value || null })}
                    placeholder="/tisu2.mp4 or https://..."
                    className="rounded-lg border-slate-200 flex-1"
                  />
                  {(bg.videoUrl ?? "").trim() && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="shrink-0 border-slate-200"
                      onClick={() => setBackground({ ...bg, videoUrl: null })}
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-slate-700">Fallback image (shown if video fails)</Label>
              <p className="text-xs text-slate-500">Image files, max 50 MB. Paste URL below.</p>
              <div className="flex gap-2">
                <Input
                  value={bg.imageUrl ?? ""}
                  onChange={(e) => setBackground({ ...bg, imageUrl: e.target.value || null })}
                  placeholder="https://..."
                  className="rounded-lg border-slate-200 flex-1"
                />
                {(bg.imageUrl ?? "").trim() && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-slate-200"
                    onClick={() => setBackground({ ...bg, imageUrl: null })}
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <Button
              onClick={handleSaveBackground}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save background"}
            </Button>
          </CardContent>
        </Card>

        {/* Hero slides — toolbar + list like reference */}
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Hero slides</CardTitle>
            <CardDescription className="text-slate-500">
              Carousel slides shown on the hero.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Toolbar: Search slides + Add slide */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search slides…"
                  value={searchSlides}
                  onChange={(e) => setSearchSlides(e.target.value)}
                  className="rounded-lg border-slate-200 pl-9"
                />
              </div>
              {canEditHero && (
                <Button
                  onClick={handleCreateSlide}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 shrink-0"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Add slide
                </Button>
              )}
            </div>

            {/* Add slide form */}
            {canEditHero && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Add slide</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-slate-700">Title</Label>
                  <Input
                    value={newSlide.title ?? ""}
                    onChange={(e) => setNewSlide((s) => ({ ...s, title: e.target.value }))}
                    placeholder="Slide title"
                    className="rounded-lg border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Year</Label>
                  <Input
                    value={newSlide.year ?? ""}
                    onChange={(e) => setNewSlide((s) => ({ ...s, year: e.target.value }))}
                    placeholder="2025"
                    className="rounded-lg border-slate-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700">Subtitle</Label>
                <Input
                  value={newSlide.subtitle ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, subtitle: e.target.value }))}
                  placeholder="Subtitle text"
                  className="rounded-lg border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700">Link URL (optional)</Label>
                <Input
                  value={newSlide.linkUrl ?? ""}
                  onChange={(e) => setNewSlide((s) => ({ ...s, linkUrl: e.target.value || undefined }))}
                  placeholder="https://..."
                  className="rounded-lg border-slate-200"
                />
              </div>
              <Button
                onClick={handleCreateSlide}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Add slide
              </Button>
            </div>
            )}

            {/* Slide list — title as heading, subtitle, Year: XXXX */}
            <ul className="space-y-4">
              {filteredSlides.map((slide) => (
                <li
                  key={slide.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
                >
                  {editingSlide?.id === slide.id ? (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-slate-700">Title</Label>
                        <Input
                          value={editingSlide.title}
                          onChange={(e) => setEditingSlide((s) => s && { ...s, title: e.target.value })}
                          placeholder="Title"
                          className="rounded-lg border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700">Subtitle</Label>
                        <Input
                          value={editingSlide.subtitle ?? ""}
                          onChange={(e) => setEditingSlide((s) => s && { ...s, subtitle: e.target.value })}
                          placeholder="Subtitle"
                          className="rounded-lg border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700">Year</Label>
                        <Input
                          value={editingSlide.year ?? ""}
                          onChange={(e) => setEditingSlide((s) => s && { ...s, year: e.target.value })}
                          placeholder="Year"
                          className="rounded-lg border-slate-200"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          onClick={handleUpdateSlide}
                          disabled={saving}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSlide(null)}
                          className="border-slate-200"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-slate-900">{slide.title || "Untitled"}</h3>
                        <p className="text-sm text-slate-500 mt-1">{slide.subtitle || "—"}</p>
                        {slide.year && (
                          <p className="text-xs text-slate-400 mt-1">Year: {slide.year}</p>
                        )}
                      </div>
                      {canEditHero && (
                      <div className="flex shrink-0 gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingSlide(slide)}
                          className="h-8 w-8 hover:bg-slate-100"
                          aria-label="Edit slide"
                        >
                          <Pencil className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteSlide(slide.id)}
                          className="h-8 w-8 hover:bg-red-50"
                          aria-label="Delete slide"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {filteredSlides.length === 0 && (
              <p className="text-sm text-slate-500 py-6 text-center rounded-lg border border-dashed border-slate-200">
                {searchSlides.trim() ? "No slides match your search." : "No slides yet. Add one above."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminPageShell>
  );
}
