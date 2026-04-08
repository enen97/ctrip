import request from "./request";

// 获取酒店列表
export const getHotels = (data) => {
  return request({
    url: "/hotels",
    method: "post",
    data,
  });
};

// 根据id获取酒店详情
export const getHotelDetail = (id) => {
  return request({
    url: `/hotels/${id}`,
    method: "get",
  });
}