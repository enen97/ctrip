const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.post("/hotels", hotelController.getHotels);
router.get("/hotels/search", hotelController.searchHotels);
router.get("/hotels/searchbyname", hotelController.getHotelByName);
router.get("/hotels/:id", hotelController.getHotelDetail);
router.post("/hotels/:id/rooms", hotelController.getHotelRooms);
router.post("/rooms/availability", hotelController.getRoomAvailability);

module.exports = router;
