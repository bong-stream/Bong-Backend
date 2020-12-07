const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find({}, "-password");

  res.send(user);
});

router.delete("/", async (req, res) => {
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  User.findById(id, (err, event) => {
    try {
      event.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            message: "USer Deleted Successfully",
            id: id,
          });
        }
      });
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

module.exports = router;
