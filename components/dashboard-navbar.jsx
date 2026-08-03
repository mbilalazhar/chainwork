"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, LogOut, Search } from "lucide-react";

import { ChainWorkLogo } from "@/components/chainwork-logo";
import { DevRoleSwitcher } from "@/components/dev-role-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { findNavItemByPath, getNavForRole } from "@/lib/navigation";
import { ROLE_LABELS } from "@/lib/roles";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * The shell's top bar. Unlike the sidebar it is the same for every role — only
 * its contents vary with the user: their name, their role badge, and the
 * account menu, whose entries come from the role's own footer nav (an admin
 * gets Settings where everyone else gets Profile & Wallet).
 *
 * The page title is looked up from the nav config rather than passed down by
 * each page, so a renamed menu item renames the heading too.
 */
export function DashboardNavbar({ user }) {
  const pathname = usePathname();
  const current = findNavItemByPath(user.role, pathname);
  const accountLinks = getNavForRole(user.role).footer;

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
      <Link href="/dashboard" aria-label="ChainWork home">
        <ChainWorkLogo
          markClassName="size-7"
          textClassName="hidden text-lg sm:inline"
          className="gap-2"
        />
      </Link>
      <Separator orientation="vertical" className="h-4" />
      <h1 className="truncate text-base font-semibold">
        {current?.label ?? "ChainWork"}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden lg:block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            aria-label="Search ChainWork"
            placeholder="Search…"
            className="h-9 w-64 pl-8"
          />
        </div>

        {process.env.NODE_ENV !== "production" ? (
          <DevRoleSwitcher role={user.role} />
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-md p-1 text-left hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
            }
          >
            <Avatar className="size-8">
              <AvatarImage src={user.avatarUrl} alt="" />
              <AvatarFallback className="text-xs">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-medium">{user.name}</span>
              <span className="block text-xs text-muted-foreground">
                {ROLE_LABELS[user.role]}
              </span>
            </span>
            <ChevronsUpDown
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-normal">
              <span className="block text-sm font-medium text-foreground">
                {user.name}
              </span>
              <span className="block truncate text-xs">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {accountLinks.map((item) => {
              const Icon = item.icon;

              return (
                <DropdownMenuItem
                  key={item.href}
                  render={<Link href={item.href} />}
                >
                  <Icon />
                  {item.label}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              render={<Link href="/login" />}
            >
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
