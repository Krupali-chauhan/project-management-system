import Developer from "../models/Developer.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import ProjectManager from "../models/ProjectManager.js";

export const addDeveloper = async (req,res)=>{

 try{

  const {name,email,phoneno,city} = req.body;

  // 🔎 email already exist check
  const existingUser = await Developer.findOne({email});

  if(existingUser){
    return res.status(400).json({
      message:"Email already exists"
    });
  }

  // random password
  const randomPassword = Math.random().toString(36).slice(-8);

  const hashedPassword = await bcrypt.hash(randomPassword,10);

  const developer = new Developer({
    name,
    email,
    phoneno,
    city,
    password:hashedPassword
  });

  await developer.save();

  // mail setup
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Developer Account Created",
    html:`
      <h2>Developer Account Created</h2>
      <p>Email: ${email}</p>
      <p>Password: ${randomPassword}</p>
    `
  };

  await transporter.sendMail(mailOptions);

  res.json({
    message:"Developer Added Successfully"
  });

 }catch(error){

  console.log(error);
  res.status(500).json({error:error.message});

 }

};

// VIEW PROJECT MANAGER
export const viewProjectManager = async (req,res)=>{

  try{

    const managers = await ProjectManager.find({
      role:"project_manager"
    });

    res.json(managers);

  }
  catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }

};
// VIEW DEVELOPERS
export const viewDevelopers = async (req,res)=>{

  try{

    const developers = await Developer.find({
      role:"developer"
    });

    res.json(developers);

  }
  catch(error){

    console.log(error);
    res.status(500).json({message:"Server Error"});

  }

};