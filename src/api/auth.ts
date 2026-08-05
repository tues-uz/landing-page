/**
 * Auth API for CMS (login, me, refresh, logout).
 * Base: VITE_API_BASE_URL or /api. Injects Bearer token; on 401 attempts refresh.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const REQUEST_TIMEOUT_MS = 15_000;

let inMemoryAccessToken: string | null = null;

export const tokenStore = {
  get: (): string | null => inMemoryAccessToken,
  set: (token: string) => {
    inMemoryAccessToken = token;
  },
  getRefresh: (): string | null => null,
  setRefresh: (_token: string) => {},
  clear: () => {
    inMemoryAccessToken = null;
  },
};

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function attemptRefresh(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = fetchWithTimeout(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
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
  login: async (body: { email: string; password: string }) => {
    const res = await request<{ accessToken: string; refreshToken?: string; user: unknown }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (res?.accessToken) {
      tokenStore.set(res.accessToken);
    }
    return res;
  },
  me: () =>
    request<{ id: string; email: string; name: string; role: string; permissions?: string[] }>("/auth/me"),
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
