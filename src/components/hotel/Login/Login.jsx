import React from "react";
import { Typography, Grid } from "@mui/material";
import Customtextfield from "./Customtextfield";
import LoginBackgroundvideo from "../../../assets/Login.gif";
import "./login.css";
import LoginForm from "./Loginform";

const Login = ({ onClose }) => {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "450px",
    borderRadius: '30px',
    backgroundImage: `url(${LoginBackgroundvideo})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const innerContainerStyle = {
    position: "absolute",
    top: 0,
    padding: "32px",
    left: 0,
    width: "100%",
    height: "100%",
  };
  
  return (
    <div style={containerStyle}>
        

      <div style={innerContainerStyle}>
        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;
