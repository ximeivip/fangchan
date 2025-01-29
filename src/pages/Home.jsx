import React from 'react'
import { Typography, Card, Row, Col, Statistic, Carousel } from 'antd'
import { RiseOutlined, ProjectOutlined, TeamOutlined, AccountBookOutlined } from '@ant-design/icons'
import { calculateProjectStats, getAllProjects } from '../data/projectData'

const { Title } = Typography

const Home = () => {
  const stats = calculateProjectStats()
  const projects = getAllProjects()

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <Carousel autoplay>
          {projects.map(project => (
            <div key={project.id}>
              <img
                src={project.images[0]}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.6)',
                  padding: '20px',
                  color: '#fff',
                  borderRadius: '0 0 8px 8px'
                }}
              >
                <h3 style={{ color: '#fff', margin: 0 }}>{project.title}</h3>
                <p style={{ margin: '8px 0 0 0' }}>{project.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </Card>

      <Title level={2}>平台概况</Title>
      <Row gutter={16}>
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
    </div>
  )
}

export default Home