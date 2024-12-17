import React from "react";
import { Box, Button } from "@mui/material";
import LoginMobileimg from "../../../assets/LoginMobile.jpg";
import "./login.css";
import LoginForm from "./Loginform";

const LoginMobile = ({  }) => {
  
  return (
<Box
  sx={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: { xs: '20px', lg: '0px' }, // Padding for mobile screens
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }}
>
  <div
    sx={{
      padding: '32px',
      borderRadius: '20px',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
      width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' }, // Adjust width for different screens
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LoginForm /> {/* The LoginForm component should inherit styling automatically */}
  </div>
</Box>

  );
};

export default LoginMobile;
