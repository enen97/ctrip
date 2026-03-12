// const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }, //库存
})

module.exports = mongoose.model('Room', roomSchema)