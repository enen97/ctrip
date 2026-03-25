const express = require("express");
const router = express.Router();

const hotelRoutes = require("./hotelRoutes");
const cityRoutes = require("./cityRoutes");
const weatherRoutes = require("./weatherRoutes");

// 统一分发
router.use("/", hotelRoutes);
router.use("/", cityRoutes);
router.use("/", weatherRoutes);

module.exports = router;
