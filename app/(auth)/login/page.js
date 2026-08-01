import Image from "next/image";

import blockchain from "@/assets/blockchain.png";
import { ChainWorkLogo } from "@/components/chainwork-logo";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Sign in · ChainWork",
  description: "Sign in to your ChainWork account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Capped and centred: the panel is flex-1, so without a ceiling it eats
          every extra pixel on wide monitors and dwarfs the form. */}
      <div className="mx-auto flex w-full max-w-[85rem] flex-1 flex-col lg:flex-row">
        {/* Brand panel — inset from the viewport on every side, hidden below lg. */}
        <aside className="relative hidden flex-1 overflow-hidden rounded-3xl bg-panel lg:block">
          {/* Oversized past the panel and clipped by its overflow-hidden, which
              keeps the artwork large while its dead margins fall outside the
              panel entirely. max-w-none is mandatory here — Tailwind preflight
              sets `img { max-width: 100% }`, which silently clamps any width
              above 100% back to the panel's width. */}
          <Image
            src={blockchain}
            alt=""
            priority
            sizes="(min-width: 1024px) 40vw, 0px"
            style={{
              // Fades the top edge into the panel. The artwork sits in the
              // lower ~40% of the source with almost no margin beneath it, so
              // it stays flush with the panel's bottom (nothing to seam
              // against) and is raised by scaling up instead — a taller image
              // pushes the illustration further from the bottom edge.
              maskImage:
                "radial-gradient(46% 42% at 50% 78%, #000 65%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(46% 42% at 50% 78%, #000 65%, transparent 100%)",
            }}
            className="absolute bottom-0 left-1/2 h-auto w-[160%] max-w-none -translate-x-1/2 brightness-125 contrast-105 saturate-110"
          />
          {/* Top-down scrim only: the heading sits in the artwork's empty upper
              region, so darkening the top keeps text legible while leaving the
              illustration itself unveiled. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-panel/85 via-panel/20 to-transparent"
          />

          <div className="relative flex h-full flex-col p-8 xl:p-14">
            <ChainWorkLogo className="text-white" />
            <div aria-hidden="true" className="mt-6 h-px w-44 bg-white/15" />

            <h1 className="mt-10 max-w-md text-3xl font-bold leading-[1.15] tracking-tight text-white xl:text-5xl">
              Smart Workflows.
              <br />
              <span className="text-brand-accent">Trusted Results.</span>
            </h1>
          </div>
        </aside>

        {/* Form panel. Fixed width at lg+ so the card fills it exactly — that
            makes the negative margin the literal overlap distance onto the
            panel. With a fractional track the card would be centered in it and
            drift away from the panel edge as the viewport widens. */}
        {/* flex-1 lets items-center actually centre the card in the stacked
            layout; at lg the fixed width takes over instead. */}
        <main className="relative z-10 flex flex-1 items-center justify-center lg:-ml-10 lg:w-xl lg:flex-none lg:shrink-0 xl:-ml-14 xl:w-2xl">
          <div className="mx-auto w-full max-w-xl lg:max-w-none">
            <ChainWorkLogo className="mb-8 justify-center text-slate-900 lg:hidden" />

            <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-2xl shadow-slate-900/10 sm:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-[0.95rem] text-slate-500">
                  Sign in to your ChainWork account
                </p>
              </div>

              <LoginForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
