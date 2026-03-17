// import React from "react";
// import { Box, Toolbar, Grid, Card, CardContent, Typography, Button } from "@mui/material";
// import { Link,useNavigate } from "react-router-dom";

// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

// function ClientDashboard() {

//   const cardStyle = {
//     height: 150,
//     width: 250,          // ✅ fixed width
//     borderRadius: "12px",
//     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     transition: "0.3s",
//     "&:hover": {
//       transform: "translateY(-5px)",
//       boxShadow: "0 8px 18px rgba(0,0,0,0.15)"
//     }
//   };

//   return (
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         p: 5,
//         background: "#f5f7fa",
//         minHeight: "100vh"
//       }}
//     >

//       <Toolbar />

//       {/* Cards Row */}

//       <Grid
//         container
//         spacing={4}
//         justifyContent="flex-start"   // ✅ center nahi, left side
//       >

//         {/* ADD REQUIREMENT */}

//         <Grid item>
//           <Card
//             component={Link}
//             to="/client/create-project"
//             sx={{ ...cardStyle, textDecoration: "none" }}
//           >
//             <AddCircleIcon sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />

//             <Typography sx={{ fontWeight: 600 }}>
//               Add Requirement
//             </Typography>

//             <Button variant="contained" size="small" sx={{ mt: 2 }}>
//               Create
//             </Button>
//           </Card>
//         </Grid>


//         {/* MY PROJECTS */}

//         <Grid item>
//           <Card
//          to="/client/my-projects"
//           sx={cardStyle}>
//             <FolderOutlinedIcon sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />

//             <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
//               3
//             </Typography>

//             <Typography>
//               My Projects
//             </Typography>
//           </Card>
//         </Grid>


//         {/* GENERATED SOW */}

//         <Grid item>
//           <Card 
//           component={Link}
//            to="/client/view-sow"
//           sx={{...cardStyle,textDecoration: "none" }} >
//             <DescriptionOutlinedIcon sx={{ fontSize: 40, color: "#2563eb", mb: 1 }} />

//             <Typography sx={{ fontWeight: 700, fontSize: "28px" }}>
//               2
//             </Typography>

//             <Typography>
//               Generated SOW
//             </Typography>
//           </Card>
//         </Grid>

//       </Grid>

//     </Box>
//   );
// }

// export default ClientDashboard;

// import React from "react";
// import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import FolderIcon from "@mui/icons-material/Folder";
// import DescriptionIcon from "@mui/icons-material/Description";

// function ClientDashboard() {
//   const navigate = useNavigate();

//   // Yeh numbers backend se aayenge (abhi static dikhaye hain)
//   const totalProjects = 6;
//   const approvedProjects = 4;
//   const pendingSOWs = 2;
//   const rejected = 1;

//   const cardStyle = {
//     height: 180,
//     borderRadius: "16px",
//     boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     transition: "all 0.3s ease",
//     background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//     border: "1px solid #e5e7eb",
//     "&:hover": {
//       transform: "translateY(-8px)",
//       boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
//       borderColor: "#2563eb",
//     },
//   };

//   const iconStyle = {
//     fontSize: 48,
//     mb: 2,
//     color: "#2563eb",
//   };

//   const numberStyle = {
//     fontSize: "2.8rem",
//     fontWeight: 700,
//     color: "#1e293b",
//     mb: 1,
//   };

//   return (
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         p: { xs: 3, md: 5 },
//         background: "#f8fafc",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Welcome Section */}
//       <Box sx={{ mb: 6, textAlign: { xs: "center", md: "left" } }}>
//         <Typography
//           variant="h4"
//           fontWeight="700"
//           sx={{
//             background: "linear-gradient(90deg, #2563eb, #3b82f6)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Welcome back, Krupali!
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//           Manage your projects and requirements in one place
//         </Typography>
//       </Box>

//       {/* Stats Cards */}
//       <Grid container spacing={4} justifyContent="center">
//         {/* Add Requirement */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             component={Link}
//             to="/client/create-project"
//             sx={{
//               ...cardStyle,
//               textDecoration: "none",
//               background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
//             }}
//           >
//             <CardContent>
//               <AddCircleIcon sx={{ ...iconStyle, color: "#2563eb" }} />
//               <Typography variant="h6" fontWeight={600} color="#1e293b">
//                 Add Requirement
//               </Typography>
//               <Button
//                 variant="contained"
//                 size="medium"
//                 sx={{
//                   mt: 3,
//                   px: 4,
//                   background: "#2563eb",
//                   "&:hover": { background: "#1d4ed8" },
//                 }}
//               >
//                 Create Now
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* My Projects */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             component={Link}
//             to="/client/my-projects"
//             sx={{
//               ...cardStyle,
//               textDecoration: "none",
//               background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
//             }}
//           >
//             <CardContent>
//               <FolderIcon sx={{ ...iconStyle, color: "#10b981" }} />
//               <Typography sx={numberStyle}>{approvedProjects}</Typography>
//               <Typography variant="h6" fontWeight={600} color="#065f46">
//                 Approved Projects
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Generated SOW */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             component={Link}
//             to="/client/view-sow"
//             sx={{
//               ...cardStyle,
//               textDecoration: "none",
//               background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
//             }}
//           >
//             <CardContent>
//               <DescriptionIcon sx={{ ...iconStyle, color: "#8b5cf6" }} />
//               <Typography sx={numberStyle}>{totalProjects}</Typography>
//               <Typography variant="h6" fontWeight={600} color="#6b21a8">
//                 Generated SOWs
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Quick Summary */}
//       <Box sx={{ mt: 8, textAlign: "center" }}>
//         <Typography variant="h5" fontWeight={600} gutterBottom>
//           Quick Overview
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
//           You have {approvedProjects} active projects and {pendingSOWs} SOWs waiting for your approval. Start a new requirement or check your progress.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default ClientDashboard;
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";

function ClientDashboard() {

  const navigate = useNavigate();

  // Demo data (later backend API se aayega)
  const totalProjects = 8;
  const approvedProjects = 5;
  const pendingSOW = 2;
  const rejectedProjects = 1;

  const recentProjects = [
    { name: "Ecommerce Website", status: "Approved" },
    { name: "Mobile App UI", status: "Pending" },
    { name: "Portfolio Website", status: "Rejected" },
  ];

 const cardStyle = {
height:150,
width:200,
borderRadius:"14px",
display:"flex",
alignItems:"center",
justifyContent:"center",
textAlign:"center",
boxShadow:"0 6px 15px rgba(0,0,0,0.1)",
transition:"0.3s",

"&:hover":{
transform:"translateY(-6px)"
}
};
  const numberStyle = {
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: "5px"
  };

  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft:3,
        mt:2,
        paddingTop:5,
        
        background: "#f8fafc",
        minHeight: "100vh",
        overflowX: "hidden"
      }}
    >

{/* ---------------- Welcome Section ---------------- */}




{/* ---------------- Stats Cards ---------------- */}

<Grid container spacing={4}>

{/* Add Requirement */}

<Grid item xs={12} sm={6} md={3}>

<Card
component={Link}
to="/client/create-project"
sx={{ ...cardStyle, textDecoration: "none", background:"#eff6ff" }}
>

<CardContent>

<AddCircleIcon sx={{ fontSize: 45, color:"#2563eb" }} />

<Typography variant="h6" sx={{ mt:1 }}>
Add Requirement
</Typography>

<Button
variant="contained"
size="small"
sx={{ mt:2 }}
>
Create
</Button>

</CardContent>

</Card>

</Grid>


{/* Approved Projects */}

<Grid item xs={12} sm={6} md={3}>

<Card component={Link}
to="/client/my-projects" sx={{ ...cardStyle,textDecoration: "none", background:"#ecfdf5" }}>

<CardContent>

<FolderIcon sx={{ fontSize:45, color:"#10b981" }} />

<Typography sx={numberStyle}>
{approvedProjects}
</Typography>

<Typography>
Approved Projects
</Typography>

</CardContent>

</Card>

</Grid>


{/* Pending SOW */}

<Grid item xs={12} sm={6} md={3}>

<Card sx={{ ...cardStyle, background:"#fef3c7" }}>

<CardContent>

<PendingActionsIcon sx={{ fontSize:45, color:"#f59e0b" }} />

<Typography sx={numberStyle}>
{pendingSOW}
</Typography>

<Typography>
Pending SOW
</Typography>

</CardContent>

</Card>

</Grid>


{/* Rejected Projects */}

<Grid item xs={12} sm={6} md={3}>

<Card sx={{ ...cardStyle, background:"#fee2e2" }}>

<CardContent>

<CancelIcon sx={{ fontSize:45, color:"#ef4444" }} />

<Typography sx={numberStyle}>
{rejectedProjects}
</Typography>

<Typography>
Rejected Projects
</Typography>

</CardContent>

</Card>

</Grid>

</Grid>


{/* ---------------- Quick Actions ---------------- */}

<Box sx={{ mt:8 }}>

<Typography variant="h5" fontWeight="bold" gutterBottom>
Quick Actions
</Typography>

<Grid container spacing={2}>

<Grid item>

<Button
variant="contained"
onClick={()=>navigate("/client/create-project")}
>
Create Requirement
</Button>

</Grid>

<Grid item>

<Button
variant="outlined"
onClick={()=>navigate("/client/my-projects")}
>
View My Projects
</Button>

</Grid>

<Grid item>

<Button
variant="outlined"
onClick={()=>navigate("/client/view-sow")}
>
View SOW
</Button>

</Grid>

</Grid>

</Box>


{/* ---------------- Recent Projects ---------------- */}

<Box sx={{ mt:8 }}>

<Typography variant="h5" fontWeight="bold" gutterBottom>
Recent Projects
</Typography>

<Card sx={{ borderRadius:3 }}>

<CardContent>

{recentProjects.map((project,index)=>(
<Box key={index}>

<Box
sx={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
py:1
}}
>

<Typography>
{project.name}
</Typography>

<Chip
label={project.status}
color={
project.status === "Approved"
? "success"
: project.status === "Pending"
? "warning"
: "error"
}
/>

</Box>

{index !== recentProjects.length-1 && <Divider/>}

</Box>
))}

</CardContent>

</Card>

</Box>


{/* ---------------- Overview Section ---------------- */}

<Box sx={{ mt:8, textAlign:"center" }}>

<Typography variant="h5" fontWeight="bold">
Dashboard Overview
</Typography>

<Typography color="text.secondary" sx={{ maxWidth:600, mx:"auto", mt:2 }}>
You currently have {approvedProjects} approved projects, {pendingSOW} SOWs waiting for approval and {rejectedProjects} rejected requirements. Use the quick actions above to manage your project workflow efficiently.
</Typography>

</Box>

</Box>
);
}

export default ClientDashboard;