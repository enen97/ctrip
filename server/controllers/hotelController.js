const Hotel = require('../models/hotelModel')

// 获取所有酒店 （支持状态筛选，如：/api/hotels?status=1）
exports.getHotels = async (req, res) => {
    try {
        const { status } = req.query
        const query = status ? { status } : {}
        const hotels = await Hotel.find(query)
        res.status(200).json({ success: true, data: hotels })
    } catch (e) {
        res.status(500).json({ success: false, message: '服务器错误' })
    }
}


// 更新酒店审核状态
exports.updateHotelStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const updatedHotel = await Hotel.findByIdAndUpdate(id, { status }, { new: true })
        res.status(200).json({ success: true, data: updatedHotel })
    } catch (e) {
        res.status(500).json({ success: false, message: '更新失败' })
    }
}