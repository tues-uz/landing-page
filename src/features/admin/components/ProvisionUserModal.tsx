import { useState, useMemo } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { adminApi, AdminUser, type ProvisionRequest } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  X, 
  Shield, 
  Key, 
  Mail, 
  UserPlus, 
  RefreshCw,
  Layout,
  Newspaper,
  Calendar,
  Lock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";


interface ProvisionUserModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: AdminUser | null;
}

const generatePassword = () => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let retVal = "";
  for (let i = 0, n = charset.length; i < 12; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const getPermissionIcon = (resource: string) => {
  switch (resource.toLowerCase()) {
    case 'hero': return <Layout className="h-3 w-3" />;
    case 'news': return <Newspaper className="h-3 w-3" />;
    case 'events': return <Calendar className="h-3 w-3" />;
    case '*': return <Shield className="h-3 w-3" />;
    default: return <Lock className="h-3 w-3" />;
  }
};

export function ProvisionUserModal({ open, onClose, initialData }: ProvisionUserModalProps) {
  const queryClient = useQueryClient();
  const isEdit = !!initialData;

  const [formData, setFormData] = useState<ProvisionRequest>({
    email: initialData?.email ?? "",
    name: initialData?.name ?? "",
    password: "",
    permissionIds: initialData?.permissions.map(p => p.id) ?? [],
  });

  // Reset form when initialData changes or modal opens
  useMemo(() => {
    if (open) {
      setFormData({
        email: initialData?.email ?? "",
        name: initialData?.name ?? "",
        password: "",
        permissionIds: initialData?.permissions.map(p => p.id) ?? [],
      });
    }
  }, [initialData, open]);
  
  const { data: platforms = [] } = useQuery({
    queryKey: ["admin", "platforms"],
    queryFn: adminApi.getPlatforms,
  });
  
  const saveMutation = useMutation({
    mutationFn: (data: ProvisionRequest) => 
      isEdit 
        ? adminApi.updatePermissions(initialData!.id, data.permissionIds)
        : adminApi.provision(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      onClose();
      if (!isEdit) {
        setFormData({ email: "", name: "", password: "", permissionIds: [] });
      }
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

  const handleGeneratePassword = () => {
    setFormData(prev => ({ ...prev, password: generatePassword() }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };
  
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0 bg-background border-border/50 shadow-2xl">
        <div className="bg-primary/5 p-6 border-b border-border/50">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {isEdit ? <Shield className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">
                  {isEdit ? "Edit Permissions" : "Provision Admin"}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-0.5">
                  {isEdit 
                    ? `Update access control for ${initialData?.name || 'user'}.`
                    : "Create a new administrator with specific platform access."}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        <div className="overflow-y-auto max-h-[70vh]">
          <form id="provision-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            {!isEdit && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Identity Details</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Full Name</Label>
                      <div className="relative">
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-primary"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <UserPlus className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Email Address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-primary"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="bg-border/30" />
              </>
            )}

            {isEdit && (
               <div className="p-3 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Managing Account</div>
                  <div className="text-sm font-semibold">{initialData?.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{initialData?.email}</div>
                </div>
                <Badge variant={initialData?.isActive ? "default" : "secondary"} className="h-5">
                  {initialData?.isActive ? "Active" : "Inactive"}
                </Badge>
               </div>
            )}

            {!isEdit && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Key className="h-4 w-4 text-primary" />
                    <span>Security</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Temporary Password</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="password"
                          type="text"
                          placeholder="••••••••••••"
                          className="pl-9 bg-muted/30 border-border/50 font-mono tracking-wider"
                          value={formData.password}
                          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="shrink-0 gap-2 border-border/50 hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={handleGeneratePassword}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">User will be prompted to change this on first login.</p>
                  </div>
                </div>
                <Separator className="bg-border/30" />
              </>
            )}

            {/* Permissions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Access Control</span>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                  {formData.permissionIds.length} Selected
                </Badge>
              </div>
              
              <div className="space-y-4">
                {platforms.map(platform => (
                  <div key={platform.slug} className="rounded-xl border border-border/50 bg-muted/10 overflow-hidden">
                    <div className="bg-muted/30 px-4 py-2 border-b border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground">{platform.name}</span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-[10px] uppercase font-bold text-muted-foreground hover:text-primary"
                        onClick={() => {
                          const allIds = platform.permissions.map(p => p.id);
                          const isAllSelected = allIds.every(id => formData.permissionIds.includes(id));
                          if (isAllSelected) {
                            setFormData(prev => ({
                              ...prev,
                              permissionIds: prev.permissionIds.filter(id => !allIds.includes(id))
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              permissionIds: [...new Set([...prev.permissionIds, ...allIds])]
                            }));
                          }
                        }}
                      >
                        {platform.permissions.every(p => formData.permissionIds.includes(p.id)) ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    
                    <div className="p-3 grid gap-2">
                      {platform.permissions.map(perm => {
                        const isSelected = formData.permissionIds.includes(perm.id);
                        const switchId = `perm-${perm.id}`;
                        return (
                          <div 
                            key={perm.id} 
                            className={cn(
                              "flex items-center justify-between p-2.5 rounded-lg border transition-all group",
                              isSelected 
                                ? "bg-primary/5 border-primary/30 shadow-sm" 
                                : "bg-background border-border/50 hover:border-border hover:bg-muted/20"
                            )}
                          >
                            <label 
                              htmlFor={switchId}
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className={cn(
                                "p-1.5 rounded-md transition-colors",
                                isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:bg-muted/50"
                              )}>
                                {getPermissionIcon(perm.resource)}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold capitalize tracking-tight">
                                  {perm.resource === '*' ? 'System-wide' : perm.resource} - {perm.action === '*' ? 'Full Access' : perm.action}
                                </span>
                              </div>
                            </label>
                            <Switch 
                              id={switchId}
                              checked={isSelected}
                              onCheckedChange={() => togglePermission(perm.id)}
                              className="scale-75"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-6 bg-muted/30 border-t border-border/50 flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-background">
            Cancel
          </Button>
          <Button 
            form="provision-form"
            type="submit" 
            disabled={saveMutation.isPending}
            className="min-w-[140px] gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            {saveMutation.isPending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {isEdit ? "Saving..." : "Processing..."}
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                {isEdit ? "Save Changes" : "Create Admin"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
