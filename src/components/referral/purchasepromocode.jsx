import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Grid } from "@mui/material";
import Customtextfield from "../hotel/Login/Customtextfield";
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress } from "@mui/material"; // Import CircularProgress

const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';

const PurchasePromoCodePage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [user, setUser] = useState("");
  const [rates, setRates] = useState({});
  const [isPromoCodeGenerated, setIsPromoCodeGenerated] = useState(false); // New state variable
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(useLocation().state?.status); // Get status from location state
  const userEmail = localStorage.getItem("userEmail");
  const [promo, setPromo] = useState([]);

  const [isLoadingInitialState, setIsLoadingInitialState] = useState(true); // Initial loading state
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getAllPromo() {
      try {
        const res = await axios.get(
          `https://holidaysri-backend.onrender.com/promo/promo-exist?email=${userEmail}`
        );
        setPromo(res.data);
      } catch (error) {
        console.error("Error fetching Promo Codes:", error);
        alert("Error fetching Promo Codes: " + error.message);
      }
    }
    getAllPromo();
  }, []);
  useEffect(() => {
    if (status === 'PaidActive') {
      const user = localStorage.getItem("userEmail");
      console.log(user);
      setUser(user);
    }
  }, [status]);

    // Simulate checking the promo code status from the server
    useEffect(() => {
      const checkPromoStatus = async () => {
        setIsLoadingInitialState(true);
        try {
          // Simulate a delay for checking promo status
          await new Promise((resolve) => setTimeout(resolve, 2000)); 
          // Logic to check if promo code is already generated
          const fetchedPromoCode = promo.promoCode; // Replace with actual fetch call
          setIsPromoCodeGenerated(!!fetchedPromoCode);
        } catch (error) {
          console.error("Error checking promo code status", error);
        } finally {
          setIsLoadingInitialState(false); // End the initial loading state
        }
      };
  
      checkPromoStatus();
    }, [promo]);


  const handleGeneratePromoCode = async () => {

    setLoading(true); // Start loading
    // Simulate promo code generation/renewal process
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
    setLoading(false); // End loading
    // Perform the rest of the generate/renew promo code logic here

    if (isPromoCodeGenerated || status !== 'PaidActive') return; // Check if promo code is already generated

    try {
      console.log('Sending request to generate promo code...');
  
      const id = '65f58296f707aa390b10db8a';
  
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
      setRates(rates);
  
      // Generate promo code based on rates
      const responsePromoCode = await axios.post(`https://holidaysri-backend.onrender.com/promo/generate-promo-code`, {
        email: user,
        discountPercentage: rates.discounthotelPercentage, // Ensure this key is correct
      });
      console.log('Response from server (promo code):', responsePromoCode.data);
  
      const generatedPromoCode = responsePromoCode.data.code;
      setPromoCode(generatedPromoCode);
      setIsPromoCodeGenerated(true); // Set promo code generated to true

      // Set status to null after generating the promo code
      setStatus(null);
    } catch (error) {
      console.error("Error generating promo code:", error.message);
      console.error("Error details:", error.response ? error.response.data : error);
    }
  };

  const handleRenewPromoCode = async () => {
    try {
      // Get the user's email from local storage (or where you store it)
      const userEmail = localStorage.getItem("userEmail");
  
      if (!userEmail) {
        alert("No user email found. Please log in.");
        return;
      }
  
      // Set expiration date to 1 year from now
      const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  
      // Send PUT request to update the expiration date
      const response = await axios.put(`https://holidaysri-backend.onrender.com/promo/promo-update-expiredate`, {
        email: userEmail,
        newExpirationDate: oneYearFromNow,
      });
  
      if (response.status === 200) {
        // If the update was successful, show an alert and redirect
        alert("Agent code expiration date updated successfully.");
        navigate("/local-dashboard"); // Redirect to the local dashboard
      }
    } catch (error) {
      console.error("Error updating promo code expiration date:", error.message);
      alert("An error occurred while updating the promo code expiration date.");
    }
  };
  


  const handleBack = () => {
    navigate('/local-dashboard'); // This will navigate back to the previous page
  };

  return (
    <Grid
      sx={{
        backgroundImage:
          'url("https://i0.wp.com/blog.mutual.app/wp-content/uploads/2022/03/Blog_FAQ-PromoCode.png?fit=2240%2C1260&ssl=1")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "16px",
        paddingLeft: { lg: "70px", xs: '15%' },
        paddingRight: { lg: "32px", xs: '16px' },
        paddingTop: { lg: '10%', xs: '20%' },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: { lg: "24px", xs: "16px" },
          borderRadius: "20px",
          width: { lg: '50%', xs: '80%' }
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
  
        <h1 style={{ color: "black" }}>Get your Agent Code</h1>
  
    {/* If promo code is generated, show 'Renew Promo Code' button, else show 'Purchase Promo Code' */}
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
      disabled={loading || isLoadingInitialState} // Disable if loading action or checking status
      onClick={async () => {
        setLoading(true);
        if (isPromoCodeGenerated || promo.promoCode) {
          await handleRenewPromoCode(); // Call the renew promo function
        } else {
          await handleGeneratePromoCode(); // Call the generate promo function
        }
        setLoading(false);
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "white" }} />
      ) : isLoadingInitialState ? (
        <CircularProgress size={24} sx={{ color: "white" }} /> // Show spinner while checking the promo code state
      ) : isPromoCodeGenerated || promo.promoCode ? (
        "Re-Active Agent Code"
      ) : (
        "Generate Agent Code"
      )}
    </Button>
  
        <div>
          <Customtextfield
            marginTop={{ lg: "32px", xs: "24px" }}
            type="text"
            value={promoCode || promo.promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            label="Your Generated Agent Code :"
          />
        </div>
      </Box>
    </Grid>
  );
};

export default PurchasePromoCodePage;
