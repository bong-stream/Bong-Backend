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

router.get("/play/:id", (req, res) => {
  const space = " hello";
  let isFinished = false;
  let isDataSent = false;
  let db = req.app.get("db");

  try {
    var trackID = new ObjectID(req.params.id);
  } catch (err) {
    return res.status(400).json({
      message:
        "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters",
    });
  }

  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: "songs",
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.

        // if (!res.headersSent) {
        //   res.writeHead(202);
        // }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  downloadStream.on("data", (chunk) => {
    if (chunk) {
      isDataSent = true;
    }
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });

  waitAndSend();
});

router.post("/", upload.single("file"), async (req, res) => {
  let {
    songname,
    songimage,
    artists,
    genres,
    lyrics,
    poet,
    relatedSongs,
    mixmaster,
    producer,
    year,
    summary,
    label,
  } = req.body;
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

  try {
    const song = new Song({
      songname,
      songimage,
      artists,
      genres,
      lyrics,
      poet,
      relatedSongs,
      mixmaster,
      producer,
      year,
      summary,
      label,
      fileid,
    });
    await song.save();
    res.send(song);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  let db = req.app.get("db");

  Song.findById(id, (err, event) => {
    // console.log(db);

    // console.log(deleteStream);
    try {
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: "songs",
      });

      const obj_id = new mongoose.Types.ObjectId(event.fileid);

      event.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          bucket.delete(obj_id);
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
  const {
    songname,
    songimage,
    artists,
    genres,
    lyrics,
    poet,
    relatedSongs,
    mixmaster,
    producer,
    year,
    summary,
    label,
    id,
  } = req.body;

  Song.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          songname,
          songimage,
          artists,
          genres,
          lyrics,
          poet,
          relatedSongs,
          mixmaster,
          producer,
          year,
          summary,
          label,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("Song Updated");
            Song.findById(id, (err, foundUpdatedEvent) => {
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
