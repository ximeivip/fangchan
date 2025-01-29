import React, { useState } from 'react';
import { Table, Card, Row, Col, Statistic, DatePicker, Space } from 'antd';
import { TransactionOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const AdminFinance = () => {
  const [dateRange, setDateRange] = useState(null);

  // 模拟资金流水数据
  const transactions = [
    {
      id: 1,
      type: 'investment',
      amount: 100000,
      userId: 1,
      userName: '张三',
      projectId: 1,
      projectTitle: '北京市朝阳区某高端公寓项目',
      date: '2024-01-15 14:30:00',
      status: 'success'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: -50000,
      userId: 2,
      userName: '李四',
      projectId: 2,
      projectTitle: '上海市浦东新区商业地产项目',
      date: '2024-01-16 15:20:00',
      status: 'success'
    },
    {
      id: 3,
      type: 'investment',
      amount: 200000,
      userId: 3,
      userName: '王五',
      projectId: 1,
      projectTitle: '北京市朝阳区某高端公寓项目',
      date: '2024-01-18 09:15:00',
      status: 'success'
    }
  ];

  // 计算统计数据
  const stats = {
    totalInvestment: transactions
      .filter(t => t.type === 'investment')
      .reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawal: Math.abs(
      transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0)
    ),
    transactionCount: transactions.length
  };

  const columns = [
    {
      title: '交易ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Space>
          {type === 'investment' ? (
            <RiseOutlined style={{ color: '#52c41a' }} />
          ) : (
            <FallOutlined style={{ color: '#ff4d4f' }} />
          )}
          {type === 'investment' ? '投资' : '提现'}
        </Space>
      )
    },
    {
      title: '金额（元）',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span style={{ color: amount > 0 ? '#52c41a' : '#ff4d4f' }}>
          {amount > 0 ? '+' : ''}{amount.toLocaleString()}
        </span>
      )
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '项目',
      dataIndex: 'projectTitle',
      key: 'projectTitle'
    },
    {
      title: '时间',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'success' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'success' ? '成功' : '失败'}
        </span>
      )
    }
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总投资金额"
              value={stats.totalInvestment}
              precision={2}
              prefix={<RiseOutlined />}
              suffix="元"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="总提现金额"
              value={stats.totalWithdrawal}
              precision={2}
              prefix={<FallOutlined />}
              suffix="元"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="交易笔数"
              value={stats.transactionCount}
              prefix={<TransactionOutlined />}
              suffix="笔"
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="资金流水"
        extra={
          <RangePicker
            onChange={(dates) => setDateRange(dates)}
            style={{ width: 250 }}
          />
        }
        style={{ marginTop: 16 }}
      >
        <Table
          dataSource={transactions}
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

export default AdminFinance;