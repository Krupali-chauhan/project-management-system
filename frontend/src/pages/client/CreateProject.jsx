import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    technology: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/projects/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Requirement submitted. AI generating SOW...");
      navigate("/client/view-sow");

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <Box
      component="main"
      sx={{
        mt: "80px",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <Box sx={{ width: "50%" }}>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: "#f5f7fa"
          }}
        >

          {/* Heading INSIDE box */}

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#1e293b",
              textAlign: "center"
            }}
          >
            Create Project Requirement
          </Typography>

         <form onSubmit={handleSubmit}>

<Grid container spacing={2}>

  {/* Row 1 */}

  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Project Title"
      name="title"
      value={form.title}
      onChange={handleChange}
    />
  </Grid>

  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Technology"
      name="technology"
      value={form.technology}
      onChange={handleChange}
    />
  </Grid>


  {/* Row 2 */}

  <Grid item xs={12}>
    <TextField
      fullWidth
      multiline
      rows={3}
      label="Project Description"
      name="description"
      value={form.description}
      onChange={handleChange}
    />
  </Grid>


  {/* Row 3 */}

  <Grid item xs={6}>
    <TextField
      fullWidth
      label="Budget"
      name="budget"
      value={form.budget}
      onChange={handleChange}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      fullWidth
      type="date"
      label="Deadline"
      name="deadline"
      value={form.deadline}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
    />
  </Grid>

</Grid>

            {/* Button */}

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center"
              }}
            >

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "50%",
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600
                }}
              >
                Generate AI SOW
              </Button>

            </Box>

          </form>

        </Paper>

      </Box>

    </Box>

  );

}

export default CreateProject;