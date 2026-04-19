import express from "express";
import { createTasksFromMilestone ,getPMTasks,updateTaskStatus} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createTasksFromMilestone);
router.get("/pm-tasks", protect, getPMTasks);
router.put("/update-status/:taskId", protect, updateTaskStatus);

export default router;