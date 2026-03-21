// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function PMProjects() {

//   const [projects, setProjects] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {

//     const fetchProjects = async () => {
//       try {

//         const res = await axios.get(
//           "http://localhost:5000/api/projectmanager/projects",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         console.log("PROJECTS:", res.data);

//         setProjects(res.data);

//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchProjects();

//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>My Assigned Projects</h2>

//       {projects.length === 0 ? (
//         <p>No Projects Assigned</p>
//       ) : (
//         projects.map((p) => (
//           <div
//             key={p._id}
//             style={{
//               border: "1px solid #ccc",
//               margin: "10px",
//               padding: "15px",
//               borderRadius: "8px"
//             }}
//           >
//             <h3>{p.title}</h3>
//             <p>{p.description}</p>
//             <p>Budget: ₹ {p.budget}</p>
//             <p>Status: {p.status}</p>

//             {/* 🔥 IMPORTANT BUTTON */}
//             <button
//               onClick={() => navigate(`/pm/milestones/${p._id}`)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px 12px",
//                 background: "#6366F1",
//                 color: "white",
//                 border: "none",
//                 cursor: "pointer"
//               }}
//             >
//               Manage Milestones
//             </button>

//           </div>
//         ))
//       )}

//     </div>
//   );
// }

// export default PMProjects;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PMProjects() {
  const [projects, setProjects] = useState([]);
  const [openSow, setOpenSow] = useState(false);
  const [selectedSow, setSelectedSow] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [generatedProjects, setGeneratedProjects] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

//  useEffect(() => {
//   const checkGenerated = async () => {
//     const token = localStorage.getItem("token");

//     const updated = [];

//     for (let p of projects) {
//       const res = await axios.get(
//         `http://localhost:5000/api/milestones/${p._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (res.data.length > 0) {
//         updated.push(p._id);
//       }
//     }

//     setGeneratedProjects(updated);
//   };

//   if (projects.length > 0) {
//     checkGenerated();
//   }
// }, [projects]);
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/projectmanager/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("🔥 PROJECTS:", res.data);

      setProjects(res.data);

    } catch (error) {
      console.log("❌ Fetch Error:", error);
    }
  };

  fetchProjects();
}, []);

  const handleViewSOW = (sow, title) => {
    setSelectedSow(sow || "No SOW available for this project.");
    setSelectedTitle(title);
    setOpenSow(true);
  };
const generateMilestones = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/milestones/generate",
      { projectId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(res.data.message);

    setGeneratedProjects((prev) => [...prev, projectId]);

    // 👉 direct global page
    navigate(`/pm/milestones`);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Assigned Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No projects assigned yet.
        </Typography>
      ) : (
        projects.map((p) => (
          <Card key={p._id} sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {p.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Client: {p.clientId?.name || "Unknown"}
              </Typography>

              <Typography variant="body2" gutterBottom>
                Budget: ₹{Number(p.budget).toLocaleString()}
              </Typography>

              <Typography variant="body2" gutterBottom>
                Deadline: {p.deadline}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status: <strong>{p.status.toUpperCase()}</strong>
              </Typography>

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                {/* View Full SOW */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewSOW(p.sow, p.title)}
                >
                  View Full SOW
                </Button>

                {/* Manage Milestones */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate(`/pm/milestones`)}
                >
                  Manage Milestones
                </Button>
               <Button
  variant="contained"
  color="secondary"
  disabled={generatedProjects.includes(p._id)}
  onClick={() => generateMilestones(p._id)}
>
  {generatedProjects.includes(p._id)
    ? "Already Generated"
    : "Auto Generate 🚀"}
</Button>
 </Box>
            </CardContent>
          </Card>
        ))
      )}

      {/* SOW Popup – Same as Super Admin wala, better UI */}
      <Dialog
        open={openSow}
        onClose={() => setOpenSow(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{selectedTitle} - Statement of Work</span>
          <IconButton onClick={() => setOpenSow(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto", p: 3 }}>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
              fontFamily: "Roboto Mono, monospace",
              fontSize: "1.05rem",
            }}
          >
            {selectedSow}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenSow(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PMProjects;