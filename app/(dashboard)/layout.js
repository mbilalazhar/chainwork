import { DashboardNavbar } from "@/components/dashboard-navbar";
import { FloatingRail } from "@/components/floating-rail";
import { requireUser } from "@/lib/auth/guards";
import { getSidebarBadges } from "@/lib/sidebar-badges";

/**
 * The shell every dashboard shares. This is the only place that resolves the
 * current user; pages below it are just content.
 *
 * The rail floats above the page rather than sitting in the layout flow, so
 * the left padding on <main> is what keeps content clear of its resting half.
 */
export default async function DashboardLayout({ children }) {
  const user = await requireUser();
  const badges = await getSidebarBadges(user);

  return (
    <div className="flex min-h-svh flex-col">
      <DashboardNavbar user={user} />
      <FloatingRail role={user.role} badges={badges} />

      <main className="flex-1 p-4 pl-28 md:p-6 md:pl-32">{children}</main>
    </div>
  );
}
