import React, { useEffect, useState } from "react";

import ProjectManagerSidebar from "../../components/layout/ProjectManagerSidebar";

import { Card, CardContent, Typography, Grid } from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import axios from "axios";

function PMDashboard() {

  const [counts, setCounts] = useState({
    projects: 0,
    developers: 0,
    tasks: 0,
    pending: 0
  });

  useEffect(() => {

    axios.get("http://localhost:5000/api/projectmanager/dashboard")
      .then(res => {
        setCounts(res.data);
      })
      .catch(err => {
        console.log(err);
      });

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
    <>
     

      <div style={{ display: "flex" }}>

        <ProjectManagerSidebar />

        <div style={{ padding: "30px", width: "100%", background: "#F9FAFB", minHeight: "100vh" }}>

          <br/>
          <br/>
          <Typography variant="h4" sx={{ marginBottom: "25px", fontWeight: "bold" }}>
            Project Manager Dashboard
          </Typography>

          <Grid container spacing={3}>

            {stats.map((item, index) => (

              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>

                <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>

                  <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <div>

                      <Typography variant="subtitle1">
                        {item.title}
                      </Typography>

                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {item.value}
                      </Typography>

                    </div>

                    {item.icon}

                  </CardContent>

                </Card>

              </Grid>

            ))}

          </Grid>

        </div>

      </div>
    </>
  );
}

export default PMDashboard;