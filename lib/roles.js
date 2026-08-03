/**
 * The four ChainWork roles. A user holds exactly one — there is no role
 * switching, so `user.role` is the single input that decides which dashboard
 * shell renders.
 */
export const ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  HR: "hr",
  ADMIN: "admin",
};

export const ROLE_LIST = Object.values(ROLES);

export const ROLE_LABELS = {
  [ROLES.EMPLOYEE]: "Employee",
  [ROLES.MANAGER]: "Manager",
  [ROLES.HR]: "HR Administrator",
  [ROLES.ADMIN]: "System Admin",
};

export function isRole(value) {
  return ROLE_LIST.includes(value);
}
