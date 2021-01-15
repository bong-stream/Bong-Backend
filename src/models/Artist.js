const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const ArtistSchema = new mongoose.Schema({
  albums: { type: Array, required: true },
  songs: { type: Array, required: true },
  artistname: { type: String, required: true },
  artistimage: { type: String, required: true },
  artistlikes: { type: Number },
  lastname: String,
  dob: String,
  city: String,
  country: String,
  active: { type: "boolean", default: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

mongoose.model("Artist", ArtistSchema);
