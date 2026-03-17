// import React from "react";
// import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const drawerWidth = 230;

// function SuperadminSidebar() {

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
// <br/>
// <br/>
//         <ListItemButton onClick={() => navigate("/view-users")}>
//           <ListItemText primary="View Clients" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/view-projects")}>
//           <ListItemText primary="View Projects" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/viewDeveloper")}>
//           <ListItemText primary="View Developers" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/superadmin/view-project-manager")}>
//           <ListItemText primary="Project Managers" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/superadmin/add-project-manager")}>
//           <ListItemText primary="Add Project Managers" />
//         </ListItemButton>

//         <ListItemButton onClick={() => navigate("/pm/add-developer")}>
//           <ListItemText primary="Add Developers" />
//         </ListItemButton>

//       </List>
//     </Drawer>
//   );
// }

// export default SuperadminSidebar;
import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";

import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const drawerWidth = 240;

function SuperadminSidebar() {

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
          to="/superadmin/superadmindashboard"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <Divider sx={{ background: "#334155", my: 1 }} />

        {/* Client Management */}

        <ListItemButton
          component={Link}
          to="/view-users"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItemButton>

        {/* Project Management */}

        <ListItemButton
          component={Link}
          to="/superadmin/viewproject"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <Divider sx={{ background: "#334155", my: 1 }} />

        {/* Project Managers */}

        <ListItemButton
          component={Link}
          to="/superadmin/view-project-manager"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Project Managers" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/superadmin/add-project-manager"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Manager" />
        </ListItemButton>

        <Divider sx={{ background: "#334155", my: 1 }} />

        {/* Developers */}

        <ListItemButton
          component={Link}
          to="/superadmin/view-devloper"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="Developers" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/superadmin/add-devloper"
          sx={{ color: "white" }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Developer" />
        </ListItemButton>

      </List>

    </Drawer>

  );

}

export default SuperadminSidebar;