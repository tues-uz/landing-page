import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function usePermissions() {
  const { data: user } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    staleTime: Infinity,
  });

  const permissions = user?.permissions ?? [];

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
