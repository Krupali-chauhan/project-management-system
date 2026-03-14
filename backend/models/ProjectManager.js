import mongoose from "mongoose";

const projectManagerSchema = new mongoose.Schema({

  name:String,
  email:String,
  phone:String,
  gender:String,
  salary:String,
  password:String,

  role:{
    type:String,
    default:"project_manager"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("ProjectManager",projectManagerSchema,"users");