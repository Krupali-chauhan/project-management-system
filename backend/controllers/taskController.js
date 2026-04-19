import Task from "../models/Task.js";
import Milestone from "../models/Milestone.js";
import User from "../models/User.js";
import AdminProject from "../models/AdminProject.js";

export const createTasksFromMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.body;

    const milestone = await Milestone.findById(milestoneId);

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // 🔥 PHASE → DEPARTMENT
    let department = "";
    let order = 1;

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
           projectManager: req.user._id,
           order: order++ 
        });

        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} Validation`,
          description: `Add validation for ${feature}`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id,
           order: order++ 
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
           projectManager: req.user._id,
           order: order++ 
        });

        tasks.push({
          projectId: milestone.projectId,
          milestoneId: milestone._id,
          title: `${feature} Database`,
          description: `Store ${feature} in DB`,
          assignedTo: developer._id,
          department,
           projectManager: req.user._id,
           order: order++ 
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
           projectManager: req.user._id,
           order: order++ 
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
           projectManager: req.user._id,
           order: order++ 
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
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    await Task.findByIdAndUpdate(taskId, { status });

    const task = await Task.findById(taskId);

    // 🔒 SEQUENCE VALIDATION
if (status === "in_progress") {

  const prevTask = await Task.findOne({
    assignedTo: task.assignedTo,
    projectId: task.projectId,
    order: task.order - 1
  });

  if (prevTask && prevTask.status !== "completed") {
    return res.status(400).json({
      message: "Complete previous task first"
    });
  }
}

// ❌ direct complete block
if (status === "completed" && task.status !== "in_progress") {
  return res.status(400).json({
    message: "Start task first"
  });
}

    const totalTasks = await Task.countDocuments({
      projectId: task.projectId
    });

    const completedTasks = await Task.countDocuments({
      projectId: task.projectId,
      status: "completed"
    });

    const progress =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    await AdminProject.findByIdAndUpdate(task.projectId, {
      progress: progress,
      status: progress === 100 ? "completed" : "in_progress"
    });

    res.json({
      message: "Task updated successfully",
      progress
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};