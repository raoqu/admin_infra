import { PrivilegeData } from './request';

// Define permission types
export type Permission = string;
export type Role = string;

// Define route permission requirements
export interface RoutePermission {
  path: string;
  permissions?: Permission[];
  roles?: Role[];
  children?: RoutePermission[];
}

// Route permission configuration
export const routePermissions: RoutePermission[] = [
  {
    path: '/dashboard',
    permissions: ['read:dashboard'],
    roles: ['admin', 'user']
  },
  {
    path: '/users',
    permissions: ['read:users'],
    roles: ['admin'],
    children: [
      {
        path: '/users/list',
        permissions: ['read:users'],
        roles: ['admin']
      },
      {
        path: '/users/roles',
        permissions: ['write:users'],
        roles: ['admin']
      }
    ]
  }
];

// Check if user has required permissions
export const hasPermission = (
  userPrivileges: PrivilegeData,
  requiredPermissions?: Permission[],
  requiredRoles?: Role[]
): boolean => {
  if (!requiredPermissions?.length && !requiredRoles?.length) {
    return true; // No permissions required
  }

  // Check roles
  if (requiredRoles?.length) {
    const hasRole = requiredRoles.some(role => 
      userPrivileges.roles.includes(role)
    );
    if (hasRole) return true;
  }

  // Check permissions
  if (requiredPermissions?.length) {
    const hasAllPermissions = requiredPermissions.every(permission =>
      userPrivileges.permissions.includes(permission)
    );
    if (hasAllPermissions) return true;
  }

  return false;
};

// Find route permissions by path
export const findRoutePermissions = (
  path: string,
  routes: RoutePermission[] = routePermissions
): RoutePermission | undefined => {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children?.length) {
      const childRoute = findRoutePermissions(path, route.children);
      if (childRoute) {
        return childRoute;
      }
    }
  }
  return undefined;
};

// Check if user can access a specific route
export const canAccessRoute = (
  path: string,
  userPrivileges: PrivilegeData
): boolean => {
  const routePermission = findRoutePermissions(path);
  if (!routePermission) {
    return true; // If no permissions defined, allow access
  }
  
  return hasPermission(
    userPrivileges,
    routePermission.permissions,
    routePermission.roles
  );
};
