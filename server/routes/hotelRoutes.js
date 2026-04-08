const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.post("/hotels", hotelController.getHotels);
router.get("/hotels/:id", hotelController.getHotelDetail);

module.exports = router;
