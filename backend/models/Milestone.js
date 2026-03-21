import mongoose from "mongoose";   // ✅ ADD THIS

const milestoneSchema = new mongoose.Schema({

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminProject",
    required: true
  },

  title: String,
  description: String,
  features: [String],
  techStack: [String],
  deadline: String,
  sow: String

}, { timestamps: true });

export default mongoose.model("Milestone", milestoneSchema);