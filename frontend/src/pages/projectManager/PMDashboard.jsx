// import React, { useEffect, useState } from "react";

// import ProjectManagerSidebar from "../../components/layout/ProjectManagerSidebar";

// import { Card, CardContent, Typography, Grid } from "@mui/material";

// import WorkIcon from "@mui/icons-material/Work";
// import CodeIcon from "@mui/icons-material/Code";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";

// import axios from "axios";

// function PMDashboard() {

//   const [counts, setCounts] = useState({
//     projects: 0,
//     developers: 0,
//     tasks: 0,
//     pending: 0
//   });

//   useEffect(() => {

//     axios.get("http://localhost:5000/api/projectmanager/dashboard")
//       .then(res => {
//         setCounts(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });

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
//     <>
     

//       <div style={{ display: "flex" }}>

//         <ProjectManagerSidebar />

//         <div style={{ padding: "30px", width: "100%", background: "#F9FAFB", minHeight: "100vh" }}>

//           <br/>
//           <br/>
//           <Typography variant="h4" sx={{ marginBottom: "25px", fontWeight: "bold" }}>
//             Project Manager Dashboard
//           </Typography>

//           <Grid container spacing={3}>

//             {stats.map((item, index) => (

//               <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>

//                 <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>

//                   <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

//                     <div>

//                       <Typography variant="subtitle1">
//                         {item.title}
//                       </Typography>

//                       <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                         {item.value}
//                       </Typography>

//                     </div>

//                     {item.icon}

//                   </CardContent>

//                 </Card>

//               </Grid>

//             ))}

//           </Grid>

//         </div>

//       </div>
//     </>
//   );
// }

// export default PMDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

import ProjectManagerSidebar from "../../components/layout/ProjectManagerSidebar";

import { Card, CardContent, Typography, Grid } from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function PMDashboard() {

  const [counts, setCounts] = useState({
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
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("API DATA:", res.data);

        // ✅ SET STATS
        setCounts({
          projects: res.data.stats.projects,
          developers: res.data.stats.developers,
          tasks: res.data.stats.tasks,
          pending: res.data.stats.pendingTasks
        });

        // ✅ SET PROJECTS LIST
        setProjects(res.data.projects);

      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    fetchDashboard();

  }, []);

  const stats = [
    {
      title: "Total Projects",
      value: counts.projects,
      icon: <WorkIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    },
    {
      title: "Developers",
      value: counts.developers,
      icon: <CodeIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    },
    {
      title: "Total Tasks",
      value: counts.tasks,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    },
    {
      title: "Pending Tasks",
      value: counts.pending,
      icon: <PendingActionsIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    }
  ];

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <ProjectManagerSidebar />

      {/* Main Content */}
      <div style={{
        padding: "30px",
        width: "100%",
        background: "#F9FAFB",
        minHeight: "100vh"
      }}>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Project Manager Dashboard
        </Typography>

        {/* 🔥 CARDS */}
        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
                <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Typography>{item.title}</Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </div>
                  {item.icon}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 🔥 PROJECT LIST */}
        <div style={{ marginTop: "30px" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Assigned Projects
          </Typography>

          {projects.length === 0 ? (
            <Typography>No Projects Assigned</Typography>
          ) : (
            projects.map((p) => (
              <Card key={p._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>
                  <Typography>{p.description}</Typography>
                  <Typography>₹ {p.budget}</Typography>
                  <Typography>Status: {p.status}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default PMDashboard;