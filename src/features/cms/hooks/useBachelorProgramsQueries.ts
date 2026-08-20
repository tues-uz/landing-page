import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentApi } from "@/api/client";
import { adminApi } from "@/api/adminClient";
import { contentKeys, bachelorProgramsKeys } from "@/api/queryKeys";
import type { BachelorProgramItem, BachelorProgramTrack } from "@/types/bachelorPrograms";

export function useBachelorProgramsQuery(track?: BachelorProgramTrack, initialData?: BachelorProgramItem[]) {
  return useQuery({
    queryKey: contentKeys.bachelorPrograms.list(track),
    queryFn: () => contentApi.bachelorPrograms.list(track),
    initialData,
  });
}

export function useBachelorProgramDetailQuery(
  track: BachelorProgramTrack | undefined,
  programNo: number | undefined,
  initialData?: BachelorProgramItem | null,
) {
  return useQuery({
    queryKey: contentKeys.bachelorPrograms.detail(track ?? "", programNo ?? -1),
    queryFn: () => contentApi.bachelorPrograms.getByTrackAndNo(track as BachelorProgramTrack, programNo as number),
    enabled: !!track && programNo != null && Number.isFinite(programNo),
    initialData: initialData ?? undefined,
  });
}

export function useAdminBachelorProgramsQuery(track?: BachelorProgramTrack) {
  return useQuery({
    queryKey: bachelorProgramsKeys.list(track),
    queryFn: () => adminApi.bachelorPrograms.list(track),
  });
}

export function useBachelorProgramMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: bachelorProgramsKeys.all });
    qc.invalidateQueries({ queryKey: contentKeys.bachelorPrograms.all });
  };

  const create = useMutation({
    mutationFn: (payload: Omit<BachelorProgramItem, "id" | "updatedAt">) =>
      adminApi.bachelorPrograms.create(payload),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BachelorProgramItem> }) =>
      adminApi.bachelorPrograms.update(id, payload),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.bachelorPrograms.delete(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
