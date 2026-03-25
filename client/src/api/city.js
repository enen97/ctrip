import request from "./request";

// 获取酒店列表
export const getCitys = () => {
  return request({
    url: "/citys",
    method: "get",
  });
};
