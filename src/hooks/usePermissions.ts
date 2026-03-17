import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function usePermissions() {
  const { data: user } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    staleTime: Infinity,
  });
  
  return {
    user: user,
    hasPermission: (perm: string) => user?.permissions?.includes(perm) ?? false,
    canEditHero: user?.permissions?.includes("HERO_WRITE") ?? false,
    canEditNews: user?.permissions?.includes("NEWS_WRITE") ?? false,
    canEditEvents: user?.permissions?.includes("EVENTS_WRITE") ?? false,
  };
}
