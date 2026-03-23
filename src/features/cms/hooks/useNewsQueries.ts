import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/adminClient";
import type { NewsItem } from "@/api/client";
import { newsKeys } from "@/api/queryKeys";

export function useNewsQuery() {
  return useQuery({ queryKey: newsKeys.list(), queryFn: () => adminApi.news.list() });
}

export function useNewsDetailQuery(slug: string) {
  return useQuery({
    queryKey: newsKeys.detail(slug),
    queryFn: () => adminApi.news.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useNewsMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: newsKeys.all });

  const create = useMutation({
    mutationFn: (item: Omit<NewsItem, "id">) => adminApi.news.create(item),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<NewsItem> }) => adminApi.news.update(id, item),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.news.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
