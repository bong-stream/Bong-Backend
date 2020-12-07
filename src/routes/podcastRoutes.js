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





module.exports = router;
