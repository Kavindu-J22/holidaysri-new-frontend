import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

const ReactivatePromoCodePage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rates, setRates] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const status  = location.state || {}; // Get status from location state

  // Retrieve the email from local storage when the component mounts
  useEffect(() => {
    if (status === 'PaidActive') {
      const user = localStorage.getItem("userEmail");
      setEmail(user);
    }
  }, [status]);

  const handleReactivatePromoCode = async () => {
    try {
      if (status !== 'PaidActive') return;

      console.log('Sending request to reactivate promo code...');

      const response = await axios.post('https://holidaysri-backend-9xm4.onrender.com/promo/reactivate-promo-code', {
        code: promoCode,
        email: email // Use email from state (retrieved from local storage)
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error reactivating promo code');
    }
  };

  const handleCheckout = async () => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
      setRates(rates);
  
      // Navigate to checkout page with the fetched rates and discount
      navigate('/checkout', { 
        state: { 
          discount: rates.discountPromoCodePercentage, 
          rate: rates.promoCodeRate,
          promoCode: promoCode, // Pass current promo code if needed
          path : '/reactivate',
          currency: 'LKR'
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };

  const handleBack = () => {
    navigate('/local-dashboard'); // This will navigate back to the previous page
  };

  return (
    <Grid
      sx={{
        backgroundImage: 'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733431107/151334_00_2x_sns7zv.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: { lg: "24px", xs: "16px" },
          borderRadius: "20px",
          width: { lg: '50%', xs: '80%' },
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderRadius: "30px",
            borderColor: "black",
            boxShadow: "none",
            width: { lg: "220px", xs: "200px" },
            backgroundColor: "white",
            color: "black",
            marginTop: { lg: "16px", xs: "20px" },
            height: "32px",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              borderColor: "black",
              boxShadow: "none",
            },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Typography variant="h4" gutterBottom>Reactivate Promo Code</Typography>
        <TextField
          label="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleReactivatePromoCode}
          sx={{
            borderRadius: "30px",
            backgroundColor: "black",
            color: "white",
            marginTop: "16px",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
              boxShadow: "none",
            },
          }}
        >
          Reactivate
        </Button>
        {message && (
          <Typography variant="body1" color="textSecondary" marginTop="16px">
            {message}
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default ReactivatePromoCodePage;
