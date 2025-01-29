import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  TransactionOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">平台概览</Link>
    },
    {
      key: 'projects',
      icon: <ProjectOutlined />,
      label: <Link to="/admin/projects">项目管理</Link>
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">用户管理</Link>
    },
    {
      key: 'finance',
      icon: <TransactionOutlined />,
      label: <Link to="/admin/finance">资金管理</Link>
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <h1>盛城房产众筹平台管理系统</h1>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['overview']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;