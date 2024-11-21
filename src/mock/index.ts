// Mock data for menu items
export const mockMenuData = [
  {
    id: '1',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'DashboardOutlined',
  },
  {
    id: '2',
    name: 'Users',
    path: '/users',
    icon: 'UserOutlined',
    children: [
      {
        id: '2.1',
        name: 'User List',
        path: '/users/list',
      },
      {
        id: '2.2',
        name: 'User Settings',
        path: '/users/settings',
      },
    ],
  },
  {
    id: '3',
    name: 'Settings',
    path: '/settings',
    icon: 'SettingOutlined',
  },
];

// Mock data for privileges
export const mockPrivilegeData = {
  roles: ['admin', 'user'],
  permissions: [
    'dashboard:view',
    'users:view',
    'users:edit',
    'settings:view',
    'settings:edit',
  ],
};

// Mock authentication service
interface LoginCredentials {
  username: string;
  password: string;
}

export const mockAuthService = {
  login: async (credentials: LoginCredentials): Promise<string | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock validation
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return 'mock-jwt-token-for-admin-user';
    }
    
    if (credentials.username === 'user' && credentials.password === 'user') {
      return 'mock-jwt-token-for-regular-user';
    }

    return null;
  }
};

export * from './menu';
export * from './privilege';
