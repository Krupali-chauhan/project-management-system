import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

function ChangePassword() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password not match");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
      }}
    >

      <Paper sx={{ padding: 4, width: 400 }}>

        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>

        <TextField
          fullWidth
          label="Current Password"
          type="password"
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleChangePassword}
        >
          Change Password
        </Button>

      </Paper>

    </Box>
  );
}

export default ChangePassword;