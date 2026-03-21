import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider
} from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageMilestones() {

  const [milestones, setMilestones] = useState({});
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllMilestones();
  }, []);

  // 🔥 GET ALL MILESTONES (ALL PROJECTS)
  const fetchAllMilestones = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/milestones",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔥 GROUP BY PROJECT
      const grouped = {};

      res.data.forEach((m) => {
        const projectName = m.projectId?.title || "Unknown Project";

        if (!grouped[projectName]) {
          grouped[projectName] = [];
        }

        grouped[projectName].push(m);
      });

      setMilestones(grouped);

    } catch (err) {
      console.log(err);
    }
  };
 const generateTasks = async (milestoneId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tasks/create",
      { milestoneId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Tasks Generated 🚀");

    // ✅ REDIRECT HERE
    navigate("/pm/tasks");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <Box sx={{ p: 4 }}>

        {/* 🔥 PAGE TITLE */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          All Project Milestones
        </Typography>

        {Object.keys(milestones).length === 0 ? (
          <Typography>No milestones generated yet.</Typography>
        ) : (
          Object.keys(milestones).map((projectName) => (
            <Box key={projectName} sx={{ mb: 5 }}>

              {/* 🔥 PROJECT NAME */}
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  color: "#1976d2",
                  fontWeight: "bold"
                }}
              >
                {projectName}
              </Typography>

              {/* 🔥 PROJECT MILESTONES */}
              {milestones[projectName].map((m, index) => (
                <Card
                  key={m._id}
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    borderLeft: "6px solid #4CAF50",
                    "&:hover": {
                      transform: "scale(1.02)"
                    }
                  }}
                  onClick={() => {
                    setSelected(m);
                    setOpen(true);
                  }}
                >
                  <CardContent>

  <Typography variant="h6" fontWeight="bold">
    Phase {index + 1} - {m.title}
  </Typography>

  <Typography color="text.secondary">
    {m.description}
  </Typography>

  <Divider sx={{ mt: 2 }} />

  <Typography sx={{ mt: 1, fontSize: "0.9rem" }}>
    <b>Deadline:</b> {m.deadline}
  </Typography>

  {/* 🔥 BUTTON HERE */}
  <Button
    variant="contained"
    color="success"
    sx={{ mt: 2 }}
    onClick={(e) => {
      e.stopPropagation(); // 🔥 VERY IMPORTANT (dialog open nahi hoga)
      generateTasks(m._id);
    }}
  >
    Generate Tasks
  </Button>

</CardContent>
                </Card>
              ))}

            </Box>
          ))
        )}
      </Box>

      {/* 🔥 DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>
          {selected?.title}
          <IconButton onClick={() => setOpen(false)} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>

          {selected && (
            <>
              <Typography sx={{ mt: 1 }}>
                {selected.description}
              </Typography>

              <Typography sx={{ mt: 3 }}>
                <b>Features:</b>
              </Typography>

              <ul>
                {selected.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <Typography sx={{ mt: 2 }}>
                <b>Tech Stack:</b> {selected.techStack?.join(", ")}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <b>Deadline:</b> {selected.deadline}
              </Typography>
            </>
          )}

        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageMilestones;