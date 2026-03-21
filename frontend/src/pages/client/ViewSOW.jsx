import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Alert,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";           // ← New import for pencil
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

function ViewSOW() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["my-sows"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return [];
      const res = await axios.get("http://localhost:5000/api/projects/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  if (isLoading) return (
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "70vh", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  if (isError) return <Alert severity="error" sx={{ m: 4 }}>Failed to load SOWs</Alert>;

  if (projects.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <DescriptionIcon sx={{ fontSize: 100, color: "grey.300", mb: 3 }} />
        <Typography variant="h5" color="text.secondary">No SOWs yet</Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          startIcon={<DescriptionIcon />}
          onClick={() => navigate("/client/create-project")}
        >
          Create New Requirement
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        My Generated SOWs
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Deadline</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Budget</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((proj) => (
              <TableRow key={proj._id} hover>
                <TableCell>{proj.title}</TableCell>

                <TableCell align="center">
                  <Chip
                    label={proj.status.toUpperCase()}
                    color={
                      proj.status === "approved" ? "success" :
                      proj.status === "rejected" ? "error" :
                      "warning"
                    }
                    icon={
                      proj.status === "approved" ? <CheckCircleIcon /> :
                      proj.status === "rejected" ? <CancelIcon /> :
                      <PendingIcon />
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  {new Date(proj.deadline).toLocaleDateString("en-IN")}
                </TableCell>

                <TableCell align="right">
                  ₹{Number(proj.budget).toLocaleString("en-IN")}
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    {/* Always show View icon */}
                    <Tooltip title="View Full SOW">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/client/sow-detail/${proj._id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    {/* For rejected projects: show BOTH Edit (pencil) + Delete */}
                    {proj.status === "rejected" && (
                      <>
                        <Tooltip title="Edit & Resubmit">
                          <IconButton
                            color="secondary"          // orange-ish color for edit
                            size="small"
                            onClick={() => navigate(`/client/create-project/${proj._id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Permanently">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={async () => {
                              if (window.confirm("Delete this rejected SOW permanently? This cannot be undone.")) {
                                try {
                                  await axios.delete(`http://localhost:5000/api/projects/${proj._id}`, {
                                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                                  });
                                  queryClient.invalidateQueries(["my-sows"]);
                                  alert("Deleted successfully");
                                } catch (err) {
                                  alert("Delete failed: " + (err.response?.data?.message || "Unknown error"));
                                }
                              }
                            }}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewSOW;