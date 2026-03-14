import React from "react";
import { Box, Toolbar, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

function ClientDashboard() {

  const cardStyle = {
    height: 150,
    width: 250,          // ✅ fixed width
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 18px rgba(0,0,0,0.15)"
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 5,
        background: "#f5f7fa",
        minHeight: "100vh"
      }}
    >

      <Toolbar />

      {/* Cards Row */}

      <Grid
        container
        spacing={4}
        justifyContent="flex-start"   // ✅ center nahi, left side
      >

        {/* ADD REQUIREMENT */}

        <Grid item>
          <Card
            component={Link}
            to="/client/create-project"
            sx={{ ...cardStyle, textDecoration: "none" }}
          >
            <AddCircleIcon sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />

            <Typography sx={{ fontWeight: 600 }}>
              Add Requirement
            </Typography>

            <Button variant="contained" size="small" sx={{ mt: 2 }}>
              Create
            </Button>
          </Card>
        </Grid>


        {/* MY PROJECTS */}

        <Grid item>
          <Card
         to="/client/my-projects"
          sx={cardStyle}>
            <FolderOutlinedIcon sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />

            <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
              3
            </Typography>

            <Typography>
              My Projects
            </Typography>
          </Card>
        </Grid>


        {/* GENERATED SOW */}

        <Grid item>
          <Card 
          component={Link}
           to="/client/view-sow"
          sx={{...cardStyle,textDecoration: "none" }} >
            <DescriptionOutlinedIcon sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />

            <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
              2
            </Typography>

            <Typography>
              Generated SOW
            </Typography>
          </Card>
        </Grid>

      </Grid>

    </Box>
  );
}

export default ClientDashboard;