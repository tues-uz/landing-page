import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { adminApi, type NewsItem, type NewsSection } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { sectionsToTiptapDoc, tiptapJsonToSections } from "@/lib/newsEditorUtils";
import type { TiptapDocJSON } from "@/types/article";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Upload } from "lucide-react";

const CATEGORIES = ["News", "Announcements", "Events", "Blog"];
const DISPLAY_OPTIONS = ["Regular", "Featured", "Pinned"];

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
    setDisplay("Regular");
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
    setSaving(true);
    try {
      if (editing) {
        await adminApi.news.update(editing.slug, { ...form, body });
        toast({ title: "Article updated" });
      } else {
        await adminApi.news.create({ ...form, body } as Omit<NewsItem, "id">);
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
    if (!confirm("Delete this article?")) return;
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
                <label className="text-xs text-muted-foreground">Display</label>
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
              </div>
            </div>
          </div>

          {/* Title — slug is auto-derived from title for new articles (only when slug is empty) */}
          <Input
            value={form.title ?? ""}
            onChange={(e) => {
              const title = e.target.value;
              setForm((f) => ({
                ...f,
                title,
                ...(!editing && (!(f.slug ?? "").trim()) && { slug: titleToSlug(title) }),
              }));
            }}
            placeholder="Title"
            className="mb-1 w-full border-0 bg-transparent p-0 font-serif text-[2.25rem] font-bold leading-tight tracking-tight text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-0 sm:text-[2.75rem]"
          />

          {/* Subtitle (textarea) */}
          <textarea
            value={form.excerpt ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder="Subtitles are optional — add a short summary or hook"
            rows={2}
            className="mb-6 w-full resize-none border-0 bg-transparent p-0 text-xl leading-snug text-muted-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0"
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
      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-slate-900">Articles</CardTitle>
          <CardDescription className="text-slate-500">{articles.length} article(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {articles.map((a) => (
              <li
                key={a.id}
                className="flex justify-between items-center rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">{a.title}</p>
                  <p className="text-sm text-slate-500">{a.slug} · {a.date}</p>
                </div>
                <div className="flex gap-1">
                  <Link to={`/news/${a.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-slate-600 hover:bg-slate-100">View</Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(a)} className="hover:bg-slate-100">
                    <Pencil className="h-4 w-4 text-slate-600" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(a.slug)} className="hover:bg-red-50">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
