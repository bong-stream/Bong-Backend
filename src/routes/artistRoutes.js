const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../midlewares/requireAuth");

const Artist = mongoose.model("Artist");

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const artist = await Artist.find();

  res.send(artist);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const artist = await Artist.findOne({ _id: id });
  res.send(artist);
});

router.post("/", async (req, res) => {
  const {
    artistname,
    artistimage,
    dob,
    city,
    country,
    lastname,
  } = req.body.data;
  const albums = req.body.albums;
  const songs = req.body.songs;

  if (!artistname || !artistimage) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  try {
    const artist = new Artist({
      artistname,
      artistimage,
      dob,
      city,
      country,
      lastname,
      albums,
      songs,
    });
    artist.save();
    res.status(201).json(artist);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const {
    artistname,
    artistimage,
    dob,
    city,
    country,
    lastname,
    id,
    albums,
    songs,
  } = req.body;

  Artist.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          artistname,
          artistimage,
          dob,
          city,
          country,
          lastname,
          albums,
          songs,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            Artist.findById(id, (err, foundUpdatedEvent) => {
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                artistname: foundUpdatedEvent.artistname,
                artistimage: foundUpdatedEvent.artistimage,
                albums: foundUpdatedEvent.albums,
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

  Artist.findById(id, (err, artist) => {
    try {
      artist.remove((err) => {
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

router.put("/activeartists", async (req, res) => {
  const { active, id } = req.body;

  Artist.findById(id, (err, event) => {
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
            Artist.findById(id, (err, foundUpdatedEvent) => {
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
