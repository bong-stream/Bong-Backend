const mongoose = require("mongoose");
const mongoosastic = require('mongoosastic');

const ArtistSchema = new mongoose.Schema({
  artistname: { type: String, required: true },
  artistimage: { type: String, required: true },
  artistlikes: { type: Number },
<<<<<<< Updated upstream
=======

  // __v: { type: Number, select: false },
>>>>>>> Stashed changes
});

//ArtistSchema.plugin(mongoosastic);

mongoose.model("Artist", ArtistSchema);
