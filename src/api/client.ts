/**
 * Public API client for the landing page.
 * No authentication — these are public read-only endpoints.
 * Base: /api  →  proxied to /api/v1 via Vite
 * Auto-unwraps the { success: true, data: { ... } } envelope.
 */

import {
    FALLBACK_STUDY_PROGRAMS_CURRICULUM,
    getStudyProgramById,
} from "@/data/studyProgramsCurriculum";
import type { StudyProgramDetailResult, StudyProgramFaculty } from "@/types/studyPrograms";

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
    /** Display type: Regular (default) or Highlight (max 5). Affects where article appears. */
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

/** Backend may return mediaType "VIDEO" | "IMAGE"; we use "video" | "image". */
function normalizeHeroBackground(raw: { mediaType?: string; videoUrl?: string | null; imageUrl?: string | null; id?: string }): HeroBackground {
    const mediaType = raw.mediaType?.toLowerCase() === "image" ? "image" : "video";
    return { id: raw.id, mediaType, videoUrl: raw.videoUrl ?? null, imageUrl: raw.imageUrl ?? null };
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

async function getOptional<T>(path: string): Promise<T | null> {
    try {
        return await get<T>(path);
    } catch {
        return null;
    }
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
            return data.slides ?? [];
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
            const data = await getOptional<{ faculties: StudyProgramFaculty[] }>(
                `/content/study-programs?locale=${locale}`,
            );
            if (data?.faculties?.length) return data.faculties;
            return [...FALLBACK_STUDY_PROGRAMS_CURRICULUM];
        },
        getById: async (programId: string, locale: string = "uz"): Promise<StudyProgramDetailResult | null> => {
            const data = await getOptional<StudyProgramDetailResult>(
                `/content/study-programs/${programId}?locale=${locale}`,
            );
            if (data?.program && data?.faculty) return data;
            const fallback = getStudyProgramById(programId);
            return fallback ? { faculty: fallback.faculty, program: fallback.program } : null;
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
};
