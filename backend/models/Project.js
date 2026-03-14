import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
 clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  description: String,
  budget: String,
  deadline: String,
  technology: String,

  sow: String,

  status: {
    type: String,
    default: "pending"
  }
},{ timestamps: true });

export default mongoose.model("Project", projectSchema);