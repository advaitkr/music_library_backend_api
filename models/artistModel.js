const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema({
  artist_id:{type:String,required:true,unique:true},
  name:{type:String,required:true},
  grammy:{type:Boolean,default:false},
  hidden:{type:Boolean,default:false},
})

module.exports = mongoose.model("Artist",artistSchema)