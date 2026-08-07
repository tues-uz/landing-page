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
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation("admin");
  const currentLocale = i18n.language;

  const load = useCallback(() => {
    setLoading(true);
    adminApi.news
      .list(currentLocale)
      .then((data) => {
        setArticles(data);
      })
      .catch(() => {
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [currentLocale]);

  const handleDelete = useCallback(
    async (slug: string) => {
      setDeleting(true);
      try {
        await adminApi.news.delete(slug);
        toast({ title: t("articleDeleted", "Article deleted") });
        setDeleteConfirmSlug(null);
        load();
      } catch (e) {
        toast({ title: t("failedToDelete", "Failed to delete"), description: String(e), variant: "destructive" });
      } finally {
        setDeleting(false);
      }
    },
    [load, t, toast]
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    return () => {
      if (dropSuccessTimeoutRef.current) clearTimeout(dropSuccessTimeoutRef.current);
    };
  }, []);

  const ordered = sortByOrder(articles);
  const highlightArticles = ordered.filter((a) => (a.display || "").toLowerCase() === "highlight").slice(0, 5);
  const regularArticles = ordered.filter((a) => (a.display || "").toLowerCase() !== "highlight");

  const highlightsHash = articles.map((a) => a.id + ":" + a.display).join(",");
  useEffect(() => {
    if (loading) return;
    const currentHighlights = articles.filter((a) => (a.display || "").toLowerCase() === "highlight").slice(0, 5);
    if (currentHighlights.length === 0) return;
    const ids = currentHighlights.map((a) => a.id);
    setHighlightOrder((prev) => {
      const same = prev.length === ids.length && ids.every((id, i) => prev[i] === id);
      return same ? prev : ids;
    });
  }, [loading, articles, highlightsHash]);

  const effectiveList = highlightOrder.length > 0
    ? highlightOrder.map((id) => highlightArticles.find((a) => a.id === id)).filter(Boolean) as NewsItem[]
    : highlightArticles;

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

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
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

    if (dropSuccessTimeoutRef.current) clearTimeout(dropSuccessTimeoutRef.current);
    setDropSuccessId(targetId);
    dropSuccessTimeoutRef.current = setTimeout(() => {
      setDropSuccessId(null);
      dropSuccessTimeoutRef.current = null;
    }, 1500);

    setSavingOrder(true);
    try {
      await adminApi.news.reorder(newOrder);
      toast({ title: t("orderSaved", "Order saved"), description: t("highlightOrderUpdated", "Highlight order updated.") });
      load();
    } catch (err) {
      toast({ title: t("failedToSaveOrder", "Failed to save order"), description: String(err), variant: "destructive" });
      setHighlightOrder(highlightArticles.map((a) => a.id));
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    dragImageRef.current?.remove();
    dragImageRef.current = null;
  };

  return (
    <AdminPageShell
      title={t("newsboard")}
      description={t("newsBoardDesc", "Overview and quick access to news content.")}
      actions={
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/admin/news/articles" className="gap-2">
            <List className="h-4 w-4" />
            {t("manageArticles", "Manage articles")}
          </Link>
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t("highlightArticles", "Highlight Articles")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("highlightArticlesDesc", "Feature up to 5 articles in the top section. Set an article to Highlight in the editor.")}
            </p>
          </div>
        </div>
        {loading ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-12 px-6 text-center">
            <p className="text-sm text-muted-foreground">{t("loading")}…</p>
          </div>
        ) : (
          <div className="space-y-2">
            {highlightArticles.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {t("noHighlightsHint", "Set articles to \"Highlight\" to feature them here (max 5).")}{" "}
                <Link to="/admin/news/articles?new=1" className="underline hover:text-foreground">
                  {t("addArticle", "Add article")}
                </Link>
              </p>
            )}
            {savingOrder && (
              <p className="text-xs text-muted-foreground">{t("savingOrder", "Saving order")}…</p>
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
                        <a href={`/news/${a.slug}`} target="_blank" rel="noopener noreferrer">
                              {t("view")}
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/news/articles">{t("edit")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => setDeleteConfirmSlug(a.slug)}
                      >
                        {t("delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, a.id)}
                  onDragEnd={handleDragEnd}
                  className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing rounded p-1.5 bg-background/80 hover:bg-muted border border-border touch-none"
                  title={t("dragToReorder", "Drag to reorder")}
                  aria-label={t("dragToReorder", "Drag to reorder")}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
                <a
                  href={`/news/${a.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col flex-1 min-h-0 w-full opacity-100 transition-opacity hover:opacity-90 rounded-t-xl border border-border bg-card overflow-hidden ${draggedId === a.id ? "opacity-60" : ""}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, a.id)}
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
                        {t("noImage", "No image")}
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
          <h2 className="text-lg font-semibold text-foreground">{t("regularArticles", "Regular Articles")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("regularArticlesDesc", "Articles not set as Highlight. They appear in the main news list.")}
          </p>
        </div>
        {loading ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-8 px-4 text-center">
            <p className="text-sm text-muted-foreground">{t("loading")}…</p>
          </div>
        ) : regularArticles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-8 px-4 text-center">
            <p className="text-sm text-muted-foreground">{t("noRegularArticles", "No regular articles. All articles are set as Highlight, or there are no articles yet.")}</p>
            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link to="/admin/news/articles?new=1">{t("addArticle", "Add article")}</Link>
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
                        {t("view")}
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/news/articles?edit=${encodeURIComponent(a.slug || "")}`}>
                        {t("edit")}
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
            <AlertDialogTitle>{t("deleteArticle", "Delete article?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteArticleConfirm", { title: articles.find((x) => x.slug === deleteConfirmSlug)?.title || "this article", defaultValue: "This will permanently delete this article. This action cannot be undone." })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={() => deleteConfirmSlug && handleDelete(deleteConfirmSlug)}
            >
              {deleting ? `${t("deleting")}…` : t("delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageShell>
  );
}
