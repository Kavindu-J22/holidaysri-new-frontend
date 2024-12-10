import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExpiredLiveRidesByUser = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the userEmail from localStorage
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch live rides data
    async function getRides() {
      try {
        const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/realTime/");
        setRides(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching live rides:", error);
        setLoading(false);
        alert("Error fetching live rides: " + error.message);
      }
    }
    getRides();
  }, []);

  // Filter rides by userEmail, expired date, and Monthly rides
  const expiredRides = rides.filter(
    (ride) =>
      ride.email === userEmail && 
      ride.DailyOrMonth === "Monthly" && // Show only "Monthly" rides
      new Date(ride.expirationDate) < new Date()
  );

  // Republish function to update expiration date by one month, passing user email
  const handleRepublishRide = async (rideId) => {
    try {
      // Calculate new expiration date (one month from now)
      const newExpirationDate = new Date();
      newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

      // Retrieve the user's email from localStorage
      const userEmail = localStorage.getItem("userEmail");

      // Call backend API to update the expiration date
      const res = await axios.put(
        "https://holidaysri-backend.onrender.com/realTime/ride-update-expiredate", 
        {
          _id: rideId, 
          newExpirationDate,
          userEmail // Pass the userEmail to the backend
        }
      );

      // Show success alert
      alert("Ride ad republished successfully!");

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
        Expired Monthly Live Ride Advertisements for {userEmail}
      </Typography>
      
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : expiredRides.length > 0 ? (
        <Grid container spacing={3}>
          {expiredRides.map((ride, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    {ride.Route}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  vehicle Number: {ride.vehicleID}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {ride.DailyOrMonth}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: LKR {ride.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published Date: {new Date(ride.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                    Expired on: {new Date(ride.expirationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: "20px", backgroundColor: "#ff5722" }}
                    onClick={() => handleRepublishRide(ride._id)} // Trigger republish action
                  >
                    Republish Ride
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No expired rides found for your email.
        </Typography>
      )}
    </Container>
  );
};

export default ExpiredLiveRidesByUser;
