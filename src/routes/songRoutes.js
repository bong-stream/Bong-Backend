const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Song= mongoose.model('Song');

const router = express.Router();

const fileupload=require('../midlewares/fileUpload');

//router.use(requireAuth);

router.get('/song' ,async (req, res) => {
  const song = await Song.find();

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





module.exports = router;
