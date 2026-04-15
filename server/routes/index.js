const express = require("express");
const router = express.Router();

const hotelRoutes = require("./hotelRoutes");
const cityRoutes = require("./cityRoutes");
const weatherRoutes = require("./weatherRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

// 统一分发
router.use("/", hotelRoutes);
router.use("/", cityRoutes);
router.use("/", weatherRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);

module.exports = router;
