import { cache } from "react";
import { cookies } from "next/headers";

import { ROLES, isRole } from "@/lib/roles";

/**
 * The single seam between ChainWork and whatever authenticates its users.
 *
 * Nothing else in the app reads cookies or decides who the user is: layouts,
 * guards and the navbar all call `getCurrentUser()`. When a real session
 * backend lands, only the body of this function changes — read the session
 * cookie, verify it, load the user — and every caller keeps working.
 *
 * Until then it resolves a stub user from a plain, unsigned dev cookie so all
 * four dashboards can be opened while building. This is obviously not
 * authentication: anyone can set the cookie. It stays dev-only.
 */

export const DEV_ROLE_COOKIE = "chainwork_role";

const DEV_USERS = {
  [ROLES.EMPLOYEE]: {
    id: "usr_employee",
    name: "Ayesha Khan",
    email: "ayesha.khan@chainwork.dev",
    role: ROLES.EMPLOYEE,
    jobTitle: "Software Engineer",
    walletAddress: "0x8f2a…41c7",
  },
  [ROLES.MANAGER]: {
    id: "usr_manager",
    name: "Daniel Rivera",
    email: "daniel.rivera@chainwork.dev",
    role: ROLES.MANAGER,
    jobTitle: "Engineering Manager",
    walletAddress: "0x4b91…0d3e",
  },
  [ROLES.HR]: {
    id: "usr_hr",
    name: "Fatima Noor",
    email: "fatima.noor@chainwork.dev",
    role: ROLES.HR,
    jobTitle: "HR Administrator",
    walletAddress: "0xc17d…9a52",
  },
  [ROLES.ADMIN]: {
    id: "usr_admin",
    name: "Omar Siddiqui",
    email: "omar.siddiqui@chainwork.dev",
    role: ROLES.ADMIN,
    jobTitle: "System Administrator",
    walletAddress: "0x2e60…b8f4",
  },
};

/**
 * `cache` dedupes this across one render pass — the layout, the guard on the
 * page and the navbar each call it, but the cookie is only read once.
 */
export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get(DEV_ROLE_COOKIE)?.value;

  return DEV_USERS[isRole(role) ? role : ROLES.EMPLOYEE];
});
