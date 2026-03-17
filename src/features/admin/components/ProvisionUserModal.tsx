import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { adminApi, type ProvisionRequest } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ProvisionUserModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProvisionUserModal({ open, onClose }: ProvisionUserModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ProvisionRequest>({
    email: "",
    name: "",
    password: "",
    permissionIds: [],
  });
  
  const { data: platforms = [] } = useQuery({
    queryKey: ["admin", "platforms"],
    queryFn: adminApi.getPlatforms,
  });
  
  const provisionMutation = useMutation({
    mutationFn: adminApi.provision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      onClose();
      setFormData({ email: "", name: "", password: "", permissionIds: [] });
    },
  });
  
  const togglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permId)
        ? prev.permissionIds.filter(id => id !== permId)
        : [...prev.permissionIds, permId]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    provisionMutation.mutate(formData);
  };
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Admin User</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Temporary Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label>Permissions</Label>
            <div className="mt-2 space-y-3">
              {platforms.map(platform => (
                <div key={platform.platform} className="rounded-lg border border-border p-3">
                  <div className="font-medium text-sm mb-2">{platform.platform}</div>
                  <div className="flex flex-wrap gap-2">
                    {platform.permissions.map(perm => (
                      <label key={perm.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.permissionIds.includes(perm.id)}
                          onChange={() => togglePermission(perm.id)}
                          className="rounded border-border"
                        />
                        {perm.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={provisionMutation.isPending}>
              {provisionMutation.isPending ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
