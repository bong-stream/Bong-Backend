const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

// const Popular = mongoose.model("Trending");
const Topalbums = require("../models/Topalbums");

const router = express.Router();

router.get("/", async (req, res) => {
  //   res.send("i am trending");
  const topalbums = await Topalbums.find({});

  res.send(topalbums);
});

router.post("/", async (req, res) => {
  const topalbums = req.body;

  try {
    const topalbumsres = new Topalbums(topalbums);
    await topalbumsres.save();
    console.log(topalbumsres);
    res.send(topalbumsres);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { topalbums, active } = req.body;
  let id = "5ff02a0e0fb98141144b32fc";

  //   console.log(trending);

  try {
    Topalbums.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ topalbums, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Topalbums.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                topalbums: foundList.topalbums,
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
