import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdOutlineHourglassEmpty } from "react-icons/md";

const ExpiredAddsByUser = () => {
  const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [rides, setRides] = useState([]); // State for live rides
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the userEmail from localStorage
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch hotels, vehicles, and rides data
    async function getAllData() {
      try {
        const resHotels = await axios.get("https://holidaysri-backend-9xm4.onrender.com/hotel/");
        const resVehicles = await axios.get("https://holidaysri-backend-9xm4.onrender.com/vehicle/");
        const resRides = await axios.get("https://holidaysri-backend-9xm4.onrender.com/realTime/"); // Fetch rides

        setHotels(resHotels.data);
        setVehicles(resVehicles.data);
        setRides(resRides.data); // Set rides data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        alert("Error fetching data: " + error.message);
      }
    }

    getAllData();
  }, []);


    // Renew Hotel Advertisement
    const handleRenewHotel = async (hotel) => {
      try {
        const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
        const id = '65f58296f707aa390b10db8a';
  
        const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
        const rates = responseRates.data.rate;
  
        navigate('/checkout', {
          state: {
            discount: rates.discounthotelPercentage,
            rate: rates.hotelAdvertiseRate,
            path: '/Hotel-renew',
            currency: 'LKR',
            items: 'Hotel Advertisement',
            earns: rates.earningRate,
            usedPromocode: hotel.promoCode,
          },
        });
      } catch (error) {
        console.error('Error fetching rates or navigating to checkout:', error.message);
      }
    };
  
    // Renew Vehicle Advertisement
    const handleRenewVehicle = async (vehicle) => {
      try {
        const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
        const id = '65f58296f707aa390b10db8a';
  
        const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
        const rates = responseRates.data.rate;
  
        navigate('/checkout', {
          state: {
            discount: rates.discountvehiclePercentage,
            rate: rates.vehicleAdvertiseRate,
            path: '/Vehicle-renew',
            currency: 'LKR',
            items: 'Vehicle Advertisement',
            earns: rates.earningRate,
            usedPromocode: vehicle.promoCode,
          },
        });
      } catch (error) {
        console.error('Error fetching rates or navigating to checkout:', error.message);
      }
    };

      // Renew Vehicle Advertisement
    const handleRenewLiveRide = async (ride) => {
      try {
        const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
        const id = '65f58296f707aa390b10db8a';
  
        const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
        const rates = responseRates.data.rate;
  
        navigate('/checkout', {
          state: {
            discount: rates.discountMonthlyPercentage,
            rate: rates.liveRideMonthlyRate,
            path: '/MonthlyRide-renew',
            currency: 'LKR',
            items: 'Live Ride Advertisement',
            earns: rates.monthlyEarnRate,
            usedPromocode: ride.promoCode,
          },
        });
      } catch (error) {
        console.error('Error fetching rates or navigating to checkout:', error.message);
      }
    };



  // Filter hotels and vehicles by userEmail and expired date
  const expiredHotels = hotels.filter(
    (hotel) =>
      hotel.email === userEmail &&
      new Date(hotel.expirationDate) < new Date()
  );

  const expiredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.email === userEmail &&
      new Date(vehicle.expirationDate) < new Date()
  );

  // Filter rides by userEmail, expired date, and "Monthly" rides
  const expiredRides = rides.filter(
    (ride) =>
      ride.email === userEmail &&
      ride.DailyOrMonth === "Monthly" && // Only "Monthly" rides
      new Date(ride.expirationDate) < new Date() // Expired rides
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" color="#fff" gutterBottom marginBottom="20px">
        Expired Advertisements..<i><MdOutlineHourglassEmpty /></i>
      </Typography>

      {/* Expired Hotel Advertisements Section */}
      <Typography variant="h5" color="#fff" gutterBottom>
        Expired Hotel Advertisements:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredHotels.length > 0 ? (
        <Grid container spacing={3}>
          {expiredHotels.map((hotel, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
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
                  <Typography variant="body2" color="error">
                    Expired on: {new Date(hotel.expirationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={() => navigate('/add-Hotel')}
                      >
                        View & Edit Details
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        fullWidth
                        onClick={() => handleRenewHotel(hotel)}
                      >
                        Pay & Re-new Add
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="#fff">
          No expired hotels found for your email.
        </Typography>
      )}

      {/* Expired Vehicle Advertisements Section */}
      <Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '40px' }}>
        Expired Vehicle Advertisements:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredVehicles.length > 0 ? (
        <Grid container spacing={3}>
          {expiredVehicles.map((vehicle, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Vehicle No : {vehicle.vehicleNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {vehicle.Vehiclecategory}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {vehicle.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: LKR {vehicle.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published Date: {new Date(vehicle.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="error">
                    Expired on: {new Date(vehicle.expirationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={() => navigate('/add-vehicle')}
                      >
                        View & Edit Details
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        fullWidth
                        onClick={() => handleRenewVehicle(vehicle)}
                      >
                        Pay & Re-new Add
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="#fff">
          No expired vehicles found for your email.
        </Typography>
      )}

      {/* Expired Ride Advertisements Section */}
      <Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '40px' }}>
        Expired Monthly Ride Advertisements:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Grid container spacing={3}>
          {expiredRides.map((ride, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
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
                  <Typography variant="body2" color="error">
                    Expired on: {new Date(ride.expirationDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={() => navigate(`/live-rides?email=${userEmail}`)}
                      >
                        View & Edit Details
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        fullWidth
                        onClick={() => handleRenewLiveRide(ride)}
                      >
                        Pay & Re-new Add
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      )}


{/* Expired Event Advertisements Section */}
<Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '40px' }}>
        Expired Events Advertisements:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      ) : (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      )}

      {/* Expired Products Advertisements Section */}
<Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '40px' }}>
        Expired Products Advertisements:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      ) : (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      )}

            {/* Expired Food Advertisements Section */}
<Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '40px' }}>
        Expired Foods Advertisements:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      ) : (
        <Typography variant="body1" color="#fff">
          No expired rides found for your email.
        </Typography>
      )}

    </div>
  );
};

export default ExpiredAddsByUser;
