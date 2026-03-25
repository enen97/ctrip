const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.post("/hotels", hotelController.getHotels);

module.exports = router;
