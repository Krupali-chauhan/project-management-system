import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { getPMDashboard,getPMProjects } from "../controllers/projectManagerController.js";
import { protect } from "../middleware/authMiddleware.js";
// import Task from "../models/Task.js";

const router = express.Router();
router.get("/dashboard", protect, getPMDashboard);

router.get("/projects", protect, getPMProjects); 


export default router;