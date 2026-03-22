import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/developer/my-tasks",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ OPEN DIALOG
  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/developer/task/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTasks();
      handleClose();

    } catch (err) {
      console.log(err);
    }
  };

  // 🎨 STATUS COLOR
  const getColor = (status) => {
    if (status === "completed") return "success";
    if (status === "in_progress") return "info";
    return "warning";
  };

  // 🎯 STATUS TEXT
  const getStatusText = (status) => {
    if (status === "completed") return "Completed ✅";
    if (status === "in_progress") return "In Progress 🚀";
    return "Pending ⏳";
  };

  return (
    <Box sx={{ p: 4, background: "#f8fafc", minHeight: "100vh" }}>

      <Typography variant="h4" fontWeight="bold" mb={4}>
        My Tasks
      </Typography>

      <Grid container spacing={3}>

        {tasks.length === 0 ? (
          <Typography>No Tasks Assigned</Typography>
        ) : (
          tasks.map((task) => (

            <Grid item xs={12} md={6} lg={4} key={task._id}>

              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "0.3s",
                  background:
                    task.status === "completed"
                      ? "#ecfdf5"
                      : task.status === "in_progress"
                      ? "#eff6ff"
                      : "#fff7ed",
                  "&:hover": {
                    transform: "translateY(-6px)"
                  }
                }}
                onClick={() => handleOpen(task)}
              >

                <CardContent>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      textDecoration:
                        task.status === "completed"
                          ? "line-through"
                          : "none",
                      color:
                        task.status === "completed"
                          ? "gray"
                          : "black"
                    }}
                  >
                    {task.title}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {task.description}
                  </Typography>

                  <Typography variant="body2">
                    <b>Project:</b> {task.projectId?.title || "-"}
                  </Typography>

                  <Typography variant="body2">
                    <b>Milestone:</b> {task.milestoneId?.title || "-"}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >

                    <Chip
                      label={getStatusText(task.status)}
                      color={getColor(task.status)}
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "8px"
                      }}
                    />

                    {/* STATUS DOT */}
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background:
                          task.status === "completed"
                            ? "#22c55e"
                            : task.status === "in_progress"
                            ? "#3b82f6"
                            : "#f59e0b"
                      }}
                    />

                  </Box>

                </CardContent>

              </Card>

            </Grid>

          ))
        )}

      </Grid>

      {/* ✅ DIALOG */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">

        <DialogTitle>
          {selectedTask?.title}
        </DialogTitle>

        <DialogContent dividers>

          <Typography mb={1}>
            <b>Description:</b> {selectedTask?.description}
          </Typography>

          <Typography mb={1}>
            <b>Project:</b> {selectedTask?.projectId?.title}
          </Typography>

          <Typography mb={1}>
            <b>Milestone:</b> {selectedTask?.milestoneId?.title}
          </Typography>

          <Typography mb={1}>
            <b>Status:</b> {getStatusText(selectedTask?.status)}
          </Typography>

          {/* 🔥 PROGRESS */}
          <Typography>
            <b>Progress:</b>{" "}
            {selectedTask?.status === "completed"
              ? "100%"
              : selectedTask?.status === "in_progress"
              ? "50%"
              : "0%"}
          </Typography>

        </DialogContent>

        <DialogActions>

          {selectedTask?.status === "pending" && (
            <Button
              variant="contained"
              onClick={() =>
                updateStatus(selectedTask._id, "in_progress")
              }
            >
              Start
            </Button>
          )}

          {selectedTask?.status !== "completed" && (
            <Button
              variant="outlined"
              onClick={() =>
                updateStatus(selectedTask._id, "completed")
              }
            >
              Complete
            </Button>
          )}

          <Button onClick={handleClose}>
            Close
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}

export default MyTasks;