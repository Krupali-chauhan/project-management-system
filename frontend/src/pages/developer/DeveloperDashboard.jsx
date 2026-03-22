
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Divider
// } from "@mui/material";

// import AssignmentIcon from "@mui/icons-material/Assignment";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";

// import DeveloperSidebar from "../../components/layout/DeveloperSidebar";

// function DeveloperDashboard() {

//   const [stats, setStats] = useState({
//     assigned: 0,
//     completed: 0,
//     pending: 0
//   });

//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {

//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "http://localhost:5000/api/developer/dashboard",
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         setStats(res.data.stats);
//         setTasks(res.data.tasks);

//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   const cardStyle = {
//     height: 150,
//     borderRadius: "14px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
//     transition: "0.3s",
//     "&:hover": {
//       transform: "translateY(-6px)"
//     }
//   };

//   const numberStyle = {
//     fontSize: "2.5rem",
//     fontWeight: "700",
//     marginBottom: "5px"
//   };

//   return (
//     <div style={{ display: "flex" }}>

//       {/* Sidebar */}
//       <DeveloperSidebar />

//       {/* Main Content */}
//       <Box sx={{ p: 4, background: "#f8fafc", minHeight: "100vh", width: "100%" }}>

//         {/* Title */}
//         <Typography variant="h4" fontWeight="bold" mb={4}>
//           Developer Dashboard
//         </Typography>

//         {/* 🔥 Stats Cards */}
//         <Grid container spacing={3}>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={{ ...cardStyle, background: "#eff6ff" }}>
//               <CardContent>
//                 <AssignmentIcon sx={{ fontSize: 45, color: "#2563eb" }} />
//                 <Typography sx={numberStyle}>{stats.assigned}</Typography>
//                 <Typography>Assigned Tasks</Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={{ ...cardStyle, background: "#ecfdf5" }}>
//               <CardContent>
//                 <CheckCircleIcon sx={{ fontSize: 45, color: "#10b981" }} />
//                 <Typography sx={numberStyle}>{stats.completed}</Typography>
//                 <Typography>Completed Tasks</Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Card sx={{ ...cardStyle, background: "#fef3c7" }}>
//               <CardContent>
//                 <PendingActionsIcon sx={{ fontSize: 45, color: "#f59e0b" }} />
//                 <Typography sx={numberStyle}>{stats.pending}</Typography>
//                 <Typography>Pending Tasks</Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//         </Grid>

//         {/* 🔥 Task List */}
//         <Box sx={{ mt: 6 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             My Tasks
//           </Typography>

//           <Card sx={{ borderRadius: 3 }}>
//             <CardContent>

//               {tasks.length === 0 ? (
//                 <Typography>No Tasks Assigned</Typography>
//               ) : (
//                 tasks.map((t, index) => (

//                   <Box key={t._id}>

//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         py: 1
//                       }}
//                     >
//                       <Typography>{t.title}</Typography>

//                       <Chip
//                         label={t.status}
//                         color={
//                           t.status === "completed"
//                             ? "success"
//                             : t.status === "pending"
//                             ? "warning"
//                             : "default"
//                         }
//                       />
//                     </Box>

//                     {index !== tasks.length - 1 && <Divider />}

//                   </Box>

//                 ))
//               )}

//             </CardContent>
//           </Card>
//         </Box>

//         {/* 🔥 Overview */}
//         <Box sx={{ mt: 6, textAlign: "center" }}>
//           <Typography variant="h5" fontWeight="bold">
//             Overview
//           </Typography>

//           <Typography color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
//             You have {stats.assigned} assigned tasks and {stats.pending} pending tasks.
//             Complete your tasks on time to improve project progress.
//           </Typography>
//         </Box>

//       </Box>
//     </div>
//   );
// }

// export default DeveloperDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import DeveloperSidebar from "../../components/layout/DeveloperSidebar";

function DeveloperDashboard() {

  const [stats, setStats] = useState({
    assigned: 0,
    completed: 0,
    pending: 0
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/developer/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setStats(res.data.stats);
        setTasks(res.data.tasks);

      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  const cardStyle = {
    height: 150,
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-6px)"
    }
  };

  const numberStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "5px"
  };

  return (
    <div style={{ display: "flex" }}>


      {/* Main Content */}
      <Box
        sx={{
          p: 4,
          background: "#f8fafc",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          
        >
          Developer Dashboard
        </Typography>

        {/* 🔥 Stats Cards */}
        <Grid container spacing={3} >

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ ...cardStyle, background: "#eff6ff" }}>
              <CardContent>
                <AssignmentIcon sx={{ fontSize: 45, color: "#2563eb" }} />
                <Typography sx={numberStyle}>{stats.assigned}</Typography>
                <Typography>Assigned Tasks</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ ...cardStyle, background: "#ecfdf5" }}>
              <CardContent>
                <CheckCircleIcon sx={{ fontSize: 45, color: "#10b981" }} />
                <Typography sx={numberStyle}>{stats.completed}</Typography>
                <Typography>Completed Tasks</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ ...cardStyle, background: "#fef3c7" }}>
              <CardContent>
                <PendingActionsIcon sx={{ fontSize: 45, color: "#f59e0b" }} />
                <Typography sx={numberStyle}>{stats.pending}</Typography>
                <Typography>Pending Tasks</Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* 🔥 My Tasks */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            My Tasks
          </Typography>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>

              {tasks.length === 0 ? (
                <Typography>No Tasks Assigned</Typography>
              ) : (
                tasks.map((t, index) => (

                  <Box key={t._id}>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1
                      }}
                    >
                      <Typography>{t.title}</Typography>

                      <Chip
                        label={t.status}
                        color={
                          t.status === "completed"
                            ? "success"
                            : t.status === "pending"
                            ? "warning"
                            : "default"
                        }
                      />
                    </Box>

                    {index !== tasks.length - 1 && <Divider />}

                  </Box>

                ))
              )}

            </CardContent>
          </Card>
        </Box>

        {/* 🔥 Overview */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Overview
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
          >
            You have {stats.assigned} assigned tasks and {stats.pending} pending tasks.
            Complete your tasks on time to improve project progress.
          </Typography>
        </Box>

      </Box>

    </div>
  );
}

export default DeveloperDashboard;