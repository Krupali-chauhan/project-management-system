// import React from "react";
// import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const drawerWidth = 230;

// function DeveloperSidebar() {

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

//         <ListItemButton onClick={() => navigate("/developer/dashboard")}>
//           <ListItemText primary="Dashboard" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/developer/mytask")}>
//           <ListItemText primary="My Tasks" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/developer/projects")}>
//           <ListItemText primary="Projects" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/developer/history")}>
//           <ListItemText primary="Task History" />
//         </ListItemButton>

//       </List>

//     </Drawer>
//   );
// }

// export default DeveloperSidebar;
import React from "react";
import { 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography 
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// Icons (choose what feels best for your app)
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import HistoryIcon from "@mui/icons-material/History";
import CodeIcon from "@mui/icons-material/Code";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard",    path: "/developer/developer-dashboard",  icon: <DashboardIcon /> },
  { text: "My Tasks",     path: "/developer/mytask",     icon: <AssignmentIcon /> },

];

function DeveloperSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0f172a",     // slate-900
          borderRight: "1px solid #1e293b",
          color: "#e2e8f0",
        },
      }}
    >
      {/* Header / Branding */}
      <Box
        sx={{
          p: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid #1e293b",
        }}
      >
        <CodeIcon sx={{ fontSize: 32, color: "#60a5fa" }} />
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ letterSpacing: "-0.5px", color: "#cbd5e1" }}
        >
          Dev Panel
        </Typography>
      </Box>

      <List sx={{ px: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: "8px",
                mb: 0.5,
                backgroundColor: isActive ? "rgba(59, 130, 246, 0.12)" : "transparent",
                color: isActive ? "#60a5fa" : "#cbd5e1",
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.08)",
                },
                "& .MuiListItemIcon-root": {
                  color: isActive ? "#60a5fa" : "#94a3b8",
                  minWidth: 40,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Optional bottom section */}
      <Box sx={{ mt: "auto", p: 2, pb: 3 }}>
        <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
          v1.3.2 • {new Date().getFullYear()}
        </Typography>
      </Box>
    </Drawer>
  );
}

export default DeveloperSidebar;