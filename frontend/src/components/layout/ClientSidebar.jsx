import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";

const drawerWidth = 240;

function ClientSidebar() {

  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#091d3e",
          color: "white",
          top: "64px",
          height: "calc(100% - 64px)"
        }
      }}
    >

      <Toolbar />

      <List>

        {/* Dashboard */}

        <ListItemButton
          component={Link}
          to="/client/dashboard"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Create Project */}

        <ListItemButton
          component={Link}
          to="/client/create-project"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Create Requirement" />
        </ListItemButton>

        {/* My Projects */}

        <ListItemButton
          component={Link}
          to="/client/my-projects"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="My Projects" />
        </ListItemButton>

        {/* View SOW */}

        <ListItemButton
          component={Link}
          to="/client/view-sow"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="View SOW" />
        </ListItemButton>

      </List>

    </Drawer>

  );

}

export default ClientSidebar;