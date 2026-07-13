/**
 * Admin API client for CMS (hero, news, events, articles, media).
 * Base: /api → proxied to /api/v1. Admin paths: /admin/...
 * Add auth (e.g. Bearer token) when your backend requires it.
 */

import type {
  HeroSlide,
  HeroBackground,
  NewsItem,
  EventItem,
  NewsSection,
  ProgramItem,
} from "./client";
import type { StudyProgram, StudyProgramAdminItem, StudyProgramFaculty } from "@/types/studyPrograms";
import { FALLBACK_STUDY_PROGRAMS_CURRICULUM, getStudyProgramById } from "@/data/studyProgramsCurriculum";
import type { TiptapDocJSON } from "@/types/article";
import { tokenStore } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export interface ApplicationItem {
  id: string;
  fullName: string;
  citizenship: string;
  phone: string;
  passport: string;
  jshshir: string;
  studyType: string;
  courseId: string;
  status: "new" | "contacted" | "rejected" | "enrolled";
  submittedIp?: string | null;
  createdAt: string;
  updatedAt: string;
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    let message = text || res.statusText;
    try {
      const errJson = JSON.parse(text);
      if (errJson?.message) message = errJson.message;
      else if (errJson?.error) message = errJson.error;
      else if (typeof errJson?.detail === "string") message = errJson.detail;
    } catch {
      // keep raw text
    }
    throw new Error(`Admin API ${res.status}: ${message}`);
  }
  const json = await res.json();
  if (json && typeof json === "object" && "data" in json) return json.data as T;
  return json as T;
}

/** Backend returns mediaType "VIDEO" | "IMAGE"; we use "video" | "image" in the app. */
function normalizeHeroBackground(raw: { mediaType?: string; videoUrl?: string | null; imageUrl?: string | null; id?: string }): HeroBackground {
  const mediaType = raw.mediaType?.toLowerCase() === "image" ? "image" : "video";
  return {
    id: raw.id,
    mediaType,
    videoUrl: raw.videoUrl ?? null,
    imageUrl: raw.imageUrl ?? null,
  };
}

function sortNewsByOrder(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const aOrder = a.sortOrder != null ? Number(a.sortOrder) : NaN;
    const bOrder = b.sortOrder != null ? Number(b.sortOrder) : NaN;
    if (Number.isNaN(aOrder) && Number.isNaN(bOrder)) return 0;
    if (Number.isNaN(aOrder)) return 1;
    if (Number.isNaN(bOrder)) return -1;
    return aOrder - bOrder;
  });
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export const adminApi = {
  heroSlides: {
    list: async (locale?: string): Promise<HeroSlide[]> => {
      const url = locale ? `${API_BASE}/content/hero-slides?locale=${locale}` : `${API_BASE}/content/hero-slides`;
      const data = await fetch(url).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      return unwrapped?.slides ?? [];
    },
    create: async (payload: Omit<HeroSlide, "id">): Promise<HeroSlide> => {
      const res = await fetch(`${API_BASE}/content/hero-slides`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<HeroSlide>(res);
    },
    update: async (id: string, payload: Partial<HeroSlide>): Promise<HeroSlide> => {
      const res = await fetch(`${API_BASE}/content/hero-slides/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<HeroSlide>(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/content/hero-slides/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleResponse<unknown>(res);
    },
    upsertTranslation: async (id: string, locale: string, payload: Partial<HeroSlide>): Promise<HeroSlide> => {
      const res = await fetch(`${API_BASE}/content/hero-slides/${id}/translations/${locale}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<HeroSlide>(res);
    },
  },
  heroBackground: {
    get: async (): Promise<HeroBackground | null> => {
      const data = await fetch(`${API_BASE}/content/hero-background`).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      const raw = unwrapped?.background ?? null;
      return raw ? normalizeHeroBackground(raw) : null;
    },
    update: async (payload: HeroBackground): Promise<HeroBackground> => {
      const body = {
        ...payload,
        mediaType: payload.mediaType === "image" ? "IMAGE" : "VIDEO",
      };
      const res = await fetch(`${API_BASE}/content/hero-background`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });
      const result = await handleResponse<HeroBackground & { mediaType?: string }>(res);
      return result ? normalizeHeroBackground(result) : result;
    },
  },
  news: {
    list: async (locale?: string): Promise<NewsItem[]> => {
      const url = locale ? `${API_BASE}/content/news?locale=${locale}` : `${API_BASE}/content/news`;
      const data = await fetch(url).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      const news = unwrapped?.news ?? [];
      return sortNewsByOrder(news);
    },
    getBySlug: async (slug: string, locale?: string): Promise<NewsItem | null> => {
      try {
        const url = locale ? `${API_BASE}/content/news/${slug}?locale=${locale}` : `${API_BASE}/content/news/${slug}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const unwrapped = data?.data ?? data;
        return unwrapped?.news ?? null;
      } catch {
        return null;
      }
    },
    create: async (payload: Omit<NewsItem, "id">): Promise<NewsItem> => {
      const res = await fetch(`${API_BASE}/content/news`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<NewsItem>(res);
    },
    update: async (id: string, payload: Partial<NewsItem>): Promise<NewsItem> => {
      const res = await fetch(`${API_BASE}/content/news/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<NewsItem>(res);
    },
    reorder: async (highlightIds: string[]): Promise<void> => {
      const res = await fetch(`${API_BASE}/content/news/reorder`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ highlightIds }),
      });
      await handleResponse<unknown>(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/content/news/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleResponse<unknown>(res);
    },
    upsertTranslation: async (id: string, locale: string, payload: Partial<NewsItem>): Promise<NewsItem> => {
      const res = await fetch(`${API_BASE}/content/news/${id}/translations/${locale}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<NewsItem>(res);
    },
  },
  /** Article drafts (Medium-style block editor). Body = Tiptap JSON. Implement backend to match. */
  articles: {
    saveDraft: async (payload: {
      id?: string;
      title: string;
      slug: string;
      description: string;
      body: TiptapDocJSON;
      status?: "draft" | "published";
    }): Promise<{ id: string }> => {
      const url = payload.id
        ? `${API_BASE}/content/articles/${payload.id}`
        : `${API_BASE}/content/articles`;
      const res = await fetch(url, {
        method: payload.id ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: payload.title,
          slug: payload.slug,
          description: payload.description,
          body: payload.body,
          status: payload.status ?? "draft",
        }),
      });
      return handleResponse<{ id: string }>(res);
    },
  },
  /**
   * Media upload using presigned URLs (GET /upload/presign then PUT to uploadUrl).
   * Matches staging API: https://landing-staging.kubeletto.app (upload-controller).
   */
  media: {
    /** Get a presigned upload URL; contentType required, expiryMinutes optional. */
    presign: async (
      contentType: string,
      expiryMinutes?: number
    ): Promise<{ uploadUrl: string; objectKey: string; publicUrl: string }> => {
      const params = new URLSearchParams({ contentType });
      if (expiryMinutes != null && expiryMinutes > 0) params.set("expiryMinutes", String(expiryMinutes));
      const res = await fetch(`${API_BASE}/upload/presign?${params}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      return handleResponse<{ uploadUrl: string; objectKey: string; publicUrl: string }>(res);
    },
    /** Upload file via presign: get presigned URL, PUT file, return public URL. */
    upload: async (file: File): Promise<{ id: string; url: string }> => {
      const contentType = file.type || "application/octet-stream";
      const { uploadUrl, objectKey, publicUrl } = await adminApi.media.presign(contentType);
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: file,
      });
      if (!putRes.ok) {
        const text = await putRes.text();
        throw new Error(`Upload PUT ${putRes.status}: ${text || putRes.statusText}`);
      }
      return { id: objectKey, url: publicUrl };
    },
  },
  programs: {
    list: async (locale?: string): Promise<ProgramItem[]> => {
      const url = locale ? `${API_BASE}/content/programs?locale=${locale}` : `${API_BASE}/content/programs`;
      const data = await fetch(url).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      return unwrapped?.programs ?? [];
    },
    getBySlug: async (slug: string, locale?: string): Promise<ProgramItem | null> => {
      try {
        const url = locale ? `${API_BASE}/content/programs/${slug}?locale=${locale}` : `${API_BASE}/content/programs/${slug}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const unwrapped = data?.data ?? data;
        return unwrapped?.program ?? null;
      } catch {
        return null;
      }
    },
    create: async (payload: Omit<ProgramItem, "id">): Promise<ProgramItem> => {
      const res = await fetch(`${API_BASE}/content/programs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<ProgramItem>(res);
    },
    update: async (id: string, payload: Partial<ProgramItem>): Promise<ProgramItem> => {
      const res = await fetch(`${API_BASE}/content/programs/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<ProgramItem>(res);
    },
    delete: async (slug: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/content/programs/${slug}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleResponse<unknown>(res);
    },
    upsertTranslation: async (id: string, locale: string, payload: Partial<ProgramItem>): Promise<ProgramItem> => {
      const res = await fetch(`${API_BASE}/content/programs/${id}/translations/${locale}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<ProgramItem>(res);
    },
  },
  studyPrograms: {
    list: async (locale?: string): Promise<StudyProgramFaculty[]> => {
      try {
        const url = locale
          ? `${API_BASE}/content/study-programs?locale=${locale}`
          : `${API_BASE}/content/study-programs`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const unwrapped = data?.data ?? data;
        const faculties = unwrapped?.faculties ?? [];
        if (faculties.length) return faculties;
      } catch {
        // fall through to static fallback
      }
      return [...FALLBACK_STUDY_PROGRAMS_CURRICULUM];
    },
    getById: async (programId: string, locale?: string): Promise<StudyProgramAdminItem | null> => {
      if (programId === "new") return null;

      try {
        const url = locale
          ? `${API_BASE}/content/study-programs/${programId}?locale=${locale}`
          : `${API_BASE}/content/study-programs/${programId}`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          const unwrapped = data?.data ?? data;
          if (unwrapped?.program) {
            return {
              ...unwrapped.program,
              facultyId: unwrapped.faculty?.id ?? unwrapped.program.facultyId ?? "",
              updatedAt: unwrapped.program.updatedAt,
            };
          }
        }
      } catch {
        // fall through to static fallback
      }

      const fallback = getStudyProgramById(programId);
      if (fallback) {
        return { ...fallback.program, facultyId: fallback.faculty.id };
      }
      return null;
    },
    create: async (payload: StudyProgramAdminItem): Promise<StudyProgramAdminItem> => {
      const res = await fetch(`${API_BASE}/content/study-programs/programs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<StudyProgramAdminItem>(res);
    },
    update: async (programId: string, payload: Partial<StudyProgramAdminItem>): Promise<StudyProgramAdminItem> => {
      const res = await fetch(`${API_BASE}/content/study-programs/programs/${programId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<StudyProgramAdminItem>(res);
    },
    upsertTranslation: async (
      programId: string,
      locale: string,
      payload: Partial<StudyProgram>,
    ): Promise<StudyProgramAdminItem> => {
      const res = await fetch(`${API_BASE}/content/study-programs/programs/${programId}/translations/${locale}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<StudyProgramAdminItem>(res);
    },
  },
  applications: {
    list: async (status?: string): Promise<ApplicationItem[]> => {
      const url = status
        ? `${API_BASE}/applications?status=${status}`
        : `${API_BASE}/applications`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      const data = await handleResponse<{ applications: ApplicationItem[] }>(res);
      return data.applications ?? [];
    },
    updateStatus: async (id: string, status: string): Promise<ApplicationItem> => {
      const res = await fetch(`${API_BASE}/applications/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      return handleResponse<ApplicationItem>(res);
    },
  },
  events: {
    list: async (locale?: string): Promise<EventItem[]> => {
      const url = locale ? `${API_BASE}/content/events?locale=${locale}` : `${API_BASE}/content/events`;
      const data = await fetch(url).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      return unwrapped?.events ?? [];
    },
    create: async (payload: Omit<EventItem, "id">): Promise<EventItem> => {
      const res = await fetch(`${API_BASE}/content/events`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<EventItem>(res);
    },
    update: async (id: string, payload: Partial<EventItem>): Promise<EventItem> => {
      const res = await fetch(`${API_BASE}/content/events/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<EventItem>(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/content/events/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleResponse<unknown>(res);
    },
    upsertTranslation: async (id: string, locale: string, payload: Partial<EventItem>): Promise<EventItem> => {
      const res = await fetch(`${API_BASE}/content/events/${id}/translations/${locale}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<EventItem>(res);
    },
  },
};

export type { HeroSlide, HeroBackground, NewsItem, EventItem, NewsSection, ProgramItem };
