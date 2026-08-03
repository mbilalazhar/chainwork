"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavForRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * The floating navigation dock.
 *
 * A black pill that sits fully on-screen, inset from the left edge and
 * vertically centred. At rest it is icon-width; pointer, touch or keyboard
 * focus widens it to reveal labels. Its height is whatever its items add up
 * to, so each role's dock is a different length.
 *
 * Only the width animates. The corner radius is a constant 2.5rem, which at
 * the collapsed width of 5rem is exactly half — a perfect pill — so it can grow
 * into the expanded shape without the radius shifting underneath it. Labels
 * are always mounted and simply clipped by the pill's `overflow-hidden`, so
 * they slide out of the growing edge instead of popping in.
 *
 * Which items appear, and in what order, still comes from `lib/navigation.js`.
 * This component only decides how they look.
 */
export function FloatingRail({ role, badges = {} }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = getNavForRole(role);

  // main and footer render as one pill, split by a hairline.
  const groups = [nav.main, nav.footer].filter((group) => group.length > 0);

  function renderItem(item) {
    const isActive =
      pathname === item.href || pathname.startsWith(`${item.href}/`);
    const count = item.badgeKey ? badges[item.badgeKey] : 0;
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        // Collapse after navigating — on touch there is no pointer-leave.
        onClick={() => setOpen(false)}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-12 w-full shrink-0 items-center gap-4 rounded-full px-4 transition-colors duration-200",
          isActive
            ? "bg-brand text-white"
            : "text-white/60 hover:bg-white/10 hover:text-white"
        )}
      >
        <span className="relative grid size-6 shrink-0 place-items-center">
          <Icon className="size-6" />

          {count > 0 && !open ? (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1.5 size-2 rounded-full bg-brand-accent ring-2 ring-neutral-950"
            />
          ) : null}
        </span>

        <span
          className={cn(
            "truncate text-sm whitespace-nowrap transition-opacity duration-200 motion-reduce:transition-none",
            // Fades in only once the pill has room for it, and out immediately
            // on close so no text is caught by the closing edge.
            open ? "opacity-100 delay-150" : "opacity-0"
          )}
        >
          {item.label}
        </span>

        {count > 0 ? (
          <span
            className={cn(
              "ml-auto shrink-0 rounded-full bg-white/15 px-2 py-0.5 text-xs tabular-nums transition-opacity duration-200 motion-reduce:transition-none",
              open ? "opacity-100 delay-150" : "opacity-0"
            )}
          >
            {count}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <nav
      aria-label="Dashboard navigation"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      // Keyboard equivalent of hover: tabbing in opens it, tabbing past it
      // closes it. React's focus events bubble, unlike the DOM's.
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
      className="fixed top-1/2 left-4 z-40 -translate-y-1/2 md:left-6"
    >
      <div
        className={cn(
          // easeOutExpo — moves off quickly then settles, which reads as
          // smoother than a symmetric ease at this size.
          "flex flex-col gap-2 overflow-hidden rounded-[2.5rem] bg-neutral-950 p-3 text-white shadow-2xl shadow-black/40 ring-1 ring-white/10",
          "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "w-72" : "w-20"
        )}
      >
        {groups.map((group, index) => (
          <div key={index} className="flex w-full flex-col gap-2">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="my-3 h-px w-full bg-white/15"
              />
            ) : null}

            {group.map(renderItem)}
          </div>
        ))}
      </div>
    </nav>
  );
}
