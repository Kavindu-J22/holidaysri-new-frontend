import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { Person, Phone, LocationOn, Work } from "@mui/icons-material";

const GuiderProfileRenew = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch guide profiles when component mounts
  useEffect(() => {
    async function getGuides() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/api/guide/allGuideProfiles"
        );
        setGuides(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching guides:", error);
        setError(error.message);
        setLoading(false);
      }
    }
    getGuides();
  }, []);

  // Get the current user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");


   // Republish function to update expiration date by one month
   const handleRepublishHotel = async (guiderId) => {
    try {
        // Calculate new expiration date (one month from now)
        const newExpirationDate = new Date();
        newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

        // Call backend API to update the expiration date
        const res = await axios.put(
        "https://holidaysri-backend.onrender.com/api/guide/guider-update-expiredate", 
        {
            _id: guiderId, 
            newExpirationDate,
            userEmail // Send userEmail in the request
        }
        );
        // Show success alert
        alert("Guider Profile Republished successfully!");
        // Navigate to the correct dashboard
        navigate("/Guider-Dashboard");

    } catch (error) {
        console.error("Error updating expiration date guider:", error);
        alert("Error updating expiration date guider : " + error.message);
    }
    };


  // Filter the guide data to get the current user's profile
  const currentUserGuide = guides.find(guide => guide.email === userEmail);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress sx={{ color: "green" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!currentUserGuide) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6" color="primary">
          No guide profile found for your account.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container sx={{ padding: "16px", justifyContent: "center" }}>
      <Grid item xs={12} sm={8}>
        <Typography
          variant="h4"
          sx={{
            color: "#1976d2",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "bold",
            fontSize: "28px",
          }}
        >
          Republish Guider Profile
        </Typography>
        <Card
          sx={{
            backgroundColor: "rgba(255,255,255, 0.85)",
            borderColor: "black",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Box sx={{ display:"flex", justifyContent: "center", marginBottom: "20px" }}>
              <Avatar
                alt={currentUserGuide.name}
                src={currentUserGuide.profileImage}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: "#333",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "22px",
              }}
            >
              {currentUserGuide.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginTop: "10px",
                color: "#555",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <Person sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              NIC: {currentUserGuide.nic}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
                color: "#555",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <Phone sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              Contact Number: {currentUserGuide.contactNumber}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
                color: "#555",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <LocationOn sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              Location: {currentUserGuide.location}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
                color: "#555",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <Work sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              Experience: {currentUserGuide.experience}
            </Typography>

            {currentUserGuide.country && (
              <Typography
                variant="body1"
                sx={{
                  marginTop: "10px",
                  color: "#555",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                Country: {currentUserGuide.country}
              </Typography>
            )}

            {currentUserGuide.certificateImage && (
              <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center", flexDirection: "column",  textAlign: "center", marginTop: "20px" }}>
                <img
                  src={currentUserGuide.certificateImage}
                  alt="Certificate"
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Box>
            )}
            
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "30px",
                    marginTop: "16px",
                    marginLeft: "10px", // To add some space between the buttons
                    }}
                    onClick={() => handleRepublishHotel(currentUserGuide._id)}
                    >
                    Re-Publish Profile
            </Button>
                      
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuiderProfileRenew;
