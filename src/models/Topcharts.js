const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const TopchartsSchema = new mongoose.Schema({
  topchart: { type: Array, required: true },
  name: String,
  active: { type: Boolean },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Topcharts = mongoose.model("Topcharts", TopchartsSchema);

module.exports = Topcharts;
