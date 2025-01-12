import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Paper, Modal, List, ListItem, ListItemText, IconButton, Alert } from '@mui/material';
import { CopyAll, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import CreditCardIcon from '@mui/icons-material/CreditCard';


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Price, Currency, Title, PromoCode } = location.state;

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [usedValidPromocode, setUsedValidPromocode] = useState('');
  const [usedValidPromocodeOwner, setUsedValidPromocodeOwner] = useState('');
  const [usedValidPromocodType, setUsedValidPromocodeType] = useState('');
  const [earnAmount, setEarnAmount] = useState(0);
  const [discountRateforDis, setDiscountRateforDis] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(Price);
  const [favoritePromoCodes, setFavoritePromoCodes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [copied, setCopied] = useState(null); // Track copied state
  const [error, setError] = useState(''); // To handle error messages
  const [success, setSuccess] = useState('');
  const [fade, setFade] = useState(false);
  const [HSCRate, setHSCRate] = useState(null);

  useEffect(() => {
    // Fetch rates when the component mounts
    const fetchRates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/rate/get/677c3cf4d1f1323d5ca309a4');
        const { HSCRate, allPromocodeDiscountRate } = response.data.rate;
        setHSCRate(HSCRate);
        setDiscountRateforDis(allPromocodeDiscountRate)
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchRates();
  }, []);



    useEffect(() => {
      if (success || error) {
        setFade(false); // Reset fade-in
        const fadeTimer = setTimeout(() => {
          setFade(true);  // Start fading
        }, 3000); // Start fade after 200ms
  
        const removeTimer = setTimeout(() => {
          setSuccess('');
          setError('');
        }, 3500); // Remove after fade out (0.5s)
  
        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
    }, [success, error]);

    const applyPromoCode = async () => {
      try {
          // Step 1: Validate PromoCode via API
          const response = await axios.post('http://localhost:8000/newPromocodes/check-exists', { promocode: promoCodeInput });
  
          // Check if promo code is valid
          if (!response.data.exists) {
              // If promo code doesn't exist, display the message from the backend
              setError(response.data.message || 'Invalid promo code. Please check and try again.');
              return;
          }
  
          // Step 2: If promo code is valid, show success alert
          
          setUsedValidPromocode(promoCodeInput);
          setUsedValidPromocodeOwner(response.data.userEmail);
          setUsedValidPromocodeType(response.data.promocodeType);
          setSuccess(`Valid PromoCode. Discount applied. ${usedValidPromocodeOwner}'s ${usedValidPromocodType} used.`);
  
          // Fetch rate info 
          const rateResponse = await axios.get('http://localhost:8000/rate/get/677c3cf4d1f1323d5ca309a4');
          const allPromocodeDiscountRate = rateResponse.data.rate.allPromocodeDiscountRate;
          const specialPromocodeDiscountRate = rateResponse.data.rate.specialPromocodeDiscountRate;
          const diamondPromocodeEarnRate = rateResponse.data.rate.diamondPromocodeEarnRate;
          const goldPromocodeEarnRate = rateResponse.data.rate.goldPromocodeEarnRate;
          const silverPromocodeEarnRate = rateResponse.data.rate.silverPromocodeEarnRate;
          const freePromocodeEarnRate = rateResponse.data.rate.freePromocodeEarnRate;
          const specialPromocodeEarnRate = rateResponse.data.rate.specialPromocodeEarnRate;
          const HSCRate = rateResponse.data.rate.HSCRate;
  
          // Step 3: Determine Discount Rate
        let discountRate = allPromocodeDiscountRate / HSCRate; // Default discount rate

        // Check if the valid promo code ends with 'SP'
        if (promoCodeInput.slice(-2).toUpperCase() === 'SP') {
            discountRate = specialPromocodeDiscountRate / HSCRate;
        }

         // Ensure discountRate is not applied if Price < discountRate
        if (Price < discountRate) {
          discountRate = 0;
        }

        // Update the discounted amount and final amount
        setDiscountedAmount(discountRate); // Set the calculated discount
        setFinalAmount(Price - discountRate); // Set the final amount after applying discount

        let earnRate = 0; // Default earn rate
        const itemType = Title;

        // Check if the valid promo code ends with specific suffixes
        if (itemType === 'Diamond Promo Code') {
            earnRate = diamondPromocodeEarnRate; // Diamond rate
        } else if (itemType === 'Gold Promo Code') {
            earnRate = goldPromocodeEarnRate; // Gold rate
        } else if (itemType === 'Silver Promo Code') {
            earnRate = silverPromocodeEarnRate; // Silver rate
        } else if (itemType === 'Free Promo Code') {
            earnRate = freePromocodeEarnRate; // Free rate
        } else if (itemType === 'Special Promo Code') {
            earnRate = specialPromocodeEarnRate; // Special rate
        } else{
          earnRate = 0; // Default rate 0
        }

        
        setEarnAmount(earnRate); // Set the calculated Earns

          // Clear any existing error message
          setError('');
        } catch (error) {
          // Handle network or unexpected errors
          console.error('Error applying promo code:', error);
  
          // Check if the error response has a message from the backend
          if (error.response && error.response.data && error.response.data.message) {
              // Use the backend error message if available
              setError(error.response.data.message);
          } else {
              // Fallback for unexpected errors (network issues, etc.)
              setError('Something went wrong. Please try again.');
          }
      }
  };
  
  
  const fetchFavoritePromoCodes = async () => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      const response = await axios.get(`http://localhost:8000/favorites/getFavorites?email=${userEmail}`);
      if (Array.isArray(response.data)) {
        setFavoritePromoCodes(response.data);
      } else {
        console.error('Unexpected response format from the server');
      }
    } catch (error) {
      console.error('Error fetching favorite promo codes:', error);
    }
  };

  const handleCopyPromoCode = (promoCode) => {
    navigator.clipboard.writeText(promoCode);
    setCopied(promoCode); // Set the copied promo code for displaying tick

    // Revert back to copy icon after 0.5s
    setTimeout(() => {
      setCopied(null);
    }, 500);
  };

  const handleModalOpen = () => {
    fetchFavoritePromoCodes();
    setOpenModal(true);
  };

  const handleModalClose = () => setOpenModal(false);

  const handlePayNow = () => {
    navigate('/coins', {
    });
  };

  const handlePayNowWithHsc = () => {
    navigate('/HSCPaymentPromocode', {
      state: {
        Currency:'HSC',
        calculatedHSCAmount: finalAmount,
        Title,
        item: PromoCode,
        UsedPromocode: usedValidPromocode,
        UsedPromocodeOwner: usedValidPromocodeOwner,
        Earns: earnAmount,
      },
    });
  };

  return (
    <Box sx={{ mt: 9, p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {Title} - Purchase
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: {Price} {Currency}
        </Typography>
        <Typography variant="h6" gutterBottom>
          The Promo code you are about to purchase: {PromoCode}
        </Typography>

        <>
      {success && (
        <Alert
          severity="success"
          style={{
            marginBottom: '10px',
            opacity: fade ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {success}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          style={{
            marginBottom: '10px',
            opacity: fade ? 0 : 1,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {error}
        </Alert>
        )}
    </>

        <Box sx={{ my: 3 }}>
          <Typography variant="body1" gutterBottom>
            Apply Promo Code to get a discount:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Type PromoCode Here and get ${discountRateforDis / HSCRate} HSC discount ( ${discountRateforDis} LKR )`}
            value={promoCodeInput}
            onChange={(e) => setPromoCodeInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={applyPromoCode}
            fullWidth
          >
            Apply Promo Code
          </Button>
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mb: 3 }}
          onClick={handleModalOpen}
        >
          Select Promo Code from your Favourites ⭐
        </Button>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Discounted Amount: {discountedAmount} {Currency}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">
              Final Amount: {finalAmount} {Currency}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>

        {/* Pay with Credit Card */}
        <Grid item xs={12} md={6}>
            <Button
            variant="contained"
            fullWidth
            startIcon={<CreditCardIcon />} // Icon for Credit Card
            onClick={handlePayNow}
            sx={{
                backgroundColor: '#007BFF', // Bright, vibrant blue for Credit Card
                color: '#FFFFFF', // White text for better contrast
                fontWeight: 'bold', // Emphasize text
                textTransform: 'none', // Maintain readable text casing
                borderRadius: '8px', // Slightly rounded corners for modern look
                padding: '12px 16px', // Add padding for better feel
                '&:hover': { backgroundColor: '#0056b3' }, // Darker blue on hover
            }}
            >
            Pay & Buy More HSC Now
            </Button>
        </Grid>

        {/* Pay with HSC */}
        <Grid item xs={12} md={6}>
            <Button
            variant="contained"
            fullWidth
            onClick={handlePayNowWithHsc}
            startIcon={
                <img
                src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1734337684/hsc_resll6_1_q0eksv.webp" // Replace with your actual URL
                alt="HSC Coin"
                style={{ width: 24, height: 24 }}
                />
            }
            sx={{
                backgroundColor: 'rgb(41, 126, 93)', // Google-style yellow for HSC button
                color: '#FFFFFF', // White text for contrast
                fontWeight: 'bold', // Emphasize text
                textTransform: 'none', // Maintain readable text casing
                borderRadius: '8px', // Slightly rounded corners
                padding: '12px 16px', // Add padding
                '&:hover': { backgroundColor: 'rgb(38, 104, 79)' }, // Slightly darker yellow on hover
            }}
            >
            Pay with HSC - Amount {finalAmount} HSC / =
            </Button>
            
        </Grid>
        </Grid>

        </Box>

      </Paper>

      {/* Modal for displaying favorite promo codes */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h5" gutterBottom>Your Favorite Promo Codes</Typography>
          {favoritePromoCodes.length === 0 ? (
            <Alert severity="info">No favorite promo codes found.</Alert>
          ) : (
            <List>
              {favoritePromoCodes.map((promoCode, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={promoCode} />
                  <IconButton onClick={() => handleCopyPromoCode(promoCode)}>
                    {copied === promoCode ? <CheckCircle color="success" /> : <CopyAll />}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          <Button onClick={handleModalClose} sx={{ mt: 2 }} variant="outlined" color="secondary">Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Checkout;
