import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/adminClient";
import type { EventItem } from "@/api/client";
import { eventsKeys } from "@/api/queryKeys";

export function useEventsQuery() {
  return useQuery({ queryKey: eventsKeys.list(), queryFn: () => adminApi.events.list() });
}

export function useEventsMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: eventsKeys.all });

  const create = useMutation({
    mutationFn: (item: Omit<EventItem, "id">) => adminApi.events.create(item),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, item }: { id: string; item: Partial<EventItem> }) => adminApi.events.update(id, item),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.events.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
