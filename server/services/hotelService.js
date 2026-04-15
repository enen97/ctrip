const hotelModel = require("../models/hotelModel");

const getHotelList = async (address) => {
  const data = await hotelModel.getTopHotels(address);

  // 可以在这里做数据加工（比如默认图、字段处理）
  return data.map((item) => ({
    ...item,
    img: item.img || "https://default.jpg",
  }));
};

// 评分文本转换
function getScoreText(score) {
  if (score >= 4.5) return "超棒";
  if (score >= 4.0) return "很好";
  if (score >= 3.0) return "不错";
  return "一般";
}
// 两次解析设施JSON字段
function parseFacilities(data) {
  if (!data) return [];

  // 如果已经是数组，直接处理
  if (Array.isArray(data)) {
    return data
      .map((item) => {
        try {
          return typeof item === "string" ? JSON.parse(item) : item;
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);
  }

  // 如果是字符串，再 parse 一次
  try {
    const arr = JSON.parse(data);

    return arr.map((item) =>
      typeof item === "string" ? JSON.parse(item) : item,
    );
  } catch (e) {
    console.error("facilities解析失败:", data);
    return [];
  }
}

const getHotelDetail = async (hotelId) => {
  const hotel = await hotelModel.getHotelById(hotelId);
  const images = await hotelModel.getHotelImages(hotelId);
  // console.log("酒店详情数据：", hotelId, hotel, images);
  if (!hotel) return null;
  return {
    name: hotel.name,
    rating: hotel.star_level,
    address: `${hotel.city} ${hotel.district} ${hotel.address}`,
    score: hotel.score,
    scoreText: getScoreText(hotel.score),
    description: hotel.description,
    reviewCount: hotel.reviews,

    images: images.map((i) => i.url),

    // JSON字段直接解析
    facilities: parseFacilities(hotel.facilities),
  };
};

const getHotelRooms = async (hotelId, data) => {
  const { checkIn, checkOut, rooms, adults, children } = data;
  if (!checkIn || !checkOut || !rooms) return [];
  const roomsData = await hotelModel.getHotelRooms(hotelId, checkIn, checkOut, rooms, adults, children);
  return roomsData;
};

const getRoomAvailability = async (data) => {
  const { roomTypeId, checkIn, checkOut } = data;
  if (!roomTypeId || !checkIn || !checkOut) return [];
  const availability = await hotelModel.getRoomAvailability(roomTypeId, checkIn, checkOut);
  return availability;
};

module.exports = {
  getHotelList,
  getHotelDetail,
  getHotelRooms,
  getRoomAvailability
};
