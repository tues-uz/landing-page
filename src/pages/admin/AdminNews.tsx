import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
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
import { adminApi, type NewsItem, type NewsSection } from "@/api/adminClient";
import { AdminFormFooter, AdminPageShell, AdminSubHeader } from "./AdminPageShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { tiptapJsonToSections, sectionsToTiptapDoc } from "@/lib/newsEditorUtils";
import { toApiDateValue, toDateInputValue } from "@/lib/newsDateUtils";
import type { TiptapDocJSON } from "@/types/article";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Upload, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const CATEGORY_OPTIONS = [
  { value: "News", labelKey: "categoryNews" },
  { value: "Announcements", labelKey: "categoryAnnouncements" },
  { value: "Events", labelKey: "categoryEvents" },
  { value: "Blog", labelKey: "categoryBlog" },
] as const;

const DISPLAY_OPTION_VALUES = ["Regular", "Highlight"] as const;

function categoryLabelKey(value: string): (typeof CATEGORY_OPTIONS)[number]["labelKey"] {
  return CATEGORY_OPTIONS.find((c) => c.value === value)?.labelKey ?? "categoryNews";
}

function displayLabelKey(value: string): "displayRegular" | "displayHighlight" {
  return value === "Highlight" ? "displayHighlight" : "displayRegular";
}

/** Derive URL slug from title: lowercase, spaces to hyphens, strip non-alphanumeric. */
function titleToSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function articleToForm(article: Partial<NewsItem>): Partial<NewsItem> {
  return {
    ...article,
    date: toDateInputValue(article.date) || toDateInputValue(new Date().toISOString()),
    body: Array.isArray(article.body) ? article.body : [],
  };
}

function bodyToEditorDoc(body: NewsSection[] | undefined): TiptapDocJSON {
  return sectionsToTiptapDoc(body ?? []) as TiptapDocJSON;
}

function buildNewsSavePayload(
  form: Partial<NewsItem>,
  body: NewsSection[],
  display: string,
): Omit<NewsItem, "id"> {
  return {
    slug: form.slug?.trim() ?? "",
    category: form.category ?? "News",
    title: form.title?.trim() ?? "",
    excerpt: form.excerpt ?? "",
    date: toApiDateValue(form.date),
    imageUrl: form.imageUrl ?? "",
    author: form.author ?? "TUES",
    readTime: form.readTime ?? "",
    body,
    display,
  };
}

function buildNewsMetadataPayload(
  form: Partial<NewsItem>,
  display: string,
): Pick<NewsItem, "slug" | "category" | "date" | "imageUrl" | "author" | "readTime" | "display"> {
  return {
    slug: form.slug?.trim() ?? "",
    category: form.category ?? "News",
    date: toApiDateValue(form.date),
    imageUrl: form.imageUrl ?? "",
    author: form.author ?? "TUES",
    readTime: form.readTime ?? "",
    display,
  };
}

export default function AdminNews() {
  const { t, i18n } = useTranslation("admin");
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [display, setDisplay] = useState("Regular");
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [displayFilter, setDisplayFilter] = useState<string>("all");
  const [editLocale, setEditLocale] = useState<"uz" | "en" | "ru">("uz");
  const [loadingLocale, setLoadingLocale] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Partial<NewsItem>>({
    slug: "",
    category: "News",
    title: "",
    excerpt: "",
    date: "",
    imageUrl: "",
    author: "TUES",
    readTime: "",
    body: [],
  });
  /** TipTap JSON while editing — avoids NewsSection[] round-trip on every keystroke (cursor jump). */
  const [editorDoc, setEditorDoc] = useState<TiptapDocJSON>(() => bodyToEditorDoc([]));
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const highlightCount = articles.filter((a) => (a.display || "").toLowerCase() === "highlight").length;
  const isHighlightLimitReached = highlightCount >= 5 && display !== "Highlight";

  const load = async () => {
    setLoading(true);
    try {
      const list = await adminApi.news.list(i18n.language);
      setArticles(list);
    } catch (e) {
      toast({ title: t("toastFailedLoadNews"), description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [i18n.language]);

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setEditing(null);
      setDisplay("Regular");
      setForm({
        slug: "",
        category: "News",
        title: "",
        excerpt: "",
        date: new Date().toISOString().slice(0, 10),
        imageUrl: "",
        author: "TUES",
        readTime: t("articleDefaultReadTime"),
        body: [],
      });
      setEditorDoc(bodyToEditorDoc([]));
      setFormOpen(true);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("new");
          return next;
        },
        { replace: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount to open create form from ?new=1
  }, []);

  const editSlug = searchParams.get("edit");
  useEffect(() => {
    if (!loading && articles.length > 0 && editSlug) {
      const article = articles.find((a) => a.slug === editSlug);
      if (article) {
        setEditing(article);
        setDisplay(article.display || "Regular");
        const nextForm = articleToForm(article);
        setForm(nextForm);
        setEditorDoc(bodyToEditorDoc(nextForm.body as NewsSection[]));
        setFormOpen(true);
      }
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("edit");
          return next;
        },
        { replace: true }
      );
    }
  }, [loading, articles, editSlug, setSearchParams]);

  const openCreate = () => {
    setEditing(null);
    setDisplay("Regular");
    setEditLocale("uz");
    setForm({
      slug: "",
      category: "News",
      title: "",
      excerpt: "",
      date: new Date().toISOString().slice(0, 10),
      imageUrl: "",
      author: "TUES",
      readTime: t("articleDefaultReadTime"),
      body: [],
    });
    setEditorDoc(bodyToEditorDoc([]));
    setFormOpen(true);
  };

  const openEdit = (a: NewsItem) => {
    setEditing(a);
    setDisplay(a.display || "Regular");
    setEditLocale("uz");
    const nextForm = articleToForm(a);
    setForm(nextForm);
    setEditorDoc(bodyToEditorDoc(nextForm.body as NewsSection[]));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setEditLocale("uz");
  };

  const handleLocaleChange = async (newLocale: "uz" | "en" | "ru") => {
    if (newLocale === editLocale || !editing || !editing.id) return;
    setLoadingLocale(true);
    try {
      const localeData = await adminApi.news.getBySlug(editing.slug, newLocale);
      if (localeData && localeData.id) {
        const body = Array.isArray(localeData.body) ? localeData.body : [];
        setForm(prev => ({
          ...prev,
          title: localeData.title || "",
          excerpt: localeData.excerpt || "",
          body,
        }));
        setEditorDoc(bodyToEditorDoc(body));
      } else {
        setForm(prev => ({ ...prev, title: "", excerpt: "", body: [] }));
        setEditorDoc(bodyToEditorDoc([]));
      }
      setEditLocale(newLocale);
    } catch (e) {
      toast({ title: t("toastFailedSwitchLanguage"), description: String(e), variant: "destructive" });
    } finally {
      setLoadingLocale(false);
    }
  };

  const handleSave = async () => {
    if (!form.slug?.trim() || !form.title?.trim()) {
      toast({ title: t("toastSlugTitleRequired"), variant: "destructive" });
      return;
    }
    const body = tiptapJsonToSections(editorDoc);
    setSaving(true);
    try {
      if (editing && editing.id) {
        if (editLocale === "uz") {
          await adminApi.news.update(editing.id, buildNewsSavePayload(form, body, display));
          toast({ title: t("toastArticleUpdated") });
        } else {
          // Persist base metadata (date, cover, etc.) even when saving a translation.
          await adminApi.news.update(editing.id, buildNewsMetadataPayload(form, display));
          await adminApi.news.upsertTranslation(editing.id, editLocale, {
            title: form.title!,
            excerpt: form.excerpt,
            body,
          });
          toast({ title: t("toastTranslationUpdated", { locale: editLocale.toUpperCase() }) });
        }
      } else {
        await adminApi.news.create(buildNewsSavePayload(form, body, display));
        toast({ title: t("toastArticleCreated") });
      }
      closeForm();
      load();
    } catch (e) {
      toast({ title: t("toastFailedSave"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const uploadCoverFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: t("toastSelectImageFile"), variant: "destructive" });
      return;
    }
    setUploadingCover(true);
    try {
      const { url } = await adminApi.media.upload(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      toast({ title: t("toastImageUploaded") });
    } catch (err) {
      toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadCoverFile(file);
    e.target.value = "";
  };

  const handleCoverDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (uploadingCover) return;
    const file = e.dataTransfer.files?.[0];
    if (file) await uploadCoverFile(file);
  };

  const handleEditorImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      throw new Error(t("toastSelectImageFile"));
    }
    const { url } = await adminApi.media.upload(file);
    return url;
  };

  const handleDelete = async (slug: string) => {
    setSaving(true);
    try {
      await adminApi.news.delete(slug);
      toast({ title: t("articleDeleted") });
      load();
    } catch (e) {
      toast({ title: t("failedToDelete"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading && articles.length === 0) {
    return (
      <AdminPageShell title={t("newsArticles")} description={t("newsFormDesc")}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </AdminPageShell>
    );
  }

  if (formOpen) {
    const editorSections = tiptapJsonToSections(editorDoc);
    const wordCount =
      editorSections.reduce(
        (n, s) => n + (s.heading?.split(/\s+/).filter(Boolean).length ?? 0) + (s.paragraphs ?? []).reduce((m, p) => m + p.split(/\s+/).filter(Boolean).length, 0),
        0
      ) + (form.title ?? "").split(/\s+/).filter(Boolean).length + (form.excerpt ?? "").split(/\s+/).filter(Boolean).length;

    return (
      <AdminPageShell title="" description="" bare bareClassName="space-y-6 px-6 pb-6 pt-14">
        <AdminSubHeader>
          <button
            type="button"
            onClick={closeForm}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← {t("back")}
          </button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-9 min-w-[120px] rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("publish")}
          </Button>
        </AdminSubHeader>

        <article className="w-full flex-1 px-6 pb-28 pt-4 md:px-[100px]">
          {/* Story settings */}
          <div className="pb-8 mb-8 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("storySettings")}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">{t("languageColon")}</span>
                <Tabs value={editLocale} onValueChange={(v) => handleLocaleChange(v as any)} className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="uz" disabled={!editing || loadingLocale}>UZ</TabsTrigger>
                    <TabsTrigger value="en" disabled={!editing || loadingLocale}>EN</TabsTrigger>
                    <TabsTrigger value="ru" disabled={!editing || loadingLocale}>RU</TabsTrigger>
                  </TabsList>
                </Tabs>
                {!editing && <span className="text-xs text-muted-foreground/70 ml-2">{t("saveFirstToTranslate")}</span>}
              </div>
            </div>
            
            {loadingLocale && (
              <div className="mb-4 flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">{t("loadingTranslation")}</span>
              </div>
            )}

            <div className={`flex flex-wrap gap-6 gap-y-4 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">{t("category")}</label>
                <Select
                  value={form.category ?? "News"}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger className="h-9 w-36 rounded-md border-border bg-background px-3 py-2 text-sm">
                    <SelectValue placeholder={t("category")} />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {t(c.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">{t("urlSlug")}</label>
                <Input
                  value={form.slug ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder={t("articleSlugPlaceholder")}
                  disabled={!!editing}
                  className="h-9 w-40 rounded-md border-input bg-background px-2.5 text-sm disabled:opacity-60"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">{t("displayOnNewsPage")}</label>
                <Select value={display} onValueChange={setDisplay}>
                  <SelectTrigger className="h-9 w-44 rounded-md border-border bg-background px-3 py-2 text-sm">
                    <SelectValue placeholder={t("display")} />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPLAY_OPTION_VALUES.map((d) => (
                      <SelectItem key={d} value={d} disabled={d === "Highlight" && isHighlightLimitReached}>
                        {t(displayLabelKey(d))}
                        {d === "Highlight" && isHighlightLimitReached ? t("displayHighlightMax") : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {display === "Highlight" && (
                  <p className="text-xs text-muted-foreground">
                    {t("highlightSectionNote", { count: highlightCount })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Title — slug is derived from title (when creating, or when slug is empty) */}
          <Input
            value={form.title ?? ""}
            onChange={(e) => {
              const title = e.target.value;
              setForm((f) => ({
                ...f,
                title,
                ...((!editing || !(f.slug ?? "").trim()) && { slug: titleToSlug(title) }),
              }));
            }}
            placeholder={t("articleTitlePlaceholder")}
            className="mb-1 h-auto min-h-14 w-full border-0 bg-transparent p-0 py-2 font-serif text-[2.5rem] font-bold leading-tight tracking-tight text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-0 sm:text-[3rem]"
          />

          {/* Subtitle (textarea) */}
          <textarea
            value={form.excerpt ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder={t("articleExcerptPlaceholder")}
            rows={2}
            className="mb-6 w-full resize-none border-0 bg-transparent p-0 text-lg leading-snug text-muted-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0"
          />

          {/* Metadata line: Author · Date · Read time · words */}
          <div className={`mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${editLocale !== 'uz' ? 'opacity-50 pointer-events-none' : ''}`}>
            <input
              type="text"
              value={form.author ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder={t("articleAuthorPlaceholder")}
              className="w-20 min-w-0 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
            />
            <span aria-hidden className="text-muted-foreground/70">·</span>
            <input
              type="date"
              value={toDateInputValue(form.date) || ""}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="date-input-inline border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0 [color-scheme:light]"
            />
            <span aria-hidden className="text-muted-foreground/70">·</span>
            <input
              type="text"
              value={form.readTime ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              placeholder={t("articleReadTimePlaceholder")}
              className="w-20 min-w-0 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
            />
            <span className="text-muted-foreground/70">
              · {t("articleWordStats", {
                count: wordCount,
                minutes: Math.max(1, Math.ceil(wordCount / 200)),
              })}
            </span>
          </div>

          {/* Add a cover image */}
          <div className={`mb-10 ${editLocale !== 'uz' ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
              <div
                role="button"
                tabIndex={0}
                onClick={() => !uploadingCover && coverImageInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!uploadingCover) coverImageInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleCoverDrop}
                className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/60 hover:bg-muted/50 cursor-pointer"
              >
                {uploadingCover ? (
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {form.imageUrl ? t("eventImageUploadedReplace", "Replace cover image") : t("addCoverImage", "Add a cover image")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t("dragDropClick", "Drag & drop or click to browse")}</p>
                  <p className="text-xs text-muted-foreground">{t("imageFileLimit", "Image files, max 50 MB")}</p>
                </div>
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="" className="mt-2 h-32 w-auto max-w-full rounded object-cover" />
                )}
                <input
                  ref={coverImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageUpload}
                />
                <Input
                  type="url"
                  value={form.imageUrl ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder={t("pasteImageUrl", "Or paste image URL")}
                  className="mt-2 max-w-xs rounded-md border-0 bg-transparent text-center text-sm focus-visible:ring-2"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>

          {/* Content — Medium-style editor (slash menu, bubble toolbar, floating +) */}
          <div className="mb-12">
            <div className="relative rounded-lg bg-background">
              <ArticleEditor
                key={`${editing?.slug ?? "new"}-${editLocale}`}
                value={editorDoc}
                onChange={setEditorDoc}
                onImageUpload={handleEditorImageUpload}
                placeholder={t("tellYourStory", "Tell your story...")}
                showStats
              />
            </div>
          </div>

        </article>

        <AdminFormFooter>
          <Button
            variant="ghost"
            onClick={closeForm}
            className="h-9 rounded-full px-3 text-sm font-medium text-muted-foreground hover:bg-slate-100 hover:text-slate-900"
          >
            {t("cancel", "Cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-9 min-w-[120px] rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save", "Save")}
          </Button>
        </AdminFormFooter>
      </AdminPageShell>
    );
  }

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      !searchQuery.trim() ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || a.category === categoryFilter;
    const articleDisplay = a.display || "Regular";
    const matchesDisplay = displayFilter === "all" || articleDisplay === displayFilter;
    let matchesDate = true;
    if (dateFilter !== "all" && a.date) {
      const articleDate = new Date(a.date);
      if (Number.isNaN(articleDate.getTime())) {
        matchesDate = false;
      } else {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let rangeStart: Date;
        switch (dateFilter) {
          case "week":
            rangeStart = new Date(startOfToday);
            rangeStart.setDate(rangeStart.getDate() - 7);
            break;
          case "month":
            rangeStart = new Date(startOfToday);
            rangeStart.setMonth(rangeStart.getMonth() - 1);
            break;
          case "quarter":
            rangeStart = new Date(startOfToday);
            rangeStart.setMonth(rangeStart.getMonth() - 3);
            break;
          case "year":
            rangeStart = new Date(startOfToday);
            rangeStart.setFullYear(rangeStart.getFullYear() - 1);
            break;
          default:
            rangeStart = new Date(0);
        }
        matchesDate = articleDate >= rangeStart && articleDate <= now;
      }
    }
    return matchesSearch && matchesCategory && matchesDisplay && matchesDate;
  });

  return (
    <AdminPageShell
      title={t("newsArticles", "News")}
      description={t("articlesDescription", "Manage articles and featured content.")}
      actions={
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> {t("addArticle", "Add article")}
        </Button>
      }
    >
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border px-4 py-4 bg-muted/30 space-y-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">{t("articles", "Articles")}</h2>
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} {t("of", "of")} {articles.length}{" "}
              {articles.length === 1 ? t("article", "article") : t("articles", "articles")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchByTitleOrSlug", "Search by title or slug...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder={t("category", "Category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allCategories", "All categories")}</SelectItem>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {t(c.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder={t("date", "Date")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allTime", "All time")}</SelectItem>
                  <SelectItem value="week">{t("last7Days", "Last 7 days")}</SelectItem>
                  <SelectItem value="month">{t("last30Days", "Last 30 days")}</SelectItem>
                  <SelectItem value="quarter">{t("last3Months", "Last 3 months")}</SelectItem>
                  <SelectItem value="year">{t("lastYear", "Last year")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={displayFilter} onValueChange={setDisplayFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder={t("display", "Display")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allDisplays", "All displays")}</SelectItem>
                  {DISPLAY_OPTION_VALUES.map((d) => (
                    <SelectItem key={d} value={d}>
                      {t(displayLabelKey(d))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {filteredArticles.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-muted/30"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">{a.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  <span className="font-mono text-xs">{a.slug}</span>
                  <span className="mx-0.5">·</span>
                  <span>{a.date}</span>
                  <span className="mx-0.5">·</span>
                  <Badge variant="outline" className="font-normal text-muted-foreground">
                    {t(displayLabelKey(a.display || "Regular"))}
                  </Badge>
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link to={`/news/${a.slug}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                    {t("view", "View")}
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => openEdit(a)}
                  aria-label={t("edit", "Edit")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => setDeleteConfirmSlug(a.slug)}
                  aria-label={t("delete", "Delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AlertDialog open={deleteConfirmSlug !== null} onOpenChange={(open) => !open && setDeleteConfirmSlug(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteArticle", "Delete article?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteArticleConfirm", { title: articles.find((a) => a.slug === deleteConfirmSlug)?.title || "this article", defaultValue: "This will permanently delete this article. This action cannot be undone." })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel", "Cancel")}</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={async () => {
                if (deleteConfirmSlug) {
                  await handleDelete(deleteConfirmSlug);
                  setDeleteConfirmSlug(null);
                }
              }}
              disabled={saving}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("delete", "Delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageShell>
  );
}
