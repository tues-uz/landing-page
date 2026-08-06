/**
 * Auth API for CMS (login, me, refresh, logout).
 * Base: VITE_API_BASE_URL or /api. Injects Bearer token; on 401 attempts refresh.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const REQUEST_TIMEOUT_MS = 15_000;

const TOKEN_KEY = "auth:accessToken";
const REFRESH_KEY = "auth:refreshToken";
const USER_CACHE_KEY = "auth:userCache";

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

function readAccessToken(json: unknown): string | undefined {
  if (!json || typeof json !== "object") return undefined;
  const root = json as Record<string, unknown>;
  const data = root.data && typeof root.data === "object" ? (root.data as Record<string, unknown>) : root;
  const token = data.accessToken ?? data.access_token;
  return typeof token === "string" && token.length > 0 ? token : undefined;
}

function readRefreshToken(json: unknown): string | undefined {
  if (!json || typeof json !== "object") return undefined;
  const root = json as Record<string, unknown>;
  const data = root.data && typeof root.data === "object" ? (root.data as Record<string, unknown>) : root;
  const token = data.refreshToken ?? data.refresh_token;
  return typeof token === "string" && token.length > 0 ? token : undefined;
}

function isStoredToken(value: string | null): value is string {
  return !!value && value !== "undefined" && value !== "null";
}

function isJwtExpired(token: string, skewSeconds = 30): boolean {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return false;
    const payload = JSON.parse(atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"))) as { exp?: number };
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
  } catch {
    return false;
  }
}

export const tokenStore = {
  get: (): string | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    return isStoredToken(token) ? token : null;
  },
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getRefresh: (): string | null => {
    const token = localStorage.getItem(REFRESH_KEY);
    return isStoredToken(token) ? token : null;
  },
  setRefresh: (token: string) => localStorage.setItem(REFRESH_KEY, token),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(USER_CACHE_KEY);
  },
};

export function cacheAuthUser(user: unknown) {
  try {
    sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
  } catch {
    // ignore quota / private mode
  }
}

export function readCachedAuthUser<T>(): T | null {
  try {
    const raw = sessionStorage.getItem(USER_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function isAuthFailure(err: unknown): boolean {
  return err instanceof AuthError || (err instanceof Error && err.message === "Unauthorized");
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function attemptRefresh(): Promise<string | null> {
  const refreshToken = tokenStore.getRefresh();
  if (!refreshToken) return null;
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = fetchWithTimeout(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })
    .then(async (res) => {
      if (res.status === 401 || res.status === 403) {
        tokenStore.clear();
        return null;
      }
      if (!res.ok) {
        throw new Error(`Refresh failed: ${res.status}`);
      }
      const json = await res.json();
      const newToken = readAccessToken(json);
      const newRefresh = readRefreshToken(json);
      if (newToken) tokenStore.set(newToken);
      if (newRefresh) tokenStore.setRefresh(newRefresh);
      return newToken ?? null;
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  return refreshPromise;
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function request<T>(path: string, options?: RequestInit, retry = true): Promise<T> {
  const accessToken = tokenStore.get();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetchWithTimeout(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && retry) {
    const newToken = await attemptRefresh();
    if (newToken) return request<T>(path, options, false);
    tokenStore.clear();
    throw new AuthError("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
    throw new Error(err?.error?.message ?? err?.message ?? res.statusText);
  }

  if (res.status === 204) return undefined as T;
  const json = await res.json();
  if (json && typeof json === "object" && "data" in json) return json.data as T;
  return json as T;
}

export const authApi = {
  login: (body: { email: string; password: string }) =>
    request<{ accessToken: string; refreshToken: string; user: unknown }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  me: () =>
    request<{ id: string; email: string; name: string; role: string; permissions?: string[] }>("/auth/me"),
  /** Restore session on page load: refresh expired access token, then fetch /auth/me. */
  restoreSession: async () => {
    const accessToken = tokenStore.get();
    if (!accessToken) throw new AuthError("No access token");

    if (isJwtExpired(accessToken)) {
      const refreshed = await attemptRefresh();
      if (!refreshed) throw new AuthError("Session expired");
    }

    return authApi.me();
  },
  logout: (refreshToken: string) =>
    request<{ message: string }>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),
  getToken: () => tokenStore.get(),
};

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  permissions: { id: string; platformSlug: string; platformName: string; resource: string; action: string; code?: string }[];
  isActive: boolean;
  createdAt: string;
  role?: string;
}

export interface ProvisionRequest {
  email: string;
  name: string;
  password: string;
  permissionIds: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  route: string;
  icon: string;
}

export interface PlatformPermissions {
  id: string;
  slug: string;
  name: string;
  permissions: { id: string; resource: string; action: string; code: string }[];
}

export const adminApi = {
  listUsers: () => request<AdminUser[]>("/admin/users"),
  provision: (body: ProvisionRequest) =>
    request<AdminUser>("/admin/users/provision", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updatePermissions: (id: string, permissionIds: string[]) =>
    request<AdminUser>(`/admin/users/${id}/permissions`, {
      method: "PUT",
      body: JSON.stringify({ permissionIds }),
    }),
  setStatus: (id: string, active: boolean) =>
    request<AdminUser>(`/admin/users/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ active }),
    }),
  deleteUser: (id: string) =>
    request<void>(`/admin/users/${id}`, { method: "DELETE" }),
  getPlatforms: () => request<PlatformPermissions[]>("/admin/platforms"),
  getMenu: () => request<{ items: MenuItem[] }>("/admin/menu"),
};
