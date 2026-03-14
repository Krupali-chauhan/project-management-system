import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 230;

function SuperadminSidebar() {

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
<br/>
<br/>
        <ListItemButton onClick={() => navigate("/view-users")}>
          <ListItemText primary="View Clients" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/view-projects")}>
          <ListItemText primary="View Projects" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/viewDeveloper")}>
          <ListItemText primary="View Developers" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/viewPM")}>
          <ListItemText primary="Project Managers" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/add-project-manager")}>
          <ListItemText primary="Add Project Managers" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/pm/add-developer")}>
          <ListItemText primary="Add Developers" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}

export default SuperadminSidebar;