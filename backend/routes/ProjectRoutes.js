import express from "express";

import {
  createProject,
  getMyProjects,
  getSingleProject
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createProject);

router.get("/my", protect, getMyProjects);

router.get("/:id", protect, getSingleProject);

export default router;