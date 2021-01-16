const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

// const Popular = mongoose.model("Trending");
const Bongplaylist = require("../models/Bongplaylist");

const router = express.Router();

router.get("/", async (req, res) => {
  //   res.send("i am trending");
  const bongplaylist = await Bongplaylist.find({});

  res.send(bongplaylist);
});

router.post("/", async (req, res) => {
  const bongplaylist = req.body.bongplaylist;

  try {
    const bongplaylistres = new Bongplaylist(bongplaylist);
    await bongplaylistres.save();
    res.send(bongplaylistres);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  let { bongplaylist, active } = req.body;
  let id = "600163cb4e28412b9453ca34";

  if (bongplaylist === null || active === null) {
    bongplaylist = [];
    active = true;
  }

  try {
    Bongplaylist.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ bongplaylist, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Bongplaylist.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                bongplaylist: foundList.bongplaylist,
                active: foundList.active,
              });
              return foundList;
            });
          }
        });
      }
    });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
