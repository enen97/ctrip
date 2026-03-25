const weatherService = require("../services/weatherService");
const { success, error } = require("../utils/response");

const queryByCityName = async (req, res) => {
  try {
    const { cityName } = req.query; // 假设通过 ?cityName=重庆 传入

    if (!cityName) {
      return res.status(400).json({ code: 400, msg: "城市名称不能为空" });
    }

    // 步骤1: 转换经纬度
    const coords = await weatherService.getCoordsByAddress(cityName);

    // 步骤2: 获取天气
    const weatherData = await weatherService.getWeatherByLocation(coords);

    // 返回标准格式
    res.json(
      success({
        code: 200,
        msg: "success",
        data: {
          city: cityName,
          coords: coords,
          weather: weatherData,
        },
      }),
    );
  } catch (err) {
    console.error("Weather Query Error:", err.message);
    res.json(error("服务器内部错误"));
  }
};

module.exports = {
  queryByCityName,
};
