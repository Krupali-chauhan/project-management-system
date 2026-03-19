import express from "express";
import { signup} from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/authController.js";
import {
  assignDeveloperToPM,
  getAllDevelopers,
  getMyDevelopers,
  removeDeveloperFromPM
} from "../controllers/authController.js";


const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", protect, changePassword);
router.get("/users", async (req, res) => {

  try {

   const users = await User.find({ role: "client" }).select("-password");

    res.json(users);

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: "Server Error" });

  }

});

router.get("/developers", protect, getAllDevelopers);
router.post("/assign-developer", protect, assignDeveloperToPM);
router.get("/my-developers", protect, getMyDevelopers);
router.post("/remove-developer", protect, removeDeveloperFromPM);

export default router;