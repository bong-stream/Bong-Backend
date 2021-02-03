const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const SocialmediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

var Socialmedia = mongoose.model("Socialmedia", SocialmediaSchema);

module.exports = Socialmedia;
