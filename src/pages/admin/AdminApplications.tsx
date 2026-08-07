import { useMemo, useState } from "react";
import { AdminPageShell } from "./AdminPageShell";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, type ApplicationItem } from "@/api/adminClient";
import { applicationsKeys } from "@/api/queryKeys";

const STATUS_OPTIONS: ApplicationItem["status"][] = ["new", "contacted", "rejected", "enrolled"];

const STATUS_BADGE_CLASS: Record<ApplicationItem["status"], string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  enrolled: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function AdminApplications() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: applicationsKeys.list(),
    queryFn: () => adminApi.applications.list(),
  });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return applications;
    return applications.filter(
      (a) =>
        (a.fullName || "").toLowerCase().includes(s) ||
        (a.phone || "").toLowerCase().includes(s) ||
        (a.courseId || "").toLowerCase().includes(s) ||
        (a.passport || "").toLowerCase().includes(s),
    );
  }, [q, applications]);

  const changeStatus = async (id: string, status: ApplicationItem["status"]) => {
    setUpdatingId(id);
    try {
      await adminApi.applications.updateStatus(id, status);
      await queryClient.invalidateQueries({ queryKey: applicationsKeys.all });
      toast({ title: "Status updated" });
    } catch (e) {
      toast({ title: "Failed to update status", description: String(e), variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminPageShell
      title="Applications"
      description="Study program application submissions from prospective students."
    >
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, phone, passport, or program…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9 h-10"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {applications.length} applications
            {q.trim() ? ` matching "${q.trim()}"` : ""}
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-medium">Full name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Citizenship</th>
                  <th className="px-4 py-3 font-medium">Study type</th>
                  <th className="px-4 py-3 font-medium">Program</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-900">{a.fullName}</td>
                    <td className="px-4 py-3 text-slate-600">{a.phone}</td>
                    <td className="px-4 py-3 text-slate-600 uppercase">{a.citizenship}</td>
                    <td className="px-4 py-3 text-slate-600">{a.studyType}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{a.courseId}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {new Date(a.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        disabled={updatingId === a.id}
                        onChange={(e) => changeStatus(a.id, e.target.value as ApplicationItem["status"])}
                        className={`rounded-md border px-2 py-1 text-xs font-medium ${STATUS_BADGE_CLASS[a.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No applications match your search.
            </p>
          )}
        </>
      )}
    </AdminPageShell>
  );
}
