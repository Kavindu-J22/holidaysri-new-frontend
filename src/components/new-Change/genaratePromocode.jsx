import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';

const PromoCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Price, Currency, Title, Subject } = location.state;
  const [promoCode, setPromoCode] = useState('');
  const [customPromo, setCustomPromo] = useState('');
  const [error, setError] = useState('');
  const [existingPromoCode, setExistingPromoCode] = useState('');
  const [selectedPromoType, setSelectedPromoType] = useState('');
  const [userPromoSet, setUserPromoSet] = useState(false);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    console.log('Fetching all promo codes for validation');
    
    axios.get('http://localhost:8000/newPromocodes/all')
      .then(response => {
        // Ensure response data is in the expected format
        if (Array.isArray(response.data)) {
          const userPromo = response.data.find(promo => promo.userEmail === userEmail);
          if (userPromo) {
            setExistingPromoCode(userPromo.promocode);
            console.log('Fetched Promo Code for user:', userPromo.promocode);
          } else {
            console.log('No promo code found for this user.');
          }
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching promo codes:', error));
  }, [userEmail]);
  

  const generatePromoCode = () => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedCode = 'HS';
    for (let i = 0; i < 7; i++) {
      generatedCode += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    generatedCode += getPromoSuffix(Title);
    setPromoCode(generatedCode);
    setSelectedPromoType('generated');
    setUserPromoSet(true);
  };

  const handleCustomPromoChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length <= 7) {
      setCustomPromo(value);
    }
  };

  const validateCustomPromo = () => {
    if (customPromo.length < 4) {
      setError('Minimum characters for the custom promo code is 4.');
      return false;
    }
    setError('');
    setSelectedPromoType('custom');
    setUserPromoSet(true);
    alert('All set! You can now proceed to checkout.');
    return true;
  };

  const handleCheckout = () => {
    if (existingPromoCode) {
      alert(`You already have a Promo Code: ${existingPromoCode}`);
      return;
    }
    if (!userPromoSet) {
      alert('Please choose your Promo Code before proceeding to checkout.');
      return;
    }

    const finalPromoCode = selectedPromoType === 'custom'
      ? `HS${customPromo}${getPromoSuffix(Title)}`
      : promoCode;

    navigate('/checkout', {
      state: { Price, Currency, Title, PromoCode: finalPromoCode },
    });
  };

  const getPromoSuffix = (title) => {
    switch (title) {
      case 'Diamond Promo Code':
        return 'PD';
      case 'Gold Promo Code':
        return 'PG';
      case 'Silver Promo Code':
        return 'PS';
      case 'Free Promo Code':
        return 'PF';
      default:
        return 'XX';
    }
  };

  return (
    <Box padding={4} style={{ marginTop: 60 }}>
      <Typography variant="h4">{Subject} - {Title}</Typography>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Choose your Promo Code option:</Typography>
          <Button variant="contained" color="primary" onClick={() => setSelectedPromoType('generated')}>
            Generate Promo Code
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setSelectedPromoType('custom')}>
            Customize Promo Code
          </Button>
        </Grid>

        {selectedPromoType === 'generated' && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Generated Promo Code</Typography>
                <Typography variant="body1">{promoCode}</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={generatePromoCode}>
                  Generate Promo Code
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        {selectedPromoType === 'custom' && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Customize Promo Code</Typography>
                <TextField
                  value={customPromo}
                  onChange={handleCustomPromoChange}
                  inputProps={{ maxLength: 7 }}
                  placeholder="Enter Custom Promo (max 7 chars)"
                  fullWidth
                />
                {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}
                <Typography variant="body1">HS{customPromo}{getPromoSuffix(Title)}</Typography>
                <Button variant="contained" color="secondary" fullWidth onClick={validateCustomPromo}>
                  Validate Custom Promo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}


        <Grid item xs={12}>

        {existingPromoCode && (
        <Alert severity="info">
          You already have a Promo Code: {existingPromoCode}
        </Alert>
        )}

          <Card style={{ marginTop: '15px' }}>
            <CardContent>
              <Typography variant="h6">Proceed to Checkout</Typography>
              <Button variant="contained" color="success" fullWidth onClick={handleCheckout}>
                Checkout Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromoCodePage;
