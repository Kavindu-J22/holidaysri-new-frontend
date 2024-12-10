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

const GuideDashboard = () => {
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


  // Renew Guider Profile
  const handleRenewGuiderProfile = async (currentUserGuide) => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';

      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;

      navigate('/checkout', {
        state: {
          discount: rates.discountguidePercentage,
          rate: rates.guideAdvertiseRate,
          path: '/GuiderProf-renew',
          currency: 'LKR',
          items: 'Guide Profile Renew',
          earns: rates.earningRate,
          usedPromocode: currentUserGuide.promoCode,
        },
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };

  // Get the current user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");

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
    <Grid container sx={{ padding: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12} sm={8}>
        <Typography
          variant="h4"
          sx={{
            color: "#333",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "bold",
            fontSize: "28px",
          }}
        >
          Guide Profile
        </Typography>
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.420)",
            borderColor: "black",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent >
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
                    sx={{
                      marginTop: "10px",                     
                      textAlign: "center",                    
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      color: new Date(currentUserGuide.expirationDate) < new Date() ? "red" : "#00ffd9",
                      // borderColor: new Date(currentUserGuide.expirationDate) < new Date() ? "red" : "#00ffd9",
                      backgroundColor: new Date(currentUserGuide.expirationDate) < new Date() ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 128, 0, 0.1)",
                    }}
                  >
                    {new Date(currentUserGuide.expirationDate) < new Date() ? "Expired User" : "Active User"}
              </Typography>

            <Typography
              variant="body1"
              sx={{
                marginTop: "10px",
                color: "#333",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Person sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              NIC: {currentUserGuide.nic}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
                color: "#333",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <Phone sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              Contact Number: {currentUserGuide.contactNumber}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
                color: "#333",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <LocationOn sx={{ verticalAlign: "middle", marginRight: "6px" }} />
              Location: {currentUserGuide.location}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
                color: "#333",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "600",
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
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "rgb(5, 40, 53)", // Custom background color
                    color: "#fff", // Set text color if needed
                    '&:hover': {
                      backgroundColor: "#555", // Optional: Darken color on hover
                    },
                  }}
                >
                  Download Certificate
                </Button>
              </Box>
            )}
            {new Date(currentUserGuide.expirationDate) < new Date() && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "30px",
                            marginTop: "16px",
                            marginLeft: "10px", // To add some space between the buttons
                          }}
                          onClick={() => handleRenewGuiderProfile(currentUserGuide)}
                        >
                          Re-Active Profile
                        </Button>
                      )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuideDashboard;
