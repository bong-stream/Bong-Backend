const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const GenresSchema = new mongoose.Schema({
  genresname: { type: String, required: true },
  genresimage: { type: String, required: true },
  songs: { type: Array, required: true },
  active: { type: "boolean", default: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

var Genres = mongoose.model("Genres", GenresSchema);

module.exports = Genres;
