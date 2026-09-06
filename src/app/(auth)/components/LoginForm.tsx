"use client";

import { useAuthModal } from "@/context/auth.context";
import { Divider } from "./AuthModal";
import { AuthSubmitButton } from "./RegisterForm";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FormEvent } from "react";

export default function LoginForm() {
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
        {/* Email Field */}
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

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex flex-row justify-between">
            <label
              className="block text-sm font-bold text-black"
              htmlFor="password"
            >
              Password
            </label>
            <Link className="text-red-500 underline cursor-pointer" href={""}>
              Forget ?
            </Link>
          </div>
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

        {/* Submit Button */}
        <AuthSubmitButton isSubmitting={isSubmitting} label="SIGN IN" />
      </form>
      <br />
      <Divider />
      <button className="mx-5 md:mx-14" onClick={() => setAuthMode("register")}>
        Don&apos;t have an account?{" "}
        <span className="text-red-500 underline cursor-pointer">
          Register
        </span>{" "}
      </button>
    </div>
  );
}
