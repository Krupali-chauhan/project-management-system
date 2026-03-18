const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({

  projectType: String,

  features: [String],

  budget: String,

  deadline: String,

  conversation: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Requirement", requirementSchema);