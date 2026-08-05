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
import type { NewsletterSubscriber } from "@/data/newsletterSubscribers";
import type { TiptapDocJSON } from "@/types/article";
import { toApiDateValue, toDateInputValue } from "@/lib/newsDateUtils";
import { tokenStore } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

/** Use blob URLs locally instead of calling the media API (CMS UI demo). */
const CMS_DEMO_MEDIA =
  import.meta.env.VITE_CMS_DEMO_MEDIA === "true" ||
  import.meta.env.VITE_CMS_DEMO_MEDIA === "1";

function demoMediaUpload(file: File): { id: string; url: string; demo: true } {
  return {
    id: `demo-${Date.now()}-${file.name}`,
    url: URL.createObjectURL(file),
    demo: true,
  };
}

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

type NewsItemRaw = NewsItem & {
  publishedAt?: string;
  published_at?: string;
  createdAt?: string;
  created_at?: string;
};

/** Map API date fields to the `date` string used by the CMS form. */
function normalizeNewsItem(raw: NewsItemRaw): NewsItem {
  const dateSource =
    raw.date ?? raw.publishedAt ?? raw.published_at ?? raw.createdAt ?? raw.created_at ?? "";
  return {
    ...raw,
    date: toDateInputValue(dateSource) || toDateInputValue(raw.date) || "",
  };
}

/** Build a news write payload with a normalized publication date. */
function serializeNewsPayload(payload: Partial<NewsItem>): Record<string, unknown> {
  const { id: _id, ...rest } = payload as Partial<NewsItem> & { id?: string };
  const date = toApiDateValue(rest.date);
  return {
    ...rest,
    date,
    publishedAt: date,
  };
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
      const news = (unwrapped?.news ?? []).map((item: NewsItemRaw) => normalizeNewsItem(item));
      return sortNewsByOrder(news);
    },
    getBySlug: async (slug: string, locale?: string): Promise<NewsItem | null> => {
      try {
        const url = locale ? `${API_BASE}/content/news/${slug}?locale=${locale}` : `${API_BASE}/content/news/${slug}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const unwrapped = data?.data ?? data;
        const raw = unwrapped?.news ?? null;
        return raw ? normalizeNewsItem(raw as NewsItemRaw) : null;
      } catch {
        return null;
      }
    },
    create: async (payload: Omit<NewsItem, "id">): Promise<NewsItem> => {
      const res = await fetch(`${API_BASE}/content/news`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(serializeNewsPayload(payload)),
      });
      const created = await handleResponse<NewsItemRaw>(res);
      return normalizeNewsItem(created);
    },
    update: async (id: string, payload: Partial<NewsItem>): Promise<NewsItem> => {
      const res = await fetch(`${API_BASE}/content/news/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(serializeNewsPayload(payload)),
      });
      const updated = await handleResponse<NewsItemRaw>(res);
      return normalizeNewsItem(updated);
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
    /** Upload file via presign: get presigned URL, PUT file, return public URL. Falls back to local blob URLs when demo mode is on or the API fails. */
    upload: async (file: File): Promise<{ id: string; url: string; demo?: boolean }> => {
      if (CMS_DEMO_MEDIA) {
        return demoMediaUpload(file);
      }
      const contentType = file.type || "application/octet-stream";
      try {
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
      } catch (err) {
        console.warn("[adminApi.media.upload] API upload failed; using local demo URL.", err);
        return demoMediaUpload(file);
      }
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
      const url = locale
        ? `${API_BASE}/content/study-programs?locale=${locale}`
        : `${API_BASE}/content/study-programs`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      const data = await handleResponse<{ faculties: StudyProgramFaculty[] }>(res);
      return data.faculties ?? [];
    },
    getById: async (programId: string, locale?: string): Promise<StudyProgramAdminItem | null> => {
      if (programId === "new") return null;
      const url = locale
        ? `${API_BASE}/content/study-programs/${programId}?locale=${locale}`
        : `${API_BASE}/content/study-programs/${programId}`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      const unwrapped = await handleResponse<{ program?: StudyProgramAdminItem; faculty?: { id: string } }>(res);
      if (unwrapped?.program) {
        return {
          ...unwrapped.program,
          facultyId: unwrapped.faculty?.id ?? unwrapped.program.facultyId ?? "",
          updatedAt: unwrapped.program.updatedAt,
        };
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
  newsletter: {
    list: async (status?: string): Promise<NewsletterSubscriber[]> => {
      const url = status && status !== "all"
        ? `${API_BASE}/newsletter/subscribers?status=${status}`
        : `${API_BASE}/newsletter/subscribers`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      const data = await handleResponse<{ subscribers: NewsletterSubscriber[] }>(res);
      return data.subscribers ?? [];
    },
    updateStatus: async (id: string, status: string): Promise<NewsletterSubscriber> => {
      const res = await fetch(`${API_BASE}/newsletter/subscribers/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      return handleResponse<NewsletterSubscriber>(res);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/newsletter/subscribers/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleResponse<unknown>(res);
    },
  },
};

export type { HeroSlide, HeroBackground, NewsItem, EventItem, NewsSection, ProgramItem };
