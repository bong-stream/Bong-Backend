const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

// const Popular = mongoose.model("Trending");
const Popular = require("../models/Popular");

const router = express.Router();

router.get("/", async (req, res) => {
  //   res.send("i am trending");
  const popular = await Popular.find({});

  res.send(popular);
});

router.post("/", async (req, res) => {
  const popular = req.body;

  try {
    const popularList = new Popular(popular);
    await popularList.save();
    console.log(popularList);
    res.send(popularList);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  let { popular, active } = req.body;
  let id = "5fef345663cb1e3a1cd36877";

  //   console.log(trending);
  if (popular === null) {
    popular = [];
  } else if (active === null) {
    active = true;
  }

  try {
    Popular.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ popular, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Popular.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                popular: foundList.popular,
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
