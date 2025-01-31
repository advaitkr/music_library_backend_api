const mongoose = require("mongoose");
const trackSchema = new mongoose.Schema({
  track_id:{type:String,required:true,unique:true},
  name:{type:String,required:true},
  duration:{type:Boolean,default:false},
  hidden:{type:Boolean,default:false},
  album_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Album', 
    required: true 
  },
  artist_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Artist', 
    required: true 
  },
})

module.exports = mongoose.model("Track",trackSchema)