# CMS + Admin Provisioning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect frontend CMS to backend APIs with proper auth, build admin provisioning UI

**Architecture:** 
- Frontend uses React Query + JWT auth
- Backend provides REST APIs with permission-based access control
- SuperAdmin configures regular admins with granular permissions (hero/news/events)

**Tech Stack:** React, TanStack Query, TypeScript, Java Spring Boot

---

## Task 1: Fix Auth Integration in AdminClient

**Files:**
- Modify: `landing-page/src/api/adminClient.ts`

**Step 1: Update adminClient to use auth token**

Replace the static token approach with dynamic auth:

```typescript
// Replace getAuthHeaders function (lines 18-24)
import { tokenStore } from "./auth";

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}
```

**Step 2: Test the change**

Run: `cd landing-page && npm run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
cd landing-page
git add src/api/adminClient.ts
git commit -m "fix: use JWT auth from tokenStore instead of static token"
```

---

## Task 2: Add Admin API to auth.ts

**Files:**
- Modify: `landing-page/src/api/auth.ts`

**Step 1: Add admin API functions**

Add to the end of auth.ts (before the closing):

```typescript
// Admin management APIs
export const adminApi = {
  listUsers: () => request<AdminUser[]>("/admin/users"),
  provision: (body: ProvisionRequest) =>
    request<AdminUser>("/admin/users/provision", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updatePermissions: (id: string, permissionIds: string[]) =>
    request<AdminUser>(`/admin/users/${id}/permissions`, {
      method: "PUT",
      body: JSON.stringify({ permissionIds }),
    }),
  setStatus: (id: string, active: boolean) =>
    request<AdminUser>(`/admin/users/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ active }),
    }),
  getPlatforms: () => request<PlatformPermissions[]>("/admin/platforms"),
};

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ProvisionRequest {
  email: string;
  name: string;
  password: string;
  permissionIds: string[];
}

export interface PlatformPermissions {
  platform: string;
  permissions: { id: string; name: string; description: string }[];
}
```

**Step 2: Run build to verify**

Run: `cd landing-page && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
cd landing-page
git add src/api/auth.ts
git commit -m "feat: add admin management API functions"
```

---

## Task 3: Build Admin Provisioning UI - List Users

**Files:**
- Modify: `landing-page/src/features/admin/pages/AdminsPage.tsx`

**Step 1: Add imports and types**

```typescript
import { useQuery } from "@tanstack/react-query";
import { adminApi, type AdminUser, type PlatformPermissions } from "@/api/auth";
import { ADMIN_CARD_CLASS } from "@/pages/admin/AdminPageShell";
import { UserCog, Plus, Shield, ShieldCheck, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
```

**Step 2: Add query hooks**

Add after imports:
```typescript
const { data: users = [], isLoading: usersLoading } = useQuery({
  queryKey: ["admin", "users"],
  queryFn: adminApi.listUsers,
});

const { data: platforms = [] } = useQuery({
  queryKey: ["admin", "platforms"],
  queryFn: adminApi.getPlatforms,
});
```

**Step 3: Update the page component**

Replace the placeholder table with real data:

```tsx
export default function AdminsPage() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Admins</h2>
        <p className="text-muted-foreground text-sm">Manage admin users and roles registered by super admin.</p>
      </section>

      <div className={`${ADMIN_CARD_CLASS} overflow-hidden`}>
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <UserCog className="h-4 w-4 text-muted-foreground" />
              Roles registered by super admin
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Roles created and assigned to platforms.</p>
          </div>
          <Button size="sm" className="rounded-lg gap-1.5" onClick={() => setShowModal(true)}>
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
      
      {/* TODO: Add ProvisionUserModal */}
    </div>
  );
}
```

**Step 4: Run build to verify**

Run: `cd landing-page && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
cd landing-page
git add src/features/admin/pages/AdminsPage.tsx
git commit -m "feat: add admin users list to AdminsPage"
```

---

## Task 4: Build Provision Admin Modal

**Files:**
- Create: `landing-page/src/features/admin/components/ProvisionUserModal.tsx`

**Step 1: Create the modal component**

```typescript
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { adminApi, type ProvisionRequest, type PlatformPermissions } from "@/api/auth";
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
```

**Step 2: Update AdminsPage to use modal**

Add import and component usage:

```typescript
import { ProvisionUserModal } from "../components/ProvisionUserModal";

// In component:
const [showModal, setShowModal] = useState(false);

// In JSX, add modal:
<ProvisionUserModal open={showModal} onClose={() => setShowModal(false)} />
```

**Step 3: Create missing UI components if needed**

Check if Input/Label exist, create if needed:
- `landing-page/src/components/ui/input.tsx`
- `landing-page/src/components/ui/label.tsx`

If they don't exist, create them using shadcn/ui patterns.

**Step 4: Run build to verify**

Run: `cd landing-page && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
cd landing-page
git add src/features/admin/components/ProvisionUserModal.tsx
git commit -m "feat: add ProvisionUserModal component"
```

---

## Task 5: Connect CMS Pages to Backend

**Files:**
- Modify: `landing-page/src/pages/admin/AdminHero.tsx`
- Modify: `landing-page/src/pages/admin/AdminNews.tsx`
- Modify: `landing-page/src/pages/admin/AdminEvents.tsx`

**Step 1: Update AdminHero.tsx to use API**

Add query/mutation hooks:
```typescript
import { useHeroSlidesQuery, useHeroSlidesMutations } from "@/features/cms/hooks/useHeroQueries";

// In component:
const { data: slides = [], isLoading } = useHeroSlidesQuery();
const { create, update, remove } = useHeroSlidesMutations();
```

Replace placeholder data with API calls. Display loading state while fetching.

**Step 2: Repeat for AdminNews.tsx and AdminEvents.tsx**

Use existing hooks:
- `useNewsQueries` from `@/features/cms/hooks/useNewsQueries`
- `useEventsQueries` from `@/features/cms/hooks/useEventsQueries`

**Step 3: Run build to verify**

Run: `cd landing-page && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
cd landing-page
git add src/pages/admin/AdminHero.tsx src/pages/admin/AdminNews.tsx src/pages/admin/AdminEvents.tsx
git commit -m "feat: connect CMS admin pages to backend APIs"
```

---

## Task 6: Add Permission Guards to CMS Pages

**Files:**
- Modify: `landing-page/src/pages/admin/AdminHero.tsx`
- Modify: `landing-page/src/pages/admin/AdminNews.tsx`
- Modify: `landing-page/src/pages/admin/AdminEvents.tsx`

**Step 1: Create permission hook**

Create: `landing-page/src/hooks/usePermissions.ts`
```typescript
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function usePermissions() {
  const { data: me } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    staleTime: Infinity,
  });
  
  return {
    user: me?.user,
    hasPermission: (perm: string) => me?.user?.permissions?.includes(perm) ?? false,
    canEditHero: me?.user?.permissions?.includes("HERO_WRITE") ?? false,
    canEditNews: me?.user?.permissions?.includes("NEWS_WRITE") ?? false,
    canEditEvents: me?.user?.permissions?.includes("EVENTS_WRITE") ?? false,
  };
}
```

**Step 2: Add guards to AdminHero.tsx**

```typescript
const { canEditHero } = usePermissions();

// Hide edit controls if no permission
{canEditHero && <Button onClick={onAddSlide}>Add Slide</Button>}
```

**Step 3: Repeat for other pages**

**Step 4: Commit**

```bash
cd landing-page
git add src/hooks/usePermissions.ts src/pages/admin/AdminHero.tsx src/pages/admin/AdminNews.tsx src/pages/admin/AdminEvents.tsx
git commit -m "feat: add permission guards to CMS pages"
```

---

## Verification Commands

After completing all tasks, run:

```bash
# Build frontend
cd landing-page && npm run build

# Check for lint errors
cd landing-page && npm run lint
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Fix Auth Integration in AdminClient |
| 2 | Add Admin API to auth.ts |
| 3 | Build Admin Users List UI |
| 4 | Build Provision Admin Modal |
| 5 | Connect CMS Pages to Backend |
| 6 | Add Permission Guards |
