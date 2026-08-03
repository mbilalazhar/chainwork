"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DEV_ROLE_COOKIE } from "@/lib/auth/session";
import { isRole } from "@/lib/roles";

/**
 * Development-only: swap the stub user's role so every dashboard can be
 * opened without a login backend. Delete this file (and the switcher in the
 * navbar) once real sessions exist.
 */
export async function setDevRole(formData) {
  const role = formData.get("role");

  if (!isRole(role)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(DEV_ROLE_COOKIE, role, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  // The current route may not exist for the new role, so always land on the
  // dashboard, which every role has.
  redirect("/dashboard");
}
