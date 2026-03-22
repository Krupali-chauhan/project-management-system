import express from "express";
import { getClientDashboard } from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.get("/dashboard", protect, getClientDashboard);

export default router;