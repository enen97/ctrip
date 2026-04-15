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

// 获取酒店房间列表
export const getHotelRooms = (id, data) => {
  return request({
    url: `/hotels/${id}/rooms`,
    method: "post",
    data,
  });
}

// 获取特定房型的实时库存和价格
export const getRoomAvailability = (data) => {
  return request({
    url: "/rooms/availability",
    method: "post",
    data,
  });
}