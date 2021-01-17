const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Genres = require("../models/Genres");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const genres = await Genres.find();

  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const genres = await Genres.findOne({ _id: id });
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { genresname, genresimage, songs } = req.body;
  // console.log(genresname, genresimage, songs);

  if (!genresname || !genresimage) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  try {
    const genres = new Genres({
      genresname,
      genresimage,
      songs,
    });
    genres.save();
    res.status(201).json(genres);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { genresname, genresimage, songs, id } = req.body;

  Genres.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          genresname,
          genresimage,
          songs,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            Genres.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                genresname: foundUpdatedEvent.genresname,
                genresimage: foundUpdatedEvent.genresimage,
                songs: foundUpdatedEvent.songs,
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

  Genres.findById(id, (err, genres) => {
    try {
      genres.remove((err) => {
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

router.put("/activegenres", async (req, res) => {
  const { active, id } = req.body;

  Genres.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          active,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("Updated");
            Genres.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                active: foundUpdatedEvent.active,
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

module.exports = router;
