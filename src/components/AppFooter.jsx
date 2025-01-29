import React from 'react'
import { Link } from 'react-router-dom'

const AppFooter = () => {
  return (
    <div>
      <div>房产众筹平台 ©{new Date().getFullYear()} Created by Xiaotao</div>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
        本平台仅作为演示使用，不提供实际投资服务
      </div>
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Link to="/admin/login" style={{ color: '#666', textDecoration: 'underline' }}>管理系统入口</Link>
      </div>
    </div>
  )
}

export default AppFooter