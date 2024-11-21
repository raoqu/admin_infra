import { MenuItem } from '../utils/request';

export const mockMenuData: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'DashboardOutlined',
    children: []
  },
  {
    id: '2',
    name: 'User Management',
    path: '/users',
    icon: 'UserOutlined',
    children: [
      {
        id: '2-1',
        name: 'User List',
        path: '/users/list',
      },
      {
        id: '2-2',
        name: 'User Roles',
        path: '/users/roles',
      }
    ]
  },
  {
    id: '3',
    name: 'Data Management',
    path: '/data',
    icon: 'DatabaseOutlined',
    children: [
      {
        id: '3-1',
        name: 'Table View',
        path: '/data/table',
      },
      {
        id: '3-2',
        name: 'Blank Page',
        path: '/data/blank',
      }
    ]
  },
  {
    id: '4',
    name: 'Flow Editor',
    path: '/flow',
    icon: 'ApiOutlined',
    children: [
      {
        id: '4-1',
        name: 'Basic Flow',
        path: '/flow/basic',
      },
      {
        id: '4-2',
        name: 'Custom Flow',
        path: '/flow/custom',
      }
    ]
  },
  {
    id: '5',
    name: 'Settings',
    path: '/settings',
    icon: 'SettingOutlined',
    children: []
  }
];
