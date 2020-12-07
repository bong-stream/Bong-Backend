const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const PodcastSchema = new mongoose.Schema({
    podname:{type: String, required: true},
    podimage:{type: String,required: true},
    podlikes:{type:Number},
    noofplays:{type:Number}
});

PodcastSchema.plugin(mongoosastic);

mongoose.model('Podcast', PodcastSchema);