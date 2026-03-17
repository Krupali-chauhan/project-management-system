// import React from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Button,
//   Alert,
// } from "@mui/material";

// function SOWDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { data: project, isLoading, isError } = useQuery({
//     queryKey: ["sow", id],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data;
//     },
//   });

//   const updateStatusMutation = useMutation({
//    mutationFn: async (newStatus) => {
//   const token = localStorage.getItem("token");
//   const res = await axios.put(
//     `http://localhost:5000/api/projects/${id}/status`,          // ← changed here
//     { status: newStatus },                                      // send in body
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// },
//     // SOWDetail.jsx ke mutation onSuccess mein
// onSuccess: (response) => {
//       const updatedProject = response.project;

//       queryClient.invalidateQueries(["sow", id]);
//       queryClient.invalidateQueries(["my-sows"]);

//       if (updatedProject.status === "approved") {
//         // toast.success("SOW Approved! It will be assigned to a Project Manager soon.");
//         alert("SOW Approved! It will be assigned to a Project Manager soon.");
//         navigate("/client/view-sow"); // list pe wapas
//       } else if (updatedProject.status === "rejected") {
//         // toast.error("SOW Rejected. Please update your requirement.");
//         alert("SOW Rejected. Please update your requirement.");
//        navigate(`/client/create-project/${id}`); // ya jo bhi create requirement ka route hai
//       }
//     },
//     onError: (err) => {
//       alert("Error: " + (err.response?.data?.message || "Something went wrong"));
//     },
//   });

//   if (isLoading) return <CircularProgress />;
//   if (isError || !project) return <Alert severity="error">Project not found</Alert>;

//   const isPending = project.status === "pending";

//   return (
//     <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         {project.title}
//       </Typography>

//       {project.status === "approved" && (
//         <Alert severity="success" sx={{ mb: 3 }}>
//           SOW Approved Successfully!
//         </Alert>
//       )}

//       {project.status === "rejected" && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           SOW Rejected
//         </Alert>
//       )}

//       <Paper sx={{ p: 3 }}>
//         <Typography sx={{ mb: 2 }}>
//           <b>Status:</b>{" "}
//           <Box component="span" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
//             {project.status}
//           </Box>
//         </Typography>

//         <Typography sx={{ mb: 2 }}>
//           <b>Budget:</b> ₹{project.budget}
//         </Typography>

//         <Typography sx={{ mb: 3 }}>
//           <b>Deadline:</b> {new Date(project.deadline).toLocaleDateString()}
//         </Typography>

//         <Typography sx={{ whiteSpace: "pre-line", mb: 4 }}>
//           {project.sow}
//         </Typography>

//         {isPending && (
//           <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
//             <Button
//               variant="contained"
//               color="success"
//               size="large"
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to APPROVE this SOW?")) {
//                   updateStatusMutation.mutate("approved");
//                 }
//               }}
//               disabled={updateStatusMutation.isPending}
//             >
//               Approve SOW
//             </Button>

//             <Button
//               variant="outlined"
//               color="error"
//               size="large"
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to REJECT this SOW?")) {
//                   updateStatusMutation.mutate("rejected");
//                 }
//               }}
//               disabled={updateStatusMutation.isPending}
//             >
//               Reject SOW
//             </Button>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default SOWDetail;
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Alert,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";

function SOWDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project, isLoading, isError, error } = useQuery({
    queryKey: ["sow", id],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus) => {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/projects/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: (response) => {
      const updatedProject = response.project;
      queryClient.invalidateQueries(["sow", id]);
      queryClient.invalidateQueries(["my-sows"]);

      if (updatedProject.status === "approved") {
        alert("SOW Approved! It will be assigned to a Project Manager soon.");
        navigate("/client/view-sow");
      } else if (updatedProject.status === "rejected") {
        alert("SOW Rejected. Please update your requirement.");
        navigate(`/client/create-project/${id}`);
      }
    },
    onError: (err) => {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (isError || !project) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 8 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          Project not found or failed to load. Please try again or contact support.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/client/view-sow")}
          sx={{ mt: 3 }}
        >
          Back to SOWs
        </Button>
      </Box>
    );
  }

  const isPending = project.status === "pending";
  const isApproved = project.status === "approved";
  const isRejected = project.status === "rejected";

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: { xs: 2, md: 0 } }}>
      {/* Back Button & Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/client/view-sow")}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Back to My SOWs
        </Button>

        <Tooltip title="Print / Download SOW">
          <IconButton color="primary" size="large">
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Status Banner */}
      {isApproved && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ mb: 4, borderRadius: 2, alignItems: "center" }}
        >
          SOW Approved Successfully! Awaiting Project Manager assignment.
        </Alert>
      )}

      {isRejected && (
        <Alert
          severity="error"
          icon={<CancelIcon fontSize="inherit" />}
          sx={{ mb: 4, borderRadius: 2, alignItems: "center" }}
        >
          SOW Rejected — Please update your requirements to generate a new version.
        </Alert>
      )}

      {/* Main Card */}
      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
            p: 4,
            pb: 6,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <DescriptionIcon fontSize="large" />
            <Typography variant="h4" component="h1" fontWeight="600">
              {project.title}
            </Typography>
          </Stack>

          <Chip
            label={project.status.toUpperCase()}
            color={isApproved ? "success" : isRejected ? "error" : "warning"}
            size="large"
            variant="filled"
            sx={{ fontSize: "1rem", fontWeight: "bold", px: 3 }}
          />
        </Box>

        {/* Metadata Cards */}
        <Box sx={{ p: 4, bgcolor: "#fafafa" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="space-between">
            <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <MonetizationOnIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Budget
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight="bold">
                  ₹{Number(project.budget).toLocaleString("en-IN")}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <ScheduleIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Deadline
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight="bold">
                  {new Date(project.deadline).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <DescriptionIcon color="primary" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Updated
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight="bold">
                  {new Date(project.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* SOW Content */}
        <Box sx={{ p: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Statement of Work (SOW)
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: "#f9fcff",
              borderColor: "#e0e0e0",
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              fontSize: "1.05rem",
            }}
          >
            {project.sow || "No SOW content available."}
          </Paper>

          {/* Action Buttons */}
          {isPending && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              sx={{ mt: 6 }}
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  if (window.confirm("Are you sure you want to APPROVE this SOW?")) {
                    updateStatusMutation.mutate("approved");
                  }
                }}
                disabled={updateStatusMutation.isPending}
                sx={{ minWidth: 220, py: 1.5, fontSize: "1.1rem" }}
              >
                Approve SOW
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="large"
                startIcon={<CancelIcon />}
                onClick={() => {
                  if (window.confirm("Are you sure you want to REJECT this SOW?")) {
                    updateStatusMutation.mutate("rejected");
                  }
                }}
                disabled={updateStatusMutation.isPending}
                sx={{ minWidth: 220, py: 1.5, fontSize: "1.1rem" }}
              >
                Reject SOW
              </Button>
            </Stack>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default SOWDetail;