"use client";

import { setDevRole } from "@/lib/auth/dev-role-actions";
import { ROLE_LABELS, ROLE_LIST } from "@/lib/roles";

/**
 * Development-only shortcut for viewing each dashboard without a login
 * backend. Remove this together with `lib/auth/dev-role-actions.js` once real
 * sessions exist — users cannot change their own role in ChainWork.
 */
export function DevRoleSwitcher({ role }) {
  return (
    <form action={setDevRole} className="hidden items-center gap-2 md:flex">
      <label htmlFor="dev-role" className="text-xs text-muted-foreground">
        View as
      </label>
      <select
        id="dev-role"
        name="role"
        defaultValue={role}
        onChange={(event) => event.currentTarget.form.requestSubmit()}
        className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground"
      >
        {ROLE_LIST.map((value) => (
          <option key={value} value={value}>
            {ROLE_LABELS[value]}
          </option>
        ))}
      </select>
    </form>
  );
}
