import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Grid } from "@mui/material";
import Customtextfield from '../hotel/Login/Customtextfield';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPageUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Assuming cart contains selected advertisements
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [finalPath, setFinalPath] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [items, setItems] = useState(0);
  const [earns, setEarns] = useState(0);
  const [gateway, setGateway] =  useState("");
  const [functionData, setFunctionData] =  useState("");
  const [userName, setUserName] = useState('');
  const [payableAmount, setPayableAmount] = useState(0);
  const [promoCodeInfo, setPromoCodeInfo] = useState(null);

  useEffect(() => {
    // Fetch userEmail from localStorage
    const userEmail = localStorage.getItem('userEmail');
    setUserName(userEmail);

    // Fetch rates and discount amount from previous page
    if (location.state) {
      const { discount, rate, path, currency, items, earns, payment, postFunctionData } = location.state;
      setDiscountPercentage(discount);
      setFinalAmount(rate);
      setPayableAmount(rate); // Initially set payableAmount to finalAmount
      setFinalPath(path);
      setCurrency(currency);
      setItems(items);
      setEarns(earns);
      setGateway(payment);
      console.log(payment);
      setFunctionData(postFunctionData);
    }
  }, [location.state]);

  // Function to handle promo code application
  const handleApplyPromoCode = async () => {
    try {
      // Fetch discount amount, user name, and discount percentage from the server based on the promo code
      const response = await axios.post('https://holidaysri-backend-9xm4.onrender.com/promo/apply-promo-code', {
        promoCode,
        email: userName, // Pass the userEmail to the backend
        // amount: earns
      });
  
      if (response.data.error) {
        // If there's an error in the response, do not apply the discount
        console.error('Error applying promo code:', response.data.error);
        setDiscountPercentage(0);
        setPromoCodeInfo(null);
        setPayableAmount(finalAmount); // Reset to finalAmount if there's an error
      } else {
        // If the response is successful, apply the discount using the percentage from the previous state
        setPromoCodeInfo({ email: response.data.email, code: response.data.code, discount: discountPercentage });
  
        // Calculate payable amount after considering discount percentage from the previous state
        const calculatedPayableAmount = finalAmount - discountPercentage;
        setPayableAmount(calculatedPayableAmount);
      }
    } catch (error) {
      console.error('Error applying promo code:', error.message);
      setDiscountPercentage(0);
      setPromoCodeInfo(null);
      setPayableAmount(finalAmount); // Reset to finalAmount if there's an error
    }
  };

  const handleCheckout = () => {
    // Navigate to PayHerePage for payment
    navigate(gateway, { 
      state: { 
        price: payableAmount, // Pass the payable amount as 'amount'
        path: finalPath,
        currency: currency,
        items: items,
        data: functionData,
        email: promoCodeInfo?.email ?? "", 
        earns: earns || "",
        code: promoCodeInfo?.code ?? "", 
      } 
    });
  };
  
  return (
    <Grid
      sx={{
        backgroundImage:
          'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "16px",
        paddingLeft: { lg: "70px", xs: '15%' },
        paddingRight: { lg: "32px", xs: '16px' },
        paddingTop: { lg: '4%', xs: '20%' },
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
          width: { lg: '50%', xs: '80%' }
        }}
      >
        <h1>Checkout Page</h1>
        <div>
          <Typography marginTop={{ lg: "16px", xs: "16px" }}>Cart Items</Typography>
          {/* Render the list of cart items */}
          <ul>
            {cart.map(item => (
              <li key={item._id}>{item.name} - ${item.amount}</li>
            ))}
          </ul>
        </div>
        <div>
          <Customtextfield
            marginTop={{ lg: "24px", xs: "24px" }}
            value={finalAmount}
            label={`Amount (${currency})`}
          />
        </div>
        <div>
          <Customtextfield
            label="Agent Code :"
            marginTop="16px"
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{
              borderRadius: "30px",
              borderColor: "white",
              boxShadow: "none",
              width: { lg: "220px", xs: "200px" },
              backgroundColor: "black",
              color: "white",
              marginTop: { lg: "16px", xs: "20px" },
              height: "32px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "white",
                boxShadow: "none",
              },
            }}
            onClick={handleApplyPromoCode}
          >
            Apply Agent Code
          </Button>
          {promoCodeInfo && (
            <p>You are eligible for the discount.</p>
          )}
          {discountPercentage === 0 && promoCodeInfo === null && (
            <p>Invalid promo code.</p>
          )}
        </div>
        <div>
          <h2 style={{ marginTop: '16px' }}>Summary</h2>
          <p>Total Amount: Rs.{finalAmount}</p>
          <p>Payable Amount: Rs.{payableAmount}</p>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "30px",
              borderColor: "white",
              boxShadow: "none",
              width: { lg: "220px", xs: "200px" },
              backgroundColor: "black",
              color: "white",
              marginTop: { lg: "16px", xs: "20px" },
              height: "32px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "white",
                boxShadow: "none",
              },
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default CheckoutPageUsers;
