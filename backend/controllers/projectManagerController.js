import Project from "../models/Project.js";
import AdminProject from "../models/AdminProject.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Task from "../models/Task.js";

export const getPMDashboard = async (req, res) => {
  try {
    const pmId = new mongoose.Types.ObjectId(req.user.id);

    const projects = await AdminProject.find({ assignedPM: pmId });

    const developers = await User.countDocuments({ role: "developer" });

    const tasks = await Task.countDocuments({
      projectManager: pmId
    });

     const pendingTasks = await Task.countDocuments({
      projectManager: pmId,
      status: "pending"
    });
//jkajhkahfk
const updatedProjects = await Promise.all(
      projects.map(async (project) => {
        const projectTasks = await Task.find({
          projectId: project._id
        });

        const totalTasks = projectTasks.length;

        const completedTasks = projectTasks.filter((task) => {
          const status = String(task.status || "")
            .trim()
            .toLowerCase();

          return status === "completed";
        }).length;

        let progress = 0;

        if (totalTasks > 0) {
          progress = Math.round(
            (completedTasks / totalTasks) * 100
          );
        }

        project.progress = progress;

        if (progress === 100) {
          project.status = "completed";
        } else if (progress > 0) {
          project.status = "in_progress";
        }

        await project.save();

        return {
          ...project.toObject(),
          tasks: projectTasks,
          progress: progress
        };
      })
    );
//hjbsbvjsbv

    res.json({
      stats: {
        projects: projects.length,
        developers,
        tasks,
        pendingTasks
      },
      projects
    });

  } catch (err) {
    console.log("PM Dashboard Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
// projectManagerController.js
// projectManagerController.js - replace getPMProjects with this

// export const getPMProjects = async (req, res) => {
//   try {
//     console.log("PM ROLE:", req.user.role);

//     if (req.user.role !== "projectManager") {
//       return res.status(403).json({ message: "Access denied. Not a PM" });
//     }

//     const pmId = req.user._id;

//     console.log("PM ID:", pmId);

//     const projects = await AdminProject.find({ assignedPM: pmId })
//       .populate("clientId", "name email")
//       .select("title clientId budget deadline status sow");

//     console.log("Assigned projects count:", projects.length);

//     res.json(projects);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const getPMProjects = async (req, res) => {
  try {
    console.log("PM ROLE:", req.user.role);

    if (req.user.role !== "projectManager") {
      return res.status(403).json({ message: "Access denied. Not a PM" });
    }

    const pmId = req.user.id;   // ✅ FIX

    console.log("PM ID:", pmId);

    const projects = await AdminProject.find({ assignedPM: pmId })
      .populate("clientId", "name email")
      .select("title clientId budget deadline status sow");

    console.log("Assigned projects count:", projects.length);

    res.json(projects);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};