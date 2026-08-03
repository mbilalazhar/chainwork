import { ROLES } from "@/lib/roles";

/**
 * Counts rendered next to sidebar items that declare a `badgeKey` in
 * `lib/navigation.js` (today: the manager's pending approvals).
 *
 * Stubbed until the data layer exists. Replace the body with real queries —
 * the shape returned here is all the sidebar knows about.
 */
export async function getSidebarBadges(user) {
  if (user.role === ROLES.MANAGER) {
    return { pendingApprovals: 4 };
  }

  return {};
}
