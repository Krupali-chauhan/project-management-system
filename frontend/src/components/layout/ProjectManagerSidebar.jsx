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

import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 230;

function ProjectManagerSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

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

        <br /><br />

        <ListItemButton
          selected={location.pathname === "/pm/pmdashboard"}
          onClick={() => navigate("/pm/pmdashboard")}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname === "/pm/projects"}
          onClick={() => navigate("/pm/projects")}
        >
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname === "/pm/tasks"}
          onClick={() => navigate("/pm/tasks")}
        >
          <ListItemText primary="Tasks" />
        </ListItemButton>

        {/* <ListItemButton
          selected={location.pathname === "/pm/developers"}
          onClick={() => navigate("/pm/developers")}
        >
          <ListItemText primary="Developers" />
        </ListItemButton> */}

        <ListItemButton onClick={() => navigate("/pm/assign-developers")}>
           <ListItemText primary="Developers" />
        </ListItemButton>

        <Divider sx={{ backgroundColor: "#374151", marginY: 2 }} />

        {/* ✅ FIX: direct projects page par mokle */}
        <ListItemButton
          onClick={() => navigate("/pm/projects")}
        >
          <ListItemText primary="Milestones" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}

export default ProjectManagerSidebar;