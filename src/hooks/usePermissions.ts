import { useAuth } from "@/features/auth/context";

export function usePermissions() {
  const { user } = useAuth();
  const permissions = user?.permissions ?? [];

  console.debug("[usePermissions] user:", user);
  console.debug("[usePermissions] permissions:", permissions);

  const hasPermission = (perm: string) => permissions.includes(perm);

  const canAccessHero = permissions.some(
    (p) => p.endsWith(":hero:full") || p.endsWith(":hero:*")
  );
  const canAccessNews = permissions.some(
    (p) => p.endsWith(":news:full") || p.endsWith(":news:*")
  );
  const canAccessEvents = permissions.some(
    (p) => p.endsWith(":events:full") || p.endsWith(":events:*")
  );

  return {
    user,
    hasPermission,
    canAccessHero,
    canAccessNews,
    canAccessEvents,
  };
}
