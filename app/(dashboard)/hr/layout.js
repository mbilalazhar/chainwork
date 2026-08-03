import { requireRole } from "@/lib/auth/guards";
import { ROLES } from "@/lib/roles";

/**
 * Everything under `/hr` belongs to the HR Administrator dashboard. Guarding
 * the segment once here covers every screen inside it, present and future.
 */
export default async function HrLayout({ children }) {
  await requireRole([ROLES.HR]);

  return children;
}
