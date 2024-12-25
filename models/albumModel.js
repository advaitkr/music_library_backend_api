const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema({
  album_id:{type:String,required:true,unique:true},
  name:{type:String,required:true},
  year:{type:Number,required:true},
  hidden:{type:Boolean,default:false},
  artist_id:{type:String,required:true}
})

module.exports = mongoose.model("Album",albumSchema)