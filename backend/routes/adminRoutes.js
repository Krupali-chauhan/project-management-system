import express from "express";
import ProjectManager from "../models/ProjectManager.js";
import nodemailer from "nodemailer";

const router = express.Router();

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

export default router;