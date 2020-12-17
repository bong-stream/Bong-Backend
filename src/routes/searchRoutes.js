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
          const song= await Song.find({songname:{$regex:new RegExp(search)}}).limit(10);
          const podcast= await Podcast.find({podname:{$regex:new RegExp(search)}}).limit(10);
          const artist=await Artist.find({artistname:{$regex:new RegExp(search)}}).limit(10);
          const album=await Album.find({albumname:{$regex:new RegExp(search)}}).limit(10);

          if(!song || !artist || !podcast || !album){
              return res.status(422).send({ error: 'Not found' });
          }else{
              const search={
                  song,
                  podcast,
                  artist,
                  album
              }
              res.json(search);
          } 



          // Song.find({
          //   songname:{$regex:new RegExp(search)}
          // },function(err,data){
          //   console.log(data)
          //   res.json(data);
          // }).limit(10);


  } catch (err) {
    return res
    .status(422)
    .send({ error: 'something went wrong while searching' });
      
  }
});

module.exports = router;
