// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, Grid } from "@mui/material";
// import PeopleIcon from "@mui/icons-material/People";
// import WorkIcon from "@mui/icons-material/Work";
// import CodeIcon from "@mui/icons-material/Code";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import axios from "axios";

// function SuperAdminDashboard() {
//   const [counts, setCounts] = useState({
//     users: 0,
//     managers: 0,
//     developers: 0,
//     projects: 0
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("No token found – redirecting to login");
//       window.location.href = "/login"; // agar token nahi to login pe bhej do
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/admin/dashboard-count", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       })
//       .then((res) => {
//         console.log("API Response:", res.data); // yeh console mein check karna
//         setCounts({
//           users: res.data.totalUsers || 0,
//           managers: res.data.projectManagers || 0,
//           developers: res.data.developers || 0,
//           projects: res.data.totalProjects || 0
//         });
//       })
//       .catch((err) => {
//         console.error("Dashboard API failed:", err.response?.data || err.message);
//         if (err.response?.status === 401) {
//           alert("Session expired – please login again");
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }
//       });
//   }, []);

//   const stats = [
//     { title: "Total Users", value: counts.users, icon: <PeopleIcon sx={{ fontSize: 40, color: "#6366F1" }} /> },
//     { title: "Project Managers", value: counts.managers, icon: <WorkIcon sx={{ fontSize: 40, color: "#6366F1" }} /> },
//     { title: "Developers", value: counts.developers, icon: <CodeIcon sx={{ fontSize: 40, color: "#6366F1" }} /> },
//     { title: "Total Projects", value: counts.projects, icon: <AssignmentIcon sx={{ fontSize: 40, color: "#6366F1" }} /> }
//   ];

//   return (
//     <div style={{ padding: "30px", width: "100%", background: "#F9FAFB", minHeight: "100vh" }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
//         Admin Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {stats.map((item, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <div>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     {item.title}
//                   </Typography>
//                   <Typography variant="h4" fontWeight="bold">
//                     {item.value}
//                   </Typography>
//                 </div>
//                 {item.icon}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default SuperAdminDashboard;
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import AssignmentIcon from "@mui/icons-material/Assignment";

import axios from "axios";

function SuperAdminDashboard() {

  const [counts, setCounts] = useState({
    users: 0,
    managers: 0,
    developers: 0,
    projects: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:5000/api/admin/dashboard-count", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {

        setCounts({
          users: res.data.totalUsers || 0,
          managers: res.data.projectManagers || 0,
          developers: res.data.developers || 0,
          projects: res.data.totalProjects || 0
        });

        setLoading(false);

      })
      .catch((err) => {

        console.error(err);
        setLoading(false);

      });

  }, []);

  const stats = [
    {
      title: "Total Users",
      value: counts.users,
      icon: <PeopleIcon />,
      color: "#4F46E5"
    },
    {
      title: "Project Managers",
      value: counts.managers,
      icon: <WorkIcon />,
      color: "#0EA5E9"
    },
    {
      title: "Developers",
      value: counts.developers,
      icon: <CodeIcon />,
      color: "#10B981"
    },
    {
      title: "Total Projects",
      value: counts.projects,
      icon: <AssignmentIcon />,
      color: "#F59E0B"
    }
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (

    <Box
      sx={{
        p: 4,
        background: "#F9FAFB",
        minHeight: "100vh",
        marginTop:3,
        paddingTop:4,
      }}
    >

      {/* Header */}

      <Box sx={{ mb: 4 }}>

        <Typography variant="h4" fontWeight="bold">
          Super Admin Dashboard
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Monitor system activity and manage users, managers and projects
        </Typography>

      </Box>

      {/* Stats Cards */}

      <Grid container spacing={3}>

        {stats.map((item, index) => (

          <Grid item xs={12} sm={6} md={3} key={index}>

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                }
              }}
            >

              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <Box>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    {item.value}
                  </Typography>

                </Box>

                <Avatar
                  sx={{
                    bgcolor: item.color,
                    width: 56,
                    height: 56
                  }}
                >
                  {item.icon}
                </Avatar>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

      {/* Bottom Section */}

      <Grid container spacing={3} sx={{ mt: 1 }}>

        <Grid item xs={12} md={6}>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                System Overview
              </Typography>

              <Typography variant="body2" color="text.secondary">
                This dashboard provides a quick overview of your system.
                You can manage clients, assign project managers, monitor
                developers and track project progress from here.
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={6}>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Quick Insights
              </Typography>

              <Typography variant="body2" color="text.secondary">
                • Track active projects in real time  
                • Monitor developer workload  
                • Assign project managers to new projects  
                • Manage system users efficiently
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>

  );
}

export default SuperAdminDashboard;