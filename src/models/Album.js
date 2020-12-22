const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const AlbumSchema = new mongoose.Schema({
  artists: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  albumname: { type: String, required: true },
  albumimage: { type: String, required: true },
  albumlocation: { type: String },
  albumlikes: { type: Number },
  songs: { type: Array, required: true },

  __v: { type: Number, select: false },
});

//AlbumSchema.plugin(mongoosastic);

mongoose.model("Album", AlbumSchema);
