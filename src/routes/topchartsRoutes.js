const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Topcharts = require("../models/Topcharts");

const router = express.Router();

router.get("/", async (req, res) => {
  const topcharts = await Topcharts.find({});

  res.send(topcharts);
});

router.post("/", async (req, res) => {
  const { topchart, name } = req.body;
  //   console.log(top20, top50, top100);
  //   console.log(req.body);

  try {
    const topcharts = new Topcharts({ topchart, name });
    await topcharts.save();
    console.log(topcharts);
    res.send(topcharts);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { topchart, id, name } = req.body;
  //   let id = "5fe8d77ebfedc943602cf95c";

  console.log(topchart, id, name);

  try {
    Topcharts.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ topchart }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Topcharts.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                topchart: foundList.topchart,
                name: foundList.name,
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
