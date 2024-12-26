const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const artistSchema = new mongoose.Schema({
  artist_id:{ type: String, default: uuidv4, unique: true },
  name:{type:String,required:true},
  grammy:{type:Boolean,default:false},
  hidden:{type:Boolean,default:false},
})

module.exports = mongoose.model("Artist",artistSchema)