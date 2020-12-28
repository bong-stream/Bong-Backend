const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const TrendingSchema = new mongoose.Schema({
  trending: { type: Array, required: true },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Trending = mongoose.model("Trending", TrendingSchema);

module.exports = Trending;
