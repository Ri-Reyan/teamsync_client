"use client";

import { api } from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

type AuthMode = "login" | "register";

export interface User {
  id: string;
  name?: string;
  email: string;
  role?: "ADMIN" | "USER";
  platformRole?: "ADMIN" | "USER";
  package: "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
}

interface AuthContextValue {
  isAuthModalOpen: boolean;
  authSession: number;
  authMode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCurrentUser: () => Promise<void>; // 👈 নতুন যোগ করা হয়েছে
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isAdmin(user: User | null) {
  return user?.platformRole === "ADMIN" || user?.role === "ADMIN";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authSession, setAuthSession] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // /auth/me কল করার ফাংশনটি আলাদাভাবে হ্যান্ডেল করা হলো
  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      if (res.data && res.data.success) {
        setUser(res.data.data || res.data.user || null);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Role অনুযায়ী Redirect Logics
  useEffect(() => {
    if (loading || !isAuthenticated) return;

    const admin = isAdmin(user);

    if (admin && pathname.startsWith("/dashboard")) {
      router.replace("/admin/dashboard");
      return;
    }

    if (!admin && pathname.startsWith("/admin")) {
      router.replace("/dashboard");
      return;
    }
  }, [loading, isAuthenticated, user, pathname, router]);

  const value = useMemo(
    () => ({
      isAuthModalOpen,
      authSession,
      authMode,
      openAuthModal: (mode: AuthMode = "login") => {
        setAuthMode(mode);
        setAuthSession((session) => session + 1);
        setIsAuthModalOpen(true);
      },
      closeAuthModal: () => setIsAuthModalOpen(false),
      setAuthMode,
      user,
      setUser,
      loading,
      setLoading,
      isAuthenticated,
      setIsAuthenticated,
      fetchCurrentUser, // 👈 Context Provider-এ পাস করা হলো
    }),
    [
      authMode,
      authSession,
      isAuthModalOpen,
      user,
      loading,
      isAuthenticated,
      fetchCurrentUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthModal(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthProvider");
  }
  return context;
}
