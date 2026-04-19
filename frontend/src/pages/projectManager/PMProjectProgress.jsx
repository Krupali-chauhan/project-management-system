// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   LinearProgress,
//   Chip
// } from "@mui/material";

// export default function PMProjectProgress() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/projectmanager/dashboard",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setProjects(res.data.projects || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const calc = (p) => {
//     const tasks = p.tasks || [];

//     if (tasks.length === 0) return 0;

//     const done = tasks.filter((t) => {
//       const status = String(t.status || t.taskStatus || "")
//         .trim()
//         .toLowerCase();

//       return (
//         status === "completed" ||
//         status === "complete" ||
//         status === "done"
//       );
//     }).length;

//     return Math.round((done / tasks.length) * 100);
//   };

//   return (
//     <Box
//       sx={{
//         p: 4,
//         background: "#f8fafc",
//         minHeight: "100vh"
//       }}
//     >
//       <Typography variant="h4" fontWeight="bold" mb={4}>
//         Project Progress
//       </Typography>

//       <Grid container spacing={3}>
//         {projects.length === 0 ? (
//           <Grid item xs={12}>
//             <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography align="center">
//                   No Projects Found
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ) : (
//           projects.map((p) => {
//             const progress = calc(p);

//             return (
//               <Grid item xs={12} md={6} key={p._id}>
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     boxShadow: 3,
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: 6
//                     }
//                   }}
//                 >
//                   <CardContent>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         mb: 2
//                       }}
//                     >
//                       <Typography variant="h6" fontWeight="bold">
//                         {p.title}
//                       </Typography>

//                       <Chip
//                         label={p.status}
//                         color={
//                           p.status === "completed"
//                             ? "success"
//                             : p.status === "in_progress"
//                             ? "info"
//                             : "primary"
//                         }
//                       />
//                     </Box>

//                     <Typography variant="body2" sx={{ mb: 1 }}>
//                       Progress: {progress}%
//                     </Typography>

//                     <LinearProgress
//                       variant="determinate"
//                       value={progress}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         mb: 2
//                       }}
//                     />

//                     <Typography variant="body2" sx={{ mb: 1 }}>
//                       Budget: ₹{p.budget}
//                     </Typography>

//                     <Typography variant="body2" color="text.secondary">
//                       {p.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })
//         )}
//       </Grid>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function PMProjectProgress() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/projectmanager/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  const calc = (p) => {
    const tasks = p.tasks || [];

    if (tasks.length === 0) return p.progress || 0;

    const done = tasks.filter((t) => {
      const status = String(t.status || "")
        .trim()
        .toLowerCase();

      return status === "completed";
    }).length;

    return Math.round((done / tasks.length) * 100);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          backdropFilter: "blur(8px)",
          borderRadius: 5,
          p: 4
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          color="#f9f9f9"
        >
          Project Progress Dashboard
        </Typography>

        <Typography
          textAlign="center"
          mb={5}
          color="white"
        >
          Track every assigned project with live completion status
        </Typography>

        <Grid container spacing={3}>
          {projects.length === 0 ? (
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography align="center">
                    No Projects Found
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            projects.map((p) => {
              const progress = calc(p);

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={6}
                  key={p._id}
                >
                  <Card
                    sx={{
                      borderRadius: 5,
                      width: "100%",
                      height: "100%",
                      minHeight: 240,
                      boxShadow: 8,
                      background:
                        "rgba(255,255,255,0.92)",
                      transition: "0.3s",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 12
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                          mb: 3
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          sx={{
                            flex: 1,
                            lineHeight: 1.4,
                            wordBreak: "break-word"
                          }}
                        >
                          {p.title}
                        </Typography>

                        <Chip
                          label={p.status}
                          color={
                            p.status === "completed"
                              ? "success"
                              : p.status === "in_progress"
                              ? "info"
                              : "primary"
                          }
                          sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize"
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1
                        }}
                      >
                        <TrendingUpIcon fontSize="small" />
                        <Typography fontWeight="bold">
                          Progress: {progress}%
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 12,
                          borderRadius: 10,
                          mb: 3
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1
                        }}
                      >
                        <AccountBalanceWalletIcon fontSize="small" />
                        <Typography fontWeight="600">
                          Budget: ₹{p.budget}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
    </Box>
  );
}