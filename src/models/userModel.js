const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  user_id:{ type: String, default: uuidv4, unique: true },
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  role:{type:String,enum:["Admin","Editor","Viewer"],default:"Viewer"}
})

module.exports = mongoose.model("User",userSchema)