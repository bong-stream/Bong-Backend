const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const TopchartsSchema = new mongoose.Schema({
  topcharts: { type: Array, required: true },
  active: { type: Boolean, default: true },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Topcharts = mongoose.model("Topcharts", TopchartsSchema);

module.exports = Topcharts;
