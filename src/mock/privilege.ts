import { PrivilegeData } from '../utils/request';

export const mockPrivilegeData: PrivilegeData = {
  roles: ['admin', 'user'],
  permissions: [
    'read:dashboard',
    'write:dashboard',
    'read:users',
    'write:users',
    'read:data',
    'write:data',
    'read:flow',
    'write:flow',
    'read:settings',
    'write:settings'
  ]
};
