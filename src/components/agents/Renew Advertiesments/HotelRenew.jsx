import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExpiredHotelsByUser = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the userEmail from localStorage
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch hotels data
    async function getHotels() {
      try {
        const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/hotel/");
        setHotels(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false);
        alert("Error fetching hotels: " + error.message);
      }
    }
    getHotels();
  }, []);

  // Filter hotels by userEmail and expired date
  const expiredHotels = hotels.filter(
    (hotel) =>
      hotel.email === userEmail && 
      new Date(hotel.expirationDate) < new Date()
  );

  // Republish function to update expiration date by one month
    const handleRepublishHotel = async (hotelId) => {
    try {
        // Calculate new expiration date (one month from now)
        const newExpirationDate = new Date();
        newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

        // Retrieve the user's email from localStorage
        const userEmail = localStorage.getItem("userEmail"); // Ensure this key matches your localStorage key

        // Call backend API to update the expiration date
        const res = await axios.put(
        "https://holidaysri-backend.onrender.com/hotel/hotel-update-expiredate", 
        {
            _id: hotelId, 
            newExpirationDate,
            userEmail // Send userEmail in the request
        }
        );

        // Show success alert
        alert("Hotel add Republished successfully!");

        // Check the user's role in localStorage
        const userRole = localStorage.getItem("userRole");

        // Navigate to the correct dashboard based on the userRole
        if (userRole === 'seller') {
        navigate("/foreign-dashboard");
        } else if (userRole === 'agent') {
        navigate("/local-dashboard");
        } else {
        navigate("/MainuserDashboard");
        }

    } catch (error) {
        console.error("Error updating expiration date:", error);
        alert("Error updating expiration date: " + error.message);
    }
    };

 

  return (
    <Container style={{ backgroundColor: "#f5f5f5", padding: "20px", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: "40px", fontWeight: "bold" }}>
        Expired Hotel Advertisements for {userEmail}
      </Typography>
      
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : expiredHotels.length > 0 ? (
        <Grid container spacing={3}>
          {expiredHotels.map((hotel, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    {hotel.hotelName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {hotel.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {hotel.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: LKR {hotel.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published Date: {new Date(hotel.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                    Expired on: {new Date(hotel.expirationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: "20px", backgroundColor: "#ff5722" }}
                    onClick={() => handleRepublishHotel(hotel._id)} // Trigger republish action
                  >
                    Republish Post
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No expired hotels found for your email.
        </Typography>
      )}
    </Container>
  );
};

export default ExpiredHotelsByUser;
