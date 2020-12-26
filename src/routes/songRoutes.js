const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const { Readable } = require("stream");
const { v4: uuidv4 } = require("uuid");
const requireAuth = require("../midlewares/requireAuth");
const fileupload = require("../midlewares/fileUpload");

const Song = mongoose.model("Song");
const upload = multer();

const router = express.Router();

//router.use(requireAuth);

router.get("/", async (req, res) => {
  const song = await Song.find({});

  res.send(song);
});

router.post("/", upload.single("file"), async (req, res) => {
  let { songname, songimage, artists } = req.body;
  const yoo = artists.split(",");

  artists = yoo;

  let db = req.app.get("db");

  const readableTrackStream = new Readable();
  readableTrackStream.push(req.file.buffer);
  readableTrackStream.push(null);

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: "songs",
  });

  let uploadStream = bucket.openUploadStream(songname);
  let fileid = uploadStream.id;
  readableTrackStream.pipe(uploadStream);

  uploadStream.on("error", () => {
    return res.status(500).json({ message: "Error uploading file" });
  });

  uploadStream.on("finish", () => {
    console.log("done");
    // return res.status(201).json({
    //   message:
    //     "File uploaded successfully, stored under Mongo ObjectID: " + fileid,
    // });
  });

  if (!songname) {
    return res.status(422).send({ error: "You must provide a name,image" });
  }

  console.log(songname, songimage, artists, fileid);

  try {
    const song = new Song({ songname, songimage, artists, fileid });
    await song.save();
    console.log(song);
    // res.send(song);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;

  Song.findById(id, (err, event) => {
    try {
      event.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            message: "Song Deleted Successfully",
            id: id,
          });
        }
      });
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

router.put("/", fileupload.single("songimage"), async (req, res) => {
  const { songname, songimage, id, artists } = req.body;
  console.log(songname, id, songimage, artists);

  Song.findById(id, (err, event) => {
    console.log(event);
    try {
      event.updateOne(
        {
          songname,
          songimage,
          artists,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("Song Updated");
            Song.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                songname: foundUpdatedEvent.songname,
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
