// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function ViewProjectManagers() {
//   const [pms, setPms] = useState([]);
//   const navigate = useNavigate();

//   const fetchPMs = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       "http://localhost:5000/api/admin/project-managers",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     setPms(res.data);
//   };

//   useEffect(() => {
//     fetchPMs();
//   }, []);

//   const deletePM = async (id) => {
//     const token = localStorage.getItem("token");

//     await axios.delete(
//       `http://localhost:5000/api/admin/project-manager/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     fetchPMs();
//   };

//   return (
//     <div>

//       <h2>Project Managers</h2>

//       <button onClick={() => navigate("/superAdmin/add-project-manager")}>
//         Add Project Manager
//       </button>

//       <table border="1">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>City</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {pms.map((pm) => (
//             <tr key={pm._id}>
//               <td>{pm.name}</td>
//               <td>{pm.email}</td>
//               <td>{pm.phoneno}</td>
//               <td>{pm.city}</td>

//               <td>
//                 <button onClick={() => navigate(`/superAdmin/edit-project-manager/${pm._id}`)}>
//                   Edit
//                 </button>

//                 <button onClick={() => deletePM(pm._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table>

//     </div>
//   );
// }

// export default ViewProjectManagers;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  CircularProgress,
  Tooltip,
  Chip,
  Button
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function ViewProjectManagers() {

  const [pms, setPms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPMs = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/project-managers",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setPms(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPMs();
  }, []);

  const deletePM = async (id) => {

    if (!window.confirm("Delete this project manager?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/admin/project-manager/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchPMs();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: "70px", width: "100%" }}>

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >

        <Box>

          <Typography variant="h4" fontWeight="bold">
            Project Managers
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage and control all project managers in your system
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/superAdmin/add-project-manager")}
        >
          Add Manager
        </Button>

      </Box>

      <Chip
        icon={<PersonIcon />}
        label={`${pms.length} Managers`}
        color="primary"
        variant="outlined"
        sx={{ mb: 3 }}
      />

      {/* Table */}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >

        <Table>

          <TableHead
            sx={{
              background: "linear-gradient(90deg,#1976d2,#42a5f5)"
            }}
          >

            <TableRow>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Manager
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Phone
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                City
              </TableCell>

              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {pms.map((pm) => (

              <TableRow
                key={pm._id}
                hover
                sx={{
                  transition: "0.2s",
                  "&:hover": { backgroundColor: "#f5faff" }
                }}
              >

                <TableCell>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {pm.name?.charAt(0)}
                    </Avatar>

                    <Typography fontWeight="medium">
                      {pm.name}
                    </Typography>

                  </Box>

                </TableCell>

                <TableCell>{pm.email}</TableCell>

                <TableCell>{pm.phoneno}</TableCell>

                <TableCell>{pm.city}</TableCell>

                {/* Actions */}

                <TableCell align="center">

                  <Tooltip title="Edit Manager">

                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/superAdmin/edit-project-manager/${pm._id}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete Manager">

                    <IconButton
                      color="error"
                      onClick={() => deletePM(pm._id)}
                    >
                      <DeleteIcon />
                    </IconButton>

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

export default ViewProjectManagers;