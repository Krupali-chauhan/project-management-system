import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminProject"
  },
  milestoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Milestone"
  },
  title: String,
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  department: String,

  // ✅ ADD THIS
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
  type: String,
  enum: ["pending", "in_progress", "completed"], // ✅ ADD
  default: "pending"
},
order: {
  type: Number
}
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);