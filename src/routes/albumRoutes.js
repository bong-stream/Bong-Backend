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
  const { albumname, albumimage } = req.body;

  if (!albumname || !albumimage) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  try {
    const album = new Album({ albumname, albumimage });
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  const { albumname, albumimage, id } = req.body;
  console.log(id);

  Album.findById(id, (err, album) => {
    try {
      album.updateOne(
        {
          albumname,
          albumimage,
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
