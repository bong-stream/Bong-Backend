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
  let { trending, active } = req.body;
  let id = "5fef33fcfc460b3dacbb81c2";

  //   console.log(trending);
  if (trending === null || active === null) {
    trending = [];
    active = true;
  }

  try {
    Trending.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ trending, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Trending.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                trending: foundList.trending,
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
