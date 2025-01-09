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
  const [success, setSuccess] = useState('');
  const [fade, setFade] = useState(false);
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

    setSuccess(`Promo Code Generated: ${generatedCode}`);
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
    setSuccess('Validation successful! This promo code is in the correct format.');
    return true;
  };

  const handleCheckout = async () => {

    if (!userPromoSet) {
      setError('Please choose your Promo Code before proceeding to checkout.');
      return;
    }
  
    const finalPromoCode = selectedPromoType === 'custom'
      ? `HS${customPromo}${getPromoSuffix(Title)}`
      : promoCode;
  
    try {
      const response = await axios.get('http://localhost:8000/newPromocodes/all');
      const userEmail = localStorage.getItem('userEmail');
      
      if (Array.isArray(response.data)) {
        const userHasPromo = response.data.some(promo => promo.userEmail === userEmail);
        
        if (userHasPromo) {
          setError('You already have a Promocode. So you can\'t make another one. Use it or upgrade it with your Dashboard.');
          return;
        }
  
        const promoExists = response.data.some(promo => promo.promocode === finalPromoCode);
  
        if (promoExists) {
          setError('The promo code already purchased. Please choose a different promo code.');
          return;
        }

            // Check if promo code has minimum 8 characters
        if (finalPromoCode.length < 8) {
        setError('PromoCode Not Completed. Generate or Customize Your Promo Code. if You Already Generated promocode Go to Generate Promo code Section and Try Checkout Now.');
        return;
        }
  
        // If promo code does not exist, proceed to checkout
        setError(''); // Clear any existing error
        navigate('/promoCheckouts', {
          state: { Price, Currency, Title, PromoCode: finalPromoCode },
        });
      } else {
        setError('Unexpected response format from the server.');
      }
    } catch (error) {
      console.error('Error checking promo codes:', error);
      setError('An error occurred while checking the promo code. Please try again later.');
    }
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
                
                <Typography variant="body1">HS{customPromo}{getPromoSuffix(Title)}</Typography>
                <Button variant="contained" color="secondary" fullWidth onClick={validateCustomPromo}>
                  Validate Custom Promo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}


        <Grid item xs={12}>

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
