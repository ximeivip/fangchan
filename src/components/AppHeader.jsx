import React from 'react'
import { Menu, Button } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined, ProjectOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

const AppHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    // 清除用户登录状态
    localStorage.removeItem('user')
    // 跳转到登录页面
    navigate('/login')
  }

  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: <Link to="/projects">投资项目</Link>
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: <Link to="/user">个人中心</Link>
    }
  ]

  // 判断用户是否登录
  const isLoggedIn = Boolean(localStorage.getItem('user'))

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 24px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '48px' }}>
        盛城房产众筹平台
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        style={{ flex: 1, border: 'none' }}
      />
      {isLoggedIn && (
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          退出
        </Button>
      )}
    </div>
  )
}

export default AppHeader