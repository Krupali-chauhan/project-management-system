import mongoose from "mongoose";

// const adminProjectSchema = new mongoose.Schema({

//   title: String,
//   clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   budget: Number,
//   deadline: String,
//   description: String, // ✅ NEW FIELD

//   assignedPM: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     default: null
//   },

//   status: {
//     type: String,
//     default: "pending"
//   }

// }, { timestamps: true });

// export default mongoose.model("AdminProject", adminProjectSchema);
const adminProjectSchema = new mongoose.Schema({
  title: String,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  budget: String,
  deadline: String,
  description: String,
  sow: String,                      // ← Yeh important — full SOW copy
  originalProjectId: {              // ← Link to client project
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  assignedPM: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  status: {
    type: String,
    enum: ["pending_assignment", "assigned", "in_progress"],
    default: "pending_assignment"
  },

  progress: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("AdminProject", adminProjectSchema);