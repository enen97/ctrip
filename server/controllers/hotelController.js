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


module.exports = {
  getHotels,
  getHotelDetail,
  getHotelRooms,
  getRoomAvailability,
  searchHotels
};
