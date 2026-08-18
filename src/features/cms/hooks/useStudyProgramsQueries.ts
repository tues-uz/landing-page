import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { contentApi } from "@/api/client";
import { adminApi } from "@/api/adminClient";
import { contentKeys, studyProgramsKeys } from "@/api/queryKeys";
import { getCmsLocale, getUiLang } from "@/lib/localeContent";
import { localizeStudyProgramDetail, localizeStudyProgramFaculties } from "@/lib/localizeStudyPrograms";
import type { StudyProgram, StudyProgramAdminItem } from "@/types/studyPrograms";

export function useStudyProgramsQuery() {
  const { i18n } = useTranslation();
  const uiLang = getUiLang(i18n);
  const cmsLocale = getCmsLocale(i18n.language);
  return useQuery({
    queryKey: [...contentKeys.studyPrograms.list(), uiLang, cmsLocale],
    queryFn: () => contentApi.studyPrograms.list(cmsLocale),
  });
}

/** Public study programs with faculty/program titles localized for the active UI language. */
export function useLocalizedStudyProgramsQuery() {
  const { t } = useTranslation("home");
  const { t: th } = useTranslation("header");
  const { t: tCurr } = useTranslation("studyProgramCurriculum");
  const query = useStudyProgramsQuery();
  const data = useMemo(
    () => (query.data ? localizeStudyProgramFaculties(query.data, th, t, tCurr) : undefined),
    [query.data, th, t, tCurr],
  );
  return { ...query, data };
}

export function useStudyProgramDetailQuery(programId: string) {
  const { i18n } = useTranslation();
  const uiLang = getUiLang(i18n);
  const cmsLocale = getCmsLocale(i18n.language);
  return useQuery({
    queryKey: [...contentKeys.studyPrograms.detail(programId), uiLang, cmsLocale],
    queryFn: () => contentApi.studyPrograms.getById(programId, cmsLocale),
    enabled: !!programId,
  });
}

/** Program detail with faculty, curriculum, and metadata localized for the active UI language. */
export function useLocalizedStudyProgramDetailQuery(programId: string) {
  const { t: thome } = useTranslation("home");
  const { t: th } = useTranslation("header");
  const { t: tCurr } = useTranslation("studyProgramCurriculum");
  const query = useStudyProgramDetailQuery(programId);
  const data = useMemo(
    () => (query.data ? localizeStudyProgramDetail(query.data, th, thome, tCurr) : undefined),
    [query.data, th, thome, tCurr],
  );
  return { ...query, data };
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
