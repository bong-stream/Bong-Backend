const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

// const Trending = mongoose.model("Trending");
const Trending = require("../models/Trending");

const router = express.Router();

router.get("/", async (req, res) => {
  //   res.send("i am trending");
  const trending = await Trending.find({});

  res.send(trending);
});

router.post("/", async (req, res) => {
  const trending = req.body;

  try {
    const trendingList = new Trending(trending);
    await trendingList.save();
    console.log(trendingList);
    res.send(trendingList);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const trending = req.body;
  let id = "5fe897a108b02e18e454133a";

  //   console.log(trending);

  try {
    Trending.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ trending }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Trending.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                trending: foundList.trending,
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
