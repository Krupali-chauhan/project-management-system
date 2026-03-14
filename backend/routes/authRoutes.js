import express from "express";
import { signup} from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import User from "../models/User.js";



const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.get("/users", async (req, res) => {

  try {

   const users = await User.find({ role: "client" }).select("-password");

    res.json(users);

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: "Server Error" });

  }

});

export default router;