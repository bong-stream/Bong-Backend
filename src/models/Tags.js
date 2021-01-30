const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const TagsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

var Tags = mongoose.model("Tags", TagsSchema);

module.exports = Tags;
