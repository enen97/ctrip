const hotelService = require("../services/hotelService");
const { success, error } = require("../utils/response");

const getHotels = async (req, res) => {
  try {
    const { address } = req.body;
    const data = await hotelService.getHotelList(address);
    res.json(success(data));
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

const getHotelDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await hotelService.getHotelDetail(id);
    if (!data) {
      res.json(error("酒店不存在"));
    } else {
      res.json(success(data));
    }
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

const getHotelRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await hotelService.getHotelRooms(id, req.body);
    res.json(success(data));
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

const getRoomAvailability = async (req, res) => {
  try {
    const data = await hotelService.getRoomAvailability(req.body);
    res.json(success(data));
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

const searchHotels = async (req, res) => {
  console.log("searchHotels controller hit");
  try {
    console.log("Query Params:", req.query);
    const data = await hotelService.searchHotels(req.query);
    res.json(success(data));
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

const getHotelByName = async (req, res) => {
  try {
    const { name } = req.query; // 从查询参数获取名称，例如 /api/hotel?name=栖欢
    if (!name) {
      return res.status(400).json({ code: 400, message: "请输入酒店名称" });
    }

    const data = await hotelService.searchHotelsByName(name);
    res.json(success(data));
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

module.exports = {
  getHotels,
  getHotelDetail,
  getHotelRooms,
  getRoomAvailability,
  searchHotels,
  getHotelByName,
};
