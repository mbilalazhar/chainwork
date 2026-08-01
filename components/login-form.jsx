"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fieldClasses =
  "h-12 rounded-lg border-slate-200 text-[0.95rem] placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-brand/20";

/** lucide dropped brand marks, so the Google "G" is inline. */
function GoogleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.84C6.71 7.29 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  // No auth backend exists in this repo yet. These are the seams to wire one in.
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full gap-3 rounded-lg border-slate-200 text-[0.95rem] font-medium text-slate-700 hover:bg-slate-50"
      >
        <GoogleIcon className="size-5" />
        Sign in with Google
      </Button>

      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium tracking-wide text-slate-400">OR</span>
        <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="email" className="text-[0.95rem] font-medium text-slate-700">
            Email address
          </Label>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-[1.05rem] -translate-y-1/2 text-slate-400"
            />
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your work email"
              className={`${fieldClasses} pl-11`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Label htmlFor="password" className="text-[0.95rem] font-medium text-slate-700">
            Password
          </Label>
          <div className="relative">
            <Lock
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-[1.05rem] -translate-y-1/2 text-slate-400"
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`${fieldClasses} pl-11 pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-sm text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" className="size-[1.05rem]" />
              ) : (
                <Eye aria-hidden="true" className="size-[1.05rem]" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="group mt-1 h-12 w-full justify-center gap-2 rounded-lg bg-brand text-[0.95rem] font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
        >
          Sign in
          <ArrowRight
            aria-hidden="true"
            className="size-[1.05rem] transition-transform group-hover:translate-x-0.5"
          />
        </Button>
      </form>

      <p className="text-center">
        <a
          href="#"
          className="text-sm font-medium text-brand transition-colors hover:text-brand-hover hover:underline"
        >
          Forgot password?
        </a>
      </p>
    </div>
  );
}
