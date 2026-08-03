import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { getNavForRole } from "@/lib/navigation";
import { ROLE_LABELS } from "@/lib/roles";

export const metadata = {
  title: "Dashboard · ChainWork",
};

/**
 * One URL for every role. Rather than four `/employee/dashboard`-style routes,
 * this page reads the role and renders that dashboard — so a link to
 * `/dashboard` means the same thing no matter who follows it.
 *
 * The per-role bodies are shortcut grids for now; replace this with a switch
 * over role-specific dashboard components as each one gets built.
 */
export default async function DashboardPage() {
  const user = await requireUser();
  const nav = getNavForRole(user.role);
  const shortcuts = nav.main.filter((item) => item.href !== "/dashboard");
  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You are signed in to the {ROLE_LABELS[user.role]} dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shortcuts.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border bg-card p-5 transition-colors hover:border-brand/40 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-brand/10 p-2 text-brand">
                  <Icon className="size-5" />
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
