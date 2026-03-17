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
    // const projects = await Project.find()
    const projects = await Project.find({ clientId: req.user.id })
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
// controllers/projectController.js

export const updateSOWStatus = async (req, res) => {
  try {
    const { status } = req.body; // frontend se "approved" ya "rejected" aayega

    // sirf ye 3 values allow karo
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Only 'approved' or 'rejected' allowed" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // sirf client hi change kar sake (security)
    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your project" });
    }

    // sirf pending project ka status change ho sake
    if (project.status !== "pending") {
      return res.status(400).json({ message: `Project already ${project.status}` });
    }

    project.status = status;
    await project.save();

    res.json({
      message: `SOW ${status} successfully`,
      project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Sirf rejected delete karne do (optional)
    if (project.status !== "rejected") {
      return res.status(400).json({ message: "Only rejected projects can be deleted" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project nahi mila" });

    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Yeh aapka project nahi" });
    }

    if (project.status !== "rejected") {
      return res.status(400).json({ message: "Sirf rejected wale edit ho sakte hain" });
    }

    // Fields update
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.budget = req.body.budget || project.budget;
    project.deadline = req.body.deadline || project.deadline;
    project.technology = req.body.technology || project.technology;

    // Naya SOW banao
    project.sow = await generateSOW({
      title: project.title,
      description: project.description,
      budget: project.budget,
      deadline: project.deadline,
      technology: project.technology
    });

    project.status = "pending";
    await project.save();

    res.json({ message: "Updated successfully", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};