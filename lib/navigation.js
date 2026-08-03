import {
  Activity,
  ArrowLeftRight,
  Blocks,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  FileCode2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  MessagesSquare,
  Network,
  ScrollText,
  Settings,
  ShieldCheck,
  Stamp,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";

import { ROLES } from "@/lib/roles";

/**
 * Sidebar navigation, per role.
 *
 * Every destination is declared exactly once as a constant below, then the
 * role maps compose those constants into menus. A screen shared by three roles
 * still has one definition — change its label, icon or href here and all three
 * sidebars follow. Where a role needs different wording for the same route
 * (an employee's "My Tasks" is a manager's "Tasks"), spread the base item and
 * override just the wording so the href and icon stay in one place.
 *
 * This module is imported by both server and client components, so it must
 * stay free of server-only imports.
 */

// --- Shared destinations ----------------------------------------------------

const DASHBOARD = {
  label: "Dashboard",
  href: "/dashboard",
  icon: LayoutDashboard,
  description: "An at-a-glance view of what needs your attention today.",
};

const ATTENDANCE = {
  label: "Attendance",
  href: "/attendance",
  icon: CalendarCheck,
  description: "Check in and out, and review your attendance history.",
};

const PROJECTS = {
  label: "Projects",
  href: "/projects",
  icon: FolderKanban,
  description: "Projects you are assigned to, with their current progress.",
};

const CHAT = {
  label: "Chat",
  href: "/chat",
  icon: MessagesSquare,
  description: "Direct and project conversations with your colleagues.",
};

const DOCUMENTS = {
  label: "Documents",
  href: "/documents",
  icon: FileText,
  description: "Documents shared with you, with their on-chain verification.",
};

const REPORTS = {
  label: "Reports",
  href: "/reports",
  icon: ChartColumn,
  description: "Productivity, attendance and workflow reporting.",
};

const AUDIT_LOG = {
  label: "Audit Log",
  href: "/audit-log",
  icon: ScrollText,
  description: "An immutable, blockchain-anchored record of every action.",
};

const PROFILE_WALLET = {
  label: "Profile & Wallet",
  href: "/profile",
  icon: Wallet,
  description: "Your account details and your linked blockchain wallet.",
};

// --- Employee ---------------------------------------------------------------

const LEAVE = {
  label: "Leave",
  href: "/leave",
  icon: CalendarDays,
  description: "Request time off and track the status of your requests.",
};

const MY_TASKS = {
  label: "My Tasks",
  href: "/tasks",
  icon: ListChecks,
  description: "Everything assigned to you, across every project.",
};

const MY_BLOCKCHAIN_RECORDS = {
  label: "My Blockchain Records",
  href: "/blockchain-records",
  icon: Blocks,
  description: "Your attendance, approvals and documents as on-chain records.",
};

// --- Manager ----------------------------------------------------------------

const MY_TEAM = {
  label: "My Team",
  href: "/team",
  icon: Users,
  description: "Live status of everyone reporting to you.",
};

const TEAM_ATTENDANCE = {
  ...ATTENDANCE,
  description: "Your team's check-ins, absences and attendance history.",
};

const APPROVALS = {
  label: "Approvals",
  href: "/approvals",
  icon: Stamp,
  badgeKey: "pendingApprovals",
  description: "Leave and workflow requests waiting on your decision.",
};

const TEAM_TASKS = {
  ...MY_TASKS,
  label: "Tasks",
  description: "Assign, track and reassign work across your team.",
};

// --- HR Administrator -------------------------------------------------------

const EMPLOYEES = {
  label: "Employees",
  href: "/hr/employees",
  icon: UsersRound,
  description: "The employee directory, records and onboarding.",
};

const HR_ATTENDANCE = {
  ...ATTENDANCE,
  description: "Organization-wide attendance records and corrections.",
};

const LEAVE_MANAGEMENT = {
  label: "Leave Management",
  href: "/hr/leave",
  icon: CalendarDays,
  description: "Leave policies, balances and every request in the org.",
};

const ROLES_PERMISSIONS = {
  label: "Roles & Permissions",
  href: "/hr/roles",
  icon: ShieldCheck,
  description: "What each role can see and do inside ChainWork.",
};

const HR_DOCUMENTS = {
  ...DOCUMENTS,
  description: "Contracts, policies and employee documents.",
};

// --- System Admin -----------------------------------------------------------

const USERS_ROLES = {
  label: "Users & Roles",
  href: "/admin/users",
  icon: UsersRound,
  description: "Create accounts, assign roles and deactivate users.",
};

const SMART_CONTRACTS = {
  label: "Smart Contracts",
  href: "/admin/contracts",
  icon: FileCode2,
  description: "Deployed addresses, ABIs and redeployment.",
};

const TRANSACTIONS = {
  label: "Transactions",
  href: "/admin/transactions",
  icon: ArrowLeftRight,
  description: "Pending, confirmed and failed on-chain transactions.",
};

const NETWORK_SETTINGS = {
  label: "Network Settings",
  href: "/admin/network",
  icon: Network,
  description: "RPC endpoints, chain configuration and gas policy.",
};

const SYSTEM_HEALTH = {
  label: "System Health",
  href: "/admin/health",
  icon: Activity,
  description: "Service status, sync lag and background job queues.",
};

const SYSTEM_SETTINGS = {
  label: "Settings",
  href: "/admin/settings",
  icon: Settings,
  description: "Organization-wide ChainWork configuration.",
};

// --- The role → menu map ----------------------------------------------------

/**
 * `main` renders in the scrolling body of the sidebar; `footer` is pinned to
 * the bottom above the fold.
 */
export const NAV_BY_ROLE = {
  [ROLES.EMPLOYEE]: {
    main: [
      DASHBOARD,
      ATTENDANCE,
      LEAVE,
      MY_TASKS,
      PROJECTS,
      CHAT,
      DOCUMENTS,
      MY_BLOCKCHAIN_RECORDS,
    ],
    footer: [PROFILE_WALLET],
  },

  [ROLES.MANAGER]: {
    main: [
      DASHBOARD,
      MY_TEAM,
      TEAM_ATTENDANCE,
      APPROVALS,
      PROJECTS,
      TEAM_TASKS,
      CHAT,
      REPORTS,
      AUDIT_LOG,
    ],
    footer: [PROFILE_WALLET],
  },

  [ROLES.HR]: {
    main: [
      DASHBOARD,
      EMPLOYEES,
      HR_ATTENDANCE,
      LEAVE_MANAGEMENT,
      ROLES_PERMISSIONS,
      HR_DOCUMENTS,
      REPORTS,
      AUDIT_LOG,
    ],
    footer: [PROFILE_WALLET],
  },

  [ROLES.ADMIN]: {
    main: [
      DASHBOARD,
      USERS_ROLES,
      SMART_CONTRACTS,
      TRANSACTIONS,
      NETWORK_SETTINGS,
      SYSTEM_HEALTH,
      AUDIT_LOG,
    ],
    footer: [SYSTEM_SETTINGS],
  },
};

const EMPTY_NAV = { main: [], footer: [] };

export function getNavForRole(role) {
  return NAV_BY_ROLE[role] ?? EMPTY_NAV;
}

/** Both menus flattened — the full set of routes a role may reach. */
export function getNavItems(role) {
  const nav = getNavForRole(role);
  return [...nav.main, ...nav.footer];
}

export function findNavItem(role, href) {
  return getNavItems(role).find((item) => item.href === href) ?? null;
}

function matchesHref(itemHref, pathname) {
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

/**
 * The nav entry a pathname belongs to, including nested routes such as
 * `/projects/42`. Longest href wins so a nested section beats its parent.
 */
export function findNavItemByPath(role, pathname) {
  return getNavItems(role)
    .filter((item) => matchesHref(item.href, pathname))
    .sort((a, b) => b.href.length - a.href.length)[0] ?? null;
}

/**
 * Whether a role may reach a path. Visibility and access are the same thing in
 * ChainWork, so this derives from the menus above — there is no second list to
 * keep in sync. Hiding a link is not enforcement, though: this is what the
 * server-side guards in `lib/auth/guards.js` actually check.
 */
export function canAccess(role, pathname) {
  return getNavItems(role).some((item) => matchesHref(item.href, pathname));
}
