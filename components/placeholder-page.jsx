import { requireAccess } from "@/lib/auth/guards";
import { findNavItem } from "@/lib/navigation";
import { ROLE_LABELS } from "@/lib/roles";

/**
 * Stand-in body for routes that exist in the sidebar but have no screen yet.
 *
 * It also carries the route's access check, so every generated page is a
 * one-liner. When a real screen replaces one of these, that page keeps the
 * guard by calling `requireAccess(href)` itself — that call is the thing that
 * must not be dropped.
 */
export async function PlaceholderPage({ href }) {
  const user = await requireAccess(href);
  const item = findNavItem(user.role, href);
  const Icon = item?.icon;

  return (
    <section className="mx-auto mt-8 flex max-w-2xl flex-col items-center rounded-xl border border-dashed bg-card p-10 text-center md:p-16">
      {Icon ? (
        <div className="rounded-xl bg-brand/10 p-3 text-brand">
          <Icon className="size-6" />
        </div>
      ) : null}

      <h2 className="mt-4 text-xl font-semibold">{item?.label ?? href}</h2>

      {item?.description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {item.description}
        </p>
      ) : null}

      <p className="mt-8 text-xs text-muted-foreground">
        Placeholder screen — <code className="font-mono">{href}</code> as seen
        by the {ROLE_LABELS[user.role]} dashboard.
      </p>
    </section>
  );
}
