import express from "express";
import { generateMilestones } from "../controllers/milestoneController.js";
import { protect } from "../middleware/authMiddleware.js"; 
import { getAllMilestones } from "../controllers/milestoneController.js";
  // ✅ ADD THIS

const router = express.Router();

router.post("/generate", protect, generateMilestones);
router.get("/", protect, getAllMilestones);

export default router;