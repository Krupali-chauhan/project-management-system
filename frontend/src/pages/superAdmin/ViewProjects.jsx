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
  Button,
  Chip
} from "@mui/material";

function ViewProjects() {

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/projects",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const approveProject = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/project/approve/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProjects();
  };

  const rejectProject = async (id) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/project/reject/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProjects();
  };

  return (

    <Box sx={{ p:4 }}>

      <Typography variant="h4" sx={{ mb:3 }}>
        Project Requests
      </Typography>

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Title</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {projects.map((proj)=>(

              <TableRow key={proj._id}>

                <TableCell>{proj.title}</TableCell>

                <TableCell>{proj.clientId?.name}</TableCell>

                <TableCell>₹{proj.budget}</TableCell>

                <TableCell>{proj.deadline}</TableCell>

                <TableCell>

                  {proj.status === "pending" && (
                    <Chip label="Pending" color="warning"/>
                  )}

                  {proj.status === "approved" && (
                    <Chip label="Approved" color="success"/>
                  )}

                  {proj.status === "rejected" && (
                    <Chip label="Rejected" color="error"/>
                  )}

                </TableCell>

                <TableCell>

                  {proj.status === "pending" && (
                    <>
                      <Button
                        size="small"
                        color="success"
                        onClick={()=>approveProject(proj._id)}
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={()=>rejectProject(proj._id)}
                      >
                        Reject
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

export default ViewProjects;