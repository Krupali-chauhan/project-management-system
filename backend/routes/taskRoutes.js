import express from "express";
import { createTasksFromMilestone ,getPMTasks} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createTasksFromMilestone);
router.get("/pm-tasks", protect, getPMTasks);

export default router;