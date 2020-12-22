const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const SongsSchema = new mongoose.Schema({
  albumid: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  artistid: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" },
  songname: { type: String, required: true },
  songimage: { type: String, required: true },
  songlikes: { type: Number },
  noofplays: { type: Number },
  __v: { type: Number, select: false },
});

//SongsSchema.plugin(mongoosastic);

mongoose.model("Song", SongsSchema);
