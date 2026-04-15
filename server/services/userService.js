const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (account, password) => {
  const user = await userModel.findByAccount(account);
  if (!user) throw new Error("用户不存在");

  // 校验用户状态：0 代表禁用
  if (user.status === 0) {
    throw new Error("该账号已被禁用，请联系管理员");
  }

  // 校验密码
  if (password !== user.password) throw new Error("密码错误");

  // 签发 JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "YOUR_SECRET_KEY",
    { expiresIn: "24h" },
  );

  return { token, user: { id: user.id, nickname: user.nickname, avatar: user.avatar } };
};

const register = async (account, password) => {
  // 1. 检查账号是否已存在
  const existingUser = await userModel.findByAccount(account);
  if (existingUser) {
    throw new Error("该账号或手机号已被注册");
  }

  // 2. 创建用户
  const result = await userModel.createUser(account, password);
  return { message: "注册成功", insertId: result.insertId };
};

module.exports = {
  login,
  register,
};
