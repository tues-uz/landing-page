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
} as const;
