const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const ProfessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

var Profession = mongoose.model("Profession", ProfessionSchema);

module.exports = Profession;
