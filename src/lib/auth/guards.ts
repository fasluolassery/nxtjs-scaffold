import { ForbiddenError, UnauthorizedError } from "@/lib/errors/AppError";

export type Role = "admin" | "manager" | "user" | "guest";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: string[];
}

export function hasPermission(user: UserSession | null, requiredPermission: string): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.permissions.includes(requiredPermission);
}

export function hasRole(user: UserSession | null, allowedRoles: Role[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

export function assertAuthenticated(user: UserSession | null): asserts user is UserSession {
  if (!user) {
    throw new UnauthorizedError("Authentication required to perform this action");
  }
}

export function assertAuthorized(
  user: UserSession | null,
  options: { requiredRole?: Role[]; requiredPermission?: string }
): asserts user is UserSession {
  assertAuthenticated(user);

  if (options.requiredRole && !hasRole(user, options.requiredRole)) {
    throw new ForbiddenError(`User role '${user.role}' lacks required authorization`);
  }

  if (options.requiredPermission && !hasPermission(user, options.requiredPermission)) {
    throw new ForbiddenError(`Missing required permission: ${options.requiredPermission}`);
  }
}
