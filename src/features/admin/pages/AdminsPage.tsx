import { UserCog, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/api/auth";

export default function AdminsPage() {
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.listUsers,
  });

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
            Add admin
          </Button>
        </div>
        
        {usersLoading ? (
          <div className="px-6 py-8 text-center text-muted-foreground">Loading...</div>
        ) : users.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground">
            No admins yet. Click "Add admin" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left font-medium text-foreground px-6 py-3">Name</th>
                  <th className="text-left font-medium text-foreground px-6 py-3">Email</th>
                  <th className="text-left font-medium text-foreground px-6 py-3">Permissions</th>
                  <th className="text-left font-medium text-foreground px-6 py-3">Status</th>
                  <th className="text-right font-medium text-foreground px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-3 text-foreground font-medium">{user.name}</td>
                    <td className="px-6 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 3).map((perm) => (
                          <span key={perm} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {perm}
                          </span>
                        ))}
                        {user.permissions.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{user.permissions.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      {user.isActive ? (
                        <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
