// import React, { useState } from "react";
// import axios from "axios";

// function AddProjectManager() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneno: "",
//     city: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "http://localhost:5000/api/admin/add-project-manager",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(res.data.message);
//       // form reset optional
//       setFormData({ name: "", email: "", phoneno: "", city: "" });
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || "Something went wrong. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
//       <h2>Add New Project Manager</h2>

//       {message && (
//         <p style={{ color: message.includes("success") ? "green" : "red" }}>
//           {message}
//         </p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//           <label>Name *</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Email *</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Phone Number</label>
//           <input
//             type="text"
//             name="phoneno"
//             value={formData.phoneno}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <label>City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             padding: "10px 20px",
//             background: loading ? "#ccc" : "#007bff",
//             color: "white",
//             border: "none",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Adding..." : "Add Project Manager"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProjectManager;
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Avatar
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function AddProjectManager() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/admin/add-project-manager",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message);
      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        phoneno: "",
        city: ""
      });

    } catch (err) {

      setSuccess(false);

      setMessage(
        err.response?.data?.message ||
        "Something went wrong. Try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <Box
      sx={{
        mt: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 450,
          borderRadius: 3
        }}
      >

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3
          }}
        >

          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 60,
              height: 60,
              mb: 1
            }}
          >
            <PersonAddIcon fontSize="large" />
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            Add Project Manager
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Create a new Project Manager account
          </Typography>

        </Box>

        {message && (
          <Alert severity={success ? "success" : "error"} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Phone Number"
            name="phoneno"
            fullWidth
            margin="normal"
            value={formData.phoneno}
            onChange={handleChange}
          />

          <TextField
            label="City"
            name="city"
            fullWidth
            margin="normal"
            value={formData.city}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >

            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Project Manager"
            )}

          </Button>

        </form>

      </Paper>

    </Box>
  );
}

export default AddProjectManager;