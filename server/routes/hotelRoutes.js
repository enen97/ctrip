// 仅负责映射路径和指定中间件

const express = require('express')
const router = express.Router()

const hotelController = require('../controllers/hotelController')

// 引入认证中间件
const { protect } = require('../middleware/authMiddleware')

// 获取所有酒店
router.get('/', hotelController.getHotels)

// 更新酒店审核状态  只有管理员（携带合法token） 才能进行更新操作
router.put('/:id/status', protect, hotelController.updateHotelStatus)

module.exports = router