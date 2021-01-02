const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const TopartistsSchema = new mongoose.Schema({
  topartists: { type: Array, required: true },
  active: { type: Boolean, default: true },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Topartists = mongoose.model("Topartists", TopartistsSchema);

module.exports = Topartists;
