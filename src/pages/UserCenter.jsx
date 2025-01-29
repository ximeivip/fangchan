import React, { useState, useEffect } from 'react'
import { Typography, Card, Tabs, List, Tag, Form, Input, Button, Upload, message, Avatar } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { updateUserInfo } from '../data/userData'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const UserCenter = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      message.error('请先登录');
      navigate('/login');
      return;
    }
    setUserInfo(JSON.parse(user));
  }, [navigate]);

  if (!userInfo) return null;

  const investments = [
    {
      id: 1,
      projectTitle: '北京市朝阳区某高端公寓项目',
      amount: 200000,
      expectedReturn: 8.5,
      startDate: '2024-01-01',
      status: '投资中'
    },
    {
      id: 2,
      projectTitle: '上海市浦东新区商业地产项目',
      amount: 300000,
      expectedReturn: 9.0,
      startDate: '2024-02-01',
      status: '已完成'
    }
  ]

  const handleUpdateInfo = async (values) => {
    try {
      setLoading(true);
      await updateUserInfo(userInfo.id, values);
      message.success('个人信息更新成功');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (info) => {
    if (info.file.status === 'done') {
      // 实际应用中应该上传到服务器并获取URL
      const avatarUrl = URL.createObjectURL(info.file.originFileObj);
      await updateUserInfo(userInfo.id, { avatar: avatarUrl });
      message.success('头像更新成功');
    }
  };

  const items = [
    {
      key: '1',
      label: '账户概览',
      children: (
        <Card>
          <List>
            <List.Item>
              <span>账户余额：</span>
              <span>{userInfo.balance.toLocaleString()}元</span>
            </List.Item>
            <List.Item>
              <span>总投资额：</span>
              <span>{userInfo.totalInvestment.toLocaleString()}元</span>
            </List.Item>
            <List.Item>
              <span>预期收益：</span>
              <span>{userInfo.expectedReturn.toLocaleString()}元</span>
            </List.Item>
          </List>
        </Card>
      )
    },
    {
      key: '2',
      label: '个人信息',
      children: (
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateInfo}
            initialValues={{
              nickname: userInfo.nickname
            }}
          >
            <Form.Item label="头像">
              <Upload
                name="avatar"
                showUploadList={false}
                onChange={handleAvatarUpload}
              >
                <div style={{ marginBottom: 16 }}>
                  <Avatar
                    size={64}
                    src={userInfo.avatar}
                    icon={<UserOutlined />}
                  />
                </div>
                <Button icon={<UploadOutlined />}>更换头像</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="nickname"
              label="昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="新密码"
            >
              <Input.Password placeholder="不修改请留空" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )
    },
    {
      key: '3',
      label: '我的投资',
      children: (
        <List
          dataSource={investments}
          renderItem={item => (
            <List.Item>
              <Card title={item.projectTitle} style={{ width: '100%' }}>
                <List>
                  <List.Item>
                    <span>投资金额：</span>
                    <span>{item.amount.toLocaleString()}元</span>
                  </List.Item>
                  <List.Item>
                    <span>预期年化收益：</span>
                    <span>{item.expectedReturn}%</span>
                  </List.Item>
                  <List.Item>
                    <span>投资日期：</span>
                    <span>{item.startDate}</span>
                  </List.Item>
                  <List.Item>
                    <Tag color={item.status === '投资中' ? 'blue' : 'green'}>
                      {item.status}
                    </Tag>
                  </List.Item>
                </List>
              </Card>
            </List.Item>
          )}
        />
      )
    }
  ]

  return (
    <div>
      <Title level={2}>个人中心</Title>
      <Tabs items={items} />
    </div>
  )
}

export default UserCenter