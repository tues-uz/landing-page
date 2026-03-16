import { UserCog, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const placeholderRoles: { id: string; platform: string; roleName: string; userName: string; email: string; status: string }[] = [];

export default function AdminsPage() {
  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Admins</h2>
        <p className="text-muted-foreground text-sm">Manage admin users and roles registered by super admin.</p>
      </section>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <UserCog className="h-4 w-4 text-muted-foreground" />
              Roles registered by super admin
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Roles created and assigned to platforms.</p>
          </div>
          <Button size="sm" className="rounded-lg gap-1.5">
            <Plus className="h-4 w-4" />
            Add role
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-foreground px-6 py-3">Platform</th>
                <th className="text-left font-medium text-foreground px-6 py-3">Role name</th>
                <th className="text-left font-medium text-foreground px-6 py-3">User name</th>
                <th className="text-left font-medium text-foreground px-6 py-3">Email</th>
                <th className="text-left font-medium text-foreground px-6 py-3">Status</th>
                <th className="text-right font-medium text-foreground px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {placeholderRoles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No roles registered yet. Add role when backend is ready.
                  </td>
                </tr>
              ) : (
                placeholderRoles.map((role) => (
                  <tr key={role.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-3 text-foreground">{role.platform}</td>
                    <td className="px-6 py-3 text-foreground">{role.roleName}</td>
                    <td className="px-6 py-3 text-foreground">{role.userName}</td>
                    <td className="px-6 py-3 text-muted-foreground">{role.email}</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-foreground">
                        {role.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
