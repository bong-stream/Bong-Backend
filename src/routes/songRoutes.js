const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Song= mongoose.model('Song');

const router = express.Router();

const fileupload=require('../midlewares/fileUpload');

//router.use(requireAuth);

router.get('/song' ,async (req, res) => {
  const song = await Song.find({});

  res.send(song);
});

router.post('/song',fileupload.single('songimage'), async (req, res) => {
  const { songname,songlikes,noofplays } = req.body;

  if (!songname ) {
    return res
      .status(422)
      .send({ error: 'You must provide a name,image' });
  }

  try {
    const song = new Song({ songname, songimage:req.file.path, songlikes,noofplays});
    await song.save();
    res.send(song);
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

router.put("/",fileupload.single('songimage'), async (req, res) => {
  const { songname, songlikes,noofplays,id } = req.body;
  console.log(songname,id);

  Song.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          songname, songimage:req.file.path, songlikes,noofplays,
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
                songname:foundUpdatedEvent.songname
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
