import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Checkout = () => {
  const location = useLocation();
  const { Price, Currency, Title, PromoCode } = location.state;

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(Price);

  const applyPromoCode = () => {
    // Placeholder logic for applying promo code
    const discount = promoCodeInput === 'DISCOUNT10' ? Price * 0.1 : 0;
    setDiscountedAmount(discount);
    setFinalAmount(Price - discount);
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
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" gutterBottom>
            Apply Promo Code to get a discount:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type PromoCode Here"
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
        >
          Select Promo Code from Favourite
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
          <Button variant="contained" color="success" fullWidth>
            Pay Now
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Checkout;
