// import React, { useEffect, useState } from "react";
// import axios from "axios";
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
//   Chip
// } from "@mui/material";

// function ViewProjects() {

//   const [projects, setProjects] = useState([]);

//   const fetchProjects = async () => {

//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       "http://localhost:5000/api/admin/projects",
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     setProjects(res.data);
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const approveProject = async (id) => {

//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/admin/project/approve/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     fetchProjects();
//   };

//   const rejectProject = async (id) => {

//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/admin/project/reject/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     fetchProjects();
//   };

//   const createProject = async (id) => {
//   const token = localStorage.getItem("token");

//   await axios.post(
//     `http://localhost:5000/api/projects/create-project/${id}`,
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

//   alert("Project Created Successfully");
//   fetchProjects();
// };

//   return (

//     <Box sx={{ p:4 }}>

//       <Typography variant="h4" sx={{ mb:3 }}>
//         Project Requests
//       </Typography>

//       <TableContainer component={Paper}>

//         <Table>

//           <TableHead>

//             <TableRow>

//               <TableCell>Title</TableCell>
//               <TableCell>Client</TableCell>
//               <TableCell>Budget</TableCell>
//               <TableCell>Deadline</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Action</TableCell>

//             </TableRow>

//           </TableHead>

//           <TableBody>

//             {projects.map((proj)=>(

//               <TableRow key={proj._id}>

//                 <TableCell>{proj.title}</TableCell>

//                 <TableCell>{proj.clientId?.name}</TableCell>

//                 <TableCell>₹{proj.budget}</TableCell>

//                 <TableCell>{proj.deadline}</TableCell>

//                 <TableCell>

//                   {proj.status === "pending" && (
//                     <Chip label="Pending" color="warning"/>
//                   )}

//                   {proj.status === "approved" && (
//                     <Chip label="Approved" color="success"/>
//                   )}

//                   {proj.status === "rejected" && (
//                     <Chip label="Rejected" color="error"/>
//                   )}

//                 </TableCell>

//                 <TableCell>

//                   {proj.status === "pending" && (
//                     <>
//                       <Button
//                         size="small"
//                         color="success"
//                         onClick={()=>approveProject(proj._id)}
//                       >
//                         Approve
//                       </Button>

//                       <Button
//                         size="small"
//                         color="error"
//                         onClick={()=>rejectProject(proj._id)}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                   {proj.status === "approved" && (
//                     <Button
//                       size="small"
//                       variant="contained"
//                       onClick={() => createProject(proj._id)}
//                     >
//                       Create Project
//                     </Button>
//                   )}

//                 </TableCell>

//               </TableRow>

//             ))}

//           </TableBody>

//         </Table>

//       </TableContainer>

//     </Box>

//   );

// }

// export default ViewProjects;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  DialogContent
} from "@mui/material";

function ViewProjects() {

  const [projects, setProjects] = useState([]);
  const [openSow, setOpenSow] = useState(false);
  const [selectedSow, setSelectedSow] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ FETCH PROJECTS
 useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/admin/projects",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log("DATA:", res.data);

    const filtered = res.data.filter(
      p =>
        p.status === "pending" ||
        p.status === "approved" ||
        p.status === "rejected"
    );

    setProjects(filtered);

  } catch (err) {
    console.log(err);
  }
};
  // ✅ CREATE PROJECT
  const createProject = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/admin/project/create/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate("/superAdmin/admin-projects");

  } catch (err) {
    console.log(err);
    alert("Error");
  }
};

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h5" mb={2} fontWeight="bold">
        Client Requirements
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>

          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Client</b></TableCell>
              <TableCell><b>Budget</b></TableCell>
              <TableCell><b>Deadline</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.map((proj) => (

              <TableRow key={proj._id} hover>

                <TableCell>{proj.title}</TableCell>
                <TableCell>{proj.clientId?.name || "-"}</TableCell>
                <TableCell>₹{proj.budget}</TableCell>
                <TableCell>{proj.deadline}</TableCell>

                {/* ✅ STATUS (CLIENT BASED ONLY) */}
                <TableCell>
                  {proj.status === "pending" && (
                    <Chip label="Pending" color="warning" />
                  )}
                  {proj.status === "approved" && (
                    <Chip label="Approved" color="success" />
                  )}
                  {proj.status === "rejected" && (
                    <Chip label="Rejected" color="error" />
                  )}
                 
                </TableCell>

                {/* ✅ ACTION */}
                <TableCell>

                  {/* 🔥 ONLY APPROVED */}
                  {proj.status === "approved" && (
                    <>
                      <Button
                        variant="contained"
                        sx={{ mr: 1 }}
                        onClick={() => createProject(proj._id)}
                      >
                        Create Project
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedSow(proj.sow);
                          setOpenSow(true);
                        }}
                      >
                        View SOW
                      </Button>
                    </>
                  )}

                 
                </TableCell>

              </TableRow>

            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* SOW POPUP */}
      <Dialog open={openSow} onClose={() => setOpenSow(false)} fullWidth>
        <DialogTitle>Project SOW</DialogTitle>
        <DialogContent>
          <Typography>{selectedSow}</Typography>
        </DialogContent>
      </Dialog>

    </Box>
  );
}

export default ViewProjects;