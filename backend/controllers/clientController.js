import Project from "../models/Project.js";

export const getClientDashboard = async (req, res) => {
  try {

    const clientId = req.user.id;

    const totalProjects = await Project.countDocuments({ clientId });

    const approvedProjects = await Project.countDocuments({
      clientId,
      status: "approved"
    });

    const pendingSOW = await Project.countDocuments({
      clientId,
      status: "pending"
    });

    const rejectedProjects = await Project.countDocuments({
      clientId,
      status: "rejected"
    });

    const recentProjects = await Project.find({ clientId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalProjects,
        approvedProjects,
        pendingSOW,
        rejectedProjects
      },
      recentProjects
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
};