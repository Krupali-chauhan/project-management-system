import mongoose from "mongoose";

const adminProjectSchema = new mongoose.Schema({

  title: String,
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  budget: Number,
  deadline: String,
  description: String, // ✅ NEW FIELD

  assignedPM: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  status: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("AdminProject", adminProjectSchema);