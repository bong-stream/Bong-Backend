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
  const {searc}=req.body;
  try {
    const song= await Song.search({songname:searc})
    const podcast= await Podcast.search({podname:searc});
    const artist=await Artist.search({artistname:searc});
    const album=await Album.searchs({albumname:searc});

    if(!song || !artist || !podcast || !album){
        return res.status(422).send({ error: 'Not found' });
    }else{
        const searc={
            song,
            podcast,
            artist,
            album
        }
        res.send(searc);
    } 
  } catch (err) {
    return res
    .status(422)
    .send({ error: 'something went wrong while searching' });
      
  }

  


  
});

module.exports = router;
