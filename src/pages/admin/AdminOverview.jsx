import React from 'react';
import { Row, Col, Card, Statistic, Table } from 'antd';
import { RiseOutlined, ProjectOutlined, TeamOutlined, AccountBookOutlined } from '@ant-design/icons';
import { calculateProjectStats, getAllProjects, getProjectInvestors } from '../../data/projectData';

const AdminOverview = () => {
  const stats = calculateProjectStats();
  const projects = getAllProjects();

  const recentProjects = projects.map(project => ({
    key: project.id,
    title: project.title,
    location: project.location,
    totalAmount: project.totalAmount,
    currentAmount: project.currentAmount,
    progress: ((project.currentAmount / project.totalAmount) * 100).toFixed(1),
    status: project.status,
    investorCount: getProjectInvestors(project.id).length
  }));

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '地址',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '目标金额（万元）',
      dataIndex: 'totalAmount',
      key: 'totalAmount'
    },
    {
      title: '已募集（万元）',
      dataIndex: 'currentAmount',
      key: 'currentAmount'
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (text) => `${text}%`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '投资人数',
      dataIndex: 'investorCount',
      key: 'investorCount'
    }
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总投资额"
              value={stats.totalInvestment}
              precision={2}
              prefix={<RiseOutlined />}
              suffix="亿元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="项目数量"
              value={stats.projectCount}
              prefix={<ProjectOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="投资人数"
              value={stats.investorCount}
              prefix={<TeamOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均收益率"
              value={stats.avgReturn}
              precision={1}
              prefix={<AccountBookOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card title="项目概览" style={{ marginTop: 16 }}>
        <Table
          dataSource={recentProjects}
          columns={columns}
          pagination={{
            pageSize: 5,
            showTotal: (total) => `共 ${total} 条数据`
          }}
        />
      </Card>
    </div>
  );
};

export default AdminOverview;