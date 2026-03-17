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
} from "./client";
import type { TiptapDocJSON } from "@/types/article";
import { tokenStore } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const token = tokenStore.get();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin API ${res.status}: ${text || res.statusText}`);
  }
  const json = await res.json();
  if (json && typeof json === "object" && "data" in json) return json.data as T;
  return json as T;
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export const adminApi = {
  heroSlides: {
    list: async (): Promise<HeroSlide[]> => {
      const data = await fetch(`${API_BASE}/content/hero-slides`).then((r) => r.json());
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
  },
  heroBackground: {
    get: async (): Promise<HeroBackground | null> => {
      const data = await fetch(`${API_BASE}/content/hero-background`).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      return unwrapped?.background ?? null;
    },
    update: async (payload: HeroBackground): Promise<HeroBackground> => {
      const res = await fetch(`${API_BASE}/content/hero-background`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      return handleResponse<HeroBackground>(res);
    },
  },
  news: {
    list: async (): Promise<NewsItem[]> => {
      const data = await fetch(`${API_BASE}/content/news`).then((r) => r.json());
      const unwrapped = data?.data ?? data;
      return unwrapped?.news ?? [];
    },
    getBySlug: async (slug: string): Promise<NewsItem | null> => {
      try {
        const res = await fetch(`${API_BASE}/content/news/${slug}`);
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
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/content/news/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleResponse<unknown>(res);
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
  /** Media upload for article images. Implement backend to store file and return URL. */
  media: {
    upload: async (file: File): Promise<{ id: string; url: string }> => {
      const form = new FormData();
      form.append("file", file);
      const headers: HeadersInit = {};
      const auth = getAuthHeaders();
      if (auth && "Authorization" in auth) headers.Authorization = auth.Authorization as string;
      const res = await fetch(`${API_BASE}/content/media`, {
        method: "POST",
        headers,
        body: form,
      });
      return handleResponse<{ id: string; url: string }>(res);
    },
  },
  events: {
    list: async (): Promise<EventItem[]> => {
      const data = await fetch(`${API_BASE}/content/events`).then((r) => r.json());
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
  },
};

export type { HeroSlide, HeroBackground, NewsItem, EventItem, NewsSection };
