

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import ProjectManagerSidebar from "../../components/layout/ProjectManagerSidebar";

// import { Card, CardContent, Typography, Grid } from "@mui/material";

// import WorkIcon from "@mui/icons-material/Work";
// import CodeIcon from "@mui/icons-material/Code";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";

// function PMDashboard() {

//   const [counts, setCounts] = useState({
//     projects: 0,
//     developers: 0,
//     tasks: 0,
//     pending: 0
//   });

//   const [projects, setProjects] = useState([]);

//   useEffect(() => {

//     const fetchDashboard = async () => {
//       try {

//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "http://localhost:5000/api/projectmanager/dashboard",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         console.log("API DATA:", res.data);

//         // ✅ SET STATS
//         setCounts({
//           projects: res.data.stats.projects,
//           developers: res.data.stats.developers,
//           tasks: res.data.stats.tasks,
//           pending: res.data.stats.pendingTasks
//         });

//         // ✅ SET PROJECTS LIST
//         setProjects(res.data.projects);

//       } catch (error) {
//         console.log("Dashboard Error:", error);
//       }
//     };

//     fetchDashboard();

//   }, []);

//   const stats = [
//     {
//       title: "Total Projects",
//       value: counts.projects,
//       icon: <WorkIcon sx={{ fontSize: 40, color: "#6366F1" }} />
//     },
//     {
//       title: "Developers",
//       value: counts.developers,
//       icon: <CodeIcon sx={{ fontSize: 40, color: "#6366F1" }} />
//     },
//     {
//       title: "Total Tasks",
//       value: counts.tasks,
//       icon: <AssignmentIcon sx={{ fontSize: 40, color: "#6366F1" }} />
//     },
//     {
//       title: "Pending Tasks",
//       value: counts.pending,
//       icon: <PendingActionsIcon sx={{ fontSize: 40, color: "#6366F1" }} />
//     }
//   ];

//   return (
//     <div style={{ display: "flex" }}>

//       {/* Sidebar */}
//       <ProjectManagerSidebar />

//       {/* Main Content */}
//       <div style={{
//         padding: "30px",
//         width: "100%",
//         background: "#F9FAFB",
//         minHeight: "100vh"
//       }}>

//         <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
//           Project Manager Dashboard
//         </Typography>

//         {/* 🔥 CARDS */}
//         <Grid container spacing={3}>
//           {stats.map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
//                 <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <div>
//                     <Typography>{item.title}</Typography>
//                     <Typography variant="h5" fontWeight="bold">
//                       {item.value}
//                     </Typography>
//                   </div>
//                   {item.icon}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* 🔥 PROJECT LIST */}
//         <div style={{ marginTop: "30px" }}>
//           <Typography variant="h5" sx={{ mb: 2 }}>
//             Assigned Projects
//           </Typography>

//           {projects.length === 0 ? (
//             <Typography>No Projects Assigned</Typography>
//           ) : (
//             projects.map((p) => (
//               <Card key={p._id} sx={{ mb: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{p.title}</Typography>
//                   <Typography>{p.description}</Typography>
//                   <Typography>₹ {p.budget}</Typography>
//                   <Typography>Status: {p.status}</Typography>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default PMDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function PMDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    projects: 0,
    developers: 0,
    tasks: 0,
    pending: 0
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/projectmanager/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setStats({
          projects: res.data.stats.projects,
          developers: res.data.stats.developers,
          tasks: res.data.stats.tasks,
          pending: res.data.stats.pendingTasks
        });

        setProjects(res.data.projects);

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
    <Box sx={{ p: 4, background: "#f8fafc", minHeight: "100vh" }}>

      {/* -------- Welcome -------- */}
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Project Manager Dashboard
      </Typography>

      {/* -------- Stats Cards -------- */}
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...cardStyle, background: "#eff6ff" }}>
            <CardContent>
              <WorkIcon sx={{ fontSize: 45, color: "#2563eb" }} />
              <Typography sx={numberStyle}>{stats.projects}</Typography>
              <Typography>Total Projects</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...cardStyle, background: "#ecfdf5" }}>
            <CardContent>
              <CodeIcon sx={{ fontSize: 45, color: "#10b981" }} />
              <Typography sx={numberStyle}>{stats.developers}</Typography>
              <Typography>Developers</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...cardStyle, background: "#e0f2fe" }}>
            <CardContent>
              <AssignmentIcon sx={{ fontSize: 45, color: "#0284c7" }} />
              <Typography sx={numberStyle}>{stats.tasks}</Typography>
              <Typography>Total Tasks</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...cardStyle, background: "#fef3c7" }}>
            <CardContent>
              <PendingActionsIcon sx={{ fontSize: 45, color: "#f59e0b" }} />
              <Typography sx={numberStyle}>{stats.pending}</Typography>
              <Typography>Pending Tasks</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* -------- Quick Actions -------- */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/pm/pmproject")}
            >
              View My Projects
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate("/pm/tasks")}
            >
              Manage Tasks
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate("/pm/assign-developers")}
            >
              Assign Developers
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* -------- Recent Projects -------- */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Assigned Projects
        </Typography>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>

            {projects.length === 0 ? (
              <Typography>No Projects Assigned</Typography>
            ) : (
              projects.map((p, index) => (
                <Box key={p._id}>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1
                    }}
                  >
                    <Typography>{p.title}</Typography>

                    <Chip
                      label={p.status}
                      color={
                        p.status === "assigned"
                          ? "success"
                          : p.status === "pending_assignment"
                          ? "warning"
                          : "default"
                      }
                    />
                  </Box>

                  {index !== projects.length - 1 && <Divider />}

                </Box>
              ))
            )}

          </CardContent>
        </Card>
      </Box>

      {/* -------- Overview -------- */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Overview
        </Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
          You have {stats.projects} active projects and {stats.pending} pending tasks.
          Manage your team and track progress efficiently.
        </Typography>
      </Box>

    </Box>
  );
}

export default PMDashboard;