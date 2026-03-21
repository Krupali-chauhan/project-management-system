import Project from "../models/Project.js";
import AdminProject from "../models/AdminProject.js";
import mongoose from "mongoose";

export const getPMDashboard = async (req, res) => {
  try {
    const pmId = req.user._id;

    // ✅ FIX: AdminProject use karo
    const projects = await AdminProject.find({ assignedPM: pmId });

    const totalProjects = projects.length;

    res.json({
      stats: {
        projects: totalProjects,
        developers: 0,
        tasks: 0,
        pendingTasks: 0
      },
      projects
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
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