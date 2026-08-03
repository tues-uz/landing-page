import { useEffect, useMemo, useState } from "react";
import { Download, Mail, Search, Trash2, UserCheck, UserMinus } from "lucide-react";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { adminApi } from "@/api/adminClient";
import {
  exportNewsletterSubscribersCsv,
  type NewsletterSubscriber,
  type NewsletterSubscriberStatus,
} from "@/data/newsletterSubscribers";
import { useTranslation } from "react-i18next";

const STATUS_OPTIONS: NewsletterSubscriberStatus[] = ["active", "unsubscribed"];

const STATUS_BADGE_CLASS: Record<NewsletterSubscriberStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  unsubscribed: "bg-slate-50 text-slate-600 border-slate-200",
};

export default function AdminNewsletterSubscribers() {
  const { t } = useTranslation("admin");
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | NewsletterSubscriberStatus>("all");
  const [deleteTarget, setDeleteTarget] = useState<NewsletterSubscriber | null>(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.newsletter.list(statusFilter);
      setSubscribers(data);
    } catch {
      toast({ title: t("newsletterFetchFailed") || "Failed to fetch newsletter subscribers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter]);

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();
    return subscribers.filter((s) => {
      const matchesSearch = !search || s.email.includes(search);
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [q, statusFilter, subscribers]);

  const stats = useMemo(() => {
    const active = subscribers.filter((s) => s.status === "active").length;
    const thisMonth = subscribers.filter((s) => {
      const d = new Date(s.subscribedAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return { total: subscribers.length, active, thisMonth };
  }, [subscribers]);

  const changeStatus = async (id: string, status: NewsletterSubscriberStatus) => {
    try {
      await adminApi.newsletter.updateStatus(id, status);
      toast({ title: t("newsletterStatusUpdated") });
      fetchSubscribers();
    } catch {
      toast({ title: t("newsletterUpdateFailed"), variant: "destructive" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminApi.newsletter.delete(deleteTarget.id);
      setDeleteTarget(null);
      toast({ title: t("newsletterDeleted") });
      fetchSubscribers();
    } catch {
      toast({ title: t("newsletterDeleteFailed"), variant: "destructive" });
    }
  };

  const handleExport = () => {
    const csv = exportNewsletterSubscribersCsv(subscribers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: t("newsletterExported") });
  };

  return (
    <AdminPageShell
      title={t("newsletterSubscribers")}
      description={t("newsletterSubscribersDesc")}
      actions={
        <Button size="sm" variant="outline" className="gap-2 border-slate-200" onClick={handleExport}>
          <Download className="h-4 w-4" />
          {t("export")}
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{t("newsletterTotal")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-400" />
            <span className="text-2xl font-bold tabular-nums text-slate-900">{stats.total}</span>
          </CardContent>
        </Card>
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{t("newsletterActive")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-emerald-500" />
            <span className="text-2xl font-bold tabular-nums text-slate-900">{stats.active}</span>
          </CardContent>
        </Card>
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{t("newsletterThisMonth")}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold tabular-nums text-slate-900">{stats.thisMonth}</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("newsletterSearchPlaceholder")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | NewsletterSubscriberStatus)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
        >
          <option value="all">{t("newsletterAllStatuses")}</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {t(`newsletterStatus_${status}`)}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">
        {t("newsletterShowing", { count: filtered.length, total: subscribers.length })}
        {q.trim() ? ` ${t("matching")} "${q.trim()}"` : ""}
      </p>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-500">Loading newsletter subscribers...</div>
      ) : subscribers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <Mail className="mb-3 h-8 w-8 text-slate-300" />
          <p className="text-sm font-medium text-slate-700">{t("newsletterEmpty")}</p>
          <p className="mt-1 max-w-sm text-sm text-slate-500">{t("newsletterEmptyDesc")}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs text-slate-500">
                <th className="px-4 py-3 font-medium">{t("email")}</th>
                <th className="px-4 py-3 font-medium">{t("newsletterSubscribedAt")}</th>
                <th className="px-4 py-3 font-medium">{t("status")}</th>
                <th className="px-4 py-3 font-medium">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-900">{s.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(s.subscribedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={s.status}
                      onChange={(e) => changeStatus(s.id, e.target.value as NewsletterSubscriberStatus)}
                      className={`rounded-md border px-2 py-1 text-xs font-medium ${STATUS_BADGE_CLASS[s.status]}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {t(`newsletterStatus_${status}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {s.status === "active" ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-amber-600"
                          title={t("newsletterMarkUnsubscribed")}
                          onClick={() => changeStatus(s.id, "unsubscribed")}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-emerald-600"
                          title={t("newsletterMarkActive")}
                          onClick={() => changeStatus(s.id, "active")}
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-red-600"
                        title={t("delete")}
                        onClick={() => setDeleteTarget(s)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && subscribers.length > 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("newsletterNoMatches")}</p>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("newsletterDeleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("newsletterDeleteConfirm", { email: deleteTarget?.email ?? "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDelete}>
              {t("delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageShell>
  );
}
