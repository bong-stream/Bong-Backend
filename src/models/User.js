const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosastic = require('mongoosastic');

const songs = new mongoose.Schema({
  songid: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
});

const userSchema = new mongoose.Schema({
  name: {type: String,required: true,},
  email: {type: String,unique: true,required: true},
  password: {type: String,required: true},
  age: { type: String, required: true },
  gender: { type: String, required: true },
  songs:{type:Array,required:false}
});



//userSchema.plugin(mongoosastic);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
