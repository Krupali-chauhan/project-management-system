import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({

  name:String,
  email:String,
  phoneno:String,
  department:String,
  city:String,
  password:String,

  role:{
    type:String,
    default:"developer"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("Developer",developerSchema,"users");