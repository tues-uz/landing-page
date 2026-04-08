import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import { FALLBACK_EVENTS, FALLBACK_NEWS } from "@/data/fallbackContent";

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
        queryKey: [...contentKeys.programs.list(), i18n.language],
        queryFn: () => contentApi.programs.list(i18n.language),
        enabled,
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    ],
  });

  const isPending = queries.some((q) => q.isPending);
  const newsData = queries[0].data;
  const eventsData = queries[1].data;
  const programsData = queries[2].data;

  const newsItems = useMemo(
    () => (newsData && newsData.length > 0 ? newsData : FALLBACK_NEWS),
    [newsData],
  );
  const eventItems = useMemo(
    () => (eventsData && eventsData.length > 0 ? eventsData : FALLBACK_EVENTS),
    [eventsData],
  );
  const programItems = useMemo(() => programsData ?? [], [programsData]);

  return { isPending, newsItems, eventItems, programItems };
}
