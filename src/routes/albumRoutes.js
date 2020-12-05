
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Album= mongoose.model('Album');

const router = express.Router();

//router.use(requireAuth);

router.get('/album', async (req, res) => {
  const album = await Album.find();

  res.send(album);
});

router.post('/album', async (req, res) => {
  const { albumname, albumimage,albumlikes,albumlocation } = req.body;

  if (!albumname || !albumimage || !albumlocation ) {
    return res
      .status(422)
      .send({ error: 'You must provide a name,image' });
  }

  try {
    const album = new Album({ albumname, albumimage, albumlikes,albumlocation});
    await album.save();
    res.send(album);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});





module.exports = router;
