import Task from "../models/Task.js";
import Milestone from "../models/Milestone.js";
import User from "../models/User.js";

export const createTasksFromMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.body;

    const milestone = await Milestone.findById(milestoneId);

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // 🔥 PHASE → DEPARTMENT
    let department = "";

    const title = milestone.title.toLowerCase();

    if (title.includes("planning")) department = "analysis";
    else if (title.includes("design")) department = "frontend";
    else if (title.includes("development")) department = "backend";
    else if (title.includes("testing")) department = "tester";

    // 🔥 TEAM DEV (sirf apne PM ke dev)
    const developer = await User.findOne({
      role: "developer",
      department: department,
      assignedPM: req.user.id
    });

    if (!developer) {
      return res.status(400).json({
        message: `${department} developer not found`
      });
    }

    const tasks = [];

    // 🔥 FEATURE → MULTIPLE TASKS (IMPORTANT 🔥)
    milestone.features.forEach((feature) => {

      // FRONTEND
      if (department === "frontend") {
        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} UI`,
          description: `Design UI for ${feature}`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id 
        });

        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} Validation`,
          description: `Add validation for ${feature}`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id 
        });
      }

      // BACKEND
      else if (department === "backend") {
        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} API`,
          description: `Create API for ${feature}`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id 
        });

        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} Database`,
          description: `Store ${feature} in DB`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id 
        });
      }

      // TESTING
      else if (department === "tester") {
        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} Testing`,
          description: `Test ${feature} module`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id 
        });
      }

      // ANALYSIS
      else {
        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} Planning`,
          description: `Plan workflow for ${feature}`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id 
        });
      }

    });

    await Task.insertMany(tasks);

    res.json({
      message: "Tasks created & assigned successfully 🚀",
      total: tasks.length
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getPMTasks = async (req, res) => {
  try {
    const pmId = req.user._id;

    const tasks = await Task.find({ projectManager: pmId })
      .populate("assignedTo", "name email department")
      .populate("projectId", "title")
      .populate("milestoneId", "title");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};