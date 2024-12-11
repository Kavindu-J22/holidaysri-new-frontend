import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CiMenuKebab } from "react-icons/ci";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import Logo from "../../assets/Hsllogo.png";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import LoginIcon from '@mui/icons-material/Login'; // Login icon
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Register icon

const Navbar = ({ isLoggedIn }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = () => {
    const confirmation = window.confirm("Are you sure you want to sign out?");
    if (confirmation) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      window.location.href = "/";
    }
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
    } else if (role === "partner") {
      window.location.href = "/Partner-Dashboard";
    } else {
      window.location.href = "/MainuserDashboard";
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        paddingX: { xs: 2, md: 5 },
        zIndex: "2000",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "37px",
              height: "37px",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontFamily: "'Roboto', sans-serif",
              color: theme.palette.primary.contrastText,
              display: { xs: "none", md: "block" },
            }}
          >
            HOLIDAYSRI
          </Typography>
        </Box>

        {/* Center Menu Button */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
          }}
        >
          <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/service")}>
            Service
          </Button>
          <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/contact")}>
            Contact
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", alignItems: "center" }}>
        <Button
            variant="outlined"
            color="inherit"
            onClick={() => setMenuOpen(!menuOpen)}
            sx={{
              borderColor: "white",
              color: "white",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              padding: { xs: "5px 7px", sm: "8px 16px" }, // Smaller button padding on mobile view
              gap: 1,
              '&:hover': {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            Explore
            <CiMenuKebab /> 
          </Button>

          {menuOpen && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "60px",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                padding: 1,
                zIndex: 2001,
                borderRadius: 1,
              }}
            >
              <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/")}>
                Home
              </Button>
              <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/service")}>
                Service
              </Button>
              <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/about")}>
                About
              </Button>
              <Button color="inherit" sx={{ fontWeight: 500 }} onClick={() => navigate("/contact")}>
                Contact
              </Button>
            </Box>
          )}
        </Box>

        {/* Right Side Icons/Buttons */}
        <Box
  sx={{
    display: "flex",
    gap: 1,
    alignItems: "center",
    flexDirection: "row", // Keep items in a row for larger screens
  }}
>
  {(authToken && userRole) || userEmail ? (
    <>
      <IconButton
        color="inherit"
        sx={{
          fontSize: { xs: "15px", sm: "24px" }, // Smaller icons on mobile view
        }}
      >
        <NotificationsIcon />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={handleProfileClick}
        sx={{
          fontSize: { xs: "15px", sm: "24px" }, // Smaller icons on mobile view
        }}
      >
        <AccountCircleIcon />
      </IconButton>
      <Button
        color="inherit"
        sx={{
          fontWeight: 500,
          fontSize: { xs: "10px", sm: "10px" }, // Smaller button text on mobile view
          padding: { xs: "5px 5px", sm: "8px 16px" }, // Smaller button padding on mobile view
        }}
        onClick={handleSignout}
        startIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button
        color="inherit"
        sx={{
          fontWeight: 500,
          fontSize: { xs: "10px", sm: "10px" }, // Smaller button text on mobile view
          padding: { xs: "6px 8px", sm: "8px 16px" }, // Smaller button padding on mobile view
        }}
        onClick={() => navigate("/login")}
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#075a48",
          color: "white",
          "&:hover": {
            backgroundColor: "#093f34",
          },
          fontSize: { xs: "10px", sm: "10px" }, // Smaller button text on mobile view
          padding: { xs: "5px 8px", sm: "8px 16px" }, // Smaller button padding on mobile view
        }}
        onClick={() => navigate("/register")}
        startIcon={<PersonAddIcon />}
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
