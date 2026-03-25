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


module.exports = {
  getHotels,
};
