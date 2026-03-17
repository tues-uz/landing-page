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
