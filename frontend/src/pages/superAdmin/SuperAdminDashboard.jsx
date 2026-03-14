import React, { useEffect, useState } from "react";

import SuperadminSidebar from "../../components/layout/SuperadminSidebar";

import { Card, CardContent, Typography, Grid } from "@mui/material";
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

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard-count")
      .then(res => {
        setCounts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: counts.users,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    },
    {
      title: "Project Managers",
      value: counts.managers,
      icon: <WorkIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    },
    {
      title: "Developers",
      value: counts.developers,
      icon: <CodeIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    },
    {
      title: "Total Projects",
      value: counts.projects,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#6366F1" }} />
    }
  ];

  return (
    <>
     

      <div style={{ display: "flex" }}>
        <SuperadminSidebar />

        <div style={{ padding: "30px", width: "100%", background: "#F9FAFB", minHeight: "100vh" }}>

          <Typography variant="h4" sx={{ marginBottom: "25px", fontWeight: "bold" }}>
            Admin Dashboard
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

export default SuperAdminDashboard;