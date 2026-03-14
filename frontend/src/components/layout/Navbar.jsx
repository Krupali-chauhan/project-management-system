import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Button,
  Badge
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

function ClientNavbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (

    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        background: "linear-gradient(90deg,#1e3c72,#2a5298)",   // 🔹 gradient background
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >

      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* 🔹 Left side (Logo) */}

        <Box sx={{ display: "flex", alignItems: "center" }}>

          <img
            src="/images/lowLix1.png"
            alt="logo"
            style={{
              height: "55px",
              objectFit: "contain",
              filter: "brightness(1.1)"   // logo little bright
            }}
          />

        </Box>

        {/* 🔹 Right side */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

          {/* Notification */}

          <IconButton
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)"
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Avatar */}

          <Avatar
            sx={{
              bgcolor: "#ff9800",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
            }}
          >
            C
          </Avatar>

          {/* Logout */}

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              background: "#ff4d4f",
              fontWeight: "bold",
              "&:hover": {
                background: "#d9363e"
              }
            }}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>

    </AppBar>

  );
}

export default ClientNavbar;