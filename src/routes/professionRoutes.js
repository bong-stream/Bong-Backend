const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Profession = require("../models/Profession");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const profession = await Profession.find();

  res.send(profession);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const profession = await Profession.findOne({ _id: id });
  res.send(profession);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  // console.log(genresname, genresimage, songs);

  if (!name) {
    return res.status(422).send({ error: "You must provide a name" });
  }

  try {
    const profession = new Profession({
      name,
    });
    profession.save();
    res.status(201).json(profession);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { name, id } = req.body;

  Profession.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          name,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            Profession.findById(id, (err, foundUpdatedEvent) => {
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

  Profession.findById(id, (err, profession) => {
    try {
      profession.remove((err) => {
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
