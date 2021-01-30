const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const LabelsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

//ArtistSchema.plugin(mongoosastic);

var Labels = mongoose.model("Labels", LabelsSchema);

module.exports = Labels;
