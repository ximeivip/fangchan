// 模拟项目数据存储
let projects = [
  {
    id: 1,
    title: '北京市朝阳区某高端公寓项目',
    location: '北京市朝阳区',
    totalAmount: 5000,
    currentAmount: 3000,
    expectedReturn: 12,
    minInvestment: 10,
    duration: 24,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: '募集中',
    riskLevel: '中等',
    description: '位于北京市朝阳区核心地段的高端公寓项目，总建筑面积约5万平方米，预计年化收益率12%。',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3'
    ]
  },
  {
    id: 2,
    title: '上海市浦东新区商业地产项目',
    location: '上海市浦东新区',
    totalAmount: 8000,
    currentAmount: 6000,
    expectedReturn: 10,
    minInvestment: 20,
    duration: 36,
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    status: '募集中',
    riskLevel: '较低',
    description: '位于上海市浦东新区的高端商业地产项目，总建筑面积约8万平方米，预计年化收益率10%。',
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6'
    ]
  }
];

// 模拟项目投资记录
let investments = [
  {
    projectId: 1,
    userId: 1,
    amount: 100,
    date: '2024-01-15 14:30:00'
  },
  {
    projectId: 1,
    userId: 2,
    amount: 200,
    date: '2024-01-16 09:45:00'
  },
  {
    projectId: 2,
    userId: 1,
    amount: 300,
    date: '2024-02-01 10:20:00'
  }
];

// 获取所有项目
export const getAllProjects = () => {
  return projects;
};

// 根据ID获取项目
export const getProjectById = (id) => {
  return projects.find(p => p.id === id);
};

// 获取项目投资人列表
export const getProjectInvestors = (projectId) => {
  const projectInvestments = investments.filter(i => i.projectId === projectId);
  return projectInvestments.map(investment => ({
    id: investment.userId,
    name: `投资人${investment.userId}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${investment.userId}`,
    investment: {
      amount: investment.amount,
      date: investment.date
    }
  }));
};

// 添加新项目
export const addProject = (projectData) => {
  const newProject = {
    id: projects.length + 1,
    currentAmount: 0,
    status: '募集中',
    ...projectData
  };
  projects.push(newProject);
  return newProject;
};

// 更新项目信息
export const updateProject = (id, updates) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('项目不存在');
  }
  projects[index] = { ...projects[index], ...updates };
  return projects[index];
};

// 删除项目
export const deleteProject = (id) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('项目不存在');
  }
  projects.splice(index, 1);
};

// 计算项目统计数据
export const calculateProjectStats = () => {
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0) / 10000; // 转换为亿元
  const projectCount = projects.length;
  const investorCount = new Set(investments.map(inv => inv.userId)).size;
  const avgReturn = projects.reduce((sum, p) => sum + p.expectedReturn, 0) / projectCount;

  return {
    totalInvestment,
    projectCount,
    investorCount,
    avgReturn
  };
};