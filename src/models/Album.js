const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const AlbumSchema = new mongoose.Schema({
    artist:{type:mongoose.Schema.Types.ObjectId,ref:'Artist'},
    albumname:{type: String, required: true},
    albumimage:{type: String,required: true},
    albumlocation:{type: String,required: true},
    albumlikes:{type:Number}
    
  });

  AlbumSchema.plugin(mongoosastic);
  

  mongoose.model('Album', AlbumSchema);