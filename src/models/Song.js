const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const SongsSchema = new mongoose.Schema({
  albumid: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },

  songname: { type: String, required: true },
  songimage: { type: String, required: true },
  artists: { type: Array },
  songlikes: { type: Number },
  noofplays: { type: Number },
  fileid: { type: String },

  __v: { type: Number, select: false },
});

//SongsSchema.plugin(mongoosastic);

mongoose.model("Song", SongsSchema);
