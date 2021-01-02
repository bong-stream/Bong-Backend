const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const PopularSchema = new mongoose.Schema({
  popular: { type: Array, required: true },
  active: { type: Boolean, default: true },
  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Popular = mongoose.model("Popular", PopularSchema);

module.exports = Popular;
