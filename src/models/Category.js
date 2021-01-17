const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const CategorySchema = new mongoose.Schema({
  categoryname: { type: String, required: true },
  categoryimage: { type: String, required: true },
  songs: { type: Array, required: true },
  active: { type: "boolean", default: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
