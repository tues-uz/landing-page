import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { contentApi } from "@/api/client";
import { adminApi } from "@/api/adminClient";
import { contentKeys, bachelorProgramsKeys } from "@/api/queryKeys";
import { getUiLang, getCmsLocale } from "@/lib/localeContent";
import type { BachelorProgramItem, BachelorProgramTrack } from "@/types/bachelorPrograms";

export function useBachelorProgramsQuery(track?: BachelorProgramTrack, initialData?: BachelorProgramItem[]) {
  const { i18n } = useTranslation();
  const uiLang = getUiLang(i18n);
  const cmsLocale = getCmsLocale(i18n.language);
  return useQuery({
    queryKey: [...contentKeys.bachelorPrograms.list(track), uiLang, cmsLocale],
    queryFn: () => contentApi.bachelorPrograms.list(track, cmsLocale),
    initialData,
  });
}

export function useBachelorProgramDetailQuery(
  track: BachelorProgramTrack | undefined,
  programNo: number | undefined,
  initialData?: BachelorProgramItem | null,
) {
  const { i18n } = useTranslation();
  const uiLang = getUiLang(i18n);
  const cmsLocale = getCmsLocale(i18n.language);
  return useQuery({
    queryKey: [...contentKeys.bachelorPrograms.detail(track ?? "", programNo ?? -1), uiLang, cmsLocale],
    queryFn: () =>
      contentApi.bachelorPrograms.getByTrackAndNo(track as BachelorProgramTrack, programNo as number, cmsLocale),
    enabled: !!track && programNo != null && Number.isFinite(programNo),
    initialData: initialData ?? undefined,
  });
}

export function useAdminBachelorProgramsQuery(track?: BachelorProgramTrack) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [...bachelorProgramsKeys.list(track), i18n.language],
    queryFn: () => adminApi.bachelorPrograms.list(track, i18n.language),
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

  const upsertTranslation = useMutation({
    mutationFn: ({
      id,
      locale,
      payload,
    }: {
      id: string;
      locale: string;
      payload: { specialtyName: string; descriptionParagraphs: string[] };
    }) => adminApi.bachelorPrograms.upsertTranslation(id, locale, payload),
    onSuccess: invalidate,
  });

  return { create, update, remove, upsertTranslation };
}
