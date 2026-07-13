/**
 * TanStack Query key factories for the landing page.
 */
export const contentKeys = {
    all: ["content"] as const,
    heroSlides: () => ["content", "hero-slides"] as const,
    heroBackground: () => ["content", "hero-background"] as const,
    news: {
        all: ["content", "news"] as const,
        list: () => ["content", "news", "list"] as const,
        detail: (slug: string) => ["content", "news", "detail", slug] as const,
    },
    events: {
        all: ["content", "events"] as const,
        list: () => ["content", "events", "list"] as const,
    },
    programs: {
        list: () => ["content", "programs", "list"] as const,
        detail: (slug: string) => ["content", "programs", "detail", slug] as const,
    },
    studyPrograms: {
        all: ["content", "study-programs"] as const,
        list: () => ["content", "study-programs", "list"] as const,
        detail: (programId: string) => ["content", "study-programs", "detail", programId] as const,
    },
} as const;

/** CMS admin query keys (for features that use adminApi). */
export const authKeys = { all: ["auth"] as const, me: () => ["auth", "me"] as const };
export const heroKeys = { all: ["hero-slides"] as const, list: () => ["hero-slides", "list"] as const, background: () => ["hero-background"] as const };
export const newsKeys = { all: ["news"] as const, list: () => ["news", "list"] as const, detail: (slug: string) => ["news", "detail", slug] as const };
export const eventsKeys = { all: ["events"] as const, list: () => ["events", "list"] as const };
export const programsKeys = {
    all: ["programs"] as const,
    list: () => ["programs", "list"] as const,
    detail: (slug: string) => ["programs", "detail", slug] as const,
};
export const studyProgramsKeys = {
    all: ["study-programs"] as const,
    list: () => ["study-programs", "list"] as const,
    detail: (programId: string) => ["study-programs", "detail", programId] as const,
};
