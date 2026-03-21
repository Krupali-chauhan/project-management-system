// // // // import React from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { useQuery } from "@tanstack/react-query";
// // // // import axios from "axios";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   CircularProgress,
// // // //   Button,
// // // //   Chip,
// // // //   Paper,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow
// // // // } from "@mui/material";

// // // // function MyProjects() {
// // // //   const navigate = useNavigate();

// // // //   const { data: projects = [], isLoading } = useQuery({
// // // //     queryKey: ["my-approved-projects"],
// // // //     queryFn: async () => {
// // // //       const token = localStorage.getItem("token");
// // // //       if (!token) return [];

// // // //       const res = await axios.get("http://localhost:5000/api/projects/my", {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       // Sirf approved projects filter karo
// // // //       return res.data.filter((proj) => proj.status === "approved");
// // // //     },
// // // //   });

// // // //   if (isLoading) {
// // // //     return (
// // // //       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
// // // //         <CircularProgress />
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   if (projects.length === 0) {
// // // //     return (
// // // //       <Box sx={{ mt: "70px", p: 4, textAlign: "center" }}>
// // // //         <Typography variant="h5" color="text.secondary">
// // // //           No approved projects yet. Wait for SuperAdmin to assign Project Manager!
// // // //         </Typography>
// // // //       </Box>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Box sx={{ mt: "70px", p: 4, width: "100%" }}>
// // // //       <Typography variant="h4" sx={{ mb: 3 }}>
// // // //         My Approved Projects
// // // //       </Typography>

// // // //       <TableContainer component={Paper}>
// // // //         <Table>
// // // //           <TableHead sx={{ background: "#f1f5f9" }}>
// // // //             <TableRow>
// // // //               <TableCell><b>Project Title</b></TableCell>
// // // //               <TableCell><b>Deadline</b></TableCell>
// // // //               <TableCell><b>Budget</b></TableCell>
// // // //               <TableCell><b>Status</b></TableCell>
// // // //               <TableCell align="center"><b>Action</b></TableCell>
// // // //             </TableRow>
// // // //           </TableHead>

// // // //           <TableBody>
// // // //             {projects.map((proj) => (
// // // //               <TableRow key={proj._id} hover>
// // // //                 <TableCell>{proj.title}</TableCell>
// // // //                 <TableCell>{new Date(proj.deadline).toLocaleDateString()}</TableCell>
// // // //                 <TableCell>₹{proj.budget}</TableCell>
// // // //                 <TableCell>
// // // //                   <Chip label="Approved" color="success" size="small" />
// // // //                 </TableCell>
// // // //                 <TableCell align="center">
// // // //                   <Button
// // // //                     variant="contained"
// // // //                     size="small"
// // // //                     onClick={() => navigate(`/client/project-detail/${proj._id}`)}  // Aage detail page banayenge
// // // //                   >
// // // //                     View Progress
// // // //                   </Button>
// // // //                 </TableCell>
// // // //               </TableRow>
// // // //             ))}
// // // //           </TableBody>
// // // //         </Table>
// // // //       </TableContainer>
// // // //     </Box>
// // // //   );
// // // // }

// // // // export default MyProjects;
// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useQuery } from "@tanstack/react-query";
// // // import axios from "axios";
// // // import {
// // //   Box,
// // //   Typography,
// // //   CircularProgress,
// // //   Button,
// // //   Chip,
// // //   Paper,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Tooltip,
// // //   Avatar,
// // //   Alert,
// // // } from "@mui/material";
// // // import FolderIcon from "@mui/icons-material/Folder";
// // // import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// // // import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// // // import PersonIcon from "@mui/icons-material/Person";

// // // function MyProjects() {
// // //   const navigate = useNavigate();

// // //   const { data: projects = [], isLoading, isError } = useQuery({
// // //     queryKey: ["my-approved-projects"],
// // //     queryFn: async () => {
// // //       const token = localStorage.getItem("token");
// // //       if (!token) return [];

// // //       const res = await axios.get("http://localhost:5000/api/projects/my", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       // Only approved projects
// // //       return res.data.filter((proj) => proj.status === "approved");
// // //     },
// // //   });

// // //   if (isLoading) {
// // //     return (
// // //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
// // //         <CircularProgress size={60} />
// // //       </Box>
// // //     );
// // //   }

// // //   if (isError || !projects) {
// // //     return (
// // //       <Alert severity="error" sx={{ mt: 4, mx: "auto", maxWidth: 600 }}>
// // //         Failed to load projects. Please try again later.
// // //       </Alert>
// // //     );
// // //   }

// // //   if (projects.length === 0) {
// // //     return (
// // //       <Box sx={{ mt: "100px", textAlign: "center", px: 4 }}>
// // //         <FolderIcon sx={{ fontSize: 100, color: "grey.400", mb: 3 }} />
// // //         <Typography variant="h5" gutterBottom color="text.secondary">
// // //           No Approved Projects Yet
// // //         </Typography>
// // //         <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
// // //           Your approved projects will appear here once SuperAdmin assigns a Project Manager.
// // //         </Typography>
// // //         <Button
// // //           variant="contained"
// // //           color="primary"
// // //           size="large"
// // //           onClick={() => navigate("/client/create-project")}
// // //         >
// // //           Create New Requirement
// // //         </Button>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box sx={{ mt: "70px",  width: "100%" }}>
// // //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
// // //         <Typography variant="h4" component="h1">
// // //           My Active Projects
// // //         </Typography>
// // //         <Chip
// // //           icon={<FolderIcon />}
// // //           label={`${projects.length} Active Projects`}
// // //           color="primary"
// // //           variant="outlined"
// // //         />
// // //       </Box>

// // //       <TableContainer 
// // //         component={Paper} 
// // //         elevation={3}
// // //         sx={{ 
// // //           borderRadius: 2, 
// // //           overflow: "hidden",
// // //           boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
// // //         }}
// // //       >
// // //         <Table sx={{ minWidth: 650 }}>
// // //           <TableHead sx={{ background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)" }}>
// // //             <TableRow>
// // //               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// // //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                   <FolderIcon fontSize="small" /> Project Title
// // //                 </Box>
// // //               </TableCell>
// // //               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// // //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                   <CalendarTodayIcon fontSize="small" /> Deadline
// // //                 </Box>
// // //               </TableCell>
// // //               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// // //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                   <AttachMoneyIcon fontSize="small" /> Budget
// // //                 </Box>
// // //               </TableCell>
// // //               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
// // //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                   <PersonIcon fontSize="small" /> Project Manager
// // //                 </Box>
// // //               </TableCell>
// // //               <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
// // //                 Progress
// // //               </TableCell>
// // //               <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
// // //                 Action
// // //               </TableCell>
// // //             </TableRow>
// // //           </TableHead>

// // //           <TableBody>
// // //             {projects.map((proj) => (
// // //               <TableRow 
// // //                 key={proj._id} 
// // //                 hover 
// // //                 sx={{ 
// // //                   "&:last-child td, &:last-child th": { border: 0 },
// // //                   cursor: "pointer",
// // //                   transition: "background 0.2s",
// // //                   "&:hover": { backgroundColor: "#f5faff" }
// // //                 }}
// // //               >
// // //                 <TableCell component="th" scope="row">
// // //                   <Typography variant="subtitle1" fontWeight="medium">
// // //                     {proj.title}
// // //                   </Typography>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   {new Date(proj.deadline).toLocaleDateString("en-IN", {
// // //                     day: "numeric",
// // //                     month: "short",
// // //                     year: "numeric"
// // //                   })}
// // //                 </TableCell>
// // //                 <TableCell>₹{Number(proj.budget).toLocaleString("en-IN")}</TableCell>
// // //                 <TableCell>
// // //                   {proj.projectManagerId ? (
// // //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                       <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
// // //                         {proj.projectManagerId.name?.charAt(0) || "P"}
// // //                       </Avatar>
// // //                       <Typography variant="body2">
// // //                         {proj.projectManagerId.name || "Assigned"}
// // //                       </Typography>
// // //                     </Box>
// // //                   ) : (
// // //                     <Chip label="Not Assigned" size="small" color="warning" />
// // //                   )}
// // //                 </TableCell>
// // //                 <TableCell align="center">
// // //                   {/* Future: Progress bar yahan aayega */}
// // //                   <Chip label="In Progress" color="info" size="small" />
// // //                 </TableCell>
// // //                 <TableCell align="center">
// // //                   <Tooltip title="View Project Details & Progress">
// // //                     <Button
// // //                       variant="contained"
// // //                       size="small"
// // //                       color="primary"
// // //                       onClick={() => navigate(`/client/project-detail/${proj._id}`)}
// // //                     >
// // //                       View Details
// // //                     </Button>
// // //                   </Tooltip>
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     </Box>
// // //   );
// // // }

// // // export default MyProjects;
// // // src/pages/client/MyProjects.jsx
// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// // import axios from "axios";
// // import {
// //   Box,
// //   Typography,
// //   CircularProgress,
// //   Button,
// //   Chip,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Alert,
// // } from "@mui/material";

// // function MyProjects() {
// //   const navigate = useNavigate();

// //   const { data: allProjects = [], isLoading, isError, error } = useQuery({
// //     queryKey: ["my-projects"],
// //     queryFn: async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) throw new Error("No authentication token found");

// //       const res = await axios.get("http://localhost:5000/api/projects/my", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log("API Response - All Projects:", res.data); // ← DEBUG: yeh console mein dikhega

// //       return res.data;
// //     },
// //   });

// //   // Filter only approved
// //   const approvedProjects = allProjects.filter((proj) => proj.status === "approved");

// //   console.log("Filtered Approved Projects:", approvedProjects); // ← DEBUG: yeh check karo kitne aa rahe

// //   if (isLoading) {
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (isError) {
// //     return (
// //       <Box sx={{ mt: "70px", p: 4, maxWidth: 800, mx: "auto" }}>
// //         <Alert severity="error">
// //           Error loading projects: {error?.message || "Unknown error. Check console."}
// //         </Alert>
// //       </Box>
// //     );
// //   }

// //   if (approvedProjects.length === 0) {
// //     return (
// //       <Box sx={{ mt: "70px", p: 4, textAlign: "center" }}>
// //         <Typography variant="h5" color="text.secondary" gutterBottom>
// //           No Approved Projects Found
// //         </Typography>
// //         <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
// //           {allProjects.length > 0 
// //             ? `You have ${allProjects.length} projects, but none are approved yet.` 
// //             : "No projects found at all."}
// //         </Typography>
// //         <Button
// //           variant="contained"
// //           onClick={() => navigate("/client/view-sow")}
// //         >
// //           Go to View SOWs
// //         </Button>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ mt: "70px", p: 4, width: "100%" }}>
// //       <Typography variant="h4" sx={{ mb: 3 }}>
// //         My Projects ({approvedProjects.length})
// //       </Typography>

// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead sx={{ background: "#f1f5f9" }}>
// //             <TableRow>
// //               <TableCell><b>Project Title</b></TableCell>
// //               <TableCell><b>Status</b></TableCell>
// //               <TableCell><b>Deadline</b></TableCell>
// //               <TableCell><b>Budget</b></TableCell>
// //               <TableCell align="center"><b>Action</b></TableCell>
// //             </TableRow>
// //           </TableHead>

// //           <TableBody>
// //             {approvedProjects.map((proj) => (
// //               <TableRow key={proj._id} hover>
// //                 <TableCell>{proj.title}</TableCell>
// //                 <TableCell>
// //                   <Chip label="Approved" color="success" size="small" />
// //                 </TableCell>
// //                 <TableCell>{new Date(proj.deadline).toLocaleDateString()}</TableCell>
// //                 <TableCell>₹{proj.budget}</TableCell>
// //                 <TableCell align="center">
// //                   <Button
// //                     variant="contained"
// //                     size="small"
// //                     onClick={() => navigate(`/client/sow-detail/${proj._id}`)}
// //                   >
// //                     View Details
// //                   </Button>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </Box>
// //   );
// // }

// // export default MyProjects;
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
//   TableRow,
//   Tooltip,
//   Avatar,
//   Alert,
// } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import PersonIcon from "@mui/icons-material/Person";

// function MyProjects() {
//   const navigate = useNavigate();

//   const { data: projects = [], isLoading, isError } = useQuery({
//     queryKey: ["my-approved-projects"],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       const res = await axios.get("http://localhost:5000/api/projects/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Only approved projects
//       return res.data.filter((proj) => proj.status === "approved");
//     },
//   });

//   if (isLoading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (isError || !projects) {
//     return (
//       <Alert severity="error" sx={{ mt: 4, mx: "auto", maxWidth: 600 }}>
//         Failed to load projects. Please try again later.
//       </Alert>
//     );
//   }

//   if (projects.length === 0) {
//     return (
//       <Box sx={{ mt: "100px", textAlign: "center", px: 4 }}>
//         <FolderIcon sx={{ fontSize: 100, color: "grey.400", mb: 3 }} />
//         <Typography variant="h5" gutterBottom color="text.secondary">
//           No Approved Projects Yet
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//           Your approved projects will appear here once SuperAdmin assigns a Project Manager.
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={() => navigate("/client/create-project")}
//         >
//           Create New Requirement
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ mt: "70px", p: { xs: 2, md: 4 }, width: "100%" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//         <Typography variant="h4" component="h1">
//           My Active Projects
//         </Typography>
//         <Chip
//           icon={<FolderIcon />}
//           label={`${projects.length} Active Projects`}
//           color="primary"
//           variant="outlined"
//         />
//       </Box>

//       <TableContainer 
//         component={Paper} 
//         elevation={3}
//         sx={{ 
//           borderRadius: 2, 
//           overflow: "hidden",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
//         }}
//       >
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead sx={{ background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <FolderIcon fontSize="small" /> Project Title
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <CalendarTodayIcon fontSize="small" /> Deadline
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <AttachMoneyIcon fontSize="small" /> Budget
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <PersonIcon fontSize="small" /> Project Manager
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
//                 Progress
//               </TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {projects.map((proj) => (
//               <TableRow 
//                 key={proj._id} 
//                 hover 
//                 sx={{ 
//                   "&:last-child td, &:last-child th": { border: 0 },
//                   cursor: "pointer",
//                   transition: "background 0.2s",
//                   "&:hover": { backgroundColor: "#f5faff" }
//                 }}
//               >
//                 <TableCell component="th" scope="row">
//                   <Typography variant="subtitle1" fontWeight="medium">
//                     {proj.title}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   {new Date(proj.deadline).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric"
//                   })}
//                 </TableCell>
//                 <TableCell>₹{Number(proj.budget).toLocaleString("en-IN")}</TableCell>
//                 <TableCell>
//                   {proj.projectManagerId ? (
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
//                         {proj.projectManagerId.name?.charAt(0) || "P"}
//                       </Avatar>
//                       <Typography variant="body2">
//                         {proj.projectManagerId.name || "Assigned"}
//                       </Typography>
//                     </Box>
//                   ) : (
//                     <Chip label="Not Assigned" size="small" color="warning" />
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   {/* Future: Progress bar yahan aayega */}
//                   <Chip label="In Progress" color="info" size="small" />
//                 </TableCell>
//                 <TableCell align="center">
//                   <Tooltip title="View Project Details & Progress">
//                     <Button
//                       variant="contained"
//                       size="small"
//                       color="primary"
//                       onClick={() => navigate(`/client/project-detail/${proj._id}`)}
//                     >
//                       View Details
//                     </Button>
//                   </Tooltip>
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
  Alert,
  Tooltip,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function MyProjects() {
  const navigate = useNavigate();

  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["my-projects"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const res = await axios.get("http://localhost:5000/api/projects/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Rejected ko exclude karo
      // Baaki sab dikhao: created, approved, assigned, in_progress, etc.
      return res.data.filter((p) => p.status !== "rejected");
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "70vh", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !projects) {
    return <Alert severity="error" sx={{ m: 4 }}>Failed to load projects. Please try again.</Alert>;
  }

  if (projects.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center", px: 4 }}>
        <FolderIcon sx={{ fontSize: 100, color: "grey.300", mb: 3 }} />
        <Typography variant="h5" gutterBottom color="text.secondary">
          No Projects Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your created / approved projects will appear here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/client/view-sow")}
        >
          Go to My SOWs
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8, px: { xs: 2, md: 4 }, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        My Projects ({projects.length})
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.dark" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Project</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                  <CalendarTodayIcon fontSize="small" /> Deadline
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
                  <AttachMoneyIcon fontSize="small" /> Budget
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Action
              </TableCell>
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
                      proj.status === "assigned" || proj.status === "in_progress" ? "info" :
                      proj.status === "created" ? "warning" :
                      "default"
                    }
                    icon={proj.status === "approved" ? <CheckCircleIcon /> : undefined}
                    size="medium"
                  />
                </TableCell>

                <TableCell align="center">
                  {new Date(proj.deadline).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: "medium" }}>
                  ₹{Number(proj.budget).toLocaleString("en-IN")}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="View project details">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/client/project-detail/${proj._id}`)}
                    >
                      View Project
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