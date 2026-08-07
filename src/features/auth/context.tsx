import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, tokenStore, cacheAuthUser, readCachedAuthUser, isAuthFailure } from "@/api/auth";
import type { User, LoginRequest } from "./types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const CMS_BASE = "/admin";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const skipAuth = import.meta.env.DEV && import.meta.env.VITE_CMS_SKIP_AUTH === "true";

  useEffect(() => {
    let cancelled = false;

    const finishLoading = () => {
      if (!cancelled) setIsLoading(false);
    };

    if (skipAuth) {
      setUser({ id: "dev", name: "Dev User", email: "dev@local", role: "admin", permissions: ["*"] });
      finishLoading();
      return () => {
        cancelled = true;
      };
    }

    // Safety net if the auth API hangs without rejecting.
    const safetyTimeoutId = window.setTimeout(finishLoading, 20_000);

    authApi
      .restoreSession()
      .then((res) => {
        if (cancelled) return;
        console.debug("[AuthContext] /me response:", res);
        cacheAuthUser(res);
        setUser(res as User);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.warn("[AuthContext] session restore failed:", err);

        const cached = readCachedAuthUser<User>();
        if (cached) {
          console.warn("[AuthContext] using cached user profile after restore failure");
          setUser(cached);
          return;
        }

        if (isAuthFailure(err)) {
          tokenStore.clear();
          setUser(null);
          return;
        }

        setUser(null);
      })
      .finally(() => {
        window.clearTimeout(safetyTimeoutId);
        finishLoading();
      });

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimeoutId);
    };
  }, [skipAuth]);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      if (skipAuth) {
        navigate(CMS_BASE, { replace: true });
        return;
      }
      const res = await authApi.login(credentials);
      console.debug("[AuthContext] login response:", res);
      const accessToken = res.accessToken ?? (res as { access_token?: string }).access_token;
      const refreshToken = res.refreshToken ?? (res as { refresh_token?: string }).refresh_token;
      if (!accessToken || !refreshToken) {
        throw new Error("Login response missing tokens");
      }
      tokenStore.set(accessToken);
      tokenStore.setRefresh(refreshToken);
      console.debug("[AuthContext] login user:", res.user);
      cacheAuthUser(res.user);
      setUser(res.user as User);
      navigate(CMS_BASE, { replace: true });
    },
    [navigate, skipAuth]
  );

  const logout = useCallback(async () => {
    const refreshToken = tokenStore.getRefresh();
    if (refreshToken) await authApi.logout(refreshToken).catch(() => {});
    tokenStore.clear();
    setUser(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
