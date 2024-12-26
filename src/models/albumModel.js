const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const albumSchema = new mongoose.Schema({
  album_id:{ type: String, default: uuidv4, unique: true },
  name:{type:String,required:true},
  year:{type:Number,required:true},
  hidden:{type:Boolean,default:false},
  artist_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Artist', 
    required: true 
  }
})

module.exports = mongoose.model("Album",albumSchema)