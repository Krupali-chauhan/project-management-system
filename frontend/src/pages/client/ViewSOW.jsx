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
  Alert,
  IconButton,
  Divider,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (isError || !projects) {
    return (
      <Alert severity="error" sx={{ mt: 6, mx: "auto", maxWidth: 600, p: 3 }}>
        Unable to load your SOWs. Please check your connection and try again.
      </Alert>
    );
  }

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (sortedProjects.length === 0) {
    return (
      <Box sx={{ mt: "100px", textAlign: "center", px: 4 }}>
        <DescriptionIcon sx={{ fontSize: 120, color: "grey.300", mb: 3 }} />
        <Typography variant="h5" gutterBottom color="text.secondary">
          No SOWs Generated Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
          Start by creating a new project requirement. Once generated, your SOWs will appear here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DescriptionIcon />}
          onClick={() => navigate("/client/create-project")}
        >
          Create New Requirement
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: "70px", width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="600">
          My Generated SOWs
        </Typography>
        <Chip
          icon={<DescriptionIcon />}
          label={`${sortedProjects.length} SOWs`}
          color="primary"
          variant="outlined"
          size="medium"
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          background: "white",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="SOWs table">
          <TableHead sx={{ background: "linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%)" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold", pl: 3 }}>Project Title</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Deadline</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Budget</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Last Updated</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedProjects.map((proj) => (
              <TableRow
                key={proj._id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  transition: "all 0.2s",
                  "&:hover": { backgroundColor: "#f0f7ff" },
                }}
              >
                <TableCell component="th" scope="row" sx={{ pl: 3, fontWeight: "medium" }}>
                  {proj.title}
                </TableCell>

                <TableCell align="center">
                  <Chip
                    icon={
                      proj.status === "approved" ? <CheckCircleIcon /> :
                      proj.status === "rejected" ? <WarningAmberIcon /> :
                      <PendingIcon />
                    }
                    label={proj.status.toUpperCase()}
                    color={
                      proj.status === "approved" ? "success" :
                      proj.status === "rejected" ? "error" :
                      "warning"
                    }
                    variant="filled"
                    size="medium"
                    sx={{ minWidth: 110, fontWeight: "bold" }}
                  />
                </TableCell>

                <TableCell align="center">
                  {new Date(proj.deadline).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: "medium" }}>
                  ₹{Number(proj.budget).toLocaleString("en-IN")}
                </TableCell>

                <TableCell align="center">
                  {new Date(proj.updatedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Tooltip title="View Full SOW">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/client/sow-detail/${proj._id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    {proj.status === "rejected" && (
                      <Tooltip title="Delete Permanently">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this rejected SOW permanently?")) {
                              try {
                                await axios.delete(`http://localhost:5000/api/projects/${proj._id}`, {
                                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                                });
                                queryClient.invalidateQueries(["my-sows"]);
                                // Optional: success toast
                              } catch (err) {
                                console.error(err);
                                alert("Error deleting SOW");
                              }
                            }
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
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