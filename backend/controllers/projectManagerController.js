import Project from "../models/Project.js";

export const getPMDashboard = async (req, res) => {
  try {
    const pmId = req.user.id;

    // ✅ Sirf PM ke projects
    const projects = await Project.find({ assignedPM: pmId });

    // ✅ Project count
    const totalProjects = projects.length;

    // ✅ Developers count (unique)
    const devSet = new Set();

    projects.forEach((proj) => {
      if (proj.developers) {
        proj.developers.forEach((d) => {
          devSet.add(d.toString());
        });
      }
    });

    const totalDevelopers = devSet.size;

    // ❌ Tasks nahi use kar rahe
    res.json({
      stats: {
        projects: totalProjects,
        developers: totalDevelopers,
        tasks: 0,
        pendingTasks: 0
      },
      projects: projects
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};