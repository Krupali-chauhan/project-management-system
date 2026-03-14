import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const projectManagerSchema = new mongoose.Schema({

  name:String,
  email:String,
  phone:String,
  gender:String,
  salary:String,
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:"project_manager"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});
// 🔐 password hash before save
projectManagerSchema.pre("save", async function(){

  if(!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

});

export default mongoose.model("ProjectManager",projectManagerSchema,"users");