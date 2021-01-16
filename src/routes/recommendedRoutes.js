const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

// const Popular = mongoose.model("Trending");
const Recommended = require("../models/Recommended");

const router = express.Router();

router.get("/", async (req, res) => {
  //   res.send("i am trending");
  const recommended = await Recommended.find({});

  res.send(recommended);
});

router.post("/", async (req, res) => {
  const recommended = req.body;

  try {
    const recommendedList = new Recommended(recommended);
    await recommendedList.save();
    res.send(recommendedList);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  let { recommended, active } = req.body;
  let id = "5ff02931d5bda33c4044e162";

  if (recommended === null) {
    recommended = [];
  } else if (active === null) {
    active = true;
  }
  try {
    Recommended.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ recommended, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Recommended.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                recommended: foundList.recommended,
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
