const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Labels = require("../models/Labels");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const labels = await Labels.find();

  res.send(labels);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const labels = await Labels.findOne({ _id: id });
  res.send(labels);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  // console.log(genresname, genresimage, songs);
  console.log(name);

  if (!name) {
    console.log("helo");
    return res.status(422).send({ error: "You must provide a name" });
  }

  try {
    const labels = new Labels({
      name,
    });
    labels.save();
    res.status(201).json(labels);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { name, id } = req.body;

  Labels.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          name,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            Labels.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                name: foundUpdatedEvent.name,
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

router.delete("/", (req, res, next) => {
  const { id } = req.body;

  Labels.findById(id, (err, labels) => {
    try {
      labels.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            id: id,
          });
        }
      });
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

module.exports = router;
