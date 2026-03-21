// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   Box,
// //   Typography,
// //   Table,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   TableContainer,
// //   Paper,
// //   Button,
// //   Chip
// // } from "@mui/material";

// // function ViewProjects() {

// //   const [projects, setProjects] = useState([]);

// //   const fetchProjects = async () => {

// //     const token = localStorage.getItem("token");

// //     const res = await axios.get(
// //       "http://localhost:5000/api/admin/projects",
// //       {
// //         headers: { Authorization: `Bearer ${token}` }
// //       }
// //     );

// //     setProjects(res.data);
// //   };

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);

// //   const approveProject = async (id) => {

// //     const token = localStorage.getItem("token");

// //     await axios.put(
// //       `http://localhost:5000/api/admin/project/approve/${id}`,
// //       {},
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     fetchProjects();
// //   };

// //   const rejectProject = async (id) => {

// //     const token = localStorage.getItem("token");

// //     await axios.put(
// //       `http://localhost:5000/api/admin/project/reject/${id}`,
// //       {},
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     fetchProjects();
// //   };

// //   const createProject = async (id) => {
// //   const token = localStorage.getItem("token");

// //   await axios.post(
// //     `http://localhost:5000/api/projects/create-project/${id}`,
// //     {},
// //     { headers: { Authorization: `Bearer ${token}` } }
// //   );

// //   alert("Project Created Successfully");
// //   fetchProjects();
// // };

// //   return (

// //     <Box sx={{ p:4 }}>

// //       <Typography variant="h4" sx={{ mb:3 }}>
// //         Project Requests
// //       </Typography>

// //       <TableContainer component={Paper}>

// //         <Table>

// //           <TableHead>

// //             <TableRow>

// //               <TableCell>Title</TableCell>
// //               <TableCell>Client</TableCell>
// //               <TableCell>Budget</TableCell>
// //               <TableCell>Deadline</TableCell>
// //               <TableCell>Status</TableCell>
// //               <TableCell>Action</TableCell>

// //             </TableRow>

// //           </TableHead>

// //           <TableBody>

// //             {projects.map((proj)=>(

// //               <TableRow key={proj._id}>

// //                 <TableCell>{proj.title}</TableCell>

// //                 <TableCell>{proj.clientId?.name}</TableCell>

// //                 <TableCell>₹{proj.budget}</TableCell>

// //                 <TableCell>{proj.deadline}</TableCell>

// //                 <TableCell>

// //                   {proj.status === "pending" && (
// //                     <Chip label="Pending" color="warning"/>
// //                   )}

// //                   {proj.status === "approved" && (
// //                     <Chip label="Approved" color="success"/>
// //                   )}

// //                   {proj.status === "rejected" && (
// //                     <Chip label="Rejected" color="error"/>
// //                   )}

// //                 </TableCell>

// //                 <TableCell>

// //                   {proj.status === "pending" && (
// //                     <>
// //                       <Button
// //                         size="small"
// //                         color="success"
// //                         onClick={()=>approveProject(proj._id)}
// //                       >
// //                         Approve
// //                       </Button>

// //                       <Button
// //                         size="small"
// //                         color="error"
// //                         onClick={()=>rejectProject(proj._id)}
// //                       >
// //                         Reject
// //                       </Button>
// //                     </>
// //                   )}
// //                   {proj.status === "approved" && (
// //                     <Button
// //                       size="small"
// //                       variant="contained"
// //                       onClick={() => createProject(proj._id)}
// //                     >
// //                       Create Project
// //                     </Button>
// //                   )}

// //                 </TableCell>

// //               </TableRow>

// //             ))}

// //           </TableBody>

// //         </Table>

// //       </TableContainer>

// //     </Box>

// //   );

// // }

// // export default ViewProjects;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   Button,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent
// } from "@mui/material";

// function ViewProjects() {

//   const [projects, setProjects] = useState([]);
//   const [openSow, setOpenSow] = useState(false);
//   const [selectedSow, setSelectedSow] = useState("");
//   const [openDesc, setOpenDesc] = useState(false);
// const [selectedProjectId, setSelectedProjectId] = useState("");
// const [description, setDescription] = useState("");

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // ✅ FETCH PROJECTS
//  useEffect(() => {
//   fetchProjects();
// }, []);

// const fetchProjects = async () => {
//   try {

//     const res = await axios.get(
//       "http://localhost:5000/api/admin/projects",
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     console.log("DATA:", res.data);

//     const filtered = res.data.filter(
//       p =>
//         p.status === "pending" ||
//         p.status === "approved" ||
//         p.status === "rejected"
//     );

//     setProjects(filtered);

//   } catch (err) {
//     console.log(err);
//   }
// };
//   // ✅ CREATE PROJECT
// //   const createProject = async (id) => {
// //   try {
// //     await axios.put(
// //       `http://localhost:5000/api/admin/project/create/${id}`,
// //       {},
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     navigate("/superAdmin/admin-projects");

// //   } catch (err) {
// //     console.log(err);
// //     alert("Error");
// //   }
// // };

// const createProject = async () => {
//   try {
//     await axios.put(
//       `http://localhost:5000/api/admin/project/create/${selectedProjectId}`,
//       { description },   // ✅ NEW
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setOpenDesc(false);
//     setDescription("");

//     navigate("/superAdmin/admin-projects");

//   } catch (err) {
//     console.log(err);
//     alert("Error");
//   }
// };

//   return (
//     <Box sx={{ p: 4 }}>

//       <Typography variant="h5" mb={2} fontWeight="bold">
//         Client Requirements
//       </Typography>

//       <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//         <Table>

//           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//             <TableRow>
//               <TableCell><b>Title</b></TableCell>
//               <TableCell><b>Client</b></TableCell>
//               <TableCell><b>Budget</b></TableCell>
//               <TableCell><b>Deadline</b></TableCell>
//               <TableCell><b>Status</b></TableCell>
//               <TableCell><b>Action</b></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {projects.map((proj) => (

//               <TableRow key={proj._id} hover>

//                 <TableCell>{proj.title}</TableCell>
//                 <TableCell>{proj.clientId?.name || "-"}</TableCell>
//                 <TableCell>₹{proj.budget}</TableCell>
//                 <TableCell>{proj.deadline}</TableCell>

//                 {/* ✅ STATUS (CLIENT BASED ONLY) */}
//                 <TableCell>
//                   {proj.status === "pending" && (
//                     <Chip label="Pending" color="warning" />
//                   )}
//                   {proj.status === "approved" && proj.status !== "created" && (
//                     <Chip label="Approved" color="success" />
//                   )}
//                   {proj.status === "rejected" && (
//                     <Chip label="Rejected" color="error" />
//                   )}
                 
//                 </TableCell>

//                 {/* ✅ ACTION */}
//                 <TableCell>

//                   {/* 🔥 ONLY APPROVED */}
//                   {proj.status === "approved" && (
//                     <>
//                       <Button
//                         variant="contained"
//                         sx={{ mr: 1 }}
//                         onClick={() => {
//   setSelectedProjectId(proj._id);
//   setOpenDesc(true);
// }}
//                       >
//                         Create Project
//                       </Button>

//                       <Button
//                         variant="outlined"
//                         onClick={() => {
//                           setSelectedSow(proj.sow);
//                           setOpenSow(true);
//                         }}
//                       >
//                         View SOW
//                       </Button>

//                       <Dialog open={openDesc} onClose={() => setOpenDesc(false)} fullWidth>
//   <DialogTitle>Add Project Description</DialogTitle>

//   <DialogContent>

//     <textarea
//       rows="4"
//       style={{
//         width: "100%",
//         padding: "10px",
//         marginTop: "10px"
//       }}
//       placeholder="Enter project description..."
//       value={description}
//       onChange={(e) => setDescription(e.target.value)}
//     />

//     <Box sx={{ mt: 2, textAlign: "right" }}>
//       <Button
//         variant="contained"
//         onClick={createProject}
//       >
//         Submit
//       </Button>
//     </Box>

//   </DialogContent>
// </Dialog>
//                     </>
//                   )}

                 
//                 </TableCell>

//               </TableRow>

//             ))}
//           </TableBody>

//         </Table>
//       </TableContainer>

//       {/* SOW POPUP */}
//       <Dialog open={openSow} onClose={() => setOpenSow(false)} fullWidth>
//         <DialogTitle>Project SOW</DialogTitle>
//         <DialogContent>
//           <Typography>{selectedSow}</Typography>
//         </DialogContent>
//       </Dialog>

//     </Box>
//   );
// }

// export default ViewProjects;
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [openSow, setOpenSow] = useState(false);
  const [selectedSow, setSelectedSow] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Sirf pending + approved + rejected dikhao (tumhare filter ke hisaab se)
      const filtered = res.data.filter(
        (p) => p.status === "pending" || p.status === "approved" || p.status === "rejected"
      );
      setProjects(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ CREATE PROJECT – NO POPUP, DIRECT CALL
  // CREATE PROJECT – correct method POST
const handleCreateProject = async (projectId, title) => {
  if (!window.confirm(`Create admin project for "${title}" from approved SOW?`)) return;

  try {
    await axios.post(  // ← POST karo (PUT nahi)
      `http://localhost:5000/api/admin/projects/${projectId}/create-admin`,
      {}, // no body
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Admin project created successfully!");
    fetchProjects(); // Refresh
  } catch (err) {
    console.error("Create error:", err.response?.data || err.message);
    alert("Error: " + (err.response?.data?.message || "Failed to create project"));
  }
};
  // View SOW popup open
  const handleViewSOW = (sow, title) => {
    setSelectedSow(sow || "No SOW generated yet.");
    setSelectedTitle(title);
    setOpenSow(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Client Requirements
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Budget</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Deadline</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.map((proj) => (
              <TableRow key={proj._id} hover>
                <TableCell>{proj.title}</TableCell>
                <TableCell>{proj.clientId?.name || "Unknown"}</TableCell>
                <TableCell>₹{Number(proj.budget).toLocaleString()}</TableCell>
                <TableCell>{proj.deadline}</TableCell>

                <TableCell>
                  <Chip
                    label={proj.status.toUpperCase()}
                    color={
                      proj.status === "approved" ? "success" :
                      proj.status === "rejected" ? "error" :
                      "warning"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  {/* View SOW – better popup */}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleViewSOW(proj.sow, proj.title)}
                  >
                    View SOW
                  </Button>

                  {/* CREATE PROJECT – NO POPUP */}
                  {proj.status === "approved" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleCreateProject(proj._id, proj.title)}
                    >
                      Create Project
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Better SOW Popup */}
      <Dialog
        open={openSow}
        onClose={() => setOpenSow(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <span>{selectedTitle} - Statement of Work</span>   {/* ← h2/h6 issue nahi aayega */}
  <IconButton onClick={() => setOpenSow(false)} size="small">
    <CloseIcon />
  </IconButton>
</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto", p: 3 }}>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
              fontFamily: "Roboto Mono, monospace", // better for markdown-like text
            }}
          >
            {selectedSow}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenSow(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewProjects;