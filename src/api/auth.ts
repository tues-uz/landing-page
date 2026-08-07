/**
 * Auth API for CMS (login, me, refresh, logout).
 * Base: VITE_API_BASE_URL or /api. Injects Bearer token; on 401 attempts refresh.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const REQUEST_TIMEOUT_MS = 15_000;

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

const ACCESS_TOKEN_KEY = "auth:accessToken";
const REFRESH_TOKEN_KEY = "auth:refreshToken";

let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

export const tokenStore = {
  get: (): string | null => {
    if (inMemoryAccessToken) return inMemoryAccessToken;
    try {
      inMemoryAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      // ignore storage access error
    }
    return inMemoryAccessToken;
  },
  set: (token: string) => {
    inMemoryAccessToken = token;
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {
      // ignore storage access error
    }
  },
  getRefresh: (): string | null => {
    if (inMemoryRefreshToken) return inMemoryRefreshToken;
    try {
      inMemoryRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      // ignore storage access error
    }
    return inMemoryRefreshToken;
  },
  setRefresh: (token: string) => {
    inMemoryRefreshToken = token;
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch {
      // ignore storage access error
    }
  },
  clear: () => {
    inMemoryAccessToken = null;
    inMemoryRefreshToken = null;
    try {
      sessionStorage.removeItem(USER_CACHE_KEY);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_CACHE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch {
      // ignore storage access error
    }
  },
};

export function cacheAuthUser(user: unknown) {
  try {
    const raw = JSON.stringify(user);
    sessionStorage.setItem(USER_CACHE_KEY, raw);
    localStorage.setItem(USER_CACHE_KEY, raw);
  } catch {
    // ignore quota / private mode
  }
}

export function readCachedAuthUser<T>(): T | null {
  try {
    const raw = sessionStorage.getItem(USER_CACHE_KEY) || localStorage.getItem(USER_CACHE_KEY);
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
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  const storedRefreshToken = tokenStore.getRefresh();
  refreshPromise = fetchWithTimeout(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storedRefreshToken ? { refreshToken: storedRefreshToken } : {}),
    credentials: "include",
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

  const res = await fetchWithTimeout(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

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
  login: async (body: { email: string; password: string }) => {
    const res = await request<{ accessToken?: string; access_token?: string; refreshToken?: string; refresh_token?: string; user: unknown }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const accessToken = readAccessToken(res) ?? res?.accessToken;
    const refreshToken = readRefreshToken(res) ?? res?.refreshToken;
    if (accessToken) {
      tokenStore.set(accessToken);
    }
    if (refreshToken) {
      tokenStore.setRefresh(refreshToken);
    }
    return res;
  },
  me: () =>
    request<{ id: string; email: string; name: string; role: string; permissions?: string[] }>("/auth/me"),
  /** Restore session on page load: refresh expired access token, then fetch /auth/me. */
  restoreSession: async () => {
    let accessToken = tokenStore.get();
    if (!accessToken || isJwtExpired(accessToken)) {
      accessToken = await attemptRefresh();
      if (!accessToken) throw new AuthError("Session expired");
    }

    return authApi.me();
  },
  logout: async (refreshToken?: string) => {
    const res = await request<{ message: string }>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken ?? "" }),
    });
    tokenStore.clear();
    return res;
  },
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

export interface PermissionItem {
  id: string;
  resource: string;
  action: string;
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
  getPermissions: () => request<PermissionItem[]>("/admin/permissions"),
  getPlatforms: async (): Promise<PlatformPermissions[]> => {
    const permissions = await request<PermissionItem[]>("/admin/permissions");
    const grouped = new Map<string, PermissionItem[]>();
    (permissions || []).forEach((p) => {
      const res = p.resource || "general";
      if (!grouped.has(res)) grouped.set(res, []);
      grouped.get(res)!.push(p);
    });
    return Array.from(grouped.entries()).map(([res, perms]) => ({
      id: res,
      slug: res,
      name: res.toUpperCase(),
      permissions: perms.map((p) => ({
        id: p.id,
        resource: p.resource,
        action: p.action,
        code: `${p.resource}:${p.action}`,
      })),
    }));
  },
  getMenu: () => request<{ items: MenuItem[] }>("/admin/menu"),
};
