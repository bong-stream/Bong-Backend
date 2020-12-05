const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Artist= mongoose.model('Artist');

const router = express.Router();

//router.use(requireAuth);

router.get('/artist', async (req, res) => {
  const artist = await Artist.find();

  res.send(artist);
});

router.post('/artist', async (req, res) => {
  const { artistname, artistimage,artistlikes } = req.body;

  if (!artistname || !artistimage ) {
    return res
      .status(422)
      .send({ error: 'You must provide a name,image' });
  }

  try {
    const artist = new Artist({ artistname, artistimage, artistlikes});
    await artist.save();
    res.send(artist);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});





module.exports = router;
