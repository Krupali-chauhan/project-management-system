import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Chip,
} from "@mui/material";

function ProjectProgress() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("PARAM:", projectId);

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/admin/project-progress/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API RESPONSE:", res.data);

        setProject(res.data.data);
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false); // 🔥 IMPORTANT
      }
    };

    fetchProject();
  }, [projectId]);

  // 🔹 Loading
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 🔹 Error / Not found
if (!project) {
  return (
    <Box
      sx={{
        mt: 10,
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        🚫 Oops! No Project Found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The project you're looking for doesn't exist or may have been removed.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/client/my-projects")}
      >
        🔙 Go Back to My Projects
      </Button>
    </Box>
  );
}

  // 🔹 Progress Color
  const getColor = (progress) => {
    if (progress < 40) return "error";
    if (progress < 70) return "warning";
    return "success";
  };

  const totalDays =
  (new Date(project.deadline) - new Date(project.createdAt)) /
  (1000 * 60 * 60 * 24);

const usedDays =
  (new Date() - new Date(project.createdAt)) /
  (1000 * 60 * 60 * 24);

  return (
  <Box sx={{ mt: 8, px: { xs: 2, md: 4 } }}>
    
    {/* 🔹 Header */}
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Typography variant="h4" fontWeight="bold">
        {project.title}
      </Typography>
    </Box>

    {/* 🔹 Project Card */}
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
        mb: 4,
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Project Details
      </Typography>

      <Typography><strong>Status:</strong> {project.status}</Typography>
      <Typography><strong>Budget:</strong> ₹{project.budget}</Typography>
      <Typography>
        <strong>Deadline:</strong>{" "}
        {new Date(project.deadline).toLocaleDateString("en-IN")}
      </Typography>
      <Typography>
  <strong>Time Used:</strong> {Math.floor(usedDays)} /{" "}
  {Math.floor(totalDays)} days
</Typography>
<Typography>
  <strong>Created:</strong>{" "}
  {new Date(project.createdAt).toLocaleDateString("en-IN")}
</Typography>

    </Paper>

    {/* 🔥 Progress Card */}
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
        background: "#ffffff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        🚀 Project Progress
      </Typography>

      {/* Circle + Bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 3 }}>

        {/* 🔵 Circular Progress */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={project.progress ?? 0}
            size={100}
            thickness={5}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {project.progress ?? 0}%
            </Typography>
          </Box>
        </Box>

        {/* 🔹 Linear Progress */}
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={project.progress ?? 0}
            sx={{
              height: 14,
              borderRadius: 10,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                borderRadius: 10,
                background: "linear-gradient(90deg, #00c6ff, #0072ff)",
              },
            }}
          />

          <Typography sx={{ mt: 1, fontWeight: "bold" }}>
            Completion: {project.progress ?? 0}%
          </Typography>
        </Box>
      </Box>

      {/* 🔹 Status Badge */}
      <Box sx={{ mt: 4 }}>
        <Chip
          label={project.status.toUpperCase()}
          sx={{
            fontWeight: "bold",
            px: 2,
            py: 1,
            fontSize: "0.9rem",
          }}
          color={
            project.status === "in_progress"
              ? "warning"
              : project.status === "completed"
              ? "success"
              : "default"
          }
        />
      </Box>
    </Paper>
  </Box>
);
}

export default ProjectProgress;