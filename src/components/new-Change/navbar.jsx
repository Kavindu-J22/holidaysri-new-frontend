import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const handleSignout = () => {
    // Show confirmation dialog before signing out
    const confirmation = window.confirm("Are you sure you want to sign out?");

    // If the user clicks "Yes", proceed with the sign-out
    if (confirmation) {
        // Remove userRole, authToken, and userEmail from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");

        // Redirect to login page or any other page after sign-out
        window.location.href = '/';
    }
    // If the user clicks "No", do nothing
};

  const handleProfileClick = () => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") {
        window.location.href = "/admin";
    } else if (role === "seller") {
        window.location.href = "/foreign-dashboard";
    } else if (role === "agent") {
        window.location.href = "/local-dashboard";
    } else if (role === "guide") {
        window.location.href = "/Guider-Dashboard";
    }else if (role === "partner") {
        window.location.href = "/Partner-Dashboard";
    } else {
        window.location.href = "/MainuserDashboard";
    }
}

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark and transparent
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        paddingX: { xs: 2, md: 5 }, // Adds padding for consistent spacing
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Logo */}
        <img
            src={Logo}
            alt="Logo"
            style={{
            width: "50px", // Adjust the width as needed
            height: "50px", // Adjust the height as needed
            objectFit: "contain", // Ensures the logo maintains its aspect ratio
            }}
        />
        <Typography
            variant="h6"
            sx={{
            fontWeight: 600,
            fontFamily: "'Roboto', sans-serif",
            color: theme.palette.primary.contrastText,
            }}
        >
            HOLIDAYSRI
        </Typography>
        </Box>


        {/* Menu Icon for Mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            display: { xs: "block", md: "none" },
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon />
        </IconButton>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
          }}
        >
          <Button color="inherit" sx={{ fontWeight: 500 }}>
            Home
          </Button>
          <Button color="inherit" sx={{ fontWeight: 500 }}>
            Service
          </Button>
          <Button color="inherit" sx={{ fontWeight: 500 }}>
            About
          </Button>
          <Button color="inherit" sx={{ fontWeight: 500 }}>
            Contact
          </Button>
        </Box>

        {/* Right Side Icons/Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {(authToken && userRole) || userEmail ? (
            <>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleProfileClick}>
                <AccountCircleIcon />
              </IconButton>
              <Button color="inherit" sx={{ fontWeight: 500 }} onClick={handleSignout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
