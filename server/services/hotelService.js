const hotelModel = require("../models/hotelModel");

const getHotelList = async (address) => {
  const data = await hotelModel.getTopHotels(address);

  // 可以在这里做数据加工（比如默认图、字段处理）
  return data.map((item) => ({
    ...item,
    img: item.img || "https://default.jpg",
  }));
};

module.exports = {
  getHotelList,
};
