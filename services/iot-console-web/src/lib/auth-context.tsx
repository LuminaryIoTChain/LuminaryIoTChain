import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAccessToken, handleCallback, isIdpEnabled, signIn, signOut } from "./idp";

interface AuthContextValue {
  ready: boolean;
  authenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  completeCallback: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(Boolean(getAccessToken()));
    setReady(true);
  }, []);

  const login = useCallback(async () => {
    if (!isIdpEnabled()) throw new Error("IdP 未配置");
    await signIn();
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setAuthenticated(false);
  }, []);

  const completeCallback = useCallback(async () => {
    await handleCallback();
    setAuthenticated(true);
  }, []);

  const value = useMemo(
    () => ({ ready, authenticated, login, logout, completeCallback }),
    [ready, authenticated, login, logout, completeCallback],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
