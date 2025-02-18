import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const HSCPayment = () => {
  const { state } = useLocation();
  const { Currency, calculatedHSCAmount, Title, item, UsedPromocode, UsedPromocodeOwner, Earns, DiscountedAmount } = state;
  const [userCurrentHsc, setUserCurrentHsc] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [warning, setWarning] = useState('');
  const [info, setInfo] = useState('');
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    axios
      .get(`https://holidaysri-backend.onrender.com/coin/coins/${userEmail}`)
      .then((response) => {
        setUserCurrentHsc(response.data.coins); // Assuming response.data.amount contains the HSC balance
      })
      .catch((error) => {
        console.error('Error fetching HSC balance:', error);
      });
  }, []);

  const handlePayNow = async () => {
    if (userCurrentHsc < calculatedHSCAmount) {
      // Show insufficient balance popup
      setError(`Insufficient HSC Balance: ${userCurrentHsc} ${Currency}. You need ${calculatedHSCAmount} ${Currency}. Please recharge to continue.`);
      return;
    }
  
    setLoading(true);
    try {
      const userEmail = localStorage.getItem('userEmail');
      const userId = localStorage.getItem('userId');
      
      // Step 1: Validate user ID and ProfileStatus
      console.log("Validating user ID and profile status...");
      const userResponse = await axios.get(`https://holidaysri-backend.onrender.com/api/user/findByEmail/${userEmail}`);
      const user = userResponse.data.user;
  
      if (user._id !== userId || user.ProfileStatus === "inactive") {
        setWarning("User validation failed. Please check your profile status or credentials.");
        console.error("User validation failed. User ID or ProfileStatus mismatch.");
        setLoading(false);
        return;
      }
      console.log("User validation successful.");

      // Step 2: Update user subscription and agent status
      console.log("Updating user subscription and agent status...");
      await axios.put(`https://holidaysri-backend.onrender.com/api/user/updateUsers/${userEmail}`, {
        isSubscribed: "Subscribed",
        isAgent: "True",
      });
      console.log("User subscription and agent status updated successfully.");
  
      // Step 3: Handle UsedPromocode updates if applicable
      if (UsedPromocode) {
        console.log("Processing promocode updates...");
  
        // Update Promocode Owner's Earn Record
        try {
          await axios.put("https://holidaysri-backend.onrender.com/newPromocodes/update-earns", {
            promocode: UsedPromocode,
            earns: Earns,
          });
          console.log("Promocode owner's earnings updated successfully.");
          
        } catch (error) {
          console.error("Error updating promocode owner's earnings:", error);
          
        }
  
        // Add Earn record to database
        try {
          await axios.post("https://holidaysri-backend.onrender.com/earnings/addEarn", {
            buyeremail: userEmail,
            category: "Promo Codes",
            amount: Earns,
            promoCode: UsedPromocode,
            promoCodeOwner: UsedPromocodeOwner,
            item: `${item} - ${Title}`,
          });
          console.log("Earning record added successfully.");
          
        } catch (error) {
          console.error("Error adding earning record:", error);
          
        }
      }
  
      // Step 4: Add Payment Activity to database
      console.log("Adding payment activity to database...");
      try {
        await axios.post("https://holidaysri-backend.onrender.com/paymentAct/payment-activities", {
          itemID: Title,
          quantity: 1,
          item: item,
          category: "Promo Codes",
          buyeremail: userEmail,
          amount: calculatedHSCAmount,
          discountedAmount: DiscountedAmount,
          promoCode: UsedPromocode,
          promoCodeOwner: UsedPromocodeOwner,
          forEarns: Earns,
        });
        console.log("Payment activity added successfully.");
        
      } catch (error) {
        console.error("Error adding payment activity:", error);
        
      }
  
      // Step 5: Update coin balance (existing functionality)
      console.log("Updating coin balance...");
      const newBalance = userCurrentHsc - calculatedHSCAmount;
      try {
        const coinResponse = await axios.put(`https://holidaysri-backend.onrender.com/coin/updateCoins/${userEmail}`, {
          coins: newBalance,
        });
        if (coinResponse.data.success) {
          console.log("Coin balance updated successfully.");
          
        } else {
          console.error("Error updating coin balance.");
          
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error updating coin balance:", error);
        
      }
  
      // Step 6: Add new promocode to the system
      console.log("Adding new promocode to the system...");
      try {
        await axios.post("https://holidaysri-backend.onrender.com/newPromocodes/add", {
          userEmail: userEmail,
          promocodeType: Title,
          promocode: item,
        });
        console.log("New promocode added successfully.");
        
      } catch (error) {
        console.error("Error adding new promocode:", error);
        
      }
  
      // Final Success Message
      console.log("Payment process completed successfully.");
      setPopup(true);
      
    } catch (error) {
      console.error("Error during payment process:", error);
      setError("An error occurred while processing your payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleVslidateDataToPay = async () => {
    // Check if the user's current HSC balance is insufficient
    if (userCurrentHsc < calculatedHSCAmount) {
      setOpen(true); // Show the insufficient balance popup
      return;
    }
  
    try {
      // Check if the promocode already exists
      const response = await axios.post('https://holidaysri-backend.onrender.com/newPromocodes/check-exists', { promocode: item });
  
      if (response.data.exists) {
        // If the promocode already exists, set an error message
        setWarning("This Promocode Already Purchased. Check it in your Dashboard PromoCode & Agent Section to find Your PromoCode");
        return;
      }
  
      // If the promocode does not exist, proceed with the payment
      handlePayNow();
    } catch (error) {
      // Check if the error is a 404 with exists: false
      if (error.response && error.response.status === 404 && error.response.data.exists === false) {
        console.log("Promocode does not exist. Proceeding to payment...");
        handlePayNow(); // Continue to payment process
        return;
      }
  
      // Handle other errors
      console.error("Error checking promocode existence:", error);
      setError("An error occurred while verifying the promocode. Please try again.");
    }
  };
  
    useEffect(() => {
      if (success || error || warning || info ) {
        setFade(false); // Reset fade-in
        const fadeTimer = setTimeout(() => {
          setFade(true);  // Start fading
        }, 3000); // Start fade after 200ms
  
        const removeTimer = setTimeout(() => {
          setSuccess('');
          setError('');
          setWarning(''),
          setInfo('')
        }, 3500); // Remove after fade out (0.5s)
  
        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
    }, [success, error, warning, info]);

  const handleRecharge = () => {
    navigate('/getHSCpage');
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
<Box
  sx={{
    margin: '80px 10px 0',
    padding: 3,
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  }}
>
  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
    Payment (HSC) For - {Title}
  </Typography>
  <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1rem', color: '#555' }}>
    Your Current HSC Amount: <strong>{userCurrentHsc} {Currency}</strong>
  </Typography>
  <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1rem', color: '#555' }}>
    Item: <strong>{Title} - {item}</strong>
  </Typography>
  <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1rem', color: '#555' }}>
    Used Promocode: <strong>{UsedPromocode || 'N/A'}</strong>
  </Typography>
  <Typography variant="body1" sx={{ marginBottom: 4, fontSize: '1rem', color: '#555' }}>
    Payable Amount: <strong>{calculatedHSCAmount} {Currency}</strong>
    <br />
    <span style={{ fontSize: '0.85rem', color: '#888' }}>
      (After deducting {DiscountedAmount} {Currency} discount amount)
    </span>
  </Typography>

  <>
    {success && (
      <Alert
        severity="success"
        sx={{
          marginBottom: 2,
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
        sx={{
          marginBottom: 2,
          opacity: fade ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {error}
      </Alert>
    )}

    {warning && (
      <Alert
        severity="warning"
        sx={{
          marginBottom: 2,
          opacity: fade ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {warning}
      </Alert>
    )}

    {info && (
      <Alert
        severity="info"
        sx={{
          marginBottom: 2,
          opacity: fade ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {info}
      </Alert>
    )}
  </>

  <Button
    variant="contained"
    color="primary"
    onClick={handleVslidateDataToPay}
    disabled={loading}
    fullWidth
    sx={{
      marginBottom: 4,
      padding: '12px 20px',
      fontWeight: 'bold',
      backgroundColor: loading ? '#ccc' : '#1976d2',
      '&:hover': {
        backgroundColor: '#115293',
      },
    }}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
  </Button>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" gutterBottom>
              Insufficient HSC Balance
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your Current HSC Balance: {userCurrentHsc} {Currency}.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Required Amount: {calculatedHSCAmount} {Currency}.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please recharge to continue with HSC.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRecharge}
          >
            Get More HSC Now
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
          >
            Go Back to Checkout Page
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={popup} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" gutterBottom>
              Congratulations! Payment Successful
            </Typography>
            <Typography variant="body1" gutterBottom>
              Paid Amount: {calculatedHSCAmount}{Currency}.
            </Typography>
            <Typography variant="body1" gutterBottom>
             Current HSC Balance: {userCurrentHsc - calculatedHSCAmount} {Currency}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              You Are Now Our Valuable Agent. Earn and Enjoy. Good Luck!
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboardAgentPage')}
          >
            Go to Dashboard
        </Button>
          
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default HSCPayment;
