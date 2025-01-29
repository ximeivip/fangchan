// 模拟用户数据存储
let users = [
  {
    id: 1,
    phone: '13800138000',
    nickname: '张三',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    password: '123456' // 实际应用中应该使用加密存储
  }
];

// 模拟验证码存储
let verificationCodes = new Map();

// 生成验证码
export const generateVerificationCode = (phone) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  verificationCodes.set(phone, {
    code,
    timestamp: Date.now()
  });
  return code;
};

// 验证验证码
export const verifyCode = (phone, code) => {
  const storedData = verificationCodes.get(phone);
  if (!storedData) return false;
  
  // 验证码5分钟内有效
  if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
    verificationCodes.delete(phone);
    return false;
  }
  
  return storedData.code === code;
};

// 用户注册
export const registerUser = (phone, nickname, password) => {
  if (users.some(u => u.phone === phone)) {
    throw new Error('手机号已被注册');
  }
  
  const newUser = {
    id: users.length + 1,
    phone,
    nickname,
    password,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${users.length + 1}`
  };
  
  users.push(newUser);
  return newUser;
};

// 用户登录
export const loginUser = (phone, password) => {
  const user = users.find(u => u.phone === phone && u.password === password);
  if (!user) {
    throw new Error('手机号或密码错误');
  }
  return user;
};

// 手机验证码登录
export const loginWithCode = (phone, code) => {
  if (!verifyCode(phone, code)) {
    throw new Error('验证码错误或已过期');
  }
  
  let user = users.find(u => u.phone === phone);
  if (!user) {
    // 如果用户不存在，自动注册
    user = registerUser(phone, `用户${phone.slice(-4)}`, '');
  }
  
  return user;
};

// 更新用户信息
export const updateUserInfo = (userId, updates) => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('用户不存在');
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates
  };
  
  return users[userIndex];
};

// 获取用户信息
export const getUserById = (userId) => {
  return users.find(u => u.id === userId);
};