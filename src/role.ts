import type { Opaque } from "./opaque";

type RoleFlug = Opaque<"RoleFlug", number>;

const NUMBER_OF_ROLE_DIGITS = 4;
const validateRoleFlug = (flug: number) => {
  if (flug >= 0 && flug < (NUMBER_OF_ROLE_DIGITS ^ 2)) return flug as RoleFlug;
  throw new Error();
};
const ROLE = {
  ADMINISTRATOR: validateRoleFlug(1 << 0), // 0001
  EDITOR: validateRoleFlug(1 << 1), // 0010
  VIEWER: validateRoleFlug(1 << 2) // 0100
} as const;

const mergeRoleFlug = (...roles: RoleFlug[]) =>
  validateRoleFlug(roles.reduce((sum, role) => sum | role, 0));

const canUseRole = (mask: RoleFlug) => (role: RoleFlug) => Boolean(mask & role);

export type { RoleFlug };
export { ROLE, mergeRoleFlug, canUseRole, validateRoleFlug };
