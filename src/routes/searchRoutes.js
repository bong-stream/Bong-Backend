const express = require('express');
const mongoose = require('mongoose');

//const requireAuth = require('../midlewares/requireAuth');

const Song= mongoose.model('Song');
const Artist= mongoose.model('Artist');
const Album= mongoose.model('Album');
const Podcast= mongoose.model('Podcast');

const router = express.Router();

//router.use(requireAuth);

router.get('/', async (req, res) => {
  const {search}=req.body;
  try {
    const song= await Song.find({songname:search})
    const podcast= await Podcast.find({podname:search});
    const artist=await Artist.find({artistname:search});
    const album=await Album.find({albumname:search});

    if(!song || !artist || !podcast || !album){
        return res.status(422).send({ error: 'Not found' });
    }else{
        const search={
            song,
            podcast,
            artist,
            album
        }
        res.send(search);
    } 
  } catch (err) {
    return res
    .status(422)
    .send({ error: 'something went wrong while searching' });
      
  }
});

module.exports = router;
