// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// function EditProjectManager() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phoneno: "",
//     city: ""
//   });

//   // existing data fetch
//   useEffect(() => {
//     fetchPM();
//   }, []);

//   const fetchPM = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       `http://localhost:5000/api/admin/project-manager/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     setFormData({
//       name: res.data.name,
//       phoneno: res.data.phoneno,
//       city: res.data.city
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/admin/project-manager/${id}`,
//       formData,
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     alert("Project Manager Updated Successfully");

//     navigate("/superAdmin/view-project-manager");
//   };

//   return (
//     <div>

//       <h2>Edit Project Manager</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />

//         <input
//           type="text"
//           name="phoneno"
//           value={formData.phoneno}
//           onChange={handleChange}
//           placeholder="Phone"
//         />

//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           placeholder="City"
//         />

//         <button type="submit">Update</button>

//       </form>

//     </div>
//   );
// }

// export default EditProjectManager;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Alert
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

function EditProjectManager() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneno: "",
    city: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPM();
  }, []);

  const fetchPM = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/admin/project-manager/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setFormData({
        name: res.data.name,
        phoneno: res.data.phoneno,
        city: res.data.city
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setSaving(true);

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/admin/project-manager/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage("Project Manager updated successfully");

      setTimeout(() => {
        navigate("/superAdmin/view-project-manager");
      }, 1200);

    } catch (err) {

      setMessage("Failed to update Project Manager");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (

    <Box
      sx={{
        mt: "70px",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <Paper
        elevation={4}
        sx={{
          width: 450,
          p: 4,
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
            <EditIcon />
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            Edit Project Manager
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Update project manager information
          </Typography>

        </Box>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3
            }}
          >

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/superAdmin/view-project-manager")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Manager"}
            </Button>

          </Box>

        </form>

      </Paper>

    </Box>
  );
}

export default EditProjectManager;