import request from "./request";

// 获取酒店列表
export const getHotels = (data) => {
  return request({
    url: "/hotels",
    method: "post",
    data,
  });
};
