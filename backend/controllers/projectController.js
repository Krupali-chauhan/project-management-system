import Project from "../models/Project.js";
import generateSOW from "../utils/aiSOW.js";

export const createProject = async (req, res) => {

  try {

    console.log("REQ BODY:", req.body);

    const { title, description, budget, deadline, technology } = req.body;

    const sow = await generateSOW({
      title,
      description,
      budget,
      deadline,
      technology
    });

    const project = new Project({
      clientId: req.user.id,  
      title,
      description,
      budget,
      deadline,
      technology,
      sow
    });

    await project.save();

    res.status(200).json(project);

  } 
  catch (error) {

    console.log("PROJECT ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};
export const getMyProjects = async (req, res) => {
  try {
    // Temporary: sab projects dikha rahe (clientId add karne ke baad filter kar dena)
    const projects = await Project.find()
      .sort({ createdAt: -1 })          // newest first (date wise descending)
      .lean();                          // faster response

    res.status(200).json(projects);
  } catch (error) {
    console.error("GET MY PROJECTS ERROR:", error);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
};
export const getSingleProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateSOWStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }

};