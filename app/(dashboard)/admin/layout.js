import { requireRole } from "@/lib/auth/guards";
import { ROLES } from "@/lib/roles";

/**
 * Everything under `/admin` belongs to the System Admin dashboard. Guarding
 * the segment once here covers every screen inside it, present and future.
 */
export default async function AdminLayout({ children }) {
  await requireRole([ROLES.ADMIN]);

  return children;
}
