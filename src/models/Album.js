const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const AlbumSchema = new mongoose.Schema({
  artists: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  albumname: { type: String, required: true },
  albumimage: { type: String, required: true },
  albumlikes: { type: Number },
  songs: { type: Array, required: true },
  tracks: String,
  category: String,
  genres: String,
  duration: Number,
  relatedalbums: Array,
  otheralbums: Array,
  poets: String,
  mixmaster: String,
  producer: String,
  label: String,
  year: String,
  summary: String,

  __v: { type: Number, select: false },
});

//AlbumSchema.plugin(mongoosastic);

mongoose.model("Album", AlbumSchema);
