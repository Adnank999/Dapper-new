import type { JwtPayload, Role } from "./jwt";

export function hasAnyRole(user: JwtPayload | null, required: Role[]) {
  if (!user) return false;
  return required.some((r) => user.roles?.includes(r));
}
