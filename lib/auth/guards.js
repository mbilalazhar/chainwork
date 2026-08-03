import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/session";
import { canAccess } from "@/lib/navigation";

/**
 * Server-side access control.
 *
 * The sidebar decides what a role can *see*; these decide what it can
 * *reach*. Filtering a menu is not enforcement — anyone can type
 * `/admin/users` into the address bar — so every protected screen calls one of
 * these before it renders.
 */

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/** Guards a whole subtree from its `layout.js` — see `app/(dashboard)/admin`. */
export async function requireRole(roles) {
  const user = await requireUser();

  if (!roles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}

/**
 * Guards a single route using the nav config as the source of truth: if the
 * path is not in this role's menu, it is not reachable.
 */
export async function requireAccess(pathname) {
  const user = await requireUser();

  if (!canAccess(user.role, pathname)) {
    redirect("/dashboard");
  }

  return user;
}
