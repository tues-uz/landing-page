/**
 * Public API client for the landing page.
 * No authentication — these are public read-only endpoints.
 * Base: /api  →  proxied to /api/v1 via Vite
 * Auto-unwraps the { success: true, data: { ... } } envelope.
 */

import type { StudyProgramDetailResult, StudyProgramFaculty } from "@/types/studyPrograms";
import type { BachelorProgramItem, BachelorProgramTrack } from "@/types/bachelorPrograms";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export interface CaptchaChallenge {
    code: string;
    token: string;
}

export interface ApplicationSubmitPayload {
    fullName: string;
    citizenship: string;
    phone: string;
    passport: string;
    jshshir: string;
    studyType: string;
    courseId: string;
    verifyToken: string;
    verifyAnswer: string;
}

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
    /** First image; kept for APIs that only store one URL. */
    imageUrl?: string | null;
    /** Ordered background slides when mediaType is "image". */
    imageUrls?: string[] | null;
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
    /** Display type: Regular (default) or Highlight (max 5). Affects where article appears. */
    display?: string;
}

export interface EventItem {
    id: string;
    title: string;
    description?: string | null;
    date: string;
    time: string;
    location: string;
    /** Image URL from CMS upload; optional. Backend may send imageUrl, image, or image_url. */
    imageUrl?: string | null;
    image?: string | null;
    image_url?: string | null;
}

export interface ProgramItem {
    id: string;
    slug: string;
    iconName: string;
    title: string;
    count: string;
    description: string;
    longDescription: string;
    highlights: string[];
    introduction: string;
    careerOutcomes: string;
    degreeType: string;
    duration: string;
    languages: string;
    pace: string;
    studyFormat: string;
    applicationDeadline: string;
    startDate: string;
    tuition: string;
    heroImageUrl: string;
    brochurePdfUrl: string;
    admissionsPdfUrl: string;
    curriculumPdfUrl: string;
    sortOrder?: number;
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

import { normalizeHeroBackground } from "@/lib/heroBackgroundUtils";

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

async function post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(json?.message || `API error ${res.status}: ${res.statusText}`);
    }
    if (json && typeof json === "object" && "data" in json) {
        return json.data as T;
    }
    return json as T;
}

// ─── Public content API ───────────────────────────────────────────────────────

export const contentApi = {
    heroSlides: {
        list: async (locale: string = "uz"): Promise<HeroSlide[]> => {
            const data = await get<{ slides: HeroSlide[] }>(`/content/hero-slides?locale=${locale}`);
            return data?.slides ?? (Array.isArray(data) ? data : []);
        },
    },
    heroBackground: {
        get: async (): Promise<HeroBackground | null> => {
            const data = await get<{ background: HeroBackground | null }>("/content/hero-background");
            const raw = data.background ?? null;
            return raw ? normalizeHeroBackground(raw) : null;
        },
    },
    news: {
        list: async (locale: string = "uz"): Promise<NewsItem[]> => {
            const data = await get<{ news: NewsItem[] }>(`/content/news?locale=${locale}`);
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
        getBySlug: async (slug: string, locale: string = "uz"): Promise<NewsItem> => {
            const data = await get<{ news: NewsItem }>(`/content/news/${slug}?locale=${locale}`);
            return data.news;
        },
    },
    events: {
        list: async (locale: string = "uz"): Promise<EventItem[]> => {
            const data = await get<{ events: EventItem[] }>(`/content/events?locale=${locale}`);
            return data.events ?? [];
        },
    },
    programs: {
        list: async (locale: string = "uz"): Promise<ProgramItem[]> => {
            const data = await get<{ programs: ProgramItem[] }>(`/content/programs?locale=${locale}`);
            return data.programs ?? [];
        },
        getBySlug: async (slug: string, locale: string = "uz"): Promise<ProgramItem> => {
            const data = await get<{ program: ProgramItem }>(`/content/programs/${slug}?locale=${locale}`);
            return data.program;
        },
    },
    studyPrograms: {
        list: async (locale: string = "uz"): Promise<StudyProgramFaculty[]> => {
            const data = await get<{ faculties: StudyProgramFaculty[] }>(
                `/content/study-programs?locale=${locale}`,
            );
            return data.faculties ?? [];
        },
        getById: async (programId: string, locale: string = "uz"): Promise<StudyProgramDetailResult | null> => {
            const data = await get<StudyProgramDetailResult>(
                `/content/study-programs/${programId}?locale=${locale}`,
            );
            return data?.program && data?.faculty ? data : null;
        },
    },
    bachelorPrograms: {
        list: async (track?: BachelorProgramTrack): Promise<BachelorProgramItem[]> => {
            const url = track ? `/content/bachelor-programs?track=${track}` : `/content/bachelor-programs`;
            const data = await get<{ bachelorPrograms: BachelorProgramItem[] }>(url);
            return data.bachelorPrograms ?? [];
        },
        getByTrackAndNo: async (track: BachelorProgramTrack, programNo: number): Promise<BachelorProgramItem | null> => {
            const data = await get<{ bachelorProgram: BachelorProgramItem }>(
                `/content/bachelor-programs/${track}/${programNo}`,
            );
            return data?.bachelorProgram ?? null;
        },
    },
    applications: {
        getCaptcha: async (): Promise<CaptchaChallenge> => {
            return get<CaptchaChallenge>("/applications/captcha");
        },
        submit: async (payload: ApplicationSubmitPayload): Promise<{ id: string }> => {
            return post<{ id: string }>("/applications", payload);
        },
    },
    newsletter: {
        subscribe: async (email: string): Promise<{ id: string; email: string; status: string }> => {
            return post<{ id: string; email: string; status: string }>("/newsletter/subscribe", { email });
        },
    },
    scientificArticles: {
        list: async (locale: string = "uz") => {
            const data = await get<{ articles: Record<string, unknown>[] }>(`/content/scientific-articles?locale=${locale}`);
            return data.articles ?? [];
        },
    },
    scienceCertificates: {
        list: async (locale: string = "uz") => {
            const data = await get<{ certificates: Record<string, unknown>[] }>(`/content/science-certificates?locale=${locale}`);
            return data.certificates ?? [];
        },
    },
    tuitionRates: {
        list: async () => {
            const data = await get<{ rows: Record<string, unknown>[] }>(`/content/tuition-rates`);
            return data.rows ?? [];
        },
    },
    famousGraduates: {
        list: async (locale: string = "uz") => {
            const data = await get<{ graduates: Record<string, unknown>[] }>(`/content/famous-graduates?locale=${locale}`);
            return data.graduates ?? [];
        },
    },
    faculties: {
        list: async (locale: string = "uz") => {
            const data = await get<{ faculties: Record<string, unknown>[] }>(`/content/faculties?locale=${locale}`);
            return data.faculties ?? [];
        },
    },
    departments: {
        list: async (locale: string = "uz") => {
            const data = await get<{ departments: Record<string, unknown>[] }>(`/content/departments?locale=${locale}`);
            return data.departments ?? [];
        },
    },
};
