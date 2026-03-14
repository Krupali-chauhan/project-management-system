import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

function ViewSOW() {

  const navigate = useNavigate();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["my-sows"],
    queryFn: async () => {

      const token = localStorage.getItem("token");

      if (!token) return [];

      const res = await axios.get(
        "http://localhost:5000/api/projects/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data;

    }
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (

    <Box sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>

      <Typography variant="h4" sx={{ mb: 4 }}>
        My Generated SOWs
      </Typography>

      {sortedProjects.length === 0 ? (

        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography>No SOW generated yet</Typography>
        </Card>

      ) : (

        sortedProjects.map((proj) => (

          <Card key={proj._id} sx={{ mb: 3 }}>

            <CardContent>

              <Typography variant="h6">
                {proj.title}
              </Typography>

              <Chip
                label={proj.status}
                color={
                  proj.status === "approved"
                    ? "success"
                    : proj.status === "rejected"
                    ? "error"
                    : "warning"
                }
                size="small"
                sx={{ mt: 1 }}
              />

              <Divider sx={{ my: 2 }} />

              <Typography>
                Deadline: {new Date(proj.deadline).toLocaleDateString()}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                Budget: ₹{proj.budget}
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate(`/client/sow-detail/${proj._id}`)}
              >
                View Full SOW
              </Button>

            </CardContent>

          </Card>

        ))

      )}

    </Box>
  );
}

export default ViewSOW;