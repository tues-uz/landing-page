import { useAuth } from "@/features/auth/context";

export function usePermissions() {
  const { user } = useAuth();
  const permissions = user?.permissions ?? [];

  console.debug("[usePermissions] user:", user);
  console.debug("[usePermissions] permissions:", permissions);

  const hasPermission = (perm: string) => permissions.includes(perm);

  const isSuperAdmin = user?.role === "superadmin";

  const canAccessHero =
    isSuperAdmin ||
    permissions.some((p) => p.endsWith(":hero:full") || p.endsWith(":hero:*") || p === "hero:full" || p === "*:*");
  const canAccessNews =
    isSuperAdmin ||
    permissions.some((p) => p.endsWith(":news:full") || p.endsWith(":news:*") || p === "news:full" || p === "*:*");
  const canAccessEvents =
    isSuperAdmin ||
    permissions.some((p) => p.endsWith(":events:full") || p.endsWith(":events:*") || p === "events:full" || p === "*:*");
  const canAccessApplications =
    isSuperAdmin ||
    permissions.some(
      (p) => p.endsWith(":applications:full") || p.endsWith(":applications:*") || p === "applications:full" || p === "*:*"
    );
  const canAccessNewsletter =
    isSuperAdmin ||
    permissions.some(
      (p) => p.endsWith(":newsletter:full") || p.endsWith(":newsletter:*") || p === "newsletter:full" || p === "*:*"
    );

  return {
    user,
    hasPermission,
    canAccessHero,
    canAccessNews,
    canAccessEvents,
    canAccessApplications,
    canAccessNewsletter,
  };
}
