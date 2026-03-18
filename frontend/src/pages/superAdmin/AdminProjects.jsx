import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Select,
  MenuItem,
  Button,
  Chip
} from "@mui/material";

function AdminProjects() {

  const [projects, setProjects] = useState([]);
  const [pms, setPms] = useState([]);
  const [selectedPM, setSelectedPM] = useState({});

  const token = localStorage.getItem("token");

  // ✅ FETCH PROJECTS
  const fetchProjects = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/projects",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🔥 only admin created projects
    const filtered = res.data.filter(p =>
  p.status === "pending" || p.status === "assigned"
);
    setProjects(filtered);
  };

  // ✅ FETCH PMS
  const fetchPMs = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/project-managers",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setPms(res.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchPMs();
  }, []);

  // SELECT STORE
  const handleSelect = (projectId, value) => {
    setSelectedPM({
      ...selectedPM,
      [projectId]: value
    });
  };

  // ASSIGN BUTTON
  const assignPM = async (projectId) => {

    const pmId = selectedPM[projectId];

    if (!pmId) {
      alert("Select PM first");
      return;
    }

    await axios.put(
      "http://localhost:5000/api/admin/assign-pm",
      { projectId, pmId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProjects();
  };

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h5" mb={2} fontWeight="bold">
        Admin Projects
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Client</b></TableCell>
              <TableCell><b>Budget</b></TableCell>
              <TableCell><b>Deadline</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Project Manager</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {projects.map((p) => (

              <TableRow key={p._id}>

                <TableCell>{p.title}</TableCell>
                <TableCell>{p.clientId?.name || "-"}</TableCell>
                <TableCell>₹{p.budget}</TableCell>
                <TableCell>{p.deadline}</TableCell>

                {/* STATUS */}
                <TableCell>
                  {p.status === "pending" && (
                    <Chip label="Pending" color="warning" />
                  )}
                  {p.status === "assigned" && (
                    <Chip label="Assigned" color="success" />
                  )}
                </TableCell>

                {/* PM COLUMN */}
                <TableCell>

                  {p.assignedPM ? (
                    <b>{p.assignedPM.name}</b>
                  ) : (
                    <>
                      <Select
                        size="small"
                        value={selectedPM[p._id] || ""}
                        onChange={(e)=>handleSelect(p._id, e.target.value)}
                      >
                        <MenuItem value="">Select PM</MenuItem>

                        {pms.map(pm => (
                          <MenuItem key={pm._id} value={pm._id}>
                            {pm.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <Button
                        size="small"
                        variant="contained"
                        sx={{ ml: 1 }}
                        onClick={() => assignPM(p._id)}
                      >
                        Assign
                      </Button>
                    </>
                  )}

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  );
}

export default AdminProjects;