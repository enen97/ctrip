const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

router.get("/citys", cityController.getRecommendCitys);

module.exports = router;
