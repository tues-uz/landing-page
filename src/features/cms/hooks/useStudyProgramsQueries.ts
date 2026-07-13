import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { contentApi } from "@/api/client";
import { adminApi } from "@/api/adminClient";
import { contentKeys, studyProgramsKeys } from "@/api/queryKeys";
import type { StudyProgram, StudyProgramAdminItem } from "@/types/studyPrograms";

export function useStudyProgramsQuery() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [...contentKeys.studyPrograms.list(), i18n.language],
    queryFn: () => contentApi.studyPrograms.list(i18n.language),
  });
}

export function useStudyProgramDetailQuery(programId: string) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [...contentKeys.studyPrograms.detail(programId), i18n.language],
    queryFn: () => contentApi.studyPrograms.getById(programId, i18n.language),
    enabled: !!programId,
  });
}

export function useAdminStudyProgramsQuery() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [...studyProgramsKeys.list(), i18n.language],
    queryFn: () => adminApi.studyPrograms.list(i18n.language),
  });
}

export function useAdminStudyProgramDetailQuery(programId: string) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: [...studyProgramsKeys.detail(programId), i18n.language],
    queryFn: () => adminApi.studyPrograms.getById(programId, i18n.language),
    enabled: !!programId && programId !== "new",
  });
}

export function useStudyProgramMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: studyProgramsKeys.all });
    qc.invalidateQueries({ queryKey: contentKeys.studyPrograms.all });
  };

  const update = useMutation({
    mutationFn: ({ programId, payload }: { programId: string; payload: Partial<StudyProgramAdminItem> }) =>
      adminApi.studyPrograms.update(programId, payload),
    onSuccess: invalidate,
  });

  const create = useMutation({
    mutationFn: (payload: StudyProgramAdminItem) => adminApi.studyPrograms.create(payload),
    onSuccess: invalidate,
  });

  const upsertTranslation = useMutation({
    mutationFn: ({
      programId,
      locale,
      payload,
    }: {
      programId: string;
      locale: string;
      payload: Partial<StudyProgram>;
    }) => adminApi.studyPrograms.upsertTranslation(programId, locale, payload),
    onSuccess: invalidate,
  });

  return { create, update, upsertTranslation };
}
