import { UserCog, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { adminApi, AdminUser } from "@/api/auth";
import { ProvisionUserModal } from "../components/ProvisionUserModal";
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
import { useState } from "react";

export default function AdminsPage() {
  const { t } = useTranslation("admin");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

  const queryClient = useQueryClient();

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.listUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setDeletingUser(null);
    },
  });

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-1">{t("admins")}</h2>
        <p className="text-muted-foreground text-sm">{t("adminsDesc", "Manage admin users and roles registered by super admin.")}</p>
      </section>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <UserCog className="h-4 w-4 text-muted-foreground" />
              {t("rolesTitle")}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{t("rolesDesc")}</p>
          </div>
          <Button size="sm" className="rounded-lg gap-1.5" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            {t("addAdmin", "Add admin")}
          </Button>
        </div>
        
        {usersLoading ? (
          <div className="px-6 py-8 text-center text-muted-foreground">{t("loading")}...</div>
        ) : users.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground">
            {t("noAdminsYet", "No admins yet. Click \"Add admin\" to create one.")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left font-medium text-foreground px-6 py-3">{t("name", "Name")}</th>
                  <th className="text-left font-medium text-foreground px-6 py-3">{t("email", "Email")}</th>
                  <th className="text-left font-medium text-foreground px-6 py-3">{t("permissions", "Permissions")}</th>
                  <th className="text-left font-medium text-foreground px-6 py-3">{t("status", "Status")}</th>
                  <th className="text-right font-medium text-foreground px-6 py-3">{t("actions", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-3 text-foreground font-medium">{user.name}</td>
                    <td className="px-6 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.length === 0 ? (
                          <span className="text-xs text-muted-foreground italic">{t("noAccess", "No access")}</span>
                        ) : (
                          <>
                            {user.permissions.slice(0, 4).map((perm) => {
                              const resource = perm.resource === "*" ? "System" : perm.resource;
                              const actionLabel = perm.action === "full" ? "Full" : perm.action;
                              return (
                                <span 
                                  key={perm.id} 
                                  className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-primary"
                                  title={`${perm.platformName}: ${perm.resource} - ${perm.action}`}
                                >
                                  {resource} • {actionLabel}
                                </span>
                              );
                            })}
                            {user.permissions.length > 4 && (
                              <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 rounded-full px-2 py-0.5">
                                +{user.permissions.length - 4} more
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      {user.isActive ? (
                        <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                          {t("active", "Active")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600">
                          {t("inactive", "Inactive")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => handleEdit(user)}
                      >
                        {t("edit", "Edit")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors ml-1"
                        onClick={() => setDeletingUser(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <ProvisionUserModal 
        open={showModal} 
        onClose={handleClose} 
        initialData={editingUser}
      />

      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteAdmin", "Delete admin?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirmDesc", { name: deletingUser?.name, email: deletingUser?.email, defaultValue: `Are you sure you want to delete ${deletingUser?.name} (${deletingUser?.email})? This action cannot be undone.` })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel", "Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deletingUser && deleteMutation.mutate(deletingUser.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? `${t("deleting", "Deleting")}...` : t("delete", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
