const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const RecommendedSchema = new mongoose.Schema({
  recommended: { type: Array, required: true },
  active: { type: Boolean, default: true },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Recommended = mongoose.model("Recommended", RecommendedSchema);

module.exports = Recommended;
