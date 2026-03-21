// backend/controllers/adminController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Project from "../models/Project.js";
import AdminProject from "../models/AdminProject.js";
import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";   // optional – agar token bhejna hai to

export const addProjectManager = async (req, res) => {
  try {
    const { name, email, phoneno, city } = req.body;

    // 1. Email already exists check
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Random password generate
    const randomPassword = Math.random().toString(36).slice(-10); // 10 chars strong
    const hashed = await bcrypt.hash(randomPassword, 12);

    // 3. New PM create
   const newPM = new User({
  name,
  email,
  phoneno,
  city,
  password: randomPassword,  // ❗ plain password
  role: "projectManager"
});

    await newPM.save();

    // 4. Email bhejo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Project Management System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Project Manager Account Created",
      html: `
        <h2>Welcome to Project Management System</h2>
        <p>Hi ${name},</p>
        <p>Your account has been created by Super Admin.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${randomPassword}</p>
        <p>Please login and change your password immediately.</p>
        <p>Link: http://localhost:5173/login</p>   <!-- frontend URL adjust kar lena -->
        <br/>
        <p>Regards,<br/>Project Management Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Project Manager added successfully & credentials sent to email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Get counts for dashboard cards

export const getProjectManagers = async (req, res) => {

  const pms = await User.find({ role: "projectManager" });

  res.json(pms);

};
export const deleteProjectManager = async (req, res) => {

  const pm = await User.findByIdAndDelete(req.params.id);

  if (!pm) {
    return res.status(404).json({ message: "PM not found" });
  }

  res.json({ message: "Project Manager deleted" });

};
export const updateProjectManager = async (req, res) => {

  const { name, phoneno, city } = req.body;

  const pm = await User.findByIdAndUpdate(
    req.params.id,
    { name, phoneno, city },
    { new: true }
  );

  res.json(pm);

};
export const getSingleProjectManager = async (req, res) => {
  try {

    const pm = await User.findById(req.params.id);

    if (!pm) {
      return res.status(404).json({ message: "Project Manager not found" });
    }

    res.json(pm);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllProjects = async (req, res) => {
  try {

    const projects = await Project.find()
      .populate("clientId", "name email")
      .populate("assignedPM", "name email"); // client info

    res.json(projects);

  } catch (error) {

    console.error("Project fetch error:", error);

    res.status(500).json({ message: "Server error" });

  }
};
export const approveProject = async (req, res) => {

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );

  res.json(project);

};
export const rejectProject = async (req, res) => {

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );

  res.json(project);

};
// ✅ ASSIGN PM (MAIN FIX)
// =============================
export const assignProjectManager = async (req, res) => {
  try {
    const { projectId, pmId } = req.body;

    const project = await AdminProject.findById(projectId);
    const pm = await User.findById(pmId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!pm || pm.role !== "projectManager") {
      return res.status(400).json({ message: "Invalid PM" });
    }

    // ✅ FINAL FIX
    project.assignedPM = pm._id;   // ← use this instead of new ObjectId
    project.status = "assigned";

    await project.save();

    console.log("✅ AssignedPM saved:", project.assignedPM);

    res.json({ message: "PM Assigned Successfully", project });

  } catch (error) {
    console.log("❌ Assign Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const addDeveloper = async (req, res) => {
  try {

    const { name, email, phoneno, department, city } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const randomPassword = Math.random().toString(36).slice(-10);

    const hashed = await bcrypt.hash(randomPassword, 12);

    const newDev = new User({
  name,
  email,
  phoneno,
  department,
  city,
  password: randomPassword,   // ✅ plain password
  role: "developer"
});

    await newDev.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Developer Account Created",
      html: `
        <h3>Hello ${name}</h3>
        <p>Your Developer account has been created.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${randomPassword}</p>
        <p>Please login and change password.</p>
      `
    });

    res.status(201).json({
      message: "Developer added and email sent"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
export const getDevelopers = async (req, res) => {

  const devs = await User.find({ role: "developer" });

  res.json(devs);

};
export const deleteDeveloper = async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "Developer deleted" });

};
export const getSingleDeveloper = async (req, res) => {

  const dev = await User.findById(req.params.id);

  if (!dev) {
    return res.status(404).json({ message: "Developer not found" });
  }

  res.json(dev);

};
export const updateDeveloper = async (req, res) => {

  const { name, phoneno, city } = req.body;

  const dev = await User.findByIdAndUpdate(
    req.params.id,
    { name, phoneno, city },
    { new: true }
  );

  res.json(dev);

};
// ✅ CREATE PROJECT (ADMIN)
// export const createProjectByAdmin = async (req, res) => {
//   try {

//     const project = await Project.findById(req.params.id);

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     if (project.status !== "approved") {
//       return res.status(400).json({ message: "Project not approved" });
//     }

//     project.status = "pending";   // ✅ FIXED

//     await project.save();

//     res.json({ message: "Project created", project });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const createProjectByAdmin = async (req, res) => {
//   try {

//     const project = await Project.findById(req.params.id);
//     const { description } = req.body;

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     if (project.status !== "approved") {
//       return res.status(400).json({ message: "Project not approved" });
//     }

//     // ✅ NEW ENTRY CREATE
//     const newProject = new AdminProject({
//       title: project.title,
//       clientId: project.clientId,
//       budget: project.budget,
//       deadline: project.deadline,
//       description: description, // abhi static (next step me form banaenge)
//     });

//     await newProject.save();
//     project.status = "created";
// await project.save();

//     res.json({ message: "Admin Project Created" });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// adminController.js
// adminController.js
export const createProjectByAdmin = async (req, res) => {
  try {
    const projectId = req.params.id;

    const original = await Project.findById(projectId);
    if (!original) return res.status(404).json({ message: "Project not found" });

    if (original.status !== "approved") {
      return res.status(400).json({ message: "Only approved projects can be created" });
    }

    // Duplicate check
    const alreadyCreated = await AdminProject.findOne({ originalProjectId: projectId });
    if (alreadyCreated) {
      return res.status(400).json({ message: "Admin project already exists for this" });
    }

    const newAdminProj = new AdminProject({
      title: original.title,
      clientId: original.clientId,
      budget: original.budget,
      deadline: original.deadline,
      description: original.description || "No description",
      sow: original.sow,                    // Full SOW copy
      originalProjectId: projectId,
      status: "pending_assignment"          // Ready for PM assign
    });

    await newAdminProj.save();

    // Optional: original status change
    original.status = "created_by_admin";
    await original.save();

    res.status(201).json({
      message: "Admin project created from approved SOW",
      adminProject: newAdminProj
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminProjects = async (req, res) => {
  try {

    const projects = await AdminProject.find()
      .populate("clientId", "name")
      .populate("assignedPM", "name");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Yeh function async hona chahiye
// adminController.js
export const getDashboardCounts = async (req, res) => {
  try {
    const totalUsers      = await User.countDocuments();
    const projectManagers = await User.countDocuments({ role: "projectManager" });
    const developers      = await User.countDocuments({ role: "developer" });

    let totalProjects = 0;
    // Agar Project model import hai to real count laga do
    // try {
    //   totalProjects = await Project.countDocuments();
    // } catch(e) { console.log("Project count nahi mila", e); }

    res.json({
      totalUsers,        // frontend → users
      projectManagers,   // frontend → managers
      developers,        // frontend → developers
      totalProjects      // frontend → projects (abhi 0 rahega agar count nahi laga)
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};