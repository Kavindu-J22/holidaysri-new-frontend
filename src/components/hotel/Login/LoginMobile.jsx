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
    <a href="/">
      <Button
        variant="contained"
        sx={{
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: "Black",
            border: "1px solid #333",
            boxShadow: 'none',
          },
          marginBottom: '10px',
          marginLeft: "5px",
          padding: '10px 30px',
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Back
      </Button>
    </a>
    <LoginForm /> {/* The LoginForm component should inherit styling automatically */}
  </div>
</Box>

  );
};

export default LoginMobile;
