import request from "./request";

export const createOrder = (data) => {
  return request({
    url: "/order/create",
    method: "post",
    data,
  });
};


export const getUserOrders = (userId) => {
  return request({
    url: `/order/list`,
    method: "get",
    params: {
      userId,
    },
  });
};



export const deleteOrderApi = (orderNo) => {
  return request({
    url: `/order/delete`,
    method: "delete",
    data: {
      orderNo
    },
  });
};


export const searchUserOrders = (userId, checkIn, checkOut, guest, orderNo, status) => {
  return request({
    url: `/order/search`,
    method: "get",
    params: {
      userId,
      checkIn,
      checkOut,
      guest,
      orderNo,
      status,
    },
  });
};
