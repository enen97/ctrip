const cityModel = require("../models/cityModel");

const getRecommendCityList = async () => {
  const data = await cityModel.getTopCitys();
  return data;
};

module.exports = {
  getRecommendCityList,
};
