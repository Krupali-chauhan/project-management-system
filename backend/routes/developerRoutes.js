import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/dashboard", async (req,res)=>{

try{

const developerId = req.user.id;

const assigned = await Task.countDocuments({
developer:developerId
});

const completed = await Task.countDocuments({
developer:developerId,
status:"completed"
});

const pending = await Task.countDocuments({
developer:developerId,
status:"pending"
});

const tasks = await Task
.find({developer:developerId})
.populate("project","name")
.sort({createdAt:-1})
.limit(5);

res.json({

stats:{
assigned,
completed,
pending
},

tasks

})

}
catch(err){

res.status(500).json({message:"Server Error"})

}

})

export default router;