"use client";

import { api } from "@/lib/axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthMode = "login" | "register";

export interface User {
  id: string;
  email: string;
  role?: string;
  platformRole?: string;
  name?: string;
}

interface AuthContextValue {
  isAuthModalOpen: boolean;
  authSession: number;
  authMode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // 👈 টাইপ যুক্ত করা হয়েছে
  loading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authSession, setAuthSession] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
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
    };
    fetchCurrentUser();
  }, []);

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
      isAuthenticated,
      setIsAuthenticated,
    }),
    [
      authMode,
      authSession,
      isAuthModalOpen,
      user,
      loading,
      isAuthenticated,
      setIsAuthenticated,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthModal() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthModal must be used inside AuthProvider");
  }

  return context;
}
