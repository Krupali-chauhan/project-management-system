import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar
} from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";

function AddDeveloper() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    city: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/admin/add-developer",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Developer Added Successfully");

    navigate("/viewDeveloper");

  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8
      }}
    >

      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 500,
          borderRadius: 3
        }}
      >

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3
          }}
        >

          <Avatar sx={{ bgcolor: "#673ab7" }}>
            <CodeIcon />
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            Add Developer
          </Typography>

        </Box>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <Grid container spacing={2}>

            <Grid item xs={12}>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

            </Grid>

            <Grid item xs={12}>

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

            </Grid>

            <Grid item xs={12}>

              <TextField
                fullWidth
                label="Phone Number"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleChange}
              />

            </Grid>

            <Grid item xs={12}>

              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

            </Grid>

          </Grid>

          {/* Buttons */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3
            }}
          >

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/superAdmin/view-devloper")}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              
            >
              Add Developer
            </Button>

          </Box>

        </form>

      </Paper>

    </Box>

  );

}

export default AddDeveloper;