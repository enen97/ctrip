const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

router.get("/citys", cityController.getRecommendCitys);
router.get("/test", cityController.test);

module.exports = router;
