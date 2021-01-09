const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

const EmailotpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  //   verified: { type: Boolean, default: false },
});

//AlbumSchema.plugin(mongoosastic);

// mongoose.model("Emailotp", EmailotpSchema);
var Emailotp = mongoose.model("Emailotp", EmailotpSchema);

module.exports = Emailotp;
