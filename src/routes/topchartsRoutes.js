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
  const { topcharts, active } = req.body;
  //   console.log(top20, top50, top100);
  //   console.log(req.body);

  try {
    const topchartsList = new Topcharts({ topcharts, active });
    await topchartsList.save();
    console.log(topchartsList);
    res.send(topchartsList);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  let { topcharts, active } = req.body;
  let id = "6001643b0d7ac602e4291918";

  if (topcharts === null || active === null) {
    topcharts = [];
    active = true;
  }

  try {
    Topcharts.findById(id, (err, foundList) => {
      if (err) {
        res.send(err);
      } else {
        foundList.updateOne({ topcharts, active }, (err, updatedList) => {
          if (err) {
            res.send({ message: "error updating list" });
          } else {
            Topcharts.findById(id, (err, foundList) => {
              res.status(201).json({
                message: "Updated List",
                id: foundList._id,
                topcharts: foundList.topcharts,
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
