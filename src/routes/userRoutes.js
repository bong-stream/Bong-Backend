const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const requireAuth = require("../midlewares/requireAuth");
const User = mongoose.model("User");

const router = express.Router();

router.get("/current",requireAuth,async(req,res)=>{
  //console.log(req.user)
  const user=req.user;
  res.send(user)
})

router.get("/", async (req, res) => {
  const user = await User.find({}, "-password");

  res.send(user);
});

router.delete("/", async (req, res) => {


  const { id } = req.body;
  

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

router.put("/", async (req, res) => {
  const { name,email,password,age,gender,id } = req.body;
  console.log(name,id);

  User.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          name,email,password,age,gender,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("Song Updated");
            User.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                name:foundUpdatedEvent.name
              });
              return foundUpdatedEvent;
            });
          }
        }
      );
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

module.exports = router;
