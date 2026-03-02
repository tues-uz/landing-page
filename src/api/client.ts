/**
 * Public API client for the landing page.
 * No authentication — these are public read-only endpoints.
 * Base: /api  →  proxied to /api/v1 via Vite
 * Auto-unwraps the { success: true, data: { ... } } envelope.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

// ─── Types (mirroring backend schema) ────────────────────────────────────────

export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    year: string;
    linkUrl?: string | null;
    sortOrder?: string;
}

export interface HeroBackground {
    id?: string;
    mediaType: "video" | "image";
    videoUrl?: string | null;
    imageUrl?: string | null;
}

export interface NewsSection {
    heading: string;
    paragraphs: string[];
}

export interface NewsItem {
    id: string;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    author: string;
    readTime: string;
    body: NewsSection[];
}

export interface EventItem {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
}

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
    const json = await res.json();
    // Unwrap { success: true, data: ... } envelope
    if (json && typeof json === "object" && "data" in json) {
        return json.data as T;
    }
    return json as T;
}

// ─── Public content API ───────────────────────────────────────────────────────

export const contentApi = {
    heroSlides: {
        list: async (): Promise<HeroSlide[]> => {
            const data = await get<{ slides: HeroSlide[] }>("/content/hero-slides");
            return data.slides ?? [];
        },
    },
    heroBackground: {
        get: async (): Promise<HeroBackground | null> => {
            const data = await get<{ background: HeroBackground | null }>("/content/hero-background");
            return data.background ?? null;
        },
    },
    news: {
        list: async (): Promise<NewsItem[]> => {
            const data = await get<{ articles: NewsItem[] }>("/content/news");
            return data.articles ?? [];
        },
        getBySlug: async (slug: string): Promise<NewsItem> => {
            const data = await get<{ article: NewsItem }>(`/content/news/${slug}`);
            return data.article;
        },
    },
    events: {
        list: async (): Promise<EventItem[]> => {
            const data = await get<{ events: EventItem[] }>("/content/events");
            return data.events ?? [];
        },
    },
};
