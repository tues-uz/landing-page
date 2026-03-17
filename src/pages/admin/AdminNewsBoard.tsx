import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { GripVertical, List, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { adminApi, type NewsItem } from "@/api/adminClient";
import { AdminPageShell } from "./AdminPageShell";
import { useToast } from "@/components/ui/use-toast";

/** Sort by sortOrder (lower first); items without sortOrder go last. */
function sortByOrder(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const aOrder = a.sortOrder != null ? Number(a.sortOrder) : NaN;
    const bOrder = b.sortOrder != null ? Number(b.sortOrder) : NaN;
    if (Number.isNaN(aOrder) && Number.isNaN(bOrder)) return 0;
    if (Number.isNaN(aOrder)) return 1;
    if (Number.isNaN(bOrder)) return -1;
    return aOrder - bOrder;
  });
}

/** Dummy highlight articles for preview when none are set. */
const DUMMY_HIGHLIGHT_ARTICLES: NewsItem[] = [
  {
    id: "dummy-1",
    slug: "campus-news-update",
    title: "Campus news and updates",
    excerpt: "Latest from campus.",
    date: "Mar 10, 2026",
    category: "News",
    imageUrl: "",
    author: "TUES",
    readTime: "2 min read",
    body: [],
    display: "Highlight",
  },
  {
    id: "dummy-2",
    slug: "research-highlights",
    title: "Research highlights",
    excerpt: "Featured research stories.",
    date: "Mar 8, 2026",
    category: "News",
    imageUrl: "",
    author: "TUES",
    readTime: "3 min read",
    body: [],
    display: "Highlight",
  },
  {
    id: "dummy-3",
    slug: "student-achievements",
    title: "Student achievements",
    excerpt: "Celebrating student success.",
    date: "Mar 5, 2026",
    category: "Announcements",
    imageUrl: "",
    author: "TUES",
    readTime: "2 min read",
    body: [],
    display: "Highlight",
  },
  {
    id: "dummy-4",
    slug: "upcoming-events",
    title: "Upcoming events",
    excerpt: "What's on this month.",
    date: "Mar 1, 2026",
    category: "Events",
    imageUrl: "",
    author: "TUES",
    readTime: "1 min read",
    body: [],
    display: "Highlight",
  },
  {
    id: "dummy-5",
    slug: "blog-insights",
    title: "Blog insights",
    excerpt: "Thoughts and updates.",
    date: "Feb 28, 2026",
    category: "Blog",
    imageUrl: "",
    author: "TUES",
    readTime: "4 min read",
    body: [],
    display: "Highlight",
  },
];

export default function AdminNewsBoard() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightOrder, setHighlightOrder] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [dropSuccessId, setDropSuccessId] = useState<string | null>(null);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const dragImageRef = useRef<HTMLElement | null>(null);
  const dropSuccessTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    adminApi.news
      .list()
      .then(setArticles)
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = useCallback(
    async (slug: string) => {
      setDeleting(true);
      try {
        await adminApi.news.delete(slug);
        toast({ title: "Article deleted" });
        setDeleteConfirmSlug(null);
        load();
      } catch (e) {
        toast({ title: "Failed to delete", description: String(e), variant: "destructive" });
      } finally {
        setDeleting(false);
      }
    },
    [load, toast]
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    return () => {
      dropSuccessTimeoutRef.current && clearTimeout(dropSuccessTimeoutRef.current);
    };
  }, []);

  const ordered = sortByOrder(articles);
  const highlightArticles = articles.filter((a) => (a.display || "").toLowerCase() === "highlight").slice(0, 5);
  const regularArticles = articles.filter((a) => (a.display || "").toLowerCase() !== "highlight");

  const isDummy = highlightArticles.length === 0;
  const displayList = isDummy ? DUMMY_HIGHLIGHT_ARTICLES : highlightArticles;

  useEffect(() => {
    if (loading) return;
    const ids = (isDummy ? DUMMY_HIGHLIGHT_ARTICLES : highlightArticles).map((a) => a.id);
    setHighlightOrder((prev) => {
      const same = prev.length === ids.length && ids.every((id, i) => prev[i] === id);
      return same ? prev : ids;
    });
  }, [loading, isDummy, highlightArticles.length, highlightArticles.map((a) => a.id).join(",")]);

  const orderedDisplayList = displayList.length === 0 ? [] : highlightOrder.map((id) => displayList.find((a) => a.id === id)).filter(Boolean) as NewsItem[];
  const effectiveList = orderedDisplayList.length > 0 ? orderedDisplayList : displayList;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    const wrapper = (e.currentTarget as HTMLElement).closest(".news-grid-card") as HTMLElement | null;
    const card = wrapper?.querySelector("a.group") as HTMLElement | null;
    if (card) {
      dragImageRef.current?.remove();
      const clone = card.cloneNode(true) as HTMLElement;
      const rect = card.getBoundingClientRect();
      clone.style.position = "absolute";
      clone.style.top = "-9999px";
      clone.style.left = "-9999px";
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.minWidth = `${rect.width}px`;
      clone.style.minHeight = `${rect.height}px`;
      clone.style.opacity = "0.95";
      clone.style.pointerEvents = "none";
      clone.style.boxShadow = "0 10px 40px rgba(0,0,0,0.15)";
      clone.style.zIndex = "9999";
      document.body.appendChild(clone);
      dragImageRef.current = clone;
      e.dataTransfer.setDragImage(clone, rect.width / 2, rect.height / 2);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDraggedId(null);
    const id = e.dataTransfer.getData("text/plain");
    if (!id || id === targetId) return;
    const from = highlightOrder.indexOf(id);
    const to = highlightOrder.indexOf(targetId);
    if (from === -1 || to === -1) return;
    const newOrder = [...highlightOrder];
    newOrder.splice(from, 1);
    newOrder.splice(to, 0, id);
    setHighlightOrder(newOrder);

    dropSuccessTimeoutRef.current && clearTimeout(dropSuccessTimeoutRef.current);
    setDropSuccessId(targetId);
    dropSuccessTimeoutRef.current = setTimeout(() => {
      setDropSuccessId(null);
      dropSuccessTimeoutRef.current = null;
    }, 1500);

    if (isDummy) {
      toast({ title: "Order updated", description: "Card position changed." });
    } else if (highlightArticles.length > 0) {
      setSavingOrder(true);
      const highlightIds = newOrder.filter((oid) => articles.some((a) => a.id === oid && (a.display || "").toLowerCase() === "highlight"));
      const rest = ordered.filter((a) => !highlightIds.includes(a.id));
      const fullOrder = [...highlightIds.map((oid) => articles.find((a) => a.id === oid)).filter(Boolean) as NewsItem[], ...rest];
      Promise.all(fullOrder.map((a, i) => adminApi.news.update(a.slug || a.id, { sortOrder: String(i) })))
        .then(() => {
          toast({ title: "Order saved", description: "Highlight order updated." });
          load();
        })
        .catch((err) => {
          toast({ title: "Failed to save order", description: String(err), variant: "destructive" });
          setHighlightOrder(displayList.map((a) => a.id));
        })
        .finally(() => setSavingOrder(false));
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    dragImageRef.current?.remove();
    dragImageRef.current = null;
  };

  return (
    <AdminPageShell
      title="News board"
      description="Overview and quick access to news content."
      actions={
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/admin/news/articles" className="gap-2">
            <List className="h-4 w-4" />
            Manage articles
          </Link>
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Highlight Articles</h2>
            <p className="text-sm text-muted-foreground">
              Feature up to 5 articles in the top section. Set an article to Highlight in the editor.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-12 px-6 text-center">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        ) : (
          <div className="space-y-2">
            {highlightArticles.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Sample preview — set &quot;Display on News page&quot; to Highlight on articles to feature them here (max 5).{" "}
                <Link to="/admin/news/articles?new=1" className="underline hover:text-foreground">
                  Add article
                </Link>
              </p>
            )}
            {savingOrder && (
              <p className="text-xs text-muted-foreground">Saving order…</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr">
            {effectiveList.map((a, index) => (
              <div
                key={a.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, a.id)}
                className={`news-grid-card flex flex-col relative rounded-xl transition-shadow duration-300 ${
                  dropSuccessId === a.id ? "ring-2 ring-green-500 ring-offset-2 shadow-lg" : ""
                } ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-0"
                    : "min-h-[200px] md:min-h-0"
                }`}
              >
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-md bg-background/80 hover:bg-muted border border-border"
                        aria-label="Actions"
                      >
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem asChild>
                        <a href={a.id.startsWith("dummy-") ? "#" : `/news/${a.slug}`} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/news/articles">Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        disabled={a.id.startsWith("dummy-")}
                        onSelect={() => !a.id.startsWith("dummy-") && setDeleteConfirmSlug(a.slug)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, a.id)}
                  onDragEnd={handleDragEnd}
                  className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing rounded p-1.5 bg-background/80 hover:bg-muted border border-border touch-none"
                  title="Drag to reorder"
                  aria-label="Drag to reorder"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                <a
                  href={a.id.startsWith("dummy-") ? "#" : `/news/${a.slug}`}
                  target={a.id.startsWith("dummy-") ? undefined : "_blank"}
                  rel={a.id.startsWith("dummy-") ? undefined : "noopener noreferrer"}
                  className={`group flex flex-col flex-1 min-h-0 w-full opacity-100 transition-opacity hover:opacity-90 rounded-t-xl border border-border bg-card overflow-hidden ${draggedId === a.id ? "opacity-60" : ""}`}
                  onClick={a.id.startsWith("dummy-") ? (e) => e.preventDefault() : undefined}
                >
                  <div
                    className={
                      index === 0
                        ? "rounded-t-xl overflow-hidden w-full bg-muted relative flex-1 min-h-0"
                        : "rounded-t-xl overflow-hidden w-full bg-muted relative flex-shrink-0 aspect-[681/492]"
                    }
                  >
                    {a.imageUrl ? (
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="absolute inset-0 w-full h-full object-cover block"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col pt-4 pb-2 flex-shrink-0 px-3 pb-3">
                    <div className="flex flex-row items-center justify-start gap-2 text-left flex-wrap">
                      <p className="text-sm text-foreground">{a.date}</p>
                      <span className="text-sm opacity-60 text-foreground" aria-hidden>
                        ·
                      </span>
                      <p className="text-sm text-foreground">{a.category}</p>
                    </div>
                    <h4 className="mt-2 text-lg font-semibold leading-tight text-left line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                      {a.title}
                    </h4>
                  </div>
                </a>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-8 border-t border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Regular Articles</h2>
          <p className="text-sm text-muted-foreground">
            Articles not set as Highlight. They appear in the main news list.
          </p>
        </div>
        {loading ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-8 px-4 text-center">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        ) : regularArticles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-8 px-4 text-center">
            <p className="text-sm text-muted-foreground">No regular articles. All articles are set as Highlight, or there are no articles yet.</p>
            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link to="/admin/news/articles?new=1">Add article</Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <ul className="divide-y divide-border">
              {regularArticles.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-muted/50">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {a.date}
                      {a.category ? ` · ${a.category}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/news/${a.slug}`} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/news/articles?edit=${encodeURIComponent(a.slug || "")}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <AlertDialog open={deleteConfirmSlug !== null} onOpenChange={(open) => !open && setDeleteConfirmSlug(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete article?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              {deleteConfirmSlug && articles.find((x) => x.slug === deleteConfirmSlug)?.title ? (
                <strong>"{articles.find((x) => x.slug === deleteConfirmSlug)?.title}"</strong>
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
              disabled={deleting}
              onClick={() => deleteConfirmSlug && handleDelete(deleteConfirmSlug)}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageShell>
  );
}
