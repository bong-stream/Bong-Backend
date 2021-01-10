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
  console.log(artist);
  res.send(artist);
});

router.post("/", async (req, res) => {
  const { artistname, artistimage } = req.body.data;
  const albums = req.body.albums;
  const songs = req.body.songs;
  console.log("we are songs", req.body.songs);
  console.log(artistname, artistimage, albums, songs);

  if (!artistname || !artistimage) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  try {
    const artist = new Artist({ artistname, artistimage, albums, songs });
    console.log(artist);
    artist.save();
    console.log(artist);
    res.status(201).json(artist);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { artistname, artistimage, id, albums, songs } = req.body;
  console.log(albums, id);

  Artist.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          artistname,
          artistimage,
          albums,
          songs,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("yoooooo");
            Artist.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
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
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  Artist.findById(id, (err, artist) => {
    console.log(id);
    console.log(artist);
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

module.exports = router;
