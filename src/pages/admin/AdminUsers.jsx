import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Input, Modal, message } from 'antd';
import { SearchOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

const AdminUsers = () => {
  const [searchText, setSearchText] = useState('');

  // 模拟用户数据
  const users = [
    {
      id: 1,
      phone: '13800138000',
      nickname: '张三',
      registrationDate: '2024-01-15',
      totalInvestment: 500000,
      status: 'active'
    },
    {
      id: 2,
      phone: '13900139000',
      nickname: '李四',
      registrationDate: '2024-01-16',
      totalInvestment: 300000,
      status: 'active'
    },
    {
      id: 3,
      phone: '13700137000',
      nickname: '王五',
      registrationDate: '2024-01-18',
      totalInvestment: 200000,
      status: 'locked'
    }
  ];

  const handleStatusChange = (record) => {
    Modal.confirm({
      title: '确认操作',
      content: `确定要${record.status === 'active' ? '锁定' : '解锁'}用户「${record.nickname}」吗？`,
      onOk: () => {
        // 在实际应用中，这里应该调用后端API修改用户状态
        message.success('操作成功');
      }
    });
  };

  const filteredUsers = users.filter(user =>
    user.nickname.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.includes(searchText)
  );

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '注册时间',
      dataIndex: 'registrationDate',
      key: 'registrationDate'
    },
    {
      title: '总投资额（元）',
      dataIndex: 'totalInvestment',
      key: 'totalInvestment',
      render: (text) => text.toLocaleString()
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '正常' : '已锁定'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type={record.status === 'active' ? 'default' : 'primary'}
            icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => handleStatusChange(record)}
          >
            {record.status === 'active' ? '锁定' : '解锁'}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Card
        title="用户管理"
        extra={
          <Input
            placeholder="搜索用户"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
        }
      >
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条数据`
          }}
        />
      </Card>
    </div>
  );
};

export default AdminUsers;