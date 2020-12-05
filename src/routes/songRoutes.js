const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Song= mongoose.model('Song');

const router = express.Router();

//router.use(requireAuth);

router.get('/song', async (req, res) => {
  const song = await Song.find();

  res.send(song);
});

router.post('/song', async (req, res) => {
  const { songname, songimage,songlikes,noofplays } = req.body;

  if (!songname || !songimage ) {
    return res
      .status(422)
      .send({ error: 'You must provide a name,image' });
  }

  try {
    const song = new Song({ songname, songimage, songlikes,noofplays});
    await song.save();
    res.send(song);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});





module.exports = router;
