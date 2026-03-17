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
  addDeveloper

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
router.get("/developers", getDevelopers);

router.delete("/developer/:id", deleteDeveloper);

router.get("/developer/:id", getSingleDeveloper);

router.put("/developer/:id", updateDeveloper);
router.post("/add-developer", protect, addDeveloper);




export default router;