import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const FristAddShown = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [showAd, setShowAd] = useState(false); // Advertisement state
  const location = useLocation(); // Get current location

  // Function to close the ad
  const handleCloseAd = () => {
    setShowAd(false);
  };

  useEffect(() => {
    // Check if the current path is '/login' or '/register'
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowAd(false);
      return;
    }

    if (!userEmail) {
      // Check if ad was already shown
      const adShown = localStorage.getItem("adShown");
      if (!adShown) {
        const adTimer = setTimeout(() => {
          setShowAd(true);
          localStorage.setItem("adShown", "true"); // Mark ad as shown
        }, 10000); // Display ad after 10 seconds
        return () => clearTimeout(adTimer);
      }
    }
  }, [userEmail, location]); // Add location to dependencies

  return (
    <>
      {showAd && (
        <Modal
          open={showAd}
          onClose={handleCloseAd}
          aria-labelledby="advertisement-title"
          aria-describedby="advertisement-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 }, // Responsive width
              backgroundColor: "rgba(237, 253, 249, 0.8)",
              backdropFilter: "blur(5px)",
              border: "1px solid #ddd",
              boxShadow: 24,
              p: { xs: 3, sm: 4 }, // Adjust padding for mobile
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            {/* Title Section */}
            <Typography
              id="advertisement-title"
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#333",
                mb: 2,
                fontSize: { xs: "1.5rem", sm: "1.8rem" },
              }}
            >
              🎉 Welcome to the Holidaysri Platform! 🎉
            </Typography>

            {/* Centered Coin Image */}
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734579552/Untitled-1_k5okh1.webp"
                alt="HSC Coins"
                style={{ width: "100px", height: "100px" }}
              />
            </Box>

            {/* Content Section */}
            <Typography
              id="advertisement-description"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.6,
                color: "#555",
                mb: 4,
              }}
            >
              🚀 <strong>Register with Us</strong> and receive{" "}
              <span
                style={{
                  color: "rgba(122, 7, 168, 0.8)",
                  fontWeight: "bold",
                }}
              >
                100 HSD (diamonds)
              </span>{" "}
              as a New User Gift!
              <br />
              Already have an account? <strong>Login</strong> to enjoy our services and start earning money!
            </Typography>

            {/* Link Section */}
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                color: "rgba(107, 57, 139, 0.8)",
                textDecoration: "underline",
                cursor: "pointer",
                mb: 4,
              }}
              onClick={() => {
                handleCloseAd();
                window.location.href = "/coins";
              }}
            >
              What is HSD and Why It's Important? Learn More!
            </Typography>

            {/* Buttons Section */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(13, 105, 67, 0.8)",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  width: "100%",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(18, 148, 94, 0.8)",
                  },
                }}
                onClick={() => {
                  handleCloseAd();
                  window.location.href = "/register";
                }}
              >
                Register Now 🍃
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(104, 82, 145, 0.8)",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  width: "100%",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(98, 39, 138, 0.8)",
                  },
                }}
                onClick={() => {
                  handleCloseAd();
                  window.location.href = "/login";
                }}
              >
                Login Now 🍂
              </Button>
            </Box>

            {/* Close Button */}
            <Button
              onClick={handleCloseAd}
              variant="text"
              sx={{
                mt: 3,
                color: "#888",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: "#555",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default FristAddShown;
