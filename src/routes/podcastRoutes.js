const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Podcast= mongoose.model('Podcast');

const router = express.Router();

//router.use(requireAuth);

router.get('/', async (req, res) => {
  const podcast = await Podcast.find();

  res.send(podcast);
});

router.post('/', async (req, res) => {
  const { podname, podimage,podlikes,noofplays } = req.body;

  if (!podname || !podimage ) {
    return res
      .status(422)
      .send({ error: 'You must provide a name,image' });
  }

  try {
    const podcast = new Podcast({ podname, podimage, podlikes,noofplays});
    await podcast.save();
    res.send(podcast);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/", async (req, res) => {


  const { id } = req.body;
  

 Podcast.findById(id, (err, event) => {
    try {
      event.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            message: "Podcast Deleted Successfully",
            id: id,
          });
        }
      });
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });
});

router.put("/", async (req, res) => {
  const { podname, podimage,podlikes,noofplays,id } = req.body;
  console.log(podname,id);

  Podcast.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          podname, podimage,podlikes,noofplays,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("Podcast Updated");
            Podcast.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent._id,
                podname:foundUpdatedEvent.podname,
                podimage:foundUpdatedEvent.podimage,
                podlikes:foundUpdatedEvent.podlikes,
                noofplays:foundUpdatedEvent.noofplays
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
