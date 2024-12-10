import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Customtextfield from "./Customtextfield";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetToken } = useParams(); // Access the resetToken from the URL
  const navigate = useNavigate();

  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const apiEndpoints = [
      `https://holidaysri-backend-9xm4.onrender.com/api/user/reset-password/${resetToken}`,
        `https://holidaysri-backend-9xm4.onrender.com/api/admin/reset-password/${resetToken}`,
        `https://holidaysri-backend-9xm4.onrender.com/api/guide/reset-password/${resetToken}`,
        `https://holidaysri-backend-9xm4.onrender.com/api/partner/reset-password/${resetToken}`,
        `https://holidaysri-backend-9xm4.onrender.com/api/agent/reset-password/${resetToken}`,
        `https://holidaysri-backend-9xm4.onrender.com/api/seller/reset-password/${resetToken}`,
    ];

   const onSubmit = async (e) => {
     e.preventDefault();

     if (password !== confirmPassword) {
       alert("Passwords do not match");
       return;
     }

     setLoading(true);

     for (const apiEndpoint of apiEndpoints) {
       try {
         const response = await axios.put(apiEndpoint, { password });
         console.log(response.data);
         setLoading(false);
         setSuccess(true);
         alert("Password reset Successfully..!");
         navigate("/login", { replace: true });
         return;
       } catch (err) {
         if (err.response) {
           console.error(err.response.data);
         } else if (err.request) {
           console.error("No response received:", err.request);
         } else {
           console.error("Error", err.message);
         }
       }
     }
   };

  return (
    <Box className="resetPasswordForm">
      <Box className = "baaack" onClick={() => window.history.back()}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "30px",
              }}
              
            >
              Back
            </Button>{" "}
          </Box>
          <div className="fgpcontent">
      <Typography sx={{ color: "black", fontSize: "32px", fontWeight: "550" }}>
        Reset Password
      </Typography>
      <form onSubmit={onSubmit}>
        <Customtextfield
          color="black"
          label="New Password"
          type="password"
          marginTop="8px"
          width={{ xl: "75%", lg: "75%", xs: "260px", md: "105%", sm: "110%" }}
          onChange={onChangePassword}
        />
        <Customtextfield
          color="black"
          label="Confirm Password"
          type="password"
          marginTop="16px"
          width={{ xl: "75%", lg: "75%", xs: "260px", md: "105%", sm: "110%" }}
          onChange={onChangeConfirmPassword}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{
            borderRadius: "30px",
            borderColor: "black",
            boxShadow: "none",
            width: { lg: "100%", xs: "100%" },
            color: "black",
            marginTop: "32px",
            height: "48px",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
              borderColor: "black",
              boxShadow: "none",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>
      </form>
      {success && (
        <Typography
          sx={{ color: "green", fontSize: "16px", marginTop: "16px" }}
        >
          Password has been reset successfully. You can now log in with your new
          password.
        </Typography>
      )}
      </div>
    </Box>
  );
};

export default ResetPassword;
