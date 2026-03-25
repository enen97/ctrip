const axios = require("axios");
const config = require("../config/baidu.js");

/**
 * 将城市名转换为经纬度 (Geocoding)
 */
const getCoordsByAddress = async (address) => {
  const response = await axios.get(config.GEO_API_URL, {
    params: {
      address: address,
      output: "json",
      ak: config.BAIDU_AK,
    },
  });

  if (response.data.status !== 0) {
    throw new Error(`地理编码失败: ${response.data.message}`);
  }
  return response.data.result.location; // 返回 { lng, lat }
};

/**
 * 根据经纬度获取天气
 */
const getWeatherByLocation = async (location) => {
  const response = await axios.get(config.WEATHER_API_URL, {
    params: {
      location: `${location.lng},${location.lat}`,
      data_type: "fc",
      ak: config.BAIDU_AK,
    },
  });

  if (response.data.status !== 0) {
    throw new Error(`天气查询失败: ${response.data.message}`);
  }
  return response.data.result;
};

module.exports = {
  getCoordsByAddress,
  getWeatherByLocation,
};
