import { programs } from "@/components/Programs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";

export default function AdminPrograms() {
  return (
    <AdminPageShell
      title="Programs"
      description="Program list (read-only). To manage from CMS, add a programs API and backend storage."
    >
      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-slate-900">Programs ({programs.length})</CardTitle>
          <CardDescription className="text-slate-500">Read-only list from <code className="rounded bg-slate-100 px-1 text-xs">src/components/Programs.tsx</code></CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
            {programs.map((p) => (
              <li key={p.id} className="flex justify-between items-center rounded-xl border border-slate-200 bg-white p-3 text-sm hover:bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">{p.title}</p>
                  <p className="text-slate-500">{p.slug} · {p.count}</p>
                </div>
                <a href={`/programs#${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                  View on site
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
