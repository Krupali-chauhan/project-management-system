// import React from "react";
// import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const drawerWidth = 230;

// function ProjectManagerSidebar() {

//   const navigate = useNavigate();

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           backgroundColor: "#111827",
//           color: "white",
//         },
//       }}
//     >

//       <List sx={{ marginTop: "20px" }}>

//         <br/><br/>

//         <ListItemButton onClick={() => navigate("/pm/dashboard")}>
//           <ListItemText primary="Dashboard" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/pm/projects")}>
//           <ListItemText primary="Projects" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/pm/tasks")}>
//           <ListItemText primary="Tasks" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/pm/assign-developers")}>
//           <ListItemText primary="Developers" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/pm/reports")}>
//           <ListItemText primary="Reports" />
//         </ListItemButton>

//       </List>

//     </Drawer>
//   );
// }

// export default ProjectManagerSidebar;

// import React from "react";
// import { Drawer, List, ListItemButton, ListItemText, Divider } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// const drawerWidth = 230;

// function ProjectManagerSidebar() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           backgroundColor: "#111827",
//           color: "white",
//         },
//       }}
//     >
//       <List sx={{ marginTop: "20px" }}>

//         <br /><br />

//         <ListItemButton
//           selected={location.pathname === "/pm/pmdashboard"}
//           onClick={() => navigate("/pm/pmdashboard")}
//         >
//           <ListItemText primary="Dashboard" />
//         </ListItemButton>

//         <ListItemButton
//           selected={location.pathname === "/pm/projects"}
//           onClick={() => navigate("/pm/projects")}
//         >
//           <ListItemText primary="Projects" />
//         </ListItemButton>

//         <ListItemButton
//           selected={location.pathname === "/pm/tasks"}
//           onClick={() => navigate("/pm/tasks")}
//         >
//           <ListItemText primary="Tasks" />
//         </ListItemButton>

//         {/* <ListItemButton
//           selected={location.pathname === "/pm/developers"}
//           onClick={() => navigate("/pm/developers")}
//         >
//           <ListItemText primary="Developers" />
//         </ListItemButton> */}

//         <ListItemButton onClick={() => navigate("/pm/assign-developers")}>
//            <ListItemText primary="Developers" />
//         </ListItemButton>

//         <Divider sx={{ backgroundColor: "#374151", marginY: 2 }} />

//         {/* ✅ FIX: direct projects page par mokle */}
//         <ListItemButton
//           onClick={() => navigate("/pm/projects")}
//         >
//           <ListItemText primary="Milestones" />
//         </ListItemButton>

//       </List>
//     </Drawer>
//   );
// }

// export default ProjectManagerSidebar;
import React from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,   // ✅ ADD THIS
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// Icons – sab important aur meaningful
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

function ProjectManagerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/pm/pmdashboard",
    },
    {
      text: "My Projects",
      icon: <FolderIcon />,
      path: "/pm/pmproject",
    },
    {
      text: "Milestones",
      icon: <TimelineIcon />,
      path: "/pm/milestones"// ya agar alag milestone page hai toh "/pm/milestones"
    },
    {
      text: "Tasks",
      icon: <AssignmentIcon />,
      path: "/pm/tasks",
    },
    {
      text: "Developers",
      icon: <PeopleIcon />,
      path: "/pm/assign-developers",
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#111827", // dark theme
          color: "white",
          borderRight: "none",
        },
      }}
    >
      {/* Header / Logo Area */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold" color="primary.light">
          PM Panel
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "#374151" }} />

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#1e40af",
                "&:hover": { backgroundColor: "#1e40af" },
              },
              "&:hover": { backgroundColor: "#374151" },
              borderRadius: "0 24px 24px 0",
              my: 0.5,
              mx: 1,
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "0.95rem" }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push logout to bottom */}

      <Divider sx={{ backgroundColor: "#374151", mx: 2 }} />

      {/* Logout at bottom */}
      <ListItemButton
        onClick={() => {
          // Logout logic – token remove + redirect
          localStorage.removeItem("token");
          navigate("/login");
        }}
        sx={{
          mt: 2,
          mx: 1,
          color: "#ef4444",
          "&:hover": { backgroundColor: "#7f1d1d" },
          borderRadius: "0 24px 24px 0",
        }}
      >
        <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Drawer>
  );
}

export default ProjectManagerSidebar;