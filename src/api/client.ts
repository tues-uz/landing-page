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
    /** Set by CMS when "Update order" is used; lower = earlier (e.g. 0 = featured). */
    sortOrder?: string;
    /** Display type: Regular (default), Featured, Pinned. Affects where article appears (e.g. list vs landing). */
    display?: string;
}

export interface EventItem {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    /** Image URL from CMS upload; optional. Backend may send imageUrl, image, or image_url. */
    imageUrl?: string | null;
    image?: string | null;
    image_url?: string | null;
}

/** Resolve event image to a full URL; use placeholder if missing or invalid. */
export function getEventImageUrl(event: EventItem, placeholder: string): string {
  const raw = (event.imageUrl ?? event.image ?? event.image_url)?.trim();
  if (!raw) return placeholder;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const base =
    typeof import.meta.env.VITE_API_BASE_URL === "string" &&
    import.meta.env.VITE_API_BASE_URL.startsWith("http")
      ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "")
      : (typeof window !== "undefined" ? window.location.origin : "");
  return base + (raw.startsWith("/") ? raw : "/" + raw);
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
            const data = await get<{ news: NewsItem[] }>("/content/news");
            const raw = data.news ?? [];
            // Sort by CMS order (sortOrder from "Update order"); items without sortOrder go last
            return [...raw].sort((a, b) => {
                const aOrder = a.sortOrder != null ? Number(a.sortOrder) : NaN;
                const bOrder = b.sortOrder != null ? Number(b.sortOrder) : NaN;
                if (Number.isNaN(aOrder) && Number.isNaN(bOrder)) return 0;
                if (Number.isNaN(aOrder)) return 1;
                if (Number.isNaN(bOrder)) return -1;
                return aOrder - bOrder;
            });
        },
        getBySlug: async (slug: string): Promise<NewsItem> => {
            const data = await get<{ news: NewsItem }>(`/content/news/${slug}`);
            return data.news;
        },
    },
    events: {
        list: async (): Promise<EventItem[]> => {
            const data = await get<{ events: EventItem[] }>("/content/events");
            return data.events ?? [];
        },
    },
};
