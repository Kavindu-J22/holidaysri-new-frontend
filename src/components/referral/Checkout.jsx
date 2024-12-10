import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Grid } from "@mui/material";
import Customtextfield from '../hotel/Login/Customtextfield';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Assuming cart contains selected advertisements
  const [promoCode, setPromoCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [finalPath, setFinalPath] = useState('');
  const [currency, setCurrency] = useState(''); // Default currency is LKR
  const [items, setItems] = useState('');
  const [earns, setEarns] = useState(0);
  const [userName, setUserName] = useState('');
  const [promoCodeInfo, setPromoCodeInfo] = useState(null);

  const [preUsedPromocode, setPreUsedPromocode] = useState("");

  useEffect(() => {
    // Fetch userEmail from localStorage
    const userEmail = localStorage.getItem('userEmail');
    console.log("Email s "+userEmail)
    setUserName(userEmail);
    // Check subRole and set currency
    const subRole = localStorage.getItem('subRole');
    console.log("Email x "+userName)


    // Fetch rates and discount amount from previous page
    if (location.state) {
      const { discount, rate, path, currency, items, earns, usedPromocode } = location.state;

      setDiscountPercentage(discount);
      setFinalAmount(rate);
      setPayableAmount(rate); // Initially set payableAmount to finalAmount
      setFinalPath(path);
      setCurrency(currency); // Set currency based on subRole
      setItems(items);
      setEarns(earns);
      setPreUsedPromocode(usedPromocode);

       // Initialize promoCode with UsedPromoCode
    if (usedPromocode) {
      setPromoCode(usedPromocode);
    }
    
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
    navigate('/payherepage', { 
      state: { 
        price: payableAmount,
        path: finalPath,
        currency: currency,
        items: items,
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

      <Box marginBottom="0px" marginLeft="32px" marginTop="32px">
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            borderRadius: "30px",
            position: "fixed",
            left: "30px",
            top: "40px"
          }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>{" "}
      </Box>

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
              <li key={item._id}>{item.name} - {currency} {item.amount * (currency === 'USD' ? conversionRateToUSD : 1)}</li>
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
              label="Agent Code"
              marginTop="16px"
              type="text"
              placeholder="Use any Agent Code for an Exclusive Discount!"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              // disabled={!!promoCode} // Disable the field if promoCode is present
            />

          {preUsedPromocode && promoCode == preUsedPromocode ? (
              <>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "220px", xs: "200px" },
                  padding: "20px",
                  backgroundColor: "black",
                  color: "white",
                  marginTop: { lg: "16px", xs: "20px" },
                  marginBottom: { xs: "10px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={handleApplyPromoCode} // Re-apply the primary agent code if needed
              >
                Apply This Primary Agent Code
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "250px", xs: "200px" },
                  padding: "20px",
                  backgroundColor: "rgb(98, 56, 1)",
                  color: "white",
                  marginTop: { lg: "16px", xs: "10px" },
                  marginBottom: { xs: "10px" },
                  marginLeft: { lg: "5px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "rgb(75, 43, 1)",
                    color: "white",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={() => setPromoCode("")} // Clear the promo code
              >
                Clear and Use Another Agent Code
              </Button>

            </>
           
          ) :!promoCode && preUsedPromocode ? (
            <>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "30px",
              borderColor: "white",
              boxShadow: "none",
              width: { lg: "220px", xs: "200px" },
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              marginTop: { lg: "16px", xs: "20px" },
              marginBottom: { xs: "10px" },
              height: "32px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "white",
                boxShadow: "none",
              },
            }}
            onClick={() => {
              alert("Ok.! Now You can Enter (OR Copy and past) your New Agent Code here..!"); // Show alert when button is clicked
              // handleApplyPromoCode(); // Call the function to apply promo code
            }}
          >
            Use New Agent Code
          </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "white",
                boxShadow: "none",
                width: { lg: "220px", xs: "200px" },
                padding: "20px",
                backgroundColor: "rgb(1, 72, 98)",
                color: "white",
                marginTop: { lg: "16px", xs: "10px" },
                marginBottom: { xs: "10px" },
                marginLeft: { lg: "5px" },
                height: "32px",
                "&:hover": {
                  backgroundColor: "rgb(2, 55, 75)",
                  color: "white",
                  borderColor: "white",
                  boxShadow: "none",
                },
              }}
              onClick={() => setPromoCode(preUsedPromocode)} // Clear the promo code
            >
              Fill by Primary Agent Code
            </Button>
            
            </>
          ) : (
            <Button
            variant="outlined"
            sx={{
              borderRadius: "30px",
              borderColor: "white",
              boxShadow: "none",
              width: { lg: "220px", xs: "200px" },
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              marginTop: { lg: "16px", xs: "20px" },
              marginBottom: { lg: "16px", xs: "10px" },
              height: "32px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "white",
                boxShadow: "none",
              },
            }}
            onClick={handleApplyPromoCode} // Apply primary agent code
          >
            Apply This Agent Code
          </Button>
          )}
          {promoCodeInfo && (
            <p>You are eligible for the discount.</p>
          )}
          {discountPercentage === 0 && promoCodeInfo === null && (
            <p>Invalid promo code.</p>
          )}
        </div>
        <div>
          <h2 style={{ marginTop: '16px' }}>Summary</h2>
          <p>Total Amount: {currency} {finalAmount}</p>
          <p>Payable Amount: {currency} {payableAmount}</p>
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
            Pay Now
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default CheckoutPage;