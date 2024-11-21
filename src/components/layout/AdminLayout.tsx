import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Breadcrumb, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import './AdminLayout.css';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: 'Users',
    },
    {
      key: 'data',
      icon: <DatabaseOutlined />,
      label: 'Data',
      children: [
        {
          key: 'data/table',
          icon: <TableOutlined />,
          label: 'Table',
        },
        {
          key: 'data/blank',
          icon: <ApiOutlined />,
          label: 'Blank',
        },
      ],
    },
    {
      key: 'flow-editor',
      icon: <NodeIndexOutlined />,
      label: 'Flow Editor',
      children: [
        {
          key: 'flow-editor/basic',
          icon: <ApiOutlined />,
          label: 'Basic Flow',
        },
        {
          key: 'flow-editor/custom',
          icon: <ApiOutlined />,
          label: 'Custom Flow',
        },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Logout',
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // Get the currently selected menu key based on location
  const getSelectedKey = () => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path === '') return '/';
    
    // Check if the current path matches any menu item
    const findMatchingKey = (items: MenuProps['items']): string[] => {
      if (!items) return [];
      
      for (const item of items) {
        if (!item) continue;
        
        if ('children' in item) {
          const childKey = findMatchingKey(item.children);
          if (childKey.length > 0) return childKey;
        }
        
        if (path.startsWith(item.key as string)) {
          return [item.key as string];
        }
      }
      
      return [];
    };
    
    return findMatchingKey(menuItems);
  };

  // Get open keys for submenu
  const getOpenKeys = () => {
    const path = location.pathname.substring(1);
    return path.split('/').reduce((acc: string[], curr: string, index: number) => {
      if (index === 0 && curr !== '') {
        acc.push(curr);
      }
      return acc;
    }, []);
  };

  const getBreadcrumbItems = () => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const items = [
      { title: 'Home', href: '/' },
      ...pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
          title: snippet.charAt(0).toUpperCase() + snippet.slice(1),
          href: url,
        };
      }),
    ];
    return items;
  };

  return (
    <Layout className="admin-layout">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="admin-sider"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <div className="logo-placeholder" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 200,
        transition: 'all 0.2s',
        width: `calc(100vw - ${collapsed ? 80 : 200}px)`,
      }}>
        <Header className="admin-header" style={{
          padding: 0,
          background: colorBgContainer,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 24, gap: '8px', alignItems: 'center' }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Admin User</span>
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Header>
        <div style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={getBreadcrumbItems()} />
        </div>
        <Content className="admin-content" style={{
          margin: '24px',
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 'calc(100vh - 112px)',
          overflow: 'auto',
          flex: 1,
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
