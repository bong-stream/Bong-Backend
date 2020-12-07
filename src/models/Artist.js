const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  artistname: { type: String, required: true },
  artistimage: { type: String, required: true },
  artistlikes: { type: Number },
});

mongoose.model("Artist", ArtistSchema);
