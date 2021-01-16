const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

// const Popular = mongoose.model("Trending");
const Topartists = require("../models/Topartists");

const router = express.Router();

router.get("/", async (req, res) => {
  //   res.send("i am trending");
  const topartists = await Topartists.find({});

  res.send(topartists);
});

router.post("/", async (req, res) => {
  const topartists = req.body;

  try {
    const topartistslist = new Topartists(topartists);
    await topartistslist.save();
    console.log(topartistslist);
    res.send(topartistslist);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  let { topartists, active } = req.body;
  let id = "5ff0299610fec41c480b67a4";

  //   console.log(trending);
  if (topartists === null || active === null) {
    topartists = [];
    active = true;
  }

  try {
    Topartists.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ topartists, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Topartists.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                topartists: foundList.topartists,
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
