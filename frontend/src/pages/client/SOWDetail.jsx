import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

function SOWDetail() {

  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["sow", id],
    queryFn: async () => {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/projects/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return res.data;
    }
  });

  if (isLoading) return <CircularProgress />;

  return (

    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>

      <Typography variant="h4" gutterBottom>
        {data.title}
      </Typography>

      <Paper sx={{ p: 3 }}>

        <Typography sx={{ mb: 2 }}>
          <b>Budget:</b> ₹{data.budget}
        </Typography>

        <Typography sx={{ mb: 2 }}>
          <b>Deadline:</b> {new Date(data.deadline).toLocaleDateString()}
        </Typography>

        <Typography sx={{ whiteSpace: "pre-line" }}>
          {data.sow}
        </Typography>

      </Paper>

    </Box>
  );
}

export default SOWDetail;