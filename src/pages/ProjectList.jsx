import React from 'react'
import { Typography, List, Card, Tag, Space, Progress, Badge } from 'antd'
import { Link } from 'react-router-dom'
import { getAllProjects, getProjectInvestors } from '../data/projectData'
import { TeamOutlined } from '@ant-design/icons'

const { Title } = Typography

const ProjectList = () => {
  const projects = getAllProjects()

  const getProgressStatus = (current, total) => {
    const percent = (current / total) * 100
    if (percent >= 100) return 'success'
    if (percent >= 80) return 'active'
    return 'normal'
  }

  return (
    <div>
      <Title level={2}>投资项目</Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        dataSource={projects}
        renderItem={project => {
          const progress = (project.currentAmount / project.totalAmount) * 100
          const investors = getProjectInvestors(project.id)
          return (
            <List.Item>
              <Link to={`/projects/${project.id}`}>
                <Card 
                  title={project.title} 
                  hoverable
                  extra={
                    <Badge
                      count={investors.length}
                      style={{ backgroundColor: '#52c41a' }}
                      title="投资人数"
                      offset={[0, 0]}
                    >
                      <TeamOutlined style={{ fontSize: '16px' }} />
                    </Badge>
                  }
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>地址：{project.location}</div>
                    <div>
                      <div style={{ marginBottom: '8px' }}>募集进度：</div>
                      <Progress
                        percent={progress}
                        status={getProgressStatus(project.currentAmount, project.totalAmount)}
                        format={percent => `${percent.toFixed(1)}%`}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span>已募集：{project.currentAmount}万元</span>
                        <span>目标：{project.totalAmount}万元</span>
                      </div>
                    </div>
                    <div>预期年化收益：{project.expectedReturn}%</div>
                    <div>最低投资额：{project.minInvestment}万元</div>
                    <div>投资期限：{project.duration}个月</div>
                    <div>截止日期：{project.endDate}</div>
                    <Tag color={project.status === '募集中' ? 'green' : project.status === '已满额' ? 'blue' : 'default'}>
                      {project.status}
                    </Tag>
                  </Space>
                </Card>
              </Link>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default ProjectList