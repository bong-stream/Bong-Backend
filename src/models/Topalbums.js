const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const TopalbumsSchema = new mongoose.Schema({
  topalbums: { type: Array, required: true },
  active: { type: Boolean, default: true },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Topalbums = mongoose.model("Topalbums", TopalbumsSchema);

module.exports = Topalbums;
