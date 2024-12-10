import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExpiredVehiclesByUser = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the userEmail from localStorage
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch vehicles data
    async function getVehicles() {
      try {
        const res = await axios.get("https://holidaysri-backend-9xm4.onrender.com/vehicle/");
        setVehicles(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
        alert("Error fetching vehicles: " + error.message);
      }
    }
    getVehicles();
  }, []);

  // Filter vehicles by userEmail and expired date
  const expiredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.email === userEmail && 
      new Date(vehicle.expirationDate) < new Date()
  );

  // Republish function to update expiration date by one month
  const handleRepublishVehicle = async (vehicleId) => {
    try {
      // Calculate new expiration date (one month from now)
      const newExpirationDate = new Date();
      newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

      // Retrieve the user's email from localStorage
      const userEmail = localStorage.getItem("userEmail");

      // Call backend API to update the expiration date
      const res = await axios.put(
        "https://holidaysri-backend.onrender.com/vehicle/vehicle-update-expiredate", 
        {
          _id: vehicleId, 
          newExpirationDate,
          userEmail // Send userEmail in the request
        }
      );

      // Show success alert
      alert("Vehicle ad republished successfully!");

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
        Expired Vehicle Advertisements for {userEmail}
      </Typography>
      
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : expiredVehicles.length > 0 ? (
        <Grid container spacing={3}>
          {expiredVehicles.map((vehicle, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    Vehicle No : {vehicle.vehicleNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {vehicle.Vehiclecategory}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {vehicle.nic}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: LKR {vehicle.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published Date: {new Date(vehicle.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                    Expired on: {new Date(vehicle.expirationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: "20px", backgroundColor: "#ff5722" }}
                    onClick={() => handleRepublishVehicle(vehicle._id)} // Trigger republish action
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
          No expired vehicles found for your email.
        </Typography>
      )}
    </Container>
  );
};

export default ExpiredVehiclesByUser;
