"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type AuthMode = "login" | "register";

interface AuthContextValue {
  isAuthModalOpen: boolean;
  authSession: number;
  authMode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authSession, setAuthSession] = useState(0);

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
    }),
    [authMode, authSession, isAuthModalOpen],
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
