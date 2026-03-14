import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 230;

function ProjectManagerSidebar() {

  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#111827",
          color: "white",
        },
      }}
    >

      <List sx={{ marginTop: "20px" }}>

        <br/><br/>

        <ListItemButton onClick={() => navigate("/pm/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/pm/projects")}>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/pm/tasks")}>
          <ListItemText primary="Tasks" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/pm/developers")}>
          <ListItemText primary="Developers" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/pm/reports")}>
          <ListItemText primary="Reports" />
        </ListItemButton>

      </List>

    </Drawer>
  );
}

export default ProjectManagerSidebar;