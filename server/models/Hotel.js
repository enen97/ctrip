const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  starRating: Number,
  status: { type: Number, default: 0 }, // 0: 审核中, 1: 已发布, 2: 下线
  createdAt: { type: Date, default: Date.now },
});
