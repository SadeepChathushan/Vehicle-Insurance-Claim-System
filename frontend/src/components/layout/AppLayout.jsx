import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const { Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.log('AppLayout mounted with userType:', user?.role); // Debug log to verify userType
  }, [user?.role]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader onMenuClick={toggleSidebar} />
      <Layout style={{ marginTop: 64 }}>
        <Sidebar collapsed={collapsed} userType={user?.role} />
        <Content
          style={{
            padding: '24px',
            background: '#fff',
            marginLeft: collapsed ? '80px' : '200px', // Adjust margin based on collapsed state
            transition: 'margin-left 0.2s', // Smooth transition
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
