const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Album = mongoose.model("Album");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const album = await Album.find();

  res.send(album);
});

router.post("/", async (req, res) => {
  const {
    albumname,
    albumimage,
    artists,
    songs,
    tracks,
    category,
    genres,
    duration,
    relatedalbums,
    otheralbums,
    poets,
    mixmaster,
    producer,
    label,
    year,
    summary,
  } = req.body;

  console.log({
    albumname,
    albumimage,
    artists,
    songs,
    tracks,
    category,
    genres,
    duration,
    relatedalbums,
    otheralbums,
    poets,
    mixmaster,
    producer,
    label,
    year,
    summary,
  });

  if (!albumname || !albumimage) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  try {
    const album = new Album({
      albumname,
      albumimage,
      artists,
      songs,
      tracks,
      category,
      genres,
      duration,
      relatedalbums,
      otheralbums,
      poets,
      mixmaster,
      producer,
      label,
      year,
      summary,
    });
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const {
    albumname,
    albumimage,
    artists,
    songs,
    tracks,
    category,
    genres,
    duration,
    relatedalbums,
    otheralbums,
    poets,
    mixmaster,
    producer,
    label,
    year,
    summary,
    id,
  } = req.body;
  console.log(id);

  Album.findById(id, (err, album) => {
    try {
      album.updateOne(
        {
          albumname,
          albumimage,
          artists,
          songs,
          tracks,
          category,
          genres,
          duration,
          relatedalbums,
          otheralbums,
          poets,
          mixmaster,
          producer,
          label,
          year,
          summary,
        },
        (err, updatedalbum) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("yoooooo");
            Album.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                albumname: foundUpdatedEvent.albumname,
                albumimage: foundUpdatedEvent.albumimage,
                artists: foundUpdatedEvent.artists,
                songs: foundUpdatedEvent.songs,
                tracks: foundUpdatedEvent.tracks,
                genres: foundUpdatedEvent.genres,
                duration: foundUpdatedEvent.duration,
                poets: foundUpdatedEvent.poets,
                mixmaster: foundUpdatedEvent.mixmaster,
                producer: foundUpdatedEvent.producer,
                label: foundUpdatedEvent.label,
                year: foundUpdatedEvent.year,
                summary: foundUpdatedEvent.summary,
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
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  Album.findById(id, (err, album) => {
    console.log(id);
    console.log(album);
    try {
      album.remove((err) => {
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
