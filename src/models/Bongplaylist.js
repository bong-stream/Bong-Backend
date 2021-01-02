const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const BongplaylistSchema = new mongoose.Schema({
  bongplaylist: { type: Array, required: true },
  active: { type: Boolean, default: true },

  __v: { type: Number, select: false },
});

// TrendingSchema.plugin(mongoosastic);

var Bongplaylist = mongoose.model("Bongplaylist", BongplaylistSchema);

module.exports = Bongplaylist;
