import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { MdNotifications } from "react-icons/md";


const ExpiredAddsByUser = () => {
  const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [rides, setRides] = useState([]); // State for live rides
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [promo, setPromo] = useState([]);

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

  useEffect(() => {
    async function getAllPromo() {
      try {
        const res = await axios.get(
          `https://holidaysri-backend.onrender.com/promo/promo-exist?email=${userEmail}`
        );
        setPromo(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Promo Codes:", error);
        setLoading(false);
       // alert("Error fetching Promo Codes: " + error.message);
      }
    }
    getAllPromo();
  }, []);


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
      <Typography variant="h4" gutterBottom display="flex">
        Notifications..<i><MdNotifications />!</i>
      </Typography>

      {promo.promoCode && new Date(promo.expirationDate) < new Date() ? (
        <Card variant="outlined" style={{ backgroundColor: '#ffcccc', display: 'flex', alignItems: 'center', padding: '10px' }}>
          <CardContent style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ErrorIcon color="error" style={{ marginRight: '10px', fontSize: '40px' }} />
            <div>
              <Typography variant="h6" component="div" color="error">
                Attention: Your promo code <strong>{promo.promoCode}</strong> has expired!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Expired on: {new Date(promo.expirationDate).toLocaleDateString()}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Content to display if either promoCode doesn't exist or expirationDate is still valid */}
        </>
      )}



      {/* Expired Hotel Notification Section */}
      
      {loading ? (
        <CircularProgress />
      ) : expiredHotels.length > 0 ? (
        <Grid container spacing={1}>
          {expiredHotels.map((hotel, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined" style={{ backgroundColor: '#ffcccc', display: 'flex', alignItems: 'center', padding: '10px' }}>
                <CardContent style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ErrorIcon color="error" style={{ marginRight: '10px', fontSize: '40px' }} />
                  <div>
                    <Typography variant="h6" component="div" color="error">
                      Attention: Your hotel <strong>{hotel.hotelName}</strong> has expired!
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Expired on: {new Date(hotel.expirationDate).toLocaleDateString()}
                    </Typography>
                  </div>
                </CardContent>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate('/expiredaddpage')}
                  style={{ marginLeft: 'auto', padding: '10px 20px' }}
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      )}


    {/* Expired Vehicle Notification Section */}
    <Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '10px' }}>
    </Typography>

    {loading ? (
      <CircularProgress />
    ) : expiredVehicles.length > 0 ? (
      <Grid container spacing={1}>
        {expiredVehicles.map((vehicle, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" style={{ backgroundColor: '#ffcccc', display: 'flex', alignItems: 'center', padding: '10px' }}>
              <CardContent style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <ErrorIcon color="error" style={{ marginRight: '10px', fontSize: '40px' }} />
                <div>
                  <Typography variant="h6" component="div" color="error">
                    Attention: Your vehicle <strong>{vehicle.vehicleNumber}</strong> has expired!
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Expired on: {new Date(vehicle.expirationDate).toLocaleDateString()}
                  </Typography>
                </div>
              </CardContent>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/expiredaddpage')}
                style={{ marginLeft: 'auto', padding: '10px 20px' }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" color="#fff">
        
      </Typography>
    )}

    {/* Expired Ride Notification Section */}
    <Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '10px' }}>
    </Typography>

    {loading ? (
      <CircularProgress />
    ) : expiredRides.length > 0 ? (
      <Grid container spacing={1}>
        {expiredRides.map((ride, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" style={{ backgroundColor: '#ffcccc', display: 'flex', alignItems: 'center', padding: '10px' }}>
              <CardContent style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <ErrorIcon color="error" style={{ marginRight: '10px', fontSize: '40px' }} />
                <div>
                  <Typography variant="h6" component="div" color="error">
                    Attention: Your ride on <strong>{ride.Route}</strong> has expired!
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Expired on: {new Date(ride.expirationDate).toLocaleDateString()}
                  </Typography>
                </div>
              </CardContent>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate(`/expiredaddpage`)}
                style={{ marginLeft: 'auto', padding: '10px 20px' }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" color="#fff">
      </Typography>
    )}


{/* Expired Event Notification Section */}
<Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '10px' }}>
</Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      ) : (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      )}

      {/* Expired Products Notification Section */}
<Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '10px' }}>
</Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      ) : (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      )}

            {/* Expired Food Notification Section */}
<Typography variant="h5" color="#fff" gutterBottom style={{ marginTop: '10px' }}>
</Typography>
      {loading ? (
        <CircularProgress />
      ) : expiredRides.length > 0 ? (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      ) : (
        <Typography variant="body1" color="#fff">
          
        </Typography>
      )}

    </div>
  );
};

export default ExpiredAddsByUser;
