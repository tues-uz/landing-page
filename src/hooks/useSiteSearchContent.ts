import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import type { StudyProgramSearchItem } from "@/lib/siteSearch";

export function useSiteSearchContent(enabled: boolean) {
  const { i18n } = useTranslation();
  const queries = useQueries({
    queries: [
      {
        queryKey: [...contentKeys.news.list(), i18n.language],
        queryFn: () => contentApi.news.list(i18n.language),
        enabled,
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
      {
        queryKey: [...contentKeys.events.list(), i18n.language],
        queryFn: () => contentApi.events.list(i18n.language),
        enabled,
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
      {
        queryKey: [...contentKeys.studyPrograms.list(), i18n.language],
        queryFn: () => contentApi.studyPrograms.list(i18n.language),
        enabled,
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    ],
  });

  const isPending = queries.some((q) => q.isPending);
  const newsData = queries[0].data;
  const eventsData = queries[1].data;
  const facultiesData = queries[2].data;

  const newsItems = useMemo(
    () => newsData ?? [],
    [newsData],
  );
  const eventItems = useMemo(
    () => eventsData ?? [],
    [eventsData],
  );
  const studyProgramItems = useMemo((): StudyProgramSearchItem[] => {
    if (!facultiesData?.length) return [];
    return facultiesData.flatMap((faculty) =>
      faculty.programs.map((program) => ({
        id: program.id,
        title: program.title,
        code: program.code,
        degreeLevel: program.degreeLevel,
        duration: program.duration,
        qualification: program.qualification,
        facultyTitle: faculty.title,
      })),
    );
  }, [facultiesData]);

  return { isPending, newsItems, eventItems, studyProgramItems };
}
