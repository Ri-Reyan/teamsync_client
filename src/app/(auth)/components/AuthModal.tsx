"use client";

import { LockKeyhole, X } from "lucide-react";
import { useAuthModal } from "../../../context/auth.context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function AuthModal() {
  const { isAuthModalOpen, authSession, closeAuthModal, authMode } =
    useAuthModal();

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div
        key={authSession}
        className="relative z-10 w-full max-w-md neo-border neo-shadow-lg bg-[#FFFDF5] p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute right-3 top-3 border-2 border-black bg-white p-2 transition-transform hover:-translate-y-0.5"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6 pr-10">
          <div className="mb-3 inline-flex items-center gap-2 border-2 border-black bg-[#FFD93D] px-3 py-1 text-xs font-black uppercase">
            <LockKeyhole className="size-3.5" /> Secure access
          </div>
        </div>

        {authMode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs font-black uppercase">
      <span className="h-0.5 flex-1 bg-black" /> or{" "}
      <span className="h-0.5 flex-1 bg-black" />
    </div>
  );
}
