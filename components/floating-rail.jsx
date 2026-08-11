"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavForRole } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * The dashboard navigation rail.
 *
 * A white full-height panel flush against the left edge, spanning the viewport
 * top to bottom and sitting above the navbar. At rest it is icon-width;
 * pointer, touch or keyboard focus widens it to reveal labels. The footer group
 * is pinned to the bottom, the main group scrolls if a role has more items than
 * the viewport can hold.
 *
 * Only the width animates. Labels are always mounted and simply clipped by the
 * panel's `overflow-hidden`, so they slide out of the growing edge instead of
 * popping in.
 *
 * The rail overlays the page rather than pushing it, so the left padding on the
 * navbar and on <main> is what keeps their content clear of its resting width.
 *
 * Which items appear, and in what order, still comes from `lib/navigation.js`.
 * This component only decides how they look.
 */
export function FloatingRail({ role, badges = {} }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = getNavForRole(role);

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
            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
        )}
      >
        <span className="relative grid size-6 shrink-0 place-items-center">
          <Icon className="size-6" />

          {count > 0 && !open ? (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1.5 size-2 rounded-full bg-brand-accent ring-2 ring-white"
            />
          ) : null}
        </span>

        <span
          className={cn(
            "truncate text-sm whitespace-nowrap transition-opacity duration-200 motion-reduce:transition-none",
            // Fades in only once the panel has room for it, and out immediately
            // on close so no text is caught by the closing edge.
            open ? "opacity-100 delay-150" : "opacity-0"
          )}
        >
          {item.label}
        </span>

        {count > 0 ? (
          <span
            className={cn(
              "ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs tabular-nums transition-opacity duration-200 motion-reduce:transition-none",
              isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600",
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
      className="fixed inset-y-0 left-0 z-50"
    >
      <div
        className={cn(
          // easeOutExpo — moves off quickly then settles, which reads as
          // smoother than a symmetric ease at this size.
          "flex h-full flex-col overflow-hidden border-r border-neutral-200 bg-white p-3",
          "transition-[width,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          // The shadow only earns its keep while the panel is overlapping the
          // page; at rest the layout has already reserved its width.
          open ? "w-72 shadow-2xl shadow-black/10" : "w-20"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto">
          {nav.main.map(renderItem)}
        </div>

        {nav.footer.length > 0 ? (
          <div className="mt-auto flex w-full shrink-0 flex-col gap-2 pt-3">
            <span aria-hidden="true" className="mb-1 h-px w-full bg-neutral-200" />

            {nav.footer.map(renderItem)}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
