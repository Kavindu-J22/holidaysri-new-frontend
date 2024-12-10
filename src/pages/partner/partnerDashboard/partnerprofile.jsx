import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";


const MyPartnerDetailsPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch all partner profiles when component mounts
  useEffect(() => {
    async function getPartners() {
      try {
        const res = await axios.get(
          "https://holidaysri-backend-9xm4.onrender.com/api/partner/allPartnerProfiles"
        );
        setPartners(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setError(error.message);
        setLoading(false);
      }
    }
    getPartners();
  }, []);

  // Get the current user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");


    // Renew Guider Profile
    const handleRenewPartnerProfile = async (currentUserPartner) => {
      try {
        const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
        const id = '65f58296f707aa390b10db8a';

        const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
        const rates = responseRates.data.rate;

       // Fetch rates from the backend

      const finalRate = currentUserPartner.subrole === 'Foreign Partner' ? rates.partnerForeignRate : rates.partnerLocalRate;

      const finalEarning = currentUserPartner.subrole === 'Foreign Partner' ? rates.partnerForeignEarnRate : rates.partnerLocalEarnRate;

      const finalDiscount = currentUserPartner.subrole === 'Foreign Partner' ? rates.discountForeignPartnerPercentage : rates.discountLocalPartnerPercentage;

      const finalCurrency = currentUserPartner.subrole === 'Foreign Partner' ? "USD" : "LKR";
  
        
  
        navigate('/checkout', {
          state: {
            discount: finalDiscount,
            rate: finalRate,
            path: '/PartnerProf-renew',
            currency: finalCurrency,
            items: 'Partner Profile Renew',
            earns: finalEarning,
            usedPromocode: currentUserPartner.promoCode,
          },
        });
      } catch (error) {
        console.error('Error fetching rates or navigating to checkout:', error.message);
      }
    };

  // Filter the partner data to get the current user's partner profile
  const currentUserPartner = partners.find(partner => partner.email === userEmail);

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

  if (!currentUserPartner) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6" color="primary">
          No partner profile found for your account.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container justifyContent="center" sx={{ padding: "16px" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h4" sx={{ color: "#2c3e50", textAlign: "center", marginBottom: "24px", fontWeight: "bold" }}>
          Travel Partner Profile
        </Typography>
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.650)",
            borderColor: "#bdc3c7",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
              <Avatar
                src={currentUserPartner.profileImage || currentUserPartner.partnerProfileImage}
                alt={currentUserPartner.name}
                sx={{ width: 150, height: 150, margin: "auto", border: "4px solid #3498db" }}
              />
            </Box>
            <Typography variant="h5" sx={{ color: "#2c3e50", fontWeight: "bold", textAlign: "center" }}>
              {currentUserPartner.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: "8px", color: "#7f8c8d", textAlign: "center" }}>
              Travel {currentUserPartner.role} | {currentUserPartner.subrole}
            </Typography>

            <Typography
                    sx={{
                      marginTop: "10px",                     
                      textAlign: "center",                    
                      fontWeight: "600",
                      fontSize: "12px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      color: new Date(currentUserPartner.expirationDate) < new Date() ? "red" : "#00ffd9",
                      // borderColor: new Date(currentUserPartner.expirationDate) < new Date() ? "red" : "#00ffd9",
                      backgroundColor: new Date(currentUserPartner.expirationDate) < new Date() ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 128, 0, 0.1)",
                    }}
                  >
                    {new Date(currentUserPartner.expirationDate) < new Date() ? "Expired User" : "Active User"}
              </Typography>
            
            <Box sx={{ marginTop: "24px" }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <EmailIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                 <span style={{fontWeight:"600"}}>E-mail :</span> {currentUserPartner.email}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <CakeIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                <span style={{fontWeight:"600"}}>Age :</span> {currentUserPartner.age} years
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <WcIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                <span style={{fontWeight:"600"}}>Gender :</span> {currentUserPartner.gender}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <FavoriteIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                <span style={{fontWeight:"600"}}>Interests :</span> {currentUserPartner.interest}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <PhoneIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                <span style={{fontWeight:"600"}}>Contact :</span> {currentUserPartner.contactNumber}
                </Typography>
              </Box>
              {currentUserPartner.location && (
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <LocationOnIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                  <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                  <span style={{fontWeight:"600"}}>Location :</span> {currentUserPartner.location}
                  </Typography>
                </Box>
              )}
              {currentUserPartner.country && (
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <PublicIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                  <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                  <span style={{fontWeight:"600"}}>Country :</span> {currentUserPartner.country}
                  </Typography>
                </Box>
              )}
              {currentUserPartner.company && (
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <BusinessIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                  <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                  <span style={{fontWeight:"600"}}>Company :</span> {currentUserPartner.company}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <PersonIcon sx={{ color: "#3498db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ color: "#2c3e50" }}>
                <span style={{fontWeight:"600"}}>Description :</span> {currentUserPartner.bio}
                </Typography>
              </Box>

              {new Date(currentUserPartner.expirationDate) < new Date() && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "30px",
                            marginTop: "16px",
                            marginLeft: "10px", // To add some space between the buttons
                          }}
                          onClick={() => handleRenewPartnerProfile(currentUserPartner)}
                        >
                          Re-Active Profile
                        </Button>
                      )}

            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MyPartnerDetailsPage;
