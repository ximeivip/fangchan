import React from 'react'
import { Typography, Descriptions, Button, Progress, Card, Space, Row, Col, Carousel, Avatar, List } from 'antd'
import { useParams } from 'react-router-dom'
import { getProjectById, getProjectInvestors } from '../data/projectData'

const { Title } = Typography

const ProjectDetail = () => {
  const { id } = useParams()
  const project = getProjectById(parseInt(id))
  const investors = getProjectInvestors(parseInt(id))

  const progress = (project.currentAmount / project.totalAmount) * 100
  const getProgressStatus = (percent) => {
    if (percent >= 100) return 'success'
    if (percent >= 80) return 'active'
    return 'normal'
  }

  return (
    <div>
      <Title level={2}>{project.title}</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Carousel autoplay>
            {project.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`项目图片${index + 1}`}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Card>
        <Card>
          <Descriptions title="项目信息" bordered>
            <Descriptions.Item label="项目地址">{project.location}</Descriptions.Item>
            <Descriptions.Item label="募集金额">{project.totalAmount}万元</Descriptions.Item>
            <Descriptions.Item label="已募集">{project.currentAmount}万元</Descriptions.Item>
            <Descriptions.Item label="预期年化收益">{project.expectedReturn}%</Descriptions.Item>
            <Descriptions.Item label="最低投资额">{project.minInvestment}万元</Descriptions.Item>
            <Descriptions.Item label="投资期限">{project.duration}个月</Descriptions.Item>
            <Descriptions.Item label="风险等级">{project.riskLevel}</Descriptions.Item>
            <Descriptions.Item label="开始时间">{project.startDate}</Descriptions.Item>
            <Descriptions.Item label="结束时间">{project.endDate}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="募集进度">
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Progress
                percent={progress}
                status={getProgressStatus(progress)}
                format={percent => `${percent.toFixed(1)}%`}
                strokeWidth={20}
              />
            </Col>
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                      {project.currentAmount}
                    </div>
                    <div>已募集金额（万元）</div>
                  </div>
                </Col>
                <Col>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {project.totalAmount - project.currentAmount}
                    </div>
                    <div>剩余金额（万元）</div>
                  </div>
                </Col>
                <Col>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      {project.expectedReturn}%
                    </div>
                    <div>预期年化收益</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card title="项目描述">
          <p>{project.description}</p>
        </Card>

        <Card title={`投资人列表 (${investors.length}人)`}>
          <List
            itemLayout="horizontal"
            dataSource={investors}
            renderItem={investor => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={investor.avatar} />}
                  title={investor.name}
                  description={
                    <Space>
                      <span>投资金额：{investor.investment.amount}万元</span>
                      <span>投资时间：{investor.investment.date}</span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Button type="primary" size="large" block>
          立即投资
        </Button>
      </Space>
    </div>
  )
}

export default ProjectDetail