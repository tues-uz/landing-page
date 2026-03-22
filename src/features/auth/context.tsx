import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi, tokenStore } from "@/api/auth";
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

  const skipAuth = import.meta.env.VITE_CMS_SKIP_AUTH === "true";

  useEffect(() => {
    if (skipAuth) {
      setUser({ id: "dev", name: "Dev User", email: "dev@local", role: "admin" });
      setIsLoading(false);
      return;
    }
    const token = tokenStore.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    authApi
      .me()
      .then((res) => {
        console.debug("[AuthContext] /me response:", res);
        setUser(res as User);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message.toLowerCase() : "";
        if (message.includes("unauthorized") || message.includes("401")) tokenStore.clear();
      })
      .finally(() => setIsLoading(false));
  }, [skipAuth]);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      if (skipAuth) {
        navigate(CMS_BASE, { replace: true });
        return;
      }
      const res = await authApi.login(credentials);
      console.debug("[AuthContext] login response:", res);
      tokenStore.set(res.accessToken);
      tokenStore.setRefresh(res.refreshToken);
      console.debug("[AuthContext] login user:", res.user);
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
