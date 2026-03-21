import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { getPMDashboard,getPMProjects } from "../controllers/projectManagerController.js";
import { protect } from "../middleware/authMiddleware.js";
// import Task from "../models/Task.js";

const router = express.Router();
router.get("/dashboard", protect, getPMDashboard);
router.get("/projects", protect, getPMProjects); 

router.get("/dashboard", async (req,res)=>{

try{

const projectsCount = await Project.countDocuments();

const developersCount = await User.countDocuments({
role:"developer"
});

const tasksCount = await Task.countDocuments();

const pendingTasks = await Task.countDocuments({
status:"pending"
});

const projects = await Project
.find()
.sort({createdAt:-1})
.limit(5);

const tasks = await Task
.find()
.populate("developer","name")
.sort({createdAt:-1})
.limit(5);

res.json({

stats:{
projects:projectsCount,
developers:developersCount,
tasks:tasksCount,
pendingTasks
},

projects,
tasks

});

}

catch(err){

res.status(500).json({
message:"Server Error"
})

}

});

export default router;