import express from "express";
import {
  addProjectManager,
  getDashboardCounts,
  getProjectManagers,
  deleteProjectManager,
updateProjectManager,
getSingleProjectManager,
 getAllProjects,
  approveProject,
  rejectProject,
  getDevelopers,
  deleteDeveloper,
  getSingleDeveloper,
  updateDeveloper,
  addDeveloper,
  assignProjectManager,
    createProjectByAdmin,
    getAdminProjects,
    getProjectProgress

} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-project-manager", protect, addProjectManager);
router.get("/dashboard-count", protect, getDashboardCounts);
router.get("/project-managers", getProjectManagers);
router.get("/project-manager/:id", getSingleProjectManager);

router.delete("/project-manager/:id", deleteProjectManager);

router.put("/project-manager/:id", updateProjectManager);
router.get("/projects", getAllProjects);

router.put("/project/approve/:id", approveProject);

router.put("/project/reject/:id", rejectProject);
router.post("/projects/:id/create-admin", protect, createProjectByAdmin);

// ✅ Assign PM (IMPORTANT)
router.put("/assign-pm", protect, assignProjectManager);
router.get("/developers", getDevelopers);

router.delete("/developer/:id", deleteDeveloper);

router.get("/developer/:id", getSingleDeveloper);

router.put("/developer/:id", updateDeveloper);
router.post("/add-developer", protect, addDeveloper);
router.get("/admin-projects", protect, getAdminProjects);
// adminRoutes.js

// router.get("/admin/project-progress/:projectId", getProjectProgress);
router.get("/project-progress/:projectId", getProjectProgress);


export default router;