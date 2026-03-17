import { useState, useEffect } from "react";
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
import { AdminPageShell } from "./AdminPageShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { sectionsToTiptapDoc, tiptapJsonToSections } from "@/lib/newsEditorUtils";
import type { TiptapDocJSON } from "@/types/article";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Upload, Search } from "lucide-react";

const CATEGORIES = ["News", "Announcements", "Events", "Blog"];
const DISPLAY_OPTIONS = ["Regular", "Featured", "Highlight", "Pinned"];

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

export default function AdminNews() {
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
  const [form, setForm] = useState<Partial<NewsItem>>({
    slug: "",
    category: "News",
    title: "",
    excerpt: "",
    date: "",
    imageUrl: "",
    author: "TUES",
    readTime: "3 min read",
    body: [],
  });
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const load = async () => {
    setLoading(true);
    try {
      const list = await adminApi.news.list();
      setArticles(list);
    } catch (e) {
      toast({ title: "Failed to load news", description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
        readTime: "3 min read",
        body: [],
      });
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
        setForm({ ...article, body: Array.isArray(article.body) ? article.body : [] });
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
    setForm({
      slug: "",
      category: "News",
      title: "",
      excerpt: "",
      date: new Date().toISOString().slice(0, 10),
      imageUrl: "",
      author: "TUES",
      readTime: "3 min read",
      body: [],
    });
    setFormOpen(true);
  };

  const openEdit = (a: NewsItem) => {
    setEditing(a);
    setDisplay(a.display || "Regular");
    setForm({ ...a, body: Array.isArray(a.body) ? a.body : [] });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.slug?.trim() || !form.title?.trim()) {
      toast({ title: "Slug and title required", variant: "destructive" });
      return;
    }
    const body = Array.isArray(form.body) ? form.body : [];
    const payload = { ...form, body, display };
    setSaving(true);
    try {
      if (editing) {
        await adminApi.news.update(editing.slug, payload);
        toast({ title: "Article updated" });
      } else {
        await adminApi.news.create(payload as Omit<NewsItem, "id">);
        toast({ title: "Article created" });
      }
      closeForm();
      load();
    } catch (e) {
      toast({ title: "Failed to save", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setSaving(true);
    try {
      await adminApi.news.delete(slug);
      toast({ title: "Article deleted" });
      load();
    } catch (e) {
      toast({ title: "Failed to delete", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading && articles.length === 0) {
    return (
      <AdminPageShell title="News" description="Manage articles and featured content.">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </AdminPageShell>
    );
  }

  if (formOpen) {
    const wordCount =
      (form.body ?? []).reduce(
        (n, s) => n + (s.heading?.split(/\s+/).filter(Boolean).length ?? 0) + (s.paragraphs ?? []).reduce((m, p) => m + p.split(/\s+/).filter(Boolean).length, 0),
        0
      ) + (form.title ?? "").split(/\s+/).filter(Boolean).length + (form.excerpt ?? "").split(/\s+/).filter(Boolean).length;

    return (
      <AdminPageShell title="" description="" bare>
        <article className="w-full flex-1 px-6 pb-24 pt-10 md:px-[100px]">
          {/* Top bar: Back | Publish */}
          <div className="flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={closeForm}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-9 rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish"}
            </Button>
          </div>

          {/* Story settings */}
          <div className="pb-8 mb-8 border-b border-border/60">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Story settings
            </p>
            <div className="flex flex-wrap gap-6 gap-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Category</label>
                <Select
                  value={form.category ?? "News"}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger className="h-9 w-36 rounded-md border-border/80 bg-background px-3 py-2 text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">URL slug</label>
                <Input
                  value={form.slug ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="article-slug"
                  disabled={!!editing}
                  className="h-9 w-40 rounded-md border-input bg-background px-2.5 text-sm disabled:opacity-60"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground">Display on News page</label>
                <Select value={display} onValueChange={setDisplay}>
                  <SelectTrigger className="h-9 w-44 rounded-md border-border/80 bg-background px-3 py-2 text-sm">
                    <SelectValue placeholder="Display" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPLAY_OPTIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {display === "Highlight" && (
                  <p className="text-xs text-muted-foreground">
                    This article will appear in the News board highlight section (max 5).
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
            placeholder="Title"
            className="mb-1 h-auto min-h-14 w-full border-0 bg-transparent p-0 py-2 font-serif text-[2.5rem] font-bold leading-tight tracking-tight text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-0 sm:text-[3rem]"
          />

          {/* Subtitle (textarea) */}
          <textarea
            value={form.excerpt ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder="Subtitles are optional — add a short summary or hook"
            rows={2}
            className="mb-6 w-full resize-none border-0 bg-transparent p-0 text-lg leading-snug text-muted-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0"
          />

          {/* Metadata line: Author · Date · Read time · words */}
          <div className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <input
              type="text"
              value={form.author ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder="Author"
              className="w-20 min-w-0 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
            />
            <span aria-hidden className="text-muted-foreground/70">·</span>
            <input
              type="date"
              value={form.date ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-24 min-w-0 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0 [color-scheme:light]"
            />
            <span aria-hidden className="text-muted-foreground/70">·</span>
            <input
              type="text"
              value={form.readTime ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              placeholder="Read time"
              className="w-20 min-w-0 border-0 bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
            />
            <span className="text-muted-foreground/70">
              · {wordCount} words · ~{Math.max(1, Math.ceil(wordCount / 200))} min read
            </span>
          </div>

          {/* Add a cover image */}
          <div className="mb-10">
            <div className="space-y-2">
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/60 hover:bg-muted/50 cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Add a cover image</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Drag & drop or click to browse</p>
                  <p className="text-xs text-muted-foreground">Image files, max 50 MB</p>
                </div>
                <Input
                  type="url"
                  value={form.imageUrl ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="Or paste image URL"
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
                key={editing?.slug ?? "new"}
                value={sectionsToTiptapDoc(form.body ?? []) as TiptapDocJSON}
                onChange={(doc) => setForm((f) => ({ ...f, body: tiptapJsonToSections(doc) }))}
                placeholder="Tell your story..."
                showStats
              />
            </div>
          </div>

          {/* Save & Cancel */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-9 rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
            <Button
              variant="ghost"
              onClick={closeForm}
              className="h-9 rounded-full px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </Button>
          </div>
        </article>
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
      title="News"
      description="Manage articles and featured content."
      actions={
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add article
        </Button>
      }
    >
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border/60 px-4 py-4 bg-muted/30 space-y-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">Articles</h2>
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} of {articles.length}{" "}
              {articles.length === 1 ? "article" : "articles"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="quarter">Last 3 months</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={displayFilter} onValueChange={setDisplayFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder="Display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All displays</SelectItem>
                  {DISPLAY_OPTIONS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-border/60">
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
                    {a.display || "Regular"}
                  </Badge>
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link to={`/news/${a.slug}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                    View
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => openEdit(a)}
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => setDeleteConfirmSlug(a.slug)}
                  aria-label="Delete"
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
            <AlertDialogTitle>Delete article?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              {deleteConfirmSlug && articles.find((a) => a.slug === deleteConfirmSlug)?.title ? (
                <strong>"{articles.find((a) => a.slug === deleteConfirmSlug)?.title}"</strong>
              ) : (
                "this article"
              )}
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageShell>
  );
}
