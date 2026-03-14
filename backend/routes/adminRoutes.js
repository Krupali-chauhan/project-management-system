import express from "express";
import ProjectManager from "../models/ProjectManager.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import nodemailer from "nodemailer";
import { addDeveloper } from "../controllers/adminController.js";
import { viewDevelopers } from "../controllers/adminController.js";
import { viewProjectManager } from "../controllers/adminController.js";

const router = express.Router();
router.post("/add-developer", addDeveloper);

router.get("/view-project-manager",viewProjectManager);

router.get("/view-developers",viewDevelopers);

router.post("/add-project-manager", async (req,res)=>{

  try{

    const {name,email,phone,gender,salary} = req.body;

    const password = Math.random().toString(36).slice(-8);

    const pm = new ProjectManager({

      name,
      email,
      phone,
      gender,
      salary,
      password

    });

    await pm.save();

    const transporter = nodemailer.createTransport({

      service:"gmail",

      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }

    });

    await transporter.sendMail({

      from:process.env.EMAIL_USER,
      to:email,
      subject:"Project Manager Login",

      text:`Login Details

Email: ${email}
Password: ${password}`

    });

    res.json({
      message:"Project Manager Added"
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      error:"Server Error"
    });

  }

});
router.get("/dashboard-count", async (req,res)=>{

  try{

    const users = await User.countDocuments({ role:"client" });

    const managers = await User.countDocuments({ role:"project_manager" });

    const developers = await User.countDocuments({ role:"developer" });

    const projects = await Project.countDocuments();

    res.json({
      users,
      managers,
      developers,
      projects
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      error:"Server Error"
    });

  }

});

export default router;