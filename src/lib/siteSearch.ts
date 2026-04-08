import type { EventItem, NewsItem, ProgramItem } from "@/api/client";

export function filterNewsByQuery(items: NewsItem[], search: string): NewsItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q),
  );
}

export function filterEventsByQuery(items: EventItem[], search: string): EventItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return [];
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q) ||
      item.time.toLowerCase().includes(q),
  );
}

export function filterProgramsByQuery(items: ProgramItem[], search: string): ProgramItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return [];
  const hay = (s: string) => s.toLowerCase();
  return items.filter(
    (item) =>
      hay(item.title).includes(q) ||
      hay(item.description).includes(q) ||
      hay(item.longDescription).includes(q) ||
      hay(item.degreeType).includes(q) ||
      hay(item.slug).includes(q) ||
      hay(item.introduction).includes(q) ||
      hay(item.careerOutcomes).includes(q) ||
      item.highlights.some((h) => hay(h).includes(q)),
  );
}

export type StaticSearchRoute = { id: string; path: string; label: string };

export function getStaticSearchRoutes(translate: (key: string) => string): StaticSearchRoute[] {
  return [
    { id: "home", path: "/", label: translate("searchRoutes.home") },
    { id: "about", path: "/about", label: translate("searchRoutes.about") },
    { id: "research", path: "/research", label: translate("searchRoutes.research") },
    { id: "admissions", path: "/admissions", label: translate("searchRoutes.admissions") },
    { id: "programs", path: "/programs", label: translate("searchRoutes.programs") },
    { id: "news", path: "/news", label: translate("searchRoutes.news") },
    { id: "events", path: "/events", label: translate("searchRoutes.events") },
    { id: "media", path: "/media", label: translate("searchRoutes.media") },
    { id: "virtualTour", path: "/virtual-tour", label: translate("searchRoutes.virtualTour") },
  ];
}

function matchStaticRoutes(routes: StaticSearchRoute[], query: string): StaticSearchRoute[] {
  const ql = query.trim().toLowerCase();
  if (!ql) return [];
  return routes.filter((r) => {
    const pathTail = r.path.replace(/^\//, "").toLowerCase();
    return r.label.toLowerCase().includes(ql) || pathTail.includes(ql) || r.path.toLowerCase().includes(ql);
  });
}

export type SiteSearchHitKind = "page" | "program" | "event" | "news";

export type SiteSearchHit = {
  id: string;
  kind: SiteSearchHitKind;
  title: string;
  badge: string;
  subtitle: string;
  to: string;
};

export type SiteSearchKindLabels = Record<SiteSearchHitKind, string>;

export function buildSiteSearchHits(options: {
  query: string;
  news: NewsItem[];
  events: EventItem[];
  programs: ProgramItem[];
  staticRoutes: StaticSearchRoute[];
  kindLabels: SiteSearchKindLabels;
}): SiteSearchHit[] {
  const q = options.query.trim();
  if (!q) return [];

  const { kindLabels } = options;
  const hits: SiteSearchHit[] = [];

  for (const r of matchStaticRoutes(options.staticRoutes, q)) {
    hits.push({
      id: `page-${r.id}`,
      kind: "page",
      title: r.label,
      badge: kindLabels.page,
      subtitle: r.path === "/" ? "" : r.path,
      to: r.path,
    });
  }

  for (const p of filterProgramsByQuery(options.programs, q)) {
    hits.push({
      id: `program-${p.id}`,
      kind: "program",
      title: p.title,
      badge: kindLabels.program,
      subtitle: [p.degreeType, p.duration].filter(Boolean).join(" · "),
      to: `/programs/${p.slug}`,
    });
  }

  for (const e of filterEventsByQuery(options.events, q)) {
    hits.push({
      id: `event-${e.id}`,
      kind: "event",
      title: e.title,
      badge: kindLabels.event,
      subtitle: [e.date, e.location].filter(Boolean).join(" · "),
      to: `/events/${e.id}`,
    });
  }

  for (const n of filterNewsByQuery(options.news, q)) {
    hits.push({
      id: `news-${n.id}`,
      kind: "news",
      title: n.title,
      badge: kindLabels.news,
      subtitle: [n.category, n.date].filter(Boolean).join(" · "),
      to: `/news/${n.slug}`,
    });
  }

  return hits;
}
