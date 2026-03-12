const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    starRating: { type: Number, min: 1, max: 5 },
    description: String,
    images: [String], // 图片数组 存放url
    status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0：审核中 1：已发布 2：已下架
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Hotel', hotelSchema)