import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Button, Typography } from '@mui/material';
import CustomTextField from '../hotel/Login/Customtextfield';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius:'12px',
  boxShadow: 24,
  p: 4,
};

const PayHerePage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [orderId, setOrderId] = useState("");
  const [direct, setdirect] = useState(false);
  const handleClose = () => setdirect(false);
  const merchantId = "234525"; // Replace with your PayHere Merchant ID
  const returnUrl = "https://holidaysri.com/subscribe"; // Your return URL
  const cancelUrl = "https://holidaysri.com/cancel"; // Your cancel URL
  const notifyUrl = "https://holidaysri.com/notify"; // Your notify URL
  const items = location.state?.items;
  const amount = location.state?.price;
  const redirectPath = location.state?.path;
  const currency = location.state?.currency;
  const earns = location.state?.earns;
  const agentEmail = location.state?.email;
  const promoCode = location.state?.code;
  const merchantSecret = "Mzg0NzkxNDMzMDM0OTIxODQyMzA1NDAyNzUzMzMyNDg1NTEwNzY="; // Replace with your merchant secret (*securely store!*)

  useEffect(() => {
    const generateOrderId = () => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `ORDER_${timestamp}_${randomString}`;
    };

    setOrderId(generateOrderId());

    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.payhere.onCompleted = async function onCompleted(orderId) {
        console.log("Payment completed. OrderID:", orderId);

        // Save the agent's earnings after successful payment
        try {
          const response = await fetch('https://holidaysri-backend.onrender.com/promo/save-earnings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: agentEmail, // Assuming agent's email is the user email
              amount: earns,
              orderId: orderId,
              promoCode: promoCode, // Pass the promo code here
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save earnings');
          }

          console.log("Earnings saved successfully.");
        } catch (error) {
          console.error("Error saving earnings:", error);
        }

        // Redirect after successful payment and saving earnings
        navigate(redirectPath, { state: { status: "PaidActive", orderId, promoCode } });

      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
      };

      window.payhere.onError = function onError(error) {
        console.error("Error:", error);
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [redirectPath, navigate, agentEmail, earns, promoCode]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      merchant_id: merchantId,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      order_id: orderId,
      items: items,
      amount: amount,
      currency: currency,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      city: city,
      country: "Sri Lanka",
    };

    const amountFormatted = parseFloat(paymentData.amount)
      .toLocaleString("en-US", { minimumFractionDigits: 2 })
      .replace(/,/g, "");
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const hash = md5(
      paymentData.merchant_id +
        paymentData.order_id +
        amountFormatted +
        paymentData.currency +
        hashedSecret
    )
      .toString()
      .toUpperCase();

    paymentData.hash = hash;

    const urlEncodedData = Object.keys(paymentData)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(paymentData[key])
      )
      .join("&");

    try {
      const response = await fetch("/pay/checkout", {
        // Changed to proxy URL
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
      });
      setdirect(true);

      const data = await response.text();
      console.log("Payment response:", data);
      localStorage.setItem('Paymentstatus', 'payed');
      localStorage.setItem('order_id',  paymentData.order_id);

      window.payhere.startPayment(paymentData);
    } catch (error) {
      console.error("Payment error:", error);
      setdirect(false);

    }
  };

  return (
    <Grid
      container
      sx={{
        position: "relative",
        minHeight: "100vh",
        paddingBottom: "30px",
        paddingTop: { lg: "80px", xs: "80px" },
        overflow: "hidden",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage:
            'url("https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336447/pexels-photo-1072179_frjk63_js026i.webp")',
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          filter: "blur(3px)",
          zIndex: -1,
        },
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
            top: "40px",
          }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>{" "}
      </Box>
      <Modal
        open={direct}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2">
    Redirecting to add form...
  </Typography>
  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    After payment, it may take a bit of time to redirect. Please wait while we check the payment order.
  </Typography>
</Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingLeft: { lg: "30%", xs: "13%", sm: "21%", md: "30%" },
        }}
      >
        <Box
          border={1}
          sx={{
            width: { lg: "600px", xs: "300px", sm: "450px", md: "450px" },
            padding: { lg: "24px", xs: "16px", md: "16px", sm: "16px" },
            backgroundColor: "rgba(251, 252, 253, 0.7)",
            borderColor: "#697386",
            borderRadius: "12px",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: { lg: "32px", xs: "18px" },
                  fontWeight: "600",
                  color: "black",
                }}
              >
                PayHere Payment Integration
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "16px" }}>
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  id="firstName"
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
                <br />
                <CustomTextField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
                <br />
                <CustomTextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <br />
                <CustomTextField
                  id="phone"
                  label="Phone"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
                <br />
                <CustomTextField
                  id="address"
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
                <br />
                <CustomTextField
                  id="city"
                  label="City"
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required
                />
                <br />
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderRadius: "30px",
                    borderColor: "#6259F5",
                    backgroundColor: "#6259F5",
                    "&:hover": {
                      color: "white",
                      borderRadius: "30px",
                      borderColor: "#6259F5",
                      backgroundColor: "#6259F5",
                    },
                    width: "100%",
                    marginTop: "24px",
                  }}
                >
                  Pay Now
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default PayHerePage;