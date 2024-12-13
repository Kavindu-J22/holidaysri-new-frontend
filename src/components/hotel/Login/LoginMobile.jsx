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
    }}
  >
    
    <div padding='32px' >
    <a href="/">
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                backgroundColor: "black",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "black",
                  boxShadow: "none",
                },
                marginLeft:{xs:'10%',lg:'0px'}
              }}
            >
              Back
            </Button>
          </a>
      <LoginForm />
    </div>
  </Box>
  );
};

export default LoginMobile;
