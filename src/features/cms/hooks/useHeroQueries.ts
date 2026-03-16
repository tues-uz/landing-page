import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/adminClient";
import type { HeroSlide, HeroBackground } from "@/api/client";
import { heroKeys } from "@/api/queryKeys";

export function useHeroSlidesQuery() {
  return useQuery({ queryKey: heroKeys.list(), queryFn: adminApi.heroSlides.list });
}

export function useHeroBackgroundQuery() {
  return useQuery({ queryKey: heroKeys.background(), queryFn: adminApi.heroBackground.get });
}

export function useHeroSlidesMutations() {
  const qc = useQueryClient();
  const invalidateSlides = () => qc.invalidateQueries({ queryKey: heroKeys.all });

  const create = useMutation({
    mutationFn: (slide: Omit<HeroSlide, "id">) => adminApi.heroSlides.create(slide),
    onSuccess: invalidateSlides,
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<HeroSlide> }) => adminApi.heroSlides.update(id, data),
    onSuccess: invalidateSlides,
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.heroSlides.delete(id),
    onSuccess: invalidateSlides,
  });

  const saveBackground = useMutation({
    mutationFn: (bg: HeroBackground) => adminApi.heroBackground.update(bg),
    onSuccess: () => qc.invalidateQueries({ queryKey: heroKeys.background() }),
  });

  return { create, update, remove, saveBackground };
}
