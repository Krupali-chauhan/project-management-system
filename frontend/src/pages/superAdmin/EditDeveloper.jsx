import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar
} from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";

function EditDeveloper() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneno: "",
    city: ""
  });

  const fetchDeveloper = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/admin/developer/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setFormData({
      name: res.data.name || "",
      phoneno: res.data.phoneno || "",
      city: res.data.city || ""
    });

  };

  useEffect(() => {
    fetchDeveloper();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/developer/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Developer Updated Successfully");

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
            Edit Developer
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
              onClick={() => navigate("/superAdmin/view-devloper")}
            >
              Update Developer
            </Button>

          </Box>

        </form>

      </Paper>

    </Box>

  );

}

export default EditDeveloper;