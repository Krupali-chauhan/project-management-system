import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";
import {updateTaskStatus,getDeveloperTasks} from "../controllers/developerController.js"

const router = express.Router();
router.get("/my-tasks", protect, getDeveloperTasks);
router.put("/task/:id/status", protect, updateTaskStatus);

router.get("/dashboard", protect, async (req, res) => {
  try {
    const developerId = req.user.id;

    // ✅ FIXED (assignedTo use karo)
    const assigned = await Task.countDocuments({
      assignedTo: developerId
    });

    const completed = await Task.countDocuments({
      assignedTo: developerId,
      status: "completed"
    });

    const pending = await Task.countDocuments({
      assignedTo: developerId,
      status: "pending"
    });

    // ✅ FIXED (projectId use karo)
    const tasks = await Task.find({ assignedTo: developerId })
      .populate("projectId", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        assigned,
        completed,
        pending
      },
      tasks
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;