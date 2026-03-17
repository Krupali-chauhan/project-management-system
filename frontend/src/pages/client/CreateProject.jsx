// import React, { useState ,useEffect} from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   CircularProgress,
// } from "@mui/material";

// import axios from "axios";
// import {useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// // import Grid from "@mui/material/Unstable_Grid2";

// function CreateProject() {
//  const { id } = useParams();
//   const navigate = useNavigate();

//  const [form, setForm] = useState({
//     title: "",
//     description: "",
//     budget: "",
//     deadline: "",
//     technology: ""
//   });
//   const { data: existingProject, isLoading: isFetching, isError, error } = useQuery({
//     queryKey: ["project", id],
//     queryFn: async () => {
//       if (!id) return null;
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data;
//     },
//     enabled: !!id,
//   });
//   useEffect(() => {
//     if (existingProject) {
//       setForm({
//         title: existingProject.title || "",
//         description: existingProject.description || "",
//         budget: existingProject.budget || "",
//         deadline: existingProject.deadline
//           ? new Date(existingProject.deadline).toISOString().split("T")[0]
//           : "",
//         technology: existingProject.technology || "",
//       });
//     }
//   }, [existingProject]);
//   if (isFetching) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading previous requirement...</Typography>
//       </Box>
//     );
//   }

//   if (isError) {
//     console.error("Project fetch error:", error);
//     // Optional: error message dikhao
//     return <Alert severity="error">Failed to load project data. You can still create new.</Alert>;
//   }

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   const token = localStorage.getItem("token");
//   const isEdit = !!id;   // Agar id hai to edit mode

//   try {
//     if (isEdit) {
//       // Rejected project ko update karo
//       await axios.put(
//         `http://localhost:5000/api/projects/${id}`,
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       alert("Requirement update ho gaya! Naya SOW generate ho raha hai...");
//     } else {
//       // Naya project banao
//       await axios.post(
//         "http://localhost:5000/api/projects/create",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       alert("Requirement submit ho gaya! AI SOW generate kar raha hai...");
//     }

//     navigate("/client/view-sow");
//   } catch (err) {
//     console.log(err);
//     alert("Error aa gaya: " + (err.response?.data?.message || "Kuch galat hua"));
//   }
// };

//   return (

//     <Box
//       component="main"
//       sx={{
//         mt: "80px",
//         display: "flex",
//         justifyContent: "center"
//       }}
//     >

//       <Box sx={{ width: "50%" }}>

//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 2,
//             background: "#f5f7fa"
//           }}
//         >

//           {/* Heading INSIDE box */}

//           <Typography
//             variant="h5"
//             sx={{
//               mb: 3,
//               fontWeight: 600,
//               color: "#1e293b",
//               textAlign: "center"
//             }}
//           >
//             Create Project Requirement
//           </Typography>

//          <form onSubmit={handleSubmit}>
// <Grid container spacing={2}>
//   {/* Project Title */}
//   <Grid size={12}>
//     <TextField
//       fullWidth
//       label="Project Title"
//       name="title"
//       value={form.title}
//       onChange={handleChange}
//     />
//   </Grid>

//   {/* Technology */}
//   <Grid size={12}>
//     <TextField
//       fullWidth
//       label="Technology"
//       name="technology"
//       value={form.technology}
//       onChange={handleChange}
//     />
//   </Grid>

//   {/* Description */}
//   <Grid size={12}>
//     <TextField
//       fullWidth
//       multiline
//       rows={3}
//       label="Project Description"
//       name="description"
//       value={form.description}
//       onChange={handleChange}
//     />
//   </Grid>

//   {/* Budget */}
//   <Grid size={{ xs: 12, sm: 6 }}>
//     <TextField
//       fullWidth
//       label="Budget"
//       name="budget"
//       value={form.budget}
//       onChange={handleChange}
//     />
//   </Grid>

//   {/* Deadline */}
//   <Grid size={{ xs: 12, sm: 6 }}>
//     <TextField
//       fullWidth
//       type="date"
//       label="Deadline"
//       name="deadline"
//       value={form.deadline}
//       onChange={handleChange}
//       InputLabelProps={{ shrink: true }}
//     />
//   </Grid>
// </Grid>

//             {/* Button */}

//             <Box
//               sx={{
//                 mt: 3,
//                 display: "flex",
//                 justifyContent: "center"
//               }}
//             >

//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   width: "50%",
//                   py: 1.2,
//                   borderRadius: 2,
//                   textTransform: "none",
//                   fontWeight: 600
//                 }}
//               >
//                 Generate AI SOW
//               </Button>

//             </Box>

//           </form>

//         </Paper>

//       </Box>

//     </Box>

//   );

// }

// export default CreateProject;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CodeIcon from "@mui/icons-material/Code";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function CreateProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    technology: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: existingProject, isLoading: isFetching, isError, error } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) return null;
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (existingProject) {
      setForm({
        title: existingProject.title || "",
        description: existingProject.description || "",
        budget: existingProject.budget || "",
        deadline: existingProject.deadline
          ? new Date(existingProject.deadline).toISOString().split("T")[0]
          : "",
        technology: existingProject.technology || "",
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const isEdit = !!id;

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/projects/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Requirement updated successfully! Generating new SOW...");
      } else {
        await axios.post("http://localhost:5000/api/projects/create", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Requirement submitted successfully! AI is generating your SOW...");
      }

      navigate("/client/view-sow");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || "Something went wrong. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3, color: "text.secondary" }}>
          Loading previous requirement...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 8, px: 3 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          Failed to load previous project data. You can still create a new requirement.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        mt: { xs: "70px", md: "90px" },
        mb: 8,
        px: { xs: 2, md: 4 },
        maxWidth: 900,
        mx: "auto",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <DescriptionIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" component="h1" fontWeight="700" gutterBottom>
          {id ? "Edit Project Requirement" : "Create New Project Requirement"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {id
            ? "Update your rejected requirement and generate a fresh SOW."
            : "Fill in the details below and let AI generate a professional Statement of Work (SOW)."}
        </Typography>
      </Box>

      {/* Form Card */}
      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: "background.paper" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Project Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Technology */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Technology / Stack"
                  name="technology"
                  value={form.technology}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CodeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="e.g., React, Node.js, Python + Django, MERN Stack"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={5}
                  variant="outlined"
                  helperText="Describe your project goals, features, scope, and any specific requirements."
                />
              </Grid>

              {/* Budget & Deadline */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget (INR)"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  type="text"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  helperText="Approximate budget range (e.g., 50000)"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expected Deadline"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 5, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 50,
                  boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                }}
              >
                {isSubmitting
                  ? "Generating SOW..."
                  : id
                  ? "Update & Generate New SOW"
                  : "Generate AI SOW"}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default CreateProject;