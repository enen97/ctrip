const cityService = require("../services/cityService");
const hotelService = require("../services/hotelService");
const weatherService = require("../services/weatherService");
const { success, error } = require("../utils/response");

const getRecommendCitys = async (req, res) => {
  try {
    const cityList = await cityService.getRecommendCityList();
    // 遍历所有城市
    const dataWithWeather = await Promise.all(
      cityList.map(async (city) => {
        try {
          const coords = await weatherService.getCoordsByAddress(city.name);
          const weatherData = await weatherService.getWeatherByLocation(coords);
          // 提取今日的高低温：例如 "14℃~18℃"
          const today = weatherData.forecasts[0];
          const weatherString = `${today.low}℃~${today.high}℃`;
          const allHotels = await hotelService.getHotelList(city.name);
          // 截取前三个酒店
          const topThreeHotels = allHotels.slice(0, 3);
          return {
            id: city.id,
            city: city.name,
            image: city.image,
            weather: weatherString,
            hotels: topThreeHotels,
          };
        } catch (e) {
          console.error(`聚合城市 ${city.name} 数据失败:`, e.message);
          // 如果天气接口报错，给个默认值或 null，保证城市列表依然能显示
          return { ...city, weather: "N/A", hotels: [] };
        }
      }),
    );
    res.json(success(dataWithWeather));
  } catch (err) {
    console.error(err);
    res.json(error("服务器错误"));
  }
};

const test = async () => {
  console.log("测试数据库连接...", process.env);
};

module.exports = {
  getRecommendCitys,
  test,
};
