import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 230;

function DeveloperSidebar() {

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

        <ListItemButton onClick={() => navigate("/developer/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/developer/tasks")}>
          <ListItemText primary="My Tasks" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/developer/projects")}>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/developer/history")}>
          <ListItemText primary="Task History" />
        </ListItemButton>

      </List>

    </Drawer>
  );
}

export default DeveloperSidebar;