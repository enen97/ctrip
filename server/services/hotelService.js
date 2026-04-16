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
  const roomsData = await hotelModel.getHotelRooms(
    hotelId,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
  );
  return roomsData;
};

const getRoomAvailability = async (data) => {
  const { roomTypeId, checkIn, checkOut } = data;
  if (!roomTypeId || !checkIn || !checkOut) return [];
  const availability = await hotelModel.getRoomAvailability(
    roomTypeId,
    checkIn,
    checkOut,
  );
  return availability;
};

const searchHotels = async (filterData) => {
  const {
    city,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
    priceMin,
    priceMax,
    level,
    keyword,
  } = filterData || {};
  // 兼容前端可能传来的 filters 或 filters[] (axios 默认配置)
  const filters = filterData.filters || filterData["filters[]"];

  const levels = [];
  let scoreMin = 0;
  let reviewsMin = 0;
  let facilities = "";

  // 解析首页传来的 level 字符串 (如 "三星、五星")
  if (level && level !== "不限") {
    const levelMap = { 一星: 1, 二星: 2, 三星: 3, 四星: 4, 五星: 5 };
    level.split("、").forEach((l) => {
      if (levelMap[l]) levels.push(levelMap[l]);
    });
  }

  // 解析列表页传来的 filters 数组/字符串
  let filterList = [];
  if (Array.isArray(filters)) {
    filterList = filters;
  } else if (typeof filters === "string") {
    filterList = filters.split(",");
  }

  filterList.forEach((f) => {
    const [type, value] = f.split("-");
    if (type === "分数") {
      const score = parseFloat(value);
      if (!isNaN(score) && score > scoreMin) scoreMin = score;
    } else if (type === "点评数") {
      const reviews = parseInt(value);
      if (!isNaN(reviews) && reviews > reviewsMin) reviewsMin = reviews;
    } else if (type === "设施服务") {
      facilities = value;
    }
  });

  console.log(
    "解析后的参数：",
    city,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
    priceMin,
    priceMax,
    levels,
    keyword,
    scoreMin,
    reviewsMin,
    facilities,
  );

  const data = await hotelModel.searchHotels({
    city,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
    priceMin,
    priceMax,
    levels,
    keyword,
    scoreMin,
    reviewsMin,
    facilities,
  });

  return {
    list: data.map((item) => ({
      id: item.id,
      name: item.name,
      star: item.star_level,
      score: item.score,
      totalPrice: item.price,
      minPrice: item.min_price,
      mainImg: item.mainImg,
      address: `${item.district || ""} · ${item.address || ""}`,
      recommendText: item.recommend_text || "超棒酒店",
      commentCount: item.reviews || 0,
      isAd: item.is_ad || false,
    })),
    total: data.length,
  };
};

module.exports = {
  getHotelList,
  searchHotels,
  getHotelDetail,
  getHotelRooms,
  getRoomAvailability,
};
