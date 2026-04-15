import request from "./request";

// 登录
export const login = (loginData) => {
  return request({
    url: "/user/login",
    method: "post",
    data: loginData
  });
};

// 注册
export const register = (registerData) => {
  return request({
    url: "/user/register",
    method: "post",
    data: registerData
  });
};
