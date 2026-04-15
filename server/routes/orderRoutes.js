const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/notify", orderController.handleNotify);
router.get("/status/:orderNo", orderController.getOrderStatus);
router.get("/list", orderController.getUserOrders);
router.get("/search", orderController.searchUserOrders);
router.delete("/delete", orderController.deleteOrder);

module.exports = router;
