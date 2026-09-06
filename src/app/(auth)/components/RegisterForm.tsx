"use client";

import { useAuthModal } from "@/context/auth.context";
import HypotrochoidLoader from "@/global_components/HypotrochoidLoader";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Divider } from "./AuthModal";

interface AuthSubmitButtonProps {
  isSubmitting: boolean;
  label: string;
}

export function AuthSubmitButton({
  isSubmitting,
  label,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="neo-btn w-full bg-[#FF6B6B] px-4 py-3.5 text-lg font-black uppercase text-white disabled:cursor-wait disabled:opacity-60"
    >
      {isSubmitting ? <HypotrochoidLoader /> : label}
    </button>
  );
}

export default function RegisterForm() {
  const { setAuthMode } = useAuthModal();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="w-full space-y-4">
        <div className="space-y-1">
          <label
            className="block text-sm font-bold text-black"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="johndoe"
            className="w-full border-2 border-black bg-white p-3 font-medium text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-black" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="w-full border-2 border-black bg-white p-3 font-medium text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none"
          />
        </div>

        <div className="space-y-1">
          <label
            className="block text-sm font-bold text-black"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="••••••••"
            className="w-full border-2 border-black bg-white p-3 font-medium text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none"
          />
          <div className="relative place-self-end bottom-10 right-4">
            {showPassword ? (
              <EyeOff onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <Eye onClick={() => setShowPassword(!showPassword)} />
            )}
          </div>
        </div>

        <AuthSubmitButton isSubmitting={isSubmitting} label="Sign Up" />
      </form>
      <br />
      <Divider />
      <button className="mx-5 md:mx-14" onClick={() => setAuthMode("login")}>
        Already have an account?{" "}
        <span className="text-red-500 underline cursor-pointer">
          Login
        </span>{" "}
      </button>
    </div>
  );
}
