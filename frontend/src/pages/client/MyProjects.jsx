// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Button,
//   Chip,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow
// } from "@mui/material";

// function MyProjects() {
//   const navigate = useNavigate();

//   const { data: projects = [], isLoading } = useQuery({
//     queryKey: ["my-approved-projects"],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       const res = await axios.get("http://localhost:5000/api/projects/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Sirf approved projects filter karo
//       return res.data.filter((proj) => proj.status === "approved");
//     },
//   });

//   if (isLoading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (projects.length === 0) {
//     return (
//       <Box sx={{ mt: "70px", p: 4, textAlign: "center" }}>
//         <Typography variant="h5" color="text.secondary">
//           No approved projects yet. Wait for SuperAdmin to assign Project Manager!
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: "70px", p: 4, width: "100%" }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         My Approved Projects
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ background: "#f1f5f9" }}>
//             <TableRow>
//               <TableCell><b>Project Title</b></TableCell>
//               <TableCell><b>Deadline</b></TableCell>
//               <TableCell><b>Budget</b></TableCell>
//               <TableCell><b>Status</b></TableCell>
//               <TableCell align="center"><b>Action</b></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {projects.map((proj) => (
//               <TableRow key={proj._id} hover>
//                 <TableCell>{proj.title}</TableCell>
//                 <TableCell>{new Date(proj.deadline).toLocaleDateString()}</TableCell>
//                 <TableCell>₹{proj.budget}</TableCell>
//                 <TableCell>
//                   <Chip label="Approved" color="success" size="small" />
//                 </TableCell>
//                 <TableCell align="center">
//                   <Button
//                     variant="contained"
//                     size="small"
//                     onClick={() => navigate(`/client/project-detail/${proj._id}`)}  // Aage detail page banayenge
//                   >
//                     View Progress
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default MyProjects;
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
  Avatar,
  Alert,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";

function MyProjects() {
  const navigate = useNavigate();

  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["my-approved-projects"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const res = await axios.get("http://localhost:5000/api/projects/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Only approved projects
      return res.data.filter((proj) => proj.status === "approved");
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !projects) {
    return (
      <Alert severity="error" sx={{ mt: 4, mx: "auto", maxWidth: 600 }}>
        Failed to load projects. Please try again later.
      </Alert>
    );
  }

  if (projects.length === 0) {
    return (
      <Box sx={{ mt: "100px", textAlign: "center", px: 4 }}>
        <FolderIcon sx={{ fontSize: 100, color: "grey.400", mb: 3 }} />
        <Typography variant="h5" gutterBottom color="text.secondary">
          No Approved Projects Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your approved projects will appear here once SuperAdmin assigns a Project Manager.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/client/create-project")}
        >
          Create New Requirement
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: "70px",  width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Active Projects
        </Typography>
        <Chip
          icon={<FolderIcon />}
          label={`${projects.length} Active Projects`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <TableContainer 
        component={Paper} 
        elevation={3}
        sx={{ 
          borderRadius: 2, 
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FolderIcon fontSize="small" /> Project Title
                </Box>
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" /> Deadline
                </Box>
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AttachMoneyIcon fontSize="small" /> Budget
                </Box>
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon fontSize="small" /> Project Manager
                </Box>
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                Progress
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.map((proj) => (
              <TableRow 
                key={proj._id} 
                hover 
                sx={{ 
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { backgroundColor: "#f5faff" }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1" fontWeight="medium">
                    {proj.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(proj.deadline).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </TableCell>
                <TableCell>₹{Number(proj.budget).toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  {proj.projectManagerId ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                        {proj.projectManagerId.name?.charAt(0) || "P"}
                      </Avatar>
                      <Typography variant="body2">
                        {proj.projectManagerId.name || "Assigned"}
                      </Typography>
                    </Box>
                  ) : (
                    <Chip label="Not Assigned" size="small" color="warning" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {/* Future: Progress bar yahan aayega */}
                  <Chip label="In Progress" color="info" size="small" />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Project Details & Progress">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/client/project-detail/${proj._id}`)}
                    >
                      View Details
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyProjects;