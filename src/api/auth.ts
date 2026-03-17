/**
 * Auth API for CMS (login, me, refresh, logout).
 * Base: VITE_API_BASE_URL or /api. Injects Bearer token; on 401 attempts refresh.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const TOKEN_KEY = "auth:accessToken";
const REFRESH_KEY = "auth:refreshToken";

export const tokenStore = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getRefresh: (): string | null => localStorage.getItem(REFRESH_KEY),
  setRefresh: (token: string) => localStorage.setItem(REFRESH_KEY, token),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function attemptRefresh(): Promise<string | null> {
  const refreshToken = tokenStore.getRefresh();
  if (!refreshToken) return null;
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })
    .then(async (res) => {
      if (!res.ok) {
        tokenStore.clear();
        return null;
      }
      const json = await res.json();
      const newToken: string = json?.data?.accessToken ?? json?.accessToken;
      if (newToken) tokenStore.set(newToken);
      return newToken ?? null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  return refreshPromise;
}

async function request<T>(path: string, options?: RequestInit, retry = true): Promise<T> {
  const accessToken = tokenStore.get();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && retry) {
    const newToken = await attemptRefresh();
    if (newToken) return request<T>(path, options, false);
    tokenStore.clear();
    throw new Error("Unauthorized");
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
  getPlatforms: () => request<PlatformPermissions[]>("/admin/platforms"),
};
