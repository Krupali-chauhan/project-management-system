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

import LogoutIcon from "@mui/icons-material/Logout";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientNavbar() {

  const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const navigate = useNavigate();

  // 🔹 localStorage mathi user data levu
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 first letter avatar mate
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAvatarClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const goToChangePassword = () => {
  handleClose();
  navigate("/change-password");
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
          onClick={handleAvatarClick}
            sx={{
              bgcolor: "#ff9800",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              cursor: "pointer"
            }}
          >
            {avatarLetter}
          </Avatar>

          {/* 🔽 Menu (Avatar click pachi open thase) */}

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={goToChangePassword}>
              Change Password
            </MenuItem>
          </Menu>

          {/* Logout */}

          <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
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