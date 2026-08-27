import { useMemo, useState } from "react";
import { AdminPageShell } from "./AdminPageShell";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  Search,
  Download,
  Eye,
  Copy,
  Check,
  Phone,
  CreditCard,
  Hash,
  Globe,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, type ApplicationItem } from "@/api/adminClient";
import { applicationsKeys } from "@/api/queryKeys";

const STATUS_OPTIONS: ApplicationItem["status"][] = ["new", "contacted", "enrolled", "rejected"];

const STATUS_CONFIG: Record<
  ApplicationItem["status"],
  { label: string; badge: string; bgLight: string }
> = {
  new: {
    label: "New",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    bgLight: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    bgLight: "bg-amber-500",
  },
  enrolled: {
    label: "Enrolled",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bgLight: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    bgLight: "bg-rose-500",
  },
};

const CITIZENSHIP_NAMES: Record<string, string> = {
  uz: "Uzbekistan",
  kz: "Kazakhstan",
  tj: "Tajikistan",
  kg: "Kyrgyzstan",
  af: "Afghanistan",
  ru: "Russia",
  other: "Other",
};

export default function AdminApplications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: applicationsKeys.list(),
    queryFn: () => adminApi.applications.list(),
  });

  const counts = useMemo(() => {
    return {
      all: applications.length,
      new: applications.filter((a) => a.status === "new").length,
      contacted: applications.filter((a) => a.status === "contacted").length,
      enrolled: applications.filter((a) => a.status === "enrolled").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    };
  }, [applications]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return applications.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) {
        return false;
      }
      if (!s) return true;
      return (
        (a.fullName || "").toLowerCase().includes(s) ||
        (a.phone || "").toLowerCase().includes(s) ||
        (a.courseId || "").toLowerCase().includes(s) ||
        (a.passport || "").toLowerCase().includes(s) ||
        (a.jshshir || "").toLowerCase().includes(s)
      );
    });
  }, [q, statusFilter, applications]);

  const changeStatus = async (id: string, status: ApplicationItem["status"]) => {
    setUpdatingId(id);
    try {
      await adminApi.applications.updateStatus(id, status);
      await queryClient.invalidateQueries({ queryKey: applicationsKeys.all });
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
      toast({ title: "Status updated", description: `Application status set to ${status}.` });
    } catch (e) {
      toast({ title: "Failed to update status", description: String(e), variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
    toast({ title: "Copied to clipboard", description: text });
  };

  const exportToCSV = () => {
    if (filtered.length === 0) {
      toast({ title: "No data to export", variant: "destructive" });
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Citizenship",
      "Phone",
      "Passport",
      "JSHSHIR",
      "Study Type",
      "Program",
      "Status",
      "Submitted At",
      "IP",
    ];

    const rows = filtered.map((a) => [
      a.id,
      `"${(a.fullName || "").replace(/"/g, '""')}"`,
      a.citizenship,
      `"${a.phone}"`,
      `"${a.passport}"`,
      `"${a.jshshir}"`,
      a.studyType,
      a.courseId,
      a.status,
      `"${new Date(a.createdAt).toISOString()}"`,
      a.submittedIp || "",
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tues-applications-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminPageShell
      title="Applications"
      description="Study program application submissions from prospective students."
    >
      {/* Top Controls: Filter Tabs + Search + Export */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap gap-1.5">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="h-8 rounded-full text-xs font-medium"
            >
              All
              <span className="ml-1.5 rounded-full bg-black/10 px-1.5 py-0.2 text-[11px] font-semibold dark:bg-white/20">
                {counts.all}
              </span>
            </Button>
            <Button
              variant={statusFilter === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("new")}
              className={`h-8 rounded-full text-xs font-medium ${
                statusFilter !== "new" ? "hover:bg-blue-50 hover:text-blue-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              New
              <span className="ml-1.5 rounded-full bg-black/10 px-1.5 py-0.2 text-[11px] font-semibold">
                {counts.new}
              </span>
            </Button>
            <Button
              variant={statusFilter === "contacted" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("contacted")}
              className={`h-8 rounded-full text-xs font-medium ${
                statusFilter !== "contacted"
                  ? "hover:bg-amber-50 hover:text-amber-700"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              Contacted
              <span className="ml-1.5 rounded-full bg-black/10 px-1.5 py-0.2 text-[11px] font-semibold">
                {counts.contacted}
              </span>
            </Button>
            <Button
              variant={statusFilter === "enrolled" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("enrolled")}
              className={`h-8 rounded-full text-xs font-medium ${
                statusFilter !== "enrolled"
                  ? "hover:bg-emerald-50 hover:text-emerald-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Enrolled
              <span className="ml-1.5 rounded-full bg-black/10 px-1.5 py-0.2 text-[11px] font-semibold">
                {counts.enrolled}
              </span>
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("rejected")}
              className={`h-8 rounded-full text-xs font-medium ${
                statusFilter !== "rejected" ? "hover:bg-rose-50 hover:text-rose-700" : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              Rejected
              <span className="ml-1.5 rounded-full bg-black/10 px-1.5 py-0.2 text-[11px] font-semibold">
                {counts.rejected}
              </span>
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="h-8 gap-1.5 border-slate-200 text-xs text-slate-700 hover:bg-slate-50"
            disabled={filtered.length === 0}
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, phone, passport, JSHSHIR, program…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 pl-9"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
            <span className="font-semibold text-slate-900">{applications.length}</span> applications
            {q.trim() ? ` matching "${q.trim()}"` : ""}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[950px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs font-semibold text-slate-500">
                  <th className="px-4 py-3.5">Applicant</th>
                  <th className="px-4 py-3.5">Citizenship</th>
                  <th className="px-4 py-3.5">Passport / JSHSHIR</th>
                  <th className="px-4 py-3.5">Study Type</th>
                  <th className="px-4 py-3.5">Program</th>
                  <th className="px-4 py-3.5">Submitted</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((a) => {
                  const cfg = STATUS_CONFIG[a.status] ?? STATUS_CONFIG.new;
                  return (
                    <tr key={a.id} className="transition-colors hover:bg-slate-50/60">
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900">{a.fullName}</div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {a.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                          {CITIZENSHIP_NAMES[a.citizenship] ?? a.citizenship.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <div className="font-mono font-medium text-slate-800">{a.passport}</div>
                        <div className="mt-0.5 font-mono text-slate-500">{a.jshshir}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700 capitalize">
                          {a.studyType.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-block max-w-[200px] truncate rounded bg-blue-50/70 px-2 py-1 font-mono text-xs font-medium text-blue-900 border border-blue-100">
                          {a.courseId}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">
                        <div>{new Date(a.createdAt).toLocaleDateString()}</div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(a.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <select
                          value={a.status}
                          disabled={updatingId === a.id}
                          onChange={(e) => changeStatus(a.id, e.target.value as ApplicationItem["status"])}
                          className={`rounded-md border px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${cfg.badge}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {STATUS_CONFIG[s]?.label ?? s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApp(a)}
                          className="h-8 gap-1 px-2.5 text-xs text-slate-600 hover:text-slate-900"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
              <p className="text-sm font-medium text-slate-600">No applications match your filter.</p>
              <p className="mt-1 text-xs text-slate-400">Try adjusting your search query or status tab.</p>
            </div>
          )}
        </>
      )}

      {/* Applicant Detail Modal */}
      <Dialog open={Boolean(selectedApp)} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent className="max-w-lg border-slate-200 bg-white p-6 sm:rounded-2xl">
          {selectedApp && (
            <>
              <DialogHeader className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_CONFIG[selectedApp.status]?.badge
                    }`}
                  >
                    {STATUS_CONFIG[selectedApp.status]?.label}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedApp.id.slice(0, 8)}…</span>
                </div>
                <DialogTitle className="text-xl font-bold text-slate-900 pt-1">
                  {selectedApp.fullName}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Submitted on {new Date(selectedApp.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4 divide-y divide-slate-100 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      Phone Number
                    </span>
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-sm text-slate-900">
                      <span>{selectedApp.phone}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedApp.phone, "phone")}
                        className="text-slate-400 hover:text-slate-700"
                        title="Copy phone"
                      >
                        {copiedField === "phone" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      Citizenship
                    </span>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm font-medium text-slate-900">
                      {CITIZENSHIP_NAMES[selectedApp.citizenship] ?? selectedApp.citizenship.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                      Passport
                    </span>
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-sm text-slate-900">
                      <span>{selectedApp.passport}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedApp.passport, "passport")}
                        className="text-slate-400 hover:text-slate-700"
                        title="Copy passport"
                      >
                        {copiedField === "passport" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Hash className="h-3.5 w-3.5 text-slate-400" />
                      JSHSHIR (PINFL)
                    </span>
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-sm text-slate-900">
                      <span>{selectedApp.jshshir}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedApp.jshshir, "jshshir")}
                        className="text-slate-400 hover:text-slate-700"
                        title="Copy JSHSHIR"
                      >
                        {copiedField === "jshshir" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      Study Form
                    </span>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-slate-900 capitalize">
                      {selectedApp.studyType.replace("-", " ")}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      Target Program
                    </span>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs font-semibold text-blue-900">
                      {selectedApp.courseId}
                    </div>
                  </div>
                </div>

                {selectedApp.submittedIp && (
                  <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Submitted IP: <span className="font-mono text-slate-700">{selectedApp.submittedIp}</span></span>
                    <span>Updated: {new Date(selectedApp.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Status Update Quick Actions */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-500 block mb-2">Change Status:</span>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedApp.status === status ? "default" : "outline"}
                      disabled={updatingId === selectedApp.id}
                      onClick={() => changeStatus(selectedApp.id, status)}
                      className={`h-8 text-xs ${
                        selectedApp.status === status
                          ? "font-semibold shadow-sm"
                          : "text-slate-600 hover:text-slate-900 border-slate-200"
                      }`}
                    >
                      {STATUS_CONFIG[status]?.label}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
