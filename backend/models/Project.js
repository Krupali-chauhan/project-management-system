// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema({
//  clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   title: String,
//   description: String,
//   budget: String,
//   deadline: String,
//   technology: String,

//   sow: String,

//   status: {
//     type: String,
//     default: "pending"
//   }
// },{ timestamps: true });

// export default mongoose.model("Project", projectSchema);

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

  title: String,
  description: String,
  budget: Number,
  deadline: Date,
  technology: String,

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  assignedPM: {   // 🔥 MUST
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Project", projectSchema);