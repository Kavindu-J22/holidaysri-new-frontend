import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Customtextfield from "./Customtextfield";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // State to hold selected role
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const apiEndpoints = {
    user: "https://holidaysri-backend.onrender.com/api/user/forgotPassword",
    admin:
      "https://holidaysri-backend.onrender.com/api/admin/forgotPassword",
    guide:
      "https://holidaysri-backend.onrender.com/api/guide/forgotPassword",
    partner:
      "https://holidaysri-backend.onrender.com/api/partner/forgotPassword",
    agent:
      "https://holidaysri-backend.onrender.com/api/agent/forgotPassword",
    seller:
      "https://holidaysri-backend.onrender.com/api/seller/forgotPassword",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !role) {
      alert("Please enter your email and select a role");
      return;
    }

    setLoading(true);

    try {
      // Send the request to the selected role's API endpoint
      await axios.post(apiEndpoints[role], { email });

      setSuccess(true);
      alert("Password reset email sent. Please check you'r Email");

      // Navigate to the home page
      navigate("/resetpwmsgpage");
    } catch (err) {
      console.error(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgotPasswordForm">
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
      <h2>
        Forgot Password
      </h2>
      <form onSubmit={handleSubmit}>
        <Customtextfield
          color="black"
          label="Email"
          marginTop="8px"
          width="100%"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl sx={{ width: "100%", marginTop: "16px" }}>
          <InputLabel id="role-select-label">Select Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Select Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="guide">Guide</MenuItem>
            <MenuItem value="partner">Partner</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </Select>
        </FormControl>

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
          {loading ? <CircularProgress size={24} /> : "Send Reset Email"}
        </Button>
      </form>
      {success && (
        <Typography
          sx={{ color: "green", fontSize: "16px", marginTop: "16px" }}
        >
          Password reset email sent successfully. Please check your email.
        </Typography>
      )}
      </div>
    </div>
  );
};

export default ForgotPassword;
