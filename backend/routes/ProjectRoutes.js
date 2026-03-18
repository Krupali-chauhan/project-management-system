import express from "express";


import {
  createProject,
  getMyProjects,
  getSingleProject,
updateSOWStatus,
deleteProject,
updateProject,
getPMProjects
// createProjectFromRequest
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createProject);

router.get("/my", protect, getMyProjects);
router.get("/pm-projects", protect, getPMProjects);

router.get("/:id", protect, getSingleProject);
router.put("/:id/status", protect, updateSOWStatus);
router.delete("/:id", protect, deleteProject);
router.put("/:id", protect, updateProject);
// router.post("/create-project/:id", protect, createProjectFromRequest);

// // 🔥 baad me ye
// router.get("/:id", protect, getSingleProject);

export default router;