import express from "express";


import {
  createProject,
  getMyProjects,
  getSingleProject,
updateSOWStatus,
deleteProject,
updateProject
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createProject);

router.get("/my", protect, getMyProjects);

router.get("/:id", protect, getSingleProject);
router.put("/:id/status", protect, updateSOWStatus);
router.delete("/:id", protect, deleteProject);
router.put("/:id", protect, updateProject);


export default router;